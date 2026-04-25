// ─────────── FINANCEIRO ───────────

let _finCobrancas = [];
let _finFiltroStatus = 'atrasada';
let _finCobrancaSel = null; // cobrança aberta no modal de baixa

async function initFinanceiro() {
  await carregarCobrancas();
  setFinTab(localStorage.getItem('fin_tab') || 'cobranca');
}

function setFinTab(tab) {
  document.querySelectorAll('.fin-tab').forEach(t => t.classList.toggle('ativo', t.dataset.fintab === tab));
  document.querySelectorAll('.fin-painel').forEach(p => p.classList.remove('ativo'));
  document.getElementById('fin-painel-' + tab)?.classList.add('ativo');
  localStorage.setItem('fin_tab', tab);
  if (tab === 'cobranca') renderPainelCobranca();
  if (tab === 'analise') renderPainelAnalise();
}

// ──────── PAINEL ANÁLISE ────────
let _finPeriodo = 'mes';

function setFinPeriodo(p) {
  _finPeriodo = p;
  document.querySelectorAll('.fin-periodo-btn').forEach(b => b.classList.toggle('ativo', b.dataset.periodo === p));
  renderPainelAnalise();
}

function _periodoIntervalo() {
  const hoje = new Date();
  const fim = new Date(hoje);
  let inicio;
  if (_finPeriodo === 'mes') {
    inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  } else if (_finPeriodo === '3m') {
    inicio = new Date(hoje); inicio.setMonth(inicio.getMonth() - 3);
  } else if (_finPeriodo === '6m') {
    inicio = new Date(hoje); inicio.setMonth(inicio.getMonth() - 6);
  } else if (_finPeriodo === 'ano') {
    inicio = new Date(hoje.getFullYear(), 0, 1);
  } else {
    inicio = new Date(2000, 0, 1);
  }
  return {
    inicio: inicio.toISOString().slice(0,10),
    fim: fim.toISOString().slice(0,10)
  };
}

