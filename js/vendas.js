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
  // popular lista de clientes para autocomplete
  window._acClientesLista=[...new Set(db.map(v=>v.cliente))].sort();
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
  const idx={'painel':0,'nova':1,'lista':2,'pendentes':3}[tab];
  document.querySelectorAll('.vd-tab')[idx]?.classList.add('active');
  document.getElementById('vsec-'+tab)?.classList.add('active');
  localStorage.setItem('neofrut_vendas_tab', tab);
  if(tab==='lista')renderVendasLista();
  if(tab==='pendentes')renderVendasPendentes();
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
          +'<span class="vrank-nome">'+n+'</span>'
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
  const t=parseFloat(document.getElementById('v-total')?.value)||0;
  document.getElementById('vc-cocos').textContent=q>0?fmtNum(q):'—';
  const f=parseFloat(document.getElementById('v-frete')?.value)||0;
  document.getElementById('vc-preco').textContent=q>0&&t>0?'R$ '+((t-f)/q).toFixed(2):'—';
  calcVendaRecebido();
}
function onModoLitro(){
  const litro=document.getElementById('v-modo-litro').checked;
  document.getElementById('v-campos-litro').style.display=litro?'':'none';
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
}
function calcVendaRecebido(){
  const t=parseFloat(document.getElementById('v-total')?.value)||0;
  const f=parseFloat(document.getElementById('v-frete')?.value)||0;
  const r=document.getElementById('v-recebido');
  if(r&&t>0)r.value=(t-f).toFixed(2);
}

function onClienteChange(){
  const nome=(document.getElementById('v-cliente').value||'').trim().toUpperCase();
  const info=MAPA_CLIENTES[nome];
  if(info){
    const ufSel=document.getElementById('v-uf-destino');
    const cidadeInp=document.getElementById('v-cidade-destino');
    if(ufSel)ufSel.value=info.uf||'';
    // pre-fetch cities for this UF, then set cidade
    if(info.uf&&info.uf!=='FÁBRICA'){
      onUfDestinoChange(true).then(()=>{
        if(cidadeInp)cidadeInp.value=info.cidade||'';
      });
    }else{
      if(cidadeInp)cidadeInp.value=info.cidade||'';
    }
  }
}

async function salvarVenda(){
  // tratar edição — remover original se estiver editando
  const _dataEl=document.getElementById('v-data');
  const _editandoId=parseInt(_dataEl?.dataset.editandoId||'0');
  if(_editandoId){
    const _db=loadVendas();
    saveVendas(_db.filter(v=>v.id!==_editandoId));
    delete _dataEl.dataset.editandoId;
  }
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
  erro.style.display='none';
  const areas={};
  ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{const v=parseInt(document.getElementById('va-'+a)?.value)||0;if(v>0)areas[a]=v;});
  const db=loadVendas();
  db.push({id:Date.now(),data,cliente,nf,areas,qtde,total,frete,valorRecebido:recebido,status,dataDeposito:dep,
    ufDestino:ufDestino,cidadeDestino:cidadeDestino,
    tipoVenda:litro?'litro':'coco',
    pesoKg:litro?(parseFloat(document.getElementById('v-peso')?.value)||0):null,
    litragem:litro?(parseFloat(document.getElementById('v-litragem')?.value)||0):null,
    vPorLitro:litro?(parseFloat(document.getElementById('v-vlitro')?.value)||0):null});
  saveVendas(db);
  await salvarVendaSupabase(db[db.length-1]);
  limparFormVenda();
  showVendasTab('lista');
  showToast('✓ Venda registrada — '+fmtNum(qtde)+' cocos · '+fmtR(total));
  await initVendas();
}

function limparFormVenda(){
  ['v-cliente','v-nf','v-total','v-frete','v-recebido','v-peso','v-litragem','v-vlitro','v-deposito','v-cidade-destino'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const ufSel=document.getElementById('v-uf-destino');if(ufSel)ufSel.value='';
  ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{const el=document.getElementById('va-'+a);if(el){el.value='';el.classList.remove('filled');}});
  const t=document.getElementById('va-total');if(t){t.value='';t.classList.remove('filled');}
  document.getElementById('v-data').value=today();
  document.getElementById('v-status').value='PAGO';
  document.getElementById('v-modo-litro').checked=false;
  document.getElementById('v-campos-litro').style.display='none';
  document.getElementById('v-erro').style.display='none';
  ['vc-cocos','vc-preco','vc-litro','vc-ml'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='—';});
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
  lista.sort((a,b)=>b.data.localeCompare(a.data));
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
     +'<td style="font-weight:700;color:var(--forest)">'+v.cliente+'</td>'
     +'<td style="font-family:var(--font-mono);color:var(--muted)">'+v.nf+'</td>'
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
  if(rod&&lista.length){const tFr=lista.reduce((s,v)=>s+(v.frete||0),0);const pm=tC>0?'R$ '+((tR-tFr)/tC).toFixed(2):'—';rod.textContent='Total: '+fmtNum(tC)+' cocos · Receita: '+fmtR(tR)+' · Recebido: '+fmtR(tRec)+' · R$/coco: '+pm;}
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
    grid.innerHTML=AREAS.map(a=>{
      const val=(v.areas&&v.areas[a])||'';
      return '<div class="av-wrap"><div class="av-label">'+a+'</div><input type="number" id="eva-'+a+'" class="av-inp'+(val?' filled':'')+'" value="'+val+'" min="0" oninput="onEditAreaVenda()"></div>';
    }).join('')+'<div class="av-wrap"><div class="av-label">TOTAL</div><input type="number" id="eva-total" class="av-inp filled" value="'+(v.qtde||'')+'" readonly style="font-weight:700"></div>';
  }
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

