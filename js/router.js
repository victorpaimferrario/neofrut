// ─────────── ROUTER ───────────
// navClick: intercepta cliques nas abas <a>.
// - Clique normal: SPA (preventDefault + showPage)
// - Ctrl/Cmd/Shift + clique ou clique do meio: deixa o browser abrir nova aba
// - Botão do meio: tratado via evento auxclick (registrado abaixo)
function navClick(event, id) {
  // Se for clique com modificador (Ctrl/Cmd/Shift/Alt) ou não for botão esquerdo:
  // deixa o comportamento nativo do link (abrir nova aba/janela)
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return true;
  if (event.button && event.button !== 0) return true;
  // Clique normal: SPA
  event.preventDefault();
  showPage(id);
  // Atualizar URL sem recarregar (para suportar back/forward e refresh)
  try { history.replaceState(null, '', '?page=' + id); } catch(e) {}
  return false;
}

// Middle click (auxclick com button=1) abre nova aba — comportamento nativo do <a>.
// Chrome/Firefox já fazem isso por padrão. Mas o 'onclick' pode ter sido disparado
// em alguns casos. Garantimos que em middle click não chamamos showPage.
document.addEventListener('auxclick', function(e) {
  const tab = e.target.closest('.nav-tab,.mob-tab');
  if (tab && e.button === 1) {
    // Browser abre nova aba automaticamente via href. Não interferir.
    // Só impede handlers SPA se tiverem sido registrados.
    // (nenhuma ação necessária — o href cuida disso)
  }
});

// Ler ?page= da URL ao carregar (ou ao navegar com back/forward)
function _aplicarPaginaDaUrl() {
  const params = new URLSearchParams(window.location.search);
  const pag = params.get('page');
  if (pag) {
    localStorage.setItem('neofrut_aba_ativa', pag);
  }
}
_aplicarPaginaDaUrl();

// Back/forward do navegador
window.addEventListener('popstate', function() {
  const params = new URLSearchParams(window.location.search);
  const pag = params.get('page') || localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  showPage(pag);
});

function showPage(id) {
  // Verificar permissão de visualização
  if (typeof podeVer === 'function' && !podeVer(id)) {
    // Redirecionar para a primeira aba visível
    const fallback = _userPermissoes.abas_visiveis[0] || 'dashboard';
    if (id !== fallback) { showPage(fallback); return; }
  }

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

  // Aplicar somente-leitura na página ativa
  if (typeof podeEditar === 'function') {
    if (podeEditar(id)) {
      pageEl.classList.remove('somente-leitura');
    } else {
      pageEl.classList.add('somente-leitura');
    }
  }

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
