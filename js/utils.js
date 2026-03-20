// ─────────── UTILS ───────────
/** Extrai primeiro número de um id de eito (ex: "05/06" → 5, "131" → 131) */
function eitoNum(id) { return parseInt(id.replace(/\D.*/, '')) || 0; }
/** Ordena array de eitos numericamente pelo id */
function sortEitosNum(eitos) { return eitos.sort((a, b) => eitoNum(a.id) - eitoNum(b.id)); }

function today() { return new Date().toISOString().split('T')[0]; }

function diasDesde(data) {
  if (!data) return null;
  const d = new Date(data + 'T00:00:00');
  const h = new Date(); h.setHours(0,0,0,0);
  return Math.floor((h - d) / 86400000);
}

function statusDias(dias) {
  if (dias === null || dias === undefined) return 'sem';
  if (dias >= 21) return 'vermelho';
  if (dias >= 15) return 'amarelo';
  return 'verde';
}

function statusLabel(s) { return {verde:'VERDE',amarelo:'AMARELO',vermelho:'VERMELHO',sem:'SEM COLHEITA'}[s]; }

function fmtData(d) {
  if (!d) return '—';
  const p = d.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}

function fmtNum(n) { return n?.toLocaleString('pt-BR') ?? '0'; }

function addDias(dataStr, n) {
  const d = new Date(dataStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function getUltima(eito) { return eito.historico?.length ? eito.historico[eito.historico.length-1] : null; }

function getISOWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  const diff = d - startOfWeek1;
  const week = Math.floor(diff / 604800000) + 1;
  return `${d.getFullYear()}-S${String(week).padStart(2,'0')}`;
}

function fmtR(v) { return v != null && !isNaN(v) ? 'R$ ' + fmtNum(Math.round(v)) : '—'; }

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Mercados uses fmtN for large numbers
function fmtN(n) { return n >= 1000000 ? (n/1000000).toFixed(1).replace('.',',') + ' M' : n.toLocaleString('pt-BR'); }
