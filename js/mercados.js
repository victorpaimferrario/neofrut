// ─────────── MERCADOS ───────────

// ── TELEFONES ──
async function carregarTelefones() {
  try {
    const { data, error } = await _SB.from('clientes_telefone').select('*');
    if(error) throw error;
    (data||[]).forEach(r => { _telefonesCache[r.nome] = r.telefone||''; });
  } catch(e) { console.warn('Telefones:', e.message); }
}

async function salvarTelefone(nome, telefone) {
  _telefonesCache[nome] = telefone;
  try {
    await _SB.from('clientes_telefone').upsert({ nome, telefone, updated_at: new Date().toISOString() });
  } catch(e) { console.warn('Salvar telefone:', e.message); }
}

function fmtTelefone(tel) {
  if(!tel) return '';
  return tel.replace(/\D/g,'');
}

function abrirWhatsApp(nome) {
  const tel = fmtTelefone(_telefonesCache[nome]||'');
  const msg = encodeURIComponent('Olá! Temos cocos verdes disponíveis. Posso te enviar nossa oferta da semana?');
  if(tel) {
    window.open('https://wa.me/55'+tel+'?text='+msg, '_blank');
  } else {
    window.open('https://wa.me/?text='+msg, '_blank');
  }
}

// NOTE: fmtN, fmtR, fmtData are defined in utils.js — no duplicates here
// Mercados uses a compact currency format for its UI
function fmtRCompact(n) { return 'R$' + (n >= 1000 ? (n/1000).toFixed(0) + 'k' : n.toFixed(0)); }

// ── HELPER ──
function round(n,d){return Math.round(n*Math.pow(10,d))/Math.pow(10,d);}

// ── RANKING ──
function getDadosRank() {
  if(_rankAno==='todos') return DADOS_UF;
  const r={};
  Object.entries(DADOS_UF).forEach(([uf,d])=>{
    const ano=d.por_ano[_rankAno];
    if(ano&&ano.cocos>0) r[uf]={...d, cocos:ano.cocos, receita:ano.receita, rpc:ano.cocos?round(ano.receita/ano.cocos,2):0};
  });
  return r;
}