function calcEditVenda(){
  const q=parseInt(document.getElementById('eva-total')?.value)||0;
  const t=parseFloat(document.getElementById('ev-total')?.value)||0;
  const el1=document.getElementById('ev-calc-cocos');
  const el2=document.getElementById('ev-calc-preco');
  if(el1)el1.textContent=q>0?fmtNum(q):'—';
  const f=parseFloat(document.getElementById('ev-frete')?.value)||0;
  if(el2)el2.textContent=q>0&&t>0?'R$ '+((t-f)/q).toFixed(2):'—';
  const r=document.getElementById('ev-recebido');
  if(r&&t>0)r.value=(t-f).toFixed(2);
}

async function salvarEditVenda(){
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
  // atualizar campos
  v.data=data;
  v.cliente=cliente;
  v.nf=(document.getElementById('ev-nf').value||'RECIBO').trim().toUpperCase()||'RECIBO';
  v.status=document.getElementById('ev-status').value;
  v.ufDestino=document.getElementById('ev-uf')?.value||null;
  v.cidadeDestino=(document.getElementById('ev-cidade')?.value||'').trim()||null;
  v.total=total;
  v.frete=parseFloat(document.getElementById('ev-frete')?.value)||0;
  v.valorRecebido=parseFloat(document.getElementById('ev-recebido')?.value)||0;
  v.dataDeposito=document.getElementById('ev-deposito')?.value||null;
  v.qtde=qtde;
  const areas={};
  ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{const val=parseInt(document.getElementById('eva-'+a)?.value)||0;if(val>0)areas[a]=val;});
  v.areas=areas;
  saveVendas(db);
  await salvarVendaSupabase(v);
  closeEditVendaPanel();
  renderVendasLista();renderVendasPendentes();renderVendasPainel();
  showToast('✓ Venda de '+v.cliente+' atualizada');
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
      let ex=[];try{ex=JSON.parse(localStorage.getItem(SK_VENDAS)||'[]');}catch(e){}
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
function acCliente(){
  const inp=document.getElementById('v-cliente');
  const list=document.getElementById('ac-cliente-list');
  if(!inp||!list)return;
  const q=(inp.value||'').trim().toUpperCase();
  if(q.length<1){list.classList.remove('open');return;}
  const all=window._acClientesLista||[];
  const mapaNomes=Object.keys(MAPA_CLIENTES);
  const merged=[...new Set([...all,...mapaNomes])].sort();
  const filtered=merged.filter(c=>c.toUpperCase().includes(q)).slice(0,12);
  if(!filtered.length){list.classList.remove('open');return;}
  list.innerHTML=filtered.map((c,i)=>{
    const info=MAPA_CLIENTES[c];
    const sub=info?info.uf+(info.cidade&&info.cidade!=='—'?' · '+info.cidade:''):'';
    return `<div class="ac-item${i===0?' active':''}" data-val="${c.replace(/"/g,'&quot;')}" onmousedown="acSelCliente(this)">${c}${sub?'<div class="ac-sub">'+sub+'</div>':''}</div>`;
  }).join('');
  list.classList.add('open');
  window._acClienteIdx=0;
}
function acSelCliente(el){
  const inp=document.getElementById('v-cliente');
  const list=document.getElementById('ac-cliente-list');
  inp.value=el.dataset.val;
  list.classList.remove('open');
  onClienteChange();
}
// keyboard nav for cliente autocomplete
document.addEventListener('keydown',function(e){
  const list=document.getElementById('ac-cliente-list');
  if(!list||!list.classList.contains('open'))return;
  const active=document.activeElement;
  if(active&&active.id!=='v-cliente')return;
  const items=list.querySelectorAll('.ac-item');
  if(!items.length)return;
  let idx=window._acClienteIdx||0;
  if(e.key==='ArrowDown'){e.preventDefault();idx=Math.min(idx+1,items.length-1);}
  else if(e.key==='ArrowUp'){e.preventDefault();idx=Math.max(idx-1,0);}
  else if(e.key==='Enter'){e.preventDefault();acSelCliente(items[idx]);return;}
  else if(e.key==='Escape'){list.classList.remove('open');return;}
  else return;
  items.forEach(i=>i.classList.remove('active'));
  items[idx].classList.add('active');
  items[idx].scrollIntoView({block:'nearest'});
  window._acClienteIdx=idx;
});
document.addEventListener('click',function(e){
  if(!e.target.closest('#v-cliente')&&!e.target.closest('#ac-cliente-list')){
    const l=document.getElementById('ac-cliente-list');if(l)l.classList.remove('open');
  }
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

