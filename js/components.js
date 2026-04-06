// ─────────── COMPONENTS ───────────

// ── SIDE PANEL (eito history) ──
function openSidePanel(area, eitoId) {
  const eito = DB[area]?.find(e=>e.id===eitoId);
  if (!eito) return;
  const hist = eito.historico || [];
  const ult = hist[hist.length-1];
  const dias = ult ? diasDesde(ult.data) : null;

  document.getElementById('side-title').textContent = `${area} · Eito ${eitoId}`;
  document.getElementById('side-sub').textContent = `${eito.plantas} plantas · ${hist.length} colheita(s)`;

  // KPIs
  const media = hist.length ? Math.round(hist.reduce((s,h)=>s+h.total,0)/hist.length) : 0;
  const melhor = hist.length ? Math.max(...hist.map(h=>h.total)) : 0;
  const ultima = ult ? ult.total : 0;
  const tendencia = hist.length>=2 ? hist[hist.length-1].total - hist[hist.length-2].total : null;
  const proxData = ult ? addDias(ult.data, 21) : null;
  const st = statusDias(dias);

  document.getElementById('side-kpis').innerHTML = `
    <div class="side-kpi"><div class="side-kpi-label">Última colheita</div><div class="side-kpi-value">${fmtNum(ultima)}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Média histórica</div><div class="side-kpi-value" style="color:var(--accent2)">${fmtNum(media)}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Tendência</div><div class="side-kpi-value" style="color:${tendencia===null?'var(--muted)':tendencia>0?'var(--verde)':'var(--vermelho)'}">${tendencia===null?'—':tendencia>0?'+'+fmtNum(tendencia):fmtNum(tendencia)}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Próxima colheita</div><div class="side-kpi-value" style="font-size:14px;color:${corStatus(st)}">${proxData?fmtData(proxData):'—'}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Melhor colheita</div><div class="side-kpi-value" style="color:var(--verde)">${fmtNum(melhor)}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Dias s/ colheita</div><div class="side-kpi-value" style="color:${st==='vermelho'||st==='critico'?corStatus(st):st==='amarelo'?'var(--amarelo)':'var(--text)'}">${dias!==null?dias+'d':'—'}</div></div>
  `;

  // Gráfico
  const canvas = document.getElementById('side-canvas');
  const panelBody = canvas.parentElement;
  canvas.width = panelBody.clientWidth - 40 || 380;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if (hist.length >= 2) {
    const vals = hist.map(h=>h.total);
    const maxV = Math.max(...vals,1);
    const W=canvas.width, H=canvas.height;
    const pad={t:16,r:12,b:32,l:52};
    const gW=W-pad.l-pad.r, gH=H-pad.t-pad.b;
    const n=vals.length;
    const xPos=i=>pad.l+(n===1?gW/2:i/(n-1)*gW);
    const yPos=v=>pad.t+gH*(1-v/maxV);

    // grid
    ctx.strokeStyle='rgba(42,47,62,0.8)'; ctx.lineWidth=1;
    for(let i=0;i<=3;i++){
      const y=pad.t+gH*(1-i/3);
      ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+gW,y);ctx.stroke();
      ctx.fillStyle='rgba(107,115,144,0.8)';ctx.font='9px DM Mono,monospace';ctx.textAlign='right';
      ctx.fillText(fmtNum(Math.round(maxV*i/3)),pad.l-6,y+3);
    }
    // área
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+gH);
    grad.addColorStop(0,'rgba(61,157,163,0.25)');grad.addColorStop(1,'rgba(61,157,163,0.01)');
    ctx.beginPath();ctx.moveTo(xPos(0),yPos(vals[0]));
    for(let i=1;i<n;i++)ctx.lineTo(xPos(i),yPos(vals[i]));
    ctx.lineTo(xPos(n-1),pad.t+gH);ctx.lineTo(xPos(0),pad.t+gH);
    ctx.closePath();ctx.fillStyle=grad;ctx.fill();
    // linha
    ctx.strokeStyle='#3d9da3';ctx.lineWidth=2;ctx.lineJoin='round';
    ctx.beginPath();vals.forEach((v,i)=>i===0?ctx.moveTo(xPos(i),yPos(v)):ctx.lineTo(xPos(i),yPos(v)));ctx.stroke();
    // pontos + datas
    vals.forEach((v,i)=>{
      ctx.beginPath();ctx.arc(xPos(i),yPos(v),4,0,Math.PI*2);
      ctx.fillStyle='#3d9da3';ctx.fill();ctx.strokeStyle='var(--surface)';ctx.lineWidth=1.5;ctx.stroke();
      ctx.fillStyle='rgba(107,115,144,0.8)';ctx.font='8px DM Mono,monospace';ctx.textAlign='center';
      ctx.fillText(hist[i].data.slice(5).replace('-','/'),xPos(i),H-pad.b+12);
    });
  } else if (hist.length===1) {
    ctx.fillStyle='var(--muted)';ctx.font='12px Syne,sans-serif';ctx.textAlign='center';
    ctx.fillText('1 colheita registrada — gráfico disponível a partir da 2ª',canvas.width/2,canvas.height/2);
  } else {
    ctx.fillStyle='var(--muted)';ctx.font='12px Syne,sans-serif';ctx.textAlign='center';
    ctx.fillText('Nenhuma colheita registrada',canvas.width/2,canvas.height/2);
  }

  // Histórico lista
  const histList = document.getElementById('side-hist-list');
  if (!hist.length) {
    histList.innerHTML='<div style="color:var(--muted);font-size:12px;padding:12px 0">Nenhuma colheita registrada.</div>';
  } else {
    histList.innerHTML = '';
    [...hist].reverse().forEach((h, i) => {
      const realIdx = hist.length - 1 - i;
      const isFirst = i === 0;
      const bg     = isFirst ? 'var(--verde-bg)' : 'var(--surface2)';
      const border = isFirst ? 'var(--verde-border)' : 'var(--border)';
      const cor    = isFirst ? 'var(--verde)' : 'var(--text)';
      const pct    = h.total > 0 ? ' · ' + Math.round(h.mesa / h.total * 100) + '% mesa' : '';

      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:6px';

      const card = document.createElement('div');
      card.style.cssText = 'flex:1;display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:'+bg+';border:1px solid '+border+';border-radius:8px';
      card.innerHTML =
        '<div>'
        + '<div style="font-family:var(--font-mono);font-size:12px;font-weight:500">' + fmtData(h.data) + '</div>'
        + '<div style="font-size:10px;color:var(--muted);margin-top:2px;font-family:var(--font-mono)">Mesa: ' + fmtNum(h.mesa) + ' · Fáb: ' + fmtNum(h.fabrica) + pct + '</div>'
        + '</div>'
        + '<div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:' + cor + '">' + fmtNum(h.total) + '</div>';

      const btnEdit = document.createElement('button');
      btnEdit.textContent = '✏️';
      btnEdit.title = 'Editar';
      btnEdit.style.cssText = 'background:none;border:1px solid var(--border);border-radius:5px;padding:4px 8px;cursor:pointer;font-size:13px;flex-shrink:0';
      btnEdit.onclick = () => editarColheitaSidePanel(area, eitoId, realIdx);

      const btnDel = document.createElement('button');
      btnDel.textContent = '✕';
      btnDel.title = 'Excluir';
      btnDel.style.cssText = 'background:none;border:1px solid var(--border);border-radius:5px;padding:4px 8px;cursor:pointer;font-size:13px;flex-shrink:0;color:var(--vermelho)';
      btnDel.onclick = () => excluirColheitaSidePanel(area, eitoId, realIdx);

      wrapper.appendChild(card);
      wrapper.appendChild(btnEdit);
      wrapper.appendChild(btnDel);
      histList.appendChild(wrapper);
    });
  }

  document.getElementById('side-panel').classList.add('open');
  document.getElementById('side-overlay').classList.add('open');
}

