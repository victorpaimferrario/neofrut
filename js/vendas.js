// ─────────── VENDAS ───────────

async function initVendas(forcarReload=false){
  // usar cache se disponível e não forçar reload
  let db;
  if(_vendasCache && !forcarReload) {
    db = _vendasCache;
  } else {
    const kpi=document.getElementById('v-kpi-grid');
    if(kpi)kpi.innerHTML='<div style="padding:20px;color:var(--muted);font-size:13px">⏳ Carregando vendas...</div>';
    db = await loadVendasSupabase();
  }
  const anos=[...new Set(db.map(v=>parseInt(v.data?v.data.substring(0,4):0)).filter(a=>a>2000))].sort((a,b)=>b-a);
  // selecionar ano e mês atual por padrão sempre que entrar
  const _hoje=new Date();
  window._vendaAnoAtivo=String(_hoje.getFullYear());
  window._vendaMesAtivo=String(_hoje.getMonth()+1);
  renderAnosBtns(anos);
  renderMesesBtns();
  const el=document.getElementById('v-data');
  if(el&&!el.value)el.value=today();
  // popular lista de clientes para autocomplete (vendas + cadastro)
  const _nomesCadastro = Object.keys(getMapaClientes());
  window._acClientesLista=[...new Set([...db.map(v=>v.cliente),..._nomesCadastro])].sort();
  _popularDatalistClientes();
  // popular select de UFs (todos os estados do Brasil)
  const ufSel=document.getElementById('v-uf-destino');
  if(ufSel&&ufSel.options.length<=1){
    const UFS_BR=[
      ['AC','Acre'],['AL','Alagoas'],['AP','Amapá'],['AM','Amazonas'],['BA','Bahia'],
      ['CE','Ceará'],['DF','Distrito Federal'],['ES','Espírito Santo'],['GO','Goiás'],
      ['MA','Maranhão'],['MT','Mato Grosso'],['MS','Mato Grosso do Sul'],['MG','Minas Gerais'],
      ['PA','Pará'],['PB','Paraíba'],['PR','Paraná'],['PE','Pernambuco'],['PI','Piauí'],
      ['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],['RS','Rio Grande do Sul'],
      ['RO','Rondônia'],['RR','Roraima'],['SC','Santa Catarina'],['SP','São Paulo'],
      ['SE','Sergipe'],['TO','Tocantins']
    ];
    UFS_BR.forEach(([s,n])=>{const o=document.createElement('option');o.value=s;o.textContent=s+' - '+n;ufSel.appendChild(o);});
    const oFab=document.createElement('option');oFab.value='FÁBRICA';oFab.textContent='FÁBRICA';ufSel.appendChild(oFab);
  }
  renderVendasPainel();
  renderVendasLista();
  renderVendasPendentes();
  const subTab=localStorage.getItem('neofrut_vendas_tab')||'painel';
  showVendasTab(subTab);
}

function renderAnosBtns(anos){
  ['v-anos-btns','vl-anos-btns','vp-anos-btns'].forEach(id=>{
    const w=document.getElementById(id);if(!w)return;
    const a=window._vendaAnoAtivo||'todos';
    w.innerHTML=`<button class="area-btn todas ${a==='todos'?'ativo':''}" onclick="selAno('todos')">Todos</button>`+
      anos.map(x=>`<button class="area-btn ${a===String(x)?'ativo':''}" onclick="selAno('${x}')">${x}</button>`).join('');
  });
}

function selAno(ano){
  window._vendaAnoAtivo=String(ano);
  const db=loadVendas();
  const anos=[...new Set(db.map(v=>parseInt(v.data?v.data.substring(0,4):0)).filter(a=>a>2000))].sort((a,b)=>b-a);
  renderAnosBtns(anos);
  renderMesesBtns();
  renderVendasPainel();
  renderVendasLista();
  renderVendasPendentes();
}

function renderMesesBtns(){
  const MESES=[['todos','Todos'],['1','Jan'],['2','Fev'],['3','Mar'],['4','Abr'],['5','Mai'],['6','Jun'],
               ['7','Jul'],['8','Ago'],['9','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  const ativo=window._vendaMesAtivo||'todos';
  ['v-meses-btns','vl-meses-btns','vp-meses-btns'].forEach(id=>{
    const w=document.getElementById(id);if(!w)return;
    w.innerHTML=MESES.map(([v,l])=>
      `<button class="area-btn${v==='todos'?' todas':''}${ativo===v?' ativo':''}" onclick="selMes('${v}')">${l}</button>`
    ).join('');
  });
}

function selMes(mes){
  window._vendaMesAtivo=mes;
  renderMesesBtns();
  renderVendasPainel();
  renderVendasLista();
  renderVendasPendentes();
}

function showVendasTab(tab){
  document.querySelectorAll('.vd-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.vd-sec').forEach(s=>s.classList.remove('active'));
  const idx={'painel':0,'nova':1,'lista':2,'pendentes':3,'clientes':4,'simulador':5}[tab];
  document.querySelectorAll('.vd-tab')[idx]?.classList.add('active');
  document.getElementById('vsec-'+tab)?.classList.add('active');
  localStorage.setItem('neofrut_vendas_tab', tab);
  if(tab==='lista')renderVendasLista();
  if(tab==='pendentes')renderVendasPendentes();
  if(tab==='clientes')initClientes();
  if(tab==='simulador'){ calcSimulador(); calcSimMesa(); }
}

// ── SUB-ABAS DO SIMULADOR ──
function setSimTab(tab, el){
  document.querySelectorAll('.sim-sub-tab').forEach(t=>t.classList.remove('ativo'));
  document.querySelectorAll('.sim-painel').forEach(p=>{p.classList.remove('ativo');p.style.display='none';});
  if(el) el.classList.add('ativo');
  const painel=document.getElementById('sim-painel-'+tab);
  if(painel){ painel.classList.add('ativo'); painel.style.display='grid'; }
  if(tab==='mesa') calcSimMesa();
  if(tab==='fabrica') calcSimulador();
}

// ── SIMULADOR MESA (Coco Posto no Local) ──
let _simMesaFreteMode = 'coco';
function setSimMesaFreteMode(mode){
  _simMesaFreteMode = mode;
  const bCoco=document.getElementById('ft-coco');
  const bTot=document.getElementById('ft-total');
  if(bCoco) bCoco.classList.toggle('ativo', mode==='coco');
  if(bTot) bTot.classList.toggle('ativo', mode==='total');
  const wCoco=document.getElementById('frete-coco-wrap');
  const wTot=document.getElementById('frete-total-wrap');
  if(wCoco) wCoco.style.display = mode==='coco' ? 'block' : 'none';
  if(wTot) wTot.style.display = mode==='total' ? 'block' : 'none';
  calcSimMesa();
}

// Preço base: aceita "230" (= R$ 2,30), "2,30" ou "2.30"
function _parsePrecoBase(valor){
  if(!valor) return 0;
  const v = String(valor).trim();
  if(v==='') return 0;
  // Se contém vírgula ou ponto → decimal literal
  if(v.includes(',') || v.includes('.')){
    const normalizado = v.replace(/\./g,'').replace(',', '.');
    const n = parseFloat(normalizado);
    return isNaN(n) ? 0 : n;
  }
  // Só dígitos → centavos
  const digits = v.replace(/\D/g,'');
  return digits ? parseInt(digits,10)/100 : 0;
}
function onPrecoBaseInput(el){
  // Permitir dígitos, vírgula e ponto
  el.value = (el.value||'').replace(/[^\d.,]/g,'');
  const reais = _parsePrecoBase(el.value);
  const fmt = document.getElementById('m-preco-base-fmt');
  if(fmt) fmt.textContent = 'R$ '+reais.toFixed(2).replace('.',',');
  calcSimMesa();
}

// Limpar todos os campos do simulador mesa
function limparSimMesa(){
  const ids = ['m-qtde','m-preco-base','m-frete-coco','m-frete-total','m-descarga',
    'm-gaiola-qtd','m-seguro','m-desconto','m-prazo'];
  ids.forEach(id => { const el=document.getElementById(id); if(el){ el.value=''; if(el.dataset){ el.dataset.auto=''; el.dataset.manual=''; } }});
  // Resets específicos
  const defaults = {'m-gaiola-unit':50, 'm-gaiola-cap':200, 'm-taxa':1, 'm-margem':10, 'm-icms':96};
  Object.keys(defaults).forEach(id => { const el=document.getElementById(id); if(el) el.value=defaults[id]; });
  const fmt = document.getElementById('m-preco-base-fmt');
  if(fmt) fmt.textContent = 'R$ 0,00';
  setSimMesaFreteMode('coco');
  calcSimMesa();
}

// Ao mudar cocos por gaiola, se qtd de gaiolas estiver vazia ou foi auto-preenchida, recalcular
function onGaiolaCapChange(){
  _simAutopreencherGaiolas();
  calcSimMesa();
}
function _simAutopreencherGaiolas(){
  const qtdeCocos = parseInt(document.getElementById('m-qtde')?.value)||0;
  const cap = parseInt(document.getElementById('m-gaiola-cap')?.value)||0;
  const qtdEl = document.getElementById('m-gaiola-qtd');
  if(!qtdEl) return;
  // Só auto-preenche se o campo estiver vazio ou marcado como auto
  if(qtdEl.value==='' || qtdEl.dataset.auto==='1'){
    if(qtdeCocos>0 && cap>0){
      qtdEl.value = Math.ceil(qtdeCocos/cap);
      qtdEl.dataset.auto = '1';
    } else {
      qtdEl.value = '';
    }
  }
}

function _gSM(id){ return parseFloat(document.getElementById(id)?.value)||0; }
function _fmtRSM(n, casas=2){ return 'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:casas,maximumFractionDigits:casas}); }
function _fmtRCocoSM(n){ return 'R$ '+n.toFixed(4).replace('.',','); }
function _fmtNSM(n){ return Math.round(n).toLocaleString('pt-BR'); }

function calcSimMesa(){
  // Auto-preencher qtd de gaiolas se necessário (antes de ler valores)
  _simAutopreencherGaiolas();
  // Marcar manual quando o usuário editar
  const gaiolaQtdEl = document.getElementById('m-gaiola-qtd');
  if(gaiolaQtdEl && !gaiolaQtdEl._bound){
    gaiolaQtdEl.addEventListener('input', function(){ this.dataset.auto=''; });
    gaiolaQtdEl._bound = true;
  }

  const qtde = _gSM('m-qtde');
  // Preço base: aceita "230" (centavos), "2,30" ou "2.30"
  const precoBase = _parsePrecoBase(document.getElementById('m-preco-base')?.value);

  const vazio = document.getElementById('res-vazio-mesa');
  const precoFinal = document.getElementById('res-preco-final');
  const detalhes = document.getElementById('res-detalhes');
  const interp = document.getElementById('res-interpretacao');

  if(qtde<=0 || precoBase<=0){
    if(vazio) vazio.style.display = 'block';
    if(precoFinal) precoFinal.style.display = 'none';
    if(detalhes) detalhes.style.display = 'none';
    if(interp) interp.style.display = 'none';
    return;
  }

  // Frete
  let frete_coco = 0;
  if(_simMesaFreteMode==='coco'){
    frete_coco = _gSM('m-frete-coco');
  } else {
    const ft = _gSM('m-frete-total');
    frete_coco = qtde>0 ? ft/qtde : 0;
  }

  // Descarga
  const descarga_tot = _gSM('m-descarga');
  const descarga_coco = qtde>0 ? descarga_tot/qtde : 0;

  // Gaiola — qtd × unit
  const gaiola_qtd = _gSM('m-gaiola-qtd');
  const gaiola_unit = _gSM('m-gaiola-unit');
  const gaiola_cap = _gSM('m-gaiola-cap');
  const gaiola_tot = gaiola_qtd * gaiola_unit;
  const gaiola_coco = (qtde>0 && gaiola_tot>0) ? gaiola_tot/qtde : 0;
  const descElG = document.getElementById('gaiola-desc');
  if(descElG){
    if(gaiola_qtd>0 && gaiola_unit>0){
      descElG.textContent = gaiola_qtd+' gaiolas × R$ '+gaiola_unit.toFixed(2)+' = R$ '+gaiola_tot.toFixed(2)+' total (R$ '+gaiola_coco.toFixed(4)+'/coco) · cap: '+gaiola_cap+' cocos/gaiola';
    } else {
      descElG.textContent = 'Quantidade pré-preenchida automaticamente (qtde cocos ÷ cocos/gaiola), mas pode editar — nem toda a carga precisa ir pra gaiola.';
    }
  }

  // ICMS do frete
  const icms_tot = _gSM('m-icms');
  const icms_coco = qtde>0 ? icms_tot/qtde : 0;

  // Seguro — 0,07% do valor da NF (cocos + frete). Auto-calculado, mas editável.
  const seguroEl = document.getElementById('m-seguro');
  const frete_tot_valor = _simMesaFreteMode==='coco' ? frete_coco*qtde : _gSM('m-frete-total');
  const baseNF = (precoBase * qtde) + frete_tot_valor;
  if(seguroEl && seguroEl.dataset.manual!=='1'){
    const autoSeg = baseNF * 0.0007;
    seguroEl.value = autoSeg > 0 ? autoSeg.toFixed(2) : '';
  }
  const seguro_tot = _gSM('m-seguro');
  const seguro_coco = qtde>0 ? seguro_tot/qtde : 0;
  const descElSeg = document.getElementById('seguro-desc');
  if(descElSeg){
    if(seguroEl && seguroEl.dataset.manual==='1'){
      descElSeg.textContent = 'Valor manual. Limpe o campo para voltar ao cálculo automático (0,07%).';
    } else {
      descElSeg.textContent = 'Calculado: 0,07% × R$ '+(baseNF>0?baseNF.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:0}):'0')+' (cocos + frete) = R$ '+seguro_tot.toFixed(2);
    }
  }

  // Desconto financeiro
  const desc_pct = _gSM('m-desconto')/100;
  const desc_coco = precoBase * desc_pct;

  // Juro composto do prazo
  const prazo = _gSM('m-prazo');
  const taxa = _gSM('m-taxa')/100;
  const fator_jc = prazo>0 ? Math.pow(1+taxa, prazo/30)-1 : 0;
  const fin_coco = precoBase * fator_jc;

  // Custos por coco
  const custos_coco = frete_coco + descarga_coco + gaiola_coco + icms_coco + seguro_coco + desc_coco + fin_coco;

  // Margem
  const margem_pct = _gSM('m-margem')/100;
  const margem_coco = custos_coco * margem_pct;

  // Preços
  const preco_min = precoBase + custos_coco;
  const preco_sug = preco_min + margem_coco;
  const tot_min = preco_min * qtde;
  const tot_sug = preco_sug * qtde;

  // Mostrar
  if(vazio) vazio.style.display = 'none';
  if(precoFinal) precoFinal.style.display = 'block';
  if(detalhes) detalhes.style.display = 'block';
  if(interp) interp.style.display = 'block';

  const $ = id => document.getElementById(id);
  $('res-preco-minimo').textContent = 'R$ '+preco_min.toFixed(2).replace('.',',');
  $('res-total-minimo').textContent = 'Total: '+_fmtRSM(tot_min,0);
  $('res-preco-sugerido').textContent = 'R$ '+preco_sug.toFixed(2).replace('.',',');
  $('res-total-sugerido').textContent = 'Total: '+_fmtRSM(tot_sug,0);
  $('res-voce-recebe').textContent = 'R$ '+precoBase.toFixed(2).replace('.',',');
  $('res-total-custos-badge').textContent = 'R$ '+custos_coco.toFixed(2).replace('.',',');
  $('res-margem-label').textContent = 'R$ '+margem_coco.toFixed(2).replace('.',',')+' ('+(margem_pct*100).toFixed(0)+'%)';
  $('res-qtde-label').textContent = _fmtNSM(qtde)+' cocos';

  // Linhas de detalhe
  const linhas = [
    {nome:'🎯 Você quer receber', coco:precoBase, tot:precoBase*qtde, cls:''},
    {nome:'🚛 Frete', coco:frete_coco, tot:frete_coco*qtde, cls:'negativo', ocultar:frete_coco===0},
    {nome:'📦 Descarga', coco:descarga_coco, tot:descarga_tot, cls:'negativo', ocultar:descarga_tot===0},
    {nome:'🧺 Gaiola — '+gaiola_qtd+' × R$'+gaiola_unit.toFixed(2), coco:gaiola_coco, tot:gaiola_tot, cls:'negativo', ocultar:gaiola_tot===0},
    {nome:'📄 ICMS frete', coco:icms_coco, tot:icms_tot, cls:'negativo', ocultar:icms_tot===0},
    {nome:'🛡️ Seguro 0,07%', coco:seguro_coco, tot:seguro_tot, cls:'negativo', ocultar:seguro_tot===0},
    {nome:'💳 Desconto '+(desc_pct*100).toFixed(1)+'%', coco:desc_coco, tot:desc_coco*qtde, cls:'negativo', ocultar:desc_pct===0},
    {nome:'⏱️ Prazo '+prazo+'d · juro '+(taxa*100).toFixed(1)+'%/mês', coco:fin_coco, tot:fin_coco*qtde, cls:'negativo', ocultar:prazo===0,
      detalhe: prazo>0 ? '(1 + '+(taxa*100).toFixed(1)+'%)^('+prazo+'/30) − 1 = '+(fator_jc*100).toFixed(3)+'%' : ''},
  ];

  const wrap = $('res-linhas-custo');
  wrap.innerHTML = '';
  linhas.forEach(l => {
    if(l.ocultar) return;
    const div = document.createElement('div');
    div.className = 'custo-row '+l.cls;
    div.innerHTML =
      '<div>'
      +'<span class="custo-nome">'+l.nome+'</span>'
      +(l.detalhe ? '<div style="font-size:9px;color:var(--muted);font-family:var(--font-mono);margin-top:1px">'+l.detalhe+'</div>' : '')
      +'</div>'
      +'<span class="custo-porcoco">'+(l.coco>0 ? _fmtRCocoSM(l.coco) : '—')+'</span>'
      +'<span class="custo-total">'+(l.tot>0 ? _fmtRSM(l.tot,0) : '—')+'</span>';
    wrap.appendChild(div);
  });

  // Preço mínimo
  const divMin = document.createElement('div');
  divMin.className = 'custo-row subtotal';
  divMin.innerHTML =
    '<span class="custo-nome">🔻 Preço mínimo (cobre todos os custos)</span>'
    +'<span class="custo-porcoco" style="color:#d97706;font-weight:900">R$ '+preco_min.toFixed(2).replace('.',',')+'</span>'
    +'<span class="custo-total" style="color:#d97706">'+_fmtRSM(tot_min,0)+'</span>';
  wrap.appendChild(divMin);

  if(margem_coco>0){
    const divMarg = document.createElement('div');
    divMarg.className = 'custo-row';
    divMarg.innerHTML =
      '<span class="custo-nome">📈 Margem '+(margem_pct*100).toFixed(0)+'% sobre custos</span>'
      +'<span class="custo-porcoco" style="color:#1d4ed8;font-weight:700">+ R$ '+margem_coco.toFixed(2).replace('.',',')+'</span>'
      +'<span class="custo-total" style="color:#1d4ed8">+ '+_fmtRSM(margem_coco*qtde,0)+'</span>';
    wrap.appendChild(divMarg);

    const divSug = document.createElement('div');
    divSug.className = 'custo-row subtotal';
    divSug.style.cssText = 'border-top:2px solid var(--forest);margin-top:4px;padding-top:10px';
    divSug.innerHTML =
      '<span class="custo-nome" style="color:var(--forest)">⭐ Preço sugerido (com margem)</span>'
      +'<span class="custo-porcoco" style="color:var(--forest);font-weight:900;font-size:14px">R$ '+preco_sug.toFixed(2).replace('.',',')+'</span>'
      +'<span class="custo-total" style="color:var(--forest);font-size:14px">'+_fmtRSM(tot_sug,0)+'</span>';
    wrap.appendChild(divSug);
  }

  // Interpretação
  const pct = (custos_coco/preco_min)*100;
  let intClass, intMsg;
  if(pct<15){
    intClass='ok';
    intMsg='✅ Custos saudáveis — '+pct.toFixed(1)+'% do preço mínimo. Você recebe R$ '+precoBase.toFixed(2).replace('.',',')+' líquido por coco ('+_fmtRSM(precoBase*qtde,0)+' na carga).';
  } else if(pct<25){
    intClass='atencao';
    intMsg='⚠️ Custos representam '+pct.toFixed(1)+'% do preço mínimo. Avalie se frete, prazo ou desconto podem ser melhorados.';
  } else {
    intClass='ruim';
    intMsg='🔴 Custos elevados — '+pct.toFixed(1)+'% do preço mínimo são despesas. O juro composto do prazo ou o frete estão pesando muito.';
  }
  interp.className='sim-interpretacao '+intClass;
  interp.textContent=intMsg;
}

function filtrarVendas(db,ano,mes){
  return db.filter(v=>{
    if(!v.data) return false;
    const ds = v.data.substring(0,10);
    const anoV = parseInt(ds.substring(0,4));
    const mesV  = parseInt(ds.substring(5,7));
    const okA=!ano||ano==='todos'||anoV===parseInt(ano);
    const okM=!mes||mes==='todos'||mesV===parseInt(mes);
    return okA&&okM;
  });
}

function renderVendasPainel(){
  const db=loadVendas();
  const ano=window._vendaAnoAtivo||'todos';
  const mes=window._vendaMesAtivo||'todos';
  const sel=filtrarVendas(db,ano,mes);
  const tCocos=sel.reduce((s,v)=>s+(v.qtde||0),0);
  const tReceita=sel.reduce((s,v)=>s+(v.total||0),0);
  const tRecebido=sel.reduce((s,v)=>s+(v.valorRecebido||0),0);
  const tFrete=sel.reduce((s,v)=>s+(v.frete||0),0);
  const tPend=sel.filter(v=>v.status==='PENDENTE').reduce((s,v)=>s+(v.valorRecebido||v.total||0),0);
  const preco=tCocos>0?((tReceita-tFrete)/tCocos).toFixed(2):0;
  const kpi=document.getElementById('v-kpi-grid');
  if(kpi){
    const _nPend = sel.filter(v=>v.status==='PENDENTE').length;
    const _pendKpi = tPend>0
      ? '<div class="vkpi" style="border-color:var(--amarelo-border);cursor:pointer" onclick="abrirModalAReceber()" title="Ver pendentes"><div class="vkpi-label">A Receber</div><div class="vkpi-val" style="color:#854d0e">'+fmtR(tPend)+'</div><div class="vkpi-sub">'+_nPend+' venda'+(_nPend!==1?'s':'')+'</div></div>'
      : '';
    const _freteP = tReceita>0 ? Math.round(tFrete/tReceita*100)+'% da receita' : '';
    const _ticket = sel.length>0 ? fmtR(tReceita/sel.length) : '—';
    const _clkVendas = ' style="cursor:pointer" onclick="showVendasTab(\'lista\')" title="Ver vendas do período"';
    kpi.innerHTML=
      '<div class="vkpi destaque"'+_clkVendas+'><div class="vkpi-label">Cocos Vendidos</div><div class="vkpi-val">'+fmtNum(tCocos)+'</div><div class="vkpi-sub">'+sel.length+' vendas</div></div>'
     +'<div class="vkpi"'+_clkVendas+'><div class="vkpi-label">Receita Total</div><div class="vkpi-val">'+fmtR(tReceita)+'</div></div>'
     +'<div class="vkpi destaque"'+_clkVendas+'><div class="vkpi-label">Margem Líquida</div><div class="vkpi-val">'+fmtR(tReceita-tFrete)+'</div><div class="vkpi-sub">receita − frete</div></div>'
     +'<div class="vkpi"'+_clkVendas+'><div class="vkpi-label">Valor Recebido</div><div class="vkpi-val">'+fmtR(tRecebido)+'</div></div>'
     +'<div class="vkpi"><div class="vkpi-label">Frete Total</div><div class="vkpi-val">'+fmtR(tFrete)+'</div><div class="vkpi-sub">'+_freteP+'</div></div>'
     +'<div class="vkpi"><div class="vkpi-label">R$/Coco</div><div class="vkpi-val">R$ '+preco+'</div></div>'
     +'<div class="vkpi"><div class="vkpi-label">Ticket Médio</div><div class="vkpi-val">'+_ticket+'</div><div class="vkpi-sub">por venda</div></div>'
     +_pendKpi;
  }
  // ranking
  const pc={};
  sel.forEach(v=>{if(!pc[v.cliente])pc[v.cliente]={c:0,r:0,f:0};pc[v.cliente].c+=v.qtde||0;pc[v.cliente].r+=v.total||0;pc[v.cliente].f+=v.frete||0;});
  const rank=Object.entries(pc).sort((a,b)=>b[1].c-a[1].c).slice(0,8);
  const maxC=rank[0]?.[1].c||1;
  const rankEl=document.getElementById('v-ranking');
  if(rankEl){
    if(!rank.length){
      rankEl.innerHTML='<div style="color:var(--muted);font-size:13px;padding:20px 0">Nenhum dado no período</div>';
    }else{
      rankEl.innerHTML='';
      const totalCocosPeriodo=rank.reduce((s,[,d])=>s+d.c,0)||1;
      rank.forEach(([n,d],i)=>{
        const precoCli=d.c>0?((d.r-d.f)/d.c).toFixed(2):null;
        const w=Math.round(d.c/maxC*100);
        const pct=Math.round(d.c/totalCocosPeriodo*100);
        const div=document.createElement('div');
        div.className='vrank-row';
        div.style.cursor='pointer';
        div.title='Ver histórico de '+n;
        div.innerHTML='<span class="vrank-pos">'+(i+1)+'</span>'
          +'<span class="vrank-nome">'+escapeHtml(n)+'</span>'
          +'<div class="vrank-bar" style="width:'+w+'px"></div>'
          +'<span class="vrank-val" style="min-width:70px">'+fmtNum(d.c)+'</span>'
          +'<span style="font-size:11px;font-family:var(--font-mono);color:var(--muted);min-width:32px;text-align:right">'+pct+'%</span>'
          +'<span style="font-size:11px;font-family:var(--font-mono);color:var(--muted);min-width:56px;text-align:right">R$ '+(precoCli||'—')+'</span>';
        div.dataset.cli=n;
        div.addEventListener('click',function(){openClientePanel(this.dataset.cli);});
        rankEl.appendChild(div);
      });
    }
  }
  // gráficos
  renderGraficoVendas(db,ano);
  renderGraficoPreco(db,ano);
  renderComparativoAnual();
}


function renderGraficoPreco(db,ano){
  const canvas=document.getElementById('v-canvas-preco');
  if(!canvas)return;
  // montar labels e valores de R$/coco por mês
  let labels,vals;
  if(!ano||ano==='todos'){
    // por ano
    const as=[...new Set(db.map(v=>new Date(v.data+'T00:00:00').getFullYear()))].sort();
    labels=as.map(String);
    vals=as.map(a=>{
      const s=db.filter(v=>new Date(v.data+'T00:00:00').getFullYear()===a&&v.qtde>0&&v.total>0);
      const tQ=s.reduce((x,v)=>x+(v.qtde||0),0);
      const tR=s.reduce((x,v)=>x+(v.total||0),0);
      const tF=s.reduce((x,v)=>x+(v.frete||0),0);
      return tQ>0?parseFloat(((tR-tF)/tQ).toFixed(2)):0;
    });
  }else{
    labels=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    vals=Array.from({length:12},(_,i)=>i+1).map(m=>{
      const s=db.filter(v=>{const d=new Date(v.data+'T00:00:00');return d.getFullYear()===parseInt(ano)&&d.getMonth()+1===m&&v.qtde>0&&v.total>0;});
      const tQ=s.reduce((x,v)=>x+(v.qtde||0),0);
      const tR=s.reduce((x,v)=>x+(v.total||0),0);
      const tF=s.reduce((x,v)=>x+(v.frete||0),0);
      return tQ>0?parseFloat(((tR-tF)/tQ).toFixed(2)):0;
    });
  }
  if(vals.every(v=>v===0)){canvas.style.display='none';return;}
  canvas.style.display='block';
  const DPR=window.devicePixelRatio||1;
  const W=canvas.parentElement.clientWidth-32,H=160;
  canvas.style.width=W+'px';canvas.style.height=H+'px';
  canvas.width=W*DPR;canvas.height=H*DPR;
  const ctx=canvas.getContext('2d');ctx.scale(DPR,DPR);
  ctx.clearRect(0,0,W,H);
  const pad={t:16,r:16,b:36,l:52},gW=W-pad.l-pad.r,gH=H-pad.t-pad.b;
  const n=labels.length,nonZero=vals.filter(v=>v>0);
  const maxV=Math.max(...nonZero,1)*1.1,minV=nonZero.length?Math.max(0,Math.min(...nonZero)*0.9):0;
  const xP=i=>pad.l+(n===1?gW/2:i/(n-1)*gW),yP=v=>pad.t+gH*(1-(v-minV)/(maxV-minV||1));
  ctx.strokeStyle='rgba(200,223,192,0.5)';ctx.lineWidth=1;
  for(let i=0;i<=3;i++){const y=pad.t+gH*(1-i/3);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+gW,y);ctx.stroke();
    ctx.fillStyle='#7a9470';ctx.font='9px DM Mono,monospace';ctx.textAlign='right';
    ctx.fillText('R$'+(minV+(maxV-minV)*i/3).toFixed(2),pad.l-4,y+3);}
  // linha
  ctx.strokeStyle='#db2777';ctx.lineWidth=2;ctx.lineJoin='round';
  let started=false;
  vals.forEach((v,i)=>{if(v===0)return;if(!started){ctx.beginPath();ctx.moveTo(xP(i),yP(v));started=true;}else ctx.lineTo(xP(i),yP(v));});
  ctx.stroke();
  vals.forEach((v,i)=>{
    if(v>0){
      ctx.beginPath();ctx.arc(xP(i),yP(v),3.5,0,Math.PI*2);ctx.fillStyle='#db2777';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
      // valor acima do ponto
      ctx.fillStyle='#db2777';ctx.font='bold 9px DM Mono,monospace';ctx.textAlign='center';
      ctx.fillText('R$'+v.toFixed(2),xP(i),yP(v)-7);
    }
    ctx.fillStyle='#7a9470';ctx.font='9px DM Mono,monospace';ctx.textAlign='center';ctx.fillText(labels[i],xP(i),H-pad.b+13);
  });
}

function renderComparativoAnual(){
  const canvas=document.getElementById('v-canvas-comp-anual');
  if(!canvas)return;
  const db=loadVendas();
  const mesEl=document.getElementById('v-comp-mes');
  // inicializar select com mês atual se ainda não selecionado
  if(mesEl&&!mesEl.dataset.init){mesEl.value=String(new Date().getMonth()+1);mesEl.dataset.init='1';}
  const mes=parseInt(mesEl?.value||new Date().getMonth()+1);
  const anos=[...new Set(db.map(v=>new Date(v.data+'T00:00:00').getFullYear()))].sort();
  if(anos.length<2){canvas.style.display='none';return;}
  canvas.style.display='block';
  // cocos, receita e preço médio por ano para o mês selecionado
  const dados=anos.map(a=>{
    const s=db.filter(v=>{const d=new Date(v.data+'T00:00:00');return d.getFullYear()===a&&d.getMonth()+1===mes;});
    const cocos=s.reduce((x,v)=>x+(v.qtde||0),0);
    const receita=s.reduce((x,v)=>x+(v.total||0),0);
    const frete=s.reduce((x,v)=>x+(v.frete||0),0);
    const preco=cocos>0?((receita-frete)/cocos).toFixed(2):null;
    return{ano:a,cocos,receita,preco};
  });
  const DPR=window.devicePixelRatio||1;
  const W=canvas.parentElement.clientWidth-32,H=160;
  canvas.style.width=W+'px';canvas.style.height=H+'px';
  canvas.width=W*DPR;canvas.height=H*DPR;
  const ctx=canvas.getContext('2d');ctx.scale(DPR,DPR);
  ctx.clearRect(0,0,W,H);
  const pad={t:20,r:16,b:48,l:56},gW=W-pad.l-pad.r,gH=H-pad.t-pad.b;
  const n=dados.length,maxV=Math.max(...dados.map(d=>d.cocos),1);
  const barW=Math.min(48,(gW/n)*0.55),gap=gW/n;
  const CORES=['#1a7a6e','#22a745','#e0a800','#dc3545','#7c3aed'];
  // grid
  ctx.strokeStyle='rgba(200,223,192,0.6)';ctx.lineWidth=1;
  for(let i=0;i<=3;i++){const y=pad.t+gH*(1-i/3);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+gW,y);ctx.stroke();
    ctx.fillStyle='#7a9470';ctx.font='9px DM Mono,monospace';ctx.textAlign='right';ctx.fillText(fmtNum(Math.round(maxV*i/3)),pad.l-4,y+3);}
  dados.forEach((d,i)=>{
    const x=pad.l+i*gap+(gap-barW)/2;
    const h=d.cocos>0?(d.cocos/maxV)*gH:2;
    const y=pad.t+gH-h;
    ctx.fillStyle=CORES[i%CORES.length];
    ctx.beginPath();
    if(ctx.roundRect)ctx.roundRect(x,y,barW,h,[3,3,0,0]);else ctx.rect(x,y,barW,h);
    ctx.fill();
    if(d.cocos>0){ctx.fillStyle='#fff';ctx.font='bold 9px DM Mono,monospace';ctx.textAlign='center';
      if(h>14)ctx.fillText(fmtNum(d.cocos),x+barW/2,y+h/2+3);}
    // label ano
    ctx.fillStyle='#1a3a1a';ctx.font='bold 10px Syne,sans-serif';ctx.textAlign='center';
    ctx.fillText(d.ano,x+barW/2,H-pad.b+14);
    // preço médio abaixo do ano (linha separada, bem visível)
    if(d.preco){
      ctx.fillStyle='#db2777';ctx.font='bold 9px DM Mono,monospace';ctx.textAlign='center';
      ctx.fillText('R$'+d.preco,x+barW/2,H-pad.b+25);
    }
    // receita acima da barra
    if(d.receita>0){
      const topY=Math.max(y-5,pad.t+10);
      ctx.fillStyle='#5a7a52';ctx.font='bold 9px DM Mono,monospace';ctx.textAlign='center';
      ctx.fillText(fmtR(d.receita),x+barW/2,topY);
    }
  });
}

