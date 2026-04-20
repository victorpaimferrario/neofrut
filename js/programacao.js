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
let _progFreteMode = 'total'; // 'total' ou 'percoco'

// ── DRAG & DROP ──
let _progDragId = null;

// ── FERIADOS NACIONAIS + SERGIPE ──
function _progPascoa(ano) {
  // Validação: algoritmo Meeus/Jones/Butcher só vale para o calendário gregoriano
  ano = parseInt(ano);
  if (!Number.isFinite(ano) || ano < 1583 || ano > 9999) {
    console.warn('_progPascoa: ano inválido, usando ano atual:', ano);
    ano = new Date().getFullYear();
  }
  const a=ano%19, b=Math.floor(ano/100), c=ano%100;
  const d=Math.floor(b/4), e=b%4, f=Math.floor((b+8)/25);
  const g=Math.floor((b-f+1)/3), h=(19*a+b-d-g+15)%30;
  const i=Math.floor(c/4), k=c%4, l=(32+2*e+2*i-h-k)%7;
  const m=Math.floor((a+11*h+22*l)/451);
  const mes=Math.floor((h+l-7*m+114)/31), dia=((h+l-7*m+114)%31)+1;
  return new Date(ano, mes-1, dia);
}

function _progFeriadosDoAno(ano) {
  const pascoa = _progPascoa(ano);
  const carnaval = new Date(pascoa); carnaval.setDate(pascoa.getDate()-47);
  const sextaSanta = new Date(pascoa); sextaSanta.setDate(pascoa.getDate()-2);
  const corpusChristi = new Date(pascoa); corpusChristi.setDate(pascoa.getDate()+60);

  // Mapa: dataISO → nome
  const mapa = {
    [`${ano}-01-01`]: 'Confraternização Universal',
    [`${ano}-04-21`]: 'Tiradentes',
    [`${ano}-05-01`]: 'Dia do Trabalho',
    [`${ano}-09-07`]: 'Independência do Brasil',
    [`${ano}-10-12`]: 'N. S. Aparecida',
    [`${ano}-11-02`]: 'Finados',
    [`${ano}-11-15`]: 'Proclamação da República',
    [`${ano}-12-25`]: 'Natal',
    [`${ano}-07-08`]: 'Emancipação de Sergipe',
    [_progDataISO(carnaval)]: 'Carnaval',
    [_progDataISO(sextaSanta)]: 'Sexta-feira Santa',
    [_progDataISO(corpusChristi)]: 'Corpus Christi',
  };
  return mapa;
}

let _progFeriadosCache = {};
function _progGetFeriados(ano) {
  if (!_progFeriadosCache[ano]) _progFeriadosCache[ano] = _progFeriadosDoAno(ano);
  return _progFeriadosCache[ano];
}
function _progIsFeriado(dataStr) {
  return !!_progGetFeriados(parseInt(dataStr.slice(0,4)))[dataStr];
}
function _progNomeFeriado(dataStr) {
  return _progGetFeriados(parseInt(dataStr.slice(0,4)))[dataStr] || 'Feriado';
}

