// ─────────── PROGRAMAÇÃO DE CARGAS ───────────

// ── ESTADO ──
let _progSemana = [];
let _progSemanaInicio = null;
let _progClientes = [];
const SK_PROGRAMACAO = 'neofrut_programacao_v1';
const SK_PROG_CLIENTES = 'neofrut_prog_clientes_v1';
const CAP_DIA = 40000;
const LITROS_POR_COCO = 2.3;

// ── ESTADO MODAL ──
let _progClienteSel = null;
let _progDiaSel = null;
let _progVeiculoSel = null;
let _progAreaSel = null;
let _progEditandoId = null;
let _progProvidenciarCaminhao = false;

// ── UTILS DATAS (sem bug UTC) ──
function _progDataISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function _progDataCurta(d) {
  return String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');
}

function getSegundaDaSemana(data) {
  const d = data ? new Date(data) : new Date();
  d.setHours(0,0,0,0);
  const dow = d.getDay();
  const diff = (dow === 0) ? -6 : 1 - dow;
  d.setDate(d.getDate() + diff);
  return d;
}

function getSemanaLabel(seg) {
  const sab = new Date(seg);
  sab.setDate(seg.getDate() + 5);
  return `${_progDataCurta(seg)} – ${_progDataCurta(sab)}/${sab.getFullYear()}`;
}

function getDiasDaSemana(seg) {
  const dias = [];
  const nomes = ['Seg','Ter','Qua','Qui','Sex','Sáb'];
  for (let i = 0; i < 6; i++) {
    const d = new Date(seg);
    d.setDate(seg.getDate() + i);
    dias.push({ label: nomes[i], data: d, dataStr: _progDataISO(d), fmt: _progDataCurta(d) });
  }
  return dias;
}

// ── INIT ──
function initProgramacao() {
  _progSemanaInicio = getSegundaDaSemana();
  document.getElementById('prog-semana-label').textContent = getSemanaLabel(_progSemanaInicio);
  carregarProgramacao(_progSemanaInicio);
}

// ── CARREGAR DADOS ──
async function carregarProgramacao(segDate) {
  const seg = _progDataISO(segDate);
  const sab = new Date(segDate);
  sab.setDate(segDate.getDate() + 5);
  const sabStr = _progDataISO(sab);

  try {
    const { data, error } = await _SB
      .from('programacao')
      .select('*')
      .gte('dia_entrega', seg)
      .lte('dia_entrega', sabStr)
      .neq('status', 'cancelado')
      .order('dia_entrega', { ascending: true });
    if (error) throw error;
    _progSemana = data || [];
    localStorage.setItem(SK_PROGRAMACAO, JSON.stringify({ seg, data: _progSemana }));
  } catch(e) {
    const cache = JSON.parse(localStorage.getItem(SK_PROGRAMACAO) || '{}');
    if (cache.seg === seg) _progSemana = cache.data || [];
    console.warn('Programação offline:', e.message);
  }

  // Carregar clientes
  await carregarClientesProg();
  renderProgramacao();
}

async function carregarClientesProg() {
  try {
    const { data, error } = await _SB
      .from('clientes')
      .select('id,nome,uf,cidade,tipo,veiculo_padrao,rpc_historico,telefone')
      .eq('status', 'ativo')
      .order('nome');
    if (error) throw error;
    if (data && data.length > 0) {
      _progClientes = data;
      localStorage.setItem(SK_PROG_CLIENTES, JSON.stringify(data));
    }
  } catch(e) {
    _progClientes = JSON.parse(localStorage.getItem(SK_PROG_CLIENTES) || '[]');
  }
}

// ── NAVEGAÇÃO SEMANA ──
function navegarSemana(dir) {
  const nova = new Date(_progSemanaInicio);
  nova.setDate(nova.getDate() + dir * 7);
  _progSemanaInicio = nova;
  document.getElementById('prog-semana-label').textContent = getSemanaLabel(nova);
  carregarProgramacao(nova);
}

// ── RENDER PRINCIPAL ──
function renderProgramacao() {
  renderProgKPIs();
  renderProgAlertas();
  renderProgGrade();
}

