// ─────────── STORAGE ───────────
let DB = loadDataLocal();

async function loadDataSupabase() {
  try {
    const [{ data: eitos, error: e1 }, { data: colheitas, error: e2 }] = await Promise.all([
      _SB.from('eitos').select('*'),
      _SB.from('colheitas').select('*').order('data', {ascending: true})
    ]);
    if(e1) throw e1;
    if(e2) throw e2;

    if(!eitos || eitos.length === 0) {
      console.warn('Supabase retornou sem eitos — usando dados locais');
      return loadDataLocal();
    }

    const db = {};
    for(const e of eitos) {
      if(!db[e.area]) db[e.area] = [];
      db[e.area].push({ id: e.eito_id, plantas: e.plantas, historico: [] });
    }
    for(const c of (colheitas||[])) {
      if(!db[c.area]) continue;
      const eito = db[c.area].find(e => e.id === c.eito_id);
      if(eito) {
        const h = { _id: c.id, data: c.data.substring(0,10), total: c.total, mesa: c.mesa, fabrica: c.fabrica };
        if(c.cliente) h.cliente = c.cliente;
        if(c.lancamento_id) h.lancamento_id = c.lancamento_id;
        if(c.parcial) h.parcial = true;
        eito.historico.push(h);
      }
    }
    // migrações de nomenclatura
    if(db['MARACA'] && !db['MARACUJÁ']) { db['MARACUJÁ'] = db['MARACA']; delete db['MARACA']; }
    if(db['MDC']) { db['MAMÃO DE CIMA'] = db['MDC']; delete db['MDC']; }
    if(db['MDB']) { db['MAMÃO DE BAIXO'] = db['MDB']; delete db['MDB']; }
    if(db['AREA B']) delete db['AREA B'];
    // Ordenar eitos numericamente
    for(const area of Object.keys(db)) sortEitosNum(db[area]);
    localStorage.setItem(SK, JSON.stringify(db));
    console.log('Colheitas carregadas do Supabase:', Object.keys(db).length, 'áreas');
    return db;
  } catch(err) {
    console.error('Erro ao carregar colheitas:', err);
    return loadDataLocal();
  }
}

function loadDataLocal() {
  const saved = localStorage.getItem(SK);
  if (saved) {
    let d;
    try { d = JSON.parse(saved); } catch(e) { console.error('Erro ao parsear colheitas locais:', e); d = {}; }
    if (d['MARACA'] && !d['MARACUJÁ']) { d['MARACUJÁ'] = d['MARACA']; delete d['MARACA']; }
    if (d['MDC']) { d['MAMÃO DE CIMA'] = d['MDC']; delete d['MDC']; }
    if (d['MDB']) { d['MAMÃO DE BAIXO'] = d['MDB']; delete d['MDB']; }
    if (d['AREA B']) delete d['AREA B'];
    // Ordenar eitos numericamente
    for(const area of Object.keys(d)) if(Array.isArray(d[area])) sortEitosNum(d[area]);
    localStorage.setItem(SK, JSON.stringify(d));
    return d;
  }
  // seed historico from initial
  const d = {};
  for (const [area, eitos] of Object.entries(DADOS_INICIAIS)) {
    d[area] = eitos.map(e => ({
      id: e.id,
      plantas: e.plantas,
      historico: e.ultimaColheita ? [e.ultimaColheita] : []
    }));
  }
  return d;
}

async function saveData() {
  localStorage.setItem(SK, JSON.stringify(DB));
  try {
    const eitosRows = [];
    for(const [area, eitos] of Object.entries(DB)) {
      for(const e of eitos) {
        eitosRows.push({ area, eito_id: e.id, plantas: e.plantas });
      }
    }
    if(eitosRows.length > 0) {
      await _SB.from('eitos').upsert(eitosRows, { onConflict: 'area,eito_id' });
    }
  } catch(err) { console.error('Erro ao salvar eitos:', err); showToast('⚠ Erro ao salvar — tente novamente'); }
}

async function salvarColheitaSupabase(area, eitoId, colheita) {
  try {
    await _SB.from('eitos').upsert(
      { area, eito_id: eitoId, plantas: DB[area]?.find(e=>e.id===eitoId)?.plantas || 0 },
      { onConflict: 'area,eito_id' }
    );
    // Verificar se já existe colheita para este eito/data (evitar duplicata)
    const { data: existing } = await _SB.from('colheitas')
      .select('id')
      .eq('area', area)
      .eq('eito_id', eitoId)
      .eq('data', colheita.data)
      .limit(1);
    if (existing && existing.length > 0) {
      console.warn('Colheita já existe:', area, eitoId, colheita.data, '— ignorando duplicata');
      return;
    }
    const row = {
      area, eito_id: eitoId,
      data: colheita.data,
      total: colheita.total,
      mesa: colheita.mesa,
      fabrica: colheita.fabrica
    };
    if (colheita.cliente) row.cliente = colheita.cliente;
    if (colheita.lancamento_id) row.lancamento_id = colheita.lancamento_id;
    if (colheita.parcial) row.parcial = true;
    await _SB.from('colheitas').insert(row);
  } catch(err) { console.error('Erro ao salvar colheita:', err); showToast('⚠ Erro ao salvar — tente novamente'); }
}

async function loadDBFromSupabase() {
  const newDB = await loadDataSupabase();
  if(newDB && Object.keys(newDB).length > 0) {
    DB = newDB;
    localStorage.setItem(SK, JSON.stringify(DB));
  } else {
    console.warn('Supabase indisponível — usando cache local');
    DB = loadDataLocal();
  }
}

