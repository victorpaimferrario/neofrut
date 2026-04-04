// ─────────── AUTH ───────────
const ADMIN_EMAIL = 'victorpaim@pasf.com.br';
let _appIniciado = false;
// Salvar aba ativa antes do reload para restaurar depois
// Lido imediatamente ao carregar o script (antes de qualquer async)
let _abaParaRestaurar = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';

function isAdmin() {
  const emailEl = document.getElementById('user-email');
  return emailEl && emailEl.textContent === ADMIN_EMAIL;
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

async function enterApp(session) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('user-email').textContent = session.user.email;
  // Mostrar aba Gestão apenas para admin
  const navGestao = document.getElementById('nav-gestao');
  if (navGestao) {
    navGestao.style.display = session.user.email === ADMIN_EMAIL ? '' : 'none';
  }
  if (!_appIniciado) {
    _appIniciado = true;
    try {
      await initApp();
    } catch(e) {
      console.error('Erro ao iniciar app:', e);
      // Garantir que pelo menos o dashboard seja exibido com dados locais
      showPage('dashboard');
    }
  }
}

async function loginGoogle() {
  // Salvar aba atual antes do redirect do OAuth
  const abaAtual = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  localStorage.setItem('neofrut_aba_ativa', abaAtual);
  await _SB.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
}

async function logout() {
  _appIniciado = false;
  await _SB.auth.signOut();
  location.reload();
}

// Unico ponto de controle de auth — onAuthStateChange dispara INITIAL_SESSION
// ao carregar a pagina (inclusive apos redirect do OAuth)
_SB.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    await enterApp(session);
  } else if (event === 'INITIAL_SESSION') {
    // Sem sessao no carregamento inicial — mostrar login
    showLogin();
  } else if (event === 'SIGNED_OUT') {
    showLogin();
  }
});