function renderGraficoVendas(db,ano){
  const canvas=document.getElementById('v-canvas-evolucao');
  if(!canvas)return;
  let labels,vals;
  if(!ano||ano==='todos'){
    const as=[...new Set(db.map(v=>new Date(v.data+'T00:00:00').getFullYear()))].sort();
    labels=as.map(String);
    vals=as.map(a=>db.filter(v=>new Date(v.data+'T00:00:00').getFullYear()===a).reduce((s,v)=>s+(v.qtde||0),0));
  }else{
    labels=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    vals=Array.from({length:12},(_,i)=>i+1).map(m=>
      db.filter(v=>{const d=new Date(v.data+'T00:00:00');return d.getFullYear()===parseInt(ano)&&d.getMonth()+1===m;})
        .reduce((s,v)=>s+(v.qtde||0),0));
  }
  if(vals.every(v=>v===0)){canvas.style.display='none';return;}
  canvas.style.display='block';
  const DPR=window.devicePixelRatio||1;
  const W=canvas.parentElement.clientWidth-32,H=180;
  canvas.style.width=W+'px';canvas.style.height=H+'px';
  canvas.width=W*DPR;canvas.height=H*DPR;
  const ctx=canvas.getContext('2d');ctx.scale(DPR,DPR);
  ctx.clearRect(0,0,W,H);
  const pad={t:20,r:16,b:36,l:56},gW=W-pad.l-pad.r,gH=H-pad.t-pad.b;
  const n=labels.length,maxV=Math.max(...vals,1);
  const xP=i=>pad.l+(n===1?gW/2:i/(n-1)*gW),yP=v=>pad.t+gH*(1-v/maxV);
  ctx.strokeStyle='rgba(200,223,192,0.6)';ctx.lineWidth=1;
  for(let i=0;i<=4;i++){const y=pad.t+gH*(1-i/4);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+gW,y);ctx.stroke();
    ctx.fillStyle='#7a9470';ctx.font='10px DM Mono,monospace';ctx.textAlign='right';ctx.fillText(fmtNum(Math.round(maxV*i/4)),pad.l-5,y+3);}
  const g=ctx.createLinearGradient(0,pad.t,0,pad.t+gH);g.addColorStop(0,'rgba(26,122,110,0.18)');g.addColorStop(1,'rgba(26,122,110,0.01)');
  ctx.beginPath();ctx.moveTo(xP(0),yP(vals[0]));
  for(let i=1;i<n;i++)ctx.lineTo(xP(i),yP(vals[i]));
  ctx.lineTo(xP(n-1),pad.t+gH);ctx.lineTo(xP(0),pad.t+gH);ctx.closePath();ctx.fillStyle=g;ctx.fill();
  ctx.strokeStyle='#1a7a6e';ctx.lineWidth=2.5;ctx.lineJoin='round';
  ctx.beginPath();vals.forEach((v,i)=>i===0?ctx.moveTo(xP(i),yP(v)):ctx.lineTo(xP(i),yP(v)));ctx.stroke();
  vals.forEach((v,i)=>{
    if(v>0){ctx.beginPath();ctx.arc(xP(i),yP(v),4,0,Math.PI*2);ctx.fillStyle='#1a7a6e';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();}
    ctx.fillStyle='#7a9470';ctx.font='10px DM Mono,monospace';ctx.textAlign='center';ctx.fillText(labels[i],xP(i),H-pad.b+14);});
}

