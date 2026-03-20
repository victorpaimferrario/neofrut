// ─────────── DASHBOARD ───────────

let currentArea = null;
let currentFilter = 'todos';
let currentEitoId = null;
let _mapaFiltro = 'todos';

function renderDashboard() {
  const hoje = new Date();
  document.getElementById('hoje-badge').textContent =
    hoje.toLocaleDateString('pt-BR', {weekday:'long', year:'numeric', month:'long', day:'numeric'}).toUpperCase();

  const anoAtual = new Date().getFullYear();
  const anoStr   = String(anoAtual);

  // frutos/planta/ano por área — soma colheitas do ano calendário ÷ plantas da área
  const fppArea = {};
  const colhidosAnoArea = {};
  let totalEitos=0, totalVerdes=0, totalAmareloDash=0, totalVermelho=0, totalCocos=0;
  let totalPlantas=0, ultimaDataGlobal=null;
  let fppFazendaCocos=0, fppFazendaPlantas=0;
  let colhidosMes=0, colhidosAno=0;
  const mesAtual = String(anoAtual)+'-'+String(hoje.getMonth()+1).padStart(2,'0');

  for (const [area, eitos] of Object.entries(DB)) {
    let cocosAnoArea=0, plantasArea=0;
    for (const e of eitos) {
      const ult  = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st   = statusDias(dias);
      totalEitos++;
      totalPlantas += e.plantas || 0;
      plantasArea  += e.plantas || 0;
      if (st==='verde') totalVerdes++;
      else if (st==='amarelo') totalAmareloDash++;
      else if (st==='vermelho') totalVermelho++;
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
    if (totalVermelho > 0) {
      alertEl.style.display = 'flex';
      document.getElementById('alerta-vencidos-txt').textContent =
        `${totalVermelho} eito${totalVermelho>1?'s':''} vencido${totalVermelho>1?'s':''} — colheita urgente!`;
    } else {
      alertEl.style.display = 'none';
    }
  }

  const nomesMes = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const mesNome = nomesMes[hoje.getMonth()+1];
  document.getElementById('kpi-grid').innerHTML = `
    <div class="kpi vermelho clicavel" style="text-align:center" onclick="abrirTodasFiltrado('vermelho')" title="Ver todos os eitos vencidos"><div class="kpi-label">🔴 Vencidos</div><div class="kpi-value">${fmtNum(totalVermelho)}</div><div class="kpi-sub">+21 dias</div></div>
    <div class="kpi amarelo clicavel" style="text-align:center" onclick="abrirTodasFiltrado('amarelo')" title="Ver todos os eitos em atenção"><div class="kpi-label">🟡 Atenção</div><div class="kpi-value">${fmtNum(totalAmareloDash)}</div><div class="kpi-sub">15–20 dias</div></div>
    <div class="kpi verde clicavel" style="text-align:center" onclick="abrirTodasFiltrado('verde')" title="Ver todos os eitos em dia"><div class="kpi-label">🟢 Em dia</div><div class="kpi-value">${fmtNum(totalVerdes)}</div><div class="kpi-sub">1–14 dias</div></div>
    <div class="kpi clicavel" style="text-align:center;border-left-color:var(--teal)" onclick="abrirColhidosMes()" title="Ver colhidos do mês"><div class="kpi-label">🥥 Colhidos ${mesNome}</div><div class="kpi-value" style="color:var(--teal)">${fmtNum(colhidosMes)}</div><div class="kpi-sub">mês atual</div></div>
    <div class="kpi clicavel" style="text-align:center;border-left-color:var(--forest)" onclick="abrirColhidosAno()" title="Ver colhidos por área no ano"><div class="kpi-label">🌴 Colhidos ${anoStr}</div><div class="kpi-value" style="color:var(--forest)">${fmtNum(colhidosAno)}</div><div class="kpi-sub">todas as áreas</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-label">Plantas Ativas</div><div class="kpi-value" style="color:var(--forest)">${fmtNum(totalPlantas)}</div><div class="kpi-sub">${totalEitos} eitos</div></div>
    <div class="kpi" style="text-align:center;border-color:${corFpp(parseFloat(fppFazenda))}"><div class="kpi-label">Fr/Pl/${anoStr}</div><div class="kpi-value" style="color:${corFpp(parseFloat(fppFazenda))}">${fppFazenda}</div><div class="kpi-sub">meta: 300</div></div>
  `;

  const grid = document.getElementById('areas-grid');
  grid.innerHTML = '';
  const areasOrdenadas = ORDEM_AREAS.filter(a=>DB[a]).map(a=>[a,DB[a]]);
  // incluir áreas que existam em DB mas não estejam na ordem definida
  Object.keys(DB).forEach(a=>{if(!ORDEM_AREAS.includes(a))areasOrdenadas.push([a,DB[a]]);});
  for (const [area, eitos] of areasOrdenadas) {
    let v=0,a=0,r=0,s=0,cocos=0,plantas=0;
    let maisAntiga = null, maisRecente = null;
    let somaMediaPl=0, eitosComColheita=0;
    for (const e of eitos) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st = statusDias(dias);
      if (st==='verde') v++;
      else if (st==='amarelo') a++;
      else if (st==='vermelho') r++;
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
          pr = (r/total*100).toFixed(0), ps = (s/total*100).toFixed(0);
    const urgente = r > 0 ? `<span class="urgente-tag">${r} VENCIDO${r>1?'S':''}</span>` : '';

    grid.innerHTML += `
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
          <div class="bar-seg bar-vermelho" style="width:${pr}%"></div>
          <div class="bar-seg bar-sem" style="width:${ps}%"></div>
        </div>
        <div class="area-stats">
          <div class="area-stat"><div class="area-stat-val" style="color:var(--verde)">${v}</div><div class="area-stat-label">Verde</div></div>
          <div class="area-stat"><div class="area-stat-val" style="color:var(--amarelo)">${a}</div><div class="area-stat-label">Amarelo</div></div>
          <div class="area-stat"><div class="area-stat-val" style="color:var(--vermelho)">${r}</div><div class="area-stat-label">Vencido</div></div>
          <div class="area-stat"><div class="area-stat-val" style="color:var(--accent2)">${fmtNum(cocos)}</div><div class="area-stat-label">Ult. Colheita</div></div>
          <div class="area-stat" title="Frutos por planta no ano ${anoStr} — meta: 300"><div class="area-stat-val" style="color:${corFpp(fppArea[area])}">${fppArea[area]!==null?Math.round(fppArea[area]):'—'}</div><div class="area-stat-label">Fr/Pl/${anoStr}</div></div>
          <div class="area-stat" title="Total de frutos colhidos nesta área em ${anoStr}"><div class="area-stat-val" style="color:var(--teal)">${fmtNum(colhidosAnoArea[area]||0)}</div><div class="area-stat-label">Colhidos ${anoStr}</div></div>
        </div>
      </div>`;
  }
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

  // Média histórica do eito
  function mediaEito(e) {
    const hist = e.historico || [];
    const ult  = getUltima(e);
    return hist.length > 0
      ? Math.round(hist.reduce((s,h) => s+h.total, 0) / hist.length)
      : (ult ? ult.total : 0);
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

  // Card 2 — Próxima semana: eitos que vencem na próxima semana + acumulados não colhidos desta semana
  function calcProxima() {
    let totalGeral = 0;
    const porArea = {};
    const segProxISO = toISO(segProx);
    const sexProxISO = toISO(sexProx);
    const segISO = toISO(segEsta);
    const sexISO = toISO(sexEsta);
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0, maxDiasArea = 0, nEitosArea = 0;
      for (const e of eitos) {
        const hist = e.historico || [];
        // Colheita mais recente antes desta semana (base de referência)
        const anteriores = hist.filter(h => h.data < segISO);
        const ultAnterior = anteriores.length > 0 ? anteriores[anteriores.length - 1] : null;
        // Colheitas desta semana
        const colhidoEstaSemana = hist.filter(h => h.data >= segISO && h.data <= sexISO);

        let entra = false;
        let diasRef = 0; // dias na sexta da próxima semana

        if (ultAnterior) {
          const proxColheita = new Date(ultAnterior.data + 'T00:00:00');
          proxColheita.setDate(proxColheita.getDate() + 21);
          const proxISO = toISO(proxColheita);

          // Caso 1: acumulado — era pra colher esta semana mas NÃO colheu
          const deviaColherEstaSemana = proxISO <= sexISO;
          if (deviaColherEstaSemana && colhidoEstaSemana.length === 0) {
            entra = true;
            diasRef = Math.round((sexProx - new Date(ultAnterior.data + 'T00:00:00')) / 86400000);
          }
          // Caso 2: novo — vence na próxima semana (entre seg e sex próxima)
          else if (proxISO >= segProxISO && proxISO <= sexProxISO) {
            entra = true;
            diasRef = Math.round((sexProx - new Date(ultAnterior.data + 'T00:00:00')) / 86400000);
          }
        } else {
          // Sem colheita anterior: usar última colheita geral
          const ult = getUltima(e);
          if (ult) {
            const proxColheita = new Date(ult.data + 'T00:00:00');
            proxColheita.setDate(proxColheita.getDate() + 21);
            const proxISO = toISO(proxColheita);
            if (proxISO >= segProxISO && proxISO <= sexProxISO) {
              entra = true;
              diasRef = Math.round((sexProx - new Date(ult.data + 'T00:00:00')) / 86400000);
            }
          }
        }

        // Se colheu esta semana, considerar a colheita desta semana como nova base
        if (!entra && colhidoEstaSemana.length > 0) {
          const ultEstaSemana = colhidoEstaSemana[colhidoEstaSemana.length - 1];
          const proxColheita = new Date(ultEstaSemana.data + 'T00:00:00');
          proxColheita.setDate(proxColheita.getDate() + 21);
          const proxISO = toISO(proxColheita);
          if (proxISO >= segProxISO && proxISO <= sexProxISO) {
            entra = true;
            diasRef = Math.round((sexProx - new Date(ultEstaSemana.data + 'T00:00:00')) / 86400000);
          }
        }

        if (entra) {
          const m = mediaEito(e);
          totalArea += m;
          totalGeral += m;
          nEitosArea++;
          if (diasRef > maxDiasArea) maxDiasArea = diasRef;
        }
      }
      if (totalArea > 0) porArea[area] = { cocos: totalArea, maxDias: maxDiasArea, nEitos: nEitosArea };
    }
    return { total: totalGeral, porArea };
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
    const diasCor = info.maxDias >= 21 ? 'var(--vermelho)' : info.maxDias >= 15 ? 'var(--amarelo)' : 'var(--verde)';
    const bordaCor = info.nUrg > 0 ? 'rgba(220,53,69,0.15)' : 'rgba(224,168,0,0.15)';
    const badges = (info.nUrg > 0 ? `<span style="font-size:9px;font-weight:800;background:var(--vermelho);color:#fff;padding:1px 6px;border-radius:4px">URG ${info.nUrg}</span> ` : '')
                 + (info.nSem > 0 ? `<span style="font-size:9px;font-weight:800;background:var(--amarelo);color:#fff;padding:1px 6px;border-radius:4px">SEM ${info.nSem}</span>` : '');

    // Tabela de eitos expandível
    const eitoRows = info.eitos.map(ei => {
      const tipoCor = ei.tipo === 'urg' ? 'var(--vermelho)' : 'var(--amarelo)';
      const tipoLabel = ei.tipo === 'urg' ? 'URGENTE' : 'SEMANA';
      const diasEitoCor = ei.dias >= 21 ? 'var(--vermelho)' : ei.dias >= 15 ? 'var(--amarelo)' : 'var(--verde)';
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
      <div class="proj-card-label">📅 Esta semana</div>
      <div style="font-size:9px;color:var(--accent2);font-family:var(--font-mono);margin-bottom:8px">${fmtSemana(segEsta, sexEsta)}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px">
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
          <span style="font-size:12px;font-weight:800;font-family:var(--font-mono);color:${info.maxDias>=21?'var(--vermelho)':info.maxDias>=15?'var(--amarelo)':'var(--verde)'};text-align:center">${info.maxDias}d</span>
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

  // Cards genéricos (próxima semana, 21 dias)
  let _projCardIdx = 0;
  function buildCardGenerico(r, icon, label, sublabel) {
    const breakdown = buildBreakdown(r.porArea);
    const totalEitos = Object.values(r.porArea).reduce((s,v) => s + v.nEitos, 0);
    const cardId = 'proj-gen-' + (++_projCardIdx);
    return `
      <div class="proj-card">
        <div class="proj-card-label">${icon} ${label}</div>
        <div style="font-size:10px;color:var(--accent2);font-family:var(--font-mono);margin-bottom:6px">${sublabel}</div>
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

  // ── Card 2 — Colhido Esta Semana ──
  const DIAS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const hojeISO = toISO(hoje);
  const segISO_c2 = toISO(segEsta);
  // Coletar todas as colheitas desta semana agrupadas por lancamento_id (ou data+area)
  const lancamentos = {};
  let totalColhidoSemana = 0, totalEitosSemana = 0;
  const clientesSemana = new Set();
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      for (const h of (e.historico || [])) {
        if (h.data >= segISO_c2 && h.data <= hojeISO) {
          const key = h.lancamento_id || (h.data + '|' + area + '|' + (h.cliente || ''));
          if (!lancamentos[key]) {
            lancamentos[key] = {
              data: h.data,
              cliente: h.cliente || null,
              areas: {},
              total: 0,
              eitos: []
            };
          }
          const l = lancamentos[key];
          if (!l.areas[area]) l.areas[area] = 0;
          l.areas[area] += h.total;
          l.total += h.total;
          l.eitos.push({ id: e.id, area, qtd: h.total });
          totalColhidoSemana += h.total;
          totalEitosSemana++;
          if (h.cliente) clientesSemana.add(h.cliente);
        }
      }
    }
  }

  // Ordenar por data decrescente
  const lancList = Object.values(lancamentos).sort((a,b) => a.data.localeCompare(b.data));

  // Badge: Seg DD/MM – Hoje
  const segFmt = `${String(segEsta.getDate()).padStart(2,'0')}/${String(segEsta.getMonth()+1).padStart(2,'0')}`;
  const badgeSemana = `📅 Seg ${segFmt} – hoje`;

  // Formatar valor abreviado para KPI
  function fmtK(v) {
    if (v >= 1000) return (v/1000).toFixed(1).replace('.0','') + 'k';
    return String(v);
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
      const areasStr = areasNomes.join(' · ');
      const clienteStr = l.cliente || '<span style="color:var(--muted);font-style:italic">sem cliente</span>';
      const safeIdx = 'lanc_' + idx;

      const eitoRows = l.eitos.map(ei => `
        <div style="display:grid;grid-template-columns:80px 1fr auto;align-items:center;gap:8px;padding:4px 6px;border-radius:5px">
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--forest)">${ei.id}</span>
          <span style="font-size:10px;color:var(--muted)">${nomes[ei.area] || ei.area}</span>
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--text);text-align:right">${fmtNum(ei.qtd)}</span>
        </div>`).join('');

      lancHtml += `
        <div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:6px">
          <div onclick="toggleLanc('${safeIdx}')" style="display:grid;grid-template-columns:52px 1fr auto auto auto;align-items:center;gap:8px;padding:10px 14px;cursor:pointer;transition:background 0.12s;user-select:none" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''">
            <div>
              <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--muted)">${diaSem}</div>
              <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--muted)">${dataFmt}</div>
            </div>
            <div>
              <div style="font-size:13px;font-weight:800;color:var(--forest)">${clienteStr}</div>
              <div style="font-size:10px;font-family:var(--font-mono);color:var(--muted);margin-top:2px">${areasStr}</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:var(--font-mono);font-size:13px;font-weight:800;color:var(--forest)">${fmtNum(l.total)}</div>
              <div style="font-size:9px;color:var(--muted);text-align:right;margin-top:1px">cocos</div>
            </div>
            <span style="font-size:9px;font-weight:700;font-family:var(--font-mono);padding:3px 8px;border-radius:20px;background:var(--surface2);color:var(--muted);border:1px solid var(--border);white-space:nowrap">${l.eitos.length} eitos</span>
            <span id="lanc-chev-${safeIdx}" style="font-size:10px;color:var(--muted);transition:transform 0.2s;text-align:center">▾</span>
          </div>
          <div id="lanc-detail-${safeIdx}" style="display:none;border-top:1px solid var(--border);padding:10px 14px 12px;background:#fafcf8">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;display:flex;gap:8px;align-items:center">
              Eitos colhidos
              ${areasNomes.map(a => `<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;background:var(--surface2);color:var(--muted);border:1px solid var(--border)">${a}</span>`).join('')}
            </div>
            <div style="display:flex;flex-direction:column;gap:3px">${eitoRows}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 6px 0;border-top:1px solid var(--border);margin-top:6px">
              <span style="font-size:10px;font-weight:700;color:var(--muted)">Total do lançamento</span>
              <span style="font-family:var(--font-mono);font-size:12px;font-weight:800;color:var(--forest)">${fmtNum(l.total)} cocos</span>
            </div>
            <div style="margin-top:8px">
              <span style="display:inline-flex;align-items:center;gap:4px;font-size:9px;font-weight:700;font-family:var(--font-mono);padding:2px 7px;border-radius:4px;background:#e8f5e0;color:var(--forest);border:1px solid var(--border)">🔍 ${l.eitos.length} eitos · ${areasStr} · ${dataFmt}</span>
            </div>
          </div>
        </div>`;
    });
  }

  const cardColhido = `
    <div class="proj-card" style="display:flex;flex-direction:column;">
      <div class="proj-card-label">📋 Colhido Esta Semana</div>
      <div style="display:inline-flex;align-items:center;gap:4px;font-size:9px;font-family:var(--font-mono);color:var(--muted);background:var(--surface2);padding:3px 10px;border-radius:20px;margin-bottom:8px;width:fit-content">${badgeSemana}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px">
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:6px 4px;text-align:center">
          <div style="font-size:8px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">🌴 Colhido</div>
          <div style="font-size:16px;font-weight:800;font-family:var(--font-mono);color:var(--forest);line-height:1;margin-bottom:1px">${totalColhidoSemana > 0 ? fmtK(totalColhidoSemana) : '—'}</div>
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
      <div class="proj-header">🔮 Projeção de Colheita <span>— baseada na média histórica por eito</span></div>
      <div class="proj-cards" style="grid-template-columns:repeat(3,1fr)">
        ${cardEsta}
        ${cardColhido}
        ${buildCardGenerico(r2, '📆', 'Próxima semana', fmtSemana(segProx, sexProx))}
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
    let frutos=0, verde=0, amarelo=0, vermelho=0;
    for (const e of DB[area]) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st = statusDias(dias);
      const total = ult ? ult.total : 0;
      frutos += total;
      if (st==='verde') verde += total;
      else if (st==='amarelo') amarelo += total;
      else if (st==='vermelho') vermelho += total;
    }
    stats[area] = {frutos, verde, amarelo, vermelho};
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
      {val: s.vermelho, color: '#dc3545'},
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
  ['todos','vermelho','amarelo','verde'].forEach(f => {
    const btn = document.getElementById('mapa-filtro-' + f);
    if (btn) btn.classList.toggle('ativo', f === filtro);
  });
  renderMapa();
}

