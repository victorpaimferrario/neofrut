// ─────────── FINANCEIRO ───────────

// C8: Fallback local de escapeHtml caso utils.js não esteja carregado
// Garante que XSS via cliente_nome seja bloqueado mesmo em falha de carregamento
if (typeof escapeHtml !== 'function') {
  window.escapeHtml = function(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
}

let _finCobrancas = [];
let _finFiltroStatus = localStorage.getItem('fin_filtro_status') || 'atrasada';
let _finFiltroAno = localStorage.getItem('fin_filtro_ano') || 'todos';
let _finFiltroMes = localStorage.getItem('fin_filtro_mes') || 'todos';
let _finCobrancaSel = null; // cobrança aberta no modal de baixa
let _finPeriodoSalvo = localStorage.getItem('fin_periodo') || 'mes';
let _finFormaPgtoCliente = {}; // cache: cliente_id -> última forma de pagamento usada
let _finAtualizandoLista = false; // evita re-renders sobrepostos

async function initFinanceiro() {
  // Aplicar filtro persistido visualmente
  setTimeout(() => {
    document.querySelectorAll('.fin-filtro-btn').forEach(b => b.classList.toggle('ativo', b.dataset.status === _finFiltroStatus));
  }, 0);
  await carregarCobrancas();
  setFinTab(localStorage.getItem('fin_tab') || 'cobranca');
  // Carregar cache de formas de pagamento por cliente (A10)
  _carregarFormasPgtoPadrao();
}

// A10: descobrir forma de pagamento mais usada por cliente (pra pré-selecionar no modal)
async function _carregarFormasPgtoPadrao() {
  try {
    const { data } = await _SB.from('recebimentos')
      .select('cliente_id, forma_pagamento')
      .neq('forma_pagamento', 'estorno')
      .order('data_recebimento', { ascending: false })
      .limit(500);
    if (!data) return;
    // Conta ocorrências por cliente
    const contagem = {};
    data.forEach(r => {
      if (!r.cliente_id) return;
      const k = r.cliente_id;
      if (!contagem[k]) contagem[k] = {};
      contagem[k][r.forma_pagamento] = (contagem[k][r.forma_pagamento] || 0) + 1;
    });
    // Pega a mais usada por cliente
    Object.keys(contagem).forEach(k => {
      const formas = contagem[k];
      _finFormaPgtoCliente[k] = Object.entries(formas).sort((a,b) => b[1]-a[1])[0][0];
    });
  } catch(e) { /* silencioso */ }
}

function setFinTab(tab) {
  document.querySelectorAll('.fin-tab').forEach(t => t.classList.toggle('ativo', t.dataset.fintab === tab));
  document.querySelectorAll('.fin-painel').forEach(p => p.classList.remove('ativo'));
  document.getElementById('fin-painel-' + tab)?.classList.add('ativo');
  localStorage.setItem('fin_tab', tab);
  if (tab === 'cobranca') renderPainelCobranca();
  if (tab === 'analise') renderPainelAnalise();
  if (tab === 'ajustes') renderPainelAjustes();
  if (tab === 'recebimentos') renderPainelRecebimentos();
}

// ──────── PAINEL ANÁLISE ────────
let _finAnAno = localStorage.getItem('fin_an_ano') || String(new Date().getFullYear());
let _finAnMes = localStorage.getItem('fin_an_mes') || 'todos';

function setFinAnAno(a) {
  _finAnAno = a;
  localStorage.setItem('fin_an_ano', a);
  _renderAnAnosBtns();
  renderPainelAnalise();
}

function setFinAnMes(m) {
  _finAnMes = m;
  localStorage.setItem('fin_an_mes', m);
  _renderAnMesesBtns();
  renderPainelAnalise();
}

function _renderAnAnosBtns() {
  const wrap = document.getElementById('fin-an-anos-btns');
  if (!wrap) return;
  // Anos baseados em vendas existentes
  const anosSet = new Set();
  _finCobrancas.forEach(c => { if (c.data_emissao) anosSet.add(c.data_emissao.slice(0,4)); });
  // Garantir ano atual
  anosSet.add(String(new Date().getFullYear()));
  const anos = [...anosSet].map(Number).filter(a => a > 2000).sort((a,b) => b - a);
  let html = '<label class="fin-filtro-label">Ano:</label>';
  html += `<button class="area-btn todas ${_finAnAno === 'todos' ? 'ativo' : ''}" onclick="setFinAnAno('todos')">Todos</button>`;
  anos.forEach(a => {
    html += `<button class="area-btn ${_finAnAno === String(a) ? 'ativo' : ''}" onclick="setFinAnAno('${a}')">${a}</button>`;
  });
  wrap.innerHTML = html;
}

function _renderAnMesesBtns() {
  const wrap = document.getElementById('fin-an-meses-btns');
  if (!wrap) return;
  const MESES = [['todos','Todos'],['1','Jan'],['2','Fev'],['3','Mar'],['4','Abr'],['5','Mai'],['6','Jun'],['7','Jul'],['8','Ago'],['9','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  let html = '<label class="fin-filtro-label">Mês:</label>';
  html += MESES.map(([v,l]) =>
    `<button class="area-btn${v==='todos'?' todas':''}${_finAnMes === v ? ' ativo' : ''}" onclick="setFinAnMes('${v}')">${l}</button>`
  ).join('');
  wrap.innerHTML = html;
}

// Calcula intervalo de datas a partir de Ano + Mês
function _periodoIntervalo() {
  if (_finAnAno === 'todos') {
    return { inicio: '2000-01-01', fim: '2999-12-31' };
  }
  const ano = parseInt(_finAnAno);
  if (_finAnMes === 'todos') {
    return { inicio: `${ano}-01-01`, fim: `${ano}-12-31` };
  }
  const mes = parseInt(_finAnMes);
  const ultDia = new Date(ano, mes, 0).getDate();
  return {
    inicio: `${ano}-${String(mes).padStart(2,'0')}-01`,
    fim: `${ano}-${String(mes).padStart(2,'0')}-${String(ultDia).padStart(2,'0')}`
  };
}

// KPIs do Análise: aplicam filtros que levam o usuário a ver os dados
function aplicarFiltroAnaliseKPI(tipo) {
  if (tipo === 'realizado') {
    setFinTab('recebimentos');
  } else if (tipo === 'atraso' || tipo === 'prazo') {
    setFinTab('cobranca');
    setFinFiltroStatus(tipo === 'atraso' ? 'atrasada' : 'pago');
    if (_finAnAno !== 'todos') setFinFiltroAno(_finAnAno);
    if (_finAnMes !== 'todos') setFinFiltroMes(_finAnMes);
  } else if (tipo === 'efetivo' || tipo === 'ticket') {
    // Ir para aba Vendas (ou cobrança aberta no período)
    setFinTab('cobranca');
    setFinFiltroStatus('todas');
    if (_finAnAno !== 'todos') setFinFiltroAno(_finAnAno);
    if (_finAnMes !== 'todos') setFinFiltroMes(_finAnMes);
  }
}

async function renderPainelAnalise() {
  // Renderizar filtros (Ano + Mês)
  _renderAnAnosBtns();
  _renderAnMesesBtns();

  // A2: loading visual nos KPIs
  ['kpi-rpc-efetivo','kpi-rpc-realizado','kpi-ticket','kpi-prazo','kpi-no-prazo'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = '⏳';
  });
  const intervalo = _periodoIntervalo();
  const busca = (document.getElementById('fin-an-busca')?.value || '').trim().toLowerCase();

  try {
    // Buscar vendas no período (excluindo EXCLUIDO)
    let q = _SB.from('vendas').select('*')
      .gte('data', intervalo.inicio)
      .lte('data', intervalo.fim)
      .neq('status', 'EXCLUIDO');
    const { data: vendas, error: ve } = await q;
    if (ve) throw ve;

    let vendasArr = vendas || [];
    // Filtro de cliente em memória
    if (busca) vendasArr = vendasArr.filter(v => (v.cliente || '').toLowerCase().includes(busca));

    _renderKpisAnalise(vendasArr, intervalo);
    _renderCanais(vendasArr);
    _renderRankingClientes(vendasArr);
    _renderInadimplencia(intervalo);
  } catch(e) {
    if (typeof _isAuthError === 'function' && _isAuthError(e)) { _tratarSessaoExpirada(); return; }
    console.error('renderPainelAnalise:', e);
  }
}

function _renderKpisAnalise(vendas, intervalo) {
  // R$/coco efetivo (média ponderada por receita_liquida / cocos_entregues)
  let receitaTotal = 0, cocosTotal = 0;
  let semImpostos = 0; // A1: contagem de vendas com frete > 0 mas impostos = 0
  vendas.forEach(v => {
    const cocos = (Number(v.qtde) || 0) + (Number(v.quebra_cocos) || 0);
    if (cocos > 0 && v.rpc_efetivo > 0) {
      receitaTotal += Number(v.rpc_efetivo) * cocos;
      cocosTotal += cocos;
    }
    if (Number(v.frete) > 0 && (!Number(v.impostos) || Number(v.impostos) === 0)) {
      semImpostos++;
    }
  });
  const rpcEfetivo = cocosTotal > 0 ? receitaTotal / cocosTotal : 0;

  // A1: aviso sobre dados incompletos
  let avisoEl = document.getElementById('fin-aviso-impostos');
  if (semImpostos > 0) {
    if (!avisoEl) {
      avisoEl = document.createElement('div');
      avisoEl.id = 'fin-aviso-impostos';
      avisoEl.style.cssText = 'background:#fef9e7;border:1px solid #d4a017;border-radius:8px;padding:10px 14px;margin:8px 0;font-size:12px;color:#9a6700;display:flex;gap:10px;align-items:center';
      const kpis = document.getElementById('fin-analise-kpis');
      if (kpis) kpis.parentNode.insertBefore(avisoEl, kpis);
    }
    avisoEl.innerHTML = `⚠️ <strong>${semImpostos}</strong> venda${semImpostos>1?'s':''} no período sem impostos preenchidos — o R$/coco efetivo pode estar superestimado nessas vendas. Ideal preencher <code>vendas.impostos</code> no banco.`;
  } else if (avisoEl) {
    avisoEl.remove();
  }

  // Ticket médio
  const totalVendas = vendas.reduce((s,v) => s + (Number(v.total) || 0), 0);
  const ticket = vendas.length > 0 ? totalVendas / vendas.length : 0;

  document.getElementById('kpi-rpc-efetivo').textContent = 'R$ ' + rpcEfetivo.toFixed(2).replace('.', ',');
  document.getElementById('kpi-rpc-efetivo-sub').textContent = vendas.length + ' venda' + (vendas.length !== 1 ? 's' : '') + ' · ' + Math.round(cocosTotal).toLocaleString('pt-BR') + ' cocos';

  document.getElementById('kpi-ticket').textContent = 'R$ ' + Math.round(ticket).toLocaleString('pt-BR');
  document.getElementById('kpi-ticket-sub').textContent = vendas.length + ' venda' + (vendas.length !== 1 ? 's' : '');

  // RPC realizado, prazo médio, % no prazo (usando cobranças do período)
  _calcularKpisDePagamento(intervalo);
}

async function _calcularKpisDePagamento(intervalo) {
  try {
    const { data: cobs } = await _SB.from('cobrancas')
      .select('*')
      .gte('data_emissao', intervalo.inicio)
      .lte('data_emissao', intervalo.fim);

    const arr = cobs || [];
    const pagas = arr.filter(c => c.status === 'pago' && c.data_pagamento);

    // A11: para % no prazo precisamos do PRIMEIRO recebimento de cada cobrança paga
    // (cobranças parciais que se tornaram pagas têm a data do último pagamento, não do primeiro)
    let primeirosPagamentos = {};
    if (pagas.length > 0) {
      const cobIds = pagas.map(c => c.id);
      const { data: recs } = await _SB.from('recebimentos')
        .select('cobranca_id, data_recebimento')
        .in('cobranca_id', cobIds)
        .gt('valor', 0)
        .order('data_recebimento', { ascending: true });
      (recs || []).forEach(r => {
        if (!primeirosPagamentos[r.cobranca_id]) primeirosPagamentos[r.cobranca_id] = r.data_recebimento;
      });
    }

    // Prazo médio: dias entre emissão e PRIMEIRO pagamento
    let totalDias = 0, n = 0;
    pagas.forEach(c => {
      const dataPrimeira = primeirosPagamentos[c.id] || c.data_pagamento;
      const e = new Date(c.data_emissao + 'T00:00:00');
      const p = new Date(dataPrimeira + 'T00:00:00');
      const dias = Math.floor((p - e) / 86400000);
      if (dias >= 0 && dias < 1000) { totalDias += dias; n++; }
    });
    const prazoMedio = n > 0 ? totalDias / n : 0;

    // A11: % no prazo usa PRIMEIRO pagamento vs vencimento
    const noPrazo = pagas.filter(c => {
      const dataPrimeira = primeirosPagamentos[c.id] || c.data_pagamento;
      return dataPrimeira <= c.data_vencimento;
    }).length;
    const pctPrazo = pagas.length > 0 ? (noPrazo / pagas.length) * 100 : 0;

    document.getElementById('kpi-prazo').textContent = Math.round(prazoMedio) + 'd';
    document.getElementById('kpi-prazo-sub').textContent = pagas.length + ' cobrança' + (pagas.length !== 1 ? 's' : '') + ' analisada' + (pagas.length !== 1 ? 's' : '');
    document.getElementById('kpi-no-prazo').textContent = pctPrazo.toFixed(0) + '%';
    document.getElementById('kpi-no-prazo-sub').textContent = noPrazo + ' de ' + pagas.length + ' no prazo';

    // RPC realizado (recebimentos / cocos_entregues no período)
    _calcularRpcRealizado(intervalo);
  } catch(e) { console.warn('_calcularKpisDePagamento:', e); }
}

async function _calcularRpcRealizado(intervalo) {
  try {
    const { data: recs } = await _SB.from('recebimentos')
      .select('valor, valor_liquido, venda_id')
      .gte('data_recebimento', intervalo.inicio)
      .lte('data_recebimento', intervalo.fim);

    if (!recs || recs.length === 0) {
      document.getElementById('kpi-rpc-realizado').textContent = '—';
      return;
    }
    const totalRecebido = recs.reduce((s,r) => s + (Number(r.valor_liquido) || Number(r.valor) || 0), 0);
    const vendaIds = [...new Set(recs.map(r => r.venda_id).filter(Boolean))];
    if (vendaIds.length === 0) {
      document.getElementById('kpi-rpc-realizado').textContent = '—';
      return;
    }
    const { data: vds } = await _SB.from('vendas')
      .select('id, qtde, quebra_cocos')
      .in('id', vendaIds);
    let cocos = 0;
    (vds || []).forEach(v => { cocos += (Number(v.qtde)||0) + (Number(v.quebra_cocos)||0); });
    const rpcReal = cocos > 0 ? totalRecebido / cocos : 0;
    document.getElementById('kpi-rpc-realizado').textContent = 'R$ ' + rpcReal.toFixed(2).replace('.', ',');
    document.getElementById('kpi-rpc-realizado-sub').textContent = 'R$ ' + Math.round(totalRecebido).toLocaleString('pt-BR') + ' recebido';
  } catch(e) { console.warn('_calcularRpcRealizado:', e); }
}

function _renderCanais(vendas) {
  let mesa = { receita: 0, cocos: 0, n: 0 };
  let fabrica = { receita: 0, cocos: 0, n: 0 };

  vendas.forEach(v => {
    const cocos = (Number(v.qtde) || 0) + (Number(v.quebra_cocos) || 0);
    const receita = Number(v.total) || 0;
    if (v.tipo_venda === 'litro') {
      fabrica.receita += receita;
      fabrica.cocos += cocos;
      fabrica.n += 1;
    } else {
      mesa.receita += receita;
      mesa.cocos += cocos;
      mesa.n += 1;
    }
  });

  const total = mesa.receita + fabrica.receita;
  const pctMesa = total > 0 ? (mesa.receita / total) * 100 : 0;
  const pctFabrica = total > 0 ? (fabrica.receita / total) * 100 : 0;

  const fmt = v => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
  document.getElementById('canal-mesa-valor').textContent = fmt(mesa.receita);
  document.getElementById('canal-mesa-meta').textContent = `${pctMesa.toFixed(0)}% · ${mesa.n} venda${mesa.n!==1?'s':''} · R$/coco médio: R$ ${(mesa.cocos>0 ? mesa.receita/mesa.cocos : 0).toFixed(2).replace('.',',')}`;
  document.getElementById('canal-mesa-bar').style.width = pctMesa + '%';

  document.getElementById('canal-fabrica-valor').textContent = fmt(fabrica.receita);
  document.getElementById('canal-fabrica-meta').textContent = `${pctFabrica.toFixed(0)}% · ${fabrica.n} venda${fabrica.n!==1?'s':''} · R$/coco médio: R$ ${(fabrica.cocos>0 ? fabrica.receita/fabrica.cocos : 0).toFixed(2).replace('.',',')}`;
  document.getElementById('canal-fabrica-bar').style.width = pctFabrica + '%';
}

function _renderRankingClientes(vendas) {
  // Agrupar por cliente
  const porCliente = {};
  vendas.forEach(v => {
    const nome = (v.cliente || '—').toUpperCase();
    if (!porCliente[nome]) porCliente[nome] = { nome, receita: 0, cocos: 0, vendas: 0 };
    porCliente[nome].receita += Number(v.total) || 0;
    porCliente[nome].cocos += (Number(v.qtde) || 0) + (Number(v.quebra_cocos) || 0);
    porCliente[nome].vendas += 1;
  });

  // Calcular RPC por cliente, filtrar quem tem >= 2 vendas
  const clientes = Object.values(porCliente)
    .filter(c => c.vendas >= 2 && c.cocos > 0)
    .map(c => ({ ...c, rpc: c.receita / c.cocos }))
    .sort((a, b) => b.rpc - a.rpc);

  if (clientes.length === 0) {
    document.getElementById('fin-ranking-clientes').innerHTML = '<div style="padding:20px;text-align:center;color:var(--muted);font-size:13px">Sem dados suficientes (mín. 2 vendas)</div>';
    return;
  }

  const top = clientes.slice(0, 10);
  const bottom = clientes.length > 15 ? clientes.slice(-5).reverse() : [];

  const renderRow = (c, idx, tipo) => `
    <div class="fin-rank-row ${tipo}">
      <span class="fin-rank-pos">${idx}</span>
      <span class="fin-rank-cliente">${escapeHtml(c.nome)}</span>
      <span class="fin-rank-rpc ${tipo === 'top' ? 'alto' : 'baixo'}">R$ ${c.rpc.toFixed(2).replace('.',',')}</span>
      <span class="fin-rank-receita">R$ ${Math.round(c.receita).toLocaleString('pt-BR')}</span>
      <span class="fin-rank-vendas">${c.vendas}v</span>
    </div>
  `;

  let html = `
    <div class="fin-rank-row" style="border-bottom:2px solid var(--border);font-weight:700;text-transform:uppercase;font-size:10px;color:var(--muted);letter-spacing:.05em">
      <span></span>
      <span>Cliente</span>
      <span style="text-align:right">R$/coco</span>
      <span style="text-align:right">Receita</span>
      <span style="text-align:right">Vendas</span>
    </div>
    <div class="fin-rank-divisor">🏆 TOP 10 (melhores margens)</div>
    ${top.map((c, i) => renderRow(c, i + 1, 'top')).join('')}
  `;
  if (bottom.length > 0) {
    html += `<div class="fin-rank-divisor" style="background:rgba(239,68,68,.06);color:var(--vermelho)">⚠️ BOTTOM 5 (margens baixas)</div>`;
    html += bottom.map((c, i) => renderRow(c, clientes.length - i, 'bottom')).join('');
  }

  document.getElementById('fin-ranking-clientes').innerHTML = html;
}

async function _renderInadimplencia(intervalo) {
  try {
    const { data: cobs } = await _SB.from('cobrancas')
      .select('status, data_vencimento, data_pagamento, valor_atual')
      .gte('data_emissao', intervalo.inicio)
      .lte('data_emissao', intervalo.fim);

    const arr = cobs || [];
    const total = arr.length;
    const pagas = arr.filter(c => c.status === 'pago');
    const noPrazo = pagas.filter(c => c.data_pagamento && c.data_pagamento <= c.data_vencimento).length;
    const atrasoPagaram = pagas.filter(c => c.data_pagamento && c.data_pagamento > c.data_vencimento).length;
    const aindaAtrasadas = arr.filter(c => {
      if (c.status === 'pago' || c.status === 'cancelado') return false;
      return c.data_vencimento < new Date().toISOString().slice(0,10);
    }).length;
    const aindaAbertas = total - pagas.length - aindaAtrasadas;

    const html = `
      <div class="fin-inad-card" style="border-color:var(--verde-border);background:var(--verde-bg)">
        <div class="fin-inad-label">Pagas no prazo</div>
        <div class="fin-inad-valor" style="color:var(--forest)">${noPrazo}</div>
        <div class="fin-inad-sub">${total > 0 ? ((noPrazo/total)*100).toFixed(0) : 0}% do total</div>
      </div>
      <div class="fin-inad-card" style="border-color:#fbbf24;background:#fef9e7">
        <div class="fin-inad-label">Pagas com atraso</div>
        <div class="fin-inad-valor" style="color:#9a6700">${atrasoPagaram}</div>
        <div class="fin-inad-sub">${total > 0 ? ((atrasoPagaram/total)*100).toFixed(0) : 0}% do total</div>
      </div>
      <div class="fin-inad-card" style="border-color:var(--vermelho-border);background:rgba(239,68,68,.06)">
        <div class="fin-inad-label">Ainda atrasadas</div>
        <div class="fin-inad-valor" style="color:var(--vermelho)">${aindaAtrasadas}</div>
        <div class="fin-inad-sub">${total > 0 ? ((aindaAtrasadas/total)*100).toFixed(0) : 0}% do total</div>
      </div>
      <div class="fin-inad-card">
        <div class="fin-inad-label">Em aberto (no prazo)</div>
        <div class="fin-inad-valor" style="color:var(--text)">${aindaAbertas}</div>
        <div class="fin-inad-sub">${total > 0 ? ((aindaAbertas/total)*100).toFixed(0) : 0}% do total</div>
      </div>
    `;
    document.getElementById('fin-inadimplencia').innerHTML = html;
  } catch(e) { console.warn('_renderInadimplencia:', e); }
}

async function carregarCobrancas() {
  // A2: indicador visual de loading
  const lista = document.getElementById('fin-lista-cobrancas');
  if (lista && _finCobrancas.length === 0) {
    lista.innerHTML = '<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">⏳ Carregando cobranças...</div>';
  }
  try {
    const { data, error } = await _SB.from('cobrancas')
      .select('*')
      .order('data_vencimento', { ascending: true });
    if (error) {
      if (typeof _isAuthError === 'function' && _isAuthError(error)) { _tratarSessaoExpirada(); return; }
      console.error('Erro ao carregar cobranças:', error);
      _finCobrancas = [];
      return;
    }
    _finCobrancas = data || [];
  } catch(e) {
    console.error('Falha em carregarCobrancas:', e);
    _finCobrancas = [];
  }
}

function _diasParaVencer(dataVenc) {
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const venc = new Date(dataVenc + 'T00:00:00');
  return Math.floor((venc - hoje) / 86400000);
}

function _isAtrasada(c) {
  if (c.status === 'pago' || c.status === 'cancelado') return false;
  return _diasParaVencer(c.data_vencimento) < 0;
}

function _statusVisual(c) {
  // Status calculado: cobranças com vencimento passado viram 'atrasada' (ou 'parcial_atrasada' se tiver pagamento parcial)
  if (_isAtrasada(c)) {
    // A6: separar parcial atrasada
    return c.status === 'pago_parcial' ? 'parcial_atrasada' : 'atrasada';
  }
  return c.status;
}

function renderPainelCobranca() {
  _renderAnosBtns();
  _renderMesesBtns();
  _atualizarContagensFiltros();
  renderKPIsCobranca();
  renderListaCobrancas();
}

function renderKPIsCobranca() {
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const hojeISO = hoje.toISOString().slice(0,10);
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().slice(0,10);

  // A receber hoje
  const hojeList = _finCobrancas.filter(c => c.data_vencimento === hojeISO && c.status !== 'pago' && c.status !== 'cancelado');
  const hojeValor = hojeList.reduce((s,c) => s + (Number(c.valor_atual) - Number(c.valor_pago)), 0);

  // Em atraso
  const atrasadas = _finCobrancas.filter(c => _isAtrasada(c));
  const atrasoValor = atrasadas.reduce((s,c) => s + (Number(c.valor_atual) - Number(c.valor_pago)), 0);
  const clientesAtraso = new Set(atrasadas.map(c => c.cliente_nome)).size;

  // Total a receber (saldo aberto independente de vencimento)
  const naoPagas = _finCobrancas.filter(c => c.status !== 'pago' && c.status !== 'cancelado');
  const totalReceber = naoPagas.reduce((s,c) => s + (Number(c.valor_atual) - Number(c.valor_pago)), 0);

  // Atualizar KPIs
  const fmt = v => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
  document.querySelector('#fin-kpis .vkpi:nth-child(1) .vkpi-val').textContent = fmt(hojeValor);
  document.getElementById('kpi-hoje-sub').textContent = hojeList.length + ' cobrança' + (hojeList.length !== 1 ? 's' : '');

  document.querySelector('#fin-kpis .vkpi:nth-child(2) .vkpi-val').textContent = fmt(atrasoValor);
  document.getElementById('kpi-atraso-sub').textContent = atrasadas.length + ' cobrança' + (atrasadas.length !== 1 ? 's' : '') + ' · ' + clientesAtraso + ' cliente' + (clientesAtraso !== 1 ? 's' : '');

  // Recebido no mês — busca em recebimentos
  carregarRecebidoMes(inicioMes);

  document.getElementById('kpi-total-receber').textContent = fmt(totalReceber);
  document.getElementById('kpi-total-sub').textContent = naoPagas.length + ' cobrança' + (naoPagas.length !== 1 ? 's' : '');
}

async function carregarRecebidoMes(inicioMes) {
  try {
    const { data, error } = await _SB.from('recebimentos')
      .select('valor, valor_liquido')
      .gte('data_recebimento', inicioMes);
    if (error || !data) return;
    const total = data.reduce((s,r) => s + (Number(r.valor_liquido) || Number(r.valor) || 0), 0);
    document.getElementById('kpi-receb-mes').textContent = 'R$ ' + Math.round(total).toLocaleString('pt-BR');
    document.getElementById('kpi-receb-mes-sub').textContent = data.length + ' recebimento' + (data.length !== 1 ? 's' : '');
  } catch(e) { /* silencioso */ }
}

function setFinFiltroStatus(s) {
  _finFiltroStatus = s;
  localStorage.setItem('fin_filtro_status', s); // A5: persistir
  document.querySelectorAll('.fin-filtro-btn').forEach(b => b.classList.toggle('ativo', b.dataset.status === s));
  renderListaCobrancas();
}

// Aplica filtro a partir do clique nos KPIs
function aplicarFiltroKPI(tipo) {
  if (tipo === 'hoje') {
    // Filtra cobranças vencendo hoje (não pagas/canceladas)
    setFinFiltroStatus('todas');
    setFinFiltroAno('todos');
    setFinFiltroMes('todos');
    document.getElementById('fin-busca').value = '__VENCENDO_HOJE__';
    renderListaCobrancas();
    showToast('Mostrando cobranças vencendo HOJE');
  } else if (tipo === 'atraso') {
    setFinFiltroStatus('atrasada');
    setFinFiltroAno('todos');
    setFinFiltroMes('todos');
    document.getElementById('fin-busca').value = '';
    renderListaCobrancas();
  } else if (tipo === 'recebido') {
    setFinTab('recebimentos');
  } else if (tipo === 'total') {
    setFinFiltroStatus('todas');
    setFinFiltroAno('todos');
    setFinFiltroMes('todos');
    document.getElementById('fin-busca').value = '__COM_SALDO__';
    renderListaCobrancas();
    showToast('Mostrando todas com saldo');
  }
  // Scroll para a tabela
  setTimeout(() => {
    const tabela = document.getElementById('fin-cob-table');
    if (tabela) tabela.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// M10: contagem de cobranças por filtro
function _contarPorStatus() {
  const cont = { atrasada: 0, aberto: 0, pago_parcial: 0, pago: 0, todas: 0 };
  _finCobrancas.forEach(c => {
    cont.todas += 1;
    if (_isAtrasada(c)) cont.atrasada += 1;
    else if (c.status === 'aberto') cont.aberto += 1;
    else if (c.status === 'pago_parcial') cont.pago_parcial += 1;
    else if (c.status === 'pago') cont.pago += 1;
  });
  return cont;
}

function _atualizarContagensFiltros() {
  const c = _contarPorStatus();
  document.querySelectorAll('.fin-filtro-btn').forEach(b => {
    const s = b.dataset.status;
    if (s in c) {
      const baseLabel = b.dataset.baseLabel || b.textContent.replace(/\s*\(\d+\)\s*$/, '');
      b.dataset.baseLabel = baseLabel;
      b.textContent = `${baseLabel} (${c[s]})`;
    }
  });
}

// A3: paginação
let _finPagina = 1;
const _FIN_POR_PAGINA = 100;

// Renderiza botões de Ano (todos + anos com cobranças)
function _renderAnosBtns() {
  const wrap = document.getElementById('fin-anos-btns');
  if (!wrap) return;
  const anos = [...new Set(_finCobrancas.map(c => c.data_emissao?.slice(0,4)).filter(Boolean))]
    .map(Number).filter(a => a > 2000).sort((a,b) => b - a);
  let html = '<label class="fin-filtro-label">Ano:</label>';
  html += `<button class="area-btn todas ${_finFiltroAno === 'todos' ? 'ativo' : ''}" onclick="setFinFiltroAno('todos')">Todos</button>`;
  anos.forEach(a => {
    html += `<button class="area-btn ${_finFiltroAno === String(a) ? 'ativo' : ''}" onclick="setFinFiltroAno('${a}')">${a}</button>`;
  });
  wrap.innerHTML = html;
}

function _renderMesesBtns() {
  const wrap = document.getElementById('fin-meses-btns');
  if (!wrap) return;
  const MESES = [['todos','Todos'],['1','Jan'],['2','Fev'],['3','Mar'],['4','Abr'],['5','Mai'],['6','Jun'],['7','Jul'],['8','Ago'],['9','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  let html = '<label class="fin-filtro-label">Mês:</label>';
  html += MESES.map(([v,l]) =>
    `<button class="area-btn${v==='todos'?' todas':''}${_finFiltroMes === v ? ' ativo' : ''}" onclick="setFinFiltroMes('${v}')">${l}</button>`
  ).join('');
  wrap.innerHTML = html;
}

function setFinFiltroAno(a) {
  _finFiltroAno = a;
  localStorage.setItem('fin_filtro_ano', a);
  _finPagina = 1;
  _renderAnosBtns();
  renderListaCobrancas();
  _atualizarContagensFiltros();
}

function setFinFiltroMes(m) {
  _finFiltroMes = m;
  localStorage.setItem('fin_filtro_mes', m);
  _finPagina = 1;
  _renderMesesBtns();
  renderListaCobrancas();
  _atualizarContagensFiltros();
}

// Aplica filtros (busca + ano + mês) e retorna array
function _filtrarCobrancas(filtraStatus = true) {
  const buscaRaw = (document.getElementById('fin-busca')?.value || '').trim();
  const buscaEspecial = buscaRaw.startsWith('__') && buscaRaw.endsWith('__');
  const busca = buscaEspecial ? '' : buscaRaw.toLowerCase();
  const hojeISO = new Date().toISOString().slice(0,10);

  return _finCobrancas.filter(c => {
    if (busca && !(c.cliente_nome || '').toLowerCase().includes(busca)) return false;
    // Filtros especiais (via aplicarFiltroKPI)
    if (buscaRaw === '__VENCENDO_HOJE__') {
      if (c.status === 'pago' || c.status === 'cancelado') return false;
      if (c.data_vencimento !== hojeISO) return false;
    }
    if (buscaRaw === '__COM_SALDO__') {
      if (c.status === 'cancelado') return false;
      if (Number(c.valor_atual) - Number(c.valor_pago) <= 0) return false;
    }
    // Filtro por ano (data_emissao)
    if (_finFiltroAno !== 'todos' && c.data_emissao?.slice(0,4) !== _finFiltroAno) return false;
    // Filtro por mês
    if (_finFiltroMes !== 'todos') {
      const mesCob = parseInt(c.data_emissao?.slice(5,7));
      if (mesCob !== parseInt(_finFiltroMes)) return false;
    }
    if (!filtraStatus) return true;
    if (buscaEspecial) return true; // filtros especiais ignoram status
    if (_finFiltroStatus === 'todas') return true;
    if (_finFiltroStatus === 'atrasada') return _isAtrasada(c);
    if (_finFiltroStatus === 'aberto') return c.status === 'aberto' && !_isAtrasada(c);
    if (_finFiltroStatus === 'pago_parcial') return c.status === 'pago_parcial' && !_isAtrasada(c);
    return c.status === _finFiltroStatus;
  });
}

function renderListaCobrancas() {
  const tbody = document.getElementById('fin-cob-tbody');
  if (!tbody) return;

  let filt = _filtrarCobrancas(true);
  // Atrasadas: mais antigas primeiro. Resto: vencimento mais próximo primeiro.
  filt.sort((a,b) => a.data_vencimento.localeCompare(b.data_vencimento));

  if (filt.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="padding:30px;text-align:center;color:var(--muted);font-size:13px">Nenhuma cobrança encontrada</td></tr>';
    document.getElementById('fin-cob-paginacao').innerHTML = '';
    return;
  }

  // Paginação
  const totalPaginas = Math.ceil(filt.length / _FIN_POR_PAGINA);
  if (_finPagina > totalPaginas) _finPagina = 1;
  const inicio = (_finPagina - 1) * _FIN_POR_PAGINA;
  const pagina = filt.slice(inicio, inicio + _FIN_POR_PAGINA);

  tbody.innerHTML = pagina.map(c => {
    const status = _statusVisual(c);
    const dias = _diasParaVencer(c.data_vencimento);
    const saldo = Number(c.valor_atual) - Number(c.valor_pago);
    const venc = new Date(c.data_vencimento + 'T00:00:00');
    const vencFmt = String(venc.getDate()).padStart(2,'0') + '/' + String(venc.getMonth()+1).padStart(2,'0') + '/' + venc.getFullYear();

    let diasInfo = '';
    if (status === 'atrasada' || status === 'parcial_atrasada') {
      diasInfo = `<div style="font-size:10px;color:var(--vermelho);font-weight:700">${Math.abs(dias)}d atrasada</div>`;
    } else if (dias === 0) {
      diasInfo = '<div style="font-size:10px;color:#9a6700;font-weight:700">Vence hoje</div>';
    } else if (dias > 0 && dias <= 7) {
      diasInfo = `<div style="font-size:10px;color:#9a6700">em ${dias}d</div>`;
    }

    const podeBaixar = c.status !== 'pago' && c.status !== 'cancelado';
    const podeCancelar = c.status !== 'cancelado';
    const acoes = `
      ${podeBaixar ? `<button class="acao-edicao" onclick="event.stopPropagation();abrirModalBaixa(${c.id})" title="Baixar pagamento" style="color:#d97706;font-size:14px">💸</button>` : ''}
      <button onclick="event.stopPropagation();abrirWhatsCobranca(${c.id})" title="WhatsApp">📱</button>
      ${podeBaixar ? `<button class="acao-edicao" onclick="event.stopPropagation();abrirAjusteCobranca(${c.id})" title="Ajuste">🔧</button>` : ''}
      ${podeCancelar ? `<button class="acao-edicao" onclick="event.stopPropagation();cancelarCobranca(${c.id})" title="Cancelar cobrança" style="color:var(--vermelho)">✕</button>` : ''}
    `;

    return `<tr class="${status}" data-cob-id="${c.id}" onclick="openCobPanel(${c.id})">
      <td class="col-data">${vencFmt}${diasInfo}</td>
      <td class="col-cliente">${escapeHtml(c.cliente_nome || '—')}</td>
      <td class="col-valor">R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')}</td>
      <td class="col-valor" style="color:var(--muted)">${Number(c.valor_pago) > 0 ? 'R$ ' + Math.round(c.valor_pago).toLocaleString('pt-BR') : '—'}</td>
      <td class="col-valor" style="color:${saldo > 0 ? 'var(--vermelho)' : 'var(--muted)'}">${saldo > 0 && status !== 'cancelado' ? 'R$ ' + Math.round(saldo).toLocaleString('pt-BR') : '—'}</td>
      <td><span class="fin-cob-status ${status}" style="font-size:8px">${_statusLabel(status)}</span></td>
      <td class="col-acoes">${acoes}</td>
    </tr>`;
  }).join('');

  // Paginação visual
  const pag = document.getElementById('fin-cob-paginacao');
  if (totalPaginas > 1) {
    pag.innerHTML = `<div class="fin-paginacao">
      <button onclick="finPaginaPrev()" ${_finPagina === 1 ? 'disabled' : ''}>◂ Anterior</button>
      <span>Página ${_finPagina} de ${totalPaginas} · ${filt.length} cobranças</span>
      <button onclick="finPaginaNext()" ${_finPagina >= totalPaginas ? 'disabled' : ''}>Próxima ▸</button>
    </div>`;
  } else {
    pag.innerHTML = `<div style="padding:8px;text-align:center;font-size:11px;color:var(--muted)">${filt.length} cobrança${filt.length>1?'s':''}</div>`;
  }
}

function finPaginaNext() { _finPagina++; renderListaCobrancas(); window.scrollTo({top: 0, behavior: 'smooth'}); }
function finPaginaPrev() { if (_finPagina > 1) { _finPagina--; renderListaCobrancas(); window.scrollTo({top: 0, behavior: 'smooth'}); } }

function _statusLabel(s) {
  const map = { atrasada:'ATRASADA', parcial_atrasada:'PARCIAL ATRASADA', aberto:'EM ABERTO', pago_parcial:'PARCIAL', pago:'PAGO', cancelado:'CANCELADO' };
  return map[s] || s.toUpperCase();
}

// ── MODAL: BAIXA DE PAGAMENTO ──
function abrirModalBaixa(cobrancaId) {
  const c = _finCobrancas.find(x => x.id === cobrancaId);
  if (!c) return;
  _finCobrancaSel = c;
  const saldo = Number(c.valor_atual) - Number(c.valor_pago);

  document.getElementById('baixa-info').innerHTML = `
    <div style="font-weight:800;color:var(--forest);margin-bottom:4px">${escapeHtml(c.cliente_nome)}</div>
    <div style="font-size:11px;color:var(--muted);font-family:var(--font-mono)">
      Cobrança #${c.id} · Total: R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')} · Pago: R$ ${Math.round(c.valor_pago).toLocaleString('pt-BR')}
    </div>
    <div style="margin-top:6px;font-size:14px;font-weight:800;color:var(--vermelho)">
      Saldo a receber: R$ ${Math.round(saldo).toLocaleString('pt-BR')}
    </div>`;

  // Pré-preencher valor com o saldo total
  document.getElementById('baixa-valor').value = saldo.toFixed(2).replace('.',',');
  document.getElementById('baixa-data').value = new Date().toISOString().slice(0,10);
  // A10: pré-seleciona a forma de pagamento mais usada por este cliente
  const formaPadrao = (c.cliente_id && _finFormaPgtoCliente[c.cliente_id]) || 'pix';
  document.getElementById('baixa-forma').value = formaPadrao;
  document.getElementById('baixa-taxa').value = '';
  document.getElementById('baixa-obs').value = '';
  document.getElementById('baixa-erro').style.display = 'none';
  document.getElementById('baixa-valor-hint').textContent = 'Saldo restante: R$ ' + Math.round(saldo).toLocaleString('pt-BR');

  openModal('modal-baixa-overlay');
}

function onBaixaValorInput(el) {
  // Aceita vírgula ou ponto. Parse permissivo.
  let raw = el.value.replace(/[^\d,\.]/g, '').replace(/\./g, ',');
  const parts = raw.split(',');
  if (parts.length > 1) raw = parts[0] + ',' + parts.slice(1).join('').slice(0,2);
  if (el.value !== raw) el.value = raw;
}

function _parseBaixaValor() {
  const raw = (document.getElementById('baixa-valor').value || '').replace(/\./g,'').replace(',','.');
  return parseFloat(raw) || 0;
}

let _baixandoPagamento = false;

async function confirmarBaixa() {
  // C1: bloqueia duplo-clique
  if (_baixandoPagamento) return;
  if (!_finCobrancaSel) return;

  const c = _finCobrancaSel;
  const valor = _parseBaixaValor();
  const data = document.getElementById('baixa-data').value;
  const forma = document.getElementById('baixa-forma').value;
  const taxa = parseFloat(document.getElementById('baixa-taxa').value) || 0;
  const obs = document.getElementById('baixa-obs').value.trim();
  const erro = document.getElementById('baixa-erro');
  const btn = document.querySelector('#modal-baixa-overlay button.btn-primary');

  // Validações
  if (!valor || valor <= 0) { erro.textContent = 'Informe um valor válido.'; erro.style.display = 'block'; return; }
  if (!data) { erro.textContent = 'Informe a data do recebimento.'; erro.style.display = 'block'; return; }
  if (data < c.data_emissao) { erro.textContent = 'Data não pode ser anterior à emissão da cobrança.'; erro.style.display = 'block'; return; }

  const saldo = Number(c.valor_atual) - Number(c.valor_pago);
  if (valor > saldo + 0.01) {
    if (!confirm(`Valor recebido (R$ ${valor.toFixed(2)}) é MAIOR que o saldo (R$ ${saldo.toFixed(2)}). Continuar mesmo assim?`)) return;
  }

  // Pegar email do usuário logado
  const userEmail = (_userPermissoes && _userPermissoes.email) || 'desconhecido';

  // C1: lock + disable visual do botão
  _baixandoPagamento = true;
  if (btn) {
    btn.disabled = true;
    btn.dataset.origText = btn.textContent;
    btn.textContent = '⏳ Salvando...';
    btn.style.opacity = '0.6';
    btn.style.cursor = 'wait';
  }

  try {
    const payload = {
      cobranca_id: c.id,
      venda_id: c.venda_id,
      cliente_id: c.cliente_id,
      valor: valor,
      data_recebimento: data,
      forma_pagamento: forma,
      taxa: taxa,
      obs: obs || null,
      baixado_por: userEmail
    };
    const { error } = await _SB.from('recebimentos').insert(payload);
    if (error) {
      if (typeof _isAuthError === 'function' && _isAuthError(error)) { _tratarSessaoExpirada(); return; }
      erro.textContent = 'Erro ao salvar: ' + (error.message || 'verifique conexão');
      erro.style.display = 'block';
      return;
    }
    closeModal('modal-baixa-overlay');
    if (typeof showToast === 'function') showToast('✓ Pagamento registrado');
    _finCobrancaSel = null; // C7: limpa seleção
    await carregarCobrancas();
    renderPainelCobranca();
  } catch(e) {
    erro.textContent = 'Erro: ' + (e.message || e);
    erro.style.display = 'block';
  } finally {
    // C1: libera lock e restaura botão
    _baixandoPagamento = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = btn.dataset.origText || '✓ Confirmar Pagamento';
      btn.style.opacity = '';
      btn.style.cursor = '';
    }
  }
}

// ── ACÕES SECUNDÁRIAS (placeholders por enquanto) ──
// Limpa telefone para formato wa.me (apenas dígitos, com 55 BR se não tiver)
function _limparTelefoneBR(tel) {
  if (!tel) return '';
  let t = String(tel).replace(/\D/g, '');
  if (!t) return '';
  // Adiciona 55 (Brasil) se não começar com ele e tiver 10-11 dígitos
  if (t.length === 10 || t.length === 11) t = '55' + t;
  return t;
}

async function abrirWhatsCobranca(cobrancaId) {
  const c = _finCobrancas.find(x => x.id === cobrancaId);
  if (!c) return;
  const saldo = Number(c.valor_atual) - Number(c.valor_pago);
  const venc = new Date(c.data_vencimento + 'T00:00:00');
  const vencFmt = String(venc.getDate()).padStart(2,'0') + '/' + String(venc.getMonth()+1).padStart(2,'0');
  const dias = _diasParaVencer(c.data_vencimento);

  // Buscar telefone do cliente cadastrado
  let telefone = '';
  try {
    if (c.cliente_id) {
      const { data } = await _SB.from('clientes')
        .select('telefone')
        .eq('id', c.cliente_id)
        .single();
      telefone = _limparTelefoneBR(data?.telefone);
    }
  } catch(e) { /* fallback sem telefone */ }

  let msg = `Olá! Cobrança Neofrut:\n\n`;
  msg += `Cliente: ${c.cliente_nome}\n`;
  msg += `Valor: R$ ${Math.round(saldo).toLocaleString('pt-BR')}\n`;
  msg += `Vencimento: ${vencFmt}\n`;
  if (dias < 0) msg += `\n⚠️ Em atraso há ${Math.abs(dias)} dia${Math.abs(dias)>1?'s':''}\n`;
  msg += `\nPedimos a gentileza do pagamento. Obrigado!`;

  // Se tem telefone, abre direto na conversa do cliente
  const url = telefone
    ? `https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/?text=${encodeURIComponent(msg)}`;

  if (!telefone && typeof showToast === 'function') {
    showToast('⚠ Telefone não cadastrado — selecione o contato manualmente');
  }
  window.open(url, '_blank');
}

function abrirAjusteCobranca(cobrancaId) {
  alert('🔧 Ajustes em desenvolvimento (Sprint 4). Em breve você poderá lançar descontos e devoluções aqui.');
}

function abrirVendaDoFinanceiro(vendaId) {
  if (!vendaId) { alert('Venda não vinculada a esta cobrança.'); return; }
  showPage('vendas');
  setTimeout(() => {
    if (typeof editarVenda === 'function') editarVenda(vendaId);
  }, 300);
}

// Cancelar cobrança (com motivo)
async function cancelarCobranca(cobrancaId) {
  const c = _finCobrancas.find(x => x.id === cobrancaId);
  if (!c) return;

  let aviso = `Cancelar cobrança de ${c.cliente_nome}\nValor: R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')}`;
  if (Number(c.valor_pago) > 0) {
    aviso += `\n\n⚠️ ATENÇÃO: esta cobrança já tem R$ ${Math.round(c.valor_pago).toLocaleString('pt-BR')} pago.`;
    aviso += `\nUm ESTORNO automático será criado.`;
  }
  aviso += `\n\nInforme o motivo do cancelamento:`;

  const motivo = prompt(aviso, '');
  if (motivo === null) return; // usuário cancelou
  if (!motivo.trim()) { alert('Motivo é obrigatório.'); return; }

  const userEmail = (_userPermissoes && _userPermissoes.email) || 'desconhecido';

  try {
    const { error } = await _SB.from('cobrancas')
      .update({
        status: 'cancelado',
        cancelado_motivo: motivo.trim(),
        baixado_por: userEmail,
        updated_at: new Date().toISOString()
      })
      .eq('id', cobrancaId);
    if (error) {
      if (typeof _isAuthError === 'function' && _isAuthError(error)) { _tratarSessaoExpirada(); return; }
      alert('Erro ao cancelar: ' + (error.message || 'verifique conexão'));
      return;
    }
    showToast('✓ Cobrança cancelada' + (Number(c.valor_pago) > 0 ? ' + estorno automático' : ''));
    await carregarCobrancas();
    renderPainelCobranca();
  } catch(e) {
    alert('Erro: ' + (e.message || e));
  }
}

// ═══════════════════════════════════════
// PAINEL AJUSTES (Sprint 4)
// ═══════════════════════════════════════
let _finAjustes = [];
let _finAjFiltroTipo = localStorage.getItem('fin_aj_tipo') || 'todos';
let _finAjAno = localStorage.getItem('fin_aj_ano') || String(new Date().getFullYear());
let _finAjMes = localStorage.getItem('fin_aj_mes') || 'todos';
let _finAjustandoSel = null; // cobrança alvo do modal
let _registrandoAjuste = false;

function setFinAjAno(a) { _finAjAno = a; localStorage.setItem('fin_aj_ano', a); _renderAjAnosBtns(); _renderAjLista(); _renderAjKPIs(); }
function setFinAjMes(m) { _finAjMes = m; localStorage.setItem('fin_aj_mes', m); _renderAjMesesBtns(); _renderAjLista(); _renderAjKPIs(); }

function _renderAjAnosBtns() {
  const wrap = document.getElementById('fin-aj-anos-btns');
  if (!wrap) return;
  const anosSet = new Set();
  _finAjustes.forEach(a => { if (a.data_ajuste) anosSet.add(a.data_ajuste.slice(0,4)); });
  anosSet.add(String(new Date().getFullYear()));
  const anos = [...anosSet].map(Number).filter(a => a > 2000).sort((a,b) => b - a);
  let html = '<label class="fin-filtro-label">Ano:</label>';
  html += `<button class="area-btn todas ${_finAjAno === 'todos' ? 'ativo' : ''}" onclick="setFinAjAno('todos')">Todos</button>`;
  anos.forEach(a => html += `<button class="area-btn ${_finAjAno === String(a) ? 'ativo' : ''}" onclick="setFinAjAno('${a}')">${a}</button>`);
  wrap.innerHTML = html;
}

function _renderAjMesesBtns() {
  const wrap = document.getElementById('fin-aj-meses-btns');
  if (!wrap) return;
  const MESES = [['todos','Todos'],['1','Jan'],['2','Fev'],['3','Mar'],['4','Abr'],['5','Mai'],['6','Jun'],['7','Jul'],['8','Ago'],['9','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  let html = '<label class="fin-filtro-label">Mês:</label>';
  html += MESES.map(([v,l]) => `<button class="area-btn${v==='todos'?' todas':''}${_finAjMes === v ? ' ativo' : ''}" onclick="setFinAjMes('${v}')">${l}</button>`).join('');
  wrap.innerHTML = html;
}

async function renderPainelAjustes() {
  const lista = document.getElementById('fin-lista-ajustes');
  if (lista) lista.innerHTML = '<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">⏳ Carregando ajustes...</div>';
  try {
    // Buscar todos ajustes (limita 1000 mais recentes)
    const { data, error } = await _SB.from('ajustes')
      .select('*')
      .order('data_ajuste', { ascending: false })
      .limit(1000);
    if (error) {
      if (typeof _isAuthError === 'function' && _isAuthError(error)) { _tratarSessaoExpirada(); return; }
      console.error('Erro ao carregar ajustes:', error);
      _finAjustes = [];
      return;
    }
    _finAjustes = data || [];
    // Render filtros
    _renderAjAnosBtns();
    _renderAjMesesBtns();
    document.querySelectorAll('.fin-aj-tipo-btn').forEach(b => b.classList.toggle('ativo', b.dataset.tipo === _finAjFiltroTipo));
    _renderAjKPIs();
    _renderAjLista();
  } catch(e) {
    console.error('Falha em renderPainelAjustes:', e);
  }
}

function setFinAjTipo(tipo) {
  _finAjFiltroTipo = tipo;
  localStorage.setItem('fin_aj_tipo', tipo);
  document.querySelectorAll('.fin-aj-tipo-btn').forEach(b => b.classList.toggle('ativo', b.dataset.tipo === tipo));
  _renderAjLista();
}

// Aplica filtros de Ano+Mês+Tipo+Busca (helper compartilhado)
function _filtrarAjustes() {
  const busca = (document.getElementById('fin-aj-busca')?.value || '').trim().toLowerCase();
  const cobrMap = {};
  _finCobrancas.forEach(c => { cobrMap[c.id] = c; });

  return _finAjustes.filter(a => {
    if (_finAjFiltroTipo !== 'todos' && a.tipo !== _finAjFiltroTipo) return false;
    if (_finAjAno !== 'todos' && a.data_ajuste?.slice(0,4) !== _finAjAno) return false;
    if (_finAjMes !== 'todos') {
      const mes = parseInt(a.data_ajuste?.slice(5,7));
      if (mes !== parseInt(_finAjMes)) return false;
    }
    if (busca) {
      const cliNome = (cobrMap[a.cobranca_id]?.cliente_nome || '').toLowerCase();
      if (!cliNome.includes(busca)) return false;
    }
    return true;
  });
}

function _renderAjKPIs() {
  // KPIs respeitam filtros de Ano + Mês (mas IGNORAM filtro de tipo, pra mostrar visão geral)
  const tipoBackup = _finAjFiltroTipo;
  _finAjFiltroTipo = 'todos';
  const filt = _filtrarAjustes();
  _finAjFiltroTipo = tipoBackup;

  const descontos = filt.filter(a => a.tipo === 'desconto' || a.tipo === 'devolucao_parcial' || a.tipo === 'devolucao_total');
  const totalDescontos = descontos.reduce((s,a) => s + Math.abs(Number(a.valor) || 0), 0);

  // Créditos: TODOS os créditos no período (não filtra por mês para mostrar saldo total)
  const creditos = _finAjustes.filter(a => a.tipo === 'credito_futuro');
  const totalCreditos = creditos.reduce((s,a) => s + (Number(a.valor) || 0), 0);

  const reentregas = filt.filter(a => a.tipo === 'reentrega');
  const totalCocosExtras = reentregas.reduce((s,a) => s + (Number(a.cocos_extras) || 0), 0);

  const labelPeriodo = _finAjAno === 'todos' ? 'todo histórico' : (_finAjMes === 'todos' ? _finAjAno : _finAjAno + '/' + _finAjMes.padStart(2,'0'));

  document.getElementById('kpi-aj-descontos').textContent = 'R$ ' + Math.round(totalDescontos).toLocaleString('pt-BR');
  document.getElementById('kpi-aj-descontos-sub').textContent = descontos.length + ' ajuste' + (descontos.length !== 1 ? 's' : '');

  document.getElementById('kpi-aj-creditos').textContent = 'R$ ' + Math.round(totalCreditos).toLocaleString('pt-BR');

  document.getElementById('kpi-aj-reentregas').textContent = totalCocosExtras.toLocaleString('pt-BR');
  document.getElementById('kpi-aj-reentregas-sub').textContent = reentregas.length + ' reentrega' + (reentregas.length !== 1 ? 's' : '');

  document.getElementById('kpi-aj-total').textContent = filt.length;
  document.getElementById('kpi-aj-total-sub').textContent = labelPeriodo;
}

const _AJ_LABELS = {
  desconto: { emoji: '🔻', nome: 'Desconto' },
  devolucao_parcial: { emoji: '🔄', nome: 'Devolução parcial' },
  devolucao_total: { emoji: '❌', nome: 'Devolução total' },
  credito_futuro: { emoji: '💳', nome: 'Crédito futuro' },
  reentrega: { emoji: '🚚', nome: 'Reentrega' }
};
const _MOTIVOS_LABELS = {
  cocos_quebrados: 'Cocos quebrados',
  qualidade_ruim: 'Qualidade ruim',
  atraso: 'Atraso',
  recusa_cliente: 'Recusa do cliente',
  erro_lancamento: 'Erro de lançamento',
  outro: 'Outro'
};

function _renderAjLista() {
  const lista = document.getElementById('fin-lista-ajustes');
  if (!lista) return;

  const filt = _filtrarAjustes();

  if (filt.length === 0) {
    lista.innerHTML = '<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">Nenhum ajuste encontrado</div>';
    return;
  }

  // Mapa cobrança_id → cliente para mostrar nome
  const cobrMap = {};
  _finCobrancas.forEach(c => { cobrMap[c.id] = c; });

  lista.innerHTML = filt.map(a => {
    const lbl = _AJ_LABELS[a.tipo] || { emoji: '🔧', nome: a.tipo };
    const motivo = _MOTIVOS_LABELS[a.motivo] || a.motivo;
    const cobr = cobrMap[a.cobranca_id];
    const cliente = cobr ? cobr.cliente_nome : (a.venda_id ? `Venda #${a.venda_id}` : '—');

    let valorHtml = '';
    if (a.tipo === 'reentrega') {
      valorHtml = `<div class="fin-aj-valor positivo">+ ${a.cocos_extras} cocos</div>`;
    } else if (a.valor != null) {
      const cls = Number(a.valor) < 0 ? 'negativo' : 'positivo';
      const sinal = Number(a.valor) < 0 ? '-' : '+';
      valorHtml = `<div class="fin-aj-valor ${cls}">${sinal} R$ ${Math.abs(Number(a.valor)).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}</div>`;
    }

    const dt = new Date(a.data_ajuste + 'T00:00:00');
    const dtFmt = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0') + '/' + dt.getFullYear();

    // Cards clicáveis: vão para a cobrança vinculada
    const onclickAttr = a.cobranca_id ? `onclick="openCobPanel(${a.cobranca_id})" style="cursor:pointer"` : '';
    return `
      <div class="fin-aj-row clicavel ${a.tipo}" ${onclickAttr} title="${a.cobranca_id ? 'Clique para ver a cobrança' : ''}">
        <span class="fin-aj-tipo-icon" title="${lbl.nome}">${lbl.emoji}</span>
        <div class="fin-aj-info">
          <div class="fin-aj-cliente">${escapeHtml(cliente)}</div>
          <div class="fin-aj-meta">
            <span><strong>${lbl.nome}</strong></span>
            <span>${motivo}</span>
            ${a.obs ? `<span style="color:var(--muted)">• ${escapeHtml(a.obs)}</span>` : ''}
          </div>
        </div>
        ${valorHtml}
        <span class="fin-aj-data">${dtFmt}</span>
      </div>`;
  }).join('') + `<div style="padding:8px;text-align:center;font-size:11px;color:var(--muted)">${filt.length} ajuste${filt.length !== 1 ? 's' : ''}</div>`;
}

// ─── MODAL: NOVO AJUSTE ───
function abrirModalAjuste(cobrancaId) {
  // Reset
  _finAjustandoSel = null;
  document.getElementById('ajuste-cobranca-info').style.display = 'none';
  document.querySelectorAll('input[name="aj-tipo"]').forEach(r => r.checked = false);
  document.querySelectorAll('.aj-tipo-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('ajuste-motivo').value = '';
  document.getElementById('ajuste-valor').value = '';
  document.getElementById('ajuste-cocos').value = '';
  document.getElementById('ajuste-data').value = new Date().toISOString().slice(0,10);
  document.getElementById('ajuste-obs').value = '';
  document.getElementById('ajuste-erro').style.display = 'none';
  document.getElementById('ajuste-grupo-valor').style.display = 'block';
  document.getElementById('ajuste-grupo-cocos').style.display = 'none';
  document.getElementById('ajuste-valor-hint').textContent = '';

  // Popular select de cobranças (apenas não canceladas)
  const sel = document.getElementById('ajuste-cobranca');
  const opts = ['<option value="">Selecione uma cobrança...</option>'];
  _finCobrancas
    .filter(c => c.status !== 'cancelado')
    .sort((a,b) => b.data_emissao.localeCompare(a.data_emissao))
    .slice(0, 200) // limita 200 mais recentes
    .forEach(c => {
      const dt = new Date(c.data_emissao + 'T00:00:00');
      const dtFmt = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0');
      opts.push(`<option value="${c.id}">${escapeHtml(c.cliente_nome)} · ${dtFmt} · R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')} · #${c.id}</option>`);
    });
  sel.innerHTML = opts.join('');

  // Se chamado do botão de uma cobrança específica, pré-seleciona
  if (cobrancaId) {
    sel.value = cobrancaId;
    onAjusteCobrancaChange();
  }

  openModal('modal-ajuste-overlay');
}

function onAjusteCobrancaChange() {
  const id = parseInt(document.getElementById('ajuste-cobranca').value);
  const c = _finCobrancas.find(x => x.id === id);
  const info = document.getElementById('ajuste-cobranca-info');
  if (!c) { info.style.display = 'none'; _finAjustandoSel = null; return; }
  _finAjustandoSel = c;
  const saldo = Number(c.valor_atual) - Number(c.valor_pago);
  info.style.display = 'block';
  info.innerHTML = `
    <div style="font-weight:800;color:var(--forest)">${escapeHtml(c.cliente_nome)}</div>
    <div style="font-size:11px;color:var(--muted);font-family:var(--font-mono);margin-top:2px">
      Total: R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')} · Pago: R$ ${Math.round(c.valor_pago).toLocaleString('pt-BR')} · Saldo: R$ ${Math.round(saldo).toLocaleString('pt-BR')}
    </div>`;
}

function onAjusteTipoChange() {
  const tipo = document.querySelector('input[name="aj-tipo"]:checked')?.value;
  document.querySelectorAll('.aj-tipo-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.tipo === tipo);
  });

  const grpValor = document.getElementById('ajuste-grupo-valor');
  const grpCocos = document.getElementById('ajuste-grupo-cocos');
  const lblValor = document.getElementById('ajuste-valor-label');
  const hint = document.getElementById('ajuste-valor-hint');

  if (tipo === 'reentrega') {
    grpValor.style.display = 'none';
    grpCocos.style.display = 'block';
    hint.textContent = '';
  } else if (tipo === 'devolucao_total') {
    grpValor.style.display = 'block';
    grpCocos.style.display = 'none';
    lblValor.textContent = 'Valor a estornar (R$) *';
    if (_finAjustandoSel) {
      const v = (Number(_finAjustandoSel.valor_atual) - Number(_finAjustandoSel.valor_pago)).toFixed(2).replace('.',',');
      document.getElementById('ajuste-valor').value = v;
      hint.textContent = 'Pré-preenchido com saldo restante. A cobrança será cancelada.';
    }
  } else if (tipo === 'credito_futuro') {
    grpValor.style.display = 'block';
    grpCocos.style.display = 'none';
    lblValor.textContent = 'Valor do crédito (R$) *';
    hint.textContent = 'Este valor vira saldo a favor do cliente para próximas vendas. Não reduz a cobrança atual.';
  } else if (tipo === 'desconto' || tipo === 'devolucao_parcial') {
    grpValor.style.display = 'block';
    grpCocos.style.display = 'none';
    lblValor.textContent = 'Valor (R$) *';
    hint.textContent = tipo === 'desconto' ? 'Reduz o valor da cobrança e o R$/coco efetivo.' : 'Reduz cobrança proporcional aos cocos devolvidos.';
  }
}

function onAjusteValorInput(el) {
  let raw = el.value.replace(/[^\d,\.]/g, '').replace(/\./g, ',');
  const parts = raw.split(',');
  if (parts.length > 1) raw = parts[0] + ',' + parts.slice(1).join('').slice(0,2);
  if (el.value !== raw) el.value = raw;
}

function _parseAjusteValor() {
  const raw = (document.getElementById('ajuste-valor').value || '').replace(/\./g,'').replace(',','.');
  return parseFloat(raw) || 0;
}

async function confirmarAjuste() {
  if (_registrandoAjuste) return;
  const erro = document.getElementById('ajuste-erro');
  const tipo = document.querySelector('input[name="aj-tipo"]:checked')?.value;
  const motivo = document.getElementById('ajuste-motivo').value;
  const data = document.getElementById('ajuste-data').value;
  const obs = document.getElementById('ajuste-obs').value.trim();

  if (!_finAjustandoSel) { erro.textContent = 'Selecione uma cobrança.'; erro.style.display = 'block'; return; }
  if (!tipo) { erro.textContent = 'Selecione o tipo de ajuste.'; erro.style.display = 'block'; return; }
  if (!motivo) { erro.textContent = 'Informe o motivo.'; erro.style.display = 'block'; return; }
  if (!data) { erro.textContent = 'Informe a data do ajuste.'; erro.style.display = 'block'; return; }

  // Validar valor/cocos conforme tipo
  let valor = null, cocos = null;
  if (tipo === 'reentrega') {
    cocos = parseInt(document.getElementById('ajuste-cocos').value) || 0;
    if (cocos <= 0) { erro.textContent = 'Informe a quantidade de cocos extras.'; erro.style.display = 'block'; return; }
  } else {
    const v = _parseAjusteValor();
    if (v <= 0) { erro.textContent = 'Informe um valor válido.'; erro.style.display = 'block'; return; }
    // Sinal correto: desconto/devolução = negativo; crédito = positivo
    if (tipo === 'credito_futuro') valor = v;
    else valor = -v;

    // Validar não exceder saldo (para devoluções/desconto)
    if (tipo !== 'credito_futuro' && tipo !== 'devolucao_total') {
      const saldo = Number(_finAjustandoSel.valor_atual) - Number(_finAjustandoSel.valor_pago);
      if (Math.abs(valor) > saldo + 0.01) {
        if (!confirm(`Valor (R$ ${Math.abs(valor).toFixed(2)}) é MAIOR que o saldo restante (R$ ${saldo.toFixed(2)}). Continuar mesmo assim?`)) return;
      }
    }
  }

  const userEmail = (_userPermissoes && _userPermissoes.email) || 'desconhecido';
  const btn = document.querySelector('#modal-ajuste-overlay button.btn-primary');

  _registrandoAjuste = true;
  if (btn) {
    btn.disabled = true;
    btn.dataset.origText = btn.textContent;
    btn.textContent = '⏳ Salvando...';
    btn.style.opacity = '0.6';
  }

  try {
    const payload = {
      venda_id: _finAjustandoSel.venda_id,
      cobranca_id: _finAjustandoSel.id,
      tipo: tipo,
      motivo: motivo,
      valor: valor,
      cocos_extras: cocos,
      data_ajuste: data,
      obs: obs || null,
      criado_por: userEmail
    };
    const { error } = await _SB.from('ajustes').insert(payload);
    if (error) {
      if (typeof _isAuthError === 'function' && _isAuthError(error)) { _tratarSessaoExpirada(); return; }
      erro.textContent = 'Erro: ' + (error.message || 'verifique conexão');
      erro.style.display = 'block';
      return;
    }

    // Para desconto/devolução, atualiza valor_atual da cobrança (trigger não faz isso ainda)
    if ((tipo === 'desconto' || tipo === 'devolucao_parcial') && valor && _finAjustandoSel.id) {
      const novoValor = Math.max(0, Number(_finAjustandoSel.valor_atual) + valor); // valor é negativo
      await _SB.from('cobrancas').update({ valor_atual: novoValor, updated_at: new Date().toISOString() }).eq('id', _finAjustandoSel.id);
    }

    closeModal('modal-ajuste-overlay');
    if (typeof showToast === 'function') showToast('✓ Ajuste registrado');
    _finAjustandoSel = null;
    await carregarCobrancas();
    if (document.getElementById('fin-painel-ajustes').classList.contains('ativo')) {
      await renderPainelAjustes();
    } else {
      renderPainelCobranca();
    }
  } catch(e) {
    erro.textContent = 'Erro: ' + (e.message || e);
    erro.style.display = 'block';
  } finally {
    _registrandoAjuste = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = btn.dataset.origText || '✓ Registrar Ajuste';
      btn.style.opacity = '';
    }
  }
}

// Substitui placeholder do botão Ajuste no Painel Cobrança
window.abrirAjusteCobranca = function(cobrancaId) {
  abrirModalAjuste(cobrancaId);
};

// ═══════════════════════════════════════
// PAINEL RECEBIMENTOS (histórico)
// ═══════════════════════════════════════
let _finRecebimentos = [];
let _finRecAno = localStorage.getItem('fin_rec_ano') || String(new Date().getFullYear());
let _finRecMes = localStorage.getItem('fin_rec_mes') || 'todos';
let _finRecForma = localStorage.getItem('fin_rec_forma') || 'todas';

function setFinRecAno(a) { _finRecAno = a; localStorage.setItem('fin_rec_ano', a); _renderRecAnosBtns(); renderPainelRecebimentos(); }
function setFinRecMes(m) { _finRecMes = m; localStorage.setItem('fin_rec_mes', m); _renderRecMesesBtns(); renderPainelRecebimentos(); }
function setFinRecForma(f) {
  _finRecForma = f;
  localStorage.setItem('fin_rec_forma', f);
  document.querySelectorAll('.fin-rec-forma-btn').forEach(b => b.classList.toggle('ativo', b.dataset.forma === f));
  renderListaRecebimentos();
}

function filtrarPorFormaTop() {
  // Pega forma mais usada e aplica filtro
  const positivos = _finRecebimentos.filter(r => Number(r.valor) > 0);
  const formas = {};
  positivos.forEach(r => { formas[r.forma_pagamento] = (formas[r.forma_pagamento] || 0) + 1; });
  const top = Object.entries(formas).sort((a,b) => b[1]-a[1])[0];
  if (top) setFinRecForma(top[0]);
}

function _renderRecAnosBtns() {
  const wrap = document.getElementById('fin-rec-anos-btns');
  if (!wrap) return;
  // Anos baseados em recebimentos (cache geral) — fallback: ano atual
  const anosSet = new Set();
  _finRecebimentos.forEach(r => { if (r.data_recebimento) anosSet.add(r.data_recebimento.slice(0,4)); });
  anosSet.add(String(new Date().getFullYear()));
  const anos = [...anosSet].map(Number).filter(a => a > 2000).sort((a,b) => b - a);
  let html = '<label class="fin-filtro-label">Ano:</label>';
  html += `<button class="area-btn todas ${_finRecAno === 'todos' ? 'ativo' : ''}" onclick="setFinRecAno('todos')">Todos</button>`;
  anos.forEach(a => html += `<button class="area-btn ${_finRecAno === String(a) ? 'ativo' : ''}" onclick="setFinRecAno('${a}')">${a}</button>`);
  wrap.innerHTML = html;
}

function _renderRecMesesBtns() {
  const wrap = document.getElementById('fin-rec-meses-btns');
  if (!wrap) return;
  const MESES = [['todos','Todos'],['1','Jan'],['2','Fev'],['3','Mar'],['4','Abr'],['5','Mai'],['6','Jun'],['7','Jul'],['8','Ago'],['9','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  let html = '<label class="fin-filtro-label">Mês:</label>';
  html += MESES.map(([v,l]) => `<button class="area-btn${v==='todos'?' todas':''}${_finRecMes === v ? ' ativo' : ''}" onclick="setFinRecMes('${v}')">${l}</button>`).join('');
  wrap.innerHTML = html;
}

function _periodoIntervaloRec() {
  if (_finRecAno === 'todos') return { inicio: '2000-01-01', fim: '2999-12-31' };
  const ano = parseInt(_finRecAno);
  if (_finRecMes === 'todos') return { inicio: `${ano}-01-01`, fim: `${ano}-12-31` };
  const mes = parseInt(_finRecMes);
  const ultDia = new Date(ano, mes, 0).getDate();
  return {
    inicio: `${ano}-${String(mes).padStart(2,'0')}-01`,
    fim: `${ano}-${String(mes).padStart(2,'0')}-${String(ultDia).padStart(2,'0')}`
  };
}

async function renderPainelRecebimentos() {
  // Renderizar filtros
  _renderRecAnosBtns();
  _renderRecMesesBtns();
  document.querySelectorAll('.fin-rec-forma-btn').forEach(b => b.classList.toggle('ativo', b.dataset.forma === _finRecForma));

  const lista = document.getElementById('fin-lista-recebimentos');
  if (lista) lista.innerHTML = '<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">⏳ Carregando recebimentos...</div>';

  const intervalo = _periodoIntervaloRec();
  try {
    const { data, error } = await _SB.from('recebimentos')
      .select('*, cobrancas(cliente_nome, valor_atual)')
      .gte('data_recebimento', intervalo.inicio)
      .lte('data_recebimento', intervalo.fim)
      .order('data_recebimento', { ascending: false });
    if (error) {
      if (typeof _isAuthError === 'function' && _isAuthError(error)) { _tratarSessaoExpirada(); return; }
      console.error('Erro ao carregar recebimentos:', error);
      _finRecebimentos = [];
      return;
    }
    _finRecebimentos = (data || []).map(r => ({ ...r, cliente_nome: r.cobrancas?.cliente_nome || '—' }));
    _renderRecKPIs();
    renderListaRecebimentos();
  } catch(e) { console.error('renderPainelRecebimentos:', e); }
}

function _renderRecKPIs() {
  const positivos = _finRecebimentos.filter(r => Number(r.valor) > 0);
  const estornos = _finRecebimentos.filter(r => Number(r.valor) < 0 || r.forma_pagamento === 'estorno');

  const totalRecebido = positivos.reduce((s,r) => s + Number(r.valor_liquido || r.valor || 0), 0);
  const ticket = positivos.length > 0 ? totalRecebido / positivos.length : 0;
  const totalEstornos = estornos.reduce((s,r) => s + Math.abs(Number(r.valor) || 0), 0);

  // Forma mais usada
  const formas = {};
  positivos.forEach(r => { formas[r.forma_pagamento] = (formas[r.forma_pagamento] || 0) + 1; });
  const formaTop = Object.entries(formas).sort((a,b) => b[1]-a[1])[0];
  const formaLbl = { pix: 'PIX', transferencia: 'Transferência', boleto: 'Boleto' };

  document.getElementById('kpi-rec-total').textContent = 'R$ ' + Math.round(totalRecebido).toLocaleString('pt-BR');
  document.getElementById('kpi-rec-total-sub').textContent = positivos.length + ' recebimento' + (positivos.length !== 1 ? 's' : '');
  document.getElementById('kpi-rec-ticket').textContent = 'R$ ' + Math.round(ticket).toLocaleString('pt-BR');
  document.getElementById('kpi-rec-forma').textContent = formaTop ? (formaLbl[formaTop[0]] || formaTop[0]) : '—';
  document.getElementById('kpi-rec-forma-sub').textContent = formaTop ? formaTop[1] + ' de ' + positivos.length : '—';
  document.getElementById('kpi-rec-estornos').textContent = estornos.length > 0 ? 'R$ ' + Math.round(totalEstornos).toLocaleString('pt-BR') : 'R$ 0';
  document.getElementById('kpi-rec-estornos-sub').textContent = estornos.length + ' estorno' + (estornos.length !== 1 ? 's' : '');
}

function renderListaRecebimentos() {
  const lista = document.getElementById('fin-lista-recebimentos');
  if (!lista) return;
  const busca = (document.getElementById('fin-rec-busca')?.value || '').trim().toLowerCase();

  let filt = _finRecebimentos;
  if (busca) filt = filt.filter(r => (r.cliente_nome || '').toLowerCase().includes(busca));
  // Filtro de forma de pagamento
  if (_finRecForma !== 'todas') {
    if (_finRecForma === 'estorno') {
      filt = filt.filter(r => r.forma_pagamento === 'estorno' || Number(r.valor) < 0);
    } else {
      filt = filt.filter(r => r.forma_pagamento === _finRecForma);
    }
  }

  if (filt.length === 0) {
    lista.innerHTML = '<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">Nenhum recebimento encontrado</div>';
    return;
  }

  const formaLbl = { pix: '⚡ PIX', transferencia: '🏦 Transf.', boleto: '📄 Boleto', estorno: '↩️ Estorno' };
  const formaCor = { pix: '#10b981', transferencia: '#3b82f6', boleto: '#f59e0b', estorno: '#ef4444' };

  lista.innerHTML = filt.map(r => {
    const dt = new Date(r.data_recebimento + 'T00:00:00');
    const dtFmt = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0') + '/' + dt.getFullYear();
    const isNeg = Number(r.valor) < 0;
    const valor = Math.abs(Number(r.valor) || 0);
    const liquido = Math.abs(Number(r.valor_liquido) || valor);
    const taxa = Math.abs(Number(r.taxa) || 0);
    const valorClass = isNeg ? 'negativo' : 'positivo';
    // Cards clicáveis: vão para a cobrança vinculada
    const cobOnclick = r.cobranca_id ? `onclick="openCobPanel(${r.cobranca_id})" style="cursor:pointer"` : '';
    return `
      <div class="fin-aj-row clicavel" ${cobOnclick} style="border-left-color:${formaCor[r.forma_pagamento] || '#94a3b8'}${r.cobranca_id ? ';cursor:pointer' : ''}" title="${r.cobranca_id ? 'Clique para ver a cobrança' : ''}">
        <span class="fin-aj-tipo-icon">${(formaLbl[r.forma_pagamento] || r.forma_pagamento).split(' ')[0]}</span>
        <div class="fin-aj-info">
          <div class="fin-aj-cliente">${escapeHtml(r.cliente_nome || '—')}</div>
          <div class="fin-aj-meta">
            <span><strong>${formaLbl[r.forma_pagamento] || r.forma_pagamento}</strong></span>
            <span>baixado por: ${escapeHtml(r.baixado_por || '—')}</span>
            ${taxa > 0 ? `<span>taxa: R$ ${taxa.toFixed(2).replace('.', ',')}</span>` : ''}
            ${r.obs ? `<span style="color:var(--muted)">• ${escapeHtml(r.obs)}</span>` : ''}
          </div>
        </div>
        <div style="text-align:right">
          <div class="fin-aj-valor ${valorClass}">${isNeg ? '-' : '+'} R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
          ${taxa > 0 ? `<div style="font-size:10px;color:var(--muted)">líq: R$ ${liquido.toFixed(2).replace('.', ',')}</div>` : ''}
        </div>
        <span class="fin-aj-data">${dtFmt}</span>
      </div>`;
  }).join('') + `<div style="padding:8px;text-align:center;font-size:11px;color:var(--muted)">${filt.length} recebimento${filt.length !== 1 ? 's' : ''}</div>`;
}

// ═══════════════════════════════════════
// PAINEL LATERAL DE COBRANÇA (drill-down)
// ═══════════════════════════════════════
async function openCobPanel(cobrancaId) {
  const c = _finCobrancas.find(x => x.id === cobrancaId);
  if (!c) return;

  const status = _statusVisual(c);
  const saldo = Number(c.valor_atual) - Number(c.valor_pago);
  const venc = new Date(c.data_vencimento + 'T00:00:00');
  const vencFmt = String(venc.getDate()).padStart(2,'0') + '/' + String(venc.getMonth()+1).padStart(2,'0') + '/' + venc.getFullYear();
  const emi = new Date(c.data_emissao + 'T00:00:00');
  const emiFmt = String(emi.getDate()).padStart(2,'0') + '/' + String(emi.getMonth()+1).padStart(2,'0') + '/' + emi.getFullYear();
  const dias = _diasParaVencer(c.data_vencimento);

  document.getElementById('cob-title').textContent = c.cliente_nome || '—';
  document.getElementById('cob-sub').textContent = `Cobrança #${c.id} · emitida ${emiFmt}`;

  // KPIs
  let kpiHtml = `<div class="side-kpi-grid">
    <div class="side-kpi"><div class="side-kpi-label">Valor total</div><div class="side-kpi-value">R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')}</div></div>
    <div class="side-kpi" style="border-left-color:#3b82f6"><div class="side-kpi-label">Pago</div><div class="side-kpi-value" style="color:#1e40af">R$ ${Math.round(c.valor_pago).toLocaleString('pt-BR')}</div></div>
    <div class="side-kpi" style="border-left-color:${saldo > 0 ? 'var(--vermelho)' : 'var(--verde-border)'}"><div class="side-kpi-label">Saldo</div><div class="side-kpi-value" style="color:${saldo > 0 ? 'var(--vermelho)' : 'var(--forest)'}">R$ ${Math.round(saldo).toLocaleString('pt-BR')}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Vencimento</div><div class="side-kpi-value" style="font-size:14px">${vencFmt}</div></div>
  </div>`;

  // Status
  kpiHtml += `<div style="text-align:center;margin-bottom:14px"><span class="fin-cob-status ${status}" style="font-size:11px;padding:4px 10px">${_statusLabel(status)}</span>`;
  if (status === 'atrasada' || status === 'parcial_atrasada') {
    kpiHtml += `<span style="color:var(--vermelho);font-weight:700;margin-left:8px;font-size:12px">${Math.abs(dias)} dias atrasada</span>`;
  } else if (dias === 0) {
    kpiHtml += `<span style="color:#9a6700;font-weight:700;margin-left:8px;font-size:12px">Vence hoje</span>`;
  }
  kpiHtml += `</div>`;

  // Buscar recebimentos
  let recebHtml = '';
  try {
    const { data: recs } = await _SB.from('recebimentos')
      .select('*')
      .eq('cobranca_id', cobrancaId)
      .order('data_recebimento', { ascending: false });
    if (recs && recs.length > 0) {
      const formaLbl = { pix: '⚡ PIX', transferencia: '🏦 Transf.', boleto: '📄 Boleto', estorno: '↩️ Estorno' };
      recebHtml = `<div class="cob-section-titulo">Recebimentos (${recs.length})</div>`;
      recs.forEach(r => {
        const dt = new Date(r.data_recebimento + 'T00:00:00');
        const dtFmt = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0') + '/' + dt.getFullYear();
        const isNeg = Number(r.valor) < 0;
        recebHtml += `<div class="cob-receb-row">
          <span style="font-size:14px">${(formaLbl[r.forma_pagamento] || r.forma_pagamento).split(' ')[0]}</span>
          <div>
            <div style="font-weight:600">${formaLbl[r.forma_pagamento] || r.forma_pagamento}</div>
            <div style="font-size:10px;color:var(--muted)">${dtFmt} · por ${escapeHtml(r.baixado_por || '—')}</div>
            ${r.obs ? `<div style="font-size:10px;color:var(--muted);margin-top:2px;font-style:italic">${escapeHtml(r.obs)}</div>` : ''}
          </div>
          <span style="font-weight:700;font-family:var(--font-mono);color:${isNeg ? 'var(--vermelho)' : 'var(--forest)'}">${isNeg ? '-' : '+'} R$ ${Math.abs(Number(r.valor)).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
        </div>`;
      });
    } else {
      recebHtml = '<div class="cob-section-titulo">Recebimentos</div><div style="padding:14px;text-align:center;color:var(--muted);font-size:12px">Nenhum recebimento ainda</div>';
    }
  } catch(e) { console.warn('openCobPanel recs:', e); }

  // Buscar ajustes
  let ajustesHtml = '';
  try {
    const { data: ajs } = await _SB.from('ajustes')
      .select('*')
      .eq('cobranca_id', cobrancaId)
      .order('data_ajuste', { ascending: false });
    if (ajs && ajs.length > 0) {
      ajustesHtml = `<div class="cob-section-titulo">Ajustes (${ajs.length})</div>`;
      ajs.forEach(a => {
        const lbl = _AJ_LABELS[a.tipo] || { emoji: '🔧', nome: a.tipo };
        const motivo = _MOTIVOS_LABELS[a.motivo] || a.motivo;
        const dt = new Date(a.data_ajuste + 'T00:00:00');
        const dtFmt = String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0');
        let valorStr = '';
        if (a.tipo === 'reentrega') valorStr = `+ ${a.cocos_extras} cocos`;
        else if (a.valor != null) valorStr = `${Number(a.valor) < 0 ? '-' : '+'} R$ ${Math.abs(Number(a.valor)).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
        ajustesHtml += `<div class="cob-receb-row">
          <span style="font-size:14px">${lbl.emoji}</span>
          <div>
            <div style="font-weight:600">${lbl.nome} · ${motivo}</div>
            <div style="font-size:10px;color:var(--muted)">${dtFmt} · por ${escapeHtml(a.criado_por || '—')}</div>
            ${a.obs ? `<div style="font-size:10px;color:var(--muted);margin-top:2px;font-style:italic">${escapeHtml(a.obs)}</div>` : ''}
          </div>
          <span style="font-weight:700;font-family:var(--font-mono);color:${Number(a.valor) < 0 ? 'var(--vermelho)' : 'var(--forest)'}">${valorStr}</span>
        </div>`;
      });
    }
  } catch(e) {}

  // Ações
  const podeBaixar = c.status !== 'pago' && c.status !== 'cancelado';
  const podeCancelar = c.status !== 'cancelado';
  let acoesHtml = `<div class="cob-acoes-grid">`;
  if (podeBaixar) acoesHtml += `<button class="principal acao-edicao" onclick="closeCobPanel();abrirModalBaixa(${c.id})">💸 Baixar pagamento</button>`;
  acoesHtml += `<button onclick="abrirWhatsCobranca(${c.id})">📱 WhatsApp</button>`;
  if (podeBaixar) acoesHtml += `<button class="acao-edicao" onclick="closeCobPanel();abrirAjusteCobranca(${c.id})">🔧 Ajuste</button>`;
  if (c.venda_id) acoesHtml += `<button onclick="closeCobPanel();abrirVendaDoFinanceiro(${c.venda_id})">✏️ Editar venda</button>`;
  if (podeCancelar) acoesHtml += `<button class="danger acao-edicao" onclick="closeCobPanel();cancelarCobranca(${c.id})">✕ Cancelar cobrança</button>`;
  acoesHtml += `</div>`;

  document.getElementById('cob-body').innerHTML = kpiHtml + recebHtml + ajustesHtml + acoesHtml;

  // Abrir
  document.getElementById('cob-overlay').classList.add('open');
  document.getElementById('cob-panel').classList.add('open');
}

function closeCobPanel() {
  document.getElementById('cob-overlay')?.classList.remove('open');
  document.getElementById('cob-panel')?.classList.remove('open');
}
