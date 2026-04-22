// ─────────── DASHBOARD ───────────

let currentArea = null;
let currentFilter = 'todos';
let currentEitoId = null;
let _mapaFiltro = 'todos';

// Busca contagens pendentes do Nado e mostra alerta laranja no topo do Painel
async function renderAlertaNadoPendentes() {
  const alertEl = document.getElementById('alerta-nado-pendentes');
  const txtEl = document.getElementById('alerta-nado-pendentes-txt');
  if (!alertEl || !txtEl) return;
  try {
    const pendentes = await loadContagemsNado('pendente').catch(() => []);
    const n = pendentes.length;
    if (n > 0) {
      alertEl.style.display = 'flex';
      txtEl.textContent = `${n} contagem${n > 1 ? 's' : ''} do campo pendente${n > 1 ? 's' : ''} de validação`;
    } else {
      alertEl.style.display = 'none';
    }
  } catch(e) {
    // Em caso de falha, não mostrar alerta (evita ruído)
    alertEl.style.display = 'none';
  }
}

function renderDashboard() {
  const hoje = new Date();
  document.getElementById('hoje-badge').textContent =
    hoje.toLocaleDateString('pt-BR', {weekday:'long', year:'numeric', month:'long', day:'numeric'}).toUpperCase();

  const anoAtual = new Date().getFullYear();
  const anoStr   = String(anoAtual);

  // frutos/planta/ano por área — soma colheitas do ano calendário ÷ plantas da área
  const fppArea = {};
  const colhidosAnoArea = {};
  let totalEitos=0, totalVerdes=0, totalAmareloDash=0, totalVermelho=0, totalCritico=0, totalCocos=0;
  // Estimativa de cocos por status (média histórica de cada eito)
  let cocosCritico=0, cocosVermelho=0, cocosAmarelo=0, cocosVerde=0;
  let totalPlantas=0, ultimaDataGlobal=null;
  let fppFazendaCocos=0, fppFazendaPlantas=0;
  let colhidosMes=0, colhidosAno=0;
  const mesAtual = String(anoAtual)+'-'+String(hoje.getMonth()+1).padStart(2,'0');

  for (const [area, eitos] of Object.entries(DB)) {
    let cocosAnoArea=0, plantasArea=0;
    for (const e of eitos) {
      // Usar última completa para semáforo (ignora parciais)
      const ult  = getUltimaCompleta(e) || getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st   = statusDias(dias);
      totalEitos++;
      totalPlantas += e.plantas || 0;
      plantasArea  += e.plantas || 0;
      // Estimativa: média histórica de cocos por colheita deste eito
      const mediaEito = (e.historico && e.historico.length > 0)
        ? Math.round(e.historico.reduce((s,h)=>s+(h.total||0),0) / e.historico.length)
        : 0;
      if (st==='verde') { totalVerdes++; cocosVerde += mediaEito; }
      else if (st==='amarelo') { totalAmareloDash++; cocosAmarelo += mediaEito; }
      else if (st==='vermelho') { totalVermelho++; cocosVermelho += mediaEito; }
      else if (st==='critico') { totalVermelho++; totalCritico++; cocosCritico += mediaEito; }
      if (ult && (!ultimaDataGlobal || ult.data > ultimaDataGlobal)) ultimaDataGlobal = ult.data;
      if (ult) totalCocos += ult.total;
      // somar colheitas do ano calendário
      for (const h of (e.historico || [])) {
        if (h.data && h.data.startsWith(anoStr)) {
          cocosAnoArea += h.total || 0;
          if (h.data.startsWith(mesAtual)) colhidosMes += h.total || 0;
        }
      }
    }
    fppArea[area] = plantasArea > 0 ? cocosAnoArea / plantasArea : null;
    colhidosAnoArea[area] = cocosAnoArea;
    fppFazendaCocos  += cocosAnoArea;
    fppFazendaPlantas += plantasArea;
  }
  colhidosAno = fppFazendaCocos;

  const fppFazenda  = fppFazendaPlantas > 0 ? (fppFazendaCocos / fppFazendaPlantas).toFixed(0) : '—';
  const diasUltima  = ultimaDataGlobal ? diasDesde(ultimaDataGlobal) : null;
  const ultimaStr   = ultimaDataGlobal ? `${fmtData(ultimaDataGlobal)} (${diasUltima}d atrás)` : '—';

  // cor pelo benchmark 300 frutos/planta/ano
  function corFpp(v) {
    if (v === null) return 'var(--muted)';
    if (v >= 300) return 'var(--verde)';
    if (v >= 200) return 'var(--amarelo)';
    return 'var(--vermelho)';
  }

    // alerta de vencidos
  const alertEl = document.getElementById('alerta-vencidos');
  if (alertEl) {
    if (totalCritico > 0) {
      alertEl.style.display = 'flex';
      alertEl.style.background = 'var(--critico-bg)';
      alertEl.style.borderColor = 'var(--critico-border)';
      alertEl.style.color = 'var(--critico)';
      document.getElementById('alerta-vencidos-txt').textContent =
        `${totalCritico} eito${totalCritico>1?'s':''} CRÍTICO${totalCritico>1?'S':''} (+32 dias) — verificar plantas!`;
    } else if (totalVermelho > 0) {
      alertEl.style.display = 'flex';
      alertEl.style.background = '';
      alertEl.style.borderColor = '';
      alertEl.style.color = '';
      document.getElementById('alerta-vencidos-txt').textContent =
        `${totalVermelho} eito${totalVermelho>1?'s':''} vencido${totalVermelho>1?'s':''} — colheita urgente!`;
    } else {
      alertEl.style.display = 'none';
    }
  }

  // Alerta de contagens do Nado pendentes de validação
  renderAlertaNadoPendentes();

  const nomesMes = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const mesNome = nomesMes[hoje.getMonth()+1];
  // Helper para renderizar KPI com eitos + cocos estimados lado a lado
  function kpiStatus(cls, emoji, label, legenda, eitos, cocos, filtro) {
    return `<div class="kpi kpi-status ${cls} clicavel" onclick="abrirTodasFiltrado('${filtro}')" title="Ver eitos ${label.toLowerCase()} (${legenda})">
      <div class="kpi-label">${emoji} ${label} <span class="kpi-legenda">${legenda}</span></div>
      <div class="kpi-status-body">
        <div class="kpi-status-cell">
          <div class="kpi-value">${fmtNum(eitos)}</div>
          <div class="kpi-status-unit">eitos</div>
        </div>
        <div class="kpi-status-cell">
          <div class="kpi-value">${fmtNum(cocos)}</div>
          <div class="kpi-status-unit">cocos</div>
        </div>
      </div>
    </div>`;
  }
  document.getElementById('kpi-grid').innerHTML = `
    ${totalCritico>0 ? kpiStatus('critico','🟣','Crítico','+32 dias',totalCritico,cocosCritico,'critico') : ''}
    ${kpiStatus('vermelho','🔴','Vencidos','21–31 dias',totalVermelho - totalCritico,cocosVermelho,'vermelho')}
    ${kpiStatus('amarelo','🟡','Atenção','15–20 dias',totalAmareloDash,cocosAmarelo,'amarelo')}
    ${kpiStatus('verde','🟢','Em dia','1–14 dias',totalVerdes,cocosVerde,'verde')}
    <div class="kpi clicavel" style="text-align:center;border-left-color:var(--teal)" onclick="abrirColhidosMes()" title="Ver colhidos do mês"><div class="kpi-label">🥥 Colhidos ${mesNome}</div><div class="kpi-value" style="color:var(--teal)">${fmtNum(colhidosMes)}</div><div class="kpi-sub">mês atual</div></div>
    <div class="kpi clicavel" style="text-align:center;border-left-color:var(--forest)" onclick="abrirColhidosAno()" title="Ver colhidos por área no ano"><div class="kpi-label">🌴 Colhidos ${anoStr}</div><div class="kpi-value" style="color:var(--forest)">${fmtNum(colhidosAno)}</div><div class="kpi-sub">todas as áreas</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-label">Plantas Ativas</div><div class="kpi-value" style="color:var(--forest)">${fmtNum(totalPlantas)}</div><div class="kpi-sub">${totalEitos} eitos</div></div>
    <div class="kpi" style="text-align:center;border-color:${corFpp(parseFloat(fppFazenda)||0)}"><div class="kpi-label">Fr/Pl/${anoStr}</div><div class="kpi-value" style="color:${corFpp(parseFloat(fppFazenda)||0)}">${fppFazenda}</div><div class="kpi-sub">meta: 300</div></div>
  `;

  const grid = document.getElementById('areas-grid');
  const areasOrdenadas = ORDEM_AREAS.filter(a=>DB[a]).map(a=>[a,DB[a]]);
  // incluir áreas que existam em DB mas não estejam na ordem definida
  Object.keys(DB).forEach(a=>{if(!ORDEM_AREAS.includes(a))areasOrdenadas.push([a,DB[a]]);});
  const areaCardsHtml = [];
  for (const [area, eitos] of areasOrdenadas) {
    let v=0,a=0,r=0,c=0,s=0,cocos=0,plantas=0;
    let maisAntiga = null, maisRecente = null;
    let somaMediaPl=0, eitosComColheita=0;
    let projecaoVencidos=0;
    for (const e of eitos) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st = statusDias(dias);
      if (st==='verde') v++;
      else if (st==='amarelo') a++;
      else if (st==='critico') {
        c++; r++;
        if (e.historico && e.historico.length > 0) {
          const somaHist = e.historico.reduce((s,h)=>s+(h.total||0),0);
          projecaoVencidos += Math.round(somaHist / e.historico.length);
        }
      }
      else if (st==='vermelho') {
        r++;
        if (e.historico && e.historico.length > 0) {
          const somaHist = e.historico.reduce((s,h)=>s+(h.total||0),0);
          projecaoVencidos += Math.round(somaHist / e.historico.length);
        }
      }
      else s++;
      if (ult) {
        cocos += ult.total;
        if (e.plantas > 0) { somaMediaPl += ult.total / e.plantas; eitosComColheita++; }
        if (maisAntiga === null || ult.data < maisAntiga) maisAntiga = ult.data;
        if (maisRecente === null || ult.data > maisRecente) maisRecente = ult.data;
      }
      plantas += e.plantas;
    }
    const diasSemColheita = maisRecente ? diasDesde(maisRecente) : null;
    const diasSemCor = diasSemColheita === null ? 'var(--muted)'
      : diasSemColheita <= 7  ? 'var(--verde)'
      : diasSemColheita <= 14 ? 'var(--amarelo)'
      : 'var(--vermelho)';
    const diasSemTxt = diasSemColheita !== null ? `${diasSemColheita}d` : '—';
    const mediaPl = eitosComColheita > 0 ? (somaMediaPl / eitosComColheita) : null;
    const mediaPlFmt = mediaPl !== null ? mediaPl.toFixed(1) : '—';
    const mediaPlColor = mediaPl === null ? 'var(--muted)' : mediaPl >= 8 ? 'var(--verde)' : mediaPl >= 5 ? 'var(--amarelo)' : 'var(--vermelho)';
    const total = eitos.length;
    const pv = (v/total*100).toFixed(0), pa = (a/total*100).toFixed(0),
          pc = (c/total*100).toFixed(0), prr = ((r-c)/total*100).toFixed(0), ps = (s/total*100).toFixed(0);
    const badgeCritico = c > 0 ? `<span class="critico-tag">${c} CRÍTICO${c>1?'S':''}</span>` : '';
    const badgeVencido = (r-c) > 0 ? `<span class="urgente-tag">${r-c} VENCIDO${(r-c)>1?'S':''}</span>` : '';
    const urgente = r > 0 ? `${badgeCritico}${badgeVencido}${projecaoVencidos>0?'<span style="font-size:10px;font-family:var(--font-mono);color:var(--vermelho);font-weight:700">≈ '+fmtNum(projecaoVencidos)+' cocos</span>':''}` : '';

    areaCardsHtml.push(`
      <div class="area-card" onclick="openArea('${area}')">
        <div class="area-card-header">
          <div>
            <div class="area-name">${area}</div>
            <div class="area-meta">${total} eitos · ${fmtNum(plantas)} plantas</div>
          </div>
          <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            ${urgente}
            <div style="font-size:11px;font-family:var(--font-mono);color:${diasSemCor};text-align:right">
              <div style="font-weight:700">${diasSemTxt} sem colheita</div>
              <div style="font-weight:400;opacity:0.85">Ult. ${fmtData(maisRecente)||'—'}</div>
            </div>
          </div>
        </div>
        <div class="area-bar">
          <div class="bar-seg bar-verde" style="width:${pv}%"></div>
          <div class="bar-seg bar-amarelo" style="width:${pa}%"></div>
          <div class="bar-seg bar-vermelho" style="width:${prr}%"></div>
          <div class="bar-seg bar-critico" style="width:${pc}%"></div>
          <div class="bar-seg bar-sem" style="width:${ps}%"></div>
        </div>
        <div class="area-stats">
          <div class="area-stat"><div class="area-stat-val" style="color:var(--verde)">${v}</div><div class="area-stat-label">Verde</div></div>
          <div class="area-stat"><div class="area-stat-val" style="color:var(--amarelo)">${a}</div><div class="area-stat-label">Amarelo</div></div>
          <div class="area-stat"><div class="area-stat-val" style="color:var(--vermelho)">${r-c}</div><div class="area-stat-label">Vencido</div></div>
          ${c>0?`<div class="area-stat"><div class="area-stat-val" style="color:var(--critico)">${c}</div><div class="area-stat-label">Crítico</div></div>`:''}
          <div class="area-stat"><div class="area-stat-val" style="color:var(--accent2)">${fmtNum(cocos)}</div><div class="area-stat-label">Ult. Colheita</div></div>
          <div class="area-stat" title="Frutos por planta no ano ${anoStr} — meta: 300"><div class="area-stat-val" style="color:${corFpp(fppArea[area])}">${fppArea[area]!==null?Math.round(fppArea[area]):'—'}</div><div class="area-stat-label">Fr/Pl/${anoStr}</div></div>
          <div class="area-stat" title="Total de frutos colhidos nesta área em ${anoStr}"><div class="area-stat-val" style="color:var(--teal)">${fmtNum(colhidosAnoArea[area]||0)}</div><div class="area-stat-label">Colhidos ${anoStr}</div></div>
        </div>
      </div>`);
  }
  grid.innerHTML = areaCardsHtml.join('');
}