function onAreaVenda(){
  const as=['A1','A2','C','D','MA','MDC','MDB'];
  const soma=as.reduce((s,a)=>s+(parseInt(document.getElementById('va-'+a)?.value)||0),0);
  const t=document.getElementById('va-total');
  if(t){t.value=soma||'';t.classList.toggle('filled',soma>0);}
  as.forEach(a=>{const el=document.getElementById('va-'+a);if(el)el.classList.toggle('filled',(parseInt(el.value)||0)>0);});
  calcVenda();
}
function calcVenda(){
  const q=parseInt(document.getElementById('va-total')?.value)||0;
  const qb=parseInt(document.getElementById('va-quebra')?.value)||0;
  const t=parseFloat(document.getElementById('v-total')?.value)||0;
  document.getElementById('vc-cocos').textContent=q>0?fmtNum(q)+(qb>0?' (+'+fmtNum(qb)+' quebra)':''):'—';
  const f=parseFloat(document.getElementById('v-frete')?.value)||0;
  document.getElementById('vc-preco').textContent=q>0&&t>0?'R$ '+((t-f)/q).toFixed(2):'—';
  calcVendaRecebido();
}
function onModoLitro(){
  const litro=document.getElementById('v-modo-litro').checked;
  document.getElementById('v-campos-litro').style.display=litro?'':'none';
  // Se é fábrica e litro ativado, mostrar campos fábrica
  const nome=(document.getElementById('v-cliente').value||'').trim().toUpperCase();
  const mapa=getMapaClientes();
  const isFab=mapa[nome]?.fabrica;
  document.getElementById('v-campos-fabrica').style.display=(litro&&isFab)?'':'none';
  document.getElementById('v-fab-indicadores').style.display=(litro&&isFab)?'':'none';
}

function _checkFabricaMode(){
  const nome=(document.getElementById('v-cliente').value||'').trim().toUpperCase();
  const mapa=getMapaClientes();
  const isFab=mapa[nome]?.fabrica;
  const litroChk=document.getElementById('v-modo-litro');
  if(isFab){
    litroChk.checked=true;
    document.getElementById('v-campos-litro').style.display='';
    document.getElementById('v-campos-fabrica').style.display='';
    document.getElementById('v-fab-indicadores').style.display='';
    // Pré-preencher frete do cadastro
    const clientes=loadClientesLocal();
    const cli=clientes.find(c=>c.nome===nome);
    if(cli&&cli.frete_por_ton){
      const el=document.getElementById('v-frete-ton');
      if(el&&!el.value)el.value=cli.frete_por_ton;
    }
    // Detectar contrato ativo
    _updateContratoInfo(nome);
  }else{
    document.getElementById('v-campos-fabrica').style.display='none';
    document.getElementById('v-fab-indicadores').style.display='none';
  }
}

function _updateContratoInfo(cliente){
  const contrato=getContratoAtivo(cliente);
  const infoEl=document.getElementById('v-contrato-info');
  const modoBox=document.getElementById('v-modo-venda-box');
  if(contrato){
    const agora=new Date();
    const mes=agora.getMonth()+1;
    const cota=getCotaMes(contrato,mes);
    const usado=getLitrosUsadosMes(cliente,contrato.id,agora.getFullYear(),mes);
    const disp=cota?(cota.litros-usado):0;
    const mesNome=MESES_NOME[mes-1];
    infoEl.innerHTML=`<strong>${contrato.descricao||'Contrato '+contrato.ano}</strong><br>`+
      (cota?`Cota ${mesNome}: ${fmtNum(cota.litros)}L · R$ ${cota.valor_litro.toFixed(2)}/L<br>`+
      `Usado: ${fmtNum(Math.round(usado))}L · Disponível: <strong>${fmtNum(Math.round(disp))}L</strong>`
      :`Sem cota para ${mesNome}`);
    infoEl.style.display='';
    modoBox.style.display='';
    // Default: contrato se tem cota disponível
    if(disp>0){
      const el=document.querySelector('input[name="v-modo-venda"][value="contrato"]');
      if(el) el.checked=true;
    }else{
      const el=document.querySelector('input[name="v-modo-venda"][value="spot"]');
      if(el) el.checked=true;
    }
    window._vContratoAtivo=contrato;
    window._vCotaDisp=disp>0?disp:0;
    window._vCotaValor=cota?cota.valor_litro:0;
    onModoVendaChange();
  }else{
    infoEl.style.display='none';
    modoBox.style.display='none';
    const spotRadio=document.querySelector('input[name="v-modo-venda"][value="spot"]');
    if(spotRadio) spotRadio.checked=true;
    window._vContratoAtivo=null;
    window._vCotaDisp=0;
    window._vCotaValor=0;
    onModoVendaChange();
  }
}

function onModoVendaChange(){
  const modo=document.querySelector('input[name="v-modo-venda"]:checked')?.value||'spot';
  document.getElementById('v-spot-fields').style.display=(modo==='spot'||modo==='misto')?'':'none';
  document.getElementById('v-misto-fields').style.display=modo==='misto'?'':'none';
  if(document.getElementById('v-campos-fabrica')?.style.display!=='none') calcFabrica();
}

function calcFabrica(){
  const qtdeFab=parseInt(document.getElementById('v-qtde-fabrica')?.value)||0;
  const qtdeNf=parseInt(document.getElementById('va-total')?.value)||0;
  const fora=parseInt(document.getElementById('v-fora')?.value)||0;
  const litragem=parseFloat(document.getElementById('v-litragem')?.value)||0;
  const pesoKg=parseFloat(document.getElementById('v-peso')?.value)||0;
  const freteTon=parseFloat(document.getElementById('v-frete-ton')?.value)||0;

  // Diferença de contagem
  const diffEl=document.getElementById('v-diff-contagem');
  if(qtdeFab>0&&qtdeNf>0){
    const diff=qtdeFab-qtdeNf;
    const pct=((diff/qtdeNf)*100).toFixed(1);
    const cor=Math.abs(pct)<2?'var(--verde)':Math.abs(pct)<5?'var(--amarelo)':'var(--vermelho)';
    diffEl.style.display='';
    diffEl.style.background=Math.abs(pct)<2?'var(--verde-bg)':Math.abs(pct)<5?'var(--amarelo-bg)':'var(--vermelho-bg)';
    diffEl.style.color=cor;
    diffEl.innerHTML=`⚠ Diferença: ${diff>0?'+':''}${fmtNum(diff)} cocos (${pct}%)`;
  }else{diffEl.style.display='none';}

  // Frete total (R$/ton × peso em tons)
  const freteTotalCalc=freteTon>0&&pesoKg>0?(freteTon*(pesoKg/1000)):0;
  const freteEl=document.getElementById('v-frete');
  if(freteEl&&freteTotalCalc>0)freteEl.value=freteTotalCalc.toFixed(2);

  // Modo venda e cálculo do valor total
  const modo=document.querySelector('input[name="v-modo-venda"]:checked')?.value||'spot';
  const contrato=window._vContratoAtivo;
  let receitaBruta=0;
  let litrosContrato=0,litrosSpot=0,vlSpot=0,vlContrato=window._vCotaValor||0;

  if(modo==='contrato'&&contrato&&litragem>0){
    litrosContrato=litragem;
    receitaBruta=litragem*vlContrato;
    document.getElementById('v-vlitro').value=vlContrato.toFixed(2);
  }else if(modo==='misto'&&contrato&&litragem>0){
    const disp=window._vCotaDisp||0;
    litrosContrato=Math.min(litragem,disp);
    litrosSpot=litragem-litrosContrato;
    vlSpot=parseFloat(document.getElementById('v-vlitro-spot')?.value)||0;
    receitaBruta=(litrosContrato*vlContrato)+(litrosSpot*vlSpot);
    const mistoEl=document.getElementById('v-misto-fields');
    mistoEl.innerHTML=`Contrato: ${fmtNum(Math.round(litrosContrato))}L × R$ ${vlContrato.toFixed(2)} = R$ ${fmtR(litrosContrato*vlContrato)}<br>`+
      `Spot: ${fmtNum(Math.round(litrosSpot))}L × R$ ${vlSpot.toFixed(2)} = R$ ${fmtR(litrosSpot*vlSpot)}`;
    if(receitaBruta>0){document.getElementById('v-total').value=receitaBruta.toFixed(2);}
  }else if(modo==='spot'&&litragem>0){
    vlSpot=parseFloat(document.getElementById('v-vlitro-spot')?.value)||parseFloat(document.getElementById('v-vlitro')?.value)||0;
    litrosSpot=litragem;
    receitaBruta=litragem*vlSpot;
    if(vlSpot>0)document.getElementById('v-vlitro').value=vlSpot.toFixed(2);
  }

  if(receitaBruta>0&&modo!=='spot'){
    document.getElementById('v-total').value=receitaBruta.toFixed(2);
  }

  // Indicadores
  const totalVal=parseFloat(document.getElementById('v-total')?.value)||0;
  const freteTotal=parseFloat(document.getElementById('v-frete')?.value)||0;
  const receitaLiq=totalVal-freteTotal;
  const qtdeRef=qtdeFab||qtdeNf;

  // ml/fruto (fábrica inclui fora no denominador)
  const mlFruto=(litragem>0&&(qtdeRef+fora)>0)?Math.round(litragem/(qtdeRef+fora)*1000):0;
  document.getElementById('vc-ml-fruto').textContent=mlFruto>0?mlFruto+'ml':'—';
  const classif=classificarMlFruto(mlFruto);
  const badgeEl=document.getElementById('vc-ml-badge');
  if(classif&&mlFruto>0){
    badgeEl.style.display='';
    badgeEl.innerHTML=`<span style="display:inline-block;padding:4px 14px;border-radius:6px;font-size:12px;font-weight:700;background:${classif.bg};color:${classif.cor}">${classif.label} — ${mlFruto}ml/fruto</span>`;
  }else{badgeEl.style.display='none';}

  document.getElementById('vc-kg-fruto').textContent=(pesoKg>0&&qtdeRef>0)?(pesoKg/qtdeRef).toFixed(2)+' kg':'—';
  document.getElementById('vc-l-ton').textContent=(litragem>0&&pesoKg>0)?Math.round(litragem/(pesoKg/1000))+' L/ton':'—';

  // R$/L CIF, Frete/L, R$/L FOB
  const rlCif=(totalVal>0&&litragem>0)?(totalVal/litragem):0;
  const freteL=(freteTotal>0&&litragem>0)?(freteTotal/litragem):0;
  const rlFob=rlCif-freteL;
  document.getElementById('vc-rl-cif').textContent=rlCif>0?'R$ '+rlCif.toFixed(3):'—';
  document.getElementById('vc-frete-l').textContent=freteL>0?'R$ '+freteL.toFixed(3):'—';
  document.getElementById('vc-rl-fob').textContent=rlFob>0?'R$ '+rlFob.toFixed(3):'—';

  // Frete/coco, R$/coco efetivo
  document.getElementById('vc-frete-coco').textContent=(freteTotal>0&&qtdeRef>0)?'R$ '+(freteTotal/qtdeRef).toFixed(3):'—';
  document.getElementById('vc-rcoco-efet').textContent=(receitaLiq>0&&qtdeRef>0)?'R$ '+(receitaLiq/qtdeRef).toFixed(3):'—';

  calcVendaRecebido();
}

