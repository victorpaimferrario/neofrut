// ─────────── APP INIT ───────────

async function initApp() {
  window._lancAreaAtiva = 'todas';
  window._analiseAreaAtiva = null;
  window._gestaoAreaAtiva = null;
  window._vendaAnoAtivo = 'todos';
  window._vendaMesAtivo = 'todos';
  window._mercadosIniciado = false;
  // carregar dados do Supabase em paralelo
  await Promise.all([
    loadDBFromSupabase(),
    loadVendasSupabase(),
    carregarTelefones()
  ]);
  // Restaurar aba ativa salva ou ir para dashboard
  const abaAtiva = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  showPage(abaAtiva);
}