// ── KPIs ──
function renderProgKPIs() {
  const totalCocos = _progSemana.reduce((s, c) => s + c.volume_cocos, 0);
  const totalReceita = _progSemana.reduce((s, c) => s + (c.volume_cocos * (c.valor_por_coco || 0)), 0);
  const semCaminhao = _progSemana.filter(c => c.providenciar_caminhao && c.caminhao_status === 'pendente' && c.status !== 'cancelado').length;
  const confirmadas = _progSemana.filter(c => c.status === 'confirmado').length;

  document.getElementById('prog-kpi-cocos').textContent = fmtNum(totalCocos);
  document.getElementById('prog-kpi-receita').textContent = 'R$ ' + fmtK(totalReceita);
  document.getElementById('prog-kpi-caminhao').textContent = semCaminhao;
  document.getElementById('prog-kpi-status').textContent = `${confirmadas} / ${_progSemana.length}`;
}

// ── ALERTAS ──
function renderProgAlertas() {
  const wrap = document.getElementById('prog-alertas');
  if (!wrap) return;
  wrap.innerHTML = '';

  // Cargas que precisam de caminhão
  const pendentes = _progSemana.filter(c => c.providenciar_caminhao && c.caminhao_status === 'pendente' && c.status !== 'cancelado');
  if (pendentes.length > 0) {
    const dias = getDiasDaSemana(_progSemanaInicio);
    const nomes = pendentes.map(c => {
      const dia = dias.find(d => d.dataStr === c.dia_entrega);
      return `${c.cliente_nome} (${dia ? dia.label : ''})`;
    }).join(' e ');
    wrap.innerHTML += `<div class="prog-alerta prog-alerta-erro">🚛 ${pendentes.length} carga${pendentes.length > 1 ? 's' : ''} sem caminhão — ${escapeHtml(nomes)}. Providenciar frete.</div>`;
  }

  // Dias sobrecarregados
  const dias = getDiasDaSemana(_progSemanaInicio);
  dias.forEach(dia => {
    const total = _progSemana.filter(c => c.dia_entrega === dia.dataStr).reduce((s, c) => s + c.volume_cocos, 0);
    if (total > CAP_DIA * 0.7) {
      wrap.innerHTML += `<div class="prog-alerta prog-alerta-aviso">⚠️ ${dia.label} com ${fmtNum(total)} cocos agendados — verifique disponibilidade antes de aceitar mais pedidos.</div>`;
    }
  });
}

// ── GRADE SEMANAL ──
function renderProgGrade() {
  const grade = document.getElementById('prog-grade');
  if (!grade) return;
  grade.innerHTML = '';

  const dias = getDiasDaSemana(_progSemanaInicio);

  dias.forEach(dia => {
    const col = document.createElement('div');
    col.className = 'prog-dia-col';

    const cargasDia = _progSemana
      .filter(c => c.dia_entrega === dia.dataStr)
      .sort((a, b) => (a.cliente_nome || '').localeCompare(b.cliente_nome || ''));

    const totalDia = cargasDia.reduce((s, c) => s + c.volume_cocos, 0);
    const pct = Math.min(100, totalDia / CAP_DIA * 100);
    const fillClass = pct >= 100 ? 'over' : pct >= 70 ? 'cheio' : '';

    // Header do dia
    const header = document.createElement('div');
    header.className = 'prog-dia-header';
    header.innerHTML = `
      <div class="prog-dia-nome">${dia.label}</div>
      <div class="prog-dia-data">${dia.fmt}</div>
      <div class="prog-dia-total">${fmtK(totalDia)} cocos</div>
      <div class="prog-dia-barra"><div class="prog-dia-fill ${fillClass}" style="width:${pct}%"></div></div>
    `;
    col.appendChild(header);

    // Cards de carga
    cargasDia.forEach(c => col.appendChild(renderProgCard(c)));

    // Botão adicionar
    const btnAdd = document.createElement('button');
    btnAdd.className = 'prog-btn-add';
    btnAdd.innerHTML = '<span>+</span> Adicionar carga';
    btnAdd.onclick = () => { abrirModalProg(); _progSelecionarDia(dia.dataStr); };
    col.appendChild(btnAdd);

    grade.appendChild(col);
  });
}