function abrirColhidosPeriodo(periodo) {
  const hoje = new Date();
  const anoStr = String(hoje.getFullYear());
  const mesAtual = anoStr+'-'+String(hoje.getMonth()+1).padStart(2,'0');
  const nomesMes = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const prefixo = periodo === 'mes' ? mesAtual : anoStr;
  const titulo = periodo === 'mes'
    ? '🥥 Colhidos '+nomesMes[hoje.getMonth()+1]+' '+anoStr
    : '🌴 Colhidos '+anoStr;

  // Agrupar por área
  const porArea = {};
  let totalCocos = 0;
  for(const [area, eitos] of Object.entries(DB)) {
    for(const e of eitos) {
      for(const h of (e.historico||[])) {
        if(h.data && h.data.startsWith(prefixo)) {
          porArea[area] = (porArea[area]||0) + (h.total||0);
          totalCocos += h.total||0;
        }
      }
    }
  }
  const areas = Object.entries(porArea).sort((a,b) => b[1]-a[1]);
  const maxV = areas[0]?.[1] || 1;

  // Usar modal dinâmico (fecha ao clicar fora)
  const old = document.getElementById('modal-colhidos-periodo');
  if(old) old.remove();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.id = 'modal-colhidos-periodo';
  modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });

  const linhasHtml = areas.map(([area, cocos]) => {
    const pct = Math.round(cocos / totalCocos * 100);
    const w = Math.round(cocos / maxV * 100);
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="document.getElementById('modal-colhidos-periodo').remove();openArea('${area}')">
      <span style="font-size:12px;font-weight:700;min-width:120px">${area}</span>
      <div style="flex:1;height:8px;background:var(--surface2);border-radius:4px"><div style="width:${w}%;height:100%;background:var(--forest);border-radius:4px"></div></div>
      <span style="font-family:var(--font-mono);font-size:13px;font-weight:700;min-width:70px;text-align:right">${fmtNum(cocos)}</span>
      <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);min-width:35px;text-align:right">${pct}%</span>
    </div>`;
  }).join('');

  modal.innerHTML = `<div class="modal" style="max-width:560px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
      <h3 style="margin:0">${titulo}</h3>
      <button onclick="document.getElementById('modal-colhidos-periodo').remove()" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--muted)">✕</button>
    </div>
    <div class="modal-sub">${areas.length} área${areas.length!==1?'s':''}</div>
    <div style="margin:16px 0">${linhasHtml}</div>
    <div style="padding:12px 0 0;border-top:2px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:13px;font-weight:700;color:var(--muted)">Total</span>
      <span style="font-family:var(--font-mono);font-size:18px;font-weight:800;color:var(--forest)">${fmtNum(totalCocos)} cocos</span>
    </div>
  </div>`;
  document.body.appendChild(modal);
}

function abrirColhidosAno() { abrirColhidosPeriodo('ano'); }
function abrirColhidosMes() { abrirColhidosPeriodo('mes'); }

// ─────────── PROJEÇÃO DE COLHEITA ───────────
function renderProjecao() {
  const wrap = document.getElementById('projecao-wrap');
  if (!wrap) return;

  // Semana atual: segunda a sexta da semana em que estamos
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const dow = hoje.getDay(); // 0=dom,1=seg...6=sab
  // Voltar para segunda desta semana (ou avançar se dom)
  const offsetParaSeg = dow === 0 ? -6 : -(dow - 1);
  const segEsta = new Date(hoje); segEsta.setDate(hoje.getDate() + offsetParaSeg);
  const sexEsta = new Date(segEsta); sexEsta.setDate(segEsta.getDate() + 4);
  // Próxima semana
  const segProx = new Date(segEsta); segProx.setDate(segEsta.getDate() + 7);
  const sexProx = new Date(segProx); sexProx.setDate(segProx.getDate() + 4);

  const fmtSemana = (seg, sex) => {
    const d1 = `${String(seg.getDate()).padStart(2,'0')}/${String(seg.getMonth()+1).padStart(2,'0')}`;
    const d2 = `${String(sex.getDate()).padStart(2,'0')}/${String(sex.getMonth()+1).padStart(2,'0')}`;
    return `${d1} – ${d2}`;
  };

  const nomes = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };

  // Média das últimas 3 colheitas do eito (exclui parciais)
  function mediaEito(e) {
    const hist = (e.historico || []).filter(h => !h.parcial);
    if (hist.length === 0) {
      const ult = getUltimaCompleta(e);
      return ult ? ult.total : 0;
    }
    const ultimas = hist.slice(-3);
    return Math.round(ultimas.reduce((s,h) => s+h.total, 0) / ultimas.length);
  }

  // Formato ISO seguro (sem problemas de timezone do toISOString)
  function toISO(dt) {
    return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
  }

  // Card 1 — Esta semana: Urgente (>=21d) + Esta Semana (vencem até sexta, <21d)
  function calcEsta() {
    const porArea = {};
    let totalUrg = 0, totalSem = 0, nUrg = 0, nSem = 0;
    for (const [area, eitos] of Object.entries(DB)) {
      let cocosUrg = 0, cocosSem = 0, nUrgArea = 0, nSemArea = 0, maxDiasArea = 0;
      const eitosDetalhe = [];
      for (const e of eitos) {
        const ult = getUltima(e);
        if (!ult) continue;
        const d = diasDesde(ult.data);
        const dataProx = new Date(ult.data + 'T00:00:00');
        dataProx.setDate(dataProx.getDate() + 21);
        const m = mediaEito(e);
        const urgente = d >= 21;
        const estaSemana = !urgente && dataProx <= sexEsta;
        if (!urgente && !estaSemana) continue;
        if (d > maxDiasArea) maxDiasArea = d;
        if (urgente) { cocosUrg += m; nUrgArea++; }
        else { cocosSem += m; nSemArea++; }
        eitosDetalhe.push({ id: e.id, dias: d, tipo: urgente ? 'urg' : 'sem', cocos: m });
      }
      if (cocosUrg + cocosSem > 0) {
        // Ordenar eitos por dias decrescente
        eitosDetalhe.sort((a,b) => b.dias - a.dias);
        porArea[area] = { cocosUrg, cocosSem, nUrg: nUrgArea, nSem: nSemArea, maxDias: maxDiasArea, eitos: eitosDetalhe };
        totalUrg += cocosUrg; totalSem += cocosSem;
        nUrg += nUrgArea; nSem += nSemArea;
      }
    }
    return { totalUrg, totalSem, total: totalUrg + totalSem, nUrg, nSem, nTotal: nUrg + nSem, porArea };
  }

  // Card — Próxima semana: APENAS eitos que completam 21 dias entre seg–sex da próxima semana
  // Não inclui acumulados (esses ficam no Card 1 como urgentes)
  // Usa a última colheita real como referência (se colheu esta semana, usa essa data)
  function calcProxima() {
    const porArea = {};
    let totalGeral = 0, nTotal = 0;
    const segProxISO = toISO(segProx);
    const sexProxISO = toISO(sexProx);
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0, maxDiasArea = 0, nArea = 0;
      const eitosDetalhe = [];
      for (const e of eitos) {
        const ult = getUltima(e); // última colheita real (inclui desta semana)
        if (!ult) continue;
        // Quando este eito completa 21 dias?
        const proxColheita = new Date(ult.data + 'T00:00:00');
        proxColheita.setDate(proxColheita.getDate() + 21);
        const proxISO = toISO(proxColheita);
        // Só entra se vence entre seg e sex da PRÓXIMA semana
        if (proxISO >= segProxISO && proxISO <= sexProxISO) {
          const diasHoje = diasDesde(ult.data);
          const m = mediaEito(e);
          totalArea += m;
          nArea++;
          if (diasHoje > maxDiasArea) maxDiasArea = diasHoje;
          eitosDetalhe.push({ id: e.id, dias: diasHoje, tipo: 'sem', cocos: m });
        }
      }
      if (totalArea > 0) {
        eitosDetalhe.sort((a,b) => b.dias - a.dias);
        porArea[area] = { cocosUrg: 0, cocosSem: totalArea, nUrg: 0, nSem: nArea, maxDias: maxDiasArea, eitos: eitosDetalhe };
        totalGeral += totalArea;
        nTotal += nArea;
      }
    }
    return { totalUrg: 0, totalSem: totalGeral, total: totalGeral, nUrg: 0, nSem: nTotal, nTotal, porArea };
  }

  // Card 3 — Próximos 21 dias: todos que vencem em até 21 dias a partir de hoje (inclui acumulados)
  function calc21() {
    let totalGeral = 0;
    const porArea = {};
    const limite = new Date(hoje); limite.setDate(hoje.getDate() + 21);
    const limiteISO = toISO(limite);
    const segISO = toISO(segEsta);
    const sexISO = toISO(sexEsta);
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0, maxDiasArea = 0, nEitosArea = 0;
      for (const e of eitos) {
        const hist = e.historico || [];
        // Encontrar a colheita de referência: a mais recente (pode ser desta semana)
        const ult = getUltima(e);
        if (!ult) continue;

        const proxColheita = new Date(ult.data + 'T00:00:00');
        proxColheita.setDate(proxColheita.getDate() + 21);
        const d = diasDesde(ult.data);

        if (d >= 21 || proxColheita <= limite) {
          const m = mediaEito(e);
          totalArea += m;
          totalGeral += m;
          nEitosArea++;

          // Para "dias", mostrar quantos dias terá na data limite (ou dias desde última)
          const diasNoLimite = Math.round((limite - new Date(ult.data + 'T00:00:00')) / 86400000);
          if (diasNoLimite > maxDiasArea) maxDiasArea = diasNoLimite;
        }
      }
      if (totalArea > 0) porArea[area] = { cocos: totalArea, maxDias: maxDiasArea, nEitos: nEitosArea };
    }
    return { total: totalGeral, porArea };
  }

  const r1 = calcEsta();
  const r2 = calcProxima();
  const r3 = calc21();

  // ── Card 1 — Esta Semana (Urgente + Esta Semana com drill-down) ──
  const areasEsta = Object.entries(r1.porArea).sort((a,b) => b[1].maxDias - a[1].maxDias);

  function buildAreaRow(area, info, areaKey) {
    const nome = nomes[area] || area;
    const safeKey = areaKey.replace(/[^a-zA-Z0-9]/g, '_');
    const totalCocos = info.cocosUrg + info.cocosSem;
    const diasCor = info.maxDias >= 32 ? 'var(--critico)' : info.maxDias >= 21 ? 'var(--vermelho)' : info.maxDias >= 15 ? 'var(--amarelo)' : 'var(--verde)';
    const bordaCor = info.nUrg > 0 ? 'rgba(220,53,69,0.15)' : 'rgba(224,168,0,0.15)';
    const badges = (info.nUrg > 0 ? `<span style="font-size:9px;font-weight:800;background:var(--vermelho);color:#fff;padding:1px 6px;border-radius:4px">URG ${info.nUrg}</span> ` : '')
                 + (info.nSem > 0 ? `<span style="font-size:9px;font-weight:800;background:var(--amarelo);color:#fff;padding:1px 6px;border-radius:4px">SEM ${info.nSem}</span>` : '');

    // Tabela de eitos expandível
    const eitoRows = info.eitos.map(ei => {
      const isUrgente = ei.tipo === 'urg' || ei.tipo === 'acum';
      const tipoCor = isUrgente ? 'var(--vermelho)' : 'var(--amarelo)';
      const TIPO_LABELS = { urg: 'URGENTE', sem: 'SEMANA', acum: 'ACUMUL.', novo: 'NOVO' };
      const tipoLabel = TIPO_LABELS[ei.tipo] || ei.tipo;
      const diasEitoCor = ei.dias >= 32 ? 'var(--critico)' : ei.dias >= 21 ? 'var(--vermelho)' : ei.dias >= 15 ? 'var(--amarelo)' : 'var(--verde)';
      return `<tr>
        <td style="font-family:var(--font-mono);font-weight:700;color:var(--forest);font-size:12px;padding:4px 6px">${ei.id}</td>
        <td style="font-family:var(--font-mono);font-weight:800;color:${diasEitoCor};font-size:12px;padding:4px 6px;text-align:center">${ei.dias}d</td>
        <td style="padding:4px 6px;text-align:center"><span style="font-size:9px;font-weight:800;background:${tipoCor};color:#fff;padding:1px 5px;border-radius:3px">${tipoLabel}</span></td>
        <td style="font-family:var(--font-mono);font-weight:700;color:var(--forest);font-size:12px;padding:4px 6px;text-align:right">${fmtNum(ei.cocos)}</td>
      </tr>`;
    }).join('');

    const totalUrgArea = fmtNum(info.cocosUrg);
    const totalSemArea = fmtNum(info.cocosSem);

    return `
      <div class="proj-area-group" style="border:1px solid ${bordaCor};border-radius:8px;overflow:hidden;margin-bottom:6px">
        <div class="proj-area-header" onclick="toggleProjArea('${safeKey}')" style="display:grid;grid-template-columns:1fr auto auto 50px 24px;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;background:var(--surface2);transition:background 0.15s">
          <div>
            <div style="font-size:13px;font-weight:800;color:var(--forest)">${nome}</div>
            <div style="font-size:10px;color:var(--muted);margin-top:1px">${info.nUrg > 0 ? info.nUrg + ' urg' : ''}${info.nUrg > 0 && info.nSem > 0 ? ' · ' : ''}${info.nSem > 0 ? info.nSem + ' sem' : ''} · ${fmtNum(totalCocos)} cocos est.</div>
          </div>
          <div style="display:flex;gap:4px">${badges}</div>
          <div style="font-size:14px;font-weight:800;font-family:var(--font-mono);color:var(--forest);text-align:right">${fmtNum(totalCocos)}</div>
          <div style="font-size:13px;font-weight:800;font-family:var(--font-mono);color:${diasCor};text-align:center">${info.maxDias}d</div>
          <div id="proj-chev-${safeKey}" style="font-size:12px;color:var(--muted);transition:transform 0.2s;text-align:center">▾</div>
        </div>
        <div id="proj-detail-${safeKey}" style="display:none;padding:0 8px 8px">
          <table style="width:100%;border-collapse:collapse;margin-top:4px">
            <thead>
              <tr style="border-bottom:1px solid var(--border)">
                <th style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);text-align:left;padding:4px 6px">Eito</th>
                <th style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);text-align:center;padding:4px 6px">Dias</th>
                <th style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);text-align:center;padding:4px 6px">Status</th>
                <th style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);text-align:right;padding:4px 6px">Cocos est.</th>
              </tr>
            </thead>
            <tbody>${eitoRows}</tbody>
            <tfoot>
              <tr style="border-top:2px solid var(--border)">
                <td colspan="3" style="font-size:11px;font-weight:700;color:var(--text);padding:6px">Total estimado</td>
                <td style="font-size:13px;font-weight:800;font-family:var(--font-mono);color:var(--forest);text-align:right;padding:6px">${fmtNum(totalCocos)}</td>
              </tr>
              <tr>
                <td colspan="4" style="font-size:10px;color:var(--muted);padding:2px 6px 4px">
                  ${info.cocosUrg > 0 ? `<span style="color:var(--vermelho);font-weight:700">${totalUrgArea} urg</span>` : ''}
                  ${info.cocosUrg > 0 && info.cocosSem > 0 ? ' + ' : ''}
                  ${info.cocosSem > 0 ? `<span style="color:var(--amarelo);font-weight:700">${totalSemArea} sem</span>` : ''}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>`;
  }

  const areasHtml = areasEsta.map(([area, info]) => buildAreaRow(area, info, area)).join('');

  const cardEsta = `
    <div class="proj-card" style="border:2px solid var(--accent);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <div class="proj-card-label" style="margin-bottom:0">📅 Esta semana</div>
        <div style="font-size:9px;color:var(--accent2);font-family:var(--font-mono)">${fmtSemana(segEsta, sexEsta)}</div>
      </div>
      <div class="proj-inner-grid">
        <div style="text-align:center;padding:6px 4px;background:rgba(220,53,69,0.06);border-radius:6px;border:1px solid rgba(220,53,69,0.15)">
          <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--vermelho)">🔴 Urgente</div>
          <div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:var(--vermelho);margin:2px 0">${fmtNum(r1.totalUrg)}</div>
          <div style="font-size:8px;color:var(--muted)">${r1.nUrg} eito${r1.nUrg!==1?'s':''} · +21d</div>
        </div>
        <div style="text-align:center;padding:6px 4px;background:rgba(224,168,0,0.06);border-radius:6px;border:1px solid rgba(224,168,0,0.15)">
          <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--amarelo)">🟡 Semana</div>
          <div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:var(--amarelo);margin:2px 0">${fmtNum(r1.totalSem)}</div>
          <div style="font-size:8px;color:var(--muted)">${r1.nSem} eito${r1.nSem!==1?'s':''} · até sex</div>
        </div>
        <div style="text-align:center;padding:6px 4px;background:rgba(26,122,110,0.06);border-radius:6px;border:1px solid rgba(26,122,110,0.15)">
          <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--forest)">📦 Total</div>
          <div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:var(--forest);margin:2px 0">${fmtNum(r1.total)}</div>
          <div style="font-size:8px;color:var(--muted)">${r1.nTotal} eito${r1.nTotal!==1?'s':''}</div>
        </div>
      </div>
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);margin-bottom:4px">Mapa por área</div>
      ${areasHtml || '<div style="font-size:10px;color:var(--muted);padding:4px">Nenhum eito previsto</div>'}
      <button onclick="showPage('lancamento')" style="width:100%;margin-top:6px;padding:6px;background:var(--forest);color:#fff;border:none;border-radius:6px;font-family:var(--font-main);font-size:11px;font-weight:700;cursor:pointer">⚡ Lançar Colheita</button>
    </div>`;

  // Breakdown de áreas (usado nos cards genéricos 2 e 3)
  function buildBreakdown(porArea) {
    return Object.entries(porArea)
      .sort((a,b) => b[1].maxDias - a[1].maxDias)
      .map(([area, info]) => `
        <div class="proj-row proj-row-clicavel" onclick="openArea('${area}')" title="Abrir ${area} · ${info.nEitos} eitos" style="display:grid;grid-template-columns:1fr 50px 70px;align-items:center;padding:4px 6px;border-radius:6px">
          <span style="font-size:12px;font-weight:700;color:var(--text)">${nomes[area]||area}</span>
          <span style="font-size:12px;font-weight:800;font-family:var(--font-mono);color:${info.maxDias>=32?'var(--critico)':info.maxDias>=21?'var(--vermelho)':info.maxDias>=15?'var(--amarelo)':'var(--verde)'};text-align:center">${info.maxDias}d</span>
          <span style="font-size:12px;font-weight:800;font-family:var(--font-mono);color:var(--forest);text-align:right">${fmtNum(info.cocos)}</span>
        </div>`).join('');
  }

  function buildHeader() {
    return `<div style="display:grid;grid-template-columns:1fr 50px 70px;padding:6px 6px 2px;margin-top:4px;border-bottom:1px solid var(--border)">
      <span style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">Área</span>
      <span style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);text-align:center">Dias</span>
      <span style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);text-align:right">Projeção</span>
    </div>`;
  }

  // Card Próxima Semana — mesmo design do Card Esta Semana
  // Mostra apenas eitos que vencem na próxima semana (sem acumulados, sem ajuste artificial)
  function buildCardProxSemana(rProx, sublabel) {
    const areasProx = Object.entries(rProx.porArea)
      .sort((a,b) => b[1].maxDias - a[1].maxDias)
      .map(([area, info]) => buildAreaRow(area, info, 'prox_' + area))
      .join('');

    return `
      <div class="proj-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
          <div class="proj-card-label" style="margin-bottom:0">📆 Próxima semana</div>
          <div style="font-size:9px;color:var(--accent2);font-family:var(--font-mono)">${sublabel}</div>
        </div>
        <div class="proj-inner-grid" style="grid-template-columns:1fr 1fr">
          <div style="text-align:center;padding:6px 4px;background:rgba(224,168,0,0.06);border-radius:6px;border:1px solid rgba(224,168,0,0.15)">
            <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--amarelo)">🟡 Vão vencer</div>
            <div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:var(--amarelo);margin:2px 0">${fmtNum(rProx.total)}</div>
            <div style="font-size:8px;color:var(--muted)">${rProx.nTotal} eito${rProx.nTotal!==1?'s':''} · completam 21d</div>
          </div>
          <div style="text-align:center;padding:6px 4px;background:rgba(26,122,110,0.06);border-radius:6px;border:1px solid rgba(26,122,110,0.15)">
            <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--forest)">📦 Cocos est.</div>
            <div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:var(--forest);margin:2px 0">${fmtNum(rProx.total)}</div>
            <div style="font-size:8px;color:var(--muted)">média últimas 3</div>
          </div>
        </div>
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);margin-bottom:4px;margin-top:8px">Mapa por área</div>
        ${areasProx || '<div style="font-size:10px;color:var(--muted);padding:4px">Nenhum eito previsto para a próxima semana</div>'}
      </div>`;
  }

  // Cards genéricos (próxima semana, 21 dias)
  let _projCardIdx = 0;
  function buildCardGenerico(r, icon, label, sublabel) {
    const breakdown = buildBreakdown(r.porArea);
    const totalEitos = Object.values(r.porArea).reduce((s,v) => s + v.nEitos, 0);
    const cardId = 'proj-gen-' + (++_projCardIdx);
    return `
      <div class="proj-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
          <div class="proj-card-label" style="margin-bottom:0">${icon} ${label}</div>
          <div style="font-size:9px;color:var(--accent2);font-family:var(--font-mono)">${sublabel}</div>
        </div>
        <div class="proj-card-val">${fmtNum(r.total)}</div>
        <div class="proj-card-sub">${totalEitos} eito${totalEitos!==1?'s':''} prontos</div>
        <div style="margin-top:8px;text-align:center">
          <button onclick="var d=document.getElementById('${cardId}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▸ Ver áreas':'▾ Ocultar'" style="background:none;border:none;cursor:pointer;font-size:10px;font-weight:700;color:var(--accent2);font-family:var(--font-main)">▸ Ver áreas</button>
        </div>
        <div id="${cardId}" style="display:none">
          ${buildHeader()}
          <div class="proj-breakdown">${breakdown || '<span style="font-size:11px;color:var(--muted)">Nenhum eito previsto</span>'}</div>
        </div>
      </div>`;
  }

  // ── Card 2 — Colhido Esta Semana (refatorado: janela 2 dias + sinalização) ──
  const DIAS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const hojeISO = toISO(hoje);
  const segISO_c2 = toISO(segEsta);

  // Helper: soma dias a uma data ISO
  function addDiasISO(dataISO, dias) {
    const d = new Date(dataISO + 'T00:00:00');
    d.setDate(d.getDate() + dias);
    return toISO(d);
  }
  // Mapa inverso: AREA A1 → A1
  const AREA_LONGO_CURTO = {};
  Object.entries(AREA_CURTO_LONGO).forEach(([k, v]) => { AREA_LONGO_CURTO[v] = k; });

  // 1. Coletar colheitas da semana agrupadas por dia+área
  //    Cada grupo guarda: total, eitos, IDs do Supabase, clientes já vinculados (h.cliente)
  const colhPorDia = {};
  let totalColhidoSemana = 0, totalEitosSemana = 0;
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      for (const h of (e.historico || [])) {
        if (h.data >= segISO_c2 && h.data <= hojeISO) {
          if (!colhPorDia[h.data]) colhPorDia[h.data] = {};
          if (!colhPorDia[h.data][area]) colhPorDia[h.data][area] = {
            total: 0, eitos: [], colheitaIds: [], clientes: new Set()
          };
          const g = colhPorDia[h.data][area];
          g.total += h.total;
          g.eitos.push({ id: e.id, area, qtd: h.total, cliente: h.cliente || null });
          if (h._id) g.colheitaIds.push(h._id);
          if (h.cliente) g.clientes.add(h.cliente);
          totalColhidoSemana += h.total;
          totalEitosSemana++;
        }
      }
    }
  }

  // 2. Vendas ativas (não EXCLUIDO) da janela ampliada (até hoje+2)
  const hoje2DiasISO = addDiasISO(hojeISO, 2);
  const vendasAtivas = (_vendasCache || []).filter(v =>
    v.status !== 'EXCLUIDO' &&
    v.data >= segISO_c2 && v.data <= hoje2DiasISO
  );
  const clientesSemana = new Set();

  // 3. Montar lançamentos: 1 por grupo (dia+área) com cenário identificado
  const lancList = [];
  const diasOrdenados = Object.keys(colhPorDia).sort();

  for (const dia of diasOrdenados) {
    for (const [areaLongo, info] of Object.entries(colhPorDia[dia])) {
      const areaCurta = AREA_LONGO_CURTO[areaLongo] || areaLongo;

      // Buscar vendas candidatas: mesmo dia ou até +2 dias, mesma área, qtd > 0
      const dataMax = addDiasISO(dia, 2);
      const candidatas = vendasAtivas
        .filter(v => {
          if (v.data < dia || v.data > dataMax) return false;
          if (!v.areas) return false;
          return v.areas[areaCurta] > 0;
        })
        .sort((a, b) => a.data.localeCompare(b.data)); // mais próximas primeiro

      const clientesHCliente = Array.from(info.clientes);

      // Determinar cenário
      let cenario, clientePrincipal = null, vendaPrincipal = null;
      if (clientesHCliente.length === 1) {
        clientePrincipal = clientesHCliente[0];
        vendaPrincipal = candidatas.find(v => v.cliente === clientePrincipal);
        if (vendaPrincipal) cenario = 'confirmado';
        else if (candidatas.length > 0) cenario = 'divergente';
        else cenario = 'vinculado-sem-venda';
      } else if (clientesHCliente.length > 1) {
        cenario = 'multiplos-vinculados';
      } else {
        if (candidatas.length === 1) { cenario = 'sugestao-unica'; vendaPrincipal = candidatas[0]; }
        else if (candidatas.length > 1) cenario = 'sugestao-multipla';
        else cenario = 'sem-cliente';
      }

      if (clientePrincipal) clientesSemana.add(clientePrincipal);
      if (vendaPrincipal) clientesSemana.add(vendaPrincipal.cliente);

      lancList.push({
        data: dia,
        area: areaLongo,
        areas: { [areaLongo]: info.total },
        total: info.total,
        eitos: info.eitos,
        colheitaIds: info.colheitaIds,
        cliente: clientePrincipal || (vendaPrincipal ? vendaPrincipal.cliente : null),
        clientePrincipal,
        vendaPrincipal,
        sugestoes: candidatas,
        cenario
      });
    }
  }

  // Armazenar para uso do modal de vinculação
  window._lancListColhidoSemana = lancList;
  window._segEstaSemanaISO = segISO_c2;
  window._hoje2DiasISO = hoje2DiasISO;

  // Badge: Seg DD/MM – Hoje
  const segFmt = `${String(segEsta.getDate()).padStart(2,'0')}/${String(segEsta.getMonth()+1).padStart(2,'0')}`;

  // Formatar valor abreviado para KPI
  function fmtK(v) {
    if (v >= 1000) return (v/1000).toFixed(1).replace('.0','') + 'k';
    return String(v);
  }

  // Calcular R$/coco médio por dia (todas as vendas do dia)
  const precoDia = {};
  for (const v of vendasAtivas) {
    if (!v.qtde || v.qtde <= 0 || !v.total) continue;
    if (!precoDia[v.data]) precoDia[v.data] = { receita: 0, frete: 0, cocos: 0 };
    precoDia[v.data].receita += v.total;
    precoDia[v.data].frete += v.frete || 0;
    precoDia[v.data].cocos += v.qtde;
  }

  // Build lançamentos HTML
  let lancHtml = '';
  if (lancList.length === 0) {
    lancHtml = `<div style="text-align:center;padding:24px 0;color:var(--muted);font-size:12px"><div style="font-size:28px;margin-bottom:8px">🌴</div>Nenhuma colheita registrada esta semana ainda.</div>`;
  } else {
    lancList.forEach((l, idx) => {
      const dt = new Date(l.data + 'T00:00:00');
      const diaSem = DIAS_PT[dt.getDay()];
      const dataFmt = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}`;
      const areasNomes = Object.keys(l.areas).map(a => nomes[a] || a);
      const safeIdx = 'lanc_' + idx;

      // Texto do cliente e badge de ação baseado no cenário
      let clienteHtml = '', acaoBtn = '', borderColor = 'var(--border)', bgColor = '';
      if (l.cenario === 'confirmado') {
        // ✓ Cliente vinculado + venda casa
        clienteHtml = `<div style="font-size:13px;font-weight:800;color:var(--forest)">${escapeHtml(l.clientePrincipal)}</div>
          <div style="font-size:9px;color:var(--verde);margin-top:2px">✓ casa com venda ${l.vendaPrincipal.data.substring(8)}/${l.vendaPrincipal.data.substring(5,7)}</div>`;
      } else if (l.cenario === 'divergente') {
        // ⚠ Cliente vinculado mas venda é de outro cliente
        clienteHtml = `<div style="font-size:13px;font-weight:800;color:var(--forest)">${escapeHtml(l.clientePrincipal)}</div>
          <div style="font-size:9px;color:#b45309;margin-top:2px">⚠ divergente: venda nos próximos 2 dias é de outro cliente</div>`;
        acaoBtn = `<button onclick="event.stopPropagation();abrirVincularColheita(${idx})" style="font-size:9px;font-weight:700;padding:4px 10px;border-radius:20px;background:#fef3cd;color:#856404;border:1px solid #ffc107;cursor:pointer;white-space:nowrap">⚠ Verificar</button>`;
        borderColor = '#ffc107';
      } else if (l.cenario === 'vinculado-sem-venda') {
        // ⚠ Cliente vinculado mas sem venda na janela
        clienteHtml = `<div style="font-size:13px;font-weight:800;color:var(--forest)">${escapeHtml(l.clientePrincipal)}</div>
          <div style="font-size:9px;color:#b45309;margin-top:2px">⚠ sem venda casada nos próximos 2 dias</div>`;
        borderColor = '#ffc107';
      } else if (l.cenario === 'sugestao-unica') {
        // 💡 Sem vínculo, 1 sugestão óbvia
        clienteHtml = `<div style="font-size:13px;font-weight:700;color:#856404;font-style:italic">💡 Sugestão: ${escapeHtml(l.vendaPrincipal.cliente)}</div>
          <div style="font-size:9px;color:var(--muted);margin-top:2px">venda ${l.vendaPrincipal.data.substring(8)}/${l.vendaPrincipal.data.substring(5,7)} · clique para vincular</div>`;
        acaoBtn = `<button onclick="event.stopPropagation();abrirVincularColheita(${idx})" style="font-size:9px;font-weight:700;padding:4px 10px;border-radius:20px;background:#fef3cd;color:#856404;border:1px solid #ffc107;cursor:pointer;white-space:nowrap">💡 Vincular</button>`;
        borderColor = '#ffc107'; bgColor = '#fffdf5';
      } else if (l.cenario === 'sugestao-multipla' || l.cenario === 'multiplos-vinculados') {
        // 💡 Várias sugestões
        const n = l.sugestoes.length;
        clienteHtml = `<div style="font-size:13px;font-weight:700;color:#856404;font-style:italic">💡 ${n} venda${n>1?'s':''} possíve${n>1?'is':'l'}</div>
          <div style="font-size:9px;color:var(--muted);margin-top:2px">clique para escolher</div>`;
        acaoBtn = `<button onclick="event.stopPropagation();abrirVincularColheita(${idx})" style="font-size:9px;font-weight:700;padding:4px 10px;border-radius:20px;background:#fef3cd;color:#856404;border:1px solid #ffc107;cursor:pointer;white-space:nowrap">💡 Escolher</button>`;
        borderColor = '#ffc107'; bgColor = '#fffdf5';
      } else {
        // sem-cliente: nenhuma venda compatível
        clienteHtml = `<div style="font-size:13px;font-weight:700;color:#c2410c;font-style:italic">⚠ Sem cliente</div>
          <div style="font-size:9px;color:var(--muted);margin-top:2px">nenhuma venda compatível em 2 dias</div>`;
        acaoBtn = `<button onclick="event.stopPropagation();abrirVincularColheita(${idx})" style="font-size:9px;font-weight:700;padding:4px 10px;border-radius:20px;background:#fed7aa;color:#c2410c;border:1px solid #fb923c;cursor:pointer;white-space:nowrap">Ver vendas</button>`;
        borderColor = '#fb923c'; bgColor = '#fff7ed';
      }

      // R$/coco: se tem cliente, pegar da venda específica; senão, média do dia
      let precoCoco = null;
      const clienteRef = l.clientePrincipal || l.vendaPrincipal?.cliente;
      if (clienteRef) {
        const vendaCli = vendasAtivas.find(v => v.cliente === clienteRef);
        if (vendaCli && vendaCli.qtde > 0 && vendaCli.total > 0) {
          precoCoco = ((vendaCli.total - (vendaCli.frete || 0)) / vendaCli.qtde).toFixed(2);
        }
      }
      if (!precoCoco && precoDia[l.data] && precoDia[l.data].cocos > 0) {
        precoCoco = ((precoDia[l.data].receita - precoDia[l.data].frete) / precoDia[l.data].cocos).toFixed(2);
      }
      const precoBadge = precoCoco
        ? `<span style="font-size:9px;font-weight:700;font-family:var(--font-mono);padding:3px 8px;border-radius:20px;background:#e8f4fd;color:#1a6fa0;border:1px solid #b8d9ef;white-space:nowrap">R$ ${precoCoco}</span>`
        : '';

      const eitoRows = l.eitos.map(ei => `
        <div style="display:grid;grid-template-columns:80px 1fr auto;align-items:center;gap:8px;padding:4px 6px;border-radius:5px">
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--forest)">${ei.id}</span>
          <span style="font-size:10px;color:var(--muted)">${nomes[ei.area] || ei.area}</span>
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--text);text-align:right">${fmtNum(ei.qtd)}</span>
        </div>`).join('');

      lancHtml += `
        <div style="border:1px solid ${borderColor};border-radius:10px;overflow:hidden;margin-bottom:6px;background:${bgColor}">
          <div onclick="toggleLanc('${safeIdx}')" style="display:grid;grid-template-columns:52px 1fr auto auto auto auto;align-items:center;gap:8px;padding:10px 14px;cursor:pointer;transition:background 0.12s;user-select:none" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background='${bgColor}'">
            <div>
              <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--muted)">${diaSem}</div>
              <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--muted)">${dataFmt}</div>
            </div>
            <div>
              ${clienteHtml}
              <div style="font-size:10px;font-family:var(--font-mono);color:var(--muted);margin-top:2px">${l.eitos.length > 0 ? l.eitos.length + ' eitos' : fmtNum(l.total) + ' cocos'}</div>
            </div>
            ${areasNomes.map(a => `<span style="font-size:9px;font-weight:700;font-family:var(--font-mono);padding:3px 8px;border-radius:20px;background:var(--surface2);color:var(--muted);border:1px solid var(--border);white-space:nowrap">${a}</span>`).join('')}
            ${precoBadge}
            ${acaoBtn}
            <div style="text-align:right">
              <div style="font-family:var(--font-mono);font-size:13px;font-weight:800;color:var(--forest)">${fmtNum(l.total)}</div>
              <div style="font-size:9px;color:var(--muted);text-align:right;margin-top:1px">cocos</div>
            </div>
            <span id="lanc-chev-${safeIdx}" style="font-size:10px;color:var(--muted);transition:transform 0.2s;text-align:center">▾</span>
          </div>
          ${l.eitos.length > 0 ? `<div id="lanc-detail-${safeIdx}" style="display:none;border-top:1px solid var(--border);padding:10px 14px 12px;background:#fafcf8">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;display:flex;gap:8px;align-items:center">
              Eitos colhidos
              ${areasNomes.map(a => `<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;background:var(--surface2);color:var(--muted);border:1px solid var(--border)">${a}</span>`).join('')}
            </div>
            <div style="display:grid;grid-template-columns:80px 1fr auto;gap:8px;padding:2px 6px;margin-bottom:4px;border-bottom:1px solid var(--border)">
              <span style="font-size:8px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">Eito</span>
              <span style="font-size:8px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">Área</span>
              <span style="font-size:8px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);text-align:right">Qtde</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:3px">${eitoRows}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 6px 0;border-top:1px solid var(--border);margin-top:6px">
              <span style="font-size:10px;font-weight:700;color:var(--muted)">Total do lançamento</span>
              <span style="font-family:var(--font-mono);font-size:12px;font-weight:800;color:var(--forest)">${fmtNum(l.total)} cocos</span>
            </div>
          </div>` : ''}
        </div>`;
    });
  }

  const cardColhido = `
    <div class="proj-card" style="display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <div class="proj-card-label" style="margin-bottom:0">📋 Colhido Esta Semana</div>
        <div style="font-size:9px;color:var(--accent2);font-family:var(--font-mono)">${fmtSemana(segEsta, sexEsta)}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px">
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:6px 4px;text-align:center">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">🌴 Colhido</div>
          <div style="font-size:16px;font-weight:800;font-family:var(--font-mono);color:var(--forest);line-height:1;margin-bottom:1px">${totalColhidoSemana > 0 ? fmtNum(totalColhidoSemana) : '—'}</div>
          <div style="font-size:8px;color:var(--muted)">cocos</div>
        </div>
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:6px 4px;text-align:center">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">📋 Eitos</div>
          <div style="font-size:16px;font-weight:800;font-family:var(--font-mono);color:var(--forest);line-height:1;margin-bottom:1px">${totalEitosSemana > 0 ? totalEitosSemana : '—'}</div>
          <div style="font-size:8px;color:var(--muted)">colhidos</div>
        </div>
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:6px 4px;text-align:center">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">👥 Clientes</div>
          <div style="font-size:16px;font-weight:800;font-family:var(--font-mono);color:var(--forest);line-height:1;margin-bottom:1px">${clientesSemana.size > 0 ? clientesSemana.size : '—'}</div>
          <div style="font-size:8px;color:var(--muted)">atendidos</div>
        </div>
      </div>
      <div>${lancHtml}</div>
      <div style="padding:6px 0 0;border-top:2px solid var(--border);display:flex;justify-content:space-between;align-items:center;margin-top:6px">
        <span style="font-size:10px;font-weight:700;color:var(--muted)">Total da semana</span>
        <span style="font-family:var(--font-mono);font-size:13px;font-weight:800;color:var(--forest)">${totalColhidoSemana > 0 ? fmtNum(totalColhidoSemana) + ' cocos' : '0 cocos'}</span>
      </div>
      <div style="text-align:center;margin-top:4px">
        <button onclick="abrirVincularClientes()" style="background:none;border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:10px;font-weight:600;color:var(--muted);cursor:pointer;font-family:var(--font-sans)">✏️ Vincular Clientes</button>
      </div>
    </div>`;

  wrap.innerHTML = `
    <div class="proj-wrap">
      <div class="proj-header">🔮 Projeção de Colheita <span>— baseada na média das últimas 3 colheitas</span></div>
      <div class="proj-cards">
        ${cardEsta}
        ${cardColhido}
        ${buildCardProxSemana(r2, fmtSemana(segProx, sexProx))}
      </div>
    </div>`;
}