// ─────────── AREA DETAIL ───────────
function abrirTodasFiltrado(filtro) {
  const labels = {vermelho:'🔴 Vencidos (+21 dias)', amarelo:'🟡 Atenção (15-20 dias)', verde:'🟢 Em dia (1-14 dias)'};
  const cores  = {vermelho:'var(--vermelho)', amarelo:'var(--amarelo)', verde:'var(--verde)'};

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
     +'<td><span style="font-size:11px;font-weight:700;color:'+cores[st]+'">' + (st==='vermelho'?'VENCIDO':st==='amarelo'?'ATENÇÃO':'VERDE') + '</span></td>'
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
  const idx = {todos:0,vermelho:1,amarelo:2,verde:3,sem:4}[f];
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
    return `<tr style="${urgente?'background:rgba(239,68,68,0.04)':''}">
      <td><span class="eito-id">${e.id}</span>${alertaQueda ? `<span class="alerta-queda" title="Queda de ${alertaQueda.pct}% vs média histórica (${fmtNum(alertaQueda.mediaHist)} cocos)">⚠️</span>` : ''}</td>
      <td><span class="status-dot sd-${st}"></span><span style="font-size:12px;font-weight:600;color:${st==='verde'?'var(--verde)':st==='amarelo'?'var(--amarelo)':st==='vermelho'?'var(--vermelho)':'var(--muted)'}">${statusLabel(st)}</span></td>
      <td>${dias!==null?`<span class="dias-badge dias-${st}">${dias}d</span>`:'<span class="dias-badge dias-sem">—</span>'}</td>
      <td style="font-family:var(--font-mono);font-size:12px">${ult?fmtData(ult.data):'—'}</td>
      <td style="font-family:var(--font-mono);font-size:12px;color:${urgente?'var(--vermelho)':dias>=15?'var(--amarelo)':'var(--muted)'}">
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
