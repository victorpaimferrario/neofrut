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
  renderNadoCard();
}

function renderAreaBtns(areaAtiva) {
  const wrap = document.getElementById('lanc-area-btns');
  if (!wrap) return;
  const areas = ORDEM_AREAS.filter(a => DB[a]);
  Object.keys(DB).forEach(a => { if (!areas.includes(a)) areas.push(a); });
  wrap.innerHTML = `<button class="area-btn todas ${areaAtiva==='todas'?'ativo':''}" onclick="selecionarAreaLanc('todas')">Todas</button>` +
    areas.map(a => `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaLanc('${a}')">${NOMES_CURTOS[a]||a}</button>`).join('');
}

function selecionarAreaLanc(area) {
  // guardar área ativa numa variável global
  window._lancAreaAtiva = area;
  renderAreaBtns(area);
  renderLancamento();
}

// ── SORT ──
let _lancSort = { col: 'eito', asc: true };

function sortLancEitos(eitos, col, asc) {
  const arr = eitos.map(e => {
    const ult = getUltima(e);
    const dias = ult ? diasDesde(ult.data) : 9999;
    const st = statusDias(dias === 9999 ? null : dias);
    const stOrder = st === 'critico' ? 0 : st === 'vermelho' ? 1 : st === 'amarelo' ? 2 : st === 'verde' ? 3 : 4;
    return { e, dias, stOrder };
  });
  arr.sort((a, b) => {
    let cmp = 0;
    if (col === 'eito') cmp = eitoNum(a.e.id) - eitoNum(b.e.id);
    else if (col === 'dias') cmp = a.dias - b.dias;
    else if (col === 'status') cmp = a.stOrder - b.stOrder || a.dias - b.dias;
    else if (col === 'plantas') cmp = (a.e.plantas || 0) - (b.e.plantas || 0);
    return asc ? cmp : -cmp;
  });
  return arr.map(x => x.e);
}

function setLancSort(col) {
  if (_lancSort.col === col) _lancSort.asc = !_lancSort.asc;
  else { _lancSort.col = col; _lancSort.asc = col === 'dias' || col === 'status' ? false : true; }
  renderLancamento();
}

