// ─────────── LANCAMENTO ───────────

// lista ordenada globalmente para navegação sequencial por teclado
let _allInputs = [];

// ── RASCUNHO ──
function salvarRascunho() {
  const data = document.getElementById('lanc-data')?.value || today();
  const rascunho = { data, area: window._lancAreaAtiva || 'todas', valores: {} };
  document.querySelectorAll('.p-input').forEach(inp => {
    const v = parseInt(inp.value) || 0;
    if (v > 0) {
      const key = `${inp.dataset.area}||${inp.dataset.eito}||${inp.dataset.campo}`;
      rascunho.valores[key] = v;
    }
  });
  if (Object.keys(rascunho.valores).length > 0) {
    localStorage.setItem(SK_RASCUNHO, JSON.stringify(rascunho));
  } else {
    localStorage.removeItem(SK_RASCUNHO);
  }

  // atualizar indicador de rascunho na sticky
  const statusEl = document.getElementById('lanc-rascunho-status');
  if (statusEl) {
    const agora = new Date();
    const hhmm = agora.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
    statusEl.textContent = `💾 Rascunho salvo às ${hhmm}`;
  }
}

function carregarRascunho() {
  const saved = localStorage.getItem(SK_RASCUNHO);
  if (!saved) return;
  try {
    const r = JSON.parse(saved);
    const dataEl = document.getElementById('lanc-data');
    if (dataEl && r.data) dataEl.value = r.data;
    if (r.area && r.area !== 'todas') {
      window._lancAreaAtiva = r.area;
      renderAreaBtns(r.area);
      renderLancamento();
    }
    let total = 0;
    for (const [key, val] of Object.entries(r.valores)) {
      const [area, eitoId, campo] = key.split('||');
      const el = document.getElementById(`lanc-${area}-${eitoId}-${campo}`);
      if (el) { el.value = val; el.classList.add('filled'); onPInput(area, eitoId); total++; }
    }
    if (total > 0) showToast(`📋 Rascunho restaurado — ${total} campo(s)`);
  } catch(err) {
    localStorage.removeItem(SK_RASCUNHO);
  }
}

function limparRascunho() {
  localStorage.removeItem(SK_RASCUNHO);
}

// ── INIT & RENDER ──
function initLancamento() {
  document.getElementById('lanc-data').value = today();
  renderAreaBtns(window._lancAreaAtiva || 'todas');
  renderLancamento();
  if (localStorage.getItem(SK_RASCUNHO)) setTimeout(carregarRascunho, 120);
}

function renderAreaBtns(areaAtiva) {
  const wrap = document.getElementById('lanc-area-btns');
  if (!wrap) return;
  const areas = ORDEM_AREAS.filter(a => DB[a]);
  Object.keys(DB).forEach(a => { if (!areas.includes(a)) areas.push(a); });
  const nomesCurtos = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  wrap.innerHTML = `<button class="area-btn todas ${areaAtiva==='todas'?'ativo':''}" onclick="selecionarAreaLanc('todas')">Todas</button>` +
    areas.map(a => `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaLanc('${a}')">${nomesCurtos[a]||a}</button>`).join('');
}

function selecionarAreaLanc(area) {
  // guardar área ativa numa variável global
  window._lancAreaAtiva = area;
  renderAreaBtns(area);
  renderLancamento();
}