function parsePlanilhaFabrica(){
  const raw=(document.getElementById('v-import-text')?.value||'').trim();
  if(!raw)return;
  const lines=raw.split('\n').filter(l=>l.trim());
  const numVal=s=>{const n=parseFloat((s||'').replace(/\./g,'').replace(',','.'));return isNaN(n)?0:n;};
  const intVal=s=>{const n=parseInt((s||'').replace(/\./g,'').replace(',','.'));return isNaN(n)?0:n;};
  let cols=null;
  // Função auxiliar: encontra índice de coluna pelo header
  function findCol(...keywords){
    if(!cols)return -1;
    for(const kw of keywords){
      const idx=cols.findIndex(c=>c.toUpperCase().includes(kw.toUpperCase()));
      if(idx!==-1)return idx;
    }
    return -1;
  }
  function colVal(idx){return idx>=0?parts[idx]:null;}
  let parts;
  for(const line of lines){
    parts=line.split('\t').map(s=>s.trim());
    if(parts.length<4)continue;
    const isHeader=parts.some(p=>/^(FORNEC|NF|QTD|PREÇO|PLACA|FORA|BRIX|ML)/i.test(p));
    if(isHeader){cols=parts;continue;}
    let m={};
    if(cols){
      m.qtde_fabrica=intVal(colVal(findCol('QTD CONT','CONT')));
      m.qtde_nf=intVal(colVal(findCol('QTD NF')));
      m.litragem=numVal(colVal(findCol('QTD LT','LITRO','LT')));
      m.fora=intVal(colVal(findCol('FORA')));
      m.ml_fruto=numVal(colVal(findCol('ML FRUTO','ML')));
      m.brix=numVal(colVal(findCol('BRIX')));
      m.placa=colVal(findCol('PLACA'))||'';
      m.preco_litro=numVal(colVal(findCol('PREÇO LT','PRECO','PREÇO')));
      m.nf_venda=colVal(findCol('NF DE VENDA','NF VENDA'))||'';
      m.nf_compl=colVal(findCol('NF COMPL','COMPL'))||'';
      m.valor_compl=numVal(colVal(findCol('VL COMPL','VL. COMPL')));
    }else{
      COLUNAS_PLANILHA_FABRICA.forEach((col,i)=>{if(i<parts.length)m[col]=parts[i];});
      m.qtde_fabrica=intVal(m.qtde_fabrica);m.qtde_nf=intVal(m.qtde_nf);
      m.litragem=numVal(m.litragem);m.fora=intVal(m.fora);
      m.ml_fruto=numVal(m.ml_fruto);m.brix=numVal(m.brix);
      m.preco_litro=numVal(m.preco_litro);m.valor_compl=numVal(m.valor_complementar||0);
      m.nf_venda=m.nf_venda||'';m.nf_compl=m.nf_complementar||'';m.placa=m.placa||'';
    }
    // Preencher campos do formulário
    const fill=(id,v)=>{const el=document.getElementById(id);if(el&&v)el.value=v;};
    fill('v-qtde-fabrica',m.qtde_fabrica);
    if(m.qtde_nf){const el=document.getElementById('va-total');if(el){el.value=m.qtde_nf;el.classList.add('filled');}}
    fill('v-litragem',m.litragem);fill('v-fora',m.fora);fill('v-brix',m.brix);
    fill('v-placa',m.placa);fill('v-vlitro',m.preco_litro);
    fill('v-nf',m.nf_venda);fill('v-nf-compl',m.nf_compl);fill('v-val-nf-compl',m.valor_compl);
    const prev=document.getElementById('v-import-preview');
    prev.style.display='';
    prev.innerHTML=`<div style="padding:10px;background:var(--verde-bg);border:1px solid var(--verde-border);border-radius:8px;margin-top:8px;font-size:12px">
      <strong>✅ Dados extraídos — revise os campos abaixo</strong><br>
      Qtde Fábrica: ${fmtNum(m.qtde_fabrica)} · Qtde NF: ${fmtNum(m.qtde_nf)} · Litragem: ${fmtNum(Math.round(m.litragem))}L
      ${m.fora?' · Fora: '+m.fora:''}${m.brix?' · BRIX: '+m.brix:''}
      ${m.preco_litro?' · R$/L: '+m.preco_litro.toFixed(2):''}
    </div>`;
    calcFabrica();
    break;
  }
}
function calcVendaLitro(){
  const l=parseFloat(document.getElementById('v-litragem')?.value)||0;
  const vl=parseFloat(document.getElementById('v-vlitro')?.value)||0;
  const q=parseInt(document.getElementById('va-total')?.value)||0;
  if(l>0&&vl>0){
    document.getElementById('v-total').value=(l*vl).toFixed(2);
    document.getElementById('vc-litro').textContent='R$ '+vl.toFixed(2);
    document.getElementById('vc-ml').textContent=q>0?Math.round(l/q*1000)+'ml':'—';
  }
  calcVenda();
  // Atualizar indicadores fábrica se ativo
  if(document.getElementById('v-campos-fabrica')?.style.display!=='none')calcFabrica();
}
function calcVendaRecebido(){
  const t=parseFloat(document.getElementById('v-total')?.value)||0;
  const f=parseFloat(document.getElementById('v-frete')?.value)||0;
  const icms=parseFloat(document.getElementById('v-icms')?.value)||0;
  // Mostrar/ocultar ICMS+Seguro row quando tem frete
  const custosRow=document.getElementById('v-custos-frete-row');
  if(custosRow) custosRow.style.display=f>0?'':'none';
  // Auto-seguro: 0,07% × (total + frete)
  const seguroEl=document.getElementById('v-seguro');
  if(seguroEl && seguroEl.dataset.manual!=='1' && t>0){
    const autoSeg=(t+f)*0.0007;
    seguroEl.value=autoSeg>0?autoSeg.toFixed(2):'';
  }
  if(seguroEl && !seguroEl.value) seguroEl.dataset.manual='';
  const seguro=parseFloat(seguroEl?.value)||0;
  const descEl=document.getElementById('v-seguro-desc');
  if(descEl) descEl.textContent=t>0?'0,07% × R$ '+Math.round(t+f).toLocaleString('pt-BR')+' = R$ '+((t+f)*0.0007).toFixed(2):'';
  const deducoes=f+(f>0?(icms+seguro):0);
  const r=document.getElementById('v-recebido');
  if(r&&t>0)r.value=(t-deducoes).toFixed(2);
}

function onClienteChange(){
  const nome=(document.getElementById('v-cliente').value||'').trim().toUpperCase();
  const mapa=getMapaClientes();
  const info=mapa[nome];
  if(info){
    const ufSel=document.getElementById('v-uf-destino');
    const cidadeInp=document.getElementById('v-cidade-destino');
    if(ufSel)ufSel.value=info.uf||'';
    if(info.uf&&info.uf!=='FÁBRICA'){
      onUfDestinoChange(true).then(()=>{
        if(cidadeInp)cidadeInp.value=info.cidade||'';
      });
    }else{
      if(cidadeInp)cidadeInp.value=info.cidade||'';
    }
  }
  _checkFabricaMode();
}

let _salvandoVenda = false;
async function salvarVenda(){
  if (_salvandoVenda) return;
  // tratar edição — remover original se estiver editando
  const _dataEl=document.getElementById('v-data');
  const _editandoId=parseInt(_dataEl?.dataset.editandoId||'0');
  const data=document.getElementById('v-data').value;
  const cliente=(document.getElementById('v-cliente').value||'').trim().toUpperCase();
  const nf=(document.getElementById('v-nf').value||'RECIBO').trim().toUpperCase()||'RECIBO';
  const qtde=parseInt(document.getElementById('va-total')?.value)||0;
  const total=parseFloat(document.getElementById('v-total')?.value)||0;
  const frete=parseFloat(document.getElementById('v-frete')?.value)||0;
  const recebido=parseFloat(document.getElementById('v-recebido')?.value)||0;
  const status=document.getElementById('v-status').value;
  const dep=document.getElementById('v-deposito').value||null;
  const ufDestino=document.getElementById('v-uf-destino')?.value||null;
  const cidadeDestino=(document.getElementById('v-cidade-destino')?.value||'').trim()||null;
  const litro=document.getElementById('v-modo-litro').checked;
  const erro=document.getElementById('v-erro');
  if(!data){erro.textContent='Informe a data.';erro.style.display='block';return;}
  if(!cliente){erro.textContent='Informe o cliente.';erro.style.display='block';return;}
  if(qtde===0){erro.textContent='Informe a quantidade de cocos.';erro.style.display='block';return;}
  if(total===0){erro.textContent='Informe o valor total.';erro.style.display='block';return;}
  if(!status){erro.textContent='Selecione o status (Pago ou Pendente).';erro.style.display='block';return;}
  erro.style.display='none';
  // Após validação: travar contra double-click
  _salvandoVenda = true;
  const _btnSalvar = document.querySelector('button[onclick="salvarVenda()"]');
  if (_btnSalvar) { _btnSalvar.disabled = true; _btnSalvar.dataset.origText = _btnSalvar.textContent; _btnSalvar.textContent = '⏳ Salvando...'; }
  try {
  // Aplicar deleção da venda original (se editando) só agora, depois da validação
  if(_editandoId){
    const _db=loadVendas();
    saveVendas(_db.filter(v=>v.id!==_editandoId));
    delete _dataEl.dataset.editandoId;
  }
  const areas={};
  ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{const v=parseInt(document.getElementById('va-'+a)?.value)||0;if(v>0)areas[a]=v;});
  const quebra=parseInt(document.getElementById('va-quebra')?.value)||0;
  const mapa=getMapaClientes();
  const isFab=mapa[cliente]?.fabrica;
  const db=loadVendas();
  const icmsVal=frete>0?(parseFloat(document.getElementById('v-icms')?.value)||0):0;
  const seguroVal=frete>0?(parseFloat(document.getElementById('v-seguro')?.value)||0):0;
  const venda={id:Date.now(),data,cliente,nf,areas,qtde,total,frete,quebra,valorRecebido:recebido,status,dataDeposito:dep,
    icmsValor:icmsVal||null,seguroValor:seguroVal||null,
    ufDestino:ufDestino,cidadeDestino:cidadeDestino,
    tipoVenda:litro?'litro':'coco',
    pesoKg:litro?(parseFloat(document.getElementById('v-peso')?.value)||0):null,
    litragem:litro?(parseFloat(document.getElementById('v-litragem')?.value)||0):null,
    vPorLitro:litro?(parseFloat(document.getElementById('v-vlitro')?.value)||0):null};
  // Campos fábrica
  if(isFab&&litro){
    venda.qtdeFabrica=parseInt(document.getElementById('v-qtde-fabrica')?.value)||null;
    venda.fora=parseInt(document.getElementById('v-fora')?.value)||0;
    venda.brix=parseFloat(document.getElementById('v-brix')?.value)||null;
    venda.placa=(document.getElementById('v-placa')?.value||'').trim()||null;
    venda.ticket=(document.getElementById('v-ticket')?.value||'').trim()||null;
    venda.nfComplementar=(document.getElementById('v-nf-compl')?.value||'').trim()||null;
    venda.valorNfComplementar=parseFloat(document.getElementById('v-val-nf-compl')?.value)||null;
    venda.fretePorTon=parseFloat(document.getElementById('v-frete-ton')?.value)||null;
    const modo=document.querySelector('input[name="v-modo-venda"]:checked')?.value||'spot';
    venda.modoVenda=modo;
    const contrato=window._vContratoAtivo;
    if(contrato)venda.contratoId=contrato.id;
    if(modo==='contrato'){
      venda.litrosContrato=venda.litragem;
      venda.litrosSpot=null;
      venda.valorLitroSpot=null;
    }else if(modo==='misto'){
      venda.litrosContrato=Math.min(venda.litragem,window._vCotaDisp||0);
      venda.litrosSpot=venda.litragem-venda.litrosContrato;
      venda.valorLitroSpot=parseFloat(document.getElementById('v-vlitro-spot')?.value)||null;
    }else{
      venda.litrosContrato=null;
      venda.litrosSpot=venda.litragem;
      venda.valorLitroSpot=parseFloat(document.getElementById('v-vlitro-spot')?.value)||parseFloat(document.getElementById('v-vlitro')?.value)||null;
    }
  }
  db.push(venda);
  saveVendas(db);
  const vendaSalva = await salvarVendaSupabase(db[db.length-1]);
  // Vincular à programação se veio de lá
  if (window._progVendaLinkId && vendaSalva?.id) {
    try {
      await _SB.from('programacao').update({
        venda_id: vendaSalva.id,
        status: 'entregue',
        updated_at: new Date().toISOString()
      }).eq('id', window._progVendaLinkId);
    } catch(e) { console.error('Erro ao vincular programação:', e); }
    window._progVendaLinkId = null;
  }
  limparFormVenda();
  showVendasTab('lista');
  showToast('✓ Venda registrada — '+fmtNum(qtde)+' cocos · '+fmtR(total));
  await initVendas();
  } finally {
    _salvandoVenda = false;
    if (_btnSalvar) { _btnSalvar.disabled = false; _btnSalvar.textContent = _btnSalvar.dataset.origText || 'Salvar'; }
  }
}

function limparFormVenda(){
  ['v-cliente','v-nf','v-total','v-frete','v-recebido','v-peso','v-litragem','v-vlitro','v-deposito','v-cidade-destino'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  // Reset ICMS + Seguro
  const vIcms=document.getElementById('v-icms');if(vIcms)vIcms.value=96;
  const vSeguro=document.getElementById('v-seguro');if(vSeguro){vSeguro.value='';vSeguro.dataset.manual='';}
  const vCustosRow=document.getElementById('v-custos-frete-row');if(vCustosRow)vCustosRow.style.display='none';
  const ufSel=document.getElementById('v-uf-destino');if(ufSel)ufSel.value='';
  ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{const el=document.getElementById('va-'+a);if(el){el.value='';el.classList.remove('filled');}});
  const t=document.getElementById('va-total');if(t){t.value='';t.classList.remove('filled');}
  const qb=document.getElementById('va-quebra');if(qb){qb.value='';qb.classList.remove('filled');}
  document.getElementById('v-data').value=today();
  document.getElementById('v-status').value='';
  document.getElementById('v-modo-litro').checked=false;
  document.getElementById('v-campos-litro').style.display='none';
  document.getElementById('v-campos-fabrica').style.display='none';
  document.getElementById('v-fab-indicadores').style.display='none';
  document.getElementById('v-erro').style.display='none';
  // Limpar campos fábrica
  ['v-qtde-fabrica','v-fora','v-brix','v-placa','v-ticket','v-frete-ton','v-nf-compl','v-val-nf-compl','v-vlitro-spot','v-import-text'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('v-import-preview').style.display='none';
  document.getElementById('v-diff-contagem').style.display='none';
  document.getElementById('v-contrato-info').style.display='none';
  document.getElementById('v-misto-fields').style.display='none';
  document.getElementById('v-spot-fields').style.display='none';
  const modoBox=document.getElementById('v-modo-venda-box');if(modoBox)modoBox.style.display='none';
  const spotRadio=document.querySelector('input[name="v-modo-venda"][value="spot"]');if(spotRadio)spotRadio.checked=true;
  document.getElementById('vc-ml-badge').style.display='none';
  window._vContratoAtivo=null;window._vCotaDisp=0;window._vCotaValor=0;
  ['vc-cocos','vc-preco','vc-litro','vc-ml','vc-ml-fruto','vc-kg-fruto','vc-l-ton','vc-rl-cif','vc-frete-l','vc-rl-fob','vc-frete-coco','vc-rcoco-efet'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='—';});
}

// Estado de ordenação da lista de vendas
let _vlSortCol = 'data';
let _vlSortDir = 'desc'; // 'asc' ou 'desc'

function sortVendasLista(col) {
  if (_vlSortCol === col) {
    _vlSortDir = _vlSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    _vlSortCol = col;
    _vlSortDir = (col === 'cliente') ? 'asc' : 'desc';
  }
  renderVendasLista();
}