function thSortable(col, label, align) {
  const arrow = _lancSort.col === col ? (_lancSort.asc ? ' ▲' : ' ▼') : '';
  const style = align === 'center' ? 'text-align:center' : align === 'right' ? 'text-align:right' : '';
  const cls = align === 'right' ? ' class="num"' : '';
  return `<th${cls} style="${style};cursor:pointer;user-select:none" onclick="setLancSort('${col}')">${label}${arrow}</th>`;
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
  const container = document.getElementById('planilha-container');
  _allInputs = [];

  let html = '';
  for (const area of areas) {
    const eitosRaw = DB[area];
    const eitos = sortLancEitos(eitosRaw, _lancSort.col, _lancSort.asc);

    // Título da área ACIMA do cabeçalho
    html += `<div class="area-sep-title">${area} — ${eitosRaw.length} eitos</div>`;
    html += `<table class="planilha-table"><thead><tr>`;
    html += thSortable('eito', 'EITO', '');
    html += thSortable('status', 'ST', 'center');
    html += thSortable('dias', 'DIAS', 'center');
    html += thSortable('plantas', 'PL', 'center');
    html += `<th class="num" style="color:var(--muted)">ÚLT.</th>`;
    html += `<th class="num" style="color:var(--muted)">MÉD.3</th>`;
    html += `<th class="num">MESA</th>`;
    html += `<th class="num">FÁBRICA</th>`;
    html += `<th class="num">TOTAL</th>`;
    html += `<th class="num">% MESA</th>`;
    html += `<th style="text-align:center;font-size:9px;width:40px" title="Marcar como colheita parcial">✂️</th>`;
    html += `</tr></thead><tbody>`;

    for (const e of eitos) {
      // Usar última completa para semáforo (ignora parciais)
      const parcialPend = getParcialPendente(e);
      const ultRef = parcialPend ? getUltimaCompleta(e) : getUltima(e);
      const dias = ultRef ? diasDesde(ultRef.data) : null;
      const st = statusDias(dias);
      const mesaId = `lanc-${area}-${e.id}-mesa`;
      const fabId  = `lanc-${area}-${e.id}-fabrica`;
      const totalId = `lanc-${area}-${e.id}-total`;
      const pctId   = `lanc-${area}-${e.id}-pct`;
      const parcialId = `lanc-${area}-${e.id}-parcial`;
      _allInputs.push({area, eitoId: e.id, campo:'mesa', id: mesaId});
      _allInputs.push({area, eitoId: e.id, campo:'fabrica', id: fabId});
      const hist = (e.historico || []).filter(h => !h.parcial);
      const ultVal = hist.length > 0 ? hist[hist.length-1].total : null;
      const med3 = hist.length > 0
        ? Math.round(hist.slice(-3).reduce((s,h)=>s+h.total,0) / Math.min(hist.length,3))
        : null;
      const ultFmt = ultVal !== null ? fmtNum(ultVal) : '—';
      const med3Fmt = med3 !== null ? fmtNum(med3) : '—';
      const parcialBadge = parcialPend
        ? `<span style="font-size:8px;font-weight:800;background:#ffc107;color:#856404;padding:1px 5px;border-radius:3px;margin-left:4px" title="Parcial pendente: ${fmtNum(parcialPend.total)} cocos de ${fmtData(parcialPend.data)}">PARCIAL ${fmtNum(parcialPend.total)}</span>`
        : '';

      html += `<tr id="row-${area}-${e.id}" ${parcialPend?'style="background:#fffbeb"':''}>
        <td class="p-eito" style="cursor:pointer;color:var(--forest);text-decoration:underline dotted" onclick="openSidePanel('${area}','${e.id}')" title="Ver histórico do eito">${e.id}${parcialBadge}</td>
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
        <td style="text-align:center"><input type="checkbox" id="${parcialId}" title="Marcar como colheita parcial" style="cursor:pointer;width:14px;height:14px"></td>
      </tr>`;
    }
    html += `</tbody><tfoot><tr style="border-top:2px solid var(--border);background:var(--surface2)">
      <td colspan="6" style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">TOTAL ${NOMES_CURTOS[area]||area}</td>
      <td class="tot-mesa-area" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
      <td class="tot-fab-area"  style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
      <td class="tot-total-area" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--verde)">—</td>
      <td class="tot-pct-area" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--muted)">—</td>
      <td></td>
    </tr></tfoot></table>`;
  }

  // Rodapé geral
  html += `<table class="planilha-table"><tfoot id="planilha-tfoot"><tr style="border-top:2px solid var(--border);background:var(--surface2)">
    <td colspan="6" style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">TOTAL GERAL</td>
    <td id="tot-mesa" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
    <td id="tot-fab"  style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
    <td id="tot-total" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--verde)">—</td>
    <td id="tot-pct" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--muted)">—</td>
  </tr></tfoot></table>`;

  container.innerHTML = html;
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
  const nextRef = _allInputs[nextIdx];
  if (!nextRef) return;
  const nextEl = document.getElementById(nextRef.id);
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
    if (!vistos[key]) vistos[key] = {area:inp.dataset.area, eitoId:inp.dataset.eito, mesa:0, fabrica:0, parcial:false};
    vistos[key][inp.dataset.campo] = parseInt(inp.value)||0;
  });
  // Checar checkbox parcial
  for (const v of Object.values(vistos)) {
    const cb = document.getElementById(`lanc-${v.area}-${v.eitoId}-parcial`);
    if (cb) v.parcial = cb.checked;
  }
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
    const eito = DB[l.area]?.find(e=>e.id===l.eitoId);
    const pend = eito ? getParcialPendente(eito) : null;
    totMesa += l.mesa; totFab += l.fabrica; totTotal += total;
    const parcialTag = l.parcial ? '<span style="font-size:8px;font-weight:800;background:#ffc107;color:#856404;padding:1px 5px;border-radius:3px;margin-left:4px">PARCIAL</span>' : '';
    const mergeTag = pend && !l.parcial ? '<span style="font-size:8px;font-weight:800;background:var(--verde);color:#fff;padding:1px 5px;border-radius:3px;margin-left:4px">+'+fmtNum(pend.total)+' pendente = '+fmtNum(total+pend.total)+'</span>' : '';
    return `<tr>
      <td style="color:var(--accent2)">${escapeHtml(l.area)}</td>
      <td style="font-weight:600">${escapeHtml(l.eitoId)}${parcialTag}${mergeTag}</td>
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

  // Popular datalist de clientes
  const sel = document.getElementById('revisao-cliente');
  const dl = document.getElementById('revisao-cliente-list');
  dl.innerHTML = '';
  const clientes = Object.keys(getMapaClientes()).sort();
  clientes.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    dl.appendChild(opt);
  });
  sel.value = '';
  document.getElementById('revisao-cliente-erro').style.display = 'none';

  document.getElementById('modal-revisao').classList.add('open');
}

let _confirmandoLanc = false;
async function confirmarLancamento() {
  if (_confirmandoLanc) return;
  const btn = document.querySelector('#modal-revisao .btn-green');
  // Desabilita imediatamente para feedback visual e evitar double-click
  if (btn) btn.disabled = true;
  try {
    // Validar ANTES de travar o flag, para permitir novas tentativas
    const data = document.getElementById('lanc-data').value;
    const cliente = document.getElementById('revisao-cliente').value;
    if (!cliente) {
      document.getElementById('revisao-cliente-erro').style.display = 'block';
      document.getElementById('revisao-cliente').focus();
      if (btn) btn.disabled = false;
      return;
    }
    const lotes = getLancamentos();
    if (!lotes || !lotes.length) {
      showToast('Nenhum eito para lançar');
      if (btn) btn.disabled = false;
      return;
    }
    _confirmandoLanc = true;
    if (btn) btn.textContent = '⏳ Salvando...';
    const lancId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
    let count = 0;
    const parcialMerges = []; // {area, eitoId, oldId} para deletar do Supabase
    for (const l of lotes) {
      const eito = DB[l.area]?.find(e=>e.id===l.eitoId);
      if (!eito) continue;
      if (!eito.historico) eito.historico = [];

      // Verificar se há parcial pendente para merge
      const pend = getParcialPendente(eito);
      if (pend && !l.parcial) {
        // Merge: somar parcial + novo lançamento
        const mergedTotal = pend.total + l.mesa + l.fabrica;
        const mergedMesa = (pend.mesa||0) + l.mesa;
        const mergedFab = (pend.fabrica||0) + l.fabrica;
        // Remover a entrada parcial do histórico
        if (pend._id) parcialMerges.push({ area: l.area, eitoId: l.eitoId, oldId: pend._id, oldData: pend.data });
        eito.historico = eito.historico.filter(h => h !== pend);
        // Adicionar registro completo combinado
        eito.historico.push({ data, total: mergedTotal, mesa: mergedMesa, fabrica: mergedFab, cliente, lancamento_id: lancId });
      } else {
        // Lançamento normal (ou nova parcial)
        const entry = { data, total: l.mesa+l.fabrica, mesa: l.mesa, fabrica: l.fabrica, cliente, lancamento_id: lancId };
        if (l.parcial) entry.parcial = true;
        eito.historico.push(entry);
      }
      count++;
    }
    await saveData();
    // Deletar parciais mergeadas do Supabase
    for (const m of parcialMerges) {
      try {
        await _SB.from('colheitas').delete().eq('area', m.area).eq('eito_id', m.eitoId).eq('data', m.oldData);
      } catch(e) { console.warn('Erro ao deletar parcial:', e); }
    }
    // Salvar colheitas em lote no Supabase
    for(const l of lotes) {
      const eito = DB[l.area]?.find(e=>e.id===l.eitoId);
      const ultH = eito?.historico?.[eito.historico.length-1];
      await salvarColheitaSupabase(l.area, l.eitoId, {
        data, total: ultH?.total || (l.mesa+l.fabrica), mesa: ultH?.mesa || l.mesa, fabrica: ultH?.fabrica || l.fabrica,
        cliente, lancamento_id: lancId, parcial: l.parcial || false
      });
    }
    limparRascunho();
    limparLancamento();
    renderDashboard();
    setTimeout(renderMapa, 80);
    showToast(`✓ ${count} eito${count!==1?'s':''} registrado${count!==1?'s':''} — ${fmtData(data)} · ${cliente}`);
    mostrarResumo(data, lotes, cliente);
  } finally {
    _confirmandoLanc = false;
    if (btn) { btn.disabled = false; btn.textContent = '✅ Confirmar Lançamento'; }
  }
}

// ── RESUMO WHATSAPP ──
function gerarTextoResumo(data, lotes, cliente) {
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
  const parciais = lotes.filter(l => l.parcial);
  const parcialInfo = parciais.length > 0
    ? `\n✂️ *Parciais:* ${parciais.map(l => `${(NOMES_CURTOS[l.area]||l.area)} ${l.eitoId}`).join(', ')}`
    : '';
  return `🥥 *COLHEITA NEOFRUT — ${dia}/${mes}/${ano}*\n\n` +
    (cliente ? `👤 *Cliente:* ${cliente}\n` : '') +
    `📦 *Total:* ${fmtNum(totGeral)} cocos\n` +
    `🟢 *Mesa:* ${fmtNum(totMesa)} (${pctMesa}%)\n` +
    `🏭 *Fábrica:* ${fmtNum(totFab)} (${100-pctMesa}%)\n` +
    `📋 *Eitos:* ${lotes.length}${parcialInfo}\n\n` +
    `*Por área:*\n${linhas}`;
}

function mostrarResumo(data, lotes, cliente) {
  document.getElementById('resumo-texto').textContent = gerarTextoResumo(data, lotes, cliente);
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
    try { document.execCommand('copy'); } catch(e) { console.warn('Clipboard não disponível:', e); }
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

// ── VINCULAR CLIENTES A COLHEITAS ──
function abrirVincularClientes() {
  // Descobrir meses disponíveis
  const meses = new Set();
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      for (const h of (e.historico || [])) {
        if (h.data) meses.add(h.data.substring(0, 7));
      }
    }
  }
  const sel = document.getElementById('vincular-mes');
  const mesesOrdenados = [...meses].sort().reverse();
  sel.innerHTML = mesesOrdenados.map(m => {
    const [a, mm] = m.split('-');
    const nomesMes = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    return `<option value="${m}">${nomesMes[parseInt(mm)]}/${a}</option>`;
  }).join('');
  renderVincularClientes();
  document.getElementById('modal-vincular-clientes').classList.add('open');
}

function renderVincularClientes() {
  const mesSel = document.getElementById('vincular-mes').value;
  const somenteSem = document.getElementById('vincular-somente-sem').checked;
  if (!mesSel) return;

  // Agrupar por data+area
  const grupos = {};
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      for (const h of (e.historico || [])) {
        if (!h.data || !h.data.startsWith(mesSel)) continue;
        if (somenteSem && h.cliente) continue;
        const key = h.data + '|' + area;
        if (!grupos[key]) grupos[key] = { data: h.data, area, eitos: 0, total: 0, cliente: h.cliente || '' };
        grupos[key].eitos++;
        grupos[key].total += h.total;
        // Se algum eito do grupo já tem cliente, usar esse
        if (h.cliente && !grupos[key].cliente) grupos[key].cliente = h.cliente;
      }
    }
  }

  const lista = Object.values(grupos).sort((a, b) => a.data.localeCompare(b.data) || a.area.localeCompare(b.area));

  // Opções de clientes
  const clientes = Object.keys(getMapaClientes()).sort();
  const optionsHtml = '<option value="">— sem cliente —</option>' +
    clientes.map(c => `<option value="${c}">${c}</option>`).join('');

  const tbody = document.getElementById('vincular-tbody');
  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--muted);font-size:12px">${somenteSem ? 'Todas as colheitas deste mês já têm cliente vinculado.' : 'Nenhuma colheita neste mês.'}</td></tr>`;
    document.getElementById('vincular-sub').textContent = `${lista.length} colheitas`;
    return;
  }

  tbody.innerHTML = lista.map((g, i) => {
    const [a, m, d] = g.data.split('-');
    const dataFmt = `${d}/${m}`;
    const nome = NOMES_CURTOS[g.area] || g.area;
    return `<tr style="border-bottom:1px solid var(--border)">
      <td style="font-family:var(--font-mono);font-size:12px;color:var(--muted);padding:8px">${dataFmt}</td>
      <td style="font-size:12px;font-weight:700;color:var(--forest);padding:8px">${nome}</td>
      <td style="font-family:var(--font-mono);font-size:12px;color:var(--muted);text-align:center;padding:8px">${g.eitos}</td>
      <td style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--forest);text-align:right;padding:8px">${fmtNum(g.total)}</td>
      <td style="padding:8px"><select data-data="${g.data}" data-area="${g.area}" class="vincular-sel" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-family:var(--font-main);font-size:11px;background:var(--surface2);outline:none">${optionsHtml}</select></td>
    </tr>`;
  }).join('');

  // Selecionar cliente atual
  tbody.querySelectorAll('.vincular-sel').forEach((sel, i) => {
    if (lista[i].cliente) sel.value = lista[i].cliente;
  });

  document.getElementById('vincular-sub').textContent = `${lista.length} colheita${lista.length !== 1 ? 's' : ''} · selecione o cliente de cada grupo`;
}