function renderLancamento() {
  const filtroArea = window._lancAreaAtiva || 'todas';
  let areas;
  if (filtroArea === 'todas') {
    areas = ORDEM_AREAS.filter(a => DB[a]);
    Object.keys(DB).forEach(a => { if (!areas.includes(a)) areas.push(a); });
  } else {
    areas = [filtroArea];
  }
  const tbody = document.getElementById('planilha-tbody');
  _allInputs = [];

  let rows = '';
  for (const area of areas) {
    const eitos = DB[area];
    rows += `<tr class="area-sep"><td colspan="8">${area} — ${eitos.length} eitos</td></tr>`;
    for (const e of eitos) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st = statusDias(dias);
      const stColor = st==='vermelho'?'var(--vermelho)':st==='amarelo'?'var(--amarelo)':st==='verde'?'var(--verde)':'var(--muted)';
      const mesaId = `lanc-${area}-${e.id}-mesa`;
      const fabId  = `lanc-${area}-${e.id}-fabrica`;
      const totalId = `lanc-${area}-${e.id}-total`;
      const pctId   = `lanc-${area}-${e.id}-pct`;
      _allInputs.push({area, eitoId: e.id, campo:'mesa', id: mesaId});
      _allInputs.push({area, eitoId: e.id, campo:'fabrica', id: fabId});
      // calcular ÚLT. e MÉD.3 para referência
      const hist = e.historico || [];
      const ultVal = hist.length > 0 ? hist[hist.length-1].total : null;
      const med3 = hist.length > 0
        ? Math.round(hist.slice(-3).reduce((s,h)=>s+h.total,0) / Math.min(hist.length,3))
        : null;
      const ultFmt = ultVal !== null ? fmtNum(ultVal) : '—';
      const med3Fmt = med3 !== null ? fmtNum(med3) : '—';

      rows += `<tr id="row-${area}-${e.id}">
        <td class="p-eito" style="cursor:pointer;color:var(--forest);text-decoration:underline dotted" onclick="openSidePanel('${area}','${e.id}')" title="Ver histórico do eito">${e.id}</td>
        <td class="p-status"><span class="status-dot sd-${st}" style="margin:0 auto;display:block;width:8px;height:8px"></span></td>
        <td class="p-dias">${dias!==null?dias+'d':'—'}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:center">${e.plantas}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:right;padding-right:8px">${ultFmt}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:right;padding-right:8px">${med3Fmt}</td>
        <td><input class="p-input" type="number" min="0" placeholder="—"
          id="${mesaId}" data-area="${area}" data-eito="${e.id}" data-campo="mesa"
          data-med="${med3 !== null ? med3 : 0}"
          oninput="onPInput('${area}','${e.id}')"
          onkeydown="navPInput(event,'${mesaId}')"></td>
        <td><input class="p-input" type="number" min="0" placeholder="—"
          id="${fabId}" data-area="${area}" data-eito="${e.id}" data-campo="fabrica"
          oninput="onPInput('${area}','${e.id}')"
          onkeydown="navPInput(event,'${fabId}')"></td>
        <td class="p-total" id="${totalId}">—</td>
        <td class="p-pct" id="${pctId}">—</td>
      </tr>`;
    }
  }

  tbody.innerHTML = rows;
  document.getElementById('planilha-tfoot').innerHTML = `
    <tr style="border-top:2px solid var(--border);background:var(--surface2)">
      <td colspan="6" style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">TOTAL</td>
      <td id="tot-mesa" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
      <td id="tot-fab"  style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
      <td id="tot-total" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--verde)">—</td>
      <td id="tot-pct" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--muted)">—</td>
    </tr>`;
  atualizarContador();
  salvarRascunho();
}

// ── INPUT HANDLERS ──
function onPInput(area, eitoId) {
  const mesaEl  = document.getElementById(`lanc-${area}-${eitoId}-mesa`);
  const fabEl   = document.getElementById(`lanc-${area}-${eitoId}-fabrica`);
  const mesa    = parseInt(mesaEl?.value)||0;
  const fabrica = parseInt(fabEl?.value)||0;
  const total   = mesa + fabrica;
  const pct     = total > 0 ? Math.round(mesa/total*100) : null;
  const totalEl = document.getElementById(`lanc-${area}-${eitoId}-total`);
  const pctEl   = document.getElementById(`lanc-${area}-${eitoId}-pct`);
  const row     = document.getElementById(`row-${area}-${eitoId}`);
  if (totalEl) {
    totalEl.textContent = total > 0 ? fmtNum(total) : '—';
    totalEl.className   = 'p-total' + (total>0?' has-val':'');
  }
  if (pctEl) pctEl.textContent = pct !== null ? pct+'%' : '—';
  if (row)   row.classList.toggle('row-filled', total>0);
  // alerta de desvio: total vs média histórica
  const med = parseInt(mesaEl?.dataset.med)||0;
  if (med > 0 && total > 0 && totalEl) {
    const ratio = total / med;
    if (ratio > 1.5) {
      totalEl.style.color = 'var(--amarelo)';
      totalEl.title = `⚠️ ${fmtNum(total)} parece alto vs média ${fmtNum(med)}`;
    } else if (ratio < 0.5) {
      totalEl.style.color = 'var(--vermelho)';
      totalEl.title = `⚠️ ${fmtNum(total)} parece baixo vs média ${fmtNum(med)}`;
    } else {
      totalEl.style.color = '';
      totalEl.title = '';
    }
  }
  // input styling
  mesaEl?.classList.toggle('filled', mesa>0);
  fabEl?.classList.toggle('filled', fabrica>0);
  atualizarContador();
  salvarRascunho();
}

