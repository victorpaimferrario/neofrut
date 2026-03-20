// ─────────── ANALISE ───────────

// ─────────── ANÁLISE ───────────
function initAnalise() {
  const primeiraArea = window._analiseAreaAtiva || ORDEM_AREAS.find(a=>DB[a]) || Object.keys(DB)[0];
  window._analiseAreaAtiva = primeiraArea;
  renderAreaBtnsAnalise(primeiraArea);
  renderAnalise();
}

function renderAreaBtnsAnalise(areaAtiva) {
  const wrap = document.getElementById('analise-area-btns');
  if (!wrap) return;
  const areas = ORDEM_AREAS.filter(a => DB[a]);
  wrap.innerHTML = areas.map(a =>
    `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaAnalise('${a}')">${NOMES_CURTOS[a]||a}</button>`
  ).join('');
}

function selecionarAreaAnalise(area) {
  window._analiseAreaAtiva = area;
  renderAreaBtnsAnalise(area);
  renderAnalise();
}

function renderAnalise() {
  const area = window._analiseAreaAtiva || Object.keys(DB)[0];
  const eitos = DB[area];
  const anoAtual = String(new Date().getFullYear());
  const busca = (document.getElementById('analise-busca')?.value || '').trim().toLowerCase();

  // popular select de eitos com histórico
  const sel2 = document.getElementById('analise-eito');
  const comHist = eitos.filter(e => e.historico && e.historico.length > 0);
  sel2.innerHTML = comHist.map(e => `<option value="${e.id}">Eito ${e.id}</option>`).join('');

  // fr/planta/ano por eito
  function fppEito(e) {
    const cocos = (e.historico||[]).filter(h=>h.data&&h.data.startsWith(anoAtual)).reduce((s,h)=>s+h.total,0);
    return e.plantas > 0 ? cocos / e.plantas : null;
  }
  function corFppE(v) {
    if (v===null) return 'var(--muted)';
    if (v >= 300) return 'var(--verde)';
    if (v >= 200) return 'var(--amarelo)';
    return 'var(--vermelho)';
  }

  // ranking de produtividade por eito
  let rows = eitos.map(e => {
    const hist = e.historico || [];
    const ultimas = hist.slice(-3);
    const mediaAtual = ultimas.length ? Math.round(ultimas.reduce((s,h)=>s+h.total,0)/ultimas.length) : 0;
    const ult = hist[hist.length-1];
    const dias = ult ? diasDesde(ult.data) : null;
    const st = statusDias(dias);
    const nColheitas = hist.length;
    const fpp = fppEito(e);
    // tendência: comparar última vs penúltima
    let trend = 'flat';
    if (hist.length >= 2) {
      const diff = hist[hist.length-1].total - hist[hist.length-2].total;
      if (diff > 50) trend = 'up';
      else if (diff < -50) trend = 'down';
    }
    // alerta de queda brusca: última < 70% da média histórica
    const mediaHist = hist.length > 0 ? hist.reduce((s,h)=>s+h.total,0)/hist.length : 0;
    const quedaBrusca = ult && mediaHist > 0 && (ult.total / mediaHist) < 0.70;
    return { e, mediaAtual, st, dias, trend, hist, nColheitas, fpp, quedaBrusca };
  }).sort((a,b) => {
    const urgA = (a.dias === null || a.dias >= 21) ? 0 : a.dias >= 15 ? 1 : 2;
    const urgB = (b.dias === null || b.dias >= 21) ? 0 : b.dias >= 15 ? 1 : 2;
    if (urgA !== urgB) return urgA - urgB;
    return (b.dias ?? 999) - (a.dias ?? 999);
  });

  // filtro de busca
  if (busca) rows = rows.filter(r => r.e.id.toLowerCase().includes(busca));

  // atualizar contador
  const countEl = document.getElementById('analise-busca-count');
  if (countEl) countEl.textContent = busca ? `${rows.length} de ${eitos.length} eitos` : `${eitos.length} eitos`;

  const maxMedia = Math.max(...rows.map(r=>r.mediaAtual), 1);

  document.getElementById('analise-ranking').innerHTML = `
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">
      ${area} — ${eitos.length} eitos · ordenado por prioridade de colheita
    </div>
    <table class="ranking-table">
      <thead><tr>
        <th>EITO</th><th>STATUS</th><th>DIAS</th><th>PRÓX. COLHEITA</th>
        <th>ÚLT. TOTAL</th><th>Fr/Pl/${anoAtual}</th><th>COLHEITAS</th><th>TENDÊNCIA</th><th>PRODUÇÃO (últimas 3)</th>
      </tr></thead>
      <tbody>
        ${rows.map(r => {
          const ult = r.hist[r.hist.length-1];
          const proxData = ult ? addDias(ult.data, 21) : '—';
          const proxDias = ult ? Math.max(0, 21 - r.dias) : '—';
          const barW = r.mediaAtual > 0 ? Math.round((r.mediaAtual/maxMedia)*120) : 2;
          const tIcon = r.trend==='up'?'↑':r.trend==='down'?'↓':'→';
          const tClass = r.trend==='up'?'trend-up':r.trend==='down'?'trend-down':'trend-flat';
          const fppFmt = r.fpp !== null ? Math.round(r.fpp) : '—';
          const alertaQueda = r.quedaBrusca ? '<span title="Queda brusca vs média histórica" style="color:var(--vermelho);font-size:13px;margin-left:4px">⚠️</span>' : '';
          const colheitasCor = r.nColheitas === 0 ? 'var(--vermelho)' : r.nColheitas <= 2 ? 'var(--amarelo)' : 'var(--muted)';
          return `<tr style="cursor:pointer" onclick="selectEitoAnalise('${r.e.id}')">
            <td style="font-family:var(--font-mono);font-weight:600">${r.e.id}${alertaQueda}</td>
            <td><span class="status-dot sd-${r.st}"></span><span style="font-size:11px;font-weight:600;color:${r.st==='verde'?'var(--verde)':r.st==='amarelo'?'var(--amarelo)':r.st==='vermelho'?'var(--vermelho)':'var(--muted)'}">${statusLabel(r.st)}</span></td>
            <td>${r.dias!==null?`<span class="dias-badge dias-${r.st}">${r.dias}d</span>`:'<span class="dias-badge dias-sem">—</span>'}</td>
            <td style="font-family:var(--font-mono);font-size:12px;color:${r.dias!==null&&r.dias>=21?'var(--vermelho)':r.dias!==null&&r.dias>=15?'var(--amarelo)':'var(--muted)'}">
              ${proxData !== '—' ? fmtData(proxData) : '—'}
              ${proxDias !== '—' ? `<span style="font-size:10px;margin-left:4px">(${proxDias}d)</span>` : ''}
            </td>
            <td style="font-family:var(--font-mono)">${ult?fmtNum(ult.total):'—'}</td>
            <td style="font-family:var(--font-mono);font-weight:700;color:${corFppE(r.fpp)}" title="Meta: 300 fr/pl/ano">${fppFmt}</td>
            <td style="font-family:var(--font-mono);color:${colheitasCor};font-size:12px" title="${r.nColheitas} colheita(s) registrada(s)">${r.nColheitas}</td>
            <td><span class="${tClass}" style="font-size:16px;font-weight:700">${tIcon}</span></td>
            <td><span class="spark-bar" style="width:${barW}px;opacity:0.85"></span> <span style="font-size:11px;color:var(--muted);font-family:var(--font-mono)">${r.mediaAtual>0?fmtNum(r.mediaAtual):''}</span></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;

  if (comHist.length > 0) renderAnaliseEito();
  renderProdMensal();
}