async function salvarVinculacaoClientes() {
  const selects = document.querySelectorAll('#vincular-tbody .vincular-sel');
  let count = 0;
  for (const sel of selects) {
    const data = sel.dataset.data;
    const area = sel.dataset.area;
    const cliente = sel.value;

    // Atualizar no DB em memória
    const eitos = DB[area] || [];
    for (const e of eitos) {
      for (const h of (e.historico || [])) {
        if (h.data === data) {
          if (h.cliente !== cliente) {
            h.cliente = cliente || undefined;
            count++;
          }
        }
      }
    }

    // Atualizar no Supabase
    if (_SB) {
      try {
        await _SB.from('colheitas')
          .update({ cliente: cliente || null })
          .eq('area', area)
          .eq('data', data);
      } catch (err) { console.error('Erro ao atualizar cliente:', err); }
    }
  }

  // Salvar no localStorage
  await saveData();
  renderProjecao();
  closeModal('modal-vincular-clientes');
  showToast(`✓ ${count} colheita${count !== 1 ? 's' : ''} atualizada${count !== 1 ? 's' : ''}`);
}

// ═══════════════════════════════════
// NADO CONTADOR — Preparar / Validar
// ═══════════════════════════════════

let _nadoPendentes = [];
let _nadoSelPrep = new Set(); // eitos selecionados na preparação