function navPInput(e, currentId) {
  const isEnter = e.key === 'Enter';
  const isTab   = e.key === 'Tab';
  if (!isEnter && !isTab) return;
  e.preventDefault();
  const idx = _allInputs.findIndex(i => i.id === currentId);
  if (idx < 0) return;
  const current = _allInputs[idx];

  let nextIdx;
  if (isEnter) {
    // Enter: mesa→fábrica do mesmo eito; fábrica→fábrica do mesmo eito (fica)
    if (current.campo === 'mesa') {
      // próximo item é fábrica do mesmo eito (idx+1)
      nextIdx = idx + 1;
    } else {
      // já está na fábrica, Enter vai para mesa do próximo eito
      nextIdx = idx + 1; // fábrica atual é idx, próxima mesa é idx+1
    }
  } else {
    // Tab: pula a linha inteira → vai para mesa do próximo eito
    if (current.campo === 'mesa') {
      nextIdx = idx + 2; // pula mesa+fábrica atual, vai para próxima mesa
    } else {
      nextIdx = idx + 1; // já está na fábrica, vai para próxima mesa
    }
  }
  if (nextIdx === undefined || nextIdx >= _allInputs.length) nextIdx = 0;
  const nextEl = document.getElementById(_allInputs[nextIdx].id);
  if (nextEl) { nextEl.focus(); nextEl.select(); }
}


function pularProximoVencido() {
  // encontrar primeiro input de mesa de eito vencido (>=21d) não preenchido
  const inputs = document.querySelectorAll('.p-input[data-campo="mesa"]');
  for (const inp of inputs) {
    if ((parseInt(inp.value)||0) > 0) continue; // já preenchido
    const area   = inp.dataset.area;
    const eitoId = inp.dataset.eito;
    const eito   = DB[area]?.find(e=>e.id===eitoId);
    if (!eito) continue;
    const ult  = getUltima(eito);
    const dias = ult ? diasDesde(ult.data) : null;
    if (dias === null || dias >= 21) {
      inp.scrollIntoView({behavior:'smooth', block:'center'});
      inp.focus();
      inp.select();
      return;
    }
  }
  showToast('Nenhum eito vencido sem lançamento encontrado');
}

function mostrarSoPendentes() {
  const btn = document.getElementById('btn-pendentes');
  const rows = document.querySelectorAll('#planilha-tbody tr:not(.area-sep)');
  const ativo = btn.dataset.ativo === '1';
  rows.forEach(row => {
    if (ativo) { row.style.display = ''; }
    else {
      const dias = row.querySelector('.p-dias')?.textContent;
      const d = parseInt(dias);
      if (!isNaN(d) && d < 21 && dias !== '—') row.style.display = 'none';
      else if (dias === '—') row.style.display = '';
    }
  });
  btn.dataset.ativo = ativo ? '0' : '1';
  btn.style.color = ativo ? '' : 'var(--vermelho)';
  btn.style.borderColor = ativo ? '' : 'var(--vermelho-border)';
}

function onLancInput(el, area, eitoId) {
  const v = parseInt(el.value)||0;
  el.classList.toggle('filled', v > 0);
  atualizarContador();
}

function navInput(e, area, eitoId, campo) {
  if (e.key === 'Tab' || e.key === 'Enter') {
    e.preventDefault();
    if (campo === 'mesa') {
      const fab = document.getElementById(`lanc-${area}-${eitoId}-fabrica`);
      if (fab) { fab.focus(); fab.select(); }
    } else {
      // próximo eito mesa
      const eitos = DB[area];
      const idx = eitos.findIndex(e=>e.id===eitoId);
      if (idx < eitos.length-1) {
        const next = document.getElementById(`lanc-${area}-${eitos[idx+1].id}-mesa`);
        if (next) { next.focus(); next.select(); }
      }
    }
  }
}