// ── CARD DE CARGA ──
function renderProgCard(c) {
  const card = document.createElement('div');
  card.className = `prog-card prog-card-${c.status}`;
  card.onclick = () => abrirModalProgEditar(c.id);

  const receita = c.valor_por_coco ? c.volume_cocos * c.valor_por_coco : null;
  const precisaCaminhao = c.providenciar_caminhao && c.caminhao_status === 'pendente';

  // Buscar UF/cidade do cliente
  const cli = _progClientes.find(x => x.id === c.cliente_id);
  const ufCidade = cli ? `${cli.uf} · ${cli.cidade}` : '';

  card.innerHTML = `
    <div class="prog-card-topo">
      <div>
        <div class="prog-card-cliente">${escapeHtml(c.cliente_nome)}</div>
        ${ufCidade ? `<div class="prog-card-uf">${escapeHtml(ufCidade)}</div>` : ''}
      </div>
      <span class="prog-st prog-st-${c.status}">
        ${c.status === 'confirmado' ? '✓' : c.status === 'entregue' ? '✓✓' : '?'}
      </span>
    </div>
    <div class="prog-card-info">
      <span class="prog-card-qtde">${fmtK(c.volume_cocos)}</span>
      <span class="prog-card-rpc">${c.valor_por_coco ? 'R$' + Number(c.valor_por_coco).toFixed(2) : 'fábrica'}</span>
      ${receita ? `<span class="prog-card-receita">${fmtK(receita)}</span>` : ''}
    </div>
    <div class="prog-card-badges">
      ${c.tipo_veiculo ? `<span class="prog-badge prog-badge-veiculo">${escapeHtml(c.tipo_veiculo)}</span>` : ''}
      ${c.area ? `<span class="prog-badge prog-badge-area">${escapeHtml(c.area)}</span>` : ''}
      ${precisaCaminhao ? '<span class="prog-badge prog-badge-sem-caminhao">🚛 !</span>' : ''}
      ${c.providenciar_caminhao && c.caminhao_status === 'confirmado' ? '<span class="prog-badge prog-badge-caminhao-ok">🚛 ✓</span>' : ''}
    </div>
    ${c.obs ? `<div class="prog-card-obs">${escapeHtml(c.obs)}</div>` : ''}
  `;
  return card;
}

// ── MODAL: ABRIR NOVA CARGA ──
function abrirModalProg() {
  _progEditandoId = null;
  _progClienteSel = null;
  _progDiaSel = null;
  _progVeiculoSel = null;
  _progAreaSel = null;
  _progProvidenciarCaminhao = false;

  document.getElementById('prog-modal-titulo').textContent = '+ Nova Carga';
  document.getElementById('prog-inp-cliente').value = '';
  document.getElementById('prog-inp-qtde').value = '';
  document.getElementById('prog-inp-valor').value = '';
  document.getElementById('prog-inp-obs').value = '';
  document.getElementById('prog-inp-obs').style.display = 'none';
  document.getElementById('prog-inp-placa').value = '';
  document.getElementById('prog-receita-preview').style.display = 'none';
  document.getElementById('prog-btn-salvar').textContent = '✓ Agendar carga';
  // Esconder botões de ação de edição
  document.getElementById('prog-acoes-editar').style.display = 'none';

  _progRenderDiasBtns();
  _progRenderListaClientes('');
  _progResetVeiculoBtns();
  _progResetAreaBtns();
  _progResetCaminhaoBtns();

  openModal('prog-modal-overlay');
}

