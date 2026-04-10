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
  wrap.innerHTML = Object.keys(DB).map(a => {
    const aJs = String(a).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const label = NOMES_CURTOS[a] || a;
    return `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaGestao('${aJs}')">${escapeHtml(label)}</button>`;
  }).join('');
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

// ── EXCLUSÃO COM UNDO (10 segundos) ──
let _undoArea = null;
let _undoTimer = null;

function confirmarExcluirArea(area) {
  const eitos   = DB[area] || [];
  const comHist = eitos.filter(e=>e.historico?.length>0).length;
  const aviso   = comHist > 0 ? `\n⚠️ ${comHist} eito(s) com histórico será perdido!` : '';
  if (!confirm(`Excluir "${area}" com ${eitos.length} eito(s)?${aviso}\n\nVocê terá 10 segundos para desfazer.`)) return;

  // Guardar backup antes de remover
  _undoArea = { nome: area, eitos: JSON.parse(JSON.stringify(DB[area])) };
  delete DB[area];
  // Salvar no localStorage imediatamente (mas NÃO no Supabase ainda)
  localStorage.setItem(SK, JSON.stringify(DB));

  renderListaAreas();
  renderAreaBtnsGestao(Object.keys(DB)[0]);
  renderDashboard();
  setTimeout(renderMapa, 60);

  // Mostrar toast com botão Desfazer
  _mostrarUndoToast(area);
}

function _mostrarUndoToast(area) {
  // Remover toast anterior se existir
  const existente = document.getElementById('undo-toast');
  if (existente) existente.remove();
  if (_undoTimer) clearTimeout(_undoTimer);

  const toast = document.createElement('div');
  toast.id = 'undo-toast';
  toast.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1a3a1a;color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.3);max-width:90vw';
  toast.innerHTML = `
    <span>🗑️ "${area}" excluída</span>
    <button onclick="_desfazerExclusaoArea()" style="background:#22c55e;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;white-space:nowrap">DESFAZER</button>
    <span id="undo-countdown" style="font-size:11px;opacity:.7;min-width:20px;text-align:right">10</span>
  `;
  document.body.appendChild(toast);

  // Countdown visual
  let seg = 10;
  const countEl = document.getElementById('undo-countdown');
  const interval = setInterval(() => {
    seg--;
    if (countEl) countEl.textContent = seg;
    if (seg <= 0) clearInterval(interval);
  }, 1000);

  // Após 10s, confirmar exclusão no Supabase
  _undoTimer = setTimeout(async () => {
    clearInterval(interval);
    toast.remove();
    if (_undoArea) {
      // Agora sim, persistir no Supabase
      await saveData();
      _undoArea = null;
      showToast('✓ Exclusão confirmada');
    }
  }, 10000);
}

function _desfazerExclusaoArea() {
  if (!_undoArea) return;
  if (_undoTimer) clearTimeout(_undoTimer);

  // Restaurar área
  DB[_undoArea.nome] = _undoArea.eitos;
  localStorage.setItem(SK, JSON.stringify(DB));
  _undoArea = null;

  // Remover toast
  const toast = document.getElementById('undo-toast');
  if (toast) toast.remove();

  showToast('✓ Exclusão desfeita');
  renderListaAreas();
  renderAreaBtnsGestao(Object.keys(DB)[0]);
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function mostrarErroGestao(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}