function atualizarContador() {
  const vistos = new Set();
  let totMesa=0, totFab=0;
  document.querySelectorAll('.p-input').forEach(inp => {
    const v = parseInt(inp.value)||0;
    if (v > 0) {
      vistos.add(`${inp.dataset.area}||${inp.dataset.eito}`);
      if (inp.dataset.campo==='mesa') totMesa+=v;
      else totFab+=v;
    }
  });
  const count = vistos.size;
  const total = totMesa+totFab;
  document.getElementById('lanc-contador').textContent =
    `${count} eito${count!==1?'s':''} preenchido${count!==1?'s':''}`;
  document.getElementById('lanc-total-preview').textContent = `Total: ${fmtNum(total)}`;
  document.getElementById('lanc-mesa-preview').textContent  = `Mesa: ${fmtNum(totMesa)}`;
  document.getElementById('lanc-fab-preview').textContent   = `Fábrica: ${fmtNum(totFab)}`;
  // atualizar rodapé
  const tMesa = document.getElementById('tot-mesa');
  const tFab  = document.getElementById('tot-fab');
  const tTot  = document.getElementById('tot-total');
  const tPct  = document.getElementById('tot-pct');
  if(tMesa) tMesa.textContent = totMesa>0?fmtNum(totMesa):'—';
  if(tFab)  tFab.textContent  = totFab>0?fmtNum(totFab):'—';
  if(tTot)  tTot.textContent  = total>0?fmtNum(total):'—';
  if(tPct)  tPct.textContent  = total>0?Math.round(totMesa/total*100)+'%':'—';
}

function contarEitosPreenchidos() {
  const vistos = new Set();
  document.querySelectorAll('.p-input').forEach(inp => {
    if ((parseInt(inp.value)||0)>0) vistos.add(`${inp.dataset.area}||${inp.dataset.eito}`);
  });
  return vistos.size;
}

function limparLancamento() {
  limparRascunho();
  document.querySelectorAll('.p-input').forEach(inp => {
    inp.value = '';
    inp.classList.remove('filled');
  });
  document.querySelectorAll('.p-total').forEach(el => { el.textContent='—'; el.className='p-total'; });
  document.querySelectorAll('.p-pct').forEach(el => el.textContent='—');
  document.querySelectorAll('#planilha-tbody tr:not(.area-sep)').forEach(r=>r.classList.remove('row-filled'));
  atualizarContador();
}

function getLancamentos() {
  const vistos = {};
  document.querySelectorAll('.p-input').forEach(inp => {
    const key = `${inp.dataset.area}||${inp.dataset.eito}`;
    if (!vistos[key]) vistos[key] = {area:inp.dataset.area, eitoId:inp.dataset.eito, mesa:0, fabrica:0};
    vistos[key][inp.dataset.campo] = parseInt(inp.value)||0;
  });
  return Object.values(vistos).filter(v => v.mesa>0 || v.fabrica>0);
}

// ── REVISAO & CONFIRMAR ──
function abrirRevisao() {
  const data = document.getElementById('lanc-data').value;
  if (!data) { alert('Informe a data da colheita.'); return; }
  const lotes = getLancamentos();
  if (!lotes.length) { alert('Nenhum eito preenchido.'); return; }

  document.getElementById('revisao-sub').textContent =
    `Data: ${fmtData(data)} · ${lotes.length} eito${lotes.length!==1?'s':''} · Total: ${fmtNum(lotes.reduce((s,l)=>s+l.mesa+l.fabrica,0))} cocos`;

  const tbody = document.getElementById('revisao-tbody');
  const tfoot = document.getElementById('revisao-tfoot');
  let totMesa=0, totFab=0, totTotal=0;

  tbody.innerHTML = lotes.map(l => {
    const total = l.mesa + l.fabrica;
    totMesa += l.mesa; totFab += l.fabrica; totTotal += total;
    return `<tr>
      <td style="color:var(--accent2)">${l.area}</td>
      <td style="font-weight:600">${l.eitoId}</td>
      <td>${fmtNum(l.mesa)}</td>
      <td>${fmtNum(l.fabrica)}</td>
      <td style="font-weight:700;color:var(--verde)">${fmtNum(total)}</td>
    </tr>`;
  }).join('');

  tfoot.innerHTML = `<tr style="border-top:2px solid var(--border)">
    <td colspan="2" style="font-weight:700;font-size:12px;padding:10px 12px;color:var(--muted)">TOTAL</td>
    <td style="font-weight:700;font-family:var(--font-mono)">${fmtNum(totMesa)}</td>
    <td style="font-weight:700;font-family:var(--font-mono)">${fmtNum(totFab)}</td>
    <td style="font-weight:700;font-family:var(--font-mono);color:var(--verde)">${fmtNum(totTotal)}</td>
  </tr>`;

  document.getElementById('modal-revisao').classList.add('open');
}