// ─────────── VENDAS STORAGE ───────────
let _vendasCache = null;

function loadVendas() {
  if (_vendasCache && _vendasCache.length > 0) return _vendasCache;
  let local;
  try { local = JSON.parse(localStorage.getItem(SK_VENDAS)||'[]'); } catch(e) { console.error('Erro ao parsear vendas locais:', e); local = []; }
  if (local.length > 0) {
    _vendasCache = local;
  }
  return _vendasCache || [];
}

async function loadVendasSupabase() {
  try {
    let allData = [];
    let from = 0;
    const pageSize = 1000;
    while(true) {
      const { data, error } = await _SB.from('vendas').select('*').order('data', {ascending: true}).range(from, from+pageSize-1);
      if(error) throw error;
      if(!data || data.length === 0) break;
      allData = allData.concat(data);
      if(data.length < pageSize) break;
      from += pageSize;
    }
    const data = allData;
    console.log('Vendas carregadas do Supabase:', data.length);

    const localVendas = JSON.parse(localStorage.getItem(SK_VENDAS)||'[]');
    if(data.length === 0 && localVendas.length > 0) {
      console.warn('Supabase sem vendas mas há dados locais — mantendo cache');
      _vendasCache = localVendas;
      return _vendasCache;
    }

    _vendasCache = data.map(v=>({
      id: v.id,
      data: typeof v.data === 'string' ? v.data.substring(0,10) : v.data,
      cliente: v.cliente,
      nf: v.nf,
      areas: v.areas||{},
      qtde: v.qtde||0,
      total: parseFloat(v.total)||0,
      frete: parseFloat(v.frete)||0,
      quebra: parseInt(v.quebra)||0,
      valorRecebido: parseFloat(v.valor_recebido)||0,
      status: v.status||'PAGO',
      dataDeposito: v.data_deposito,
      tipoVenda: v.tipo_venda||'coco',
      pesoKg: v.peso_kg,
      litragem: v.litragem,
      vPorLitro: v.v_por_litro,
      ufDestino: v.uf_destino||null,
      cidadeDestino: v.cidade_destino||null
    }));
    localStorage.setItem(SK_VENDAS, JSON.stringify(_vendasCache));
    return _vendasCache;
  } catch(e) {
    console.error('Erro ao carregar vendas:', e);
    let fallback;
    try { fallback = JSON.parse(localStorage.getItem(SK_VENDAS)||'[]'); } catch(e2) { console.error('Erro ao parsear vendas locais (fallback):', e2); fallback = []; }
    return fallback;
  }
}

async function saveVendas(db) {
  _vendasCache = db;
  localStorage.setItem(SK_VENDAS, JSON.stringify(db));
}

async function salvarVendaSupabase(v) {
  const row = {
    id: v.id,
    data: v.data,
    cliente: v.cliente,
    nf: v.nf,
    areas: v.areas||{},
    qtde: v.qtde||0,
    total: v.total||0,
    frete: v.frete||0,
    quebra: v.quebra||0,
    valor_recebido: v.valorRecebido||0,
    status: v.status||'PAGO',
    data_deposito: v.dataDeposito||null,
    tipo_venda: v.tipoVenda||'coco',
    peso_kg: v.pesoKg||null,
    litragem: v.litragem||null,
    v_por_litro: v.vPorLitro||null,
    uf_destino: v.ufDestino||null,
    cidade_destino: v.cidadeDestino||null
  };
  const { error } = await _SB.from('vendas').upsert(row);
  if(error) { console.error('Erro ao salvar venda:', error); showToast('⚠ Erro ao salvar — tente novamente'); }
}

async function excluirVendaSupabase(id) {
  const { error } = await _SB.from('vendas').delete().eq('id', id);
  if(error) { console.error('Erro ao excluir venda:', error); showToast('⚠ Erro ao salvar — tente novamente'); }
}

// ─── NADO CONTADOR ───

async function salvarProgramacaoNado(data, eitos) {
  // eitos = [{area, eito_id, plantas, sugerido, dias_desde}]
  const rows = eitos.map(e => {
    const row = { data, area: e.area, eito_id: e.eito_id, plantas: e.plantas || 0 };
    if (e.sugerido != null) row.sugerido = e.sugerido;
    if (e.dias_desde != null) row.dias_desde = e.dias_desde;
    return row;
  });
  // Limpar programação anterior do dia
  await _SB.from('nado_programacao').delete().eq('data', data);
  // Inserir em lotes de 500 (pode haver 300+ eitos)
  for (let i = 0; i < rows.length; i += 500) {
    const batch = rows.slice(i, i + 500);
    const { error } = await _SB.from('nado_programacao').insert(batch);
    if (error) { console.error('Erro programação Nado:', error); showToast('⚠ Erro ao salvar programação'); return; }
  }
  showToast('✓ Programação salva');
}

async function loadProgramacaoNado(data) {
  const { data: rows, error } = await _SB.from('nado_programacao').select('area,eito_id,plantas').eq('data', data);
  if (error) { console.error('Erro ao carregar programação:', error); return []; }
  return rows || [];
}

async function loadContagemsNado(status) {
  const { data: rows, error } = await _SB.from('nado_contagens').select('*').eq('status', status || 'pendente').order('data', { ascending: false });
  if (error) { console.error('Erro ao carregar contagens:', error); return []; }
  return rows || [];
}

async function atualizarStatusNado(ids, status) {
  const { error } = await _SB.from('nado_contagens').update({ status }).in('id', ids);
  if (error) console.error('Erro ao atualizar status:', error);
}