function selectEitoAnalise(eitoId) {
  const area = window._analiseAreaAtiva || Object.keys(DB)[0];
  openSidePanel(area, eitoId);
}

function renderAnaliseEito() {
  const area = window._analiseAreaAtiva || Object.keys(DB)[0];
  const eitoId = document.getElementById('analise-eito').value;
  const eito = DB[area]?.find(e=>e.id===eitoId);
  if (!eito || !eito.historico?.length) {
    document.getElementById('analise-grafico-wrap').style.display='none';
    return;
  }
  const hist = eito.historico;
  document.getElementById('analise-grafico-wrap').style.display='';
  document.getElementById('grafico-title').textContent = `${area} · Eito ${eitoId} · ${eito.plantas} plantas · ${hist.length} colheita(s) registrada(s)`;

  // desenhar gráfico canvas
  const canvas = document.getElementById('grafico-canvas');
  canvas.width = canvas.parentElement.clientWidth - 48;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const vals = hist.map(h=>h.total);
  const maxV = Math.max(...vals, 1);
  const minV = 0;
  const W = canvas.width, H = canvas.height;
  const pad = {t:20,r:20,b:40,l:60};
  const gW = W-pad.l-pad.r, gH = H-pad.t-pad.b;
  const n = vals.length;

  // grid lines
  ctx.strokeStyle = 'rgba(42,47,62,0.8)'; ctx.lineWidth=1;
  for (let i=0;i<=4;i++) {
    const y = pad.t + gH*(1-i/4);
    ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+gW,y); ctx.stroke();
    ctx.fillStyle='rgba(107,115,144,0.8)'; ctx.font='10px DM Mono,monospace'; ctx.textAlign='right';
    ctx.fillText(fmtNum(Math.round(minV+(maxV-minV)*i/4)), pad.l-8, y+4);
  }

  const xPos = i => pad.l + (n===1 ? gW/2 : i/(n-1)*gW);
  const yPos = v => pad.t + gH*(1-(v-minV)/(maxV-minV));

  // area fill
  if (n > 1) {
    const grad = ctx.createLinearGradient(0,pad.t,0,pad.t+gH);
    grad.addColorStop(0,'rgba(61,157,163,0.3)');
    grad.addColorStop(1,'rgba(61,157,163,0.02)');
    ctx.beginPath();
    ctx.moveTo(xPos(0), yPos(vals[0]));
    for (let i=1;i<n;i++) ctx.lineTo(xPos(i), yPos(vals[i]));
    ctx.lineTo(xPos(n-1), pad.t+gH);
    ctx.lineTo(xPos(0), pad.t+gH);
    ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
  }

  // linha
  ctx.strokeStyle='#3d9da3'; ctx.lineWidth=2.5; ctx.lineJoin='round';
  ctx.beginPath();
  vals.forEach((v,i) => i===0 ? ctx.moveTo(xPos(i),yPos(v)) : ctx.lineTo(xPos(i),yPos(v)));
  ctx.stroke();

  // pontos + labels data
  vals.forEach((v,i) => {
    ctx.beginPath();
    ctx.arc(xPos(i),yPos(v),5,0,Math.PI*2);
    ctx.fillStyle='#3d9da3'; ctx.fill();
    ctx.strokeStyle='var(--surface)'; ctx.lineWidth=2; ctx.stroke();

    // data label
    ctx.fillStyle='rgba(107,115,144,0.9)'; ctx.font='9px DM Mono,monospace'; ctx.textAlign='center';
    const d = hist[i].data.slice(5).replace('-','/'); // MM/DD
    ctx.fillText(d, xPos(i), H-pad.b+14);
  });

  // stats
  const media = Math.round(vals.reduce((s,v)=>s+v,0)/vals.length);
  const melhor = Math.max(...vals);
  const pior = Math.min(...vals);
  const ultima = vals[vals.length-1];
  const tendencia = vals.length>=2 ? vals[vals.length-1]-vals[vals.length-2] : 0;
  const proxData = addDias(hist[hist.length-1].data, 21);

  document.getElementById('grafico-stats').innerHTML = `
    <div class="kpi" style="padding:14px"><div class="kpi-label">Média histórica</div><div class="kpi-value" style="font-size:20px;color:var(--accent2)">${fmtNum(media)}</div></div>
    <div class="kpi" style="padding:14px"><div class="kpi-label">Última colheita</div><div class="kpi-value" style="font-size:20px">${fmtNum(ultima)}</div></div>
    <div class="kpi" style="padding:14px"><div class="kpi-label">Tendência</div><div class="kpi-value" style="font-size:20px;color:${tendencia>0?'var(--verde)':tendencia<0?'var(--vermelho)':'var(--muted)'}">${tendencia>0?'+':''}${fmtNum(tendencia)}</div></div>
    <div class="kpi" style="padding:14px"><div class="kpi-label">Melhor colheita</div><div class="kpi-value" style="font-size:20px;color:var(--verde)">${fmtNum(melhor)}</div></div>
    <div class="kpi" style="padding:14px"><div class="kpi-label">Próxima colheita</div><div class="kpi-value" style="font-size:16px;color:var(--amarelo)">${fmtData(proxData)}</div></div>
  `;
  document.getElementById('analise-info').textContent = `${hist.length} colheita(s) · média: ${fmtNum(media)} cocos`;
}