// ─────────── TOGGLE PROJEÇÃO ÁREA ───────────
function toggleProjArea(key) {
  const detail = document.getElementById('proj-detail-' + key);
  const chev = document.getElementById('proj-chev-' + key);
  if (!detail) return;
  const open = detail.style.display !== 'none';
  detail.style.display = open ? 'none' : 'block';
  if (chev) chev.style.transform = open ? '' : 'rotate(180deg)';
}

// ─────────── TOGGLE LANÇAMENTO CARD 2 ───────────
function toggleLanc(key) {
  const detail = document.getElementById('lanc-detail-' + key);
  const chev = document.getElementById('lanc-chev-' + key);
  if (!detail) return;
  const open = detail.style.display !== 'none';
  detail.style.display = open ? 'none' : 'block';
  if (chev) chev.style.transform = open ? '' : 'rotate(180deg)';
}

// ─────────── VINCULAR COLHEITA A VENDA (modal) ───────────
function abrirVincularColheita(lancIdx) {
  const lanc = (window._lancListColhidoSemana || [])[lancIdx];
  if (!lanc) { showToast('⚠ Lançamento não encontrado'); return; }

  // Buscar TODAS as vendas ativas da janela (para o caso de querer vincular a algo fora das sugestões)
  const segISO = window._segEstaSemanaISO;
  const hoje2DiasISO = window._hoje2DiasISO;
  const todasVendasJanela = (_vendasCache || []).filter(v =>
    v.status !== 'EXCLUIDO' &&
    v.data >= segISO && v.data <= hoje2DiasISO
  ).sort((a, b) => a.data.localeCompare(b.data));

  const areaCurta = Object.entries(AREA_CURTO_LONGO).find(([k, v]) => v === lanc.area)?.[0] || lanc.area;
  const dt = new Date(lanc.data + 'T00:00:00');
  const dataFmt = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}`;

  // Marcar candidatas principais (na janela de 2 dias + área compatível) vs outras
  const idsCandidatas = new Set(lanc.sugestoes.map(v => v.id));

  function renderOpcao(v, isSugestao) {
    const vdt = new Date(v.data + 'T00:00:00');
    const vData = `${String(vdt.getDate()).padStart(2,'0')}/${String(vdt.getMonth()+1).padStart(2,'0')}`;
    const qtdNaArea = v.areas && v.areas[areaCurta] ? v.areas[areaCurta] : 0;
    const areasTxt = v.areas ? Object.entries(v.areas).map(([a, q]) => `${a}=${fmtNum(q)}`).join(' · ') : '—';
    const badge = isSugestao
      ? `<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:#dcfce7;color:#166534;border:1px solid #bbf7d0">SUGERIDA</span>`
      : `<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:var(--surface2);color:var(--muted);border:1px solid var(--border)">FORA DA JANELA</span>`;
    return `<label style="padding:10px 12px;border:1.5px solid ${isSugestao ? 'var(--verde-border, #bbf7d0)' : 'var(--border)'};border-radius:8px;cursor:pointer;display:flex;gap:10px;align-items:flex-start;transition:background 0.1s" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''">
      <input type="radio" name="venda-vinc" value="${escapeHtml(v.cliente)}" style="margin-top:3px">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
          <span style="font-weight:800;font-size:13px;color:var(--forest)">${escapeHtml(v.cliente)}</span>
          ${badge}
        </div>
        <div style="font-size:10px;color:var(--muted);font-family:var(--font-mono)">
          ${vData} · ${areasTxt} · ${fmtNum(v.qtde)} cocos total${qtdNaArea > 0 ? ` · <strong style="color:var(--forest)">${areaCurta}=${fmtNum(qtdNaArea)}</strong>` : ''}
        </div>
      </div>
    </label>`;
  }

  const sugestoesHtml = lanc.sugestoes.map(v => renderOpcao(v, true)).join('');
  const outrasVendas = todasVendasJanela.filter(v => !idsCandidatas.has(v.id));
  const outrasHtml = outrasVendas.map(v => renderOpcao(v, false)).join('');

  const html = `
    <div class="modal-overlay open" id="modal-vincular-colheita" style="display:flex;align-items:center;justify-content:center" onclick="if(event.target.id==='modal-vincular-colheita')fecharVincularColheita()">
      <div class="modal" style="max-width:560px;max-height:85vh;display:flex;flex-direction:column">
        <div style="padding:20px 20px 10px">
          <h3 style="margin:0 0 6px 0;font-size:16px;font-weight:800">Vincular colheita a uma venda</h3>
          <div style="font-size:12px;color:var(--muted);font-family:var(--font-mono)">
            ${dataFmt} · ${escapeHtml(NOMES_CURTOS[lanc.area] || lanc.area)} · <strong style="color:var(--forest)">${fmtNum(lanc.total)} cocos</strong> em ${lanc.eitos.length} eito${lanc.eitos.length > 1 ? 's' : ''}
          </div>
          ${lanc.clientePrincipal ? `<div style="font-size:11px;color:var(--muted);margin-top:4px">Cliente atual: <strong style="color:var(--forest)">${escapeHtml(lanc.clientePrincipal)}</strong></div>` : ''}
        </div>
        <div style="padding:0 20px;overflow-y:auto;flex:1">
          ${lanc.sugestoes.length > 0 ? `
            <div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--verde);margin:12px 0 8px">💡 Sugestões (próximos 2 dias, mesma área)</div>
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">${sugestoesHtml}</div>
          ` : `
            <div style="padding:14px;background:#fff7ed;border:1px solid #fb923c;border-radius:8px;margin:12px 0;font-size:12px;color:#c2410c">
              ⚠ Nenhuma venda compatível nos próximos 2 dias com essa área.
            </div>
          `}
          ${outrasHtml ? `
            <div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin:4px 0 8px">Outras vendas da semana (fora da janela)</div>
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">${outrasHtml}</div>
          ` : ''}
          ${lanc.clientePrincipal ? `
            <div style="border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
              <label style="padding:10px 12px;border:1.5px dashed var(--border);border-radius:8px;cursor:pointer;display:flex;gap:10px;align-items:center;background:#fafafa">
                <input type="radio" name="venda-vinc" value="__DESVINCULAR__">
                <span style="font-size:12px;color:var(--muted)">Desvincular cliente (deixar em branco)</span>
              </label>
            </div>
          ` : ''}
        </div>
        <div style="padding:12px 20px;border-top:1px solid var(--border);display:flex;gap:8px;justify-content:flex-end;background:var(--surface2)">
          <button class="btn btn-outline" onclick="fecharVincularColheita()">Cancelar</button>
          <button class="btn btn-primary" id="btn-vinc-confirmar" onclick="confirmarVincularColheita(${lancIdx})">Vincular</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

function fecharVincularColheita() {
  const m = document.getElementById('modal-vincular-colheita');
  if (m) m.remove();
}

async function confirmarVincularColheita(lancIdx) {
  const lanc = (window._lancListColhidoSemana || [])[lancIdx];
  if (!lanc) return;
  const escolhido = document.querySelector('input[name="venda-vinc"]:checked')?.value;
  if (!escolhido) { showToast('Escolha uma venda ou selecione desvincular'); return; }

  if (!lanc.colheitaIds || lanc.colheitaIds.length === 0) {
    showToast('⚠ Não foi possível identificar as colheitas para atualizar');
    return;
  }

  const btn = document.getElementById('btn-vinc-confirmar');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Vinculando...'; }

  try {
    const novoCliente = escolhido === '__DESVINCULAR__' ? null : escolhido;
    const { error } = await _SB.from('colheitas')
      .update({ cliente: novoCliente })
      .in('id', lanc.colheitaIds);
    if (error) throw error;

    fecharVincularColheita();
    showToast(novoCliente ? '✓ Vinculado a ' + novoCliente : '✓ Cliente desvinculado');

    // Recarregar DB do Supabase para refletir a mudança e re-renderizar
    if (typeof loadDBFromSupabase === 'function') {
      await loadDBFromSupabase();
    }
    if (typeof renderDashboard === 'function') renderDashboard();
  } catch (err) {
    console.error('Erro ao vincular colheita:', err);
    showToast('⚠ Erro ao vincular — tente novamente');
    if (btn) { btn.disabled = false; btn.textContent = 'Vincular'; }
  }
}

// ─────────── COMPARATIVO SEMANAL ───────────
function renderComparativo() {
  const wrap = document.getElementById('comparativo-wrap');
  if (!wrap) return;

  // Agregar todas as colheitas por semana
  const porSemana = {};
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      for (const h of (e.historico || [])) {
        const sem = getISOWeek(h.data);
        if (!porSemana[sem]) porSemana[sem] = { total:0, mesa:0, fabrica:0, colheitas:0 };
        porSemana[sem].total     += h.total;
        porSemana[sem].mesa      += h.mesa;
        porSemana[sem].fabrica   += h.fabrica;
        porSemana[sem].colheitas += 1;
      }
    }
  }

  const semanas = Object.keys(porSemana).sort().slice(-10);

  if (semanas.length < 2) {
    wrap.innerHTML = `
      <div class="comp-wrap">
        <div class="comp-header">
          <div class="comp-header-title">📈 Comparativo Semanal</div>
          <div class="comp-header-sub">Histórico insuficiente — disponível com 2+ semanas de dados</div>
        </div>
      </div>`;
    return;
  }

  const vals      = semanas.map(s => porSemana[s].total);
  const valsMesa  = semanas.map(s => porSemana[s].mesa);
  const valsData  = semanas.map(s => {
    const parts = s.split('-S');
    return `S${parts[1]}`;
  });

  // tendência: última vs penúltima semana
  const ult  = vals[vals.length-1];
  const prev = vals[vals.length-2];
  const diff = ult - prev;
  const pct  = prev > 0 ? Math.round(Math.abs(diff)/prev*100) : 0;
  const tendIcon  = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
  const tendColor = diff > 0 ? 'var(--verde)' : diff < 0 ? 'var(--vermelho)' : 'var(--muted)';
  const tendTxt   = diff !== 0 ? `${tendIcon} ${pct}% vs semana anterior` : '→ estável';

  wrap.innerHTML = `
    <div class="comp-wrap">
      <div class="comp-header">
        <div>
          <div class="comp-header-title">📈 Comparativo Semanal</div>
          <div class="comp-header-sub">Últimas ${semanas.length} semanas · ${fmtNum(ult)} cocos esta semana</div>
        </div>
        <div style="font-size:14px;font-weight:800;color:${tendColor}">${tendTxt}</div>
      </div>
      <div class="comp-body">
        <div class="comp-legenda">
          <div class="comp-leg-item"><div class="comp-leg-dot" style="background:#1a7a6e"></div>Total</div>
          <div class="comp-leg-item"><div class="comp-leg-dot" style="background:#22a745"></div>Mesa</div>
        </div>
        <canvas id="comp-canvas" style="width:100%;display:block"></canvas>
      </div>
    </div>`;

  // Desenhar gráfico
  requestAnimationFrame(() => {
    const canvas = document.getElementById('comp-canvas');
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    const W = canvas.parentElement.clientWidth - 48;
    const H = 200;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    ctx.clearRect(0, 0, W, H);

    const pad = {t:20, r:20, b:40, l:64};
    const gW = W - pad.l - pad.r;
    const gH = H - pad.t - pad.b;
    const n  = semanas.length;
    const maxV = Math.max(...vals, 1);
    const xPos = i => pad.l + (n === 1 ? gW/2 : i/(n-1)*gW);
    const yPos = v => pad.t + gH * (1 - v/maxV);

    // grid
    ctx.strokeStyle = 'rgba(200,223,192,0.7)'; ctx.lineWidth = 1;
    for (let i=0; i<=4; i++) {
      const y = pad.t + gH*(1-i/4);
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l+gW, y); ctx.stroke();
      ctx.fillStyle = '#7a9470'; ctx.font = '10px DM Mono,monospace'; ctx.textAlign = 'right';
      ctx.fillText(fmtNum(Math.round(maxV*i/4)), pad.l-6, y+3);
    }

    // área preenchida — total
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t+gH);
    grad.addColorStop(0, 'rgba(26,122,110,0.2)');
    grad.addColorStop(1, 'rgba(26,122,110,0.01)');
    ctx.beginPath();
    ctx.moveTo(xPos(0), yPos(vals[0]));
    for (let i=1; i<n; i++) ctx.lineTo(xPos(i), yPos(vals[i]));
    ctx.lineTo(xPos(n-1), pad.t+gH); ctx.lineTo(xPos(0), pad.t+gH);
    ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

    // linha total
    ctx.strokeStyle = '#1a7a6e'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath();
    vals.forEach((v,i) => i===0 ? ctx.moveTo(xPos(i),yPos(v)) : ctx.lineTo(xPos(i),yPos(v)));
    ctx.stroke();

    // linha mesa
    ctx.strokeStyle = '#22a745'; ctx.lineWidth = 1.5;
    ctx.setLineDash([4,3]);
    ctx.beginPath();
    valsMesa.forEach((v,i) => i===0 ? ctx.moveTo(xPos(i),yPos(v)) : ctx.lineTo(xPos(i),yPos(v)));
    ctx.stroke();
    ctx.setLineDash([]);

    // pontos + labels semana + valores
    vals.forEach((v,i) => {
      // ponto
      ctx.beginPath(); ctx.arc(xPos(i), yPos(v), 4, 0, Math.PI*2);
      ctx.fillStyle = '#1a7a6e'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      // label semana
      ctx.fillStyle = '#5a7a52'; ctx.font = '10px DM Mono,monospace'; ctx.textAlign = 'center';
      ctx.fillText(valsData[i], xPos(i), H-pad.b+14);
      // valor acima do ponto
      ctx.fillStyle = '#1a3a1a'; ctx.font = 'bold 10px DM Mono,monospace';
      ctx.fillText(fmtNum(v), xPos(i), yPos(v)-8);
    });
  });
}

// ─────────── MAPA RESUMO ───────────
function renderMapa() {
  const areas = Object.keys(DB).filter(area => {
    if (_mapaFiltro === 'todos') return true;
    return DB[area].some(e => { const d = diasDesde(getUltima(e)?.data); return statusDias(d) === _mapaFiltro; });
  });
  // calcular totais por área e status
  const stats = {};
  let gtFrutos=0, gtVerde=0, gtAmarelo=0, gtVermelho=0;

  for (const area of areas) {
    let frutos=0, verde=0, amarelo=0, vermelho=0, critico=0;
    for (const e of DB[area]) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st = statusDias(dias);
      const total = ult ? ult.total : 0;
      frutos += total;
      if (st==='verde') verde += total;
      else if (st==='amarelo') amarelo += total;
      else if (st==='critico') { critico += total; vermelho += total; }
      else if (st==='vermelho') vermelho += total;
    }
    stats[area] = {frutos, verde, amarelo, vermelho, critico};
    gtFrutos+=frutos; gtVerde+=verde; gtAmarelo+=amarelo; gtVermelho+=vermelho;
  }

  // ── TABELA ──
  const fmt = n => n > 0 ? n.toLocaleString('pt-BR') : '0';

  const headers = areas.map(a => `<th class="clicavel-header" onclick="openArea('${a}')" title="Abrir ${a}">${NOMES_CURTOS[a]||a}</th>`).join('');
  const rowFrutos   = areas.map(a => `<td class="clicavel" onclick="openArea('${a}')" title="Abrir ${a}">${fmt(stats[a].frutos)}</td>`).join('');
  const rowVerde    = areas.map(a => `<td class="clicavel" onclick="openAreaFiltrada('${a}','verde')" title="Ver eitos verdes de ${a}">${fmt(stats[a].verde)}</td>`).join('');
  const rowAmarelo  = areas.map(a => `<td class="clicavel" onclick="openAreaFiltrada('${a}','amarelo')" title="Ver eitos amarelos de ${a}">${fmt(stats[a].amarelo)}</td>`).join('');
  const rowVermelho = areas.map(a => `<td class="clicavel" onclick="openAreaFiltrada('${a}','vermelho')" title="Ver eitos vermelhos de ${a}">${fmt(stats[a].vermelho)}</td>`).join('');

  document.getElementById('mapa-table').innerHTML = `
    <thead>
      <tr>
        <th>ÁREA</th>${headers}<th class="col-total" style="background:#1a5c1a;color:#fff">TOTAL</th>
      </tr>
    </thead>
    <tbody>
      <tr class="row-frutos">
        <td>FRUTOS</td>${rowFrutos}<td class="col-total">${fmt(gtFrutos)}</td>
      </tr>
      <tr class="row-verde">
        <td>VERDE</td>${rowVerde}<td class="col-total">${fmt(gtVerde)}</td>
      </tr>
      <tr class="row-amarelo">
        <td>AMARELA</td>${rowAmarelo}<td class="col-total">${fmt(gtAmarelo)}</td>
      </tr>
      <tr class="row-vermelho">
        <td>VERMELHO</td>${rowVermelho}<td class="col-total">${fmt(gtVermelho)}</td>
      </tr>
    </tbody>`;

  // ── GRÁFICO DE BARRAS EMPILHADAS ──
  const canvas = document.getElementById('mapa-canvas');
  const wrap = canvas.parentElement;
  const DPR = window.devicePixelRatio || 1;
  const W = wrap.clientWidth - 40;
  const H = 280;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext('2d');
  ctx.scale(DPR, DPR);
  ctx.clearRect(0,0,W,H);

  const pad = {t:24, r:20, b:52, l:64};
  const gW = W - pad.l - pad.r;
  const gH = H - pad.t - pad.b;
  const n = areas.length;
  const barW = Math.min(72, (gW / n) * 0.65);
  const gap = gW / n;
  const maxVal = Math.max(...areas.map(a => stats[a].frutos), 1);

  // grid
  ctx.strokeStyle = 'rgba(200,223,192,0.8)'; ctx.lineWidth = 1;
  for (let i=0; i<=4; i++) {
    const y = pad.t + gH * (1 - i/4);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + gW, y); ctx.stroke();
    ctx.fillStyle = '#5a7a52'; ctx.font = `11px DM Mono, monospace`; ctx.textAlign = 'right';
    ctx.fillText(fmtNum(Math.round(maxVal * i / 4)), pad.l - 6, y + 3);
  }

  // barras
  areas.forEach((area, i) => {
    const x = pad.l + i * gap + (gap - barW) / 2;
    const s = stats[area];
    const segs = [
      {val: s.verde,    color: '#22a745'},
      {val: s.amarelo,  color: '#e0a800'},
      {val: s.vermelho - s.critico, color: '#dc3545'},
      {val: s.critico,  color: '#7c3aed'},
    ];
    let yBottom = pad.t + gH;
    for (const seg of segs) {
      if (seg.val <= 0) continue;
      const h = (seg.val / maxVal) * gH;
      const y = yBottom - h;
      ctx.fillStyle = seg.color;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barW, h, seg===segs[0]?[4,4,0,0]:[0]) : ctx.rect(x, y, barW, h);
      ctx.fill();
      // label dentro da barra se altura suficiente
      if (h > 14) {
        ctx.fillStyle = '#fff';
        ctx.font = `bold 11px DM Mono, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(fmtNum(seg.val), x + barW/2, y + h/2 + 3);
      }
      yBottom -= h;
    }
    // label área
    ctx.fillStyle = '#1a3a1a';
    ctx.font = `bold 11px Syne, sans-serif`;
    ctx.textAlign = 'center';
    const nome = NOMES_CURTOS[area] || area;
    ctx.fillText(nome, x + barW/2, H - pad.b + 16);
    // total acima da barra
    if (s.frutos > 0) {
      ctx.fillStyle = '#5a7a52';
      ctx.font = `bold 11px DM Mono, monospace`;
      ctx.textAlign = 'center';
      const topY = pad.t + gH - (s.frutos / maxVal) * gH - 4;
      ctx.fillText(fmtNum(s.frutos), x + barW/2, topY);
    }
  });
}

