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
  // Restaurar aba ativa salva ANTES do reload (capturada em auth.js)
  const abaAtiva = _abaParaRestaurar || 'dashboard';
  showPage(abaAtiva);
}