function closeSidePanel() {
  document.getElementById('side-panel').classList.remove('open');
  document.getElementById('side-overlay').classList.remove('open');
}

// ── AREA DRAWER ──
// ─────────── DRAWER DE ÁREA ───────────
function openAreaDrawer(area, filtro) {
  currentArea = area;
  currentFilter = filtro || 'todos';
  document.getElementById('drawer-area-title').textContent = area;
  const eitos = DB[area];
  if(!eitos) { showToast('⚠ Área não encontrada'); return; }
  const plantas = eitos.reduce((s,e)=>s+e.plantas,0);
  document.getElementById('drawer-area-meta').textContent =
    `${eitos.length} eitos · ${fmtNum(plantas)} plantas`;
  document.getElementById('search-eito').value = '';
  // resetar filtros visuais
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const idx = {todos:0,critico:1,vermelho:2,amarelo:3,verde:4,sem:5}[currentFilter];
  const btns = document.querySelectorAll('.filter-btn');
  if (btns[idx]) btns[idx].classList.add('active');
  // abrir
  document.getElementById('area-drawer').classList.add('open');
  document.getElementById('area-drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderAreaTable();
}

function closeAreaDrawer() {
  document.getElementById('area-drawer').classList.remove('open');
  document.getElementById('area-drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Escape handler is in router.js

// ── MODAL COLHEITA ──
function openModalColheita(eitoId) {
  currentEitoId = eitoId;
  const eito = eitoId ? DB[currentArea].find(e=>e.id===eitoId) : null;
  document.getElementById('modal-title').textContent = eitoId ? `Colheita — Eito ${eitoId}` : `Registrar Colheita`;
  document.getElementById('modal-sub').textContent = `${currentArea}${eitoId ? ` · Eito ${eitoId} · ${eito?.plantas??0} plantas` : ' · informe o eito abaixo'}`;
  document.getElementById('inp-data').value = today();
  document.getElementById('inp-mesa').value = '';
  document.getElementById('inp-fabrica').value = '';
  document.getElementById('total-preview').textContent = '0';
  document.getElementById('modal-colheita').classList.add('open');
}
function calcTotal() {
  const m = parseInt(document.getElementById('inp-mesa').value)||0;
  const f = parseInt(document.getElementById('inp-fabrica').value)||0;
  document.getElementById('total-preview').textContent = fmtNum(m+f);
}
async function salvarColheita() {
  const data = document.getElementById('inp-data').value;
  const mesa = parseInt(document.getElementById('inp-mesa').value)||0;
  const fabrica = parseInt(document.getElementById('inp-fabrica').value)||0;
  const total = mesa + fabrica;
  if (!data) { alert('Informe a data.'); return; }
  if (total === 0) { alert('Informe ao menos Mesa ou Fábrica.'); return; }

  const reg = { data, total, mesa, fabrica };
  const modalEl = document.getElementById('modal-colheita');
  const editIdx = modalEl.dataset.editIdx !== undefined && modalEl.dataset.editIdx !== '' ? parseInt(modalEl.dataset.editIdx) : -1;
  delete modalEl.dataset.editIdx;

  if (currentEitoId) {
    const eito = DB[currentArea].find(e=>e.id===currentEitoId);
    if (!eito.historico) eito.historico = [];
    if(editIdx >= 0) {
      // edição — remover antiga do Supabase e substituir
      const antiga = eito.historico[editIdx];
      try {
        if(antiga._id) {
          await _SB.from('colheitas').delete().eq('id', antiga._id);
        } else {
          await _SB.from('colheitas').delete()
            .eq('area', currentArea).eq('eito_id', currentEitoId)
            .eq('data', antiga.data).eq('total', antiga.total);
        }
      } catch(err) { console.error(err); }
      eito.historico[editIdx] = reg;
    } else {
      eito.historico.push(reg);
    }
  }

  await saveData();
  await salvarColheitaSupabase(currentArea, currentEitoId, reg);
  closeModal('modal-colheita');
  renderAreaTable();
  renderDashboard();
  setTimeout(renderProjecao, 60);
  setTimeout(renderComparativo, 70);
  setTimeout(renderMapa, 80);
  showToast('✓ Colheita registrada — Eito '+currentEitoId+' · '+fmtNum(total)+' cocos');
}

// ── MODAL HISTORICO ──
function openHistorico(eitoId) {
  openSidePanel(currentArea, eitoId);
}

// ── EXPORTAR ──
function exportarExcel() {
  let csv = 'ÁREA;EITO;PLANTAS;DATA;DIAS;STATUS;TOTAL;MESA;FÁBRICA;MÉDIA/PLANTA\n';
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : '';
      const st = ult ? statusLabel(statusDias(dias)) : 'SEM COLHEITA';
      const media = ult && e.plantas > 0 ? (ult.total/e.plantas).toFixed(2) : '';
      csv += `${area};${e.id};${e.plantas};${ult?ult.data:''};${dias};${st};${ult?ult.total:0};${ult?ult.mesa:0};${ult?ult.fabrica:0};${media}\n`;
    }
  }
  // historico sheet
  csv += '\n\nHISTÓRICO COMPLETO\nÁREA;EITO;DATA;TOTAL;MESA;FÁBRICA\n';
  for (const [area, eitos] of Object.entries(DB)) {
    for (const e of eitos) {
      for (const h of (e.historico||[])) {
        csv += `${area};${e.id};${h.data};${h.total};${h.mesa};${h.fabrica}\n`;
      }
    }
  }
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `colheitas_${today()}.csv`;
  a.click(); URL.revokeObjectURL(url);
  showToast('✓ Exportado com sucesso');
}

// ── EDITAR/EXCLUIR COLHEITA SIDE PANEL ──
async function excluirColheitaSidePanel(area, eitoId, idx){
  const eito = DB[area]?.find(e=>e.id===eitoId);
  if(!eito||!eito.historico) return;
  const h = eito.historico[idx];
  if(!confirm('Excluir colheita de '+fmtData(h.data)+' ('+fmtNum(h.total)+' cocos)?')) return;
  // excluir do Supabase — usar _id se disponível, senão filtrar por campos
  try {
    if(h._id) {
      await _SB.from('colheitas').delete().eq('id', h._id);
    } else {
      await _SB.from('colheitas').delete()
        .eq('area', area).eq('eito_id', eitoId).eq('data', h.data).eq('total', h.total);
    }
  } catch(err) { console.error('Erro ao excluir colheita:', err); }
  eito.historico.splice(idx, 1);
  await saveData();
  renderDashboard();
  setTimeout(renderMapa, 60);
  openSidePanel(area, eitoId);
  showToast('✓ Colheita excluída');
}

function editarColheitaSidePanel(area, eitoId, idx){
  const eito = DB[area]?.find(e=>e.id===eitoId);
  if(!eito||!eito.historico) return;
  const h = eito.historico[idx];
  if(!h) return;
  // abrir modal de colheita preenchido
  currentArea = area;
  currentEitoId = eitoId;
  document.getElementById('modal-title').textContent = 'Editar Colheita — Eito '+eitoId;
  document.getElementById('modal-sub').textContent = area+' · Eito '+eitoId+' · '+eito.plantas+' plantas';
  document.getElementById('inp-data').value = h.data;
  document.getElementById('inp-mesa').value = h.mesa;
  document.getElementById('inp-fabrica').value = h.fabrica;
  document.getElementById('total-preview').textContent = fmtNum(h.total);
  // guardar índice para substituir ao salvar
  document.getElementById('modal-colheita').dataset.editIdx = idx;
  document.getElementById('modal-colheita').classList.add('open');
}

// ── CONTROLE DE PLANTAS ──
// ─────────── CONTROLE DE PLANTAS ───────────
function openModalPlantas(eitoIdPresel) {
  const eitos = DB[currentArea];
  const sub = document.getElementById('plantas-sub');
  if (sub) sub.textContent = currentArea + ' · selecione o eito para atualizar';
  // popular select
  const sel = document.getElementById('plantas-eito');
  sel.innerHTML = eitos.map(e =>
    `<option value="${e.id}" ${eitoIdPresel===e.id?'selected':''}>${e.id} — ${e.plantas} plantas</option>`
  ).join('');
  // mostrar plantas atuais
  onSelectEitoPlanta();
  document.getElementById('plantas-novo').value = '';
  document.getElementById('modal-plantas').classList.add('open');
}

function onSelectEitoPlanta() {
  const sel   = document.getElementById('plantas-eito');
  const eito  = DB[currentArea]?.find(e => e.id === sel.value);
  const atual = document.getElementById('plantas-atual');
  if (atual) atual.textContent = eito ? fmtNum(eito.plantas) : '—';
}

function salvarPlantas() {
  const eitoId  = document.getElementById('plantas-eito').value;
  const novo    = parseInt(document.getElementById('plantas-novo').value);
  const motivo  = document.getElementById('plantas-motivo').value;
  if (!eitoId) { alert('Selecione o eito.'); return; }
  if (isNaN(novo) || novo < 0) { alert('Informe um valor válido.'); return; }
  const eito = DB[currentArea]?.find(e => e.id === eitoId);
  if (!eito) return;
  const anterior = eito.plantas;
  eito.plantas = novo;
  // registrar no histórico de plantas
  if (!eito.historicoPlanta) eito.historicoPlanta = [];
  eito.historicoPlanta.push({
    data: today(),
    anterior,
    novo,
    motivo
  });
  saveData();
  closeModal('modal-plantas');
  // atualizar meta do drawer
  const totalPlantas = DB[currentArea].reduce((s,e)=>s+e.plantas,0);
  document.getElementById('drawer-area-meta').textContent =
    `${DB[currentArea].length} eitos · ${fmtNum(totalPlantas)} plantas`;
  renderAreaTable();
  renderDashboard();
  setTimeout(renderMapa, 60);
  const diff = novo - anterior;
  const sinal = diff > 0 ? `+${diff}` : `${diff}`;
  showToast(`✓ Eito ${eitoId} — plantas: ${fmtNum(anterior)} → ${fmtNum(novo)} (${sinal})`);
}

// ── INLINE EDITING ──
function onInlineInput(eitoId) {
  const mesa    = parseInt(document.getElementById(`drawer-${currentArea}-${eitoId}-mesa`)?.value)||0;
  const fabrica = parseInt(document.getElementById(`drawer-${currentArea}-${eitoId}-fabrica`)?.value)||0;
  const btn = document.getElementById(`drawer-btn-${eitoId}`);
  if (btn) btn.disabled = (mesa + fabrica) === 0;
  document.getElementById(`drawer-${currentArea}-${eitoId}-mesa`)?.classList.toggle('filled', mesa > 0);
  document.getElementById(`drawer-${currentArea}-${eitoId}-fabrica`)?.classList.toggle('filled', fabrica > 0);
}

function navInline(e, eitoId, campo) {
  if (e.key !== 'Enter' && e.key !== 'Tab') return;
  e.preventDefault();
  if (campo === 'mesa') {
    const fab = document.getElementById(`drawer-${currentArea}-${eitoId}-fabrica`);
    if (fab) { fab.focus(); fab.select(); }
  } else {
    const mesa    = parseInt(document.getElementById(`drawer-${currentArea}-${eitoId}-mesa`)?.value)||0;
    const fabrica = parseInt(document.getElementById(`drawer-${currentArea}-${eitoId}-fabrica`)?.value)||0;
    if (mesa + fabrica > 0) salvarInline(eitoId);
    const eitos = DB[currentArea];
    const idx = eitos.findIndex(e2 => e2.id === eitoId);
    if (idx >= 0 && idx < eitos.length - 1) {
      const nextId = eitos[idx + 1].id;
      setTimeout(() => {
        const nextInp = document.getElementById(`drawer-${currentArea}-${nextId}-mesa`);
        if (nextInp) { nextInp.focus(); nextInp.select(); nextInp.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      }, 80);
    }
  }
}

async function salvarInline(eitoId) {
  const data    = today();
  const mesa    = parseInt(document.getElementById(`drawer-${currentArea}-${eitoId}-mesa`)?.value)||0;
  const fabrica = parseInt(document.getElementById(`drawer-${currentArea}-${eitoId}-fabrica`)?.value)||0;
  const total   = mesa + fabrica;
  if (total === 0) return;
  const eito = DB[currentArea]?.find(e => e.id === eitoId);
  if (!eito) return;
  if (!eito.historico) eito.historico = [];
  eito.historico.push({ data, total, mesa, fabrica });
  await saveData();
  await salvarColheitaSupabase(currentArea, eitoId, { data, total, mesa, fabrica });
  const mEl = document.getElementById(`drawer-${currentArea}-${eitoId}-mesa`);
  const fEl = document.getElementById(`drawer-${currentArea}-${eitoId}-fabrica`);
  const btn = document.getElementById(`drawer-btn-${eitoId}`);
  if (mEl) { mEl.value = ''; mEl.classList.remove('filled'); }
  if (fEl) { fEl.value = ''; fEl.classList.remove('filled'); }
  if (btn) btn.disabled = true;
  renderAreaTable();
  renderDashboard();
  setTimeout(renderProjecao, 60);
  setTimeout(renderComparativo, 70);
  setTimeout(renderMapa, 80);
  showToast(`✓ Eito ${eitoId} — ${fmtNum(total)} cocos`);
}

// ── CLIENTE PANEL ──
window._cliPanelNome = null; // nome do cliente aberto no painel

function switchCliTab(tab){
  document.querySelectorAll('.cli-tab-card').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.cli-tab-content').forEach(c=>{c.classList.remove('active');c.style.display='none';});
  if(tab==='editar'){
    document.getElementById('cli-tab-edit').classList.add('active');
    const body=document.getElementById('cli-body-editar');
    body.classList.add('active');body.style.display='block';
    _loadClienteForm(window._cliPanelNome);
  } else if(tab==='contrato'){
    document.getElementById('cli-tab-contrato').classList.add('active');
    const body=document.getElementById('cli-body-contrato');
    body.classList.add('active');body.style.display='block';
    renderContratoTab(window._cliPanelNome);
  } else {
    document.getElementById('cli-tab-hist').classList.add('active');
    const body=document.getElementById('cli-body-historico');
    body.classList.add('active');body.style.display='block';
  }
}

function _loadClienteForm(nome){
  // Limpar campos
  ['cli-nome','cli-telefone','cli-email','cli-cpf-cnpj','cli-ie','cli-cidade','cli-endereco','cli-contato2'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.value='';
  });
  document.getElementById('cli-obs').value='';
  document.getElementById('cli-uf').value='';
  document.getElementById('cli-tipo').value='mesa';
  document.getElementById('cli-status').value='ativo';
  document.getElementById('cli-edit-id').value='';
  const erro=document.getElementById('cli-erro');
  if(erro)erro.style.display='none';

  if(!nome)return; // novo cliente
  const clientes=loadClientesLocal();
  const c=clientes.find(x=>x.nome===nome);
  if(!c)return;
  document.getElementById('cli-edit-id').value=c.id||'';
  document.getElementById('cli-nome').value=c.nome||'';
  document.getElementById('cli-telefone').value=c.telefone||'';
  document.getElementById('cli-email').value=c.email||'';
  document.getElementById('cli-cpf-cnpj').value=c.cpf_cnpj||'';
  document.getElementById('cli-ie').value=c.ie||'';
  document.getElementById('cli-uf').value=c.uf||'';
  document.getElementById('cli-cidade').value=c.cidade||'';
  document.getElementById('cli-endereco').value=c.endereco||'';
  document.getElementById('cli-contato2').value=c.contato_secundario||'';
  document.getElementById('cli-obs').value=c.observacoes||'';
  document.getElementById('cli-tipo').value=c.tipo||'mesa';
  document.getElementById('cli-status').value=c.status||'ativo';
  // Campos fábrica
  const fabFields=document.getElementById('cli-fab-fields');
  if(fabFields)fabFields.style.display=(c.tipo==='fabrica')?'':'none';
  const freteTon=document.getElementById('cli-frete-ton');
  if(freteTon)freteTon.value=c.frete_por_ton||'';
  const distKm=document.getElementById('cli-distancia');
  if(distKm)distKm.value=c.distancia_km||'';
}

function openClientePanel(cliente, tab){
  window._cliPanelNome=cliente;
  const db=loadVendas();
  const vendas=db.filter(v=>v.cliente===cliente).sort((a,b)=>a.data.localeCompare(b.data));
  const tCocos=vendas.reduce((s,v)=>s+(v.qtde||0),0);
  const tReceita=vendas.reduce((s,v)=>s+(v.total||0),0);
  const tFrete=vendas.reduce((s,v)=>s+(v.frete||0),0);
  const preco=tCocos>0?((tReceita-tFrete)/tCocos).toFixed(2):0;
  const ult=vendas[vendas.length-1];
  const pendentes=vendas.filter(v=>v.status==='PENDENTE');
  const tPend=pendentes.reduce((s,v)=>s+(v.valorRecebido||v.total||0),0);

  document.getElementById('cli-title').textContent=cliente;
  let subText=vendas.length+' compra'+(vendas.length!==1?'s':'')+' registrada'+(vendas.length!==1?'s':'');
  if(pendentes.length>0) subText+=' · '+pendentes.length+' pendente'+(pendentes.length>1?'s':'');
  document.getElementById('cli-sub').textContent=subText;

  // KPIs
  let kpiHtml=
    '<div class="side-kpi"><div class="side-kpi-label">Total cocos</div><div class="side-kpi-value">'+fmtNum(tCocos)+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Receita total</div><div class="side-kpi-value" style="color:var(--forest)">'+fmtR(tReceita)+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">R$/coco médio</div><div class="side-kpi-value">R$ '+preco+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Última compra</div><div class="side-kpi-value" style="font-size:14px">'+(ult?fmtData(ult.data):'—')+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Frete total</div><div class="side-kpi-value">'+fmtR(tFrete)+'</div></div>';
  if(pendentes.length>0){
    kpiHtml+='<div class="side-kpi" style="border-left-color:#854d0e;background:var(--amarelo-bg)"><div class="side-kpi-label" style="color:#854d0e">A receber</div><div class="side-kpi-value" style="color:#854d0e">'+fmtR(tPend)+'</div></div>';
  } else {
    kpiHtml+='<div class="side-kpi"><div class="side-kpi-label">Margem líquida</div><div class="side-kpi-value" style="color:var(--verde)">'+fmtR(tReceita-tFrete)+'</div></div>';
  }
  document.getElementById('cli-kpis').innerHTML=kpiHtml;

  // Gráfico volume mensal
  const porMes={};
  vendas.forEach(v=>{const m=v.data.substring(0,7);if(!porMes[m])porMes[m]={c:0,r:0};porMes[m].c+=v.qtde||0;porMes[m].r+=v.total||0;});
  const meses=Object.keys(porMes).sort();
  setTimeout(()=>{
    const canvas=document.getElementById('cli-canvas');
    if(!canvas||!meses.length)return;
    const DPR=window.devicePixelRatio||1;
    const W=canvas.parentElement.clientWidth-20,H=140;
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    canvas.width=W*DPR;canvas.height=H*DPR;
    const ctx=canvas.getContext('2d');ctx.scale(DPR,DPR);ctx.clearRect(0,0,W,H);
    const vals=meses.map(m=>porMes[m].c);
    const maxV=Math.max(...vals,1);
    const n=meses.length;
    const pad={t:16,r:12,b:32,l:52},gW=W-pad.l-pad.r,gH=H-pad.t-pad.b;
    const xP=i=>pad.l+(n===1?gW/2:i/(n-1)*gW),yP=v=>pad.t+gH*(1-v/maxV);
    ctx.strokeStyle='rgba(200,223,192,0.5)';ctx.lineWidth=1;
    for(let i=0;i<=3;i++){const y=pad.t+gH*(1-i/3);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+gW,y);ctx.stroke();
      ctx.fillStyle='#7a9470';ctx.font='9px DM Mono,monospace';ctx.textAlign='right';ctx.fillText(fmtNum(Math.round(maxV*i/3)),pad.l-4,y+3);}
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+gH);
    grad.addColorStop(0,'rgba(26,122,110,0.2)');grad.addColorStop(1,'rgba(26,122,110,0.01)');
    ctx.beginPath();ctx.moveTo(xP(0),yP(vals[0]));
    for(let i=1;i<n;i++)ctx.lineTo(xP(i),yP(vals[i]));
    ctx.lineTo(xP(n-1),pad.t+gH);ctx.lineTo(xP(0),pad.t+gH);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
    ctx.strokeStyle='#1a7a6e';ctx.lineWidth=2;ctx.lineJoin='round';
    ctx.beginPath();vals.forEach((v,i)=>i===0?ctx.moveTo(xP(i),yP(v)):ctx.lineTo(xP(i),yP(v)));ctx.stroke();
    vals.forEach((v,i)=>{
      ctx.beginPath();ctx.arc(xP(i),yP(v),3,0,Math.PI*2);ctx.fillStyle='#1a7a6e';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
      ctx.fillStyle='#7a9470';ctx.font='8px DM Mono,monospace';ctx.textAlign='center';
      const parts=meses[i].split('-');ctx.fillText(parts[1]+'/'+parts[0].slice(2),xP(i),H-pad.b+12);
    });
  },60);

  // Histórico com status PAGO/PENDENTE
  document.getElementById('cli-hist').innerHTML=[...vendas].reverse().map((v,i)=>{
    const [y,m,d]=v.data.split('-');
    const pc=v.qtde>0&&v.total>0?((v.total-(v.frete||0))/v.qtde).toFixed(2):null;
    const areasKeys=v.areas?Object.keys(v.areas).filter(a=>v.areas[a]>0):[];
    const areasTag=areasKeys.length>0
      ?'<span style="display:inline-flex;gap:3px;margin-top:4px">'+areasKeys.map(a=>'<span style="font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;background:var(--verde-bg);color:var(--verde);border:1px solid var(--verde-border)">'+a+'</span>').join('')+'</span>'
      :'<span style="font-size:9px;color:#db2777;margin-top:4px;display:block">sem área vinculada</span>';
    const isPend=v.status==='PENDENTE';
    const bgColor=isPend?'var(--amarelo-bg)':(i===0?'var(--verde-bg)':'var(--surface2)');
    const bdColor=isPend?'var(--amarelo-border)':(i===0?'var(--verde-border)':'var(--border)');
    // Badge de status
    const statusBadge=isPend
      ?'<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:8px;background:var(--amarelo-bg);color:#854d0e;border:1px solid var(--amarelo-border)">PENDENTE</span>'
      :'<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:8px;background:var(--verde-bg);color:var(--verde);border:1px solid var(--verde-border)">PAGO</span>';
    // Botão pago (só para pendentes)
    const pagoBtn=isPend
      ?'<button class="btn btn-primary" style="font-size:10px;padding:4px 10px;margin-top:6px" onclick="event.stopPropagation();marcarPagoPainel('+v.id+')">✓ Marcar Pago</button>'
      :'';
    return '<div onclick="closeClientePanel();editarVenda('+v.id+')" style="cursor:pointer;padding:10px 12px;background:'+bgColor+';border:1px solid '+bdColor+';border-radius:8px;margin-bottom:6px;transition:opacity .15s" onmouseenter="this.style.opacity=0.8" onmouseleave="this.style.opacity=1">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">'
        +'<div style="font-family:var(--font-mono);font-size:12px;font-weight:600">'+d+'/'+m+'/'+y+'</div>'
        +'<div style="display:flex;align-items:center;gap:6px">'+statusBadge+'<span style="font-size:10px;color:var(--muted)">'+(v.nf&&v.nf!=='RECIBO'?'NF '+v.nf:'')+'  ✏️</span></div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">'
        +'<div><div style="font-size:8px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">Cocos</div><div style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--text)">'+fmtNum(v.qtde)+'</div></div>'
        +'<div><div style="font-size:8px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">R$/coco</div><div style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--text)">'+(pc?'R$ '+pc:'—')+'</div></div>'
        +'<div style="text-align:right"><div style="font-size:8px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--muted);margin-bottom:2px">Total</div><div style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--forest)">'+fmtR(v.total)+'</div></div>'
      +'</div>'
      +areasTag
      +pagoBtn
    +'</div>';
  }).join('');

  // Mostrar/ocultar tab contrato para fábricas
  const mapa=getMapaClientes();
  const ctrTab=document.getElementById('cli-tab-contrato');
  if(ctrTab)ctrTab.style.display=mapa[cliente]?.fabrica?'':'none';

  // Abrir na tab correta
  switchCliTab(tab||'historico');
  document.getElementById('cli-panel').classList.add('open');
  document.getElementById('cli-overlay').classList.add('open');
}

