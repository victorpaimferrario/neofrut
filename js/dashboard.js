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
  let totalEitos=0, totalVerdes=0, totalAmareloDash=0, totalVermelho=0, totalCocos=0;
  let totalPlantas=0, ultimaDataGlobal=null;
  let fppFazendaCocos=0, fppFazendaPlantas=0;

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
        if (h.data && h.data.startsWith(anoStr)) cocosAnoArea += h.total || 0;
      }
    }
    fppArea[area] = plantasArea > 0 ? cocosAnoArea / plantasArea : null;
    fppFazendaCocos  += cocosAnoArea;
    fppFazendaPlantas += plantasArea;
  }

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

  document.getElementById('kpi-grid').innerHTML = `
    <div class="kpi vermelho clicavel" style="text-align:center" onclick="abrirTodasFiltrado('vermelho')" title="Ver todos os eitos vencidos"><div class="kpi-label">🔴 Vencidos</div><div class="kpi-value">${fmtNum(totalVermelho)}</div><div class="kpi-sub">+21 dias · clique para ver</div></div>
    <div class="kpi amarelo clicavel" style="text-align:center" onclick="abrirTodasFiltrado('amarelo')" title="Ver todos os eitos em atenção"><div class="kpi-label">🟡 Atenção</div><div class="kpi-value">${fmtNum(totalAmareloDash)}</div><div class="kpi-sub">15–20 dias · clique para ver</div></div>
    <div class="kpi verde clicavel" style="text-align:center" onclick="abrirTodasFiltrado('verde')" title="Ver todos os eitos em dia"><div class="kpi-label">🟢 Em dia</div><div class="kpi-value">${fmtNum(totalVerdes)}</div><div class="kpi-sub">1–14 dias · clique para ver</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-label">Plantas Ativas</div><div class="kpi-value" style="color:var(--forest)">${fmtNum(totalPlantas)}</div><div class="kpi-sub">${totalEitos} eitos</div></div>
    <div class="kpi" style="text-align:center;border-color:${corFpp(parseFloat(fppFazenda))}"><div class="kpi-label">Frutos/Planta/${anoStr}</div><div class="kpi-value" style="color:${corFpp(parseFloat(fppFazenda))}">${fppFazenda}</div><div class="kpi-sub">meta: 300 · fazenda inteira</div></div>
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
        </div>
      </div>`;
  }
}


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

  // Calcula projeção para um período (seg a sex)
  // Retorna: total, porArea com {cocos, maxDias, nEitos}
  function calcPeriodo(segInicio, sexFim) {
    let totalGeral = 0;
    const porArea = {};
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0, maxDiasArea = 0, nEitosArea = 0;
      for (const e of eitos) {
        const ult = getUltima(e);
        if (!ult) continue;
        const d = diasDesde(ult.data);
        const dataProxima = new Date(ult.data + 'T00:00:00');
        dataProxima.setDate(dataProxima.getDate() + 21);
        // Inclui: já vencidos (>=21 dias) OU vence dentro do período
        if (d >= 21 || (dataProxima >= segInicio && dataProxima <= sexFim)) {
          const m = mediaEito(e);
          totalArea += m;
          totalGeral += m;
          nEitosArea++;
          if (d > maxDiasArea) maxDiasArea = d;
        }
      }
      if (totalArea > 0) porArea[area] = { cocos: totalArea, maxDias: maxDiasArea, nEitos: nEitosArea };
    }
    return { total: totalGeral, porArea };
  }

  // Card 3 — Próximos 21 dias (ciclo completo)
  function calc21() {
    let totalGeral = 0;
    const porArea = {};
    const limite = new Date(hoje); limite.setDate(hoje.getDate() + 21);
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0, maxDiasArea = 0, nEitosArea = 0;
      for (const e of eitos) {
        const ult = getUltima(e);
        if (!ult) continue;
        const d = diasDesde(ult.data);
        const dataProxima = new Date(ult.data + 'T00:00:00');
        dataProxima.setDate(dataProxima.getDate() + 21);
        // já vencidos OU vencem nos próximos 21 dias
        if (d >= 21 || dataProxima <= limite) {
          const m = mediaEito(e);
          totalArea += m;
          totalGeral += m;
          nEitosArea++;
          if (d > maxDiasArea) maxDiasArea = d;
        }
      }
      if (totalArea > 0) porArea[area] = { cocos: totalArea, maxDias: maxDiasArea, nEitos: nEitosArea };
    }
    return { total: totalGeral, porArea };
  }

  const r1 = calcPeriodo(segEsta, sexEsta);
  const r2 = calcPeriodo(segProx, sexProx);
  const r3 = calc21();

  const buildCard = (r, icon, label, sublabel, destaque) => {
    // Ordenar por dias vencidos (mais velho primeiro)
    const breakdown = Object.entries(r.porArea)
      .sort((a,b) => b[1].maxDias - a[1].maxDias)
      .map(([area, info]) => `
        <div class="proj-row proj-row-clicavel" onclick="openArea('${area}')" title="Abrir ${area} · ${info.nEitos} eitos">
          <span class="proj-row-area">${nomes[area]||area}</span>
          <span style="font-size:11px;font-family:var(--font-mono);color:${info.maxDias>=21?'var(--vermelho)':info.maxDias>=15?'var(--amarelo)':'var(--verde)'};min-width:40px;text-align:center">${info.maxDias}d</span>
          <span class="proj-row-val">${fmtNum(info.cocos)}</span>
        </div>`).join('');
    const totalEitos = Object.values(r.porArea).reduce((s,v) => s + v.nEitos, 0);
    const borda = destaque ? 'border:2px solid var(--accent);' : '';
    const btnLancar = destaque && totalEitos > 0
      ? `<button onclick="showPage('lancamento')" style="width:100%;margin-top:10px;padding:8px;background:var(--forest);color:#fff;border:none;border-radius:7px;font-family:var(--font-main);font-size:12px;font-weight:700;cursor:pointer">⚡ Lançar Colheita</button>`
      : '';
    return `
      <div class="proj-card" style="${borda}">
        <div class="proj-card-label">${icon} ${label}</div>
        <div style="font-size:10px;color:var(--accent2);font-family:var(--font-mono);margin-bottom:6px">${sublabel}</div>
        <div class="proj-card-val">${fmtNum(r.total)}</div>
        <div class="proj-card-sub">${totalEitos} eito${totalEitos!==1?'s':''} prontos</div>
        <div style="font-size:9px;color:var(--muted);margin-top:4px;line-height:1.3">Média histórica dos eitos vencidos ou a vencer no período</div>
        <div style="display:flex;gap:4px;font-size:9px;color:var(--muted);margin-top:2px;padding:0 4px">
          <span style="flex:1">ÁREA</span><span style="min-width:40px;text-align:center">DIAS</span><span style="min-width:50px;text-align:right">PROJEÇÃO</span>
        </div>
        <div class="proj-breakdown">${breakdown || '<span style="font-size:11px;color:var(--muted)">Nenhum eito previsto</span>'}</div>
        ${btnLancar}
      </div>`;
  };

  wrap.innerHTML = `
    <div class="proj-wrap">
      <div class="proj-header">🔮 Projeção de Colheita <span>— baseada na média histórica por eito</span></div>
      <div class="proj-cards">
        ${buildCard(r1, '📅', 'Esta semana',    fmtSemana(segEsta, sexEsta), true)}
        ${buildCard(r2, '📆', 'Próxima semana', fmtSemana(segProx, sexProx), false)}
        ${buildCard(r3, '🗓️', 'Próximos 21 dias', 'ciclo completo', false)}
      </div>
    </div>`;
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
  const nomesCurtos = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  const fmt = n => n > 0 ? n.toLocaleString('pt-BR') : '0';

  const headers = areas.map(a => `<th class="clicavel-header" onclick="openArea('${a}')" title="Abrir ${a}">${nomesCurtos[a]||a}</th>`).join('');
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
    const nome = nomesCurtos[area] || area;
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
  const nomesCurtos = {'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'};

  linhas.forEach(({area, e, ult, dias, st}) => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.title = 'Ver histórico de ' + area + ' · Eito ' + e.id;
    tr.innerHTML =
      '<td style="font-size:12px;color:var(--muted)">' + (nomesCurtos[area]||area) + '</td>'
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