// ─────────── PRODUTIVIDADE MENSAL ───────────
// ─────────── HISTÓRICO DE PRODUTIVIDADE MENSAL ───────────
function renderProdMensal() {
  const wrap = document.getElementById('prod-mensal-wrap');
  if (!wrap) return;

  // cores por área
  const coresArea = {
    'AREA A1':    '#1a7a6e',
    'AREA A2':    '#22a745',
    'AREA C':     '#e0a800',
    'AREA D':     '#dc3545',
    'MAMÃO DE CIMA':  '#7c3aed',
    'MAMÃO DE BAIXO': '#db2777',
    'MARACUJÁ':   '#2563eb',
  };

  // Agregar por área e mês: média de cocos/planta
  const porAreaMes = {};
  const mesesSet = new Set();

  for (const [area, eitos] of Object.entries(DB)) {
    porAreaMes[area] = {};
    for (const e of eitos) {
      if (!e.plantas || e.plantas === 0) continue;
      for (const h of (e.historico || [])) {
        const mes = h.data.substring(0, 7); // YYYY-MM
        mesesSet.add(mes);
        if (!porAreaMes[area][mes]) porAreaMes[area][mes] = { soma: 0, count: 0 };
        porAreaMes[area][mes].soma  += h.total / e.plantas;
        porAreaMes[area][mes].count += 1;
      }
    }
  }

  const meses = [...mesesSet].sort().slice(-8); // últimos 8 meses

  if (meses.length < 2) {
    wrap.style.display = 'none';
    return;
  }
  wrap.style.display = '';

  // Filtrar áreas com dados em pelo menos 1 mês
  const areasComDados = Object.keys(DB).filter(area =>
    meses.some(m => porAreaMes[area]?.[m]?.count > 0)
  );

  if (areasComDados.length === 0) { wrap.style.display = 'none'; return; }

  // Legenda
  const legenda = document.getElementById('prod-legenda');
  if (legenda) {
    legenda.innerHTML = areasComDados.map(area => {
      const nomes = {'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
        'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'};
      const cor = coresArea[area] || '#888';
      return `<div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--muted)">
        <div style="width:12px;height:3px;background:${cor};border-radius:2px"></div>
        ${nomes[area]||area}
      </div>`;
    }).join('');
  }

  // Gráfico
  requestAnimationFrame(() => {
    const canvas = document.getElementById('prod-canvas');
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    const W = canvas.parentElement.clientWidth - 40;
    const H = 220;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    ctx.clearRect(0, 0, W, H);

    const pad  = {t:20, r:20, b:40, l:52};
    const gW   = W - pad.l - pad.r;
    const gH   = H - pad.t - pad.b;
    const n    = meses.length;
    const xPos = i => pad.l + (n === 1 ? gW/2 : i/(n-1)*gW);

    // calcular maxVal entre todas as séries
    let maxV = 0;
    for (const area of areasComDados) {
      for (const m of meses) {
        const d = porAreaMes[area]?.[m];
        if (d?.count > 0) maxV = Math.max(maxV, d.soma/d.count);
      }
    }
    maxV = maxV > 0 ? Math.ceil(maxV * 1.15) : 15;

    const yPos = v => pad.t + gH * (1 - v/maxV);

    // grid
    ctx.strokeStyle = 'rgba(200,223,192,0.7)'; ctx.lineWidth = 1;
    for (let i=0; i<=4; i++) {
      const y = pad.t + gH*(1-i/4);
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l+gW, y); ctx.stroke();
      ctx.fillStyle = '#7a9470'; ctx.font = '10px DM Mono,monospace'; ctx.textAlign = 'right';
      ctx.fillText((maxV*i/4).toFixed(1), pad.l-5, y+3);
    }

    // labels do eixo X (mês)
    meses.forEach((m, i) => {
      ctx.fillStyle = '#7a9470'; ctx.font = '10px DM Mono,monospace'; ctx.textAlign = 'center';
      const partes = m.split('-');
      ctx.fillText(`${partes[1]}/${partes[0].slice(2)}`, xPos(i), H-pad.b+14);
    });

    // uma linha por área
    for (const area of areasComDados) {
      const cor = coresArea[area] || '#888880';
      const vals = meses.map(m => {
        const d = porAreaMes[area]?.[m];
        return d?.count > 0 ? d.soma/d.count : null;
      });

      // linha (só entre pontos com dados)
      ctx.strokeStyle = cor; ctx.lineWidth = 2; ctx.lineJoin = 'round';
      ctx.setLineDash([]);
      let iniciou = false;
      vals.forEach((v, i) => {
        if (v === null) { iniciou = false; return; }
        if (!iniciou) { ctx.beginPath(); ctx.moveTo(xPos(i), yPos(v)); iniciou = true; }
        else ctx.lineTo(xPos(i), yPos(v));
      });
      ctx.stroke();

      // pontos
      vals.forEach((v, i) => {
        if (v === null) return;
        ctx.beginPath(); ctx.arc(xPos(i), yPos(v), 3.5, 0, Math.PI*2);
        ctx.fillStyle = cor; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      });
    }
  });
}