function renderVendasLista(){
  const db=loadVendas();
  const busca=(document.getElementById('vl-busca')?.value||'').trim().toLowerCase();
  const ano=window._vendaAnoAtivo||'todos';
  const mes=window._vendaMesAtivo||'todos';
  const st=document.getElementById('vl-status')?.value||'todos';
  let lista=filtrarVendas(db,ano,mes);
  if(busca)lista=lista.filter(v=>v.cliente.toLowerCase().includes(busca));
  if(st!=='todos')lista=lista.filter(v=>v.status===st);

  // Ordenação dinâmica
  const dir = _vlSortDir === 'asc' ? 1 : -1;
  lista.sort((a, b) => {
    switch (_vlSortCol) {
      case 'data': return dir * a.data.localeCompare(b.data);
      case 'cliente': return dir * a.cliente.localeCompare(b.cliente);
      case 'nf': return dir * (String(a.nf||'')).localeCompare(String(b.nf||''));
      case 'qtde': return dir * ((a.qtde||0) - (b.qtde||0));
      case 'total': return dir * ((a.total||0) - (b.total||0));
      case 'frete': return dir * ((a.frete||0) - (b.frete||0));
      case 'recebido': return dir * ((a.valorRecebido||0) - (b.valorRecebido||0));
      case 'preco': {
        const pa = a.qtde>0&&a.total>0 ? (a.total-(a.frete||0))/a.qtde : 0;
        const pb = b.qtde>0&&b.total>0 ? (b.total-(b.frete||0))/b.qtde : 0;
        return dir * (pa - pb);
      }
      case 'status': return dir * (a.status||'').localeCompare(b.status||'');
      default: return dir * a.data.localeCompare(b.data);
    }
  });

  // Atualizar setas nos headers
  const thead = document.getElementById('vl-thead');
  if (thead) {
    thead.querySelectorAll('th[data-sort]').forEach(th => {
      const col = th.dataset.sort;
      const label = th.textContent.replace(/ [▲▼]/g, '').trim();
      if (col === _vlSortCol) {
        th.textContent = label + (_vlSortDir === 'asc' ? ' ▲' : ' ▼');
        th.style.color = 'var(--forest)';
      } else {
        th.textContent = label;
        th.style.color = '';
      }
      th.onclick = () => sortVendasLista(col);
    });
  }
  const tC=lista.reduce((s,v)=>s+(v.qtde||0),0);
  const tR=lista.reduce((s,v)=>s+(v.total||0),0);
  const tRec=lista.reduce((s,v)=>s+(v.valorRecebido||0),0);
  const tbody=document.getElementById('vl-tbody');
  if(!tbody)return;
  tbody.innerHTML='';
  lista.forEach(v=>{
    const [y,m,d]=v.data.split('-');
    const pc=v.qtde>0&&v.total>0?((v.total-(v.frete||0))/v.qtde).toFixed(2):'—';
    const badge=v.status==='PAGO'
      ?'<span class="badge-pago">PAGO</span>'
      :'<span class="badge-pendente">PENDENTE</span>';
    const tr=document.createElement('tr');
    if(v.status==='PENDENTE')tr.classList.add('pendente');
    tr.style.cursor='pointer';
    tr.dataset.cli=v.cliente;
    tr.innerHTML=
      '<td style="font-family:var(--font-mono);white-space:nowrap">'+d+'/'+m+'/'+y+'</td>'
     +'<td style="font-weight:700;color:var(--forest)">'+escapeHtml(v.cliente)+'</td>'
     +'<td style="font-family:var(--font-mono);color:var(--muted)">'+escapeHtml(v.nf)+'</td>'
     +'<td style="font-family:var(--font-mono)">'+fmtNum(v.qtde)+'</td>'
     +'<td style="font-family:var(--font-mono)">'+fmtR(v.total)+'</td>'
     +'<td style="font-family:var(--font-mono);color:var(--muted)">'+(v.frete>0?fmtR(v.frete):'—')+'</td>'
     +'<td style="font-family:var(--font-mono)">'+fmtR(v.valorRecebido)+'</td>'
     +'<td style="font-family:var(--font-mono);color:var(--muted)">'+(pc!=='—'?'R$ '+pc:'—')+'</td>'
     +'<td>'+badge+'</td>'
     +'<td style="white-space:nowrap">'
       +'<button class="btn-edit-venda" data-id="'+v.id+'" style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:13px;margin-right:4px" title="Editar">✏️</button>'
       +'<button class="btn-del-venda" data-id="'+v.id+'" style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:14px" title="Excluir">✕</button>'
     +'</td>';
    tr.addEventListener('click', function(e){ if(!e.target.closest('.btn-edit-venda,.btn-del-venda')) openClientePanel(this.dataset.cli); });
    tr.querySelector('.btn-edit-venda').addEventListener('click', function(){ editarVenda(parseInt(this.dataset.id)); });
    tr.querySelector('.btn-del-venda').addEventListener('click', function(){ excluirVenda(parseInt(this.dataset.id)); });
    tbody.appendChild(tr);
  });
  if(!lista.length){
    const tr=document.createElement('tr');
    tr.innerHTML='<td colspan="10" style="text-align:center;padding:32px;color:var(--muted)">Nenhuma venda encontrada</td>';
    tbody.appendChild(tr);
  }
  const cnt=document.getElementById('vl-count');
  if(cnt){const tFrC=lista.reduce((s,v)=>s+(v.frete||0),0);const pmC=tC>0?'R$ '+((tR-tFrC)/tC).toFixed(2):'';cnt.textContent=lista.length+' venda'+(lista.length!==1?'s':'')+' · '+fmtNum(tC)+' cocos'+(pmC?' · '+pmC+'/coco':'');}
  const rod=document.getElementById('vl-rodape');
  if(rod){
    rod.innerHTML='';
    if(lista.length){
      const tFr=lista.reduce((s,v)=>s+(v.frete||0),0);
      const pm=tC>0?'R$ '+((tR-tFr)/tC).toFixed(2):'—';
      const tr=document.createElement('tr');
      tr.style.cssText='font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--forest);border-top:2px solid var(--border)';
      tr.innerHTML=
        '<td></td>'  // DATA
       +'<td></td>'  // CLIENTE
       +'<td></td>'  // NF
       +'<td>'+fmtNum(tC)+'</td>'  // COCOS
       +'<td>'+fmtR(tR)+'</td>'  // TOTAL
       +'<td>'+fmtR(tFr)+'</td>'  // FRETE
       +'<td>'+fmtR(tRec)+'</td>'  // RECEBIDO
       +'<td>R$ '+pm+'</td>'  // R$/COCO
       +'<td></td>'  // STATUS
       +'<td></td>';  // AÇÕES
      rod.appendChild(tr);
    }
  }
}

function filtrarVendasPendentesCliente(nome){
  // Limpa filtros de ano/mês para mostrar todas as pendentes do cliente
  window._vendaAnoAtivo='todos';
  window._vendaMesAtivo='todos';
  // Coloca nome no campo de busca da aba pendentes
  showVendasTab('pendentes');
  const buscaEl=document.getElementById('vp-busca');
  if(buscaEl){buscaEl.value=nome;}
  renderVendasPendentes();
}

function renderVendasPendentes(){
  const db=loadVendas();
  const ano=window._vendaAnoAtivo||'todos';
  const mes=window._vendaMesAtivo||'todos';
  const busca=(document.getElementById('vp-busca')?.value||'').trim().toLowerCase();
  let pend=db.filter(v=>v.status==='PENDENTE');
  // filtrar por ano/mês
  pend=filtrarVendas(pend,ano,mes);
  // filtrar por busca
  if(busca)pend=pend.filter(v=>v.cliente.toLowerCase().includes(busca)||(v.nf||'').toLowerCase().includes(busca));
  pend.sort((a,b)=>a.data.localeCompare(b.data));
  const wrap=document.getElementById('v-pendentes-wrap');
  if(!wrap)return;
  const totalGeral=db.filter(v=>v.status==='PENDENTE').length;
  const cnt=document.getElementById('vp-count');
  if(cnt)cnt.textContent=pend.length+' de '+totalGeral+' pendente'+(totalGeral!==1?'s':'');
  if(!pend.length){wrap.innerHTML='<div style="text-align:center;padding:48px;color:var(--muted);font-size:14px">✅ Nenhuma venda pendente'+(ano!=='todos'||mes!=='todos'||busca?' no filtro selecionado':'')+'!</div>'+(totalGeral>0&&(ano!=='todos'||mes!=='todos')?'<div style="text-align:center;color:var(--muted);font-size:12px;margin-top:-32px">'+totalGeral+' pendente'+(totalGeral!==1?'s':'')+' no total — limpe os filtros para ver todos</div>':'');return;}
  const tot=pend.reduce((s,v)=>s+(v.valorRecebido||v.total||0),0);
  const tCocos=pend.reduce((s,v)=>s+(v.qtde||0),0);
  wrap.innerHTML=`<div style="font-size:13px;font-weight:700;color:var(--vermelho);margin-bottom:16px">${pend.length} pendente${pend.length!==1?'s':''} · ${fmtR(tot)} a receber · ${fmtNum(tCocos)} cocos</div>
    <div style="overflow-x:auto"><table class="vtable"><thead><tr><th>DATA</th><th>CLIENTE</th><th>NF</th><th>COCOS</th><th>VALOR</th><th>A RECEBER</th><th>AÇÃO</th></tr></thead><tbody>
    ${pend.map(v=>{const[y,m,d]=v.data.split('-');return`<tr class="pendente">
      <td style="font-family:var(--font-mono)">${d}/${m}/${y}</td><td style="font-weight:700;cursor:pointer;color:var(--forest);text-decoration:underline" onclick="editarVenda(${v.id})" title="Editar venda">${v.cliente}</td>
      <td style="font-family:var(--font-mono);color:var(--muted)">${v.nf}</td>
      <td style="font-family:var(--font-mono)">${fmtNum(v.qtde)}</td>
      <td style="font-family:var(--font-mono)">${fmtR(v.total)}</td>
      <td style="font-family:var(--font-mono);font-weight:700">${fmtR(v.valorRecebido||v.total)}</td>
      <td><button class="btn btn-primary" style="font-size:11px;padding:5px 12px" onclick="marcarPago(${v.id})">✓ Pago</button></td>
    </tr>`;}).join('')}
    </tbody><tfoot><tr style="font-weight:800"><td colspan="3">TOTAL</td><td style="font-family:var(--font-mono)">${fmtNum(tCocos)}</td><td style="font-family:var(--font-mono)">${fmtR(pend.reduce((s,v)=>s+(v.total||0),0))}</td><td style="font-family:var(--font-mono)">${fmtR(tot)}</td><td></td></tr></tfoot></table></div>`;
}

