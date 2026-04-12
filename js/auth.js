// ─────────── AUTH + PERMISSÕES ───────────
let _appIniciado = false;
let _authEmAndamento = false;
let _abaParaRestaurar = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';

// ── PERMISSÕES ──
let _userPermissoes = {
  email: '', nome: '', perfil: 'restrito',
  abas_visiveis: [], abas_editaveis: []
};

function isAdmin() { return _userPermissoes.perfil === 'admin'; }
function podeVer(aba) { return isAdmin() || _userPermissoes.abas_visiveis.includes(aba); }
function podeEditar(aba) { return isAdmin() || _userPermissoes.abas_editaveis.includes(aba); }
function abaAtualSomenteLeitura() { return !podeEditar(localStorage.getItem('neofrut_aba_ativa') || 'dashboard'); }

async function _carregarPermissoes(email) {
  // Cache local primeiro
  var cached = null;
  try {
    var raw = localStorage.getItem('neofrut_user_perms');
    if (raw) { var c = JSON.parse(raw); if (c && c.email === email) cached = c; }
  } catch(e) {}

  // Tentar Supabase
  try {
    var r = await _SB.from('usuarios').select('*').eq('email', email).eq('ativo', true).single();
    if (!r.error && r.data) {
      var d = r.data;
      _userPermissoes = {
        email: d.email, nome: d.nome, perfil: d.perfil,
        abas_visiveis: (d.abas_visiveis || []).includes('*')
          ? ['dashboard','programacao','analise','lancamento','vendas','gestao','mercados']
          : (d.abas_visiveis || []),
        abas_editaveis: (d.abas_editaveis || []).includes('*')
          ? ['dashboard','programacao','analise','lancamento','vendas','gestao','mercados']
          : (d.abas_editaveis || [])
      };
      localStorage.setItem('neofrut_user_perms', JSON.stringify(_userPermissoes));
      return _userPermissoes;
    }
  } catch(e) { /* fallback abaixo */ }

  // Fallback: cache
  if (cached) { _userPermissoes = cached; return cached; }
  return null;
}

function _aplicarPermissoes() {
  document.querySelectorAll('.nav-tab[data-page]').forEach(function(t) { t.style.display = podeVer(t.dataset.page) ? '' : 'none'; });
  document.querySelectorAll('.mob-tab[data-page]').forEach(function(t) { t.style.display = podeVer(t.dataset.page) ? '' : 'none'; });
  document.querySelectorAll('.page[id^="page-"]').forEach(function(p) { var a = p.id.replace('page-',''); p.classList.toggle('somente-leitura', !podeEditar(a)); });
  var el = document.getElementById('user-email');
  if (el && _userPermissoes.nome) { el.textContent = _userPermissoes.nome; el.title = _userPermissoes.email; }
}

// ── UI ──
function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function _showAcessoNegado(email) {
  showLogin();
  var s = document.getElementById('login-screen');
  var m = document.getElementById('login-negado');
  if (!m) { m = document.createElement('div'); m.id = 'login-negado'; m.style.cssText = 'background:#ffebee;color:#c62828;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700;text-align:center;max-width:320px'; s.appendChild(m); }
  m.innerHTML = 'Acesso negado para <strong>' + email + '</strong><br><span style="font-weight:400;font-size:11px">Contate o administrador.</span>';
}

async function enterApp(session) {
  if (_authEmAndamento) return;
  _authEmAndamento = true;
  try {
    var email = session.user.email;
    var perms = await _carregarPermissoes(email);
    if (!perms) { _showAcessoNegado(email); return; }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-email').textContent = email;
    var neg = document.getElementById('login-negado'); if (neg) neg.remove();

    _aplicarPermissoes();

    if (!_appIniciado) {
      _appIniciado = true;
      try { await initApp(); } catch(e) { console.error('Erro initApp:', e); showPage('dashboard'); }
    }
  } finally { _authEmAndamento = false; }
}

async function loginGoogle() {
  localStorage.setItem('neofrut_aba_ativa', localStorage.getItem('neofrut_aba_ativa') || 'dashboard');
  await _SB.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
}

async function logout() {
  _appIniciado = false;
  localStorage.removeItem('neofrut_user_perms');
  await _SB.auth.signOut();
  location.reload();
}

// ═══════════════════════════════════════════
// FLUXO DE AUTH — ROBUSTO COM MÚLTIPLOS FALLBACKS
// ═══════════════════════════════════════════

// Limpar fragmentos OAuth da URL
function _limparUrl() {
  if (window.location.hash.indexOf('access_token') >= 0) {
    history.replaceState(null, '', location.pathname);
  }
  if (window.location.search.indexOf('code=') >= 0) {
    history.replaceState(null, '', location.pathname);
  }
}

// onAuthStateChange é o mecanismo PRINCIPAL do Supabase
// Ele dispara para todos os eventos: INITIAL_SESSION, SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED
_SB.auth.onAuthStateChange(function(event, session) {
  console.log('[AUTH]', event, session ? session.user.email : 'sem sessão');

  if (session) {
    // Sessão válida — entrar no app (INITIAL_SESSION, SIGNED_IN, TOKEN_REFRESHED)
    _limparUrl();
    enterApp(session);
  } else if (event === 'SIGNED_OUT') {
    // Logout explícito
    _appIniciado = false;
    showLogin();
  } else if (event === 'INITIAL_SESSION') {
    // Sem sessão no carregamento — mostrar login
    showLogin();
  }
});