// ─────────── FILTRO MAPA ───────────
function setMapaFiltro(filtro) {
  _mapaFiltro = filtro;
  ['todos','critico','vermelho','amarelo','verde'].forEach(f => {
    const btn = document.getElementById('mapa-filtro-' + f);
    if (btn) btn.classList.toggle('ativo', f === filtro);
  });
  renderMapa();
}

// ─────────── AREA DETAIL ───────────
function abrirTodasFiltrado(filtro) {
  const labels = {critico:'🟣 Críticos (+32 dias)', vermelho:'🔴 Vencidos (21–31 dias)', amarelo:'🟡 Atenção (15-20 dias)', verde:'🟢 Em dia (1-14 dias)'};
  const cores  = {critico:'var(--critico)', vermelho:'var(--vermelho)', amarelo:'var(--amarelo)', verde:'var(--verde)'};

  // coletar todos os eitos do filtro em todas as áreas
  const linhas = [];
  for(const [area, eitos] of Object.entries(DB)) {
    for(const e of eitos) {
      const ult  = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st   = statusDias(dias);
      if(st !== filtro) continue;
      linhas.push({area, e, ult, dias, st});
    }
  }
  // ordenar por dias decrescente (mais urgente primeiro)
  linhas.sort((a,b) => (b.dias??0) - (a.dias??0));

  document.getElementById('modal-todos-eitos-title').textContent = labels[filtro] || filtro;
  document.getElementById('modal-todos-eitos-sub').textContent =
    linhas.length + ' eito' + (linhas.length!==1?'s':'') + ' encontrado' + (linhas.length!==1?'s':'');

  const tbody = document.getElementById('modal-todos-eitos-tbody');
  tbody.innerHTML = '';
  linhas.forEach(({area, e, ult, dias, st}) => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.title = 'Ver histórico de ' + area + ' · Eito ' + e.id;
    tr.innerHTML =
      '<td style="font-size:12px;color:var(--muted)">' + (NOMES_CURTOS[area]||area) + '</td>'
     +'<td style="font-family:var(--font-mono);font-weight:700;color:var(--forest)">' + e.id + '</td>'
     +'<td><span style="font-size:11px;font-weight:700;color:'+cores[st]+'">' + (st==='critico'?'CRÍTICO':st==='vermelho'?'VENCIDO':st==='amarelo'?'ATENÇÃO':'VERDE') + '</span></td>'
     +'<td><span class="dias-badge dias-'+st+'">' + (dias!==null?dias+'d':'—') + '</span></td>'
     +'<td style="font-family:var(--font-mono);font-size:12px">' + (ult?fmtData(ult.data):'—') + '</td>'
     +'<td style="font-family:var(--font-mono)">' + (ult?fmtNum(ult.total):'—') + '</td>'
     +'<td style="font-family:var(--font-mono);color:var(--muted)">' + fmtNum(e.plantas) + '</td>';
    tr.addEventListener('click', () => {
      closeModal('modal-todos-eitos');
      openSidePanel(area, e.id);
    });
    tbody.appendChild(tr);
  });

  document.getElementById('modal-todos-eitos').classList.add('open');
}

