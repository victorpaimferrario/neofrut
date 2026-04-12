// ─────────── AUTH + PERMISSÕES ───────────
let _appIniciado = false;
let _abaParaRestaurar = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
let _authEmAndamento = false;

// ── PERMISSÕES DO USUÁRIO LOGADO ──
let _userPermissoes = {
  email: '',
  nome: '',
  perfil: 'restrito',
  abas_visiveis: [],
  abas_editaveis: []
};

function isAdmin() {
  return _userPermissoes.perfil === 'admin';
}

function podeVer(aba) {
  if (_userPermissoes.perfil === 'admin') return true;
  return _userPermissoes.abas_visiveis.includes(aba);
}

function podeEditar(aba) {
  if (_userPermissoes.perfil === 'admin') return true;
  return _userPermissoes.abas_editaveis.includes(aba);
}

function abaAtualSomenteLeitura() {
  const aba = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  return !podeEditar(aba);
}

// ── CARREGAR PERMISSÕES (cache local → Supabase) ──
async function _carregarPermissoes(email) {
  // 1. Tentar cache local primeiro (instantâneo, funciona offline)
  let cached = null;
  try {
    const raw = localStorage.getItem('neofrut_user_perms');
    if (raw) {
      const c = JSON.parse(raw);
      if (c && c.email === email) cached = c;
    }
  } catch(e) {}

  // 2. Tentar Supabase para dados atualizados
  try {
    const { data, error } = await _SB
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('ativo', true)
      .single();

    if (!error && data) {
      _userPermissoes = {
        email: data.email,
        nome: data.nome,
        perfil: data.perfil,
        abas_visiveis: (data.abas_visiveis || []).includes('*')
          ? ['dashboard','programacao','analise','lancamento','vendas','gestao','mercados']
          : (data.abas_visiveis || []),
        abas_editaveis: (data.abas_editaveis || []).includes('*')
          ? ['dashboard','programacao','analise','lancamento','vendas','gestao','mercados']
          : (data.abas_editaveis || [])
      };
      localStorage.setItem('neofrut_user_perms', JSON.stringify(_userPermissoes));
      return _userPermissoes;
    }

    // Supabase retornou erro — usar cache se disponível
    if (cached) {
      console.warn('Supabase indisponível, usando cache de permissões');
      _userPermissoes = cached;
      return _userPermissoes;
    }
    return null;
  } catch (e) {
    console.warn('Erro ao carregar permissões:', e.message);
    if (cached) {
      _userPermissoes = cached;
      return _userPermissoes;
    }
    return null;
  }
}

// ── APLICAR PERMISSÕES NA UI ──
function _aplicarPermissoes() {
  document.querySelectorAll('.nav-tab[data-page]').forEach(tab => {
    tab.style.display = podeVer(tab.dataset.page) ? '' : 'none';
  });
  document.querySelectorAll('.mob-tab[data-page]').forEach(tab => {
    tab.style.display = podeVer(tab.dataset.page) ? '' : 'none';
  });
  document.querySelectorAll('.page[id^="page-"]').forEach(pageEl => {
    const aba = pageEl.id.replace('page-', '');
    pageEl.classList.toggle('somente-leitura', !podeEditar(aba));
  });
  const emailEl = document.getElementById('user-email');
  if (emailEl && _userPermissoes.nome) {
    emailEl.textContent = _userPermissoes.nome;
    emailEl.title = _userPermissoes.email;
  }
}

// ── LOGIN / SESSÃO ──
function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function _showAcessoNegado(email) {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  const loginScreen = document.getElementById('login-screen');
  let msg = document.getElementById('login-negado');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'login-negado';
    msg.style.cssText = 'background:#ffebee;color:#c62828;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700;text-align:center;max-width:320px';
    loginScreen.appendChild(msg);
  }
  msg.innerHTML = 'Acesso negado para <strong>' + escapeHtml(email) + '</strong><br><span style="font-weight:400;font-size:11px">Contate o administrador para solicitar acesso.</span>';
}

async function enterApp(session) {
  if (_authEmAndamento) return;
  _authEmAndamento = true;

  try {
    const email = session.user.email;

    // Carregar permissões (cache + Supabase)
    const perms = await _carregarPermissoes(email);

    if (!perms) {
      _showAcessoNegado(email);
      return;
    }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-email').textContent = email;

    // Remover mensagem de acesso negado de tentativa anterior
    const negado = document.getElementById('login-negado');
    if (negado) negado.remove();

    _aplicarPermissoes();

    if (!_appIniciado) {
      _appIniciado = true;
      try {
        await initApp();
      } catch(e) {
        console.error('Erro ao iniciar app:', e);
        showPage('dashboard');
      }
    }
  } finally {
    _authEmAndamento = false;
  }
}

async function loginGoogle() {
  const abaAtual = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  localStorage.setItem('neofrut_aba_ativa', abaAtual);
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

// ═══════════════════════════════════════════════════
// FLUXO DE AUTH — getSession() + onAuthStateChange
// ═══════════════════════════════════════════════════

// 1. Check inicial: existe sessão salva?
//    Usa getSession() que é mais confiável que depender do evento INITIAL_SESSION
(async function _initAuth() {
  try {
    // Aguardar processamento da URL OAuth (se houver #access_token)
    // O Supabase processa automaticamente com detectSessionInUrl: true
    const { data: { session } } = await _SB.auth.getSession();

    // Limpar hash OAuth da URL para evitar reprocessamento no próximo refresh
    if (window.location.hash && window.location.hash.includes('access_token')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    if (session) {
      await enterApp(session);
    } else {
      showLogin();
    }
  } catch(e) {
    console.error('Erro na inicialização de auth:', e);
    showLogin();
  }
})();

// 2. Listener para eventos de auth (login novo, logout, refresh)
_SB.auth.onAuthStateChange(async (event, session) => {
  // SIGNED_IN: usuário acabou de fazer login (OAuth redirect)
  if (event === 'SIGNED_IN' && session) {
    // Limpar hash OAuth
    if (window.location.hash && window.location.hash.includes('access_token')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    await enterApp(session);
  }
  // SIGNED_OUT: usuário fez logout
  else if (event === 'SIGNED_OUT') {
    _appIniciado = false;
    showLogin();
  }
  // TOKEN_REFRESHED: sessão renovada automaticamente — não precisa fazer nada
  // INITIAL_SESSION: ignorado — já tratado pelo getSession() acima
});
