// ─────────── GESTAO ───────────

// ─────────── GESTÃO ───────────
function initGestao() {
  renderAreaBtnsGestao(window._gestaoAreaAtiva || Object.keys(DB)[0]);
  renderListaAreas();
}

function showGestaoTab(tab) {
  document.querySelectorAll('.gestao-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.gestao-section').forEach(s => s.classList.remove('active'));
  document.getElementById('gestao-' + tab).classList.add('active');
  const idx = {'novo-eito':0,'nova-area':1,'gerenciar':2}[tab];
  document.querySelectorAll('.gestao-tab')[idx]?.classList.add('active');
  if (tab === 'gerenciar') renderListaAreas();
}

function renderAreaBtnsGestao(areaAtiva) {
  const wrap = document.getElementById('gestao-area-btns');
  if (!wrap) return;
  window._gestaoAreaAtiva = areaAtiva;
  wrap.innerHTML = Object.keys(DB).map(a =>
    `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaGestao('${a}')">${NOMES_CURTOS[a]||a}</button>`
  ).join('');
}

function selecionarAreaGestao(area) {
  window._gestaoAreaAtiva = area;
  renderAreaBtnsGestao(area);
  const erroEl = document.getElementById('gestao-eito-erro');
  if (erroEl) erroEl.style.display = 'none';
}

function cadastrarEito() {
  const area    = window._gestaoAreaAtiva;
  const id      = document.getElementById('gestao-eito-id').value.trim();
  const plantas = parseInt(document.getElementById('gestao-eito-plantas').value);
  const erroEl  = document.getElementById('gestao-eito-erro');
  if (!area)   { mostrarErroGestao(erroEl, 'Selecione uma área.'); return; }
  if (!id)     { mostrarErroGestao(erroEl, 'Informe o ID do eito (ex: 115/116).'); return; }
  if (isNaN(plantas) || plantas < 1) { mostrarErroGestao(erroEl, 'Informe um número válido de plantas.'); return; }
  if (DB[area]?.find(e => e.id === id)) {
    mostrarErroGestao(erroEl, `Eito "${id}" já existe em ${area}.`); return;
  }
  if (!DB[area]) DB[area] = [];
  DB[area].push({ id, plantas, historico: [] });
  saveData();
  erroEl.style.display = 'none';
  document.getElementById('gestao-eito-id').value = '';
  document.getElementById('gestao-eito-plantas').value = '';
  showToast(`✓ Eito ${id} adicionado em ${area} — ${plantas} plantas`);
  renderAreaBtnsGestao(area);
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function cadastrarArea() {
  const nome   = document.getElementById('gestao-area-nome').value.trim().toUpperCase();
  const erroEl = document.getElementById('gestao-area-erro');
  if (!nome) { mostrarErroGestao(erroEl, 'Informe o nome da área.'); return; }
  if (DB[nome]) { mostrarErroGestao(erroEl, `Área "${nome}" já existe.`); return; }
  DB[nome] = [];
  saveData();
  erroEl.style.display = 'none';
  document.getElementById('gestao-area-nome').value = '';
  showToast(`✓ Área "${nome}" criada`);
  renderListaAreas();
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function renderListaAreas() {
  const lista = document.getElementById('gestao-lista-areas');
  if (!lista) return;
  lista.innerHTML = Object.entries(DB).map(([area, eitos]) => {
    const totalPl  = eitos.reduce((s,e)=>s+e.plantas,0);
    const comHist  = eitos.filter(e=>e.historico?.length>0).length;
    return `<div class="gestao-lista-row">
      <div class="gestao-row-info">
        <div class="gestao-row-nome">${area}</div>
        <div class="gestao-row-sub">${eitos.length} eitos · ${fmtNum(totalPl)} plantas · ${comHist} com colheita</div>
      </div>
      <button class="btn-danger" onclick="confirmarExcluirArea('${area}')">⚠️ Excluir</button>
    </div>`;
  }).join('');
}

function confirmarExcluirArea(area) {
  const eitos   = DB[area] || [];
  const comHist = eitos.filter(e=>e.historico?.length>0).length;
  const aviso   = comHist > 0 ? `\n⚠️ ${comHist} eito(s) com histórico será perdido!` : '';
  if (!confirm(`Excluir "${area}" com ${eitos.length} eito(s)?${aviso}\n\nEsta ação é irreversível.`)) return;
  delete DB[area];
  saveData();
  showToast(`✓ Área "${area}" excluída`);
  renderListaAreas();
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function mostrarErroGestao(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}