function openAreaFiltrada(area, filtro) {
  openAreaDrawer(area, filtro);
}

function openArea(area) {
  openAreaDrawer(area, 'todos');
}

function setFilter(f) {
  currentFilter = f;
  const drawer = document.getElementById('area-drawer');
  drawer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const idx = {todos:0,critico:1,vermelho:2,amarelo:3,verde:4,sem:5}[f];
  const btns = drawer.querySelectorAll('.filter-btn');
  if (btns[idx]) btns[idx].classList.add('active');
  renderAreaTable();
}

function renderAreaTable() {
  if (!currentArea) return;
  const eitos = DB[currentArea];
  const search = document.getElementById('search-eito').value.toLowerCase();
  const tbody = document.getElementById('eitos-tbody');
  const tfoot = document.getElementById('eitos-tfoot');
  let totalCocos=0, totalMesa=0, totalFabrica=0, totalPlantas=0;

  const rows = eitos.filter(e => {
    const ult = getUltima(e);
    const dias = ult ? diasDesde(ult.data) : null;
    const st = statusDias(dias);
    if (currentFilter !== 'todos' && st !== currentFilter) return false;
    if (search && !e.id.toLowerCase().includes(search)) return false;
    return true;
  }).sort((a, b) => {
    const dA = (() => { const u=getUltima(a); return u?diasDesde(u.data):null; })();
    const dB = (() => { const u=getUltima(b); return u?diasDesde(u.data):null; })();
    const urgA = (dA===null||dA>=21)?0:dA>=15?1:2;
    const urgB = (dB===null||dB>=21)?0:dB>=15?1:2;
    if (urgA!==urgB) return urgA-urgB;
    return (dB??999)-(dA??999);
  });

  tbody.innerHTML = rows.map(e => {
    const ult = getUltima(e);
    const dias = ult ? diasDesde(ult.data) : null;
    const st = statusDias(dias);
    const media = ult && e.plantas > 0 ? (ult.total / e.plantas).toFixed(1) : '—';
    if (ult) { totalCocos+=ult.total; totalMesa+=ult.mesa; totalFabrica+=ult.fabrica; }
    totalPlantas += e.plantas;
    // alerta de queda: compara última colheita com média histórica
    let alertaQueda = null;
    if (e.historico && e.historico.length >= 2 && ult && e.plantas > 0) {
      const anteriores = e.historico.slice(0, -1);
      const mediaHist = anteriores.reduce((s,h) => s + h.total, 0) / anteriores.length;
      if (mediaHist > 0) {
        const queda = (mediaHist - ult.total) / mediaHist;
        if (queda >= 0.30) {
          alertaQueda = { pct: Math.round(queda * 100), mediaHist: Math.round(mediaHist) };
        }
      }
    }
    const proxData = ult ? addDias(ult.data, 21) : null;
    const proxFmt = proxData ? fmtData(proxData) : '—';
    const proxDiasRestantes = ult ? Math.max(0, 21 - dias) : null;
    const urgente = (dias === null || dias >= 21);
    const trBg = st==='critico'?'background:rgba(124,58,237,0.04)':urgente?'background:rgba(239,68,68,0.04)':'';
    return `<tr style="${trBg}">
      <td><span class="eito-id">${e.id}</span>${alertaQueda ? `<span class="alerta-queda" title="Queda de ${alertaQueda.pct}% vs média histórica (${fmtNum(alertaQueda.mediaHist)} cocos)">⚠️</span>` : ''}</td>
      <td><span class="status-dot sd-${st}"></span><span style="font-size:12px;font-weight:600;color:${corStatus(st)}">${statusLabel(st)}</span></td>
      <td>${dias!==null?`<span class="dias-badge dias-${st}">${dias}d</span>`:'<span class="dias-badge dias-sem">—</span>'}</td>
      <td style="font-family:var(--font-mono);font-size:12px">${ult?fmtData(ult.data):'—'}</td>
      <td style="font-family:var(--font-mono);font-size:12px;color:${urgente?corStatus(st):dias>=15?'var(--amarelo)':'var(--muted)'}">
        ${proxFmt}${proxDiasRestantes!==null&&!urgente?` <span style="font-size:10px">(${proxDiasRestantes}d)</span>`:''}
      </td>
      <td style="font-family:var(--font-mono)">${ult?fmtNum(ult.total):'—'}</td>
      <td style="font-family:var(--font-mono);color:var(--muted)">${fmtNum(e.plantas)}</td>
      <td style="font-family:var(--font-mono);color:var(--muted)">${media}</td>
      <td>
        <div class="inline-inputs">
          <input class="inline-inp" type="number" min="0" placeholder="Mesa"
            id="drawer-${currentArea}-${e.id}-mesa"
            oninput="onInlineInput('${e.id}')"
            onkeydown="navInline(event,'${e.id}','mesa')">
          <input class="inline-inp" type="number" min="0" placeholder="Fáb"
            id="drawer-${currentArea}-${e.id}-fabrica"
            oninput="onInlineInput('${e.id}')"
            onkeydown="navInline(event,'${e.id}','fabrica')">
          <button class="btn-salvar-inline" id="drawer-btn-${e.id}"
            onclick="salvarInline('${e.id}')" disabled>✓</button>
          <button class="btn-hist" onclick="openHistorico('${e.id}')">Hist.</button>
          ${(() => {
            const _ult = getUltima(e);
            const _hist = e.historico || [];
            const _ultIdx = _hist.length - 1;
            if(!_ult || _ultIdx < 0) return '';
            return '<button onclick="editarColheitaSidePanel(\''+currentArea+'\',\''+e.id+'\','+_ultIdx+')" style="background:none;border:1px solid var(--border);border-radius:5px;padding:3px 7px;cursor:pointer;font-size:11px;color:var(--muted)" title="Editar última">✏️</button>'
              +'<button onclick="excluirColheitaSidePanel(\''+currentArea+'\',\''+e.id+'\','+_ultIdx+')" style="background:none;border:1px solid var(--border);border-radius:5px;padding:3px 7px;cursor:pointer;font-size:11px;color:var(--vermelho)" title="Excluir última">✕</button>';
          })()}
        </div>
      </td>
    </tr>`;
  }).join('');

  tfoot.innerHTML = `<tr style="border-top:2px solid var(--border)">
    <td class="total-row" colspan="5" style="color:var(--muted);font-size:12px;padding:12px 14px">TOTAL (${rows.length} eitos)</td>
    <td class="total-row" style="font-family:var(--font-mono);padding:12px 14px">${fmtNum(totalCocos)}</td>
    <td class="total-row" style="font-family:var(--font-mono);color:var(--muted);padding:12px 14px">${fmtNum(totalPlantas)}</td>
    <td></td><td></td>
  </tr>`;
}