async function marcarPagoPainel(id){
  const db=loadVendas();const v=db.find(x=>x.id===id);if(!v)return;
  if(!confirm('Confirmar pagamento de '+v.cliente+'?\n'+fmtNum(v.qtde)+' cocos · '+fmtR(v.valorRecebido||v.total)))return;
  v.status='PAGO';v.dataDeposito=v.dataDeposito||today();
  saveVendas(db);
  await salvarVendaSupabase(v);
  if(typeof renderVendasPendentes==='function')renderVendasPendentes();
  if(typeof renderVendasLista==='function')renderVendasLista();
  if(typeof renderVendasPainel==='function')renderVendasPainel();
  // Reabrir painel atualizado
  openClientePanel(v.cliente);
  showToast('✓ '+v.cliente+' — marcada como paga');
}

function closeClientePanel(){
  const panel = document.getElementById('cli-panel');
  const overlay = document.getElementById('cli-overlay');
  panel.classList.remove('open');
  overlay.classList.remove('open');
  // Restaurar z-index caso tenha sido elevado pela programação
  panel.style.zIndex = '';
  overlay.style.zIndex = '';
  if (window._progOnClienteSalvo) window._progOnClienteSalvo = null;
}




function abrirTodosClientes(){
  renderTodosClientes();
  document.getElementById('modal-todos-clientes').classList.add('open');
}