function abrirModalAReceber(){
  const db=loadVendas();
  const ano=window._vendaAnoAtivo||'todos';
  const mes=window._vendaMesAtivo||'todos';
  const pend=filtrarVendas(db,ano,mes).filter(v=>v.status==='PENDENTE').sort((a,b)=>a.data.localeCompare(b.data));
  const tot=pend.reduce((s,v)=>s+(v.valorRecebido||v.total||0),0);
  const tCocos=pend.reduce((s,v)=>s+(v.qtde||0),0);
  const periodo=ano!=='todos'?(mes!=='todos'?['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][parseInt(mes)]+'/'+ano:ano):'Todos os períodos';
  document.getElementById('modal-receber-sub').textContent=periodo+' · '+pend.length+' venda'+(pend.length!==1?'s':'')+' · '+fmtNum(tCocos)+' cocos';
  const tbody=document.getElementById('modal-receber-tbody');
  const tfoot=document.getElementById('modal-receber-tfoot');
  tbody.innerHTML=pend.map(v=>{
    const[y,m,d]=v.data.split('-');
    return`<tr class="pendente">
      <td style="font-family:var(--font-mono)">${d}/${m}/${y}</td>
      <td style="font-weight:700">${v.cliente}</td>
      <td style="font-family:var(--font-mono);color:var(--muted)">${v.nf}</td>
      <td style="font-family:var(--font-mono)">${fmtNum(v.qtde)}</td>
      <td style="font-family:var(--font-mono);font-weight:700">${fmtR(v.valorRecebido||v.total)}</td>
      <td><button class="btn btn-primary" style="font-size:11px;padding:5px 12px" onclick="marcarPagoModal(${v.id})">✓ Pago</button></td>
    </tr>`;
  }).join('');
  tfoot.innerHTML=pend.length?'<tr style="font-weight:800"><td colspan="3">TOTAL</td><td style="font-family:var(--font-mono)">'+fmtNum(tCocos)+'</td><td style="font-family:var(--font-mono)">'+fmtR(tot)+'</td><td></td></tr>':'';
  if(!pend.length)tbody.innerHTML='<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--muted)">✅ Nenhuma venda pendente no período</td></tr>';
  document.getElementById('modal-a-receber').classList.add('open');
}

async function marcarPagoModal(id){
  await marcarPago(id);
  abrirModalAReceber();
}

async function marcarPago(id){
  const db=loadVendas();const v=db.find(v=>v.id===id);if(!v)return;
  if(!confirm('Confirmar pagamento de '+v.cliente+'?\n'+fmtNum(v.qtde)+' cocos · '+fmtR(v.valorRecebido||v.total)))return;
  v.status='PAGO';v.dataDeposito=v.dataDeposito||today();
  saveVendas(db);
  await salvarVendaSupabase(v);
  renderVendasPendentes();renderVendasLista();renderVendasPainel();
  showToast('✓ '+v.cliente+' — marcada como paga');
}

function editarVenda(id){
  const db=loadVendas();
  const v=db.find(x=>x.id===id);
  if(!v)return;
  window._editVendaId=id;
  const set=(sel,val)=>{const el=document.getElementById(sel);if(el)el.value=val||'';};
  set('ev-data',v.data);
  set('ev-cliente',v.cliente);
  set('ev-nf',v.nf);
  set('ev-total',v.total||'');
  set('ev-frete',v.frete||'');
  set('ev-recebido',v.valorRecebido||'');
  // ICMS + Seguro
  const evIcms=document.getElementById('ev-icms');
  if(evIcms) evIcms.value=v.icmsValor||96;
  const evSeguro=document.getElementById('ev-seguro');
  if(evSeguro){
    if(v.seguroValor){evSeguro.value=v.seguroValor;evSeguro.dataset.manual='1';}
    else{evSeguro.value='';evSeguro.dataset.manual='';}
  }
  const evCustosRow=document.getElementById('ev-custos-frete-row');
  if(evCustosRow) evCustosRow.style.display=(v.frete&&v.frete>0)?'':'none';
  set('ev-status',v.status||'PAGO');
  updateEditStatusBadge();
  set('ev-deposito',v.dataDeposito||'');
  // UF select - popular se ainda não populado
  const ufSel=document.getElementById('ev-uf');
  if(ufSel&&ufSel.options.length<=1){
    const UFS=[['AC','Acre'],['AL','Alagoas'],['AP','Amapá'],['AM','Amazonas'],['BA','Bahia'],
      ['CE','Ceará'],['DF','Distrito Federal'],['ES','Espírito Santo'],['GO','Goiás'],
      ['MA','Maranhão'],['MT','Mato Grosso'],['MS','Mato Grosso do Sul'],['MG','Minas Gerais'],
      ['PA','Pará'],['PB','Paraíba'],['PR','Paraná'],['PE','Pernambuco'],['PI','Piauí'],
      ['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],['RS','Rio Grande do Sul'],
      ['RO','Rondônia'],['RR','Roraima'],['SC','Santa Catarina'],['SP','São Paulo'],
      ['SE','Sergipe'],['TO','Tocantins']];
    UFS.forEach(([s,n])=>{const o=document.createElement('option');o.value=s;o.textContent=s+' - '+n;ufSel.appendChild(o);});
    const oFab=document.createElement('option');oFab.value='FÁBRICA';oFab.textContent='FÁBRICA';ufSel.appendChild(oFab);
  }
  if(ufSel)ufSel.value=v.ufDestino||'';
  set('ev-cidade',v.cidadeDestino||'');
  // áreas grid
  const AREAS=['A1','A2','C','D','MA','MDC','MDB'];
  const grid=document.getElementById('ev-areas-grid');
  if(grid){
    const quebraVal=v.quebra||'';
    grid.innerHTML=AREAS.map(a=>{
      const val=(v.areas&&v.areas[a])||'';
      return '<div class="av-wrap"><div class="av-label">'+a+'</div><input type="number" id="eva-'+a+'" class="av-inp'+(val?' filled':'')+'" value="'+val+'" min="0" oninput="onEditAreaVenda()"></div>';
    }).join('')+'<div class="av-wrap"><div class="av-label">TOTAL</div><input type="number" id="eva-total" class="av-inp filled" value="'+(v.qtde||'')+'" readonly style="font-weight:700"></div>'
    +'<div class="av-wrap"><div class="av-label" style="color:var(--amarelo)">QUEBRA</div><input type="number" id="eva-quebra" class="av-inp'+(quebraVal?' filled':'')+'" value="'+quebraVal+'" min="0" style="font-weight:700;color:var(--amarelo)" oninput="calcEditVenda()"></div>';
  }
  // BLOCO FÁBRICA: controlado por toggle (coco|litro). Default litro se for cliente fábrica
  // ou se a venda já tem litragem/tipo=litro registrado.
  const mapaCli = (typeof getMapaClientes === 'function') ? getMapaClientes() : {};
  const isFab = !!mapaCli[v.cliente]?.fabrica;
  const temLitro = v.tipoVenda === 'litro' || (v.litragem != null && v.litragem > 0);
  set('ev-litragem', v.litragem || '');
  set('ev-vlitro', v.vPorLitro || '');
  set('ev-peso', v.pesoKg || '');
  const autoChk = document.getElementById('ev-auto-total');
  if (autoChk) autoChk.checked = true;
  setEditTipoVenda((isFab || temLitro) ? 'litro' : 'coco');
  // sub
  const [y,m,d]=(v.data||'').split('-');
  document.getElementById('ev-sub').textContent=v.cliente+' · '+(d?d+'/'+m+'/'+y:'');
  document.getElementById('ev-title').textContent='Editar Venda';
  document.getElementById('ev-erro').style.display='none';
  calcEditVenda();
  // abrir panel
  document.getElementById('edit-venda-overlay').classList.add('open');
  document.getElementById('edit-venda-panel').classList.add('open');
}

function toggleEditStatus(){
  const el=document.getElementById('ev-status');
  el.value=el.value==='PAGO'?'PENDENTE':'PAGO';
  updateEditStatusBadge();
}
function updateEditStatusBadge(){
  const st=document.getElementById('ev-status').value;
  const badge=document.getElementById('ev-status-badge');
  const bar=document.getElementById('ev-status-bar');
  if(st==='PAGO'){
    badge.textContent='PAGO';badge.style.background='var(--verde-bg)';badge.style.color='var(--verde)';
    bar.style.borderColor='var(--verde-border)';
  }else{
    badge.textContent='PENDENTE';badge.style.background='var(--amarelo-bg)';badge.style.color='#854d0e';
    bar.style.borderColor='var(--amarelo-border)';
  }
}

function closeEditVendaPanel(){
  document.getElementById('edit-venda-overlay').classList.remove('open');
  document.getElementById('edit-venda-panel').classList.remove('open');
  window._editVendaId=null;
}

function onEditAreaVenda(){
  const AREAS=['A1','A2','C','D','MA','MDC','MDB'];
  const soma=AREAS.reduce((s,a)=>s+(parseInt(document.getElementById('eva-'+a)?.value)||0),0);
  const t=document.getElementById('eva-total');
  if(t){t.value=soma||'';t.classList.toggle('filled',soma>0);}
  AREAS.forEach(a=>{const el=document.getElementById('eva-'+a);if(el)el.classList.toggle('filled',(parseInt(el.value)||0)>0);});
  calcEditVenda();
}

// Alterna tipo de venda no painel de edição (coco|litro)
function setEditTipoVenda(tipo){
  window._editVendaTipo = tipo;
  const btnCoco=document.getElementById('ev-tipo-coco');
  const btnLitro=document.getElementById('ev-tipo-litro');
  const bloco=document.getElementById('ev-bloco-fabrica');
  if(btnCoco && btnLitro){
    const on={background:'var(--verde)',color:'#fff'};
    const off={background:'#fff',color:'var(--muted)'};
    const sel=tipo==='litro'?btnLitro:btnCoco;
    const uns=tipo==='litro'?btnCoco:btnLitro;
    Object.assign(sel.style,on);
    Object.assign(uns.style,off);
  }
  if(bloco) bloco.style.display = (tipo==='litro') ? '' : 'none';
  if(tipo==='coco'){
    // limpa campos de fábrica ao voltar para coco (sem apagar até salvar)
    const lit=document.getElementById('ev-litragem');
    const vl=document.getElementById('ev-vlitro');
    if(lit) lit.value='';
    if(vl) vl.value='';
  }
  calcEditVenda();
}

function calcEditVenda(){
  const tipo=window._editVendaTipo||'coco';
  const q=parseInt(document.getElementById('eva-total')?.value)||0;
  const qb=parseInt(document.getElementById('eva-quebra')?.value)||0;
  const t=parseFloat(document.getElementById('ev-total')?.value)||0;
  const f=parseFloat(document.getElementById('ev-frete')?.value)||0;
  // Mostrar/ocultar ICMS+Seguro quando tem frete
  const custosRow=document.getElementById('ev-custos-frete-row');
  if(custosRow) custosRow.style.display=f>0?'':'none';
  const icms=f>0?(parseFloat(document.getElementById('ev-icms')?.value)||0):0;
  // Auto-seguro
  const seguroEl=document.getElementById('ev-seguro');
  if(seguroEl && seguroEl.dataset.manual!=='1' && t>0 && f>0){
    const autoSeg=(t+f)*0.0007;
    seguroEl.value=autoSeg>0?autoSeg.toFixed(2):'';
  }
  if(seguroEl && !seguroEl.value) seguroEl.dataset.manual='';
  const seguro=f>0?(parseFloat(seguroEl?.value)||0):0;
  const descEl=document.getElementById('ev-seguro-desc');
  if(descEl) descEl.textContent=(t>0&&f>0)?'0,07% × R$ '+Math.round(t+f).toLocaleString('pt-BR')+' = R$ '+((t+f)*0.0007).toFixed(2):'';
  const deducoes=f+icms+seguro;
  const liquido=t-deducoes;
  const el1=document.getElementById('ev-calc-cocos');
  const el2=document.getElementById('ev-calc-preco');
  if(el1)el1.textContent=q>0?fmtNum(q)+(qb>0?' (+'+fmtNum(qb)+' quebra)':''):'—';
  // R$/coco final SEMPRE a partir do total líquido (total − frete − icms − seguro) ÷ qtde
  if(el2)el2.textContent=q>0&&t>0?'R$ '+(liquido/q).toFixed(2):'—';
  const r=document.getElementById('ev-recebido');
  if(r&&t>0)r.value=liquido.toFixed(2);
  // Cálculos do bloco fábrica — só quando tipo=litro
  const fcEl=document.getElementById('ev-fab-calc');
  if(fcEl && tipo==='litro'){
    const lit=parseFloat(document.getElementById('ev-litragem')?.value)||0;
    const vlInput=parseFloat(document.getElementById('ev-vlitro')?.value)||0;
    if(lit>0){
      const vlCalc=vlInput>0?vlInput:(liquido/lit);
      const lpc=q>0?lit/q:0;
      const rPorCoco=q>0?(liquido/q):0;
      fcEl.innerHTML='<strong>R$ '+vlCalc.toFixed(4)+'/L</strong>'
        +(lpc>0?' · <strong>'+lpc.toFixed(2)+' L/coco</strong>':'')
        +(rPorCoco>0?' · <strong>R$ '+rPorCoco.toFixed(2)+'/coco</strong>':'')
        +'<br><span style="font-size:10px">R$/coco = (total − frete) ÷ cocos · despesas como frete entram no cálculo</span>';
    }else{
      fcEl.innerHTML='<span style="font-size:10px;font-style:italic">Informe a litragem que a fábrica enviou para calcular R$/L, L/coco e R$/coco final</span>';
    }
  }
}

// Recalcula Valor Total automaticamente a partir de litragem × R$/L (só no tipo litro)
function onEditFabricaInput(){
  const litEl=document.getElementById('ev-litragem');
  const vlEl=document.getElementById('ev-vlitro');
  const autoEl=document.getElementById('ev-auto-total');
  const totalEl=document.getElementById('ev-total');
  const freteEl=document.getElementById('ev-frete');
  const lit=parseFloat(litEl?.value)||0;
  const vl=parseFloat(vlEl?.value)||0;
  if(autoEl && autoEl.checked && lit>0 && vl>0 && totalEl){
    const bruto=lit*vl;
    const f=parseFloat(freteEl?.value)||0;
    // Valor Total = venda bruta (litragem × R$/L). Frete é descontado depois
    // no cálculo do R$/coco final. Não somamos frete ao total.
    totalEl.value=bruto.toFixed(2);
  }
  calcEditVenda();
}

let _salvandoEditVenda = false;
async function salvarEditVenda(){
  if (_salvandoEditVenda) return;
  const id=window._editVendaId;if(!id)return;
  const db=loadVendas();
  const idx=db.findIndex(x=>x.id===id);if(idx<0)return;
  const v=db[idx];
  const erro=document.getElementById('ev-erro');
  const data=document.getElementById('ev-data').value;
  const cliente=(document.getElementById('ev-cliente').value||'').trim().toUpperCase();
  const qtde=parseInt(document.getElementById('eva-total')?.value)||0;
  const total=parseFloat(document.getElementById('ev-total')?.value)||0;
  if(!data){erro.textContent='Informe a data.';erro.style.display='block';return;}
  if(!cliente){erro.textContent='Informe o cliente.';erro.style.display='block';return;}
  if(qtde===0){erro.textContent='Informe a quantidade.';erro.style.display='block';return;}
  if(total===0){erro.textContent='Informe o valor total.';erro.style.display='block';return;}
  erro.style.display='none';
  _salvandoEditVenda = true;
  const _btnEv = document.querySelector('button[onclick="salvarEditVenda()"]');
  if (_btnEv) { _btnEv.disabled = true; _btnEv.dataset.origText = _btnEv.textContent; _btnEv.textContent = '⏳ Salvando...'; }
  try {
  // atualizar campos
  v.data=data;
  v.cliente=cliente;
  v.nf=(document.getElementById('ev-nf').value||'RECIBO').trim().toUpperCase()||'RECIBO';
  v.status=document.getElementById('ev-status').value;
  v.ufDestino=document.getElementById('ev-uf')?.value||null;
  v.cidadeDestino=(document.getElementById('ev-cidade')?.value||'').trim()||null;
  v.total=total;
  v.frete=parseFloat(document.getElementById('ev-frete')?.value)||0;
  v.icmsValor=v.frete>0?(parseFloat(document.getElementById('ev-icms')?.value)||0):null;
  v.seguroValor=v.frete>0?(parseFloat(document.getElementById('ev-seguro')?.value)||0):null;
  v.valorRecebido=parseFloat(document.getElementById('ev-recebido')?.value)||0;
  v.dataDeposito=document.getElementById('ev-deposito')?.value||null;
  v.qtde=qtde;
  v.quebra=parseInt(document.getElementById('eva-quebra')?.value)||0;
  const areas={};
  ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{const val=parseInt(document.getElementById('eva-'+a)?.value)||0;if(val>0)areas[a]=val;});
  v.areas=areas;
  // Dados de fábrica (litragem, peso, R$/L). Se a litragem foi informada,
  // marca a venda como tipo 'litro' e calcula vPorLitro automaticamente.
  const tipoEdit=window._editVendaTipo||'coco';
  const litragemEdit=parseFloat(document.getElementById('ev-litragem')?.value)||0;
  const vlitroEdit=parseFloat(document.getElementById('ev-vlitro')?.value)||0;
  const pesoEdit=parseFloat(document.getElementById('ev-peso')?.value)||0;
  if(tipoEdit==='litro' && litragemEdit>0){
    v.litragem=litragemEdit;
    v.pesoKg=pesoEdit||null;
    v.tipoVenda='litro';
    // Prioriza R$/L informado pelo usuário; senão calcula a partir do total líquido
    v.vPorLitro=vlitroEdit>0?vlitroEdit:((v.total-(v.frete||0))/litragemEdit);
  }else{
    // Venda por coco — remove campos de fábrica
    v.litragem=null;
    v.pesoKg=pesoEdit||null;
    v.vPorLitro=null;
    v.tipoVenda='coco';
  }
  saveVendas(db);
  await salvarVendaSupabase(v);
  closeEditVendaPanel();
  renderVendasLista();renderVendasPendentes();renderVendasPainel();
  showToast('✓ Venda de '+v.cliente+' atualizada');
  } finally {
    _salvandoEditVenda = false;
    if (_btnEv) { _btnEv.disabled = false; _btnEv.textContent = _btnEv.dataset.origText || 'Salvar'; }
  }
}

async function excluirVenda(id){
  const db=loadVendas();const v=db.find(v=>v.id===id);if(!v)return;
  if(!confirm('Excluir venda de '+v.cliente+' ('+fmtNum(v.qtde)+' cocos · '+fmtR(v.total)+')?'))return;
  saveVendas(db.filter(v=>v.id!==id));
  await excluirVendaSupabase(id);
  renderVendasLista();renderVendasPendentes();showToast('Venda excluída');
}

function importarPlanilhaVendas(input){
  const file=input.files[0];if(!file)return;
  const st=document.getElementById('v-import-status');
  st.textContent='Lendo arquivo...';
  const reader=new FileReader();
  reader.onload=function(e){
    try{
      const wb=XLSX.read(e.target.result,{type:'array',cellDates:true});
      const abas=wb.SheetNames.filter(n=>/^\d{2}-\d{4}$/.test(n));
      if(!abas.length){st.textContent='✗ Nenhuma aba mensal encontrada';return;}
      const AREAS=['A1','A2','B','C','D','MA','MDC','MDB'];
      const vendas=[];let uid=Date.now();
      function sn(v){const n=parseFloat(v);return isNaN(n)?0:Math.round(n*100)/100;}
      function si(v){const n=parseInt(v);return isNaN(n)?0:n;}
      function fd(v){if(!v)return null;try{if(v instanceof Date){const d=new Date(v.getTime()-v.getTimezoneOffset()*60000);return d.toISOString().split('T')[0];}return new Date(v).toISOString().split('T')[0];}catch(e){return null;}}
      function fc(h,...ns){for(const n of ns){const i=h.findIndex(x=>String(x||'').trim().toUpperCase()===n.toUpperCase());if(i>=0)return i;}return -1;}
      function fch(h,...fs){for(const f of fs){const i=h.findIndex(x=>String(x||'').trim().toUpperCase().includes(f.toUpperCase()));if(i>=0)return i;}return -1;}
      for(const aba of abas){
        const ws=wb.Sheets[aba];
        const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:null,raw:false,dateNF:'yyyy-mm-dd'});
        if(!rows||rows.length<4)continue;
        let hr=-1;
        for(let i=0;i<Math.min(10,rows.length);i++){
          const v=rows[i].map(x=>String(x||'').trim().toUpperCase());
          if(v.includes('DATA')&&v.includes('CLIENTE')){hr=i;break;}
        }
        if(hr<0)continue;
        const h=rows[hr].map(x=>String(x||'').trim());
        const iD=fc(h,'DATA'),iCl=fc(h,'CLIENTE'),iNF=fc(h,'Nº NF','NF'),iQ=fc(h,'QTDE FRUTOS','QTDE');
        const iT=fc(h,'TOTAL'),iS=fc(h,'STATUS'),iR=fc(h,'VALOR RECEBIDO'),iDep=fc(h,'DATA DEPOSITO','DATA DEPÓSITO');
        const iPeso=fch(h,'PESO (KG'),iLit=fch(h,'LITRAGEM'),iVL=fc(h,'V P/ LITRO','V P/LITRO');
        let iFr=-1;h.forEach((x,i)=>{const u=x.toUpperCase();if(u.includes('FRETE')&&!u.includes('POR')&&!u.includes('V/')&&!u.includes('V FRETE'))iFr=i;});
        for(let r=hr+1;r<rows.length;r++){
          const row=rows[r];if(!row)continue;
          const dataRaw=iD>=0?row[iD]:null;if(!dataRaw)continue;
          const data=fd(dataRaw);if(!data||!/^\d{4}-\d{2}-\d{2}$/.test(data))continue;
          const cliente=iCl>=0?String(row[iCl]||'').trim().toUpperCase():'';
          if(!cliente||cliente==='TOTAL'||cliente.startsWith('MÉDIA'))continue;
          let nf=String(iNF>=0?(row[iNF]||''):'').trim().toUpperCase();
          if(!nf||nf==='NULL'||nf==='NAN')nf='RECIBO';
          const qtde=si(iQ>=0?row[iQ]:0),total=sn(iT>=0?row[iT]:0);
          const frete=sn(iFr>=0?row[iFr]:0),recebido=sn(iR>=0?row[iR]:0);
          const dep=iDep>=0?fd(row[iDep]):null;
          let status='PAGO';
          if(iS>=0){const s=String(row[iS]||'').trim().toUpperCase();if(s.includes('PEND'))status='PENDENTE';}
          const areas={};
          AREAS.forEach(a=>{const i=fc(h,a);if(i>=0){const v=si(row[i]);if(v>0)areas[a]=v;}});
          const litragem=sn(iLit>=0?row[iLit]:0),vlitro=sn(iVL>=0?row[iVL]:0),peso=sn(iPeso>=0?row[iPeso]:0);
          const tipo=(litragem>0&&vlitro>0&&qtde>0&&litragem<qtde)?'litro':'coco';
          vendas.push({id:uid++,data,cliente,nf,areas,qtde,total,frete,valorRecebido:recebido,status,dataDeposito:dep,
            tipoVenda:tipo,pesoKg:tipo==='litro'?peso:null,litragem:tipo==='litro'?litragem:null,vPorLitro:tipo==='litro'?vlitro:null});
        }
      }
      if(!vendas.length){st.textContent='✗ Nenhuma venda encontrada';return;}
      let ex=[];try{ex=JSON.parse(localStorage.getItem(SK_VENDAS)||'[]');}catch(e){ console.error('Erro:', e); }
      const chaves=new Set(ex.map(v=>v.data+'|'+v.cliente+'|'+v.nf));
      const novos=vendas.filter(v=>!chaves.has(v.data+'|'+v.cliente+'|'+v.nf));
      saveVendas(ex.concat(novos));
      st.textContent=`✓ ${novos.length} vendas importadas (total: ${ex.length+novos.length})`;
      input.value='';
      initVendas();
      showToast(`✓ ${novos.length} vendas importadas`);
    }catch(err){document.getElementById('v-import-status').textContent='✗ Erro: '+err.message;console.error(err);}
  };
  reader.readAsArrayBuffer(file);
}