// ─── ALERTAS DE CONTRATOS NO DASHBOARD ───
function renderContratosAlertas(){
  const el=document.getElementById('dash-contratos-alertas');
  if(!el)return;
  const contratos=loadContratosLocal().filter(c=>c.status==='ativo');
  if(contratos.length===0){el.innerHTML='';return;}
  const agora=new Date();
  const mes=agora.getMonth()+1;
  const ano=agora.getFullYear();
  const dia=agora.getDate();
  let alertas=[];
  let cards='';
  for(const c of contratos){
    const cota=getCotaMes(c,mes);
    if(!cota)continue;
    const usado=getLitrosUsadosMes(c.cliente,c.id,ano,mes);
    const pct=cota.litros>0?Math.round(usado/cota.litros*100):0;
    const disp=Math.max(0,cota.litros-usado);
    const cor=pct<50?'var(--verde)':pct<80?'var(--amarelo)':pct<100?'#b45309':'var(--vermelho)';
    // Alertas
    if(dia>20&&pct<50)alertas.push(`⚠ ${c.cliente}: cota de ${MESES_NOME[mes-1]} em ${pct}% faltando ${30-dia} dias`);
    if(c.dataFim){
      const fim=new Date(c.dataFim);
      const diasFim=Math.round((fim-agora)/(1000*60*60*24));
      if(diasFim<=30&&diasFim>0)alertas.push(`⚠ ${c.cliente}: contrato vence em ${diasFim} dias (${fmtData(c.dataFim)})`);
    }
    if(pct>=100)alertas.push(`🔴 ${c.cliente}: cota ${MESES_NOME[mes-1]} atingida — vendas excedentes = SPOT`);
    cards+=`<div style="display:flex;align-items:center;gap:12px;padding:8px 0;font-size:12px">
      <strong style="min-width:120px">${c.cliente}</strong>
      <span>${MESES_NOME[mes-1]}: ${fmtNum(Math.round(usado))}/${fmtNum(cota.litros)}L</span>
      <div style="flex:1;background:var(--surface);border-radius:4px;height:8px;overflow:hidden;max-width:120px"><div style="width:${Math.min(pct,100)}%;height:100%;background:${cor};border-radius:4px"></div></div>
      <span style="color:${cor};font-weight:700">${pct}%</span>
      <span style="color:var(--muted)">R$ ${cota.valor_litro.toFixed(2)}/L</span>
    </div>`;
  }
  if(!cards){el.innerHTML='';return;}
  let alertHtml=alertas.map(a=>`<div style="font-size:11px;color:var(--amarelo);margin-top:4px">${a}</div>`).join('');
  el.innerHTML=`<div class="mapa-wrap" style="margin:0">
    <div class="mapa-title">📊 Contratos <span>— cotas do mês</span></div>
    <div style="padding:10px 20px">${cards}${alertHtml}</div>
  </div>`;
}