// ── UTILS DATAS (sem bug UTC) ──
function _progDataISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function _progDataCurta(d) {
  return String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');
}
function _progHoje() {
  const d = new Date();
  return _progDataISO(d);
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

// ── VALOR COM VÍRGULA (3+ dígitos) ──
function _progFormatValor(digits) {
  if (!digits) return '';
  if (digits.length >= 3) return digits.slice(0, -2) + ',' + digits.slice(-2);
  return digits;
}
function _progParseValor(str) {
  const digits = (str || '').replace(/\D/g, '');
  if (!digits) return 0;
  if (digits.length >= 3) return parseInt(digits.slice(0, -2)) + parseInt(digits.slice(-2)) / 100;
  return parseInt(digits);
}
function _progValorToDigits(n) {
  if (n == null || n === 0) return '';
  const s = Number(n).toFixed(2);
  return s.replace('.', '');
}
function _progOnValorInput(el) {
  const digits = el.value.replace(/\D/g, '');
  el.value = _progFormatValor(digits);
  // O input SEMPRE contém o valor BRUTO digitado pelo usuário.
  // O líquido (após dedução do frete) é exibido apenas na nota e usado em _progGetValor.
  el.dataset.digits = digits;
  el.dataset.brutoDigits = digits;
  _progAplicarDeducaoFrete();
  _progAtualizarPreview();
}
// Retorna o valor LÍQUIDO por coco (bruto - frete/coco - icms/coco - seguro/coco). Usado em preview e ao salvar.
function _progGetValor() {
  const el = document.getElementById('prog-inp-valor');
  const bruto = _progParseValor(el.dataset.brutoDigits || el.dataset.digits || el.value);
  if (!bruto) return 0;
  const qtde = parseFloat(document.getElementById('prog-inp-qtde').value) || 0;
  const freteEl = document.getElementById('prog-inp-frete');
  const freteVal = freteEl ? _progParseValor(freteEl.dataset.digits || '') : 0;
  let fretePorCoco = 0;
  if (freteVal) {
    if (_progFreteMode === 'percoco') {
      fretePorCoco = freteVal;
    } else {
      fretePorCoco = qtde > 0 ? freteVal / qtde : 0;
    }
  }
  // Custos extras (ICMS + seguro) divididos por qtde
  const extras = _progGetCustosExtras();
  const extrasPorCoco = (extras > 0 && qtde > 0) ? extras / qtde : 0;
  return Math.max(0, bruto - fretePorCoco - extrasPorCoco);
}
// Retorna o BRUTO digitado (sem dedução). Usado para decidir UI (mostrar campo frete, etc).
function _progGetValorBruto() {
  const el = document.getElementById('prog-inp-valor');
  return _progParseValor(el.dataset.brutoDigits || el.dataset.digits || el.value);
}

// ── FRETE HELPERS ──
function _progOnFreteInput(el) {
  const digits = el.value.replace(/\D/g, '');
  el.value = _progFormatValor(digits);
  el.dataset.digits = digits;
  _progAplicarDeducaoFrete();
  _progAtualizarPreview();
}
function _progGetFreteInput() {
  const el = document.getElementById('prog-inp-frete');
  if (!el) return 0;
  return _progParseValor(el.dataset.digits || el.value);
}
function _progCalcFreteTotal() {
  const val = _progGetFreteInput();
  if (!val) return 0;
  if (_progFreteMode === 'percoco') {
    const qtde = parseFloat(document.getElementById('prog-inp-qtde').value) || 0;
    return val * qtde;
  }
  return val;
}
function _progSetFreteMode(mode) {
  if (mode !== 'total' && mode !== 'percoco') return;
  _progFreteMode = mode;
  const unit = document.getElementById('prog-frete-unit');
  if (unit) unit.textContent = mode === 'total' ? 'R$ total' : 'R$/coco';
  const btnPc = document.getElementById('prog-ft-percoco');
  const btnTot = document.getElementById('prog-ft-total');
  if (btnPc) btnPc.classList.toggle('ativo', mode === 'percoco');
  if (btnTot) btnTot.classList.toggle('ativo', mode === 'total');
  _progAplicarDeducaoFrete();
  _progAtualizarPreview();
}
function _progToggleFreteMode() {
  _progSetFreteMode(_progFreteMode === 'total' ? 'percoco' : 'total');
}

// ── ICMS + SEGURO HELPERS ──
function _progOnIcmsInput(el) {
  const digits = el.value.replace(/\D/g, '');
  el.value = _progFormatValor(digits);
  el.dataset.digits = digits;
  _progAplicarDeducaoFrete();
  _progAtualizarPreview();
}
function _progOnSeguroInput(el) {
  const digits = el.value.replace(/\D/g, '');
  el.value = _progFormatValor(digits);
  el.dataset.digits = digits;
  el.dataset.manual = el.value ? '1' : '';
  _progAplicarDeducaoFrete();
  _progAtualizarPreview();
}
// Helper: detecta se há frete informado (valor digitado > 0), independente de qtde.
// Usado para decidir se ICMS/Seguro devem existir — evita bug no modo percoco
// quando qtde=0 faz _progCalcFreteTotal() retornar 0 erroneamente.
function _progTemFrete() {
  return _progGetFreteInput() > 0;
}
function _progGetIcms() {
  // ICMS só existe quando há frete informado
  if (!_progTemFrete()) return 0;
  const el = document.getElementById('prog-inp-icms');
  if (!el) return 0;
  return _progParseValor(el.dataset.digits || el.value);
}
function _progGetSeguro() {
  // Seguro só existe quando há frete informado
  if (!_progTemFrete()) return 0;
  const el = document.getElementById('prog-inp-seguro');
  if (!el) return 0;
  return _progParseValor(el.dataset.digits || el.value);
}
function _progAutoSeguro() {
  const el = document.getElementById('prog-inp-seguro');
  if (!el || el.dataset.manual === '1') return;
  const freteTotal = _progCalcFreteTotal();
  // Sem frete digitado → sem seguro (limpa valor)
  if (!_progTemFrete()) {
    el.value = ''; el.dataset.digits = '';
    const nota = document.getElementById('prog-seguro-nota');
    if (nota) nota.textContent = '';
    return;
  }
  // Com frete mas sem qtde ainda: mantém valor (não auto-calcula, aguarda qtde)
  if (freteTotal <= 0) {
    const nota = document.getElementById('prog-seguro-nota');
    if (nota) nota.textContent = 'Preencha a quantidade para calcular o seguro';
    return;
  }
  const qtde = parseFloat(document.getElementById('prog-inp-qtde').value) || 0;
  const bruto = _progGetValorBruto();
  const baseNF = (bruto * qtde) + freteTotal;
  const seg = baseNF * 0.007;
  if (seg > 0) {
    const digits = _progValorToDigits(seg);
    el.dataset.digits = digits;
    el.value = _progFormatValor(digits);
  } else {
    el.value = '';
    el.dataset.digits = '';
  }
  const nota = document.getElementById('prog-seguro-nota');
  if (nota) nota.textContent = seg > 0 ? '0,07% × R$ ' + Math.round(baseNF).toLocaleString('pt-BR') + ' = R$ ' + seg.toFixed(2).replace('.', ',') : '';
}
// Retorna total de custos extras (ICMS + seguro) — para deduzir do líquido
function _progGetCustosExtras() {
  return _progGetIcms() + _progGetSeguro();
}

// Auto-dedução: o input do valor SEMPRE mostra o BRUTO. A nota abaixo
// mostra o cálculo do líquido (bruto − frete/coco − icms/coco − seguro/coco).
// _progGetValor retorna o líquido para preview/save. Se o frete for limpo, a nota some.
function _progAplicarDeducaoFrete() {
  const valorEl = document.getElementById('prog-inp-valor');
  const freteEl = document.getElementById('prog-inp-frete');
  const notaEl = document.getElementById('prog-valor-nota');
  if (!valorEl || !freteEl || !notaEl) return;

  const bruto = _progParseValor(valorEl.dataset.brutoDigits || valorEl.dataset.digits || '');
  const freteVal = _progParseValor(freteEl.dataset.digits || '');

  // Sem bruto ou sem frete: oculta nota
  if (bruto <= 0 || freteVal <= 0) {
    notaEl.style.display = 'none';
    notaEl.textContent = '';
    return;
  }

  // Calcular frete por coco conforme modo
  let fretePorCoco = 0;
  let avisoSemQtde = false;
  if (_progFreteMode === 'percoco') {
    fretePorCoco = freteVal;
  } else {
    const qtde = parseFloat(document.getElementById('prog-inp-qtde').value) || 0;
    if (qtde > 0) {
      fretePorCoco = freteVal / qtde;
    } else {
      avisoSemQtde = true;
    }
  }

  // Modo 'total' sem qtde: mostra aviso explicativo em vez de silêncio
  if (avisoSemQtde) {
    notaEl.style.display = 'block';
    notaEl.innerHTML = '⚠ Informe a quantidade de cocos para calcular o líquido (frete total ÷ qtde)';
    return;
  }

  if (fretePorCoco <= 0 && _progGetCustosExtras() <= 0) {
    notaEl.style.display = 'none';
    notaEl.textContent = '';
    return;
  }

  const qtdeN = parseFloat(document.getElementById('prog-inp-qtde').value) || 0;
  const extras = _progGetCustosExtras();
  const extrasPorCoco = (extras > 0 && qtdeN > 0) ? extras / qtdeN : 0;
  const liquido = Math.max(0, bruto - fretePorCoco - extrasPorCoco);
  const fmt = (n) => n.toFixed(2).replace('.', ',');
  let partes = 'Bruto R$ ' + fmt(bruto);
  if (fretePorCoco > 0) partes += ' − frete R$ ' + fmt(fretePorCoco);
  if (extrasPorCoco > 0) partes += ' − custos R$ ' + fmt(extrasPorCoco);
  notaEl.style.display = 'block';
  notaEl.innerHTML = '🔻 ' + partes + '/coco = <strong>R$ ' + fmt(liquido) + '/coco líquido</strong>';
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

  await carregarClientesProg();
  renderProgramacao();
}

async function carregarClientesProg() {
  try {
    const { data, error } = await _SB
      .from('clientes')
      .select('id,nome,uf,cidade,tipo,veiculo_padrao,rpc_historico,telefone,litros_por_coco')
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
  const totalReceitaCoco = _progSemana.reduce((s, c) => s + (c.volume_cocos * (c.valor_por_coco || 0)), 0);
  const semCaminhao = _progSemana.filter(c => c.providenciar_caminhao && c.caminhao_status === 'pendente' && c.status !== 'cancelado').length;
  const confirmadas = _progSemana.filter(c => c.status === 'confirmado' || c.status === 'entregue').length;

  document.getElementById('prog-kpi-cocos').textContent = fmtNum(totalCocos);
  document.getElementById('prog-kpi-receita').textContent = 'R$ ' + fmtNum(Math.round(totalReceitaCoco));
  document.getElementById('prog-kpi-caminhao').textContent = semCaminhao;
  document.getElementById('prog-kpi-status').textContent = `${confirmadas} / ${_progSemana.length}`;
}

// ── ALERTAS ──
function renderProgAlertas() {
  const wrap = document.getElementById('prog-alertas');
  if (!wrap) return;
  wrap.innerHTML = '';

  const pendentes = _progSemana.filter(c => c.providenciar_caminhao && c.caminhao_status === 'pendente' && c.status !== 'cancelado');
  if (pendentes.length > 0) {
    const dias = getDiasDaSemana(_progSemanaInicio);
    const nomes = pendentes.map(c => {
      const dia = dias.find(d => d.dataStr === c.dia_entrega);
      return `${c.cliente_nome} (${dia ? dia.label : ''})`;
    }).join(' e ');
    wrap.innerHTML += `<div class="prog-alerta prog-alerta-erro">🚛 ${pendentes.length} carga${pendentes.length > 1 ? 's' : ''} sem caminhão — ${escapeHtml(nomes)}. Providenciar frete.</div>`;
  }

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
  const hoje = _progHoje();

  dias.forEach(dia => {
    const col = document.createElement('div');
    col.className = 'prog-dia-col';
    col.dataset.data = dia.dataStr;

    // Drag & drop: aceitar cards
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('prog-drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('prog-drag-over'));
    col.addEventListener('drop', e => { e.preventDefault(); col.classList.remove('prog-drag-over'); _progDropCard(dia.dataStr); });

    const cargasDia = _progSemana
      .filter(c => c.dia_entrega === dia.dataStr)
      .sort((a, b) => (a.cliente_nome || '').localeCompare(b.cliente_nome || ''));

    const totalDia = cargasDia.reduce((s, c) => s + c.volume_cocos, 0);
    const pct = Math.min(100, totalDia / CAP_DIA * 100);
    const fillClass = pct >= 100 ? 'over' : pct >= 70 ? 'cheio' : '';
    const isHoje = dia.dataStr === hoje;
    const feriado = _progIsFeriado(dia.dataStr);
    const isSab = dia.label === 'Sáb';

    const header = document.createElement('div');
    header.className = 'prog-dia-header' + (isHoje ? ' prog-dia-hoje' : '') + (feriado ? ' prog-dia-feriado' : '') + (isSab && !feriado ? ' prog-dia-sabado' : '');
    header.innerHTML = `
      <div class="prog-dia-nome">${dia.label}${isHoje ? ' <span class="prog-hoje-badge">HOJE</span>' : ''}${feriado ? ' <span class="prog-feriado-badge">FERIADO</span>' : ''}</div>
      <div class="prog-dia-data">${dia.fmt}</div>
      ${feriado ? `<div class="prog-dia-feriado-nome">${_progNomeFeriado(dia.dataStr)}</div>` : ''}
      <div class="prog-dia-total">🌴 ${fmtNum(totalDia)} cocos</div>
      <div class="prog-dia-barra"><div class="prog-dia-fill ${fillClass}" style="width:${pct}%"></div></div>
    `;
    col.appendChild(header);

    cargasDia.forEach(c => col.appendChild(renderProgCard(c)));

    const btnAdd = document.createElement('button');
    btnAdd.className = 'prog-btn-add acao-edicao';
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
  card.draggable = true;
  card.dataset.id = c.id;
  card.onclick = () => abrirModalProgEditar(c.id);

  // Drag & drop
  card.addEventListener('dragstart', e => {
    _progDragId = c.id;
    card.classList.add('prog-dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => card.classList.remove('prog-dragging'));

  const receitaCoco = c.valor_por_coco ? c.volume_cocos * c.valor_por_coco : null;
  const frete = c.frete_total || 0;
  const totalNF = receitaCoco ? receitaCoco + frete : null;
  const precisaCaminhao = c.providenciar_caminhao && c.caminhao_status === 'pendente';

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
      <span class="prog-card-qtde">🌴 ${fmtNum(c.volume_cocos)}</span>
      <span class="prog-card-rpc">${c.valor_por_coco ? 'R$ ' + Number(c.valor_por_coco).toFixed(2) : 'fábrica'}</span>
      ${receitaCoco != null ? `<span class="prog-card-receita">R$ ${fmtNum(Math.round(receitaCoco))}</span>` : ''}
    </div>
    ${frete > 0 ? `<div class="prog-card-custos"><span>coco R$ ${fmtNum(Math.round(receitaCoco))}</span> <span>+ frete R$ ${fmtNum(Math.round(frete))}</span> <span class="prog-card-total-nf">= R$ ${fmtNum(Math.round(totalNF))}</span></div>` : ''}
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

// ── DRAG & DROP: MOVER CARGA ──
async function _progDropCard(novoDia) {
  if (!_progDragId) return;
  const carga = _progSemana.find(c => c.id === _progDragId);
  if (!carga || carga.dia_entrega === novoDia) { _progDragId = null; return; }

  const diaObj = new Date(novoDia + 'T12:00:00');
  if (diaObj.getDay() === 6) {
    if (!confirm('Sábado selecionado. Tem certeza que vai carregar no sábado?')) { _progDragId = null; return; }
  }
  if (_progIsFeriado(novoDia)) {
    if (!confirm(`${_progNomeFeriado(novoDia)} — Tem certeza que vai carregar em feriado?`)) { _progDragId = null; return; }
  }

  try {
    const { error } = await _SB.from('programacao')
      .update({
        dia_entrega: novoDia,
        semana_inicio: _progDataISO(getSegundaDaSemana(new Date(novoDia + 'T12:00:00'))),
        updated_at: new Date().toISOString()
      })
      .eq('id', _progDragId);
    if (error) throw error;
    showToast(`${carga.cliente_nome} movido`);
    await carregarProgramacao(_progSemanaInicio);
  } catch(e) {
    showToast('Erro ao mover: ' + (e.message || e));
  }
  _progDragId = null;
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
  const valorEl = document.getElementById('prog-inp-valor');
  valorEl.value = '';
  valorEl.dataset.digits = '';
  valorEl.dataset.brutoDigits = '';
  const notaEl = document.getElementById('prog-valor-nota');
  if (notaEl) { notaEl.style.display = 'none'; notaEl.textContent = ''; }
  document.getElementById('prog-inp-obs').value = '';
  document.getElementById('prog-inp-obs').style.display = 'none';
  document.getElementById('prog-inp-motorista').value = '';
  document.getElementById('prog-receita-preview').style.display = 'none';
  // Reset frete, ICMS, seguro
  const freteEl = document.getElementById('prog-inp-frete');
  if (freteEl) { freteEl.value = ''; freteEl.dataset.digits = ''; }
  const campoFrete = document.getElementById('prog-campo-frete');
  if (campoFrete) campoFrete.style.display = 'none';
  _progSetFreteMode('total');
  const icmsEl = document.getElementById('prog-inp-icms');
  if (icmsEl) { const d = _progValorToDigits(96); icmsEl.value = _progFormatValor(d); icmsEl.dataset.digits = d; }
  const campoIcms = document.getElementById('prog-campo-icms');
  if (campoIcms) campoIcms.style.display = 'none';
  const seguroEl = document.getElementById('prog-inp-seguro');
  if (seguroEl) { seguroEl.value = ''; seguroEl.dataset.digits = ''; seguroEl.dataset.manual = ''; }
  const campoSeguro = document.getElementById('prog-campo-seguro');
  if (campoSeguro) campoSeguro.style.display = 'none';
  document.getElementById('prog-btn-salvar').textContent = '✓ Agendar carga';
  document.getElementById('prog-acoes-editar').style.display = 'none';

  _progRenderDiasBtns();
  _progRenderListaClientes('');
  _progResetVeiculoBtns();
  _progResetAreaBtns();
  _progResetCaminhaoBtns();
  const rpcWrap = document.getElementById('prog-rpc-historico');
  if (rpcWrap) { rpcWrap.style.display = 'none'; rpcWrap.innerHTML = ''; }

  openModal('prog-modal-overlay');
}

// ── MODAL: ABRIR EDITAR CARGA ──
function abrirModalProgEditar(id) {
  const c = _progSemana.find(x => x.id === id);
  if (!c) return;
  _progEditandoId = id;

  document.getElementById('prog-modal-titulo').textContent = 'Editar Carga';
  document.getElementById('prog-btn-salvar').textContent = '✓ Salvar alterações';

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

  // Valor: o DB armazena o LÍQUIDO. Para mostrar o BRUTO no input em edição,
  // somamos de volta o frete por coco (se houver). Assim, ao mexer no frete,
  // a dedução é recalculada corretamente a partir do bruto original.
  // Respeitar o modo de frete original (percoco ou total) — default: total para cargas antigas
  const freteModoSalvo = c.frete_modo === 'percoco' ? 'percoco' : 'total';
  _progSetFreteMode(freteModoSalvo);
  const valorEl = document.getElementById('prog-inp-valor');
  let valorBruto = Number(c.valor_por_coco || 0);
  if (valorBruto > 0 && c.volume_cocos) {
    if (c.frete_total) valorBruto += Number(c.frete_total) / Number(c.volume_cocos);
    const extrasTotal = (Number(c.icms_valor) || 0) + (Number(c.seguro_valor) || 0);
    if (extrasTotal > 0) valorBruto += extrasTotal / Number(c.volume_cocos);
  }
  const digits = _progValorToDigits(valorBruto);
  valorEl.dataset.digits = digits;
  valorEl.dataset.brutoDigits = digits;
  valorEl.value = _progFormatValor(digits);
  const notaEl = document.getElementById('prog-valor-nota');
  if (notaEl) { notaEl.style.display = 'none'; notaEl.textContent = ''; }

  // Frete — se modo percoco, converter frete_total de volta para valor por coco
  const freteEl = document.getElementById('prog-inp-frete');
  const campoFrete = document.getElementById('prog-campo-frete');
  if (freteEl && c.frete_total) {
    const qtdeCocos = Number(c.volume_cocos) || 1;
    const valorExibir = freteModoSalvo === 'percoco'
      ? Number(c.frete_total) / qtdeCocos
      : Number(c.frete_total);
    const fd = _progValorToDigits(valorExibir);
    freteEl.dataset.digits = fd;
    freteEl.value = _progFormatValor(fd);
    if (campoFrete) campoFrete.style.display = '';
    // Aplica dedução para mostrar a nota explicativa imediatamente
    _progAplicarDeducaoFrete();
  } else if (freteEl) {
    freteEl.value = ''; freteEl.dataset.digits = '';
    if (campoFrete) campoFrete.style.display = c.valor_por_coco ? '' : 'none';
  }

  // ICMS + Seguro
  const icmsEditEl = document.getElementById('prog-inp-icms');
  const campoIcmsEdit = document.getElementById('prog-campo-icms');
  if (icmsEditEl) {
    const icmsVal = Number(c.icms_valor) || 96;
    const id = _progValorToDigits(icmsVal);
    icmsEditEl.dataset.digits = id;
    icmsEditEl.value = _progFormatValor(id);
  }
  if (campoIcmsEdit) campoIcmsEdit.style.display = c.frete_total ? '' : 'none';

  const seguroEditEl = document.getElementById('prog-inp-seguro');
  const campoSeguroEdit = document.getElementById('prog-campo-seguro');
  if (seguroEditEl) {
    if (c.seguro_valor) {
      const sd = _progValorToDigits(Number(c.seguro_valor));
      seguroEditEl.dataset.digits = sd;
      seguroEditEl.value = _progFormatValor(sd);
      seguroEditEl.dataset.manual = '1';
    } else {
      seguroEditEl.value = '';
      seguroEditEl.dataset.digits = '';
      seguroEditEl.dataset.manual = '';
    }
  }
  if (campoSeguroEdit) campoSeguroEdit.style.display = c.frete_total ? '' : 'none';

  _progAreaSel = c.area;
  _progResetAreaBtns();
  if (c.area) {
    document.querySelectorAll('.prog-area-btn').forEach(b => {
      if (b.dataset.area === c.area) b.classList.add('sel');
    });
  }

  _progProvidenciarCaminhao = !!c.providenciar_caminhao;
  _progResetCaminhaoBtns();

  document.getElementById('prog-inp-motorista').value = c.motorista || '';

  if (c.obs) {
    document.getElementById('prog-inp-obs').value = c.obs;
    document.getElementById('prog-inp-obs').style.display = 'block';
  } else {
    document.getElementById('prog-inp-obs').value = '';
    document.getElementById('prog-inp-obs').style.display = 'none';
  }

  _progAtualizarPreview();

  const acoes = document.getElementById('prog-acoes-editar');
  acoes.style.display = 'flex';
  const btnStatus = document.getElementById('prog-btn-status');
  if (c.status === 'pendente') {
    btnStatus.textContent = '✓ Confirmar carga';
    btnStatus.style.cssText = '';
    btnStatus.onclick = () => _progAtualizarStatus(id, 'confirmado');
  } else if (c.status === 'confirmado') {
    btnStatus.textContent = '✓✓ Marcar como Entregue';
    btnStatus.style.cssText = 'background:var(--forest);color:#fff;border-color:var(--forest)';
    btnStatus.onclick = () => _progAtualizarStatus(id, 'entregue');
  } else if (c.status === 'entregue') {
    btnStatus.textContent = '↩ Voltar para confirmado';
    btnStatus.style.cssText = '';
    btnStatus.onclick = () => _progAtualizarStatus(id, 'confirmado');
  }

  // Botão Registrar Venda (visível para confirmado/entregue)
  const btnVenda = document.getElementById('prog-btn-registrar-venda');
  if (btnVenda) btnVenda.style.display = (c.status === 'confirmado' || c.status === 'entregue') ? 'block' : 'none';

  openModal('prog-modal-overlay');
}

// ── REGISTRAR VENDA A PARTIR DA CARGA ──
function progRegistrarVenda() {
  if (!_progEditandoId) return;
  const c = _progSemana.find(x => x.id === _progEditandoId);
  if (!c) return;
  const cli = _progClientes.find(x => x.id === c.cliente_id);

  // Guardar ID para vincular após salvar venda
  window._progVendaLinkId = _progEditandoId;

  closeModal('prog-modal-overlay');
  showPage('vendas');
  showVendasTab('nova');

  // Preencher formulário de nova venda após o DOM atualizar
  setTimeout(() => {
    const setVal = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
    setVal('v-data', c.dia_entrega);
    setVal('v-cliente', c.cliente_nome);
    // Mapear área para campo de cocos
    const areaMap = { 'A1':'va-a1','A2':'va-a2','C':'va-c','D':'va-d','MAMÃO DE CIMA':'va-mdc','MAMÃO DE BAIXO':'va-mdb','MARACUJÁ':'va-ma' };
    const areaField = c.area ? areaMap[c.area] : null;
    if (areaField) setVal(areaField, c.volume_cocos);
    else setVal('va-a1', c.volume_cocos); // fallback: campo A1
    // Total e frete
    if (c.valor_por_coco && c.volume_cocos) {
      const total = c.volume_cocos * c.valor_por_coco;
      setVal('v-total', Math.round(total));
    }
    if (c.frete_total) setVal('v-frete', Math.round(c.frete_total));
    // UF e cidade do cliente
    if (cli?.uf) {
      setVal('v-uf-destino', cli.uf);
      // Trigger change para carregar cidades
      const ufSel = document.getElementById('v-uf-destino');
      if (ufSel) ufSel.dispatchEvent(new Event('change'));
      setTimeout(() => setVal('v-cidade-destino', cli.cidade || ''), 500);
    }
    // Recalcular campos
    if (typeof calcularVenda === 'function') calcularVenda();
    showToast('Dados da carga preenchidos — confira e salve');
  }, 300);
}

// ── MODAL: HELPERS ──
function _progRenderDiasBtns() {
  const wrap = document.getElementById('prog-dias-btns');
  wrap.innerHTML = '';
  const dias = getDiasDaSemana(_progSemanaInicio);
  dias.forEach(dia => {
    const total = _progSemana.filter(c => c.dia_entrega === dia.dataStr).reduce((s, c) => s + c.volume_cocos, 0);
    const cheio = total / CAP_DIA >= 0.7;
    const feriado = _progIsFeriado(dia.dataStr);
    const btn = document.createElement('button');
    btn.className = `prog-dia-btn${cheio ? ' cheio' : ''}${_progDiaSel === dia.dataStr ? ' sel' : ''}${feriado ? ' prog-dia-btn-feriado' : ''}`;
    btn.innerHTML = `<div>${dia.label}${feriado ? ' 🔴' : ''}</div><div style="font-size:8px;margin-top:2px">${fmtNum(total)}</div>`;
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

  if (filtrados.length === 0 && q.length > 0) {
    // Nenhum cliente encontrado — botão cadastrar via painel lateral
    const item = document.createElement('div');
    item.className = 'prog-cliente-item prog-cliente-novo';
    item.innerHTML = `
      <div>
        <div class="prog-cliente-item-nome">Nenhum cliente encontrado</div>
        <div class="prog-cliente-item-sub">Clique para cadastrar "${escapeHtml(q)}"</div>
      </div>
      <span style="font-size:16px">+</span>
    `;
    item.onclick = () => _progCadastrarNovoCliente(q);
    lista.appendChild(item);
    return;
  }

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

  if (c.veiculo_padrao) {
    _progVeiculoSel = c.veiculo_padrao;
    _progResetVeiculoBtns();
    document.querySelectorAll('.prog-veiculo-btn').forEach(b => {
      if (b.dataset.veiculo === c.veiculo_padrao) b.classList.add('sel');
    });
    const sugestao = { truck: 8500, bitruck: 10500, carreta: 16000 };
    if (!document.getElementById('prog-inp-qtde').value) {
      document.getElementById('prog-inp-qtde').value = sugestao[c.veiculo_padrao] || '';
    }
  }
  if (c.rpc_historico) {
    const valorEl = document.getElementById('prog-inp-valor');
    if (!valorEl.dataset.digits) {
      const digits = _progValorToDigits(c.rpc_historico);
      valorEl.dataset.digits = digits;
      valorEl.value = _progFormatValor(digits);
    }
  }
  _progAtualizarPreview();
  // Carregar histórico de preços
  _progCarregarHistoricoPrecos(c.id);
}

async function _progCarregarHistoricoPrecos(clienteId) {
  const wrap = document.getElementById('prog-rpc-historico');
  if (!wrap) return;
  wrap.style.display = 'none';
  wrap.innerHTML = '';
  try {
    const { data } = await _SB.from('programacao')
      .select('valor_por_coco,dia_entrega')
      .eq('cliente_id', clienteId)
      .not('valor_por_coco', 'is', null)
      .neq('status', 'cancelado')
      .order('dia_entrega', { ascending: false })
      .limit(20);
    if (!data || !data.length) return;
    const seen = new Set();
    const precos = [];
    for (const r of data) {
      const v = Number(r.valor_por_coco);
      if (v > 0 && !seen.has(v)) { seen.add(v); precos.push(v); }
      if (precos.length >= 5) break;
    }
    if (!precos.length) return;
    wrap.innerHTML = '<span style="font-size:10px;color:var(--muted);font-weight:700">Últimos:</span> ' +
      precos.map(p => `<span class="prog-rpc-chip" onclick="_progPreencherValor(${p})">R$ ${p.toFixed(2)}</span>`).join(' ');
    wrap.style.display = 'flex';
  } catch(e) { /* silencioso */ }
}

function _progPreencherValor(valor) {
  const el = document.getElementById('prog-inp-valor');
  if (!el) return;
  const digits = _progValorToDigits(valor);
  el.dataset.digits = digits;
  el.value = _progFormatValor(digits);
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
  const valor = _progGetValor();
  const preview = document.getElementById('prog-receita-preview');
  if (qtde === 0 && valor === 0) { preview.style.display = 'none'; return; }
  preview.style.display = 'block';
  const lpc = _progClienteSel?.litros_por_coco || LITROS_POR_COCO;
  const litros = Math.round(qtde / lpc);
  const receita = qtde * valor;
  const freteTotal = _progCalcFreteTotal();
  const totalNF = receita + freteTotal;
  document.getElementById('prog-prev-cocos').textContent = fmtNum(qtde) + ' cocos';
  document.getElementById('prog-prev-litros').textContent = fmtNum(litros) + ' L' + (lpc !== LITROS_POR_COCO ? ' (' + lpc.toFixed(1) + '/coco)' : '');
  document.getElementById('prog-prev-receita').textContent = valor > 0 ? 'R$ ' + fmtNum(Math.round(receita)) : '—';
  document.getElementById('prog-prev-rpc').textContent = valor > 0 ? 'R$ ' + valor.toFixed(2) + '/coco' : '—';
  // Auto-seguro antes de ler valores
  _progAutoSeguro();

  // ICMS + Seguro
  const icmsVal = _progGetIcms();
  const seguroVal = _progGetSeguro();
  const custosExtras = icmsVal + seguroVal;
  const totalNFComCustos = totalNF + custosExtras;

  // Frete, ICMS, Seguro e líquida
  const freteRow = document.getElementById('prog-prev-frete-row');
  const icmsRow = document.getElementById('prog-prev-icms-row');
  const seguroRow = document.getElementById('prog-prev-seguro-row');
  const liqRow = document.getElementById('prog-prev-liquida-row');
  const temCustos = freteTotal > 0 || custosExtras > 0;
  if (freteRow) freteRow.style.display = freteTotal > 0 ? '' : 'none';
  if (icmsRow) icmsRow.style.display = icmsVal > 0 ? '' : 'none';
  if (seguroRow) seguroRow.style.display = seguroVal > 0 ? '' : 'none';
  if (liqRow) liqRow.style.display = temCustos ? '' : 'none';
  if (freteTotal > 0) {
    document.getElementById('prog-prev-frete').textContent = '+ R$ ' + fmtNum(Math.round(freteTotal));
  }
  if (icmsVal > 0) {
    document.getElementById('prog-prev-icms').textContent = '− R$ ' + fmtNum(Math.round(icmsVal));
  }
  if (seguroVal > 0) {
    document.getElementById('prog-prev-seguro').textContent = '− R$ ' + fmtNum(Math.round(seguroVal));
  }
  if (temCustos) {
    document.getElementById('prog-prev-liquida').textContent = 'R$ ' + fmtNum(Math.round(totalNFComCustos));
  }
  // Mostrar campos frete/icms/seguro quando valor BRUTO preenchido
  // ICMS/Seguro aparecem quando há valor de frete DIGITADO (não depende de qtde).
  // Isso resolve o bug no modo percoco: se qtde=0, _progCalcFreteTotal retornaria 0
  // e os campos sumiriam erroneamente mesmo com frete/coco preenchido.
  const temBruto = _progGetValorBruto() > 0;
  const temFreteDigitado = _progTemFrete();
  const campoFrete = document.getElementById('prog-campo-frete');
  if (campoFrete) campoFrete.style.display = temBruto ? '' : 'none';
  const campoIcms = document.getElementById('prog-campo-icms');
  if (campoIcms) campoIcms.style.display = (temBruto && temFreteDigitado) ? '' : 'none';
  const campoSeguro = document.getElementById('prog-campo-seguro');
  if (campoSeguro) campoSeguro.style.display = (temBruto && temFreteDigitado) ? '' : 'none';
}

function progToggleObs() {
  const el = document.getElementById('prog-inp-obs');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (el.style.display === 'block') el.focus();
}

// ── SALVAR CARGA ──
async function salvarProgCarga() {
  if (!_progClienteSel) { showToast('Selecione um cliente'); return; }
  if (!_progDiaSel) { showToast('Selecione o dia'); return; }
  const qtde = parseInt(document.getElementById('prog-inp-qtde').value);
  if (!qtde || qtde <= 0) { showToast('Informe a quantidade'); return; }

  // Confirmar sábado
  const diaSelecionado = new Date(_progDiaSel + 'T12:00:00');
  if (diaSelecionado.getDay() === 6) {
    if (!confirm('Sábado selecionado. Tem certeza que vai carregar no sábado?')) return;
  }
  // Alertar feriado
  if (_progIsFeriado(_progDiaSel)) {
    if (!confirm(`${_progNomeFeriado(_progDiaSel)} — Tem certeza que vai carregar em feriado?`)) return;
  }

  // Verificar duplicata (mesmo cliente + mesmo dia)
  const dup = _progSemana.find(x =>
    x.cliente_id === _progClienteSel.id &&
    x.dia_entrega === _progDiaSel &&
    x.id !== _progEditandoId &&
    x.status !== 'cancelado'
  );
  if (dup) {
    const diaFmt = _progDataCurta(new Date(_progDiaSel + 'T12:00:00'));
    if (!confirm(`Já existe uma carga para ${_progClienteSel.nome} no dia ${diaFmt}.\nDeseja agendar outra?`)) return;
  }

  const valor = _progGetValor() || null;
  const obs = document.getElementById('prog-inp-obs').value.trim() || null;
  const motorista = document.getElementById('prog-inp-motorista').value.trim() || null;

  const payload = {
    dia_entrega: _progDiaSel,
    semana_inicio: _progDataISO(getSegundaDaSemana(new Date(_progDiaSel + 'T12:00:00'))),
    cliente_id: _progClienteSel.id,
    cliente_nome: _progClienteSel.nome,
    volume_cocos: qtde,
    valor_por_coco: valor,
    frete_total: _progCalcFreteTotal() || null,
    frete_modo: _progCalcFreteTotal() > 0 ? _progFreteMode : null,
    icms_valor: _progGetIcms() || null,
    seguro_valor: _progGetSeguro() || null,
    tipo_veiculo: _progVeiculoSel,
    area: _progAreaSel,
    providenciar_caminhao: _progProvidenciarCaminhao,
    caminhao_status: _progProvidenciarCaminhao ? 'pendente' : null,
    motorista: motorista,
    obs: obs,
    updated_at: new Date().toISOString()
  };

  try {
    if (_progEditandoId) {
      const { error } = await _SB.from('programacao').update(payload).eq('id', _progEditandoId);
      if (error) throw error;
      showToast('Carga atualizada');
    } else {
      payload.status = 'pendente';
      const { data: { session } } = await _SB.auth.getSession();
      payload.agendado_por = session?.user?.email || 'desconhecido';
      const { error } = await _SB.from('programacao').insert(payload);
      if (error) throw error;
      showToast('Carga agendada');
    }
    closeModal('prog-modal-overlay');
    // Atualizar rpc_historico do cliente (fire-and-forget, não bloqueia UI)
    if (valor && _progClienteSel?.id) {
      _SB.from('clientes').update({ rpc_historico: valor }).eq('id', _progClienteSel.id)
        .then(r => { if (r && r.error) console.warn('Falha ao atualizar rpc_historico:', r.error); })
        .catch(err => console.warn('Erro ao atualizar rpc_historico:', err));
    }
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
    const msgs = { confirmado: 'Carga confirmada ✓', entregue: 'Carga entregue ✓✓', pendente: 'Voltou para pendente' };
    showToast(msgs[novoStatus] || 'Status atualizado');
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

// ── EXCLUIR CARGA (permanente) ──
// ── DUPLICAR CARGA ──
function progDuplicarCarga() {
  if (!_progEditandoId) return;
  const c = _progSemana.find(x => x.id === _progEditandoId);
  if (!c) return;

  // Mudar para modo INSERT (nova carga)
  _progEditandoId = null;

  // Título e botões
  document.getElementById('prog-modal-titulo').textContent = '📋 Duplicar Carga';
  document.getElementById('prog-btn-salvar').textContent = '✓ Agendar carga';
  document.getElementById('prog-acoes-editar').style.display = 'none';

  // Limpar dia — usuário escolhe o novo dia
  _progDiaSel = null;
  _progRenderDiasBtns();

  // Limpar obs (cada carga pode ter obs diferente)
  document.getElementById('prog-inp-obs').value = '';
  document.getElementById('prog-inp-obs').style.display = 'none';

  // Manter tudo o resto (cliente, qtde, valor, frete, ICMS, seguro, veículo, área, motorista, caminhão)
  showToast('Selecione o dia para a nova carga');
}

async function progExcluirCarga() {
  if (!_progEditandoId) return;
  if (!confirm('Excluir esta carga permanentemente? Esta ação não pode ser desfeita.')) return;
  try {
    const { error } = await _SB.from('programacao')
      .delete()
      .eq('id', _progEditandoId);
    if (error) throw error;
    closeModal('prog-modal-overlay');
    showToast('Carga excluída');
    await carregarProgramacao(_progSemanaInicio);
  } catch(e) {
    showToast('Erro ao excluir: ' + (e.message || e));
  }
}

// ── CONFIRMAR CAMINHÃO ──
async function progConfirmarCaminhao() {
  if (!_progEditandoId) return;
  const motorista = document.getElementById('prog-inp-motorista').value.trim();
  try {
    const { error } = await _SB.from('programacao')
      .update({ caminhao_status: 'confirmado', motorista: motorista || null, updated_at: new Date().toISOString() })
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
    `🌴 ${fmtNum(c.volume_cocos)} cocos`;
  if (c.valor_por_coco) msg += ` · R$ ${Number(c.valor_por_coco).toFixed(2)}/coco`;
  if (c.frete_total) msg += `\n💰 Frete: R$ ${fmtNum(Math.round(c.frete_total))}`;
  msg += `\n🚚 ${c.tipo_veiculo || '—'}`;
  if (c.area) msg += `\n📍 Área: ${c.area}`;
  if (c.obs) msg += `\n\n📝 ${c.obs}`;

  const encoded = encodeURIComponent(msg);
  if (tel) {
    const fone = tel.replace(/\D/g, '');
    window.open(`https://wa.me/55${fone}?text=${encoded}`, '_blank');
  } else {
    navigator.clipboard.writeText(msg).then(() => showToast('Mensagem copiada'));
  }
}

// ── CADASTRAR NOVO CLIENTE VIA PAINEL LATERAL ──
function _progCadastrarNovoCliente(nome) {
  // Fecha lista de clientes
  document.getElementById('prog-lista-clientes')?.classList.remove('open');

  // Abre painel lateral de cadastro (reusa o existente do sistema)
  window._cliPanelNome = null;
  _loadClienteForm(null);
  document.getElementById('cli-title').textContent = 'Novo Cliente';
  document.getElementById('cli-sub').textContent = '';
  document.getElementById('cli-kpis').innerHTML = '';
  document.getElementById('cli-hist').innerHTML = '';
  if (nome) document.getElementById('cli-nome').value = nome.toUpperCase();
  switchCliTab('editar');

  // Elevar z-index do painel para ficar acima do modal da programação (z-index 400)
  const panel = document.getElementById('cli-panel');
  const overlay = document.getElementById('cli-overlay');
  panel.style.zIndex = '500';
  overlay.style.zIndex = '499';
  panel.classList.add('open');
  overlay.classList.add('open');

  // Callback: quando salvar, recarregar clientes e selecionar o novo
  const nomeBusca = (nome || '').toUpperCase();
  window._progOnClienteSalvo = async () => {
    // Restaurar z-index original
    panel.style.zIndex = '';
    overlay.style.zIndex = '';
    await carregarClientesProg();
    const novo = _progClientes.find(c => c.nome === nomeBusca);
    if (novo) _progSelecionarCliente(novo);
    window._progOnClienteSalvo = null;
  };
}

// ── SALTAR PARA DATA ──
function progSaltarParaData() {
  const input = document.getElementById('prog-saltar-data');
  if (!input.value) return;
  const data = new Date(input.value + 'T12:00:00');
  _progSemanaInicio = getSegundaDaSemana(data);
  document.getElementById('prog-semana-label').textContent = getSemanaLabel(_progSemanaInicio);
  carregarProgramacao(_progSemanaInicio);
}

// ── HISTÓRICO DE CARGAS ──
let _progHistAberto = false;

function progToggleHistorico() {
  const sec = document.getElementById('prog-historico');
  _progHistAberto = !_progHistAberto;
  sec.style.display = _progHistAberto ? 'block' : 'none';
  if (_progHistAberto) {
    // Default: últimos 30 dias
    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setDate(hoje.getDate() - 30);
    document.getElementById('prog-hist-de').value = _progDataISO(inicio);
    document.getElementById('prog-hist-ate').value = _progDataISO(hoje);
    progBuscarHistorico();
  }
}

async function progBuscarHistorico() {
  const de = document.getElementById('prog-hist-de').value;
  const ate = document.getElementById('prog-hist-ate').value;
  const clienteFiltro = document.getElementById('prog-hist-cliente').value.trim().toLowerCase();
  if (!de || !ate) { showToast('Selecione o período'); return; }

  const resultados = document.getElementById('prog-hist-resultados');
  const kpis = document.getElementById('prog-hist-kpis');
  resultados.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted)">Carregando...</div>';

  try {
    const { data, error } = await _SB.from('programacao').select('*')
      .gte('dia_entrega', de)
      .lte('dia_entrega', ate)
      .neq('status', 'cancelado')
      .order('dia_entrega', { ascending: false })
      .limit(1000);
    if (error) throw error;

    let cargas = data || [];
    if (clienteFiltro) {
      cargas = cargas.filter(c => (c.cliente_nome || '').toLowerCase().includes(clienteFiltro));
    }

    // KPIs do período
    const totalCocos = cargas.reduce((s, c) => s + (c.volume_cocos || 0), 0);
    const totalReceita = cargas.reduce((s, c) => s + ((c.volume_cocos || 0) * (c.valor_por_coco || 0)), 0);
    const totalCargas = cargas.length;
    const clientesUnicos = new Set(cargas.map(c => c.cliente_nome)).size;

    kpis.innerHTML = `
      <div class="prog-kpi">
        <div class="prog-kpi-label">🌴 Total cocos</div>
        <div class="prog-kpi-val prog-kpi-verde">${fmtNum(totalCocos)}</div>
        <div class="prog-kpi-sub">${totalCargas} cargas no período</div>
      </div>
      <div class="prog-kpi">
        <div class="prog-kpi-label">💰 Receita total</div>
        <div class="prog-kpi-val prog-kpi-azul">R$ ${fmtNum(Math.round(totalReceita))}</div>
        <div class="prog-kpi-sub">${clientesUnicos} clientes</div>
      </div>
      <div class="prog-kpi">
        <div class="prog-kpi-label">📊 Média/carga</div>
        <div class="prog-kpi-val" style="color:var(--text)">${totalCargas ? fmtNum(Math.round(totalCocos / totalCargas)) : '0'}</div>
        <div class="prog-kpi-sub">cocos por carga</div>
      </div>
      <div class="prog-kpi">
        <div class="prog-kpi-label">📅 Média/dia útil</div>
        <div class="prog-kpi-val" style="color:var(--text)">${_progMediaDiasUteis(cargas, de, ate)}</div>
        <div class="prog-kpi-sub">cocos por dia útil</div>
      </div>
    `;

    // Lista de cargas
    if (cargas.length === 0) {
      resultados.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted);font-size:13px">Nenhuma carga encontrada no período</div>';
      return;
    }

    // Agrupar por dia
    const porDia = {};
    cargas.forEach(c => {
      if (!porDia[c.dia_entrega]) porDia[c.dia_entrega] = [];
      porDia[c.dia_entrega].push(c);
    });

    let html = '';
    Object.keys(porDia).sort((a, b) => b.localeCompare(a)).forEach(dia => {
      const dObj = new Date(dia + 'T12:00:00');
      const nomeDia = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][dObj.getDay()];
      const dataBr = String(dObj.getDate()).padStart(2,'0') + '/' + String(dObj.getMonth()+1).padStart(2,'0') + '/' + dObj.getFullYear();
      const cargasDia = porDia[dia];
      const totalDia = cargasDia.reduce((s, c) => s + (c.volume_cocos || 0), 0);
      const feriado = _progIsFeriado(dia);

      html += `<div class="prog-hist-dia${feriado ? ' prog-hist-dia-feriado' : ''}">`;
      html += `<div class="prog-hist-dia-header">`;
      html += `<span class="prog-hist-dia-nome">${nomeDia}, ${dataBr}${feriado ? ' · <span class="prog-feriado-badge">FERIADO</span>' : ''}</span>`;
      html += `<span class="prog-hist-dia-total">🌴 ${fmtNum(totalDia)} · ${cargasDia.length} carga${cargasDia.length > 1 ? 's' : ''}</span>`;
      html += `</div>`;

      cargasDia.forEach(c => {
        const receitaCoco = (c.volume_cocos || 0) * (c.valor_por_coco || 0);
        const freteHist = c.frete_total || 0;
        const totalNFHist = receitaCoco + freteHist;
        html += `<div class="prog-hist-carga">`;
        html += `<div class="prog-hist-carga-cliente">${escapeHtml(c.cliente_nome)}</div>`;
        html += `<div class="prog-hist-carga-info">`;
        html += `<span>🌴 ${fmtNum(c.volume_cocos)}</span>`;
        html += `<span>${c.valor_por_coco ? 'R$ ' + Number(c.valor_por_coco).toFixed(2) : 'fábrica'}</span>`;
        if (receitaCoco) html += `<span style="color:#1d4ed8;font-weight:700">R$ ${fmtNum(Math.round(receitaCoco))}</span>`;
        if (c.tipo_veiculo) html += `<span class="prog-badge prog-badge-veiculo">${escapeHtml(c.tipo_veiculo)}</span>`;
        html += `<span class="prog-st prog-st-${c.status}">${c.status}</span>`;
        html += `</div>`;
        if (freteHist > 0) html += `<div class="prog-card-custos" style="margin-top:2px"><span>coco R$ ${fmtNum(Math.round(receitaCoco))}</span> <span>+ frete R$ ${fmtNum(Math.round(freteHist))}</span> <span class="prog-card-total-nf">= R$ ${fmtNum(Math.round(totalNFHist))}</span></div>`;
        html += `</div>`;
      });

      html += `</div>`;
    });

    resultados.innerHTML = html;
  } catch(e) {
    console.error('Erro no histórico:', e);
    resultados.innerHTML = `<div style="text-align:center;padding:20px;color:var(--vermelho)">Erro: ${e.message}</div>`;
  }
}

function _progMediaDiasUteis(cargas, de, ate) {
  if (cargas.length === 0) return '0';
  const totalCocos = cargas.reduce((s, c) => s + (c.volume_cocos || 0), 0);
  // Contar dias úteis (seg-sex, excluindo feriados)
  let dias = 0;
  const d = new Date(de + 'T12:00:00');
  const fim = new Date(ate + 'T12:00:00');
  if (isNaN(d.getTime()) || isNaN(fim.getTime())) {
    console.warn('_progMediaDiasUteis: datas inválidas', de, ate);
    return fmtNum(totalCocos);
  }
  // Guarda de segurança: máx 5 anos de iterações para evitar loop infinito
  let safety = 0;
  while (d <= fim && safety < 1830) {
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5 && !_progIsFeriado(_progDataISO(d))) dias++;
    d.setDate(d.getDate() + 1);
    safety++;
  }
  if (safety >= 1830) console.warn('_progMediaDiasUteis: limite de iteração atingido');
  return dias > 0 ? fmtNum(Math.round(totalCocos / dias)) : fmtNum(totalCocos);
}

// ── FECHAR LISTA CLIENTES AO CLICAR FORA ──
document.addEventListener('click', e => {
  if (!e.target.closest('.prog-cliente-search')) {
    document.getElementById('prog-lista-clientes')?.classList.remove('open');
  }
});