// ── MODAL: ABRIR EDITAR CARGA ──
function abrirModalProgEditar(id) {
  const c = _progSemana.find(x => x.id === id);
  if (!c) return;
  _progEditandoId = id;

  document.getElementById('prog-modal-titulo').textContent = 'Editar Carga';
  document.getElementById('prog-btn-salvar').textContent = '✓ Salvar alterações';

  // Preencher campos
  const cli = _progClientes.find(x => x.id === c.cliente_id);
  _progClienteSel = cli || { id: c.cliente_id, nome: c.cliente_nome };
  document.getElementById('prog-inp-cliente').value = cli ? `${cli.nome} — ${cli.cidade}/${cli.uf}` : c.cliente_nome;

  _progDiaSel = c.dia_entrega;
  _progRenderDiasBtns();

  _progVeiculoSel = c.tipo_veiculo;
  _progResetVeiculoBtns();
  if (c.tipo_veiculo) {
    document.querySelectorAll('.prog-veiculo-btn').forEach(b => {
      if (b.dataset.veiculo === c.tipo_veiculo) b.classList.add('sel');
    });
  }

  document.getElementById('prog-inp-qtde').value = c.volume_cocos || '';
  document.getElementById('prog-inp-valor').value = c.valor_por_coco || '';

  _progAreaSel = c.area;
  _progResetAreaBtns();
  if (c.area) {
    document.querySelectorAll('.prog-area-btn').forEach(b => {
      if (b.dataset.area === c.area) b.classList.add('sel');
    });
  }

  _progProvidenciarCaminhao = !!c.providenciar_caminhao;
  _progResetCaminhaoBtns();

  document.getElementById('prog-inp-placa').value = c.placa || '';

  if (c.obs) {
    document.getElementById('prog-inp-obs').value = c.obs;
    document.getElementById('prog-inp-obs').style.display = 'block';
  } else {
    document.getElementById('prog-inp-obs').value = '';
    document.getElementById('prog-inp-obs').style.display = 'none';
  }

  _progAtualizarPreview();

  // Mostrar botões de ação
  const acoes = document.getElementById('prog-acoes-editar');
  acoes.style.display = 'flex';
  // Botão status
  const btnStatus = document.getElementById('prog-btn-status');
  if (c.status === 'pendente') {
    btnStatus.textContent = '✓ Confirmar carga';
    btnStatus.onclick = () => _progAtualizarStatus(id, 'confirmado');
  } else {
    btnStatus.textContent = '↩ Voltar para pendente';
    btnStatus.onclick = () => _progAtualizarStatus(id, 'pendente');
  }

  openModal('prog-modal-overlay');
}

// ── MODAL: HELPERS ──
function _progRenderDiasBtns() {
  const wrap = document.getElementById('prog-dias-btns');
  wrap.innerHTML = '';
  const dias = getDiasDaSemana(_progSemanaInicio);
  dias.forEach(dia => {
    const total = _progSemana.filter(c => c.dia_entrega === dia.dataStr).reduce((s, c) => s + c.volume_cocos, 0);
    const cheio = total / CAP_DIA >= 0.7;
    const btn = document.createElement('button');
    btn.className = `prog-dia-btn${cheio ? ' cheio' : ''}${_progDiaSel === dia.dataStr ? ' sel' : ''}`;
    btn.innerHTML = `<div>${dia.label}</div><div style="font-size:8px;margin-top:2px">${fmtK(total)}</div>`;
    btn.onclick = () => _progSelecionarDia(dia.dataStr);
    wrap.appendChild(btn);
  });
}

function _progSelecionarDia(dataStr) {
  _progDiaSel = dataStr;
  _progRenderDiasBtns();
}

function _progRenderListaClientes(q) {
  const lista = document.getElementById('prog-lista-clientes');
  const filtrados = _progClientes.filter(c =>
    (c.nome || '').toLowerCase().includes(q.toLowerCase()) ||
    (c.cidade || '').toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8);
  lista.innerHTML = '';
  filtrados.forEach(c => {
    const item = document.createElement('div');
    item.className = 'prog-cliente-item';
    item.innerHTML = `
      <div>
        <div class="prog-cliente-item-nome">${escapeHtml(c.nome)}</div>
        <div class="prog-cliente-item-sub">${escapeHtml(c.cidade || '')} · ${c.tipo === 'fabrica' ? '🏭 Fábrica' : '🛒 Mesa'}</div>
      </div>
      <span class="prog-cliente-item-uf">${escapeHtml(c.uf || '')}</span>
    `;
    item.onclick = () => _progSelecionarCliente(c);
    lista.appendChild(item);
  });
}

function _progSelecionarCliente(c) {
  _progClienteSel = c;
  document.getElementById('prog-inp-cliente').value = `${c.nome} — ${c.cidade || ''}/${c.uf || ''}`;
  document.getElementById('prog-lista-clientes').classList.remove('open');

  // Auto-preenchimento
  if (c.veiculo_padrao) {
    _progVeiculoSel = c.veiculo_padrao;
    _progResetVeiculoBtns();
    document.querySelectorAll('.prog-veiculo-btn').forEach(b => {
      if (b.dataset.veiculo === c.veiculo_padrao) b.classList.add('sel');
    });
    // Sugerir qtde
    const sugestao = { truck: 8500, bitruck: 10500, carreta: 16000 };
    if (!document.getElementById('prog-inp-qtde').value) {
      document.getElementById('prog-inp-qtde').value = sugestao[c.veiculo_padrao] || '';
    }
  }
  if (c.rpc_historico && !document.getElementById('prog-inp-valor').value) {
    document.getElementById('prog-inp-valor').value = Number(c.rpc_historico).toFixed(2);
  }
  _progAtualizarPreview();
}

