// ─────────── AUTH + PERMISSÕES ───────────
const ADMIN_EMAIL = 'victorpaim@pasf.com.br';
let _appIniciado = false;
let _abaParaRestaurar = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';

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

// ── CARREGAR PERMISSÕES (Supabase → fallback localStorage) ──
async function _carregarPermissoes(email) {
  // Tentar cache local primeiro (instantâneo, funciona offline)
  let cached = null;
  try {
    const raw = localStorage.getItem('neofrut_user_perms');
    if (raw) {
      const c = JSON.parse(raw);
      if (c && c.email === email) cached = c;
    }
  } catch(e) {}

  // Tentar Supabase para dados atualizados
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
      console.warn('Supabase indisponível, usando cache de permissões para:', email);
      _userPermissoes = cached;
      return _userPermissoes;
    }

    // Sem cache e sem Supabase: acesso negado de verdade
    console.warn('Usuário não encontrado na tabela usuarios:', email);
    return null;
  } catch (e) {
    console.warn('Erro ao carregar permissões:', e.message);
    // Fallback: usar cache local
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

// ── LIMPAR URL APÓS OAUTH ──
function _limparUrlOAuth() {
  // Remove #access_token=... da URL após login do Google
  if (window.location.hash && window.location.hash.includes('access_token')) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
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
  msg.innerHTML = `Acesso negado para <strong>${escapeHtml(email)}</strong><br><span style="font-weight:400;font-size:11px">Contate o administrador para solicitar acesso.</span>`;
  // NÃO faz logout automático — preserva a sessão para caso seja erro temporário
}

async function enterApp(session) {
  const email = session.user.email;

  // Limpar hash do OAuth da URL para evitar reprocessamento no refresh
  _limparUrlOAuth();

  // Carregar permissões (Supabase + fallback cache)
  const perms = await _carregarPermissoes(email);

  if (!perms) {
    _showAcessoNegado(email);
    return;
  }

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('user-email').textContent = email;

  // Remover mensagem de acesso negado se existir (de tentativa anterior)
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

// Unico ponto de controle de auth
_SB.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    await enterApp(session);
  } else if (event === 'INITIAL_SESSION') {
    showLogin();
  } else if (event === 'SIGNED_OUT') {
    showLogin();
  }
});
