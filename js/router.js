// ─────────── ROUTER ───────────
function showPage(id) {
  localStorage.setItem('neofrut_aba_ativa', id);
  const pageEl = document.getElementById('page-' + id);
  if (!pageEl) { console.warn('showPage: página não encontrada:', id); return; }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  pageEl.classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  // Sync mobile bottom bar
  document.querySelectorAll('.mob-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === id);
  });
  // Ativa a nav-tab correspondente via data-page (resiliente a reordenação)
  const navTab = document.querySelector('.nav-tab[data-page="' + id + '"]');
  if (navTab) navTab.classList.add('active');

  if (id === 'dashboard') {
    if (!navTab) document.querySelector('.nav-tab')?.classList.add('active');
    renderDashboard();
    renderProjecao();
    renderComparativo();
    renderMapa();
    renderContratosAlertas();
  } else if (id === 'programacao') {
    initProgramacao();
  } else if (id === 'analise') {
    initAnalise();
  } else if (id === 'lancamento') {
    initLancamento();
  } else if (id === 'vendas') {
    initVendas(false);
  } else if (id === 'mercados') {
    if (!window._mercadosIniciado) {
      window._mercadosIniciado = true;
      initMercados();
    }
  } else if (id === 'gestao') {
    if (typeof isAdmin === 'function' && !isAdmin()) {
      showPage('dashboard');
      return;
    }
    initGestao();
  }
}

function openModal(id) { const el=document.getElementById(id); if(el) el.classList.add('open'); }
function closeModal(id) { const el=document.getElementById(id); if(el) el.classList.remove('open'); }

function showAjudaSec(sec, evt) {
  document.querySelectorAll('.ajuda-sec').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.ajuda-tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('ajuda-' + sec);
  if (el) el.style.display = '';
  const btn = evt ? evt.target : (event ? event.target : null);
  if (btn) btn.classList.add('active');
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
  if(!t) return;
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