function _progResetVeiculoBtns() {
  document.querySelectorAll('.prog-veiculo-btn').forEach(b => b.classList.remove('sel'));
}
function progSelVeiculo(key, el) {
  _progVeiculoSel = key;
  _progResetVeiculoBtns();
  el.classList.add('sel');
  const sugestao = { truck: 8500, bitruck: 10500, carreta: 16000 };
  if (!document.getElementById('prog-inp-qtde').value) {
    document.getElementById('prog-inp-qtde').value = sugestao[key] || '';
  }
  _progAtualizarPreview();
}

function _progResetAreaBtns() {
  document.querySelectorAll('.prog-area-btn').forEach(b => b.classList.remove('sel'));
}
function progSelArea(key, el) {
  _progAreaSel = key;
  _progResetAreaBtns();
  el.classList.add('sel');
}

function _progResetCaminhaoBtns() {
  const btnSim = document.getElementById('prog-caminhao-sim');
  const btnNao = document.getElementById('prog-caminhao-nao');
  btnSim.classList.toggle('sel', _progProvidenciarCaminhao === true);
  btnNao.classList.toggle('sel', _progProvidenciarCaminhao === false);
}
function progSelCaminhao(val) {
  _progProvidenciarCaminhao = val;
  _progResetCaminhaoBtns();
}

function _progAtualizarPreview() {
  const qtde = parseFloat(document.getElementById('prog-inp-qtde').value) || 0;
  const valor = parseFloat(document.getElementById('prog-inp-valor').value) || 0;
  const preview = document.getElementById('prog-receita-preview');
  if (qtde === 0 && valor === 0) { preview.style.display = 'none'; return; }
  preview.style.display = 'block';
  const litros = Math.round(qtde / LITROS_POR_COCO);
  const receita = qtde * valor;
  document.getElementById('prog-prev-cocos').textContent = fmtNum(qtde) + ' cocos';
  document.getElementById('prog-prev-litros').textContent = fmtNum(litros) + ' L';
  document.getElementById('prog-prev-receita').textContent = valor > 0 ? fmtR(receita) : '—';
  document.getElementById('prog-prev-rpc').textContent = valor > 0 ? 'R$ ' + valor.toFixed(2) + '/coco' : '—';
}

function progToggleObs() {
  const el = document.getElementById('prog-inp-obs');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (el.style.display === 'block') el.focus();
}

function sugerirVeiculo(qtde) {
  if (qtde <= 9000) return 'truck';
  if (qtde <= 11000) return 'bitruck';
  return 'carreta';
}

// ── SALVAR CARGA ──
async function salvarProgCarga() {
  if (!_progClienteSel) { showToast('Selecione um cliente'); return; }
  if (!_progDiaSel) { showToast('Selecione o dia'); return; }
  const qtde = parseInt(document.getElementById('prog-inp-qtde').value);
  if (!qtde || qtde <= 0) { showToast('Informe a quantidade'); return; }

  const valor = parseFloat(document.getElementById('prog-inp-valor').value) || null;
  const obs = document.getElementById('prog-inp-obs').value.trim() || null;
  const placa = document.getElementById('prog-inp-placa').value.trim() || null;

  const payload = {
    dia_entrega: _progDiaSel,
    semana_inicio: _progDataISO(getSegundaDaSemana(new Date(_progDiaSel + 'T12:00:00'))),
    cliente_id: _progClienteSel.id,
    cliente_nome: _progClienteSel.nome,
    volume_cocos: qtde,
    valor_por_coco: valor,
    tipo_veiculo: _progVeiculoSel,
    area: _progAreaSel,
    providenciar_caminhao: _progProvidenciarCaminhao,
    caminhao_status: _progProvidenciarCaminhao ? 'pendente' : null,
    placa: placa,
    obs: obs,
    updated_at: new Date().toISOString()
  };

  try {
    if (_progEditandoId) {
      // UPDATE
      const { error } = await _SB.from('programacao').update(payload).eq('id', _progEditandoId);
      if (error) throw error;
      showToast('Carga atualizada');
    } else {
      // INSERT
      payload.status = 'pendente';
      // Pegar email do usuário logado
      const { data: { session } } = await _SB.auth.getSession();
      payload.agendado_por = session?.user?.email || 'desconhecido';
      const { error } = await _SB.from('programacao').insert(payload);
      if (error) throw error;
      showToast('Carga agendada');
    }
    closeModal('prog-modal-overlay');
    await carregarProgramacao(_progSemanaInicio);
  } catch(e) {
    console.error('Erro ao salvar carga:', e);
    showToast('Erro ao salvar: ' + (e.message || e));
  }
}