// ─────────── AUTOCOMPLETE CLIENTE ───────────

function _popularDatalistClientes(){
  const lista = window._acClientesLista || [];
  const opts = lista.map(c => `<option value="${c.replace(/"/g,'&quot;')}">`).join('');
  const dl1 = document.getElementById('dl-clientes');
  const dl2 = document.getElementById('dl-clientes-busca');
  if(dl1) dl1.innerHTML = opts;
  if(dl2) dl2.innerHTML = opts;
}

document.addEventListener('click',function(e){
  if(!e.target.closest('#v-cidade-destino')&&!e.target.closest('#ac-cidade-list')){
    const l=document.getElementById('ac-cidade-list');if(l)l.classList.remove('open');
  }
});

// ─────────── AUTOCOMPLETE CIDADE (API IBGE) ───────────
window._acCidadesCache={};
async function onUfDestinoChange(skipClear){
  const uf=document.getElementById('v-uf-destino')?.value;
  const cidadeInp=document.getElementById('v-cidade-destino');
  if(!skipClear&&cidadeInp)cidadeInp.value='';
  if(!uf||uf==='FÁBRICA')return;
  if(window._acCidadesCache[uf])return; // already cached
  try{
    const resp=await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf+'/municipios?orderBy=nome');
    if(!resp.ok)return;
    const data=await resp.json();
    window._acCidadesCache[uf]=data.map(m=>m.nome.toUpperCase());
  }catch(e){console.warn('Erro ao buscar cidades IBGE:',e);}
}
function acCidade(){
  const inp=document.getElementById('v-cidade-destino');
  const list=document.getElementById('ac-cidade-list');
  if(!inp||!list)return;
  const uf=document.getElementById('v-uf-destino')?.value;
  const q=(inp.value||'').trim().toUpperCase();
  if(q.length<1||!uf||!window._acCidadesCache[uf]){list.classList.remove('open');return;}
  const filtered=window._acCidadesCache[uf].filter(c=>c.includes(q)).slice(0,12);
  if(!filtered.length){list.classList.remove('open');return;}
  list.innerHTML=filtered.map((c,i)=>
    `<div class="ac-item${i===0?' active':''}" data-val="${c.replace(/"/g,'&quot;')}" onmousedown="acSelCidade(this)">${c}</div>`
  ).join('');
  list.classList.add('open');
  window._acCidadeIdx=0;
}
function acSelCidade(el){
  const inp=document.getElementById('v-cidade-destino');
  const list=document.getElementById('ac-cidade-list');
  if(!inp||!list)return;
  inp.value=el.dataset.val;
  list.classList.remove('open');
}
// keyboard nav for cidade autocomplete
document.addEventListener('keydown',function(e){
  const list=document.getElementById('ac-cidade-list');
  if(!list||!list.classList.contains('open'))return;
  const active=document.activeElement;
  if(active&&active.id!=='v-cidade-destino')return;
  const items=list.querySelectorAll('.ac-item');
  if(!items.length)return;
  let idx=window._acCidadeIdx||0;
  if(e.key==='ArrowDown'){e.preventDefault();idx=Math.min(idx+1,items.length-1);}
  else if(e.key==='ArrowUp'){e.preventDefault();idx=Math.max(idx-1,0);}
  else if(e.key==='Enter'){e.preventDefault();acSelCidade(items[idx]);return;}
  else if(e.key==='Escape'){list.classList.remove('open');return;}
  else return;
  items.forEach(i=>i.classList.remove('active'));
  items[idx].classList.add('active');
  items[idx].scrollIntoView({block:'nearest'});
  window._acCidadeIdx=idx;
});

function exportarVendasCSV(){
  const db=loadVendas();
  const ano=window._vendaAnoAtivo||'todos';
  const mes=window._vendaMesAtivo||'todos';
  const busca=(document.getElementById('vl-busca')?.value||'').trim().toLowerCase();
  const st=document.getElementById('vl-status')?.value||'todos';
  let lista=filtrarVendas(db,ano,mes);
  if(busca)lista=lista.filter(v=>v.cliente.toLowerCase().includes(busca));
  if(st!=='todos')lista=lista.filter(v=>v.status===st);
  lista.sort((a,b)=>b.data.localeCompare(a.data));
  const linhas=[['DATA','CLIENTE','NF','COCOS','TOTAL','FRETE','RECEBIDO','R$/COCO','STATUS']];
  lista.forEach(v=>{
    const pc=v.qtde>0&&v.total>0?((v.total-(v.frete||0))/v.qtde).toFixed(2):'';
    linhas.push([v.data,v.cliente,v.nf,v.qtde,v.total,v.frete||0,v.valorRecebido||0,pc,v.status]);
  });
  const csv='\uFEFF'+linhas.map(r=>r.join(';')).join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='vendas_'+today()+'.csv';a.click();
  URL.revokeObjectURL(url);
  showToast('✓ CSV exportado — '+lista.length+' vendas');
}

// ─────────── CLIENTES ───────────

async function initClientes() {
  const wrap = document.getElementById('cli-lista-wrap');
  if (wrap && (!_clientesCache || _clientesCache.length === 0)) {
    wrap.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">⏳ Carregando clientes...</div>';
    await loadClientesSupabase();
  }
  renderListaClientes();
}

function renderListaClientes() {
  const clientes = loadClientesLocal();
  const busca = (document.getElementById('cli-busca')?.value || '').trim().toLowerCase();
  const tipoFiltro = document.getElementById('cli-filtro-tipo')?.value || 'todos';
  const statusFiltro = document.getElementById('cli-filtro-status')?.value || 'ativo';

  let lista = clientes;
  if (busca) lista = lista.filter(c =>
    c.nome.toLowerCase().includes(busca) ||
    (c.cidade || '').toLowerCase().includes(busca) ||
    (c.uf || '').toLowerCase().includes(busca) ||
    (c.telefone || '').includes(busca) ||
    (c.cpf_cnpj || '').includes(busca)
  );
  if (tipoFiltro !== 'todos') lista = lista.filter(c => c.tipo === tipoFiltro);
  if (statusFiltro !== 'todos') lista = lista.filter(c => c.status === statusFiltro);

  // Cruzar com vendas para dados de histórico
  const vendas = loadVendas();
  const vendasPorCliente = {};
  vendas.forEach(v => {
    if (!vendasPorCliente[v.cliente]) vendasPorCliente[v.cliente] = { cocos: 0, receita: 0, ultima: '', n: 0, pendente: 0, pendCocos: 0, pendValor: 0 };
    const vc = vendasPorCliente[v.cliente];
    vc.cocos += v.qtde || 0;
    vc.receita += v.total || 0;
    vc.n++;
    if (!vc.ultima || v.data > vc.ultima) vc.ultima = v.data;
    if (v.status === 'PENDENTE') { vc.pendente++; vc.pendCocos += v.qtde || 0; vc.pendValor += (v.valorRecebido || v.total || 0); }
  });

  const wrap = document.getElementById('cli-lista-wrap');
  if (!wrap) return;

  const cnt = document.getElementById('cli-count');
  if (cnt) cnt.textContent = lista.length + ' cliente' + (lista.length !== 1 ? 's' : '');

  if (!lista.length) {
    wrap.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Nenhum cliente encontrado</div>';
    return;
  }

  let html = '<div style="display:grid;gap:10px">';
  lista.forEach(c => {
    const vc = vendasPorCliente[c.nome] || { cocos: 0, receita: 0, ultima: '', n: 0, pendente: 0, pendCocos: 0, pendValor: 0 };
    const diasSemCompra = vc.ultima ? diasDesde(vc.ultima) : null;
    const inativo = c.status === 'inativo';

    // Badge de tipo
    const tipoBadge = c.tipo === 'fabrica'
      ? '<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:10px;background:#e3f2fd;color:#1565c0">FÁBRICA</span>'
      : '<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:10px;background:var(--verde-bg);color:var(--verde)">MESA</span>';

    // Badge de status
    const statusBadge = inativo
      ? ' <span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:10px;background:var(--vermelho-bg);color:var(--vermelho)">INATIVO</span>'
      : '';

    // Badge pendente com dados reais
    const nomeJsSafe = String(c.nome).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const nomeHtmlSafe = escapeHtml(c.nome);
    const pendBadge = vc.pendente > 0
      ? ' <span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:10px;background:var(--amarelo-bg);color:#854d0e;cursor:pointer" onclick="event.stopPropagation();filtrarVendasPendentesCliente(\'' + nomeJsSafe + '\')" title="Clique para ver detalhes">⚠ ' + vc.pendente + ' pendente' + (vc.pendente > 1 ? 's' : '') + ' · ' + fmtNum(vc.pendCocos) + ' cocos · ' + fmtR(vc.pendValor) + '</span>'
      : '';

    // Dias sem compra
    let diasBadge = '';
    if (diasSemCompra !== null) {
      if (diasSemCompra > 60) diasBadge = '<span style="font-size:9px;color:var(--vermelho);font-weight:700">' + diasSemCompra + 'd sem compra</span>';
      else if (diasSemCompra > 30) diasBadge = '<span style="font-size:9px;color:#854d0e;font-weight:700">' + diasSemCompra + 'd sem compra</span>';
    }

    const tel = c.telefone ? '<span style="font-size:11px;color:var(--muted);font-family:var(--font-mono)">📱 ' + escapeHtml(c.telefone) + '</span>' : '';
    const loc = (c.cidade && c.uf) ? '<span style="font-size:11px;color:var(--muted)">' + escapeHtml(c.cidade) + '/' + escapeHtml(c.uf) + '</span>' : (c.uf ? '<span style="font-size:11px;color:var(--muted)">' + escapeHtml(c.uf) + '</span>' : '');

    html += `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;${inativo ? 'opacity:0.6;' : ''}cursor:pointer" onclick="openClientePanel('${nomeJsSafe}')">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="font-size:14px;font-weight:800;color:var(--text)">${nomeHtmlSafe}</span>
          ${tipoBadge}${statusBadge}${pendBadge}
        </div>
        ${diasBadge}
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        ${loc}${tel}
        ${vc.n > 0 ? '<span style="font-size:11px;font-family:var(--font-mono);color:var(--forest)">' + fmtNum(vc.cocos) + ' cocos · ' + vc.n + ' vendas</span>' : '<span style="font-size:11px;color:var(--muted)">Sem vendas</span>'}
        ${vc.ultima ? '<span style="font-size:10px;color:var(--muted)">Últ: ' + fmtData(vc.ultima) + '</span>' : ''}
      </div>
      ${c.observacoes ? '<div style="font-size:10px;color:var(--muted);margin-top:4px;font-style:italic">💬 ' + c.observacoes + '</div>' : ''}
    </div>`;
  });
  html += '</div>';
  wrap.innerHTML = html;
}

function abrirFormCliente(nome) {
  // Abre o side panel na aba Editar
  if(nome){
    openClientePanel(nome, 'editar');
  } else {
    // Novo cliente — abre painel vazio na aba editar
    window._cliPanelNome = null;
    document.getElementById('cli-title').textContent = 'Novo Cliente';
    document.getElementById('cli-sub').textContent = '';
    document.getElementById('cli-kpis').innerHTML = '';
    document.getElementById('cli-hist').innerHTML = '';
    switchCliTab('editar');
    document.getElementById('cli-panel').classList.add('open');
    document.getElementById('cli-overlay').classList.add('open');
  }
}

let _salvandoCliente = false;
async function salvarCliente() {
  if (_salvandoCliente) return;
  const nome = document.getElementById('cli-nome').value.trim().toUpperCase();
  const erro = document.getElementById('cli-erro');

  if (!nome) {
    erro.textContent = 'Nome é obrigatório';
    erro.style.display = 'block';
    return;
  }

  const id = document.getElementById('cli-edit-id').value || undefined;

  // Verificar duplicata
  const clientes = loadClientesLocal();
  const dup = clientes.find(c => c.nome === nome && c.id !== id);
  if (dup) {
    erro.textContent = 'Já existe um cliente com esse nome';
    erro.style.display = 'block';
    return;
  }

  _salvandoCliente = true;
  const _btnCli = document.querySelector('button[onclick="salvarCliente()"]');
  if (_btnCli) { _btnCli.disabled = true; _btnCli.dataset.origText = _btnCli.textContent; _btnCli.textContent = '⏳ Salvando...'; }
  try {
  const cliente = {
    id,
    nome,
    telefone: document.getElementById('cli-telefone').value.trim(),
    email: document.getElementById('cli-email').value.trim(),
    cpf_cnpj: document.getElementById('cli-cpf-cnpj').value.trim(),
    ie: document.getElementById('cli-ie').value.trim(),
    uf: document.getElementById('cli-uf').value,
    cidade: document.getElementById('cli-cidade').value.trim().toUpperCase(),
    endereco: document.getElementById('cli-endereco').value.trim(),
    contato_secundario: document.getElementById('cli-contato2').value.trim(),
    observacoes: document.getElementById('cli-obs').value.trim(),
    tipo: document.getElementById('cli-tipo').value,
    status: document.getElementById('cli-status').value,
    frete_por_ton: parseFloat(document.getElementById('cli-frete-ton')?.value)||null,
    distancia_km: parseInt(document.getElementById('cli-distancia')?.value)||null,
    litros_por_coco: parseFloat(document.getElementById('cli-litros-por-coco')?.value)||null
  };

  const saved = await salvarClienteSupabase(cliente);
  if (saved) {
    // Sincronizar telefone na tabela legada
    if (cliente.telefone) {
      _telefonesCache[nome] = cliente.telefone;
      salvarTelefone(nome, cliente.telefone);
    }
    closeClientePanel();
    renderListaClientes();
    showToast('✓ Cliente salvo — ' + nome);
    // Callback da programação (se cadastrou cliente a partir da aba programação)
    if (typeof window._progOnClienteSalvo === 'function') window._progOnClienteSalvo();
  }
  } finally {
    _salvandoCliente = false;
    if (_btnCli) { _btnCli.disabled = false; _btnCli.textContent = _btnCli.dataset.origText || 'Salvar'; }
  }
}

// ─── SIMULADOR DE CARGA ───

window._simCenarios = [];
const COCOS_POR_LITRO = 2.3;  // 1 litro = 2,3 cocos
const KG_POR_COCO = 2.2;      // peso médio por coco

function onSimQtdeChange() {
  const qtde = parseInt(document.getElementById('sim-qtde')?.value) || 0;
  document.getElementById('sim-peso').value = qtde > 0 ? Math.round(qtde * KG_POR_COCO) : '';
  calcSimulador();
}

function adicionarCenario() {
  const mapa = getMapaClientes();
  const fabricas = Object.entries(mapa).filter(([, i]) => i.fabrica).map(([nome]) => nome);
  const clientes = loadClientesLocal();

  // Pré-selecionar primeira fábrica não usada ainda
  const usadas = window._simCenarios.map(c => c.fabrica);
  const proxFab = fabricas.find(f => !usadas.includes(f)) || fabricas[0] || '';

  const cli = clientes.find(c => c.nome === proxFab);
  const id = Date.now();
  window._simCenarios.push({
    id,
    fabrica: proxFab,
    valorLitro: '',
    freteTon: cli?.frete_por_ton || ''
  });
  _renderCenarios();
  calcSimulador();
}

function _removerCenario(id) {
  window._simCenarios = window._simCenarios.filter(c => c.id !== id);
  _renderCenarios();
  calcSimulador();
}

function _onCenarioChange(id, campo, valor) {
  const c = window._simCenarios.find(c => c.id === id);
  if (!c) return;
  if (campo === 'fabrica') {
    c.fabrica = valor;
    // Pré-preencher frete do cadastro
    const clientes = loadClientesLocal();
    const cli = clientes.find(cl => cl.nome === valor);
    c.freteTon = cli?.frete_por_ton || '';
    _renderCenarios();
  } else {
    c[campo] = valor;
  }
  calcSimulador();
}

