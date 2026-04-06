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
      cidadeDestino: v.cidade_destino||null,
      // Campos fábrica
      qtdeFabrica: v.qtde_fabrica||null,
      fora: v.fora||0,
      brix: v.brix||null,
      placa: v.placa||null,
      ticket: v.ticket||null,
      nfComplementar: v.nf_complementar||null,
      valorNfComplementar: parseFloat(v.valor_nf_complementar)||null,
      modoVenda: v.modo_venda||null,
      litrosContrato: v.litros_contrato||null,
      litrosSpot: v.litros_spot||null,
      valorLitroSpot: v.valor_litro_spot||null,
      contratoId: v.contrato_id||null,
      fretePorTon: v.frete_por_ton||null
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
    cidade_destino: v.cidadeDestino||null,
    // Campos fábrica
    qtde_fabrica: v.qtdeFabrica||null,
    fora: v.fora||0,
    brix: v.brix||null,
    placa: v.placa||null,
    ticket: v.ticket||null,
    nf_complementar: v.nfComplementar||null,
    valor_nf_complementar: v.valorNfComplementar||null,
    modo_venda: v.modoVenda||null,
    litros_contrato: v.litrosContrato||null,
    litros_spot: v.litrosSpot||null,
    valor_litro_spot: v.valorLitroSpot||null,
    contrato_id: v.contratoId||null,
    frete_por_ton: v.fretePorTon||null
  };
  const { data, error } = await _SB.from('vendas').upsert(row).select();
  if(error) { console.error('Erro ao salvar venda:', error); showToast('⚠ Erro ao salvar — tente novamente'); return null; }
  return data && data[0];
}

