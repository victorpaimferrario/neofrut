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

// Retorna true se a aba ATIVA ATUAL é somente-leitura para o usuário
function abaAtualSomenteLeitura() {
  const aba = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  return !podeEditar(aba);
}

// ── CARREGAR PERMISSÕES DO SUPABASE ──
async function _carregarPermissoes(email) {
  try {
    const { data, error } = await _SB
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('ativo', true)
      .single();

    if (error || !data) {
      console.warn('Usuário não encontrado na tabela usuarios:', email);
      return null;
    }

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

    // Salvar no localStorage para funcionar offline
    localStorage.setItem('neofrut_user_perms', JSON.stringify(_userPermissoes));
    return _userPermissoes;
  } catch (e) {
    console.warn('Erro ao carregar permissões, tentando cache:', e.message);
    // Fallback: usar cache local
    try {
      const cached = JSON.parse(localStorage.getItem('neofrut_user_perms') || 'null');
      if (cached && cached.email === email) {
        _userPermissoes = cached;
        return _userPermissoes;
      }
    } catch(e2) {}
    return null;
  }
}

// ── APLICAR PERMISSÕES NA UI ──
function _aplicarPermissoes() {
  // 1. Esconder/mostrar abas na nav desktop
  document.querySelectorAll('.nav-tab[data-page]').forEach(tab => {
    const page = tab.dataset.page;
    tab.style.display = podeVer(page) ? '' : 'none';
  });

  // 2. Esconder/mostrar abas na nav mobile
  document.querySelectorAll('.mob-tab[data-page]').forEach(tab => {
    const page = tab.dataset.page;
    tab.style.display = podeVer(page) ? '' : 'none';
  });

  // 3. Aplicar modo somente-leitura nas páginas
  document.querySelectorAll('.page[id^="page-"]').forEach(pageEl => {
    const aba = pageEl.id.replace('page-', '');
    if (podeEditar(aba)) {
      pageEl.classList.remove('somente-leitura');
    } else {
      pageEl.classList.add('somente-leitura');
    }
  });

  // 4. Mostrar nome do usuário se disponível
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
  // Mostrar mensagem de acesso negado
  const loginScreen = document.getElementById('login-screen');
  let msg = document.getElementById('login-negado');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'login-negado';
    msg.style.cssText = 'background:#ffebee;color:#c62828;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700;text-align:center;max-width:320px';
    loginScreen.appendChild(msg);
  }
  msg.innerHTML = `Acesso negado para <strong>${email}</strong><br><span style="font-weight:400;font-size:11px">Contate o administrador para solicitar acesso.</span>`;
  // Fazer logout automático após 3s
  setTimeout(() => { _SB.auth.signOut(); }, 4000);
}

async function enterApp(session) {
  const email = session.user.email;

  // Carregar permissões do Supabase
  const perms = await _carregarPermissoes(email);

  if (!perms) {
    _showAcessoNegado(email);
    return;
  }

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('user-email').textContent = email;

  // Aplicar permissões visuais
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