function _renderCenarios() {
  const container = document.getElementById('sim-cenarios');
  const mapa = getMapaClientes();
  const fabricas = Object.entries(mapa).filter(([, i]) => i.fabrica).map(([nome]) => nome);

  if (window._simCenarios.length === 0) {
    container.innerHTML = '<div style="color:var(--muted);font-size:12px;margin-bottom:12px">Clique em "+ Adicionar cenário" para comparar fábricas.</div>';
    return;
  }

  let html = '';
  window._simCenarios.forEach((c, i) => {
    const opFab = fabricas.map(f => `<option value="${f}" ${f === c.fabrica ? 'selected' : ''}>${f}</option>`).join('');
    html += `<div style="padding:12px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;margin-bottom:10px" id="sim-cen-${c.id}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="font-size:12px;font-weight:700;color:var(--muted)">CENÁRIO ${i + 1}</span>
        <button onclick="_removerCenario(${c.id})" style="background:none;border:none;cursor:pointer;font-size:16px;color:var(--muted)" title="Remover">✕</button>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Fábrica</label>
          <select class="form-input" onchange="_onCenarioChange(${c.id},'fabrica',this.value)">${opFab}</select>
        </div>
        <div class="form-group"><label class="form-label">R$/litro</label>
          <input class="form-input" type="number" min="0" step="0.01" placeholder="ex: 1.80" value="${c.valorLitro}" oninput="_onCenarioChange(${c.id},'valorLitro',this.value)">
        </div>
        <div class="form-group"><label class="form-label">Frete R$/ton</label>
          <input class="form-input" type="number" min="0" step="0.01" placeholder="ex: 180" value="${c.freteTon}" oninput="_onCenarioChange(${c.id},'freteTon',this.value)">
        </div>
      </div>
    </div>`;
  });
  container.innerHTML = html;
}

function calcSimulador() {
  const qtde = parseInt(document.getElementById('sim-qtde')?.value) || 0;
  const peso = parseFloat(document.getElementById('sim-peso')?.value) || 0;
  const estEl = document.getElementById('sim-estimativa');
  const resEl = document.getElementById('sim-resultado');

  if (qtde <= 0) {
    estEl.style.display = 'none';
    resEl.innerHTML = '';
    return;
  }

  // Litragem: regra fixa 1 litro = 2,3 cocos
  const litragem = Math.round(qtde / COCOS_POR_LITRO);

  // Mostrar resumo da carga
  estEl.style.display = '';
  estEl.innerHTML = `<strong>${fmtNum(qtde)} cocos</strong> ÷ 2,3 = <strong>${fmtNum(litragem)} litros</strong>` +
    (peso > 0 ? ` · Peso: <strong>${fmtNum(Math.round(peso))} kg</strong>` : '') +
    (!peso && window._simCenarios.some(c => parseFloat(c.freteTon) > 0) ? '<br><span style="color:var(--amarelo)">Informe o peso da carga para calcular o frete</span>' : '');

  // Calcular cada cenário
  if (window._simCenarios.length === 0) {
    resEl.innerHTML = '';
    return;
  }

  const resultados = [];
  for (const c of window._simCenarios) {
    const vlitro = parseFloat(c.valorLitro) || 0;
    const freteTon = parseFloat(c.freteTon) || 0;

    const receitaBruta = litragem * vlitro;
    const freteTotal = (freteTon > 0 && peso > 0) ? freteTon * (peso / 1000) : 0;
    const receitaLiq = receitaBruta - freteTotal;
    const rCocoEfetivo = qtde > 0 ? receitaLiq / qtde : 0;
    const freteCoco = qtde > 0 ? freteTotal / qtde : 0;

    resultados.push({
      id: c.id,
      fabrica: c.fabrica,
      vlitro,
      freteTon,
      receitaBruta,
      freteTotal,
      receitaLiq,
      rCocoEfetivo,
      freteCoco,
      completo: vlitro > 0
    });
  }

  // Ordenar por R$/coco efetivo (maior = melhor), incompletos no final
  const ordenados = [...resultados].sort((a, b) => {
    if (a.completo && !b.completo) return -1;
    if (!a.completo && b.completo) return 1;
    return (b.rCocoEfetivo || 0) - (a.rCocoEfetivo || 0);
  });

  const melhor = ordenados.find(r => r.completo);
  const temVarios = ordenados.filter(x => x.completo).length > 1;

  let html = '<div style="font-size:13px;font-weight:700;margin-bottom:10px">Resultado da Comparação</div>';

  ordenados.forEach((r, i) => {
    const isBest = temVarios && melhor && r.id === melhor.id;
    const diff = temVarios && melhor && r.completo && r.id !== melhor.id ? (r.rCocoEfetivo - melhor.rCocoEfetivo) * qtde : 0;

    html += `<div style="padding:14px 16px;background:${isBest ? 'var(--verde-bg)' : 'var(--surface2)'};border:1.5px solid ${isBest ? 'var(--verde-border)' : 'var(--border)'};border-radius:10px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <strong style="font-size:14px">${r.fabrica || 'Cenário ' + (i + 1)}</strong>
        <div style="display:flex;gap:6px;align-items:center">
          ${!r.completo ? '<span style="background:var(--amarelo-bg);color:var(--amarelo);padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700">PREENCHA R$/LITRO</span>' : ''}
          ${isBest ? '<span style="background:var(--verde);color:#fff;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700">MELHOR</span>' : ''}
          ${diff < 0 ? `<span style="background:var(--vermelho-bg);color:var(--vermelho);padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700">R$ ${fmtNum(Math.abs(Math.round(diff)))} a menos</span>` : ''}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px 16px;font-size:13px">
        <div>Receita bruta<br><strong style="font-size:15px">${r.receitaBruta > 0 ? 'R$ ' + fmtNum(Math.round(r.receitaBruta)) : '—'}</strong></div>
        <div>Frete total<br><strong style="font-size:15px;color:${r.freteTotal > 0 ? 'var(--vermelho)' : 'inherit'}">${r.freteTotal > 0 ? '- R$ ' + fmtNum(Math.round(r.freteTotal)) : (r.freteTon > 0 && !peso ? 'peso?' : '—')}</strong></div>
        <div>Receita líquida<br><strong style="font-size:15px;color:${isBest ? 'var(--verde)' : 'inherit'}">${r.receitaLiq > 0 ? 'R$ ' + fmtNum(Math.round(r.receitaLiq)) : '—'}</strong></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px 16px;font-size:11px;color:var(--muted);margin-top:8px;padding-top:8px;border-top:1px solid var(--border)">
        <div>R$/coco efetivo: <strong style="color:var(--text)">${r.rCocoEfetivo > 0 ? 'R$ ' + r.rCocoEfetivo.toFixed(3) : '—'}</strong></div>
        <div>Frete/coco: <strong style="color:var(--text)">${r.freteCoco > 0 ? 'R$ ' + r.freteCoco.toFixed(3) : '—'}</strong></div>
        <div>R$/litro: <strong style="color:var(--text)">${r.vlitro > 0 ? 'R$ ' + r.vlitro.toFixed(2) : '—'}</strong> · Frete: <strong style="color:var(--text)">${r.freteTon > 0 ? r.freteTon + '/ton' : '—'}</strong></div>
      </div>
    </div>`;
  });

  resEl.innerHTML = html;
}

// ─── CONTRATOS ───

function abrirNovoContrato(){
  const cliente=window._cliPanelNome;
  if(!cliente)return;
  document.getElementById('modal-contrato-title').textContent='Novo Contrato — '+cliente;
  document.getElementById('ctr-cliente').value=cliente;
  document.getElementById('ctr-ano').value=new Date().getFullYear();
  document.getElementById('ctr-desc').value='';
  document.getElementById('ctr-inicio').value='';
  document.getElementById('ctr-fim').value='';
  document.getElementById('ctr-obs').value='';
  // Pré-preencher frete do cadastro do cliente
  const clientes=loadClientesLocal();
  const cli=clientes.find(c=>c.nome===cliente);
  document.getElementById('ctr-frete').value=cli?.frete_por_ton||'';
  document.getElementById('ctr-dist').value=cli?.distancia_km||'';
  // Gerar linhas da tabela de cotas
  const tbody=document.getElementById('ctr-cotas-body');
  const linhas=[];
  for(let m=1;m<=12;m++){
    const mm=String(m).padStart(2,'0');
    linhas.push(`<tr>
      <td>${MESES_NOME[m-1]}</td>
      <td><input type="number" min="0" class="form-input ctr-litros" data-mes="${mm}" placeholder="0" oninput="ctrCalcTotal()" style="width:100px"></td>
      <td><input type="number" min="0" step="0.01" class="form-input ctr-preco" data-mes="${mm}" placeholder="0.00" oninput="ctrCalcTotal()" style="width:90px"></td>
    </tr>`);
  }
  tbody.innerHTML=linhas.join('');
  delete document.getElementById('ctr-cliente').dataset.editId;
  openModal('modal-contrato');
}

function abrirEditarContrato(id){
  const contratos=loadContratosLocal();
  const c=contratos.find(ct=>ct.id===id);
  if(!c)return;
  document.getElementById('modal-contrato-title').textContent='Editar Contrato — '+c.cliente;
  document.getElementById('ctr-cliente').value=c.cliente;
  document.getElementById('ctr-cliente').dataset.editId=c.id;
  document.getElementById('ctr-ano').value=c.ano;
  document.getElementById('ctr-desc').value=c.descricao||'';
  document.getElementById('ctr-inicio').value=c.dataInicio||'';
  document.getElementById('ctr-fim').value=c.dataFim||'';
  document.getElementById('ctr-frete').value=c.fretePorTon||'';
  document.getElementById('ctr-dist').value=c.distanciaKm||'';
  document.getElementById('ctr-obs').value=c.observacoes||'';
  const tbody=document.getElementById('ctr-cotas-body');
  const linhasEdit=[];
  for(let m=1;m<=12;m++){
    const mm=String(m).padStart(2,'0');
    const cota=c.cotas[mm]||{};
    linhasEdit.push(`<tr>
      <td>${MESES_NOME[m-1]}</td>
      <td><input type="number" min="0" class="form-input ctr-litros" data-mes="${mm}" value="${cota.litros||''}" placeholder="0" oninput="ctrCalcTotal()" style="width:100px"></td>
      <td><input type="number" min="0" step="0.01" class="form-input ctr-preco" data-mes="${mm}" value="${cota.valor_litro||''}" placeholder="0.00" oninput="ctrCalcTotal()" style="width:90px"></td>
    </tr>`);
  }
  tbody.innerHTML=linhasEdit.join('');
  ctrCalcTotal();
  openModal('modal-contrato');
}

function ctrCalcTotal(){
  let totalL=0,somaP=0,nP=0;
  document.querySelectorAll('.ctr-litros').forEach(el=>{
    const l=parseFloat(el.value)||0;totalL+=l;
    const mes=el.dataset.mes;
    const p=parseFloat(document.querySelector(`.ctr-preco[data-mes="${mes}"]`)?.value)||0;
    if(p>0){somaP+=p;nP++;}
  });
  document.getElementById('ctr-total-litros').textContent=fmtNum(totalL)+'L';
  document.getElementById('ctr-media-preco').textContent=nP>0?'R$ '+(somaP/nP).toFixed(2):'—';
}

function ctrCopiarJanTodos(){
  const litros=document.querySelector('.ctr-litros[data-mes="01"]')?.value||'';
  const preco=document.querySelector('.ctr-preco[data-mes="01"]')?.value||'';
  document.querySelectorAll('.ctr-litros').forEach(el=>{if(!el.value)el.value=litros;});
  document.querySelectorAll('.ctr-preco').forEach(el=>{if(!el.value)el.value=preco;});
  ctrCalcTotal();
}

function ctrVerao5(){
  ['11','12','01','02','03'].forEach(mm=>{
    const el=document.querySelector(`.ctr-litros[data-mes="${mm}"]`);
    if(el&&el.value){el.value=Math.round(parseFloat(el.value)*1.05);}
    const p=document.querySelector(`.ctr-preco[data-mes="${mm}"]`);
    if(p&&p.value){p.value=(parseFloat(p.value)*1.05).toFixed(2);}
  });
  ctrCalcTotal();
}

let _salvandoContrato = false;
async function salvarContrato(){
  if (_salvandoContrato) return;
  const cliente=document.getElementById('ctr-cliente').value;
  if (!cliente) { showToast('Selecione um cliente'); return; }
  const editId=parseInt(document.getElementById('ctr-cliente').dataset.editId)||0;
  _salvandoContrato = true;
  const _btnCtr = document.querySelector('button[onclick="salvarContrato()"]');
  if (_btnCtr) { _btnCtr.disabled = true; _btnCtr.dataset.origText = _btnCtr.textContent; _btnCtr.textContent = '⏳ Salvando...'; }
  try {
  const ano=parseInt(document.getElementById('ctr-ano').value)||new Date().getFullYear();
  const cotas={};
  document.querySelectorAll('.ctr-litros').forEach(el=>{
    const mm=el.dataset.mes;
    const litros=parseFloat(el.value)||0;
    const vl=parseFloat(document.querySelector(`.ctr-preco[data-mes="${mm}"]`)?.value)||0;
    if(litros>0||vl>0)cotas[mm]={litros,valor_litro:vl};
  });
  const contrato={
    id:editId||Date.now(),
    cliente,ano,
    descricao:(document.getElementById('ctr-desc').value||'').trim(),
    cotas,
    fretePorTon:parseFloat(document.getElementById('ctr-frete').value)||0,
    distanciaKm:parseInt(document.getElementById('ctr-dist').value)||0,
    status:'ativo',
    dataInicio:document.getElementById('ctr-inicio').value||null,
    dataFim:document.getElementById('ctr-fim').value||null,
    observacoes:(document.getElementById('ctr-obs').value||'').trim()
  };
  await salvarContratoSupabase(contrato);
  closeModal('modal-contrato');
  showToast('✓ Contrato salvo — '+cliente+' '+ano);
  // Atualizar aba contrato se painel está aberto
  if(window._cliPanelNome===cliente)renderContratoTab(cliente);
  } finally {
    _salvandoContrato = false;
    if (_btnCtr) { _btnCtr.disabled = false; _btnCtr.textContent = _btnCtr.dataset.origText || 'Salvar'; }
  }
}

function renderContratoTab(cliente){
  const el=document.getElementById('cli-contrato-content');
  if(!el)return;
  const contratos=loadContratosLocal().filter(c=>c.cliente===cliente);
  if(contratos.length===0){
    el.innerHTML='<div style="color:var(--muted);font-size:13px;padding:20px 0;text-align:center">Nenhum contrato cadastrado.</div>';
    return;
  }
  const vendas=loadVendas();
  let html='';
  for(const c of contratos){
    const agora=new Date();
    html+=`<div style="padding:14px;background:var(--surface2);border-radius:10px;border:1px solid var(--border);margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <strong>${c.descricao||'Contrato '+c.ano}</strong>
        <span style="font-size:11px;padding:3px 8px;border-radius:5px;background:${c.status==='ativo'?'var(--verde-bg)':'var(--surface)'};color:${c.status==='ativo'?'var(--verde)':'var(--muted)'}">${c.status}</span>
      </div>
      ${c.dataInicio?`<div style="font-size:11px;color:var(--muted);margin-bottom:10px">${fmtData(c.dataInicio)} — ${fmtData(c.dataFim||'')}</div>`:''}
      <div style="font-size:12px;margin-bottom:6px">Frete: R$ ${c.fretePorTon}/ton ${c.distanciaKm?'· '+c.distanciaKm+'km':''}</div>`;
    // Cotas por mês com barra de progresso
    html+='<div style="margin-top:8px">';
    for(let m=1;m<=12;m++){
      const mm=String(m).padStart(2,'0');
      const cota=c.cotas[mm];
      if(!cota)continue;
      const usado=getLitrosUsadosMes(cliente,c.id,c.ano,m);
      const pct=cota.litros>0?Math.min(100,Math.round(usado/cota.litros*100)):0;
      const cor=pct<80?'var(--verde)':pct<100?'var(--amarelo)':'var(--vermelho)';
      const isMesAtual=(m===agora.getMonth()+1&&c.ano===agora.getFullYear());
      html+=`<div style="display:grid;grid-template-columns:40px 80px 70px 1fr 40px;gap:6px;align-items:center;font-size:11px;padding:3px 0;${isMesAtual?'font-weight:700':''}">
        <span>${MESES_NOME[m-1]}</span>
        <span>${fmtNum(cota.litros)}L</span>
        <span>R$ ${cota.valor_litro.toFixed(2)}</span>
        <div style="background:var(--surface);border-radius:4px;height:8px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${cor};border-radius:4px"></div></div>
        <span style="color:${cor}">${pct}%</span>
      </div>`;
    }
    html+=`</div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="btn btn-outline" style="font-size:11px" onclick="abrirEditarContrato(${c.id})">✏️ Editar</button>
      </div>
    </div>`;
  }
  el.innerHTML=html;
}