function renderTodosClientes(){
  const db=loadVendas();
  const ano=window._vendaAnoAtivo||'todos';
  const mes=window._vendaMesAtivo||'todos';
  const busca=(document.getElementById('todos-clientes-busca')?.value||'').trim().toLowerCase();
  const sel=filtrarVendas(db,ano,mes);

  // agregar por cliente
  const pc={};
  sel.forEach(v=>{
    if(!pc[v.cliente])pc[v.cliente]={c:0,r:0,f:0,ult:null};
    pc[v.cliente].c+=v.qtde||0;
    pc[v.cliente].r+=v.total||0;
    pc[v.cliente].f+=v.frete||0;
    if(!pc[v.cliente].ult||v.data>pc[v.cliente].ult)pc[v.cliente].ult=v.data;
  });

  let rank=Object.entries(pc).sort((a,b)=>b[1].c-a[1].c);
  if(busca) rank=rank.filter(([n])=>n.toLowerCase().includes(busca));

  const maxC=rank[0]?.[1].c||1;
  const _totalCocos=rank.reduce((s,[,d])=>s+d.c,0);
  const _totalReceita=rank.reduce((s,[,d])=>s+d.r,0);
  const _totalFrete=rank.reduce((s,[,d])=>s+d.f,0);
  const _precoMedio=_totalCocos>0?((_totalReceita-_totalFrete)/_totalCocos).toFixed(2):null;
  const _periodoLabel=(ano==='todos'?'todos os anos':ano)+(mes==='todos'?'':' · '+['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][parseInt(mes)]);
  const sub=document.getElementById('todos-clientes-sub');
  if(sub) sub.innerHTML=
    '<span>'+rank.length+' clientes · '+_periodoLabel+'</span>'
   +'<span style="margin-left:16px;font-family:var(--font-mono);font-weight:700;color:var(--forest)">'+fmtNum(_totalCocos)+' cocos</span>'
   +(_precoMedio?'<span style="margin-left:12px;font-family:var(--font-mono);font-weight:700;color:#db2777">R$ '+_precoMedio+'/coco</span>':'');

  const lista=document.getElementById('todos-clientes-lista');
  if(!lista)return;
  lista.innerHTML='';
  rank.forEach(([n,d],i)=>{
    const precoCli=d.c>0?((d.r-d.f)/d.c).toFixed(2):null;
    const w=Math.round(d.c/maxC*180);
    const div=document.createElement('div');
    div.className='vrank-row';
    div.style.cssText='cursor:pointer;margin-bottom:6px';
    div.title='Ver histórico de '+n;
    const totalM=rank.reduce((s,[,x])=>s+x.c,0)||1;
    const pctM=Math.round(d.c/totalM*100);
    div.innerHTML=
      '<span class="vrank-pos" style="min-width:28px">'+(i+1)+'</span>'
     +'<span class="vrank-nome" style="flex:1;font-size:12px">'+n+'</span>'
     +'<div class="vrank-bar" style="width:'+w+'px;margin:0 8px"></div>'
     +'<span class="vrank-val" style="min-width:80px;font-size:12px">'+fmtNum(d.c)+'</span>'
     +'<span style="font-size:11px;font-family:var(--font-mono);color:var(--muted);min-width:32px;text-align:right">'+pctM+'%</span>'
     +'<span style="font-size:11px;font-family:var(--font-mono);color:var(--muted);min-width:60px;text-align:right">R$ '+(precoCli||'—')+'</span>';
    div.dataset.cli=n;
    div.addEventListener('click',function(){
      closeModal('modal-todos-clientes');
      openClientePanel(this.dataset.cli);
    });
    lista.appendChild(div);
  });

  if(!rank.length){
    lista.innerHTML='<div style="text-align:center;padding:32px;color:var(--muted)">Nenhum cliente encontrado</div>';
  }
}