// ── ATUALIZAR STATUS ──
async function _progAtualizarStatus(id, novoStatus) {
  try {
    const { error } = await _SB.from('programacao')
      .update({ status: novoStatus, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    closeModal('prog-modal-overlay');
    showToast(novoStatus === 'confirmado' ? 'Carga confirmada' : 'Status atualizado');
    await carregarProgramacao(_progSemanaInicio);
  } catch(e) {
    showToast('Erro: ' + (e.message || e));
  }
}

// ── CANCELAR CARGA ──
async function progCancelarCarga() {
  if (!_progEditandoId) return;
  if (!confirm('Cancelar esta carga?')) return;
  try {
    const { error } = await _SB.from('programacao')
      .update({ status: 'cancelado', updated_at: new Date().toISOString() })
      .eq('id', _progEditandoId);
    if (error) throw error;
    closeModal('prog-modal-overlay');
    showToast('Carga cancelada');
    await carregarProgramacao(_progSemanaInicio);
  } catch(e) {
    showToast('Erro: ' + (e.message || e));
  }
}

// ── CONFIRMAR CAMINHÃO ──
async function progConfirmarCaminhao() {
  if (!_progEditandoId) return;
  const placa = document.getElementById('prog-inp-placa').value.trim();
  try {
    const { error } = await _SB.from('programacao')
      .update({ caminhao_status: 'confirmado', placa: placa || null, updated_at: new Date().toISOString() })
      .eq('id', _progEditandoId);
    if (error) throw error;
    closeModal('prog-modal-overlay');
    showToast('Caminhão confirmado');
    await carregarProgramacao(_progSemanaInicio);
  } catch(e) {
    showToast('Erro: ' + (e.message || e));
  }
}

// ── WHATSAPP ──
function progEnviarWhatsApp() {
  if (!_progEditandoId) return;
  const c = _progSemana.find(x => x.id === _progEditandoId);
  if (!c) return;
  const cli = _progClientes.find(x => x.id === c.cliente_id);
  const tel = cli?.telefone;

  const dia = new Date(c.dia_entrega + 'T12:00:00');
  const nomeDia = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][dia.getDay()];
  const dataBr = _progDataCurta(dia);

  let msg = `✅ *Neofrut — Confirmação de Carga*\n\n` +
    `📅 *${nomeDia}, ${dataBr}*\n` +
    `🥥 ${fmtNum(c.volume_cocos)} cocos`;
  if (c.valor_por_coco) msg += ` · R$${Number(c.valor_por_coco).toFixed(2)}/coco`;
  msg += `\n🚚 ${c.tipo_veiculo || '—'}`;
  if (c.area) msg += `\n📍 Área: ${c.area}`;
  if (c.obs) msg += `\n\n📝 ${c.obs}`;

  const encoded = encodeURIComponent(msg);
  if (tel) {
    const fone = tel.replace(/\D/g, '');
    window.open(`https://wa.me/55${fone}?text=${encoded}`, '_blank');
  } else {
    // Copiar mensagem
    navigator.clipboard.writeText(msg).then(() => showToast('Mensagem copiada'));
  }
}

// ── FECHAR LISTA CLIENTES AO CLICAR FORA ──
document.addEventListener('click', e => {
  if (!e.target.closest('.prog-cliente-search')) {
    document.getElementById('prog-lista-clientes')?.classList.remove('open');
  }
});
