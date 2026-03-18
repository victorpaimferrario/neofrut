// ─────────── APP INIT ───────────

async function initApp() {
  window._lancAreaAtiva = 'todas';
  window._analiseAreaAtiva = null;
  window._gestaoAreaAtiva = null;
  window._vendaAnoAtivo = 'todos';
  window._vendaMesAtivo = 'todos';
  window._mercadosIniciado = false;

  // Carregar TODOS os dados do Supabase ANTES de renderizar qualquer página
  try {
    await Promise.all([
      loadDBFromSupabase(),
      loadVendasSupabase(),
      carregarTelefones()
    ]);
  } catch(e) {
    console.error('Erro ao carregar dados do Supabase:', e);
    // Mesmo com erro, DB já tem dados locais do loadDataLocal()
  }

  // Só renderizar depois que os dados estiverem prontos
  const abaAtiva = _abaParaRestaurar || 'dashboard';
  showPage(abaAtiva);
}