async function excluirVendaSupabase(id) {
  const { error } = await _SB.from('vendas').delete().eq('id', id);
  if(error) { console.error('Erro ao excluir venda:', error); showToast('⚠ Erro ao excluir — tente novamente'); }
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

// ─── CLIENTES ───
let _clientesCache = null;

async function loadClientesSupabase() {
  try {
    const { data, error } = await _SB.from('clientes').select('*').order('nome');
    if (error) throw error;
    _clientesCache = data || [];
    localStorage.setItem('neofrut_clientes_v1', JSON.stringify(_clientesCache));
    return _clientesCache;
  } catch(e) {
    console.error('Erro ao carregar clientes:', e);
    try { _clientesCache = JSON.parse(localStorage.getItem('neofrut_clientes_v1') || '[]'); } catch(e2) { _clientesCache = []; }
    return _clientesCache;
  }
}

function loadClientesLocal() {
  if (_clientesCache && _clientesCache.length > 0) return _clientesCache;
  try { _clientesCache = JSON.parse(localStorage.getItem('neofrut_clientes_v1') || '[]'); } catch(e) { _clientesCache = []; }
  return _clientesCache;
}

async function salvarClienteSupabase(c) {
  const row = {
    nome: c.nome,
    telefone: c.telefone || null,
    email: c.email || null,
    cpf_cnpj: c.cpf_cnpj || null,
    ie: c.ie || null,
    uf: c.uf || null,
    cidade: c.cidade || null,
    endereco: c.endereco || null,
    contato_secundario: c.contato_secundario || null,
    observacoes: c.observacoes || null,
    tipo: c.tipo || 'mesa',
    status: c.status || 'ativo',
    frete_por_ton: c.frete_por_ton || null,
    distancia_km: c.distancia_km || null,
    litros_por_coco: c.litros_por_coco || null,
    atualizado_em: new Date().toISOString()
  };
  if (c.id) row.id = c.id;
  const { data, error } = await _SB.from('clientes').upsert(row, { onConflict: 'nome' }).select();
  if (error) { console.error('Erro ao salvar cliente:', error); showToast('⚠ Erro ao salvar cliente'); return null; }
  // Atualizar cache
  await loadClientesSupabase();
  return data && data[0];
}

async function excluirClienteSupabase(id) {
  const { error } = await _SB.from('clientes').delete().eq('id', id);
  if (error) { console.error('Erro ao excluir cliente:', error); showToast('⚠ Erro ao excluir cliente'); return false; }
  await loadClientesSupabase();
  return true;
}

// ─── CONTRATOS ───
let _contratosCache = null;

async function loadContratosSupabase() {
  try {
    const { data, error } = await _SB.from('contratos').select('*').order('ano', { ascending: false });
    if (error) throw error;
    _contratosCache = (data || []).map(c => ({
      id: c.id,
      cliente: c.cliente,
      ano: c.ano,
      descricao: c.descricao,
      cotas: c.cotas || {},
      fretePorTon: parseFloat(c.frete_por_ton) || 0,
      distanciaKm: c.distancia_km || 0,
      status: c.status || 'ativo',
      dataInicio: c.data_inicio,
      dataFim: c.data_fim,
      observacoes: c.observacoes
    }));
    localStorage.setItem('neofrut_contratos_v1', JSON.stringify(_contratosCache));
    return _contratosCache;
  } catch (e) {
    console.error('Erro ao carregar contratos:', e);
    try { _contratosCache = JSON.parse(localStorage.getItem('neofrut_contratos_v1') || '[]'); } catch (e2) { _contratosCache = []; }
    return _contratosCache;
  }
}

function loadContratosLocal() {
  if (_contratosCache && _contratosCache.length > 0) return _contratosCache;
  try { _contratosCache = JSON.parse(localStorage.getItem('neofrut_contratos_v1') || '[]'); } catch (e) { _contratosCache = []; }
  return _contratosCache;
}

function getContratoAtivo(cliente, ano) {
  const contratos = loadContratosLocal();
  return contratos.find(c => c.cliente === cliente && c.ano === (ano || new Date().getFullYear()) && c.status === 'ativo') || null;
}

function getCotaMes(contrato, mes) {
  if (!contrato || !contrato.cotas) return null;
  const key = String(mes).padStart(2, '0');
  return contrato.cotas[key] || null;
}

function getLitrosUsadosMes(cliente, contratoId, ano, mes) {
  const vendas = loadVendas();
  const mesStr = String(mes).padStart(2, '0');
  const prefix = `${ano}-${mesStr}`;
  return vendas
    .filter(v => v.cliente === cliente && v.data && v.data.startsWith(prefix) && v.contratoId === contratoId && v.litrosContrato)
    .reduce((s, v) => s + (v.litrosContrato || 0), 0);
}

async function salvarContratoSupabase(c) {
  const row = {
    id: c.id || Date.now(),
    cliente: c.cliente,
    ano: c.ano,
    descricao: c.descricao || null,
    cotas: c.cotas || {},
    frete_por_ton: c.fretePorTon || 0,
    distancia_km: c.distanciaKm || 0,
    status: c.status || 'ativo',
    data_inicio: c.dataInicio || null,
    data_fim: c.dataFim || null,
    observacoes: c.observacoes || null
  };
  const { error } = await _SB.from('contratos').upsert(row);
  if (error) { console.error('Erro ao salvar contrato:', error); showToast('⚠ Erro ao salvar contrato'); return null; }
  await loadContratosSupabase();
  return row;
}

async function excluirContratoSupabase(id) {
  const { error } = await _SB.from('contratos').delete().eq('id', id);
  if (error) { console.error('Erro ao excluir contrato:', error); showToast('⚠ Erro ao excluir contrato'); return false; }
  await loadContratosSupabase();
  return true;
}

function getMapaClientes() {
  const clientes = loadClientesLocal();
  if (clientes.length > 0) {
    const mapa = {};
    clientes.forEach(c => {
      if (c.status === 'ativo') {
        mapa[c.nome] = { uf: c.tipo === 'fabrica' ? 'FÁBRICA' : (c.uf || ''), cidade: c.tipo === 'fabrica' ? '—' : (c.cidade || ''), fabrica: c.tipo === 'fabrica' };
      }
    });
    return mapa;
  }
  return MAPA_CLIENTES;
}