async function renderPainelAnalise() {
  const intervalo = _periodoIntervalo();
  try {
    // Buscar vendas no período (excluindo EXCLUIDO)
    const { data: vendas, error: ve } = await _SB.from('vendas')
      .select('*')
      .gte('data', intervalo.inicio)
      .lte('data', intervalo.fim)
      .neq('status', 'EXCLUIDO');
    if (ve) throw ve;

    const vendasArr = vendas || [];
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
  vendas.forEach(v => {
    const cocos = (Number(v.qtde) || 0) + (Number(v.quebra_cocos) || 0);
    if (cocos > 0 && v.rpc_efetivo > 0) {
      receitaTotal += Number(v.rpc_efetivo) * cocos;
      cocosTotal += cocos;
    }
  });
  const rpcEfetivo = cocosTotal > 0 ? receitaTotal / cocosTotal : 0;

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

    // Prazo médio: dias entre emissão e pagamento
    let totalDias = 0, n = 0;
    pagas.forEach(c => {
      const e = new Date(c.data_emissao + 'T00:00:00');
      const p = new Date(c.data_pagamento + 'T00:00:00');
      const dias = Math.floor((p - e) / 86400000);
      if (dias >= 0 && dias < 1000) { totalDias += dias; n++; }
    });
    const prazoMedio = n > 0 ? totalDias / n : 0;

    // % no prazo
    const noPrazo = pagas.filter(c => c.data_pagamento && c.data_pagamento <= c.data_vencimento).length;
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
  // Status calculado: cobranças "aberto" ou "pago_parcial" com vencimento passado viram "atrasada"
  if (_isAtrasada(c)) return 'atrasada';
  return c.status;
}

function renderPainelCobranca() {
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
  document.querySelectorAll('.fin-filtro-btn').forEach(b => b.classList.toggle('ativo', b.dataset.status === s));
  renderListaCobrancas();
}

function renderListaCobrancas() {
  const lista = document.getElementById('fin-lista-cobrancas');
  if (!lista) return;
  const busca = (document.getElementById('fin-busca')?.value || '').trim().toLowerCase();

  let filt = _finCobrancas.filter(c => {
    if (busca && !(c.cliente_nome || '').toLowerCase().includes(busca)) return false;
    if (_finFiltroStatus === 'todas') return true;
    if (_finFiltroStatus === 'atrasada') return _isAtrasada(c);
    if (_finFiltroStatus === 'aberto') return c.status === 'aberto' && !_isAtrasada(c);
    return c.status === _finFiltroStatus;
  });

  // Atrasadas: mais antigas primeiro. Resto: vencimento mais próximo primeiro.
  filt.sort((a,b) => a.data_vencimento.localeCompare(b.data_vencimento));

  if (filt.length === 0) {
    lista.innerHTML = '<div style="padding:30px;text-align:center;color:var(--muted);font-size:13px">Nenhuma cobrança encontrada</div>';
    return;
  }

  lista.innerHTML = filt.map(c => {
    const status = _statusVisual(c);
    const dias = _diasParaVencer(c.data_vencimento);
    const saldo = Number(c.valor_atual) - Number(c.valor_pago);
    const venc = new Date(c.data_vencimento + 'T00:00:00');
    const vencFmt = String(venc.getDate()).padStart(2,'0') + '/' + String(venc.getMonth()+1).padStart(2,'0') + '/' + venc.getFullYear();

    let metaDias = '';
    if (status === 'atrasada') metaDias = `<span style="color:var(--vermelho);font-weight:800">${Math.abs(dias)} dias atrasada</span>`;
    else if (status === 'pago' || status === 'cancelado') metaDias = '';
    else if (dias === 0) metaDias = '<span style="color:#9a6700;font-weight:700">Vence hoje</span>';
    else if (dias > 0) metaDias = `<span>Vence em ${dias} dia${dias>1?'s':''}</span>`;

    const podeBaixar = status !== 'pago' && status !== 'cancelado';
    const acoes = `
      ${podeBaixar ? `<button class="fin-acao-btn principal acao-edicao" onclick="abrirModalBaixa(${c.id})" title="Baixar pagamento">💸</button>` : ''}
      <button class="fin-acao-btn" onclick="abrirWhatsCobranca(${c.id})" title="WhatsApp">📱</button>
      ${podeBaixar ? `<button class="fin-acao-btn acao-edicao" onclick="abrirAjusteCobranca(${c.id})" title="Ajuste">🔧</button>` : ''}
      <button class="fin-acao-btn" onclick="abrirVendaDoFinanceiro(${c.venda_id})" title="Editar venda">✏️</button>
    `;

    const valorPagoStr = Number(c.valor_pago) > 0
      ? `<div class="fin-cob-pago">pago: R$ ${Math.round(c.valor_pago).toLocaleString('pt-BR')}</div>`
      : '';
    const saldoStr = saldo > 0 && status !== 'cancelado'
      ? `<div class="fin-cob-saldo">saldo: R$ ${Math.round(saldo).toLocaleString('pt-BR')}</div>`
      : '';

    return `
      <div class="fin-cobranca ${status}">
        <div class="fin-cob-info">
          <div class="fin-cob-cliente">${escapeHtml(c.cliente_nome || '—')}</div>
          <div class="fin-cob-meta">
            <span>📅 vence ${vencFmt}</span>
            ${metaDias}
            <span class="fin-cob-status ${status}">${_statusLabel(status)}</span>
          </div>
        </div>
        <div class="fin-cob-valores">
          <div class="fin-cob-valor">R$ ${Math.round(c.valor_atual).toLocaleString('pt-BR')}</div>
          ${valorPagoStr}
          ${saldoStr}
        </div>
        <div class="fin-cob-acoes">${acoes}</div>
      </div>`;
  }).join('');
}

function _statusLabel(s) {
  const map = { atrasada:'ATRASADA', aberto:'EM ABERTO', pago_parcial:'PARCIAL', pago:'PAGO', cancelado:'CANCELADO' };
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
  document.getElementById('baixa-forma').value = 'pix';
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

async function confirmarBaixa() {
  if (!_finCobrancaSel) return;
  const c = _finCobrancaSel;
  const valor = _parseBaixaValor();
  const data = document.getElementById('baixa-data').value;
  const forma = document.getElementById('baixa-forma').value;
  const taxa = parseFloat(document.getElementById('baixa-taxa').value) || 0;
  const obs = document.getElementById('baixa-obs').value.trim();
  const erro = document.getElementById('baixa-erro');

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
    showToast('✓ Pagamento registrado');
    await carregarCobrancas();
    renderPainelCobranca();
  } catch(e) {
    erro.textContent = 'Erro: ' + (e.message || e);
    erro.style.display = 'block';
  }
}

// ── ACÕES SECUNDÁRIAS (placeholders por enquanto) ──
function abrirWhatsCobranca(cobrancaId) {
  const c = _finCobrancas.find(x => x.id === cobrancaId);
  if (!c) return;
  const saldo = Number(c.valor_atual) - Number(c.valor_pago);
  const venc = new Date(c.data_vencimento + 'T00:00:00');
  const vencFmt = String(venc.getDate()).padStart(2,'0') + '/' + String(venc.getMonth()+1).padStart(2,'0');
  const dias = _diasParaVencer(c.data_vencimento);
  let msg = `Olá! Cobrança Neofrut:\n\n`;
  msg += `Cliente: ${c.cliente_nome}\n`;
  msg += `Valor: R$ ${Math.round(saldo).toLocaleString('pt-BR')}\n`;
  msg += `Vencimento: ${vencFmt}\n`;
  if (dias < 0) msg += `\n⚠️ Em atraso há ${Math.abs(dias)} dia${Math.abs(dias)>1?'s':''}\n`;
  msg += `\nPedimos a gentileza do pagamento. Obrigado!`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
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