async function renderNadoCard() {
  const card = document.getElementById('nado-card');
  if (!card) return;
  card.style.display = 'block';

  // Carregar pendentes (contagens já feitas pelo Nado) e programados (sugeridos hoje)
  // em paralelo para reduzir latência percebida
  let progSugeridos = [];
  try {
    [_nadoPendentes, progSugeridos] = await Promise.all([
      loadContagemsNado('pendente').catch(() => []),
      loadProgramacaoNado(today(), true).catch(() => [])
    ]);
  } catch(e) {
    _nadoPendentes = []; progSugeridos = [];
  }

  // Badge de pendentes (eitos contados, aguardando validação)
  const badge = document.getElementById('nado-badge');
  const btnPend = document.getElementById('nado-btn-pendentes');
  if (_nadoPendentes.length > 0) {
    badge.style.display = 'inline';
    badge.textContent = _nadoPendentes.length + ' pendente' + (_nadoPendentes.length > 1 ? 's' : '');
    btnPend.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
    btnPend.style.display = 'none';
  }

  // Badge de programados (eitos sugeridos para hoje, ainda não contados)
  const badgeProg = document.getElementById('nado-badge-prog');
  if (badgeProg) {
    // Filtra: só conta como "programado" se o eito ainda não tem contagem pendente
    const pendKeys = new Set(_nadoPendentes.map(p => p.area + '||' + p.eito_id));
    const aindaNaoContados = progSugeridos.filter(p => !pendKeys.has(p.area + '||' + p.eito_id));
    if (aindaNaoContados.length > 0) {
      badgeProg.style.display = 'inline';
      badgeProg.textContent = aindaNaoContados.length + ' programado' + (aindaNaoContados.length > 1 ? 's' : '') + ' hoje';
    } else {
      badgeProg.style.display = 'none';
    }
  }
}

