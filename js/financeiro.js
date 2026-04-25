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
