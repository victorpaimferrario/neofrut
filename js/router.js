// ─────────── ROUTER ───────────
function showPage(id) {
  localStorage.setItem('neofrut_aba_ativa', id);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  if (id === 'dashboard') {
    document.querySelector('.nav-tab').classList.add('active');
    renderDashboard();
    renderProjecao();
    renderComparativo();
    renderMapa();
    renderContratosAlertas();
  } else if (id === 'programacao') {
    document.querySelectorAll('.nav-tab')[1].classList.add('active');
    initProgramacao();
  } else if (id === 'analise') {
    document.querySelectorAll('.nav-tab')[2].classList.add('active');
    initAnalise();
  } else if (id === 'lancamento') {
    document.querySelectorAll('.nav-tab')[3].classList.add('active');
    initLancamento();
  } else if (id === 'vendas') {
    document.querySelectorAll('.nav-tab')[4].classList.add('active');
    initVendas(false);
  } else if (id === 'mercados') {
    document.querySelectorAll('.nav-tab')[5].classList.add('active');
    if (!window._mercadosIniciado) {
      window._mercadosIniciado = true;
      initMercados();
    }
  } else if (id === 'gestao') {
    if (typeof isAdmin === 'function' && !isAdmin()) {
      showPage('dashboard');
      return;
    }
    document.querySelectorAll('.nav-tab')[6].classList.add('active');
    initGestao();
  }
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function showAjudaSec(sec) {
  document.querySelectorAll('.ajuda-sec').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.ajuda-tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('ajuda-' + sec);
  if (el) el.style.display = '';
  event.target.classList.add('active');
}

// Close modals on overlay click (delegation — works for static and dynamic modals)
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('open')) {
    if (e.target.id) {
      e.target.classList.remove('open');
    } else {
      e.target.remove();
    }
  }
});

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Close drawers/panels on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAreaDrawer();
    closeSidePanel();
    // Also close any open modal overlays
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});