async function confirmarLancamento() {
  const data = document.getElementById('lanc-data').value;
  const lotes = getLancamentos();
  let count = 0;
  for (const l of lotes) {
    const eito = DB[l.area]?.find(e=>e.id===l.eitoId);
    if (!eito) continue;
    if (!eito.historico) eito.historico = [];
    eito.historico.push({ data, total: l.mesa+l.fabrica, mesa: l.mesa, fabrica: l.fabrica });
    count++;
  }
  await saveData();
  // salvar colheitas em lote no Supabase
  for(const l of lotes) {
    await salvarColheitaSupabase(l.area, l.eitoId, {
      data, total: l.mesa+l.fabrica, mesa: l.mesa, fabrica: l.fabrica
    });
  }
  limparRascunho();
  limparLancamento();
  renderDashboard();
  setTimeout(renderMapa, 80);
  showToast(`✓ ${count} eito${count!==1?'s':''} registrado${count!==1?'s':''} — ${fmtData(data)}`);
  mostrarResumo(data, lotes);
}

// ── RESUMO WHATSAPP ──
function gerarTextoResumo(data, lotes) {
  const totMesa  = lotes.reduce((s,l) => s+l.mesa, 0);
  const totFab   = lotes.reduce((s,l) => s+l.fabrica, 0);
  const totGeral = totMesa + totFab;
  const pctMesa  = totGeral > 0 ? Math.round(totMesa/totGeral*100) : 0;
  const nomes = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  const porArea = {};
  for (const l of lotes) {
    if (!porArea[l.area]) porArea[l.area] = {mesa:0, fabrica:0};
    porArea[l.area].mesa    += l.mesa;
    porArea[l.area].fabrica += l.fabrica;
  }
  const [ano,mes,dia] = data.split('-');
  const linhas = Object.entries(porArea)
    .sort((a,b) => (b[1].mesa+b[1].fabrica) - (a[1].mesa+a[1].fabrica))
    .map(([area, v]) => {
      const tot = v.mesa + v.fabrica;
      const nm  = nomes[area] || area;
      return v.fabrica > 0
        ? `  • ${nm}: ${fmtNum(tot)} (M:${fmtNum(v.mesa)} / F:${fmtNum(v.fabrica)})`
        : `  • ${nm}: ${fmtNum(tot)}`;
    }).join('\n');
  return `🥥 *COLHEITA NEOFRUT — ${dia}/${mes}/${ano}*\n\n` +
    `📦 *Total:* ${fmtNum(totGeral)} cocos\n` +
    `🟢 *Mesa:* ${fmtNum(totMesa)} (${pctMesa}%)\n` +
    `🏭 *Fábrica:* ${fmtNum(totFab)} (${100-pctMesa}%)\n` +
    `📋 *Eitos:* ${lotes.length}\n\n` +
    `*Por área:*\n${linhas}`;
}

function mostrarResumo(data, lotes) {
  document.getElementById('resumo-texto').textContent = gerarTextoResumo(data, lotes);
  // esconder tabela e botões, mostrar resumo
  document.querySelector('#modal-revisao .revisao-table').closest('div').style.display = 'none';
  document.getElementById('revisao-sub').style.display    = 'none';
  document.getElementById('revisao-actions').style.display = 'none';
  document.getElementById('resumo-panel').style.display   = 'block';
}

function fecharResumo() {
  // restaurar estado original do modal
  document.querySelector('#modal-revisao .revisao-table').closest('div').style.display = '';
  document.getElementById('revisao-sub').style.display    = '';
  document.getElementById('revisao-actions').style.display = '';
  document.getElementById('resumo-panel').style.display   = 'none';
  closeModal('modal-revisao');
}

function copiarResumo() {
  const texto = document.getElementById('resumo-texto').textContent;
  const btn   = document.getElementById('resumo-btn');
  const fallback = txt => {
    const el = document.createElement('textarea');
    el.value = txt; el.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(el); el.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(el);
  };
  navigator.clipboard?.writeText(texto).catch(() => fallback(texto)) || fallback(texto);
  btn.textContent = '✓ Copiado!';
  btn.classList.add('copiado');
  setTimeout(() => {
    btn.textContent = '📋 Copiar para WhatsApp';
    btn.classList.remove('copiado');
  }, 2500);
}
