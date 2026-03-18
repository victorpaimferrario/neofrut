// ─────────── AUTH ───────────
let _appIniciado = false;

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

async function enterApp(session) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('user-email').textContent = session.user.email;
  if (!_appIniciado) {
    _appIniciado = true;
    await initApp();
  }
}

async function loginGoogle() {
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
  } else {
    showLogin();
  }
});