function copiarLinkCampo() {
  const url = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'nado.html';
  navigator.clipboard.writeText(url).then(() => {
    showToast('Link copiado! Cole no WhatsApp para enviar.');
  }).catch(() => {
    // Fallback para navegadores sem clipboard API
    prompt('Copie o link abaixo:', url);
  });
}

// ── PREPARAR DIA ──

async function abrirPrepararDia() {
  _nadoSelPrep = new Set();
  const dataInp = document.getElementById('nado-prep-data');
  dataInp.value = today();
  // Pré-carrega sugeridos existentes para que Jamille veja o que já está programado
  // (seleção fica marcada automaticamente — pode desmarcar para remover)
  document.getElementById('modal-preparar-nado').classList.add('open');
  renderPrepLista(); // render inicial vazio
  try {
    const existentes = await loadProgramacaoNado(dataInp.value, true);
    existentes.forEach(p => _nadoSelPrep.add(p.area + '||' + p.eito_id));
    renderPrepLista();
  } catch(e) { console.warn('Não carregou programação existente:', e); }
}

async function recarregarPrepLista() {
  // Quando muda a data no input, recarrega os sugeridos daquele dia
  _nadoSelPrep = new Set();
  renderPrepLista();
  const data = document.getElementById('nado-prep-data').value;
  if (!data) return;
  try {
    const existentes = await loadProgramacaoNado(data, true);
    existentes.forEach(p => _nadoSelPrep.add(p.area + '||' + p.eito_id));
    renderPrepLista();
  } catch(e) {}
}

async function limparProgramacaoNadoUI() {
  const data = document.getElementById('nado-prep-data').value;
  if (!data) { showToast('Informe a data'); return; }
  if (!confirm('Limpar TODA a programação do dia ' + data + '?\nO Nado deixará de ver eitos sugeridos para esta data.')) return;
  const ok = await limparProgramacaoNado(data);
  if (ok) {
    showToast('✓ Programação limpa');
    closeModal('modal-preparar-nado');
    renderNadoCard();
  }
}

