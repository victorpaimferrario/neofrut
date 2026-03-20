// ─────────── APP INIT ───────────

async function initApp() {
  window._lancAreaAtiva = 'todas';
  window._analiseAreaAtiva = null;
  window._gestaoAreaAtiva = null;
  window._vendaAnoAtivo = 'todos';
  window._vendaMesAtivo = 'todos';
  window._mercadosIniciado = false;

  // PASSO 1: Garantir que DB tem dados do localStorage (instantâneo)
  if (!DB || Object.keys(DB).length === 0) {
    DB = loadDataLocal();
  }
  // Garantir que vendas tem dados do localStorage
  if (!_vendasCache || _vendasCache.length === 0) {
    let localVendas;
    try { localVendas = JSON.parse(localStorage.getItem(SK_VENDAS) || '[]'); } catch(e) { console.error('Erro ao parsear vendas locais:', e); localVendas = []; }
    if (localVendas.length > 0) _vendasCache = localVendas;
  }

  // PASSO 2: Renderizar IMEDIATAMENTE com dados locais
  const abaAtiva = _abaParaRestaurar || 'dashboard';
  showPage(abaAtiva);

  // PASSO 3: Sincronizar com Supabase em background (não bloqueia a UI)
  setTimeout(async () => {
    try {
      await Promise.all([
        loadDBFromSupabase(),
        loadVendasSupabase(),
        carregarTelefones()
      ]);
      // Re-renderizar a página atual com dados atualizados do Supabase
      const paginaAtual = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
      showPage(paginaAtual);
    } catch (e) {
      console.warn('Sync Supabase em background falhou — usando dados locais:', e.message);
    }
  }, 100);
}