function renderRanking(){
  const dados = getDadosRank();
  const lista = Object.entries(dados).sort((a,b)=>b[1].cocos-a[1].cocos);
  const maxC = Math.max(...lista.map(([,v])=>v.cocos),1);
  const maxR = Math.max(...lista.map(([,v])=>v.receita),1);
  const tbody = document.getElementById('rank-tbody');
  tbody.innerHTML='';
  lista.forEach(([uf,v],i)=>{
    const isFab = v.fabrica===true;
    const rowBg = isFab ? '#fffbea' : '';
    const nomeMostrar = escapeHtml(isFab ? '🏭 '+(v.nome_fab||uf.replace('FAB_','')) : (NOMES_UF[uf]||uf));
    const ufMostrar = isFab ? 'FÁBRICA' : uf;
    const tr=document.createElement('tr');
    tr.style.cssText='border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.1s;'+(rowBg?'background:'+rowBg+';':'');
    tr.addEventListener('mouseenter',()=>tr.style.background=isFab?'#fff8d6':'var(--surface2)');
    tr.addEventListener('mouseleave',()=>tr.style.background=rowBg);
    tr.addEventListener('click',()=>abrirModalEstado(uf));
    const pC=Math.round(v.cocos/maxC*100);
    const pR=Math.round(v.receita/maxR*100);
    tr.innerHTML='<td style="padding:10px 8px;font-size:12px;font-weight:700;color:var(--muted);font-family:var(--font-mono)">'+(i+1)+'</td>'
      +'<td style="padding:10px 8px"><span style="font-size:13px;font-weight:800;color:'+(isFab?'#856404':'var(--forest)')+'">'+nomeMostrar+'</span>'
      +' <span style="font-size:10px;font-family:var(--font-mono);color:var(--muted)">'+ufMostrar+'</span></td>'
      +'<td style="padding:10px 8px;min-width:150px"><div style="display:flex;align-items:center;gap:6px">'
        +'<div style="flex:1;height:6px;background:var(--surface2);border-radius:3px"><div style="width:'+pC+'%;height:100%;background:var(--forest);border-radius:3px"></div></div>'
        +'<span style="font-size:12px;font-weight:700;font-family:var(--font-mono);min-width:55px">'+fmtN(v.cocos)+'</span></div></td>'
      +'<td style="padding:10px 8px;min-width:150px"><div style="display:flex;align-items:center;gap:6px">'
        +'<div style="flex:1;height:6px;background:var(--surface2);border-radius:3px"><div style="width:'+pR+'%;height:100%;background:var(--teal);border-radius:3px"></div></div>'
        +'<span style="font-size:12px;font-weight:700;font-family:var(--font-mono);min-width:65px">'+fmtRCompact(v.receita)+'</span></div></td>'
      +'<td style="padding:10px 8px;font-size:11px;font-family:var(--font-mono);color:var(--muted)">'+v.rpc.toFixed(2)+'/coco</td>'
      +(()=>{
        const c24=v.por_ano?.['2024']?.cocos||0;
        const c25=v.por_ano?.['2025']?.cocos||0;
        if(!c24||!c25) return '<td style="padding:10px 8px;font-size:11px;color:var(--muted)">—</td>';
        const pct=((c25-c24)/c24*100);
        const cor=pct>0?'var(--verde)':'var(--vermelho)';
        const seta=pct>0?'↑':'↓';
        return '<td style="padding:10px 8px;font-size:12px;font-weight:800;color:'+cor+'">'+seta+Math.abs(pct).toFixed(0)+'%</td>';
      })()
      +'<td style="padding:10px 8px;font-size:11px;color:var(--muted)">→</td>';
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.btn-rank-ano').forEach(b=>b.classList.toggle('ativo',b.dataset.ano===_rankAno));
}

function initRanking(){
  const anos=Object.keys(Object.values(DADOS_UF)[0].por_ano).sort().reverse();
  const el=document.getElementById('rank-anos');
  el.innerHTML='';
  const btnT=document.createElement('button');
  btnT.className='btn-filtro btn-rank-ano ativo';btnT.textContent='Todos';btnT.dataset.ano='todos';
  btnT.addEventListener('click',()=>{_rankAno='todos';renderRanking();});
  el.appendChild(btnT);
  anos.forEach(a=>{
    const btn=document.createElement('button');
    btn.className='btn-filtro btn-rank-ano';btn.textContent=a;btn.dataset.ano=a;
    btn.addEventListener('click',()=>{_rankAno=a;renderRanking();});
    el.appendChild(btn);
  });
  renderRanking();
}

// ── MODAL ESTADO ──
function abrirModalEstado(uf){
  const d = DADOS_UF[uf];
  if(!d) return;
  const nome = NOMES_UF[uf]||uf;

  // Título
  document.getElementById('mest-titulo').textContent = nome+' ('+uf+')';

  // KPIs
  const melhorMes = Object.entries(d.por_mes).sort((a,b)=>b[1]-a[1])[0];
  const melhorMesNome = melhorMes ? MESES_NOME[parseInt(melhorMes[0])-1] : '—';
  document.getElementById('mest-kpis').innerHTML =
    kpiCard('Total cocos',fmtN(d.cocos),'var(--forest)')
   +kpiCard('Receita total',fmtRCompact(d.receita),'var(--teal)')
   +kpiCard('R$/coco médio','R$'+d.rpc.toFixed(2),'var(--muted)')
   +kpiCard('Melhor mês',melhorMesNome,'var(--amarelo)');

  // Evolução por ano
  const anos = Object.entries(d.por_ano).sort((a,b)=>a[0].localeCompare(b[0]));
  const maxAno = Math.max(...anos.map(([,v])=>v.cocos),1);
  let evoHtml = '<div style="display:flex;align-items:flex-end;gap:8px;height:80px;padding:8px 0;justify-content:center">';
  anos.forEach(([ano,v])=>{
    const h = Math.round(v.cocos/maxAno*70);
    evoHtml += '<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1">'
      +'<span style="font-size:9px;font-family:var(--font-mono);font-weight:700;color:var(--forest)">'+fmtN(v.cocos)+'</span>'
      +'<div style="width:100%;height:'+h+'px;background:var(--forest);border-radius:4px 4px 0 0;min-height:4px"></div>'
      +'<span style="font-size:9px;font-family:var(--font-mono);color:var(--muted)">'+ano+'</span>'
      +'</div>';
  });
  evoHtml += '</div>';
  document.getElementById('mest-evo').innerHTML = evoHtml;

  // Comparação outros estados
  const todos = Object.entries(DADOS_UF).sort((a,b)=>b[1].cocos-a[1].cocos);
  const pos = todos.findIndex(([u])=>u===uf)+1;
  const totalGeral = todos.reduce((s,[,v])=>s+v.cocos,0);
  const pct = (d.cocos/totalGeral*100).toFixed(1);
  document.getElementById('mest-comp').innerHTML =
    '<span style="font-size:13px;font-weight:700;color:var(--forest)">'+pos+'º lugar</span>'
    +' entre '+todos.length+' estados · '
    +'<span style="font-weight:700">'+pct+'%</span> do total de cocos vendidos';

  // Clientes — filtrar pelo mapa de clientes para mostrar apenas clientes do estado correto
  const _mapaCliRef = getMapaClientes();
  const clientes = Object.entries(d.clientes).filter(([cli]) => {
    const mapa = _mapaCliRef[cli];
    if (!mapa) return true; // cliente não mapeado, manter
    if (d.fabrica) return mapa.fabrica === true; // fábricas
    return mapa.uf === uf; // só clientes do estado correto
  }).sort((a,b)=>(b[1].ultima||'').localeCompare(a[1].ultima||''));
  const tbodyEl = document.getElementById('mest-clientes');
  tbodyEl.innerHTML='';
  clientes.forEach(([cli,cv])=>{
    const tr=document.createElement('tr');
    tr.style.borderBottom='1px solid var(--border)';
    const diasSemComprar = cv.ultima ? Math.floor((new Date()-new Date(cv.ultima+'T00:00:00'))/(1000*60*60*24)) : 999;
    const inativo = diasSemComprar > 60;
    const bgInativo = inativo ? 'background:#fff5f5;' : '';
    tr.style.cssText = 'border-bottom:1px solid var(--border);'+bgInativo;
    tr.innerHTML='<td style="padding:8px;font-size:12px;font-weight:700;color:var(--text)">'+escapeHtml(cli)
      +(inativo?'<span style="margin-left:6px;font-size:9px;font-weight:700;background:#fde8ea;color:var(--vermelho);padding:2px 5px;border-radius:4px">⚠️ +'+diasSemComprar+'d</span>':'')
      +'</td>'
      +'<td style="padding:8px;font-size:12px;font-family:var(--font-mono)">'+fmtN(cv.cocos)+'</td>'
      +'<td style="padding:8px;font-size:12px;font-family:var(--font-mono)">'+fmtRCompact(cv.receita)+'</td>'
      +'<td style="padding:8px;font-size:11px;font-family:var(--font-mono);color:'+(inativo?'var(--vermelho)':'var(--muted)')+'">'+fmtData(cv.ultima)+'</td>'
      +'</td>';
    // Célula WhatsApp com campo de telefone editável
    const tdWpp = document.createElement('td');
    tdWpp.style.padding = '6px 8px';
    const tel = _telefonesCache[cli] || '';
    const inputTel = document.createElement('input');
    inputTel.type = 'tel';
    inputTel.placeholder = '(00) 00000-0000';
    inputTel.value = tel;
    inputTel.style.cssText = 'width:130px;padding:3px 6px;border:1px solid var(--border);border-radius:5px;font-size:11px;font-family:var(--font-mono);margin-right:4px';
    inputTel.addEventListener('blur', async () => {
      await salvarTelefone(cli, inputTel.value);
    });
    const btnWpp = document.createElement('a');
    btnWpp.href = '#';
    btnWpp.textContent = '📱';
    btnWpp.title = 'Abrir WhatsApp';
    btnWpp.style.cssText = 'background:#25D366;color:#fff;padding:3px 8px;border-radius:5px;font-size:12px;font-weight:700;text-decoration:none;display:inline-block';
    btnWpp.addEventListener('click', (e) => { e.preventDefault(); abrirWhatsApp(cli); });
    tdWpp.appendChild(inputTel);
    tdWpp.appendChild(btnWpp);
    tr.appendChild(tdWpp);
    tbodyEl.appendChild(tr);
  });

  document.getElementById('modal-estado').classList.add('open');
}

function kpiCard(label,val,cor){
  return '<div style="background:var(--surface2);border-radius:8px;padding:10px 12px;flex:1;text-align:center">'
    +'<div style="font-size:10px;color:var(--muted);margin-bottom:4px">'+label+'</div>'
    +'<div style="font-size:16px;font-weight:800;font-family:var(--font-mono);color:'+cor+'">'+val+'</div>'
    +'</div>';
}

// ── SAZONALIDADE ──
function getMesSaz(d){
  if(_sazAno==='todos') return d.por_mes;
  return (d.por_mes_ano&&d.por_mes_ano[_sazAno])||{};
}

function initSazonalidade(){
  const anos=[...new Set(
    Object.values(DADOS_UF).flatMap(d=>Object.keys(d.por_mes_ano||{}))
  )].sort().reverse();
  const el=document.getElementById('saz-anos-btns');
  if(!el) return;
  el.innerHTML='';
  const btnT=document.createElement('button');
  btnT.className='btn-filtro ativo';btnT.textContent='Todos';btnT.dataset.ano='todos';
  btnT.addEventListener('click',()=>selSazAno('todos'));
  el.appendChild(btnT);
  anos.forEach(a=>{
    const btn=document.createElement('button');
    btn.className='btn-filtro';btn.textContent=a;btn.dataset.ano=a;
    btn.addEventListener('click',()=>selSazAno(a));
    el.appendChild(btn);
  });
  renderSazonalidade();
}

function selSazAno(ano){
  _sazAno=ano;
  document.querySelectorAll('#saz-anos-btns .btn-filtro').forEach(b=>b.classList.toggle('ativo',b.dataset.ano===ano));
  renderSazonalidade();
}

function renderSazonalidade(){
  const meses=Array.from({length:12},(_,i)=>i+1);
  let maxG=0;
  Object.values(DADOS_UF).forEach(d=>{
    const pm=getMesSaz(d);
    meses.forEach(m=>{maxG=Math.max(maxG,pm[String(m)]||pm[m]||0);});
  });
  const mesAtual=new Date().getMonth()+1;
  // Separar estados e fábricas
  const todosKeys=Object.keys(DADOS_UF).sort((a,b)=>DADOS_UF[b].cocos-DADOS_UF[a].cocos);
  const estados=todosKeys.filter(k=>!DADOS_UF[k].fabrica);
  const fabricasKeys=todosKeys.filter(k=>DADOS_UF[k].fabrica);
  const ordemFinal=[...estados,...fabricasKeys];
  const table=document.getElementById('saz-table');
  let html='<thead><tr><th style="padding:6px 10px;text-align:left;font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap;border-bottom:1px solid var(--border)">Estado</th>';
  meses.forEach(m=>{
    const isCur=m===mesAtual;
    html+='<th style="padding:6px 3px;font-size:10px;font-family:var(--font-mono);color:'+(isCur?'var(--forest)':'var(--muted)')+';text-align:center;border-bottom:1px solid var(--border);'+(isCur?'font-weight:800':'')+'">'+MESES_NOME[m-1]+'</th>';
  });
  html+='<th style="padding:6px 10px;font-size:10px;font-family:var(--font-mono);color:var(--muted);border-bottom:1px solid var(--border)">Total</th></tr></thead><tbody>';
  ordemFinal.forEach(uf=>{
    const d=DADOS_UF[uf];
    const pmSazTotal=getMesSaz(d); const total=meses.reduce((s,m)=>s+(pmSazTotal[String(m)]||pmSazTotal[m]||0),0);
    const isFabSaz=DADOS_UF[uf].fabrica===true;
    const nomeSaz=isFabSaz?'🏭 '+(DADOS_UF[uf].nome_fab||uf.replace('FAB_','')):(NOMES_UF[uf]||uf);
    const ufSaz=isFabSaz?'FÁBRICA':uf;
    const corNomeSaz=isFabSaz?'#856404':'var(--forest)';
    html+='<tr style="border-bottom:1px solid var(--surface2);'+(isFabSaz?'background:#fffbea;':'')+'">';
    html+='<td style="padding:6px 10px;font-size:12px;font-weight:800;color:'+corNomeSaz+';white-space:nowrap">'+nomeSaz+' <span style="font-size:9px;font-family:var(--font-mono);color:var(--muted)">'+ufSaz+'</span></td>';
    meses.forEach(m=>{
      const pmSaz=getMesSaz(d); const val=pmSaz[String(m)]||pmSaz[m]||0;
      const ratio=maxG>0?val/maxG:0;
      const alpha=val>0?(0.1+ratio*0.85).toFixed(2):'0';
      const isCur=m===mesAtual;
      const txt=val>0?val.toLocaleString('pt-BR'):'—';
      html+='<td style="padding:4px 2px;text-align:center;background:rgba(26,92,26,'+alpha+');'+(isCur?'outline:2px solid var(--forest);outline-offset:-2px;':'')+'">'
        +'<span style="font-size:9px;font-family:var(--font-mono);font-weight:700;color:'+(ratio>0.3?'#fff':'var(--text)')+'">'+txt+'</span></td>';
    });
    html+='<td style="padding:6px 10px;font-size:11px;font-family:var(--font-mono);font-weight:700;color:var(--muted)">'+total.toLocaleString('pt-BR')+'</td></tr>';
  });
  html+='</tbody>';
  table.innerHTML=html;
}

// ── OPORTUNIDADES ──
function renderOportunidades(){
  const el=document.getElementById('oport-lista');
  if(Object.keys(_dadosClima).length===0){setTimeout(renderOportunidades,800);return;}
  const mesAtual=new Date().getMonth()+1;
  const oport=[];
  CIDADES_CLIMA.forEach(c=>{
    const dados=_dadosClima[c.nome];
    if(!dados) return;
    const{dias}=dados;
    const chegadaRuim=c.chegada.some(idx=>dias[idx]?.chuva);
    const diasChegada=c.chegada.map(i=>dias[i]?.tmax||0);
    const tempMedia=diasChegada.length?diasChegada.reduce((s,v)=>s+v,0)/diasChegada.length:0;
    const d=DADOS_UF[c.uf];
    const histMes=d?.por_mes[mesAtual]||0;
    const histTotal=d?Object.values(d.por_mes).reduce((s,v)=>s+v,0):0;
    const pctMes=histTotal>0?histMes/histTotal:0;
    let score=0; const motivos=[];
    if(!chegadaRuim){score+=40;}
    if(tempMedia>=30){score+=30;motivos.push('🌡️ Calor forte ('+Math.round(tempMedia)+'°C)');}
    else if(tempMedia>=26){score+=15;motivos.push('☀️ Temp boa ('+Math.round(tempMedia)+'°C)');}
    if(pctMes>0.1){score+=20;motivos.push('📅 Bom histórico em '+MESES_NOME[mesAtual-1]);}
    if(chegadaRuim){score-=50;motivos.push('🌧️ Chuva na chegada');}
    if(score>20) oport.push({cidade:c.nome,uf:c.uf,score,motivos,chegadaRuim,tempMedia});
  });
  oport.sort((a,b)=>b.score-a.score);
  el.innerHTML='';
  if(oport.length===0){
    el.innerHTML='<div style="padding:16px;color:var(--muted);font-size:12px">Nenhuma oportunidade destacada esta semana.</div>';
    return;
  }
  oport.slice(0,6).forEach((op,i)=>{
    const div=document.createElement('div');
    div.style.cssText='padding:10px 14px;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.1s;';
    div.addEventListener('mouseenter',()=>div.style.background='var(--surface2)');
    div.addEventListener('mouseleave',()=>div.style.background='');
    const icon=i===0?'🏆':op.score>=70?'🔥':op.score>=50?'⚡':'💡';
    const cor=op.score>=70?'var(--verde)':op.score>=50?'var(--amarelo)':'var(--muted)';
    div.style.cursor='pointer';
    div.addEventListener('click',()=>abrirModalEstado(op.uf));
    div.innerHTML='<div style="display:flex;align-items:center;gap:10px">'
      +'<span style="font-size:20px">'+icon+'</span>'
      +'<div style="flex:1">'
        +'<div style="font-size:13px;font-weight:800;color:var(--forest)">'+(NOMES_UF[op.uf]||op.uf)+' — '+op.cidade+'</div>'
        +'<div style="font-size:10px;color:var(--muted);margin-top:2px">'+op.motivos.join(' · ')+'</div>'
      +'</div>'
      +'<div style="display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:16px;font-weight:800;font-family:var(--font-mono);color:'+cor+'">'+op.score+'pts</span>'
        +'<span style="font-size:11px;color:var(--forest);font-weight:700">Ver clientes →</span>'
      +'</div>'
      +'</div>';
    el.appendChild(div);
  });
}

// ── CLIMA ──
// Cidades customizadas (adicionadas pelo usuário) — persistidas em localStorage
const SK_CIDADES_CLIMA_CUSTOM = 'neofrut_cidades_clima_custom_v1';
// Cidades padrão removidas pelo usuário (exclusão) — persistidas em localStorage
const SK_CIDADES_CLIMA_REMOVIDAS = 'neofrut_cidades_clima_removidas_v1';
function _chaveCidade(c){ return (c.nome||'').toLowerCase()+'|'+(c.uf||'').toUpperCase(); }
function loadCidadesClimaCustom(){
  try { return JSON.parse(localStorage.getItem(SK_CIDADES_CLIMA_CUSTOM) || '[]'); }
  catch(e) { return []; }
}
function saveCidadesClimaCustom(arr){
  localStorage.setItem(SK_CIDADES_CLIMA_CUSTOM, JSON.stringify(arr));
}
function loadCidadesClimaRemovidas(){
  try { return JSON.parse(localStorage.getItem(SK_CIDADES_CLIMA_REMOVIDAS) || '[]'); }
  catch(e) { return []; }
}
function saveCidadesClimaRemovidas(arr){
  localStorage.setItem(SK_CIDADES_CLIMA_REMOVIDAS, JSON.stringify(arr));
}
function getCidadesClima(){
  // Mescla cidades padrão (config.js) + customizadas (localStorage),
  // excluindo as que o usuário removeu
  const custom = loadCidadesClimaCustom();
  const removidas = new Set(loadCidadesClimaRemovidas());
  const todas = CIDADES_CLIMA.concat(custom);
  return todas.filter(c => !removidas.has(_chaveCidade(c)));
}
function fmtDia(s){const d=new Date(s+'T12:00:00');return DIAS_PT[d.getDay()]+' '+d.getDate()+'/'+MESES_PT[d.getMonth()];}
function wcEmoji(wc){if(wc<=1)return'☀️';if(wc<=3)return'🌤️';if(wc<=48)return'☁️';if(wc<=67)return'🌧️';if(wc<=77)return'❄️';return'⛈️';}
function wcDesc(wc){if(wc<=1)return'Sol aberto';if(wc<=3)return'Nublado';if(wc<=48)return'Névoa';if(wc<=57)return'Garoa';if(wc<=67)return'Chuva';return'Tempestade';}
function temChuva(wc){return wc>=51;}

// Cache persistente em localStorage (sobrevive recarregamento)
const SK_CLIMA_CACHE = 'neofrut_clima_cache_v1';
function _loadClimaCachePersistente(){
  try {
    const raw = localStorage.getItem(SK_CLIMA_CACHE);
    if (!raw) return;
    const obj = JSON.parse(raw);
    Object.keys(obj).forEach(k => {
      if (!_dadosClima[k]) _dadosClima[k] = obj[k];
    });
  } catch(e) { console.warn('clima cache load:', e.message); }
}
function _saveClimaCachePersistente(){
  try { localStorage.setItem(SK_CLIMA_CACHE, JSON.stringify(_dadosClima)); }
  catch(e) { console.warn('clima cache save:', e.message); }
}

async function carregarClima(){
  const grid=document.getElementById('clima-grid');
  const alertaEl=document.getElementById('alerta');
  const alertaTxt=document.getElementById('alerta-txt');
  const cidadesChuva=[];
  // Carregar cache persistente do localStorage na primeira chamada
  _loadClimaCachePersistente();
  const cidades = getCidadesClima();
  // Se já tem dados em cache, renderizar imediatamente
  const temCache=Object.keys(_dadosClima).length>=cidades.length;
  if(!temCache&&grid) grid.innerHTML='<div style="grid-column:1/-1;padding:20px;color:var(--muted);font-size:13px;text-align:center">⏳ Carregando previsão do tempo...</div>';
  const resultados=await Promise.all(cidades.map(async c=>{
    try{
      // Usar cache se disponível e recente (menos de 30min)
      if(_dadosClima[c.nome]&&_dadosClima[c.nome]._ts&&Date.now()-_dadosClima[c.nome]._ts<1800000){
        const cached=_dadosClima[c.nome];
        const chegadaRuim=c.chegada.some(i=>cached.dias[i]?.chuva);
        if(chegadaRuim)cidadesChuva.push(c.nome+'/'+c.uf);
        return{c,dias:cached.dias,chegadaRuim,ok:true,stale:false};
      }
      const url='https://api.open-meteo.com/v1/forecast?latitude='+c.lat+'&longitude='+c.lon
        +'&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum'
        +'&timezone=America%2FSao_Paulo&forecast_days=16';
      let resp;
      let lastErr = null;
      for(let tentativa=0;tentativa<3;tentativa++){
        const ctrl = new AbortController();
        const tid = setTimeout(()=>ctrl.abort(), 15000);
        try{
          resp = await fetch(url, {signal:ctrl.signal, cache:'no-store'});
          clearTimeout(tid);
          if(resp&&resp.ok) break;
          lastErr = new Error('HTTP '+(resp?resp.status:'?'));
        }catch(e){
          clearTimeout(tid);
          lastErr = e;
        }
        if (tentativa < 2) await new Promise(r=>setTimeout(r, 600 * (tentativa+1)));
      }
      if(!resp||!resp.ok) throw lastErr || new Error('falha');
      const d=await resp.json();const dl=d.daily;
      if(!dl||!dl.time||!dl.time.length) throw new Error('payload vazio');
      const dias=dl.time.map((dt,i)=>({
        data:fmtDia(dt),wc:dl.weathercode[i],
        tmax:Math.round(dl.temperature_2m_max[i]),
        tmin:Math.round(dl.temperature_2m_min[i]),
        mm:parseFloat(dl.precipitation_sum[i]||0).toFixed(1),
        chuva:temChuva(dl.weathercode[i])
      }));
      _dadosClima[c.nome]={cidade:c,dias,_ts:Date.now()};
      const chegadaRuim=c.chegada.some(i=>dias[i]?.chuva);
      if(chegadaRuim)cidadesChuva.push(c.nome+'/'+c.uf);
      return{c,dias,chegadaRuim,ok:true,stale:false};
    }catch(e){
      console.warn('clima',c.nome,e.message);
      // Fallback: usar cache antigo (mesmo se >30min) para não exibir "Sem dados"
      if(_dadosClima[c.nome] && _dadosClima[c.nome].dias){
        const cached=_dadosClima[c.nome];
        const chegadaRuim=c.chegada.some(i=>cached.dias[i]?.chuva);
        if(chegadaRuim)cidadesChuva.push(c.nome+'/'+c.uf);
        return{c,dias:cached.dias,chegadaRuim,ok:true,stale:true};
      }
      return{c,dias:null,chegadaRuim:false,ok:false,stale:false};
    }
  }));
  // Salvar cache persistente após bateria de fetches
  _saveClimaCachePersistente();
  grid.innerHTML='';
  resultados.forEach(r=>{
    const card=document.createElement('div');
    const _d0 = r.dias && r.dias[0];
    const _altaDemanda = _d0 && !_d0.chuva && _d0.tmax >= 30;
    const _favoravel = _d0 && !_d0.chuva && _d0.tmax >= 28 && _d0.tmax < 30;
    card.className='clima-card'+(r.chegadaRuim?' ruim':_altaDemanda?' alta-demanda':_favoravel?' otimo':'');
    if(!r.ok||!r.dias||!r.dias.length){
      const safeNome = escapeHtml(r.c.nome);
      const safeUf = escapeHtml(r.c.uf);
      card.innerHTML='<div class="card-header" style="position:relative"><span class="card-cidade">'+safeNome+'</span><span class="card-uf"> '+safeUf+'</span><button class="card-remove-btn" onclick="event.stopPropagation();removerCidadeClima(\''+safeNome.replace(/'/g,"\\'")+'\',\''+safeUf+'\')" title="Remover cidade" style="position:absolute;top:2px;right:4px;background:none;border:none;color:var(--vermelho);cursor:pointer;font-size:14px;line-height:1;padding:2px 4px">✕</button></div><div class="card-loading" style="display:flex;flex-direction:column;gap:6px;align-items:center"><span>⚠️ Sem dados</span><button onclick="event.stopPropagation();carregarClima()" style="font-size:10px;padding:4px 10px;border:1px solid var(--border);background:var(--surface);border-radius:6px;cursor:pointer">↻ Tentar novamente</button></div>';
      grid.appendChild(card);return;
    }
    if(r.stale){card.style.opacity='0.75';card.title='Dados em cache (API indisponível)';}
    const diasCard=r.dias.slice(0,7);
    const bCls=r.chegadaRuim?'ruim':_altaDemanda?'alta':_favoravel?'ok':'neutro';
    const bTxt=r.chegadaRuim?'🌧️ CHUVA NA CHEGADA':_altaDemanda?'🔥 ALTA DEMANDA':_favoravel?'☀️ FAVORÁVEL':'🌤️ NEUTRO';
    const hdr=document.createElement('div');hdr.className='card-header';hdr.style.position='relative';
    const safeNomeR=escapeHtml(r.c.nome);
    const safeUfR=escapeHtml(r.c.uf);
    hdr.innerHTML='<span class="card-cidade">'+safeNomeR+'</span><span class="card-uf"> '+safeUfR+'</span>'
      +'<button class="card-remove-btn" onclick="event.stopPropagation();removerCidadeClima(\''+safeNomeR.replace(/'/g,"\\'")+'\',\''+safeUfR+'\')" title="Remover cidade" style="position:absolute;top:2px;right:4px;background:none;border:none;color:var(--vermelho);cursor:pointer;font-size:14px;line-height:1;padding:2px 4px;opacity:0.65">✕</button>';
    card.appendChild(hdr);
    const bdg=document.createElement('span');bdg.className='card-badge '+bCls;bdg.textContent=bTxt;card.appendChild(bdg);
    const ftr=document.createElement('div');ftr.className='card-footer';
    const tbl=document.createElement('table');tbl.className='dias-table';
    const thead=document.createElement('thead');const trH=document.createElement('tr');
    diasCard.forEach(di=>{const th=document.createElement('th');th.textContent=di.data;trH.appendChild(th);});
    thead.appendChild(trH);tbl.appendChild(thead);
    const tbdy=document.createElement('tbody');
    const trE=document.createElement('tr');const trT=document.createElement('tr');
    diasCard.forEach((di,i)=>{
      const cls=r.c.chegada.includes(i)?(di.chuva?'chegada-ruim':'chegada'):'';
      const tdE=document.createElement('td');tdE.className=cls;
      const spE=document.createElement('span');spE.className='dia-emoji';spE.textContent=wcEmoji(di.wc);tdE.appendChild(spE);
      if(parseFloat(di.mm)>0){const mm=document.createElement('span');mm.className='dia-mm';mm.textContent=di.mm+'mm';tdE.appendChild(mm);}
      trE.appendChild(tdE);
      const tdT=document.createElement('td');tdT.className=cls;
      const spT=document.createElement('span');spT.className='dia-temp';spT.textContent=di.tmax+'°';tdT.appendChild(spT);
      trT.appendChild(tdT);
    });
    tbdy.appendChild(trE);tbdy.appendChild(trT);tbl.appendChild(tbdy);
    const tft=document.createElement('tfoot');const trF=document.createElement('tr');
    diasCard.forEach((di,i)=>{
      const td=document.createElement('td');
      if(r.c.chegada.includes(i)){const sp=document.createElement('span');sp.className=di.chuva?'tag-ch-ruim':'tag-ch';sp.textContent=(i===0?'hoje':'+'+i+'d');td.appendChild(sp);}
      trF.appendChild(td);
    });
    tft.appendChild(trF);tbl.appendChild(tft);
    ftr.appendChild(tbl);card.appendChild(ftr);
    card.addEventListener('click',()=>abrirModalClima(r.c.nome));
    grid.appendChild(card);
  });
  if(cidadesChuva.length>0){
    alertaEl.classList.add('show');
    alertaTxt.innerHTML='<strong>🌧️ Chuva prevista na chegada (dia +2 ou +3) em:</strong> '+cidadesChuva.join(', ')+' — avalie antes de carregar';
  }
  renderOportunidades();
}

// ── MODAL ADICIONAR CIDADE ──
function abrirModalAddCidade(){
  const ufSel = document.getElementById('addcid-uf');
  const cidSel = document.getElementById('addcid-cidade');
  const erro = document.getElementById('addcid-erro');
  // Popular UFs uma única vez
  if (ufSel && ufSel.options.length <= 1 && typeof UFS_LISTA !== 'undefined') {
    UFS_LISTA.forEach(([s,n]) => {
      const o = document.createElement('option');
      o.value = s;
      o.textContent = s + ' — ' + n;
      ufSel.appendChild(o);
    });
  }
  if (ufSel) ufSel.value = '';
  if (cidSel) {
    cidSel.innerHTML = '<option value="">— Selecione a UF primeiro —</option>';
    cidSel.disabled = true;
  }
  document.getElementById('addcid-chegada').value = '2';
  if (erro) { erro.style.display = 'none'; erro.textContent = ''; }
  openModal('modal-add-cidade');
}

// Ao escolher UF, popular cidades filtradas (excluindo as já cadastradas no clima)
function onChangeUfAddCidade(){
  const uf = (document.getElementById('addcid-uf').value || '').toUpperCase();
  const cidSel = document.getElementById('addcid-cidade');
  if (!cidSel) return;
  cidSel.innerHTML = '';
  if (!uf || typeof CIDADES_BR_DB === 'undefined' || !CIDADES_BR_DB[uf]) {
    cidSel.innerHTML = '<option value="">— Selecione a UF primeiro —</option>';
    cidSel.disabled = true;
    return;
  }
  // Filtrar cidades já cadastradas (pelo nome+uf)
  const jaCad = new Set(getCidadesClima().map(c => (c.nome||'').toLowerCase()+'|'+(c.uf||'').toUpperCase()));
  const lista = CIDADES_BR_DB[uf]
    .map(c => ({...c, uf}))
    .filter(c => !jaCad.has(c.nome.toLowerCase()+'|'+uf))
    .sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  if (lista.length === 0) {
    cidSel.innerHTML = '<option value="">Todas as cidades desta UF já estão cadastradas</option>';
    cidSel.disabled = true;
    return;
  }
  cidSel.disabled = false;
  cidSel.innerHTML = '<option value="">— Selecione a cidade —</option>'
    + lista.map(c => `<option value="${escapeHtml(c.nome)}" data-lat="${c.lat}" data-lon="${c.lon}">${escapeHtml(c.nome)}</option>`).join('');
}

function salvarCidadeClima(){
  const erro = document.getElementById('addcid-erro');
  const ufSel = document.getElementById('addcid-uf');
  const cidSel = document.getElementById('addcid-cidade');
  const uf = (ufSel?.value || '').toUpperCase();
  const nome = (cidSel?.value || '').trim();
  const chegada = parseInt(document.getElementById('addcid-chegada').value || '2');

  function showErr(msg){ if (erro) { erro.textContent = msg; erro.style.display = 'block'; } }

  if (!uf) return showErr('Selecione a UF.');
  if (!nome) return showErr('Selecione a cidade.');

  const opt = cidSel.options[cidSel.selectedIndex];
  const lat = parseFloat(opt?.dataset?.lat);
  const lon = parseFloat(opt?.dataset?.lon);
  if (isNaN(lat) || isNaN(lon)) return showErr('Coordenadas não encontradas para essa cidade.');

  // Se a cidade estava na lista de removidas (era padrão), só reativar
  const removidas = loadCidadesClimaRemovidas();
  const chave = nome.toLowerCase() + '|' + uf;
  if (removidas.includes(chave)) {
    saveCidadesClimaRemovidas(removidas.filter(k => k !== chave));
  } else {
    // Senão, adicionar como customizada
    const jaCad = getCidadesClima().find(c => _chaveCidade(c) === chave);
    if (jaCad) return showErr('Essa cidade já está cadastrada.');
    const custom = loadCidadesClimaCustom();
    custom.push({ nome, uf, lat, lon, chegada: [chegada] });
    saveCidadesClimaCustom(custom);
  }

  delete _dadosClima[nome];
  closeModal('modal-add-cidade');
  showToast('✓ ' + nome + '/' + uf + ' adicionada — atualizando previsão...');
  carregarClima();
}

// Remove cidade (padrão ou customizada) pela chave nome|uf
function removerCidadeClima(nome, uf){
  if (!nome || !uf) return;
  if (!confirm('Remover ' + nome + '/' + uf + ' do painel de clima?')) return;
  const chave = nome.toLowerCase() + '|' + uf.toUpperCase();
  // Se é customizada, tira do custom
  const custom = loadCidadesClimaCustom();
  const idxCustom = custom.findIndex(c => _chaveCidade(c) === chave);
  if (idxCustom >= 0) {
    custom.splice(idxCustom, 1);
    saveCidadesClimaCustom(custom);
  } else {
    // É padrão — adiciona na lista de removidas
    const removidas = loadCidadesClimaRemovidas();
    if (!removidas.includes(chave)) {
      removidas.push(chave);
      saveCidadesClimaRemovidas(removidas);
    }
  }
  delete _dadosClima[nome];
  showToast('Cidade removida');
  carregarClima();
}

// ── MODAL CLIMA ──
function abrirModalClima(nome){
  const dados=_dadosClima[nome];if(!dados){alert('Aguarde o carregamento.');return;}
  const{cidade,dias}=dados;
  document.getElementById('mclima-titulo').textContent=cidade.nome+' / '+cidade.uf;
  const chegadaRuim=cidade.chegada.some(idx=>dias[idx]?.chuva);
  const subEl=document.getElementById('mclima-sub');
  subEl.textContent=chegadaRuim?'🌧️ Chuva prevista na chegada — desfavorável':'☀️ Sem chuva na chegada — favorável';
  subEl.style.background=chegadaRuim?'var(--vermelho-bg)':'var(--verde-bg)';
  subEl.style.color=chegadaRuim?'var(--vermelho)':'var(--verde)';
  const grid=document.getElementById('mclima-dias');grid.innerHTML='';
  dias.forEach((di,i)=>{
    const isC=dados.cidade.chegada.includes(i);
    const div=document.createElement('div');div.className='modal-dia'+(isC?(di.chuva?' chegada-ruim':' chegada'):'');
    let h='<div class="modal-dia-data">'+di.data+'</div>'
      +'<div class="modal-dia-emoji">'+wcEmoji(di.wc)+'</div>'
      +'<div class="modal-dia-tmax">'+di.tmax+'°</div>'
      +'<div class="modal-dia-tmin">mín '+di.tmin+'°</div>';
    if(parseFloat(di.mm)>0)h+='<div class="modal-dia-mm">🌧️ '+di.mm+'mm</div>';
    h+='<div class="modal-dia-desc">'+wcDesc(di.wc)+'</div>';
    if(isC)h+='<div><span class="modal-tag '+(di.chuva?'chegada-ruim':'chegada')+'">'+(i===0?'hoje':'+'+i+'d')+'</span></div>';
    div.innerHTML=h;grid.appendChild(div);
  });
  document.getElementById('modal-clima').classList.add('open');
}

function fecharModal(id){document.getElementById(id).classList.remove('open');}

// ── HEATMAP DIAS DA SEMANA ──
function renderHeatmapDias(){
  const DIAS_SEMANA=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const max=Math.max(...Object.values(HEATMAP_DIAS).map(d=>d.cocos),1);
  const wrap=document.getElementById('heatmap-dias');
  if(!wrap) return;
  wrap.innerHTML='';
  DIAS_SEMANA.forEach((dia,i)=>{
    const d=HEATMAP_DIAS[String(i)]||{cocos:0,n:0};
    const ratio=d.cocos/max;
    const alpha=(0.1+ratio*0.85).toFixed(2);
    const isUtil=i>=1&&i<=5;
    const div=document.createElement('div');
    div.style.cssText='flex:1;border-radius:10px;padding:12px 8px;text-align:center;'
      +'background:rgba(26,92,26,'+alpha+');'
      +'border:1.5px solid '+(isUtil?'rgba(26,92,26,0.2)':'rgba(200,200,200,0.3)')+';';
    div.innerHTML='<div style="font-size:11px;font-weight:800;color:'+(ratio>0.4?'#fff':'var(--text)')+'">'+dia+'</div>'
      +'<div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:'+(ratio>0.4?'#fff':'var(--forest)')+'">'+d.cocos.toLocaleString('pt-BR')+'</div>'
      +'<div style="font-size:9px;color:'+(ratio>0.4?'rgba(255,255,255,0.8)':'var(--muted)')+'">'+d.n+' vendas</div>';
    wrap.appendChild(div);
  });
}

// ── INIT MERCADOS ──
function initMercados(){
  // Renderizar componentes do painel de mercados
  initRanking();
  initSazonalidade();
  renderHeatmapDias();
  carregarClima();
}