function renderPrepLista() {
  const el = document.getElementById('nado-prep-lista');
  el.innerHTML = '';
  const areas = Object.keys(DB);
  areas.forEach(area => {
    const eitos = DB[area] || [];
    const secHtml = document.createElement('div');
    secHtml.style.marginBottom = '12px';
    let h = `<div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border)">${area} (${eitos.length})</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;
    eitos.forEach(e => {
      const ult = getUltimaCompleta(e) || getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const cls = dias === null ? 'vermelho' : dias >= 32 ? 'critico' : dias >= 21 ? 'vermelho' : dias >= 15 ? 'amarelo' : 'verde';
      const diasTxt = dias !== null ? dias + 'd' : '?';
      const key = area + '||' + e.id;
      const sel = _nadoSelPrep.has(key);
      h += `<div onclick="togglePrepEito('${area}','${e.id}')" style="display:flex;align-items:center;gap:5px;padding:6px 10px;border:2px solid ${sel ? 'var(--verde)' : 'var(--border)'};border-radius:8px;cursor:pointer;background:${sel ? 'var(--verde-bg)' : 'var(--surface)'};user-select:none;font-size:12px" data-prep-key="${key}">
        <span style="font-family:var(--font-mono);font-weight:700;color:var(--verde)">${e.id}</span>
        <span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;background:var(--${cls}-bg);color:var(--${cls})">${diasTxt}</span>
      </div>`;
    });
    h += '</div>';
    secHtml.innerHTML = h;
    el.appendChild(secHtml);
  });
  atualizarPrepCount();
}

function togglePrepEito(area, eitoId) {
  const key = area + '||' + eitoId;
  if (_nadoSelPrep.has(key)) _nadoSelPrep.delete(key);
  else _nadoSelPrep.add(key);
  // Atualizar visual
  const el = document.querySelector(`[data-prep-key="${key}"]`);
  if (el) {
    const sel = _nadoSelPrep.has(key);
    el.style.borderColor = sel ? 'var(--verde)' : 'var(--border)';
    el.style.background = sel ? 'var(--verde-bg)' : 'var(--surface)';
  }
  atualizarPrepCount();
}

function selecionarUrgentesNado() {
  _nadoSelPrep = new Set();
  Object.keys(DB).forEach(area => {
    (DB[area] || []).forEach(e => {
      const ult = getUltimaCompleta(e) || getUltima(e);
      const dias = ult ? diasDesde(ult.data) : 999;
      if (dias >= 21) _nadoSelPrep.add(area + '||' + e.id);
    });
  });
  renderPrepLista();
}

function limparSelecaoNado() {
  _nadoSelPrep = new Set();
  renderPrepLista();
}

function atualizarPrepCount() {
  const el = document.getElementById('nado-prep-count');
  if (_nadoSelPrep.size === 0) el.textContent = 'Nenhum eito selecionado';
  else el.innerHTML = `<strong style="color:var(--verde)">${_nadoSelPrep.size} eitos selecionados</strong>`;
}

async function salvarProgramacaoNadoUI() {
  if (_nadoSelPrep.size === 0) { showToast('Selecione ao menos um eito'); return; }
  const data = document.getElementById('nado-prep-data').value;
  if (!data) { showToast('Informe a data'); return; }
  // Salvar TODOS os eitos (não só selecionados) — Nado precisa de todos sem auth
  const eitos = [];
  Object.keys(DB).forEach(area => {
    (DB[area] || []).forEach(e => {
      const key = area + '||' + e.id;
      const ult = getUltimaCompleta(e) || getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      eitos.push({
        area, eito_id: e.id, plantas: e.plantas || 0,
        sugerido: _nadoSelPrep.has(key),
        dias_desde: dias
      });
    });
  });
  await salvarProgramacaoNado(data, eitos);
  closeModal('modal-preparar-nado');
  renderNadoCard(); // atualiza o badge de "X programados hoje"
}

// ── VALIDAR CONTAGENS ──

let _nadoValidacaoAberta = false;

function toggleValidacaoNado() {
  _nadoValidacaoAberta = !_nadoValidacaoAberta;
  if (_nadoValidacaoAberta) renderValidacaoNado();
  else document.getElementById('nado-validacao').style.display = 'none';
}

function renderValidacaoNado() {
  const wrap = document.getElementById('nado-validacao');
  if (_nadoPendentes.length === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';

  let totalMesa = 0, totalFab = 0;
  _nadoPendentes.forEach(p => { totalMesa += (p.mesa||0); totalFab += (p.fabrica||0); });

  let html = `<div style="background:var(--surface);border:2px solid var(--verde);border-radius:14px;padding:16px 20px">
    <div style="font-size:14px;font-weight:800;color:var(--verde);margin-bottom:12px">Validar contagem do Campo</div>
    <div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap">
      <div>
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Data</div>
        <input type="date" id="nado-val-data" value="${_nadoPendentes[0]?.data || today()}" style="padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-family:var(--font-mono);font-size:13px">
      </div>
      <div style="flex:1;min-width:150px">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Cliente</div>
        <input list="dl-clientes-nado" id="nado-val-cliente" placeholder="Selecione o cliente" style="padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:13px;width:100%">
        <datalist id="dl-clientes-nado">`;

  // Popular clientes
  Object.keys(getMapaClientes()).forEach(c => { html += `<option value="${c}">`; });

  html += `</datalist>
      </div>
    </div>`;

  _nadoPendentes.forEach((p, i) => {
    const total = (p.mesa||0) + (p.fabrica||0);
    html += `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:8px" id="nado-val-row-${i}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div>
          <span style="font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase">${p.area}</span>
          <span style="font-size:15px;font-weight:900;color:var(--verde);margin-left:6px">Eito ${p.eito_id}</span>
          <span id="nado-editado-${i}" style="display:none;font-size:9px;font-weight:700;color:#d97706;background:#fffbeb;padding:1px 6px;border-radius:8px;margin-left:6px">EDITADO</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-family:var(--font-mono);font-size:13px;font-weight:800" id="nado-val-total-${i}">${total} cocos</span>
          <button onclick="excluirContagemNado(${i})" style="background:none;border:1px solid var(--vermelho);color:var(--vermelho);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer">Excluir</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;align-items:end">
        <div>
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:3px">Mesa</div>
          <input type="number" min="0" max="99999" value="${p.mesa||0}" id="nado-val-mesa-${i}" data-orig="${p.mesa||0}" oninput="onEditNado(${i})" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-family:var(--font-mono);font-size:14px;font-weight:700;text-align:center" inputmode="numeric">
        </div>
        <div>
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:3px">Fabrica</div>
          <input type="number" min="0" max="99999" value="${p.fabrica||0}" id="nado-val-fab-${i}" data-orig="${p.fabrica||0}" oninput="onEditNado(${i})" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-family:var(--font-mono);font-size:14px;font-weight:700;text-align:center" inputmode="numeric">
        </div>
        <div>
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:3px">Total</div>
          <input type="number" value="${total}" id="nado-val-tot-${i}" readonly style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-family:var(--font-mono);font-size:14px;font-weight:700;text-align:center;background:var(--surface2);color:var(--muted)">
        </div>
        <div>
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:3px">Parcial</div>
          <input type="checkbox" id="nado-val-parcial-${i}" style="width:20px;height:20px;cursor:pointer">
        </div>
      </div>
    </div>`;
  });

  html += `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:14px 0;text-align:center">
      <div style="background:var(--surface);border-radius:8px;padding:10px"><div style="font-size:9px;text-transform:uppercase;font-weight:700;color:var(--muted)">Total</div><div style="font-size:20px;font-weight:900;color:var(--verde)" id="nado-kpi-total">${fmtNum(totalMesa+totalFab)}</div></div>
      <div style="background:var(--surface);border-radius:8px;padding:10px"><div style="font-size:9px;text-transform:uppercase;font-weight:700;color:var(--muted)">Mesa</div><div style="font-size:20px;font-weight:900;color:var(--verde)" id="nado-kpi-mesa">${fmtNum(totalMesa)}</div></div>
      <div style="background:var(--surface);border-radius:8px;padding:10px"><div style="font-size:9px;text-transform:uppercase;font-weight:700;color:var(--muted)">Fabrica</div><div style="font-size:20px;font-weight:900;color:var(--verde)" id="nado-kpi-fab">${fmtNum(totalFab)}</div></div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" onclick="confirmarContagemNado()" style="flex:1">Confirmar e lancar</button>
      <button class="btn btn-outline" onclick="toggleValidacaoNado()">Fechar</button>
    </div>
  </div>`;
  wrap.innerHTML = html;
}

// Sanitiza quantidade: força inteiro >= 0, máximo 99999
function _nadoSanitizeQtd(v) {
  const n = parseInt(v);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(99999, n);
}

function onEditNado(i) {
  const mesaEl = document.getElementById(`nado-val-mesa-${i}`);
  const fabEl = document.getElementById(`nado-val-fab-${i}`);
  if (!mesaEl || !fabEl) return;
  // Sanitizar (evita negativos, NaN, decimais) e atualizar visualmente se foi corrigido
  const mRaw = mesaEl.value, fRaw = fabEl.value;
  const m = _nadoSanitizeQtd(mRaw);
  const f = _nadoSanitizeQtd(fRaw);
  if (String(m) !== mRaw) mesaEl.value = m;
  if (String(f) !== fRaw) fabEl.value = f;
  document.getElementById(`nado-val-tot-${i}`).value = m + f;
  document.getElementById(`nado-val-total-${i}`).textContent = (m + f) + ' cocos';

  const origM = _nadoSanitizeQtd(mesaEl.dataset.orig);
  const origF = _nadoSanitizeQtd(fabEl.dataset.orig);
  const editou = (m !== origM || f !== origF);
  const edEl = document.getElementById(`nado-editado-${i}`);
  if (edEl) edEl.style.display = editou ? 'inline' : 'none';

  // Atualizar KPIs
  let tMesa = 0, tFab = 0;
  _nadoPendentes.forEach((_, j) => {
    const mEl = document.getElementById(`nado-val-mesa-${j}`);
    const fEl = document.getElementById(`nado-val-fab-${j}`);
    tMesa += mEl ? _nadoSanitizeQtd(mEl.value) : 0;
    tFab += fEl ? _nadoSanitizeQtd(fEl.value) : 0;
  });
  document.getElementById('nado-kpi-total').textContent = fmtNum(tMesa + tFab);
  document.getElementById('nado-kpi-mesa').textContent = fmtNum(tMesa);
  document.getElementById('nado-kpi-fab').textContent = fmtNum(tFab);
}

async function excluirContagemNado(i) {
  const p = _nadoPendentes[i];
  if (!p) return;
  if (!confirm(`Excluir contagem do Eito ${p.eito_id} (${p.area})?`)) return;
  // Marcar como excluído no Supabase
  await atualizarStatusNado([p.id], 'excluido');
  _nadoPendentes.splice(i, 1);
  if (_nadoPendentes.length === 0) {
    _nadoValidacaoAberta = false;
    document.getElementById('nado-validacao').style.display = 'none';
  } else {
    renderValidacaoNado();
  }
  renderNadoCard();
  showToast('Contagem excluída');
}

async function confirmarContagemNado() {
  const data = document.getElementById('nado-val-data').value;
  const cliente = document.getElementById('nado-val-cliente').value.trim();
  if (!data) { showToast('Informe a data'); return; }

  const lancId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
  const idsConfirmados = [];
  let count = 0;

  for (let i = 0; i < _nadoPendentes.length; i++) {
    const p = _nadoPendentes[i];
    const mesa = parseInt(document.getElementById(`nado-val-mesa-${i}`).value) || 0;
    const fab = parseInt(document.getElementById(`nado-val-fab-${i}`).value) || 0;
    const total = mesa + fab;
    const parcial = document.getElementById(`nado-val-parcial-${i}`).checked;
    if (total === 0) continue;

    // Encontrar eito no DB
    const area = p.area;
    const eitoId = p.eito_id;
    const eito = (DB[area] || []).find(e => e.id === eitoId);
    if (!eito) continue;

    // Verificar parcial pendente para merge
    const pend = getParcialPendente(eito);
    if (pend && !parcial) {
      const mergedTotal = pend.total + total;
      const mergedMesa = (pend.mesa || 0) + mesa;
      const mergedFab = (pend.fabrica || 0) + fab;
      // Remover parcial antigo
      if (pend._id) {
        try { await _SB.from('colheitas').delete().eq('id', pend._id); } catch(e) { console.warn('Erro ao deletar parcial Nado:', e); }
      }
      eito.historico = eito.historico.filter(h => h !== pend);
      eito.historico.push({ data, total: mergedTotal, mesa: mergedMesa, fabrica: mergedFab, cliente, lancamento_id: lancId });
    } else {
      const entry = { data, total, mesa, fabrica: fab, cliente, lancamento_id: lancId };
      if (parcial) entry.parcial = true;
      eito.historico.push(entry);
    }

    // Salvar no Supabase
    const colheita = { data, total: parcial ? total : (pend && !parcial ? (pend.total||0)+total : total), mesa: parcial ? mesa : (pend && !parcial ? (pend.mesa||0)+mesa : mesa), fabrica: parcial ? fab : (pend && !parcial ? (pend.fabrica||0)+fab : fab), cliente, lancamento_id: lancId };
    if (parcial) colheita.parcial = true;
    await salvarColheitaSupabase(area, eitoId, colheita);

    idsConfirmados.push(p.id);
    count++;
  }

  // Marcar como confirmado
  if (idsConfirmados.length > 0) {
    await atualizarStatusNado(idsConfirmados, 'confirmado');
  }

  await saveData();
  _nadoValidacaoAberta = false;
  document.getElementById('nado-validacao').style.display = 'none';
  renderNadoCard();
  renderLancamento();
  renderDashboard();
  showToast(`✓ ${count} eito${count > 1 ? 's' : ''} lancado${count > 1 ? 's' : ''} do Nado`);
}
