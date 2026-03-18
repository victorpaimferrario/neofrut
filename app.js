
// ─────────── DADOS INICIAIS ───────────
const DADOS_INICIAIS = {"AREA A1": [{"id": "01/02", "plantas": 14, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "03/04", "plantas": 35, "ultimaColheita": {"data": "2026-03-09", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "05/06", "plantas": 56, "ultimaColheita": {"data": "2026-03-09", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "07/08", "plantas": 61, "ultimaColheita": {"data": "2026-03-09", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "09/10", "plantas": 55, "ultimaColheita": {"data": "2026-03-09", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "11/12", "plantas": 63, "ultimaColheita": {"data": "2026-03-09", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "13/14", "plantas": 66, "ultimaColheita": {"data": "2026-03-09", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "15/16", "plantas": 63, "ultimaColheita": {"data": "2026-03-09", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "17/18", "plantas": 68, "ultimaColheita": {"data": "2026-03-09", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "19/20", "plantas": 68, "ultimaColheita": {"data": "2026-03-09", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "21/22", "plantas": 68, "ultimaColheita": {"data": "2026-03-09", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "23/24", "plantas": 65, "ultimaColheita": {"data": "2026-03-09", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "25/26", "plantas": 68, "ultimaColheita": {"data": "2026-03-09", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "27/28", "plantas": 83, "ultimaColheita": {"data": "2026-03-09", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "29/30", "plantas": 93, "ultimaColheita": {"data": "2026-03-09", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "31/32", "plantas": 89, "ultimaColheita": {"data": "2026-03-09", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "33/34", "plantas": 82, "ultimaColheita": {"data": "2026-03-09", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "35/36", "plantas": 83, "ultimaColheita": {"data": "2026-03-09", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "37/38", "plantas": 86, "ultimaColheita": {"data": "2026-03-09", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "39/40", "plantas": 96, "ultimaColheita": {"data": "2026-03-09", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "41/42", "plantas": 92, "ultimaColheita": {"data": "2026-03-09", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "43/44", "plantas": 91, "ultimaColheita": {"data": "2026-03-09", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "45/46", "plantas": 104, "ultimaColheita": {"data": "2026-03-09", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "47/48", "plantas": 104, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "49/50", "plantas": 105, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "51/52", "plantas": 104, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "53/54", "plantas": 99, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "55/56", "plantas": 92, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "57/58", "plantas": 88, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "59/60", "plantas": 98, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "61/62", "plantas": 100, "ultimaColheita": {"data": "2026-03-10", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "63/64", "plantas": 101, "ultimaColheita": {"data": "2026-03-10", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "65/66", "plantas": 97, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "67/68", "plantas": 103, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "69/70", "plantas": 107, "ultimaColheita": {"data": "2026-03-10", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "71/72", "plantas": 105, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "73/74", "plantas": 106, "ultimaColheita": {"data": "2026-03-10", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "75/76", "plantas": 102, "ultimaColheita": {"data": "2026-03-10", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "77/78", "plantas": 105, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "79/80", "plantas": 104, "ultimaColheita": {"data": "2026-03-10", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "81/82", "plantas": 103, "ultimaColheita": {"data": "2026-03-10", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "83/84", "plantas": 104, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "85/86", "plantas": 102, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "87/88", "plantas": 107, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "89/90", "plantas": 104, "ultimaColheita": {"data": "2026-02-24", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "91/92", "plantas": 106, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "93/94", "plantas": 103, "ultimaColheita": {"data": "2026-02-24", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "95/96", "plantas": 104, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "97/98", "plantas": 99, "ultimaColheita": {"data": "2026-02-24", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "99/100", "plantas": 85, "ultimaColheita": {"data": "2026-02-24", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "101/102", "plantas": 86, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "103/104", "plantas": 78, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "105/106", "plantas": 82, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "107/108", "plantas": 80, "ultimaColheita": {"data": "2026-02-24", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "109/110", "plantas": 93, "ultimaColheita": {"data": "2026-02-24", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "111/112", "plantas": 74, "ultimaColheita": {"data": "2026-02-24", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "113/114", "plantas": 71, "ultimaColheita": {"data": "2026-02-24", "total": 400, "mesa": 400, "fabrica": 0}}], "AREA A2": [{"id": "01/02", "plantas": 83, "ultimaColheita": {"data": "2026-02-24", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "03/04", "plantas": 84, "ultimaColheita": {"data": "2026-02-24", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "05/06", "plantas": 93, "ultimaColheita": {"data": "2026-02-24", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "07/08", "plantas": 83, "ultimaColheita": {"data": "2026-02-24", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "09/10", "plantas": 89, "ultimaColheita": {"data": "2026-02-24", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "11/12", "plantas": 89, "ultimaColheita": {"data": "2026-02-25", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "13/14", "plantas": 89, "ultimaColheita": {"data": "2026-02-25", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "15/16", "plantas": 80, "ultimaColheita": {"data": "2026-02-25", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "17/18", "plantas": 91, "ultimaColheita": {"data": "2026-02-25", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "19/20", "plantas": 104, "ultimaColheita": {"data": "2026-02-27", "total": 1100, "mesa": 1100, "fabrica": 0}}, {"id": "21/22", "plantas": 88, "ultimaColheita": {"data": "2026-02-27", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "23/24", "plantas": 70, "ultimaColheita": {"data": "2026-02-27", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "25/26", "plantas": 48, "ultimaColheita": {"data": "2026-02-27", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "27/28", "plantas": 59, "ultimaColheita": {"data": "2026-02-27", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "29/30", "plantas": 78, "ultimaColheita": {"data": "2026-02-27", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "31/32", "plantas": 72, "ultimaColheita": {"data": "2026-02-27", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "33/34", "plantas": 69, "ultimaColheita": {"data": "2026-02-27", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "35/36", "plantas": 73, "ultimaColheita": {"data": "2026-02-27", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "37/38", "plantas": 71, "ultimaColheita": {"data": "2026-03-02", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "39/40", "plantas": 80, "ultimaColheita": {"data": "2026-03-02", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "41/42", "plantas": 79, "ultimaColheita": {"data": "2026-03-02", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "43/44", "plantas": 82, "ultimaColheita": {"data": "2026-03-02", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "45/46", "plantas": 59, "ultimaColheita": {"data": "2026-03-02", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "47/48", "plantas": 60, "ultimaColheita": {"data": "2026-03-02", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "49/50", "plantas": 52, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "51/52", "plantas": 46, "ultimaColheita": {"data": "2026-03-02", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "53/54", "plantas": 54, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "55/56", "plantas": 53, "ultimaColheita": {"data": "2026-03-02", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "57/58", "plantas": 46, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "59/60", "plantas": 48, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "61/62", "plantas": 40, "ultimaColheita": {"data": "2026-03-02", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "63/64", "plantas": 59, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "65/66", "plantas": 53, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "67/68", "plantas": 45, "ultimaColheita": {"data": "2026-03-02", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "69/70", "plantas": 51, "ultimaColheita": {"data": "2026-03-02", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "71/72", "plantas": 48, "ultimaColheita": {"data": "2026-03-02", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "73/74", "plantas": 41, "ultimaColheita": {"data": "2026-03-11", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "75/76", "plantas": 35, "ultimaColheita": {"data": "2026-03-11", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "77/78", "plantas": 39, "ultimaColheita": {"data": "2026-03-11", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "79/80", "plantas": 34, "ultimaColheita": {"data": "2026-03-11", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "81/82", "plantas": 25, "ultimaColheita": {"data": "2026-03-11", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "83/84", "plantas": 28, "ultimaColheita": {"data": "2026-03-11", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "85/86", "plantas": 26, "ultimaColheita": {"data": "2026-03-11", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "87/88", "plantas": 16, "ultimaColheita": {"data": "2026-03-11", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "89/90", "plantas": 8, "ultimaColheita": {"data": "2026-03-11", "total": 100, "mesa": 100, "fabrica": 0}}], "AREA C": [{"id": "01/02", "plantas": 6, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "03/04", "plantas": 6, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "05/06", "plantas": 8, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "07/08", "plantas": 9, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "09/10", "plantas": 10, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "11/12", "plantas": 11, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "13/14", "plantas": 12, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "15/16", "plantas": 14, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "17/18", "plantas": 15, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "19/20", "plantas": 14, "ultimaColheita": {"data": "2026-03-09", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "21/22", "plantas": 16, "ultimaColheita": {"data": "2026-03-09", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "23/24", "plantas": 17, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "25/26", "plantas": 18, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "27/28", "plantas": 20, "ultimaColheita": {"data": "2026-03-09", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "29/30", "plantas": 16, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "31/32", "plantas": 15, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "33/34", "plantas": 17, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "35/36", "plantas": 21, "ultimaColheita": {"data": "2026-03-09", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "37/38", "plantas": 25, "ultimaColheita": {"data": "2026-02-24", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "39/40", "plantas": 26, "ultimaColheita": {"data": "2026-02-24", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "41/42", "plantas": 24, "ultimaColheita": {"data": "2026-02-24", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "43/44", "plantas": 27, "ultimaColheita": {"data": "2026-02-25", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "45/46", "plantas": 25, "ultimaColheita": {"data": "2026-02-25", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "47/48", "plantas": 25, "ultimaColheita": {"data": "2026-02-25", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "49/50", "plantas": 21, "ultimaColheita": {"data": "2026-02-25", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "51/52", "plantas": 28, "ultimaColheita": {"data": "2026-02-25", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "53/54", "plantas": 27, "ultimaColheita": {"data": "2026-02-25", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "55/56", "plantas": 32, "ultimaColheita": {"data": "2026-02-25", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "57/58", "plantas": 36, "ultimaColheita": {"data": "2026-03-02", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "59/60", "plantas": 38, "ultimaColheita": {"data": "2026-03-02", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "61/62", "plantas": 34, "ultimaColheita": {"data": "2026-03-02", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "63/64", "plantas": 34, "ultimaColheita": {"data": "2026-03-03", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "65/66", "plantas": 34, "ultimaColheita": {"data": "2026-03-03", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "67/68", "plantas": 34, "ultimaColheita": {"data": "2026-03-03", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "69/70", "plantas": 36, "ultimaColheita": {"data": "2026-03-03", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "71/72", "plantas": 28, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "73/74", "plantas": 36, "ultimaColheita": {"data": "2026-03-03", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "75/76", "plantas": 42, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "77/78", "plantas": 37, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "79/80", "plantas": 41, "ultimaColheita": {"data": "2026-03-03", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "81/82", "plantas": 39, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "83/84", "plantas": 41, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "85/86", "plantas": 38, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "87/88", "plantas": 38, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "89/90", "plantas": 45, "ultimaColheita": {"data": "2026-03-03", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "91/92", "plantas": 47, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "93/94", "plantas": 46, "ultimaColheita": {"data": "2026-03-03", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "95/96", "plantas": 52, "ultimaColheita": {"data": "2026-03-03", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "97/98", "plantas": 53, "ultimaColheita": {"data": "2026-03-03", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "99/100", "plantas": 44, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "101/102", "plantas": 49, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "103/104", "plantas": 41, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "105/106", "plantas": 39, "ultimaColheita": {"data": "2026-03-04", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "107/108", "plantas": 39, "ultimaColheita": {"data": "2026-03-04", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "109/110", "plantas": 27, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "111/112", "plantas": 28, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "113/114", "plantas": 22, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "115/116", "plantas": 14, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "117/118", "plantas": 15, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "119/120", "plantas": 12, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "121/122", "plantas": 15, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "123/124", "plantas": 9, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "125/126", "plantas": 8, "ultimaColheita": {"data": "2026-03-04", "total": 60, "mesa": 60, "fabrica": 0}}, {"id": "127/128", "plantas": 4, "ultimaColheita": {"data": "2026-03-04", "total": 20, "mesa": 20, "fabrica": 0}}, {"id": "129/130", "plantas": 4, "ultimaColheita": {"data": "2026-03-04", "total": 20, "mesa": 20, "fabrica": 0}}, {"id": "131", "plantas": 1}], "AREA D": [{"id": "01/02", "plantas": 6, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "03/04", "plantas": 9, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "05/06", "plantas": 11, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "07/08", "plantas": 11, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "09/10", "plantas": 17, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "11/12", "plantas": 19, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "13/14", "plantas": 20, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "15/16", "plantas": 21, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "17/18", "plantas": 25, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "19/20", "plantas": 27, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "21/22", "plantas": 30, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "23/24", "plantas": 31, "ultimaColheita": {"data": "2026-03-09", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "25/26", "plantas": 34, "ultimaColheita": {"data": "2026-03-09", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "27/28", "plantas": 35, "ultimaColheita": {"data": "2026-03-09", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "29/30", "plantas": 41, "ultimaColheita": {"data": "2026-03-09", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "31/32", "plantas": 42, "ultimaColheita": {"data": "2026-03-09", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "33/34", "plantas": 45, "ultimaColheita": {"data": "2026-03-09", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "35/36", "plantas": 47, "ultimaColheita": {"data": "2026-03-09", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "37/38", "plantas": 44, "ultimaColheita": {"data": "2026-03-09", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "39/40", "plantas": 47, "ultimaColheita": {"data": "2026-02-24", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "41/42", "plantas": 46, "ultimaColheita": {"data": "2026-02-24", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "43/44", "plantas": 51, "ultimaColheita": {"data": "2026-02-24", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "45/46", "plantas": 57, "ultimaColheita": {"data": "2026-02-24", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "47/48", "plantas": 60, "ultimaColheita": {"data": "2026-02-25", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "49/50", "plantas": 65, "ultimaColheita": {"data": "2026-02-25", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "51/52", "plantas": 67, "ultimaColheita": {"data": "2026-02-25", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "53/54", "plantas": 67, "ultimaColheita": {"data": "2026-02-25", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "55/56", "plantas": 69, "ultimaColheita": {"data": "2026-02-25", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "57/58", "plantas": 71, "ultimaColheita": {"data": "2026-02-25", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "59/60", "plantas": 76, "ultimaColheita": {"data": "2026-03-02", "total": 1300, "mesa": 600, "fabrica": 700}}, {"id": "61/62", "plantas": 72, "ultimaColheita": {"data": "2026-03-02", "total": 1200, "mesa": 500, "fabrica": 700}}, {"id": "63/64", "plantas": 74, "ultimaColheita": {"data": "2026-03-02", "total": 1200, "mesa": 500, "fabrica": 700}}, {"id": "65/66", "plantas": 79, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "67/68", "plantas": 68, "ultimaColheita": {"data": "2026-03-03", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "69/70", "plantas": 77, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "71/72", "plantas": 69, "ultimaColheita": {"data": "2026-03-03", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "73/74", "plantas": 68, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "75/76", "plantas": 81, "ultimaColheita": {"data": "2026-03-03", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "77/78", "plantas": 71, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "79/80", "plantas": 69, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "81/82", "plantas": 75, "ultimaColheita": {"data": "2026-03-03", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "83/84", "plantas": 76, "ultimaColheita": {"data": "2026-03-03", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "85/86", "plantas": 84, "ultimaColheita": {"data": "2026-03-03", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "87/88", "plantas": 83, "ultimaColheita": {"data": "2026-03-03", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "89/90", "plantas": 77, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "91/92", "plantas": 77, "ultimaColheita": {"data": "2026-03-03", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "93/94", "plantas": 77, "ultimaColheita": {"data": "2026-03-03", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "95/96", "plantas": 66, "ultimaColheita": {"data": "2026-03-03", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "97/98", "plantas": 73, "ultimaColheita": {"data": "2026-03-03", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "99/100", "plantas": 76, "ultimaColheita": {"data": "2026-03-03", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "101/102", "plantas": 78, "ultimaColheita": {"data": "2026-03-04", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "103/104", "plantas": 80, "ultimaColheita": {"data": "2026-03-04", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "105/106", "plantas": 66, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "107/108", "plantas": 71, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "109/110", "plantas": 71, "ultimaColheita": {"data": "2026-03-04", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "110/112", "plantas": 68, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "113/114", "plantas": 63, "ultimaColheita": {"data": "2026-03-04", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "115/116", "plantas": 71, "ultimaColheita": {"data": "2026-03-04", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "117/118", "plantas": 66, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "119/120", "plantas": 57, "ultimaColheita": {"data": "2026-03-04", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "121/122", "plantas": 54, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "123/124", "plantas": 50, "ultimaColheita": {"data": "2026-03-04", "total": 500, "mesa": 500, "fabrica": 0}}, {"id": "125/126", "plantas": 54, "ultimaColheita": {"data": "2026-03-04", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "127/128", "plantas": 43, "ultimaColheita": {"data": "2026-03-04", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "129/130", "plantas": 39, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "131/132", "plantas": 32, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "133/134", "plantas": 28, "ultimaColheita": {"data": "2026-03-04", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "135/136", "plantas": 21, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "137/138", "plantas": 16, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "139/140", "plantas": 13, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "141/142", "plantas": 19, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "143/144", "plantas": 18, "ultimaColheita": {"data": "2026-03-04", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "145/146", "plantas": 15, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "147/148", "plantas": 10, "ultimaColheita": {"data": "2026-03-04", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "149/150", "plantas": 6}], "MAMÃO DE CIMA": [{"id": "01/02", "plantas": 78, "ultimaColheita": {"data": "2026-02-13", "total": 1300, "mesa": 1300, "fabrica": 0}}, {"id": "03/04", "plantas": 77, "ultimaColheita": {"data": "2026-02-13", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "05/06", "plantas": 82, "ultimaColheita": {"data": "2026-02-14", "total": 1500, "mesa": 1500, "fabrica": 0}}, {"id": "07/08", "plantas": 83, "ultimaColheita": {"data": "2026-02-14", "total": 1400, "mesa": 1400, "fabrica": 0}}, {"id": "09/10", "plantas": 86, "ultimaColheita": {"data": "2026-02-14", "total": 1300, "mesa": 1300, "fabrica": 0}}, {"id": "11/12", "plantas": 86, "ultimaColheita": {"data": "2026-02-14", "total": 1200, "mesa": 1200, "fabrica": 0}}, {"id": "13/14", "plantas": 88, "ultimaColheita": {"data": "2026-02-18", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "15/16", "plantas": 88, "ultimaColheita": {"data": "2026-02-18", "total": 1100, "mesa": 1100, "fabrica": 0}}, {"id": "17/18", "plantas": 89, "ultimaColheita": {"data": "2026-02-18", "total": 1100, "mesa": 1100, "fabrica": 0}}, {"id": "19/20", "plantas": 87, "ultimaColheita": {"data": "2026-02-18", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "21/22", "plantas": 84, "ultimaColheita": {"data": "2026-02-18", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "23/24", "plantas": 83, "ultimaColheita": {"data": "2026-02-18", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "25/26", "plantas": 68, "ultimaColheita": {"data": "2026-02-18", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "27/28", "plantas": 71, "ultimaColheita": {"data": "2026-02-18", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "29/30", "plantas": 66, "ultimaColheita": {"data": "2026-02-18", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "31/32", "plantas": 63, "ultimaColheita": {"data": "2026-02-18", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "33/34", "plantas": 69, "ultimaColheita": {"data": "2026-02-18", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "35/36", "plantas": 69, "ultimaColheita": {"data": "2026-02-18", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "37", "plantas": 25, "ultimaColheita": {"data": "2026-02-20", "total": 200, "mesa": 200, "fabrica": 0}}], "MAMÃO DE BAIXO": [{"id": "01/02", "plantas": 89, "ultimaColheita": {"data": "2026-02-20", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "03/04", "plantas": 92, "ultimaColheita": {"data": "2026-02-20", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "05/06", "plantas": 94, "ultimaColheita": {"data": "2026-02-20", "total": 1100, "mesa": 1100, "fabrica": 0}}, {"id": "07/08", "plantas": 91, "ultimaColheita": {"data": "2026-02-20", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "09/10", "plantas": 99, "ultimaColheita": {"data": "2026-02-20", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "11/12", "plantas": 98, "ultimaColheita": {"data": "2026-02-20", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "13/14", "plantas": 94, "ultimaColheita": {"data": "2026-02-20", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "15/16", "plantas": 80, "ultimaColheita": {"data": "2026-02-20", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "17/18", "plantas": 84, "ultimaColheita": {"data": "2026-02-20", "total": 750, "mesa": 750, "fabrica": 0}}, {"id": "19/20", "plantas": 86, "ultimaColheita": {"data": "2026-02-20", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "21/22", "plantas": 86, "ultimaColheita": {"data": "2026-02-20", "total": 1100, "mesa": 1100, "fabrica": 0}}, {"id": "23/24", "plantas": 93, "ultimaColheita": {"data": "2026-02-20", "total": 1100, "mesa": 1100, "fabrica": 0}}, {"id": "25/26", "plantas": 94, "ultimaColheita": {"data": "2026-02-24", "total": 1300, "mesa": 1300, "fabrica": 0}}, {"id": "27/28", "plantas": 108, "ultimaColheita": {"data": "2026-02-24", "total": 1400, "mesa": 1400, "fabrica": 0}}, {"id": "29/30", "plantas": 98, "ultimaColheita": {"data": "2026-02-24", "total": 1300, "mesa": 1300, "fabrica": 0}}], "MARACUJÁ": [{"id": "01/02", "plantas": 55, "ultimaColheita": {"data": "2026-03-11", "total": 800, "mesa": 800, "fabrica": 0}}, {"id": "03/04", "plantas": 89, "ultimaColheita": {"data": "2026-03-11", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "05/06", "plantas": 82, "ultimaColheita": {"data": "2026-03-11", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "07/08", "plantas": 78, "ultimaColheita": {"data": "2026-03-11", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "09/10", "plantas": 78, "ultimaColheita": {"data": "2026-03-11", "total": 1300, "mesa": 1300, "fabrica": 0}}, {"id": "11/12", "plantas": 86, "ultimaColheita": {"data": "2026-03-11", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "13/14", "plantas": 72, "ultimaColheita": {"data": "2026-03-11", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "15/16", "plantas": 88, "ultimaColheita": {"data": "2026-02-12", "total": 1200, "mesa": 1200, "fabrica": 0}}, {"id": "17/18", "plantas": 85, "ultimaColheita": {"data": "2026-02-12", "total": 1200, "mesa": 1200, "fabrica": 0}}, {"id": "19/20", "plantas": 81, "ultimaColheita": {"data": "2026-02-13", "total": 700, "mesa": 700, "fabrica": 0}}, {"id": "21/22", "plantas": 100, "ultimaColheita": {"data": "2026-02-13", "total": 1200, "mesa": 1200, "fabrica": 0}}, {"id": "23/24", "plantas": 47, "ultimaColheita": {"data": "2026-02-13", "total": 1200, "mesa": 1200, "fabrica": 0}}, {"id": "25/26", "plantas": 56, "ultimaColheita": {"data": "2026-02-13", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "27/28", "plantas": 50, "ultimaColheita": {"data": "2026-02-13", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "29/30", "plantas": 45, "ultimaColheita": {"data": "2026-02-13", "total": 1300, "mesa": 1300, "fabrica": 0}}, {"id": "31/32", "plantas": 42, "ultimaColheita": {"data": "2026-02-13", "total": 900, "mesa": 900, "fabrica": 0}}, {"id": "33/34", "plantas": 34, "ultimaColheita": {"data": "2026-02-13", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "35/36", "plantas": 34, "ultimaColheita": {"data": "2026-02-13", "total": 1000, "mesa": 1000, "fabrica": 0}}, {"id": "37/38", "plantas": 31, "ultimaColheita": {"data": "2026-02-13", "total": 1300, "mesa": 1300, "fabrica": 0}}, {"id": "39/40", "plantas": 34, "ultimaColheita": {"data": "2026-02-13", "total": 600, "mesa": 600, "fabrica": 0}}, {"id": "41/42", "plantas": 27, "ultimaColheita": {"data": "2026-02-13", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "43/44", "plantas": 26, "ultimaColheita": {"data": "2026-02-13", "total": 400, "mesa": 400, "fabrica": 0}}, {"id": "45/46", "plantas": 23, "ultimaColheita": {"data": "2026-02-13", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "47/48", "plantas": 21, "ultimaColheita": {"data": "2026-02-13", "total": 300, "mesa": 300, "fabrica": 0}}, {"id": "49/50", "plantas": 18, "ultimaColheita": {"data": "2026-02-13", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "51/52", "plantas": 16, "ultimaColheita": {"data": "2026-02-13", "total": 200, "mesa": 200, "fabrica": 0}}, {"id": "53/54", "plantas": 13, "ultimaColheita": {"data": "2026-02-13", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "55/56", "plantas": 9, "ultimaColheita": {"data": "2026-02-13", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "57/58", "plantas": 6, "ultimaColheita": {"data": "2026-02-13", "total": 100, "mesa": 100, "fabrica": 0}}, {"id": "59/60", "plantas": 3}]};

// Normalizar nome da area MARACUJÁ (migração de MARACA → MARACUJÁ no localStorage)

// ─────────── STORAGE ───────────
const SK = 'fazenda_paim_v1';
async function loadDataSupabase() {
  try {
    // Buscar eitos e colheitas do Supabase
    const [{ data: eitos, error: e1 }, { data: colheitas, error: e2 }] = await Promise.all([
      _SB.from('eitos').select('*'),
      _SB.from('colheitas').select('*').order('data', {ascending: true})
    ]);
    if(e1) throw e1;
    if(e2) throw e2;

    // Se Supabase retornou vazio, não sobrescrever dados locais
    if(!eitos || eitos.length === 0) {
      console.warn('Supabase retornou sem eitos — usando dados locais');
      return loadDataLocal();
    }

    // Montar estrutura DB = { area: [ { id, plantas, historico: [...] } ] }
    const db = {};
    for(const e of eitos) {
      if(!db[e.area]) db[e.area] = [];
      db[e.area].push({ id: e.eito_id, plantas: e.plantas, historico: [] });
    }
    for(const c of (colheitas||[])) {
      if(!db[c.area]) continue;
      const eito = db[c.area].find(e => e.id === c.eito_id);
      if(eito) eito.historico.push({
        _id: c.id,
        data: c.data.substring(0,10),
        total: c.total,
        mesa: c.mesa,
        fabrica: c.fabrica
      });
    }
    // migrações de nomenclatura
    if(db['MARACA'] && !db['MARACUJÁ']) { db['MARACUJÁ'] = db['MARACA']; delete db['MARACA']; }
    if(db['MDC']) { db['MAMÃO DE CIMA'] = db['MDC']; delete db['MDC']; }
    if(db['MDB']) { db['MAMÃO DE BAIXO'] = db['MDB']; delete db['MDB']; }
    if(db['AREA B']) delete db['AREA B'];
    // Salvar no localStorage como cache offline
    localStorage.setItem(SK, JSON.stringify(db));
    console.log('Colheitas carregadas do Supabase:', Object.keys(db).length, 'áreas');
    return db;
  } catch(err) {
    console.error('Erro ao carregar colheitas:', err);
    return loadDataLocal();
  }
}

function loadDataLocal() {
  const saved = localStorage.getItem(SK);
  if (saved) {
    const d = JSON.parse(saved);
    if (d['MARACA'] && !d['MARACUJÁ']) { d['MARACUJÁ'] = d['MARACA']; delete d['MARACA']; }
    if (d['MDC']) { d['MAMÃO DE CIMA'] = d['MDC']; delete d['MDC']; }
    if (d['MDB']) { d['MAMÃO DE BAIXO'] = d['MDB']; delete d['MDB']; }
    if (d['AREA B']) delete d['AREA B'];
    localStorage.setItem(SK, JSON.stringify(d));
    return d;
  }
  // seed historico from initial
  const d = {};
  for (const [area, eitos] of Object.entries(DADOS_INICIAIS)) {
    d[area] = eitos.map(e => ({
      id: e.id,
      plantas: e.plantas,
      historico: e.ultimaColheita ? [e.ultimaColheita] : []
    }));
  }
  return d;
}

function loadData() { return loadDataLocal(); }

async function saveData() {
  localStorage.setItem(SK, JSON.stringify(DB));
  // sincronizar eitos com Supabase
  try {
    const eitosRows = [];
    for(const [area, eitos] of Object.entries(DB)) {
      for(const e of eitos) {
        eitosRows.push({ area, eito_id: e.id, plantas: e.plantas });
      }
    }
    if(eitosRows.length > 0) {
      await _SB.from('eitos').upsert(eitosRows, { onConflict: 'area,eito_id' });
    }
  } catch(err) { console.error('Erro ao salvar eitos:', err); }
}

async function salvarColheitaSupabase(area, eitoId, colheita) {
  try {
    // upsert eito
    await _SB.from('eitos').upsert(
      { area, eito_id: eitoId, plantas: DB[area]?.find(e=>e.id===eitoId)?.plantas || 0 },
      { onConflict: 'area,eito_id' }
    );
    // insert colheita
    await _SB.from('colheitas').insert({
      area, eito_id: eitoId,
      data: colheita.data,
      total: colheita.total,
      mesa: colheita.mesa,
      fabrica: colheita.fabrica
    });
  } catch(err) { console.error('Erro ao salvar colheita:', err); }
}

let DB = loadData();

// Carregar do Supabase (fonte primária) — localStorage é fallback offline
async function loadDBFromSupabase() {
  const newDB = await loadDataSupabase();
  if(newDB && Object.keys(newDB).length > 0) {
    DB = newDB;
    localStorage.setItem(SK, JSON.stringify(DB));
  } else {
    console.warn('Supabase indisponível — usando cache local');
    DB = loadDataLocal();
  }
}

// ─────────── UTILS ───────────
function today() { return new Date().toISOString().split('T')[0]; }
function diasDesde(data) {
  if (!data) return null;
  const d = new Date(data + 'T00:00:00');
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.floor((now - d) / 86400000);
}
function statusDias(dias) {
  if (dias === null) return 'sem';
  if (dias <= 14) return 'verde';
  if (dias <= 20) return 'amarelo';
  return 'vermelho';
}
function statusLabel(s) { return {verde:'VERDE',amarelo:'AMARELO',vermelho:'VERMELHO',sem:'SEM COLHEITA'}[s]; }
function fmtData(d) {
  if (!d) return '—';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}
function fmtNum(n) { return n?.toLocaleString('pt-BR') ?? '0'; }
function addDias(dataStr, n) {
  const d = new Date(dataStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function getUltima(eito) { return eito.historico?.length ? eito.historico[eito.historico.length-1] : null; }

// ─────────── ESTADO ───────────
let currentArea = null;
let currentFilter = 'todos';
let currentEitoId = null;

// ─────────── DASHBOARD ───────────
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
    <div class="kpi vermelho clicavel" onclick="abrirTodasFiltrado('vermelho')" title="Ver todos os eitos vencidos"><div class="kpi-label">🔴 Vencidos</div><div class="kpi-value">${fmtNum(totalVermelho)}</div><div class="kpi-sub">+21 dias · clique para ver</div></div>
    <div class="kpi amarelo clicavel" onclick="abrirTodasFiltrado('amarelo')" title="Ver todos os eitos em atenção"><div class="kpi-label">🟡 Atenção</div><div class="kpi-value">${fmtNum(totalAmareloDash)}</div><div class="kpi-sub">15–20 dias · clique para ver</div></div>
    <div class="kpi verde clicavel" onclick="abrirTodasFiltrado('verde')" title="Ver todos os eitos em dia"><div class="kpi-label">🟢 Em dia</div><div class="kpi-value">${fmtNum(totalVerdes)}</div><div class="kpi-sub">1–14 dias · clique para ver</div></div>
    <div class="kpi"><div class="kpi-label">Última Colheita</div><div class="kpi-value" style="color:var(--accent2);font-size:16px">${ultimaStr}</div><div class="kpi-sub">${fmtNum(totalCocos)} cocos</div></div>
    <div class="kpi"><div class="kpi-label">Plantas Ativas</div><div class="kpi-value" style="color:var(--forest)">${fmtNum(totalPlantas)}</div><div class="kpi-sub">${totalEitos} eitos</div></div>
    <div class="kpi" style="border-color:${corFpp(parseFloat(fppFazenda))}"><div class="kpi-label">Frutos/Planta/${anoStr}</div><div class="kpi-value" style="color:${corFpp(parseFloat(fppFazenda))}">${fppFazenda}</div><div class="kpi-sub">meta: 300 · fazenda inteira</div></div>
  `;

  const grid = document.getElementById('areas-grid');
  grid.innerHTML = '';
  for (const [area, eitos] of Object.entries(DB)) {
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

  // Calcular janelas de semana de trabalho (seg→sex)
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const dow   = hoje.getDay(); // 0=dom,1=seg...6=sab
  const diasAteSeg = dow === 0 ? 1 : dow === 6 ? 2 : -(dow - 1); // ajuste para seg
  // se hoje é sáb(6) ou dom(0), avançar para próxima seg
  const offsetSeg = (dow === 0) ? 1 : (dow === 6) ? 2 : -(dow - 1);
  const segEsta = new Date(hoje); segEsta.setDate(hoje.getDate() + offsetSeg);
  // se offsetSeg negativo significa que seg já passou nesta semana — ficamos na seg atual
  // revalidar: garantir que segEsta >= hoje para "esta semana"
  if (segEsta < hoje) segEsta.setDate(segEsta.getDate() + 7);
  const sexEsta = new Date(segEsta); sexEsta.setDate(segEsta.getDate() + 4);
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

  // Função auxiliar: média histórica do eito
  function mediaEito(e) {
    const hist = e.historico || [];
    const ult  = getUltima(e);
    return hist.length > 0
      ? Math.round(hist.reduce((s,h) => s+h.total, 0) / hist.length)
      : (ult ? ult.total : 0);
  }

  // Card 1 — Esta semana:
  // vencidos (>=21 dias) + os que vencem até sexta desta semana
  function calcEsta() {
    let totalGeral = 0;
    const porArea  = {};
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0;
      for (const e of eitos) {
        const ult = getUltima(e);
        if (!ult) continue;
        const diasDesdeUlt = diasDesde(ult.data);
        const dataProxima  = new Date(ult.data + 'T00:00:00');
        dataProxima.setDate(dataProxima.getDate() + 21);
        // inclui: já vencidos OU vence até sexta desta semana
        if (diasDesdeUlt >= 21 || dataProxima <= sexEsta) {
          const m = mediaEito(e);
          totalArea  += m;
          totalGeral += m;
        }
      }
      if (totalArea > 0) porArea[area] = totalArea;
    }
    return { total: totalGeral, porArea };
  }

  // Card 2 — Próxima semana:
  // eitos cujo ciclo vence entre seg e sex da próxima semana
  function calcProxima() {
    // vencidos não colhidos (acumulados desta semana) + os que vencem na próxima semana
    let totalGeral = 0;
    const porArea  = {};
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0;
      for (const e of eitos) {
        const ult = getUltima(e);
        if (!ult) continue;
        const diasDesdeUlt = diasDesde(ult.data);
        const dataProxima  = new Date(ult.data + 'T00:00:00');
        dataProxima.setDate(dataProxima.getDate() + 21);
        // acumulados: vencidos que NÃO entraram nesta semana por já estarem no calcEsta
        // mas ainda não foram colhidos — diasDesdeUlt >= 21 E data do próximo ciclo < segProx
        const acumulado  = diasDesdeUlt >= 21 && dataProxima < segProx;
        // novos: vencem exatamente na próxima semana
        const novoProx   = dataProxima >= segProx && dataProxima <= sexProx;
        if (acumulado || novoProx) {
          const m = mediaEito(e);
          totalArea  += m;
          totalGeral += m;
        }
      }
      if (totalArea > 0) porArea[area] = totalArea;
    }
    return { total: totalGeral, porArea };
  }

  // Card 3 — Próximos 21 dias:
  // todos que vencem em até 21 dias a partir de hoje (inclui já vencidos)
  function calc21() {
    let totalGeral = 0;
    const porArea  = {};
    for (const [area, eitos] of Object.entries(DB)) {
      let totalArea = 0;
      for (const e of eitos) {
        const ult = getUltima(e);
        if (!ult) continue;
        const diasDesdeUlt = diasDesde(ult.data);
        if (diasDesdeUlt >= 0) { // tem colheita registrada
          const diasAteProximo = 21 - diasDesdeUlt;
          if (diasAteProximo <= 21) { // vence em até 21 dias (inclui já vencidos)
            const m = mediaEito(e);
            totalArea  += m;
            totalGeral += m;
          }
        }
      }
      if (totalArea > 0) porArea[area] = totalArea;
    }
    return { total: totalGeral, porArea };
  }

  const r1 = calcEsta();
  const r2 = calcProxima();
  const r3 = calc21();

  const buildCard = (r, icon, label, sublabel, destaque) => {
    const breakdown = Object.entries(r.porArea)
      .sort((a,b) => b[1]-a[1])
      .slice(0, 5)
      .map(([area, val]) => `
        <div class="proj-row proj-row-clicavel" onclick="openArea('${area}')" title="Abrir ${area}">
          <span class="proj-row-area">${nomes[area]||area}</span>
          <span class="proj-row-val">${fmtNum(val)}</span>
        </div>`).join('');
    const eitos = Object.values(r.porArea).length;
    const borda = destaque ? 'border:2px solid var(--accent);' : '';
    const btnLancar = destaque && eitos > 0
      ? `<button onclick="showPage('lancamento')" style="width:100%;margin-top:10px;padding:8px;background:var(--forest);color:#fff;border:none;border-radius:7px;font-family:var(--font-main);font-size:12px;font-weight:700;cursor:pointer">⚡ Lançar Colheita</button>`
      : '';
    return `
      <div class="proj-card" style="${borda}">
        <div class="proj-card-label">${icon} ${label}</div>
        <div style="font-size:10px;color:var(--accent2);font-family:var(--font-mono);margin-bottom:6px">${sublabel}</div>
        <div class="proj-card-val">${fmtNum(r.total)}</div>
        <div class="proj-card-sub">${eitos} eito${eitos!==1?'s':''} prontos</div>
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
function getISOWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  const diff = d - startOfWeek1;
  const week = Math.floor(diff / 604800000) + 1;
  return `${d.getFullYear()}-S${String(week).padStart(2,'0')}`;
}

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
    <td class="total-row" colspan="2" style="color:var(--muted);font-size:12px;padding:12px 14px">TOTAL (${rows.length} eitos)</td>
    <td></td><td></td>
    <td class="total-row" style="font-family:var(--font-mono);padding:12px 14px">${fmtNum(totalCocos)}</td>
    <td class="total-row" style="font-family:var(--font-mono);color:var(--muted);padding:12px 14px">${fmtNum(totalPlantas)}</td>
    <td></td><td></td>
  </tr>`;
}

// ─────────── MODAL COLHEITA ───────────
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

// ─────────── MODAL HISTÓRICO ───────────
function openHistorico(eitoId) {
  openSidePanel(currentArea, eitoId);
}

// ─────────── EXPORTAR ───────────
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

// ─────────── PAGES / MODAL ───────────
function showPage(id) {
  localStorage.setItem('neofrut_aba_ativa', id);
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  if (id==='dashboard') {
    document.querySelector('.nav-tab').classList.add('active');
    setTimeout(()=>{
      renderDashboard();
      setTimeout(renderProjecao, 60);
      setTimeout(renderComparativo, 70);
      setTimeout(renderMapa, 80);
    }, 30);
  } else if (id==='analise') {
    document.querySelectorAll('.nav-tab')[1].classList.add('active');
    initAnalise();
  } else if (id==='lancamento') {
    document.querySelectorAll('.nav-tab')[2].classList.add('active');
    initLancamento();
  } else if (id==='vendas') {
    document.querySelectorAll('.nav-tab')[3].classList.add('active');
    setTimeout(()=>initVendas(false), 30);
  } else if (id==='gestao') {
    document.querySelectorAll('.nav-tab')[4].classList.add('active');
    initGestao();
  } else if (id==='mercados') {
    document.querySelectorAll('.nav-tab')[5].classList.add('active');
    if(!window._mercadosIniciado) {
      window._mercadosIniciado = true;
      // Aguardar DOM ficar visível antes de renderizar
      setTimeout(initMercados, 50);
    }
  }
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if(e.target===m) closeModal(m.id); });
});
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
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


// ─────────── RASCUNHO DE LANÇAMENTO ───────────
const SK_RASCUNHO = 'fazenda_paim_rascunho';

function salvarRascunho() {
  const data = document.getElementById('lanc-data')?.value || today();
  const rascunho = { data, area: window._lancAreaAtiva || 'todas', valores: {} };
  document.querySelectorAll('.p-input').forEach(inp => {
    const v = parseInt(inp.value) || 0;
    if (v > 0) {
      const key = `${inp.dataset.area}||${inp.dataset.eito}||${inp.dataset.campo}`;
      rascunho.valores[key] = v;
    }
  });
  if (Object.keys(rascunho.valores).length > 0) {
    localStorage.setItem(SK_RASCUNHO, JSON.stringify(rascunho));
  } else {
    localStorage.removeItem(SK_RASCUNHO);
  }

  // atualizar indicador de rascunho na sticky
  const statusEl = document.getElementById('lanc-rascunho-status');
  if (statusEl) {
    const agora = new Date();
    const hhmm = agora.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});
    statusEl.textContent = `💾 Rascunho salvo às ${hhmm}`;
  }
}

function carregarRascunho() {
  const saved = localStorage.getItem(SK_RASCUNHO);
  if (!saved) return;
  try {
    const r = JSON.parse(saved);
    const dataEl = document.getElementById('lanc-data');
    if (dataEl && r.data) dataEl.value = r.data;
    if (r.area && r.area !== 'todas') {
      window._lancAreaAtiva = r.area;
      renderAreaBtns(r.area);
      renderLancamento();
    }
    let total = 0;
    for (const [key, val] of Object.entries(r.valores)) {
      const [area, eitoId, campo] = key.split('||');
      const el = document.getElementById(`lanc-${area}-${eitoId}-${campo}`);
      if (el) { el.value = val; el.classList.add('filled'); onPInput(area, eitoId); total++; }
    }
    if (total > 0) showToast(`📋 Rascunho restaurado — ${total} campo(s)`);
  } catch(err) {
    localStorage.removeItem(SK_RASCUNHO);
  }
}

function limparRascunho() {
  localStorage.removeItem(SK_RASCUNHO);
}

// ─────────── LANÇAMENTO EM LOTE ───────────
function initLancamento() {
  document.getElementById('lanc-data').value = today();
  renderAreaBtns(window._lancAreaAtiva || 'todas');
  renderLancamento();
  if (localStorage.getItem(SK_RASCUNHO)) setTimeout(carregarRascunho, 120);
}

function renderAreaBtns(areaAtiva) {
  const wrap = document.getElementById('lanc-area-btns');
  if (!wrap) return;
  const areas = Object.keys(DB);
  const nomesCurtos = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  wrap.innerHTML = `<button class="area-btn todas ${areaAtiva==='todas'?'ativo':''}" onclick="selecionarAreaLanc('todas')">Todas</button>` +
    areas.map(a => `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaLanc('${a}')">${nomesCurtos[a]||a}</button>`).join('');
}

function selecionarAreaLanc(area) {
  // guardar área ativa numa variável global
  window._lancAreaAtiva = area;
  renderAreaBtns(area);
  renderLancamento();
}

// lista ordenada globalmente para navegação sequencial por teclado
let _allInputs = [];

function renderLancamento() {
  const filtroArea = window._lancAreaAtiva || 'todas';
  const areas = filtroArea === 'todas' ? Object.keys(DB) : [filtroArea];
  const tbody = document.getElementById('planilha-tbody');
  _allInputs = [];

  let rows = '';
  for (const area of areas) {
    const eitos = DB[area];
    rows += `<tr class="area-sep"><td colspan="8">${area} — ${eitos.length} eitos</td></tr>`;
    for (const e of eitos) {
      const ult = getUltima(e);
      const dias = ult ? diasDesde(ult.data) : null;
      const st = statusDias(dias);
      const stColor = st==='vermelho'?'var(--vermelho)':st==='amarelo'?'var(--amarelo)':st==='verde'?'var(--verde)':'var(--muted)';
      const mesaId = `lanc-${area}-${e.id}-mesa`;
      const fabId  = `lanc-${area}-${e.id}-fabrica`;
      const totalId = `lanc-${area}-${e.id}-total`;
      const pctId   = `lanc-${area}-${e.id}-pct`;
      _allInputs.push({area, eitoId: e.id, campo:'mesa', id: mesaId});
      _allInputs.push({area, eitoId: e.id, campo:'fabrica', id: fabId});
      // calcular ÚLT. e MÉD.3 para referência
      const hist = e.historico || [];
      const ultVal = hist.length > 0 ? hist[hist.length-1].total : null;
      const med3 = hist.length > 0
        ? Math.round(hist.slice(-3).reduce((s,h)=>s+h.total,0) / Math.min(hist.length,3))
        : null;
      const ultFmt = ultVal !== null ? fmtNum(ultVal) : '—';
      const med3Fmt = med3 !== null ? fmtNum(med3) : '—';

      rows += `<tr id="row-${area}-${e.id}">
        <td class="p-eito" style="cursor:pointer;color:var(--forest);text-decoration:underline dotted" onclick="openSidePanel('${area}','${e.id}')" title="Ver histórico do eito">${e.id}</td>
        <td class="p-status"><span class="status-dot sd-${st}" style="margin:0 auto;display:block;width:8px;height:8px"></span></td>
        <td class="p-dias">${dias!==null?dias+'d':'—'}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:center">${e.plantas}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:right;padding-right:8px">${ultFmt}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:right;padding-right:8px">${med3Fmt}</td>
        <td><input class="p-input" type="number" min="0" placeholder="—"
          id="${mesaId}" data-area="${area}" data-eito="${e.id}" data-campo="mesa"
          data-med="${med3 !== null ? med3 : 0}"
          oninput="onPInput('${area}','${e.id}')"
          onkeydown="navPInput(event,'${mesaId}')"></td>
        <td><input class="p-input" type="number" min="0" placeholder="—"
          id="${fabId}" data-area="${area}" data-eito="${e.id}" data-campo="fabrica"
          oninput="onPInput('${area}','${e.id}')"
          onkeydown="navPInput(event,'${fabId}')"></td>
        <td class="p-total" id="${totalId}">—</td>
        <td class="p-pct" id="${pctId}">—</td>
      </tr>`;
    }
  }

  tbody.innerHTML = rows;
  document.getElementById('planilha-tfoot').innerHTML = `
    <tr style="border-top:2px solid var(--border);background:var(--surface2)">
      <td colspan="6" style="padding:10px 14px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">TOTAL</td>
      <td id="tot-mesa" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
      <td id="tot-fab"  style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:6px">—</td>
      <td id="tot-total" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--verde)">—</td>
      <td id="tot-pct" style="font-family:var(--font-mono);font-weight:700;text-align:right;padding-right:14px;color:var(--muted)">—</td>
    </tr>`;
  atualizarContador();
  salvarRascunho();
}

function onPInput(area, eitoId) {
  const mesaEl  = document.getElementById(`lanc-${area}-${eitoId}-mesa`);
  const fabEl   = document.getElementById(`lanc-${area}-${eitoId}-fabrica`);
  const mesa    = parseInt(mesaEl?.value)||0;
  const fabrica = parseInt(fabEl?.value)||0;
  const total   = mesa + fabrica;
  const pct     = total > 0 ? Math.round(mesa/total*100) : null;
  const totalEl = document.getElementById(`lanc-${area}-${eitoId}-total`);
  const pctEl   = document.getElementById(`lanc-${area}-${eitoId}-pct`);
  const row     = document.getElementById(`row-${area}-${eitoId}`);
  if (totalEl) {
    totalEl.textContent = total > 0 ? fmtNum(total) : '—';
    totalEl.className   = 'p-total' + (total>0?' has-val':'');
  }
  if (pctEl) pctEl.textContent = pct !== null ? pct+'%' : '—';
  if (row)   row.classList.toggle('row-filled', total>0);
  // alerta de desvio: total vs média histórica
  const med = parseInt(mesaEl?.dataset.med)||0;
  if (med > 0 && total > 0 && totalEl) {
    const ratio = total / med;
    if (ratio > 1.5) {
      totalEl.style.color = 'var(--amarelo)';
      totalEl.title = `⚠️ ${fmtNum(total)} parece alto vs média ${fmtNum(med)}`;
    } else if (ratio < 0.5) {
      totalEl.style.color = 'var(--vermelho)';
      totalEl.title = `⚠️ ${fmtNum(total)} parece baixo vs média ${fmtNum(med)}`;
    } else {
      totalEl.style.color = '';
      totalEl.title = '';
    }
  }
  // input styling
  mesaEl?.classList.toggle('filled', mesa>0);
  fabEl?.classList.toggle('filled', fabrica>0);
  atualizarContador();
  salvarRascunho();
}

function navPInput(e, currentId) {
  const isEnter = e.key === 'Enter';
  const isTab   = e.key === 'Tab';
  if (!isEnter && !isTab) return;
  e.preventDefault();
  const idx = _allInputs.findIndex(i => i.id === currentId);
  if (idx < 0) return;
  const current = _allInputs[idx];

  let nextIdx;
  if (isEnter) {
    // Enter: mesa→fábrica do mesmo eito; fábrica→fábrica do mesmo eito (fica)
    if (current.campo === 'mesa') {
      // próximo item é fábrica do mesmo eito (idx+1)
      nextIdx = idx + 1;
    } else {
      // já está na fábrica, Enter vai para mesa do próximo eito
      nextIdx = idx + 1; // fábrica atual é idx, próxima mesa é idx+1
    }
  } else {
    // Tab: pula a linha inteira → vai para mesa do próximo eito
    if (current.campo === 'mesa') {
      nextIdx = idx + 2; // pula mesa+fábrica atual, vai para próxima mesa
    } else {
      nextIdx = idx + 1; // já está na fábrica, vai para próxima mesa
    }
  }
  if (nextIdx === undefined || nextIdx >= _allInputs.length) nextIdx = 0;
  const nextEl = document.getElementById(_allInputs[nextIdx].id);
  if (nextEl) { nextEl.focus(); nextEl.select(); }
}


function pularProximoVencido() {
  // encontrar primeiro input de mesa de eito vencido (>=21d) não preenchido
  const inputs = document.querySelectorAll('.p-input[data-campo="mesa"]');
  for (const inp of inputs) {
    if ((parseInt(inp.value)||0) > 0) continue; // já preenchido
    const area   = inp.dataset.area;
    const eitoId = inp.dataset.eito;
    const eito   = DB[area]?.find(e=>e.id===eitoId);
    if (!eito) continue;
    const ult  = getUltima(eito);
    const dias = ult ? diasDesde(ult.data) : null;
    if (dias === null || dias >= 21) {
      inp.scrollIntoView({behavior:'smooth', block:'center'});
      inp.focus();
      inp.select();
      return;
    }
  }
  showToast('Nenhum eito vencido sem lançamento encontrado');
}

function mostrarSoPendentes() {
  const btn = document.getElementById('btn-pendentes');
  const rows = document.querySelectorAll('#planilha-tbody tr:not(.area-sep)');
  const ativo = btn.dataset.ativo === '1';
  rows.forEach(row => {
    if (ativo) { row.style.display = ''; }
    else {
      const dias = row.querySelector('.p-dias')?.textContent;
      const d = parseInt(dias);
      if (!isNaN(d) && d < 21 && dias !== '—') row.style.display = 'none';
      else if (dias === '—') row.style.display = '';
    }
  });
  btn.dataset.ativo = ativo ? '0' : '1';
  btn.style.color = ativo ? '' : 'var(--vermelho)';
  btn.style.borderColor = ativo ? '' : 'var(--vermelho-border)';
}

function onLancInput(el, area, eitoId) {
  const v = parseInt(el.value)||0;
  el.classList.toggle('filled', v > 0);
  atualizarContador();
}

function navInput(e, area, eitoId, campo) {
  if (e.key === 'Tab' || e.key === 'Enter') {
    e.preventDefault();
    if (campo === 'mesa') {
      const fab = document.getElementById(`lanc-${area}-${eitoId}-fabrica`);
      if (fab) { fab.focus(); fab.select(); }
    } else {
      // próximo eito mesa
      const eitos = DB[area];
      const idx = eitos.findIndex(e=>e.id===eitoId);
      if (idx < eitos.length-1) {
        const next = document.getElementById(`lanc-${area}-${eitos[idx+1].id}-mesa`);
        if (next) { next.focus(); next.select(); }
      }
    }
  }
}

function atualizarContador() {
  const vistos = new Set();
  let totMesa=0, totFab=0;
  document.querySelectorAll('.p-input').forEach(inp => {
    const v = parseInt(inp.value)||0;
    if (v > 0) {
      vistos.add(`${inp.dataset.area}||${inp.dataset.eito}`);
      if (inp.dataset.campo==='mesa') totMesa+=v;
      else totFab+=v;
    }
  });
  const count = vistos.size;
  const total = totMesa+totFab;
  document.getElementById('lanc-contador').textContent =
    `${count} eito${count!==1?'s':''} preenchido${count!==1?'s':''}`;
  document.getElementById('lanc-total-preview').textContent = `Total: ${fmtNum(total)}`;
  document.getElementById('lanc-mesa-preview').textContent  = `Mesa: ${fmtNum(totMesa)}`;
  document.getElementById('lanc-fab-preview').textContent   = `Fábrica: ${fmtNum(totFab)}`;
  // atualizar rodapé
  const tMesa = document.getElementById('tot-mesa');
  const tFab  = document.getElementById('tot-fab');
  const tTot  = document.getElementById('tot-total');
  const tPct  = document.getElementById('tot-pct');
  if(tMesa) tMesa.textContent = totMesa>0?fmtNum(totMesa):'—';
  if(tFab)  tFab.textContent  = totFab>0?fmtNum(totFab):'—';
  if(tTot)  tTot.textContent  = total>0?fmtNum(total):'—';
  if(tPct)  tPct.textContent  = total>0?Math.round(totMesa/total*100)+'%':'—';
}

function contarEitosPreenchidos() {
  const vistos = new Set();
  document.querySelectorAll('.p-input').forEach(inp => {
    if ((parseInt(inp.value)||0)>0) vistos.add(`${inp.dataset.area}||${inp.dataset.eito}`);
  });
  return vistos.size;
}

function limparLancamento() {
  limparRascunho();
  document.querySelectorAll('.p-input').forEach(inp => {
    inp.value = '';
    inp.classList.remove('filled');
  });
  document.querySelectorAll('.p-total').forEach(el => { el.textContent='—'; el.className='p-total'; });
  document.querySelectorAll('.p-pct').forEach(el => el.textContent='—');
  document.querySelectorAll('#planilha-tbody tr:not(.area-sep)').forEach(r=>r.classList.remove('row-filled'));
  atualizarContador();
}

function getLancamentos() {
  const vistos = {};
  document.querySelectorAll('.p-input').forEach(inp => {
    const key = `${inp.dataset.area}||${inp.dataset.eito}`;
    if (!vistos[key]) vistos[key] = {area:inp.dataset.area, eitoId:inp.dataset.eito, mesa:0, fabrica:0};
    vistos[key][inp.dataset.campo] = parseInt(inp.value)||0;
  });
  return Object.values(vistos).filter(v => v.mesa>0 || v.fabrica>0);
}

function abrirRevisao() {
  const data = document.getElementById('lanc-data').value;
  if (!data) { alert('Informe a data da colheita.'); return; }
  const lotes = getLancamentos();
  if (!lotes.length) { alert('Nenhum eito preenchido.'); return; }

  document.getElementById('revisao-sub').textContent =
    `Data: ${fmtData(data)} · ${lotes.length} eito${lotes.length!==1?'s':''} · Total: ${fmtNum(lotes.reduce((s,l)=>s+l.mesa+l.fabrica,0))} cocos`;

  const tbody = document.getElementById('revisao-tbody');
  const tfoot = document.getElementById('revisao-tfoot');
  let totMesa=0, totFab=0, totTotal=0;

  tbody.innerHTML = lotes.map(l => {
    const total = l.mesa + l.fabrica;
    totMesa += l.mesa; totFab += l.fabrica; totTotal += total;
    return `<tr>
      <td style="color:var(--accent2)">${l.area}</td>
      <td style="font-weight:600">${l.eitoId}</td>
      <td>${fmtNum(l.mesa)}</td>
      <td>${fmtNum(l.fabrica)}</td>
      <td style="font-weight:700;color:var(--verde)">${fmtNum(total)}</td>
    </tr>`;
  }).join('');

  tfoot.innerHTML = `<tr style="border-top:2px solid var(--border)">
    <td colspan="2" style="font-weight:700;font-size:12px;padding:10px 12px;color:var(--muted)">TOTAL</td>
    <td style="font-weight:700;font-family:var(--font-mono)">${fmtNum(totMesa)}</td>
    <td style="font-weight:700;font-family:var(--font-mono)">${fmtNum(totFab)}</td>
    <td style="font-weight:700;font-family:var(--font-mono);color:var(--verde)">${fmtNum(totTotal)}</td>
  </tr>`;

  document.getElementById('modal-revisao').classList.add('open');
}

async function confirmarLancamento() {
  const data = document.getElementById('lanc-data').value;
  const lotes = getLancamentos();
  let count = 0;
  for (const l of lotes) {
    const eito = DB[l.area]?.find(e=>e.id===l.eitoId);
    if (!eito) continue;
    if (!eito.historico) eito.historico = [];
    eito.historico.push({ data, total: l.mesa+l.fabrica, mesa: l.mesa, fabrica: l.fabrica });
    count++;
  }
  await saveData();
  // salvar colheitas em lote no Supabase
  for(const l of lotes) {
    await salvarColheitaSupabase(l.area, l.eitoId, {
      data, total: l.mesa+l.fabrica, mesa: l.mesa, fabrica: l.fabrica
    });
  }
  limparRascunho();
  limparLancamento();
  renderDashboard();
  setTimeout(renderMapa, 80);
  showToast(`✓ ${count} eito${count!==1?'s':''} registrado${count!==1?'s':''} — ${fmtData(data)}`);
  mostrarResumo(data, lotes);
}




// ─────────── RESUMO WHATSAPP ───────────
function gerarTextoResumo(data, lotes) {
  const totMesa  = lotes.reduce((s,l) => s+l.mesa, 0);
  const totFab   = lotes.reduce((s,l) => s+l.fabrica, 0);
  const totGeral = totMesa + totFab;
  const pctMesa  = totGeral > 0 ? Math.round(totMesa/totGeral*100) : 0;
  const nomes = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  const porArea = {};
  for (const l of lotes) {
    if (!porArea[l.area]) porArea[l.area] = {mesa:0, fabrica:0};
    porArea[l.area].mesa    += l.mesa;
    porArea[l.area].fabrica += l.fabrica;
  }
  const [ano,mes,dia] = data.split('-');
  const linhas = Object.entries(porArea)
    .sort((a,b) => (b[1].mesa+b[1].fabrica) - (a[1].mesa+a[1].fabrica))
    .map(([area, v]) => {
      const tot = v.mesa + v.fabrica;
      const nm  = nomes[area] || area;
      return v.fabrica > 0
        ? `  • ${nm}: ${fmtNum(tot)} (M:${fmtNum(v.mesa)} / F:${fmtNum(v.fabrica)})`
        : `  • ${nm}: ${fmtNum(tot)}`;
    }).join('\n');
  return `🥥 *COLHEITA NEOFRUT — ${dia}/${mes}/${ano}*\n\n` +
    `📦 *Total:* ${fmtNum(totGeral)} cocos\n` +
    `🟢 *Mesa:* ${fmtNum(totMesa)} (${pctMesa}%)\n` +
    `🏭 *Fábrica:* ${fmtNum(totFab)} (${100-pctMesa}%)\n` +
    `📋 *Eitos:* ${lotes.length}\n\n` +
    `*Por área:*\n${linhas}`;
}

function mostrarResumo(data, lotes) {
  document.getElementById('resumo-texto').textContent = gerarTextoResumo(data, lotes);
  // esconder tabela e botões, mostrar resumo
  document.querySelector('#modal-revisao .revisao-table').closest('div').style.display = 'none';
  document.getElementById('revisao-sub').style.display    = 'none';
  document.getElementById('revisao-actions').style.display = 'none';
  document.getElementById('resumo-panel').style.display   = 'block';
}

function fecharResumo() {
  // restaurar estado original do modal
  document.querySelector('#modal-revisao .revisao-table').closest('div').style.display = '';
  document.getElementById('revisao-sub').style.display    = '';
  document.getElementById('revisao-actions').style.display = '';
  document.getElementById('resumo-panel').style.display   = 'none';
  closeModal('modal-revisao');
}

function copiarResumo() {
  const texto = document.getElementById('resumo-texto').textContent;
  const btn   = document.getElementById('resumo-btn');
  const fallback = txt => {
    const el = document.createElement('textarea');
    el.value = txt; el.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(el); el.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(el);
  };
  navigator.clipboard?.writeText(texto).catch(() => fallback(texto)) || fallback(texto);
  btn.textContent = '✓ Copiado!';
  btn.classList.add('copiado');
  setTimeout(() => {
    btn.textContent = '📋 Copiar para WhatsApp';
    btn.classList.remove('copiado');
  }, 2500);
}

// ─────────── DRAWER DE ÁREA ───────────
function openAreaDrawer(area, filtro) {
  currentArea = area;
  currentFilter = filtro || 'todos';
  document.getElementById('drawer-area-title').textContent = area;
  const eitos = DB[area];
  const plantas = eitos.reduce((s,e)=>s+e.plantas,0);
  document.getElementById('drawer-area-meta').textContent =
    `${eitos.length} eitos · ${fmtNum(plantas)} plantas`;
  document.getElementById('search-eito').value = '';
  // resetar filtros visuais
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const idx = {todos:0,vermelho:1,amarelo:2,verde:3,sem:4}[currentFilter];
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

// fechar com Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAreaDrawer();
    closeSidePanel();
  }
});





// ─────────── GESTÃO ───────────
function initGestao() {
  renderAreaBtnsGestao(window._gestaoAreaAtiva || Object.keys(DB)[0]);
  renderListaAreas();
}

function showGestaoTab(tab) {
  document.querySelectorAll('.gestao-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.gestao-section').forEach(s => s.classList.remove('active'));
  document.getElementById('gestao-' + tab).classList.add('active');
  const idx = {'novo-eito':0,'nova-area':1,'gerenciar':2}[tab];
  document.querySelectorAll('.gestao-tab')[idx]?.classList.add('active');
  if (tab === 'gerenciar') renderListaAreas();
}

function renderAreaBtnsGestao(areaAtiva) {
  const wrap = document.getElementById('gestao-area-btns');
  if (!wrap) return;
  const nomesCurtos = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  window._gestaoAreaAtiva = areaAtiva;
  wrap.innerHTML = Object.keys(DB).map(a =>
    `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaGestao('${a}')">${nomesCurtos[a]||a}</button>`
  ).join('');
}

function selecionarAreaGestao(area) {
  window._gestaoAreaAtiva = area;
  renderAreaBtnsGestao(area);
  const erroEl = document.getElementById('gestao-eito-erro');
  if (erroEl) erroEl.style.display = 'none';
}

function cadastrarEito() {
  const area    = window._gestaoAreaAtiva;
  const id      = document.getElementById('gestao-eito-id').value.trim();
  const plantas = parseInt(document.getElementById('gestao-eito-plantas').value);
  const erroEl  = document.getElementById('gestao-eito-erro');
  if (!area)   { mostrarErroGestao(erroEl, 'Selecione uma área.'); return; }
  if (!id)     { mostrarErroGestao(erroEl, 'Informe o ID do eito (ex: 115/116).'); return; }
  if (isNaN(plantas) || plantas < 1) { mostrarErroGestao(erroEl, 'Informe um número válido de plantas.'); return; }
  if (DB[area]?.find(e => e.id === id)) {
    mostrarErroGestao(erroEl, `Eito "${id}" já existe em ${area}.`); return;
  }
  if (!DB[area]) DB[area] = [];
  DB[area].push({ id, plantas, historico: [] });
  saveData();
  erroEl.style.display = 'none';
  document.getElementById('gestao-eito-id').value = '';
  document.getElementById('gestao-eito-plantas').value = '';
  showToast(`✓ Eito ${id} adicionado em ${area} — ${plantas} plantas`);
  renderAreaBtnsGestao(area);
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function cadastrarArea() {
  const nome   = document.getElementById('gestao-area-nome').value.trim().toUpperCase();
  const erroEl = document.getElementById('gestao-area-erro');
  if (!nome) { mostrarErroGestao(erroEl, 'Informe o nome da área.'); return; }
  if (DB[nome]) { mostrarErroGestao(erroEl, `Área "${nome}" já existe.`); return; }
  DB[nome] = [];
  saveData();
  erroEl.style.display = 'none';
  document.getElementById('gestao-area-nome').value = '';
  showToast(`✓ Área "${nome}" criada`);
  renderListaAreas();
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function renderListaAreas() {
  const lista = document.getElementById('gestao-lista-areas');
  if (!lista) return;
  lista.innerHTML = Object.entries(DB).map(([area, eitos]) => {
    const totalPl  = eitos.reduce((s,e)=>s+e.plantas,0);
    const comHist  = eitos.filter(e=>e.historico?.length>0).length;
    return `<div class="gestao-lista-row">
      <div class="gestao-row-info">
        <div class="gestao-row-nome">${area}</div>
        <div class="gestao-row-sub">${eitos.length} eitos · ${fmtNum(totalPl)} plantas · ${comHist} com colheita</div>
      </div>
      <button class="btn-danger" onclick="confirmarExcluirArea('${area}')">⚠️ Excluir</button>
    </div>`;
  }).join('');
}

function confirmarExcluirArea(area) {
  const eitos   = DB[area] || [];
  const comHist = eitos.filter(e=>e.historico?.length>0).length;
  const aviso   = comHist > 0 ? `\n⚠️ ${comHist} eito(s) com histórico será perdido!` : '';
  if (!confirm(`Excluir "${area}" com ${eitos.length} eito(s)?${aviso}\n\nEsta ação é irreversível.`)) return;
  delete DB[area];
  saveData();
  showToast(`✓ Área "${area}" excluída`);
  renderListaAreas();
  renderDashboard();
  setTimeout(renderMapa, 60);
}

function mostrarErroGestao(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}

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

// ─────────── EDIÇÃO INLINE NO DRAWER ───────────
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

// ─────────── PAINEL LATERAL ───────────
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
    <div class="side-kpi"><div class="side-kpi-label">Próxima colheita</div><div class="side-kpi-value" style="font-size:14px;color:${st==='vermelho'?'var(--vermelho)':st==='amarelo'?'var(--amarelo)':'var(--muted)'}">${proxData?fmtData(proxData):'—'}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Melhor colheita</div><div class="side-kpi-value" style="color:var(--verde)">${fmtNum(melhor)}</div></div>
    <div class="side-kpi"><div class="side-kpi-label">Dias s/ colheita</div><div class="side-kpi-value" style="color:${st==='vermelho'?'var(--vermelho)':st==='amarelo'?'var(--amarelo)':'var(--text)'}">${dias!==null?dias+'d':'—'}</div></div>
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

// ─────────── ANÁLISE ───────────
function initAnalise() {
  const primeiraArea = window._analiseAreaAtiva || Object.keys(DB)[0];
  window._analiseAreaAtiva = primeiraArea;
  renderAreaBtnsAnalise(primeiraArea);
  renderAnalise();
}

function renderAreaBtnsAnalise(areaAtiva) {
  const wrap = document.getElementById('analise-area-btns');
  if (!wrap) return;
  const nomesCurtos = {
    'AREA A1':'A1','AREA A2':'A2','AREA C':'C','AREA D':'D',
    'MAMÃO DE CIMA':'MD CIMA','MAMÃO DE BAIXO':'MD BAIXO','MARACUJÁ':'MARACUJÁ'
  };
  wrap.innerHTML = Object.keys(DB).map(a =>
    `<button class="area-btn ${areaAtiva===a?'ativo':''}" onclick="selecionarAreaAnalise('${a}')">${nomesCurtos[a]||a}</button>`
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

// ─────────── MELHORIAS NA TABELA DE ÁREA ───────────
// Sobrescrever renderAreaTable para ordenar por urgência
const _renderAreaTableOriginal = renderAreaTable;
// (a nova versão já está abaixo — veja override no init)


// ─────────── VENDAS ───────────
const SK_VENDAS = 'neofrut_vendas_v1';
let _vendasCache = null;

function loadVendas(){
  // retorna cache local (carregado pelo initVendas)
  return _vendasCache || JSON.parse(localStorage.getItem(SK_VENDAS)||'[]');
}

async function loadVendasSupabase(){
  try {
    // buscar todos os registros — Supabase limita 1000 por query, usar range
    let allData = [];
    let from = 0;
    const pageSize = 1000;
    while(true) {
      const { data, error } = await _SB.from('vendas').select('*').order('data', {ascending: true}).range(from, from+pageSize-1);
      if(error) throw error;
      if(!data || data.length === 0) break;
      allData = allData.concat(data);
      if(data.length < pageSize) break;
      from += pageSize;
    }
    const data = allData;
    console.log('Vendas carregadas do Supabase:', data.length);

    // Se Supabase retornou vazio mas temos dados locais, manter os locais
    const localVendas = JSON.parse(localStorage.getItem(SK_VENDAS)||'[]');
    if(data.length === 0 && localVendas.length > 0) {
      console.warn('Supabase sem vendas mas há dados locais — mantendo cache');
      _vendasCache = localVendas;
      return _vendasCache;
    }

    // mapear colunas snake_case → camelCase
    _vendasCache = data.map(v=>({
      id: v.id,
      data: typeof v.data === 'string' ? v.data.substring(0,10) : v.data,
      cliente: v.cliente,
      nf: v.nf,
      areas: v.areas||{},
      qtde: v.qtde||0,
      total: parseFloat(v.total)||0,
      frete: parseFloat(v.frete)||0,
      valorRecebido: parseFloat(v.valor_recebido)||0,
      status: v.status||'PAGO',
      dataDeposito: v.data_deposito,
      tipoVenda: v.tipo_venda||'coco',
      pesoKg: v.peso_kg,
      litragem: v.litragem,
      vPorLitro: v.v_por_litro
    }));
    // Salvar no localStorage como cache offline
    localStorage.setItem(SK_VENDAS, JSON.stringify(_vendasCache));
    return _vendasCache;
  } catch(e) {
    console.error('Erro ao carregar vendas:', e);
    return JSON.parse(localStorage.getItem(SK_VENDAS)||'[]');
  }
}

async function saveVendas(db){
  _vendasCache = db;
  localStorage.setItem(SK_VENDAS, JSON.stringify(db));
}

async function salvarVendaSupabase(v){
  const row = {
    id: v.id,
    data: v.data,
    cliente: v.cliente,
    nf: v.nf,
    areas: v.areas||{},
    qtde: v.qtde||0,
    total: v.total||0,
    frete: v.frete||0,
    valor_recebido: v.valorRecebido||0,
    status: v.status||'PAGO',
    data_deposito: v.dataDeposito||null,
    tipo_venda: v.tipoVenda||'coco',
    peso_kg: v.pesoKg||null,
    litragem: v.litragem||null,
    v_por_litro: v.vPorLitro||null
  };
  const { error } = await _SB.from('vendas').upsert(row);
  if(error) console.error('Erro ao salvar venda:', error);
}

async function excluirVendaSupabase(id){
  const { error } = await _SB.from('vendas').delete().eq('id', id);
  if(error) console.error('Erro ao excluir venda:', error);
}
function fmtR(v){return v!=null&&!isNaN(v)?'R$ '+fmtNum(Math.round(v)):'—';}

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
  const dl=document.getElementById('v-clientes-dl');
  if(dl){const cl=[...new Set(db.map(v=>v.cliente))].sort();dl.innerHTML=cl.map(c=>`<option value="${c}">`).join('');}
  renderVendasPainel();
  renderVendasLista();
  renderVendasPendentes();
}

function renderAnosBtns(anos){
  ['v-anos-btns','vl-anos-btns'].forEach(id=>{
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
}

function renderMesesBtns(){
  const MESES=[['todos','Todos'],['1','Jan'],['2','Fev'],['3','Mar'],['4','Abr'],['5','Mai'],['6','Jun'],
               ['7','Jul'],['8','Ago'],['9','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  const ativo=window._vendaMesAtivo||'todos';
  ['v-meses-btns','vl-meses-btns'].forEach(id=>{
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
}

function showVendasTab(tab){
  document.querySelectorAll('.vd-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.vd-sec').forEach(s=>s.classList.remove('active'));
  const idx={'painel':0,'nova':1,'lista':2,'pendentes':3}[tab];
  document.querySelectorAll('.vd-tab')[idx]?.classList.add('active');
  document.getElementById('vsec-'+tab)?.classList.add('active');
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
  const preco=tCocos>0?(tReceita/tCocos).toFixed(2):0;
  const kpi=document.getElementById('v-kpi-grid');
  if(kpi){
    const _pendKpi = tPend>0
      ? '<div class="vkpi" style="border-color:var(--amarelo-border)"><div class="vkpi-label">A Receber</div><div class="vkpi-val" style="color:#854d0e">'+fmtR(tPend)+'</div></div>'
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
  sel.forEach(v=>{if(!pc[v.cliente])pc[v.cliente]={c:0,r:0};pc[v.cliente].c+=v.qtde||0;pc[v.cliente].r+=v.total||0;});
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
        const precoCli=d.c>0?(d.r/d.c).toFixed(2):null;
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
      return tQ>0?parseFloat((tR/tQ).toFixed(2)):0;
    });
  }else{
    labels=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    vals=Array.from({length:12},(_,i)=>i+1).map(m=>{
      const s=db.filter(v=>{const d=new Date(v.data+'T00:00:00');return d.getFullYear()===parseInt(ano)&&d.getMonth()+1===m&&v.qtde>0&&v.total>0;});
      const tQ=s.reduce((x,v)=>x+(v.qtde||0),0);
      const tR=s.reduce((x,v)=>x+(v.total||0),0);
      return tQ>0?parseFloat((tR/tQ).toFixed(2)):0;
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
    const preco=cocos>0?(receita/cocos).toFixed(2):null;
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
  document.getElementById('vc-preco').textContent=q>0&&t>0?'R$ '+(t/q).toFixed(2):'—';
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
  ['v-cliente','v-nf','v-total','v-frete','v-recebido','v-peso','v-litragem','v-vlitro','v-deposito'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
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
    const pc=v.qtde>0&&v.total>0?(v.total/v.qtde).toFixed(2):'—';
    const badge=v.status==='PAGO'
      ?'<span class="badge-pago">PAGO</span>'
      :'<span class="badge-pendente">PENDENTE</span>';
    const tr=document.createElement('tr');
    if(v.status==='PENDENTE')tr.classList.add('pendente');
    tr.innerHTML=
      '<td style="font-family:var(--font-mono);white-space:nowrap">'+d+'/'+m+'/'+y+'</td>'
     +'<td style="font-weight:700;cursor:pointer;color:var(--forest)" class="cli-link">'+v.cliente+'</td>'
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
    // guardar cliente no dataset para abrir panel
    tr.querySelector('.cli-link').dataset.cli = v.cliente;
    tr.querySelector('.cli-link').addEventListener('click', function(){ openClientePanel(this.dataset.cli); });
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
  if(cnt)cnt.textContent=lista.length+' venda'+(lista.length!==1?'s':'')+' · '+fmtNum(tC)+' cocos';
  const rod=document.getElementById('vl-rodape');
  if(rod&&lista.length)rod.textContent='Total: '+fmtNum(tC)+' cocos · Receita: '+fmtR(tR)+' · Recebido: '+fmtR(tRec);
}

function renderVendasPendentes(){
  const db=loadVendas();
  const pend=db.filter(v=>v.status==='PENDENTE').sort((a,b)=>a.data.localeCompare(b.data));
  const wrap=document.getElementById('v-pendentes-wrap');
  if(!wrap)return;
  if(!pend.length){wrap.innerHTML='<div style="text-align:center;padding:48px;color:var(--muted);font-size:14px">✅ Nenhuma venda pendente!</div>';return;}
  const tot=pend.reduce((s,v)=>s+(v.valorRecebido||v.total||0),0);
  wrap.innerHTML=`<div style="font-size:13px;font-weight:700;color:var(--vermelho);margin-bottom:16px">${pend.length} pendente${pend.length!==1?'s':''} · ${fmtR(tot)} a receber</div>
    <div style="overflow-x:auto"><table class="vtable"><thead><tr><th>DATA</th><th>CLIENTE</th><th>NF</th><th>COCOS</th><th>A RECEBER</th><th>AÇÃO</th></tr></thead><tbody>
    ${pend.map(v=>{const[y,m,d]=v.data.split('-');return`<tr class="pendente">
      <td style="font-family:var(--font-mono)">${d}/${m}/${y}</td><td style="font-weight:700">${v.cliente}</td>
      <td style="font-family:var(--font-mono);color:var(--muted)">${v.nf}</td>
      <td style="font-family:var(--font-mono)">${fmtNum(v.qtde)}</td>
      <td style="font-family:var(--font-mono);font-weight:700">${fmtR(v.valorRecebido||v.total)}</td>
      <td><button class="btn btn-primary" style="font-size:11px;padding:5px 12px" onclick="marcarPago(${v.id})">✓ Marcar como Pago</button></td>
    </tr>`;}).join('')}
    </tbody></table></div>`;
}

async function marcarPago(id){
  const db=loadVendas();const v=db.find(v=>v.id===id);if(!v)return;
  v.status='PAGO';v.dataDeposito=v.dataDeposito||today();
  saveVendas(db);
  await salvarVendaSupabase(v);
  renderVendasPendentes();renderVendasLista();
  showToast('✓ '+v.cliente+' — marcada como paga');
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


function editarVenda(id){
  const db=loadVendas();
  const v=db.find(x=>x.id===id);
  if(!v)return;
  // preencher formulário Nova Venda com dados da venda
  showVendasTab('nova');
  setTimeout(()=>{
    document.getElementById('v-data').value=v.data;
    document.getElementById('v-cliente').value=v.cliente;
    document.getElementById('v-nf').value=v.nf;
    document.getElementById('v-total').value=v.total||'';
    document.getElementById('v-frete').value=v.frete||'';
    document.getElementById('v-recebido').value=v.valorRecebido||'';
    document.getElementById('v-deposito').value=v.dataDeposito||'';
    document.getElementById('v-status').value=v.status||'PAGO';
    ['A1','A2','C','D','MA','MDC','MDB'].forEach(a=>{
      const el=document.getElementById('va-'+a);
      if(el){el.value=(v.areas&&v.areas[a])||'';el.classList.toggle('filled',(v.areas&&v.areas[a])>0);}
    });
    const tot=document.getElementById('va-total');
    if(tot){tot.value=v.qtde||'';tot.classList.toggle('filled',(v.qtde||0)>0);}
    // modo litro
    const litro=v.tipoVenda==='litro';
    document.getElementById('v-modo-litro').checked=litro;
    document.getElementById('v-campos-litro').style.display=litro?'':'none';
    if(litro){
      document.getElementById('v-peso').value=v.pesoKg||'';
      document.getElementById('v-litragem').value=v.litragem||'';
      document.getElementById('v-vlitro').value=v.vPorLitro||'';
    }
    calcVenda();
    // marcar que é edição — ao salvar, remove o original
    document.getElementById('v-data').dataset.editandoId=id;
    const erroEl=document.getElementById('v-erro');
    if(erroEl){erroEl.style.display='block';erroEl.style.color='var(--amarelo)';erroEl.textContent='Editando venda de '+v.cliente+' — ao confirmar, a original será substituída.';}
  },80);
}

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
    const pc=v.qtde>0&&v.total>0?(v.total/v.qtde).toFixed(2):'';
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

function openClientePanel(cliente){
  const db=loadVendas();
  const vendas=db.filter(v=>v.cliente===cliente).sort((a,b)=>a.data.localeCompare(b.data));
  const tCocos=vendas.reduce((s,v)=>s+(v.qtde||0),0);
  const tReceita=vendas.reduce((s,v)=>s+(v.total||0),0);
  const tFrete=vendas.reduce((s,v)=>s+(v.frete||0),0);
  const preco=tCocos>0?(tReceita/tCocos).toFixed(2):0;
  const ult=vendas[vendas.length-1];
  document.getElementById('cli-title').textContent=cliente;
  document.getElementById('cli-sub').textContent=vendas.length+' compra'+(vendas.length!==1?'s':'')+' registrada'+(vendas.length!==1?'s':'');
  // KPIs
  document.getElementById('cli-kpis').innerHTML=
    '<div class="side-kpi"><div class="side-kpi-label">Total cocos</div><div class="side-kpi-value">'+fmtNum(tCocos)+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Receita total</div><div class="side-kpi-value" style="color:var(--forest)">'+fmtR(tReceita)+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">R$/coco médio</div><div class="side-kpi-value">R$ '+preco+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Última compra</div><div class="side-kpi-value" style="font-size:14px">'+( ult?fmtData(ult.data):'—')+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Frete total</div><div class="side-kpi-value">'+fmtR(tFrete)+'</div></div>'
   +'<div class="side-kpi"><div class="side-kpi-label">Margem líquida</div><div class="side-kpi-value" style="color:var(--verde)">'+fmtR(tReceita-tFrete)+'</div></div>';
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
  // Histórico
  document.getElementById('cli-hist').innerHTML=[...vendas].reverse().map((v,i)=>{
    const [y,m,d]=v.data.split('-');
    const pc=v.qtde>0&&v.total>0?'R$ '+(v.total/v.qtde).toFixed(2):null;
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:'+(i===0?'var(--verde-bg)':'var(--surface2)')+';border:1px solid '+(i===0?'var(--verde-border)':'var(--border)')+';border-radius:8px;margin-bottom:6px">'
      +'<div>'
        +'<div style="font-family:var(--font-mono);font-size:12px;font-weight:500">'+d+'/'+m+'/'+y+'</div>'
        +'<div style="font-size:10px;color:var(--muted);margin-top:2px">'+fmtNum(v.qtde)+' cocos'+(pc?' · '+pc:'')+(v.nf&&v.nf!=='RECIBO'?' · NF '+v.nf:'')+'</div>'
      +'</div>'
      +'<div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:'+(i===0?'var(--verde)':'var(--text)')+'">'+fmtR(v.total)+'</div>'
    +'</div>';
  }).join('');
  document.getElementById('cli-panel').classList.add('open');
  document.getElementById('cli-overlay').classList.add('open');
}

function closeClientePanel(){
  document.getElementById('cli-panel').classList.remove('open');
  document.getElementById('cli-overlay').classList.remove('open');
}


function normalizarClientes(){
  if(!confirm('Aplicar normalização de clientes? O banco será atualizado com os nomes corrigidos.')) return;
  var dados = [{"id":1000,"data":"2023-01-02","cliente":"WANDERLEY - ARACAJU","nf":"675","areas":{"A2":4500},"qtde":4500,"total":5850.0,"frete":0,"valorRecebido":5850.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1001,"data":"2023-01-03","cliente":"RAFAEL - MACEIÓ","nf":"676","areas":{"A2":1500,"MDB":3500},"qtde":5000,"total":6500.0,"frete":0,"valorRecebido":6500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1002,"data":"2023-01-03","cliente":"JAILSON - ARUANA","nf":"677","areas":{"MDB":3000},"qtde":3000,"total":3900.0,"frete":0,"valorRecebido":3900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1003,"data":"2023-01-05","cliente":"MARCOS FALCÃO","nf":"678","areas":{"B":8000},"qtde":8000,"total":4255.099999999999,"frete":1900.0,"valorRecebido":2355.0999999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2503.0,"vPorLitro":1.7},{"id":1004,"data":"2023-01-06","cliente":"RAFAEL - MACEIÓ","nf":"679","areas":{"MDC":5000},"qtde":5000,"total":6500.0,"frete":0,"valorRecebido":6500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1005,"data":"2023-01-10","cliente":"RAFAEL - MACEIÓ","nf":"680","areas":{"MDC":5000},"qtde":5000,"total":6500.0,"frete":0,"valorRecebido":6500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1006,"data":"2023-01-11","cliente":"JAILSON - ARUANA","nf":"681","areas":{"D":5000},"qtde":5000,"total":6500.0,"frete":0,"valorRecebido":6500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1007,"data":"2023-01-11","cliente":"FRYSK","nf":"682","areas":{"D":10000},"qtde":10000,"total":8615.34,"frete":2187.0,"valorRecebido":6428.34,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3745.8,"vPorLitro":2.3},{"id":1008,"data":"2023-01-11","cliente":"FRYSK","nf":"683","areas":{"D":9800},"qtde":9800,"total":9241.17,"frete":2239.0,"valorRecebido":7002.17,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4017.9,"vPorLitro":2.3},{"id":1009,"data":"2023-01-12","cliente":"ALEXANDRE - MT","nf":"684","areas":{"MA":6000},"qtde":6000,"total":7500.0,"frete":0,"valorRecebido":7500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1010,"data":"2023-01-17","cliente":"JAILSON - ARUANA","nf":"686","areas":{"MA":3000},"qtde":3000,"total":3900.0,"frete":0,"valorRecebido":3900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1011,"data":"2023-01-18","cliente":"RAFAEL - MACEIÓ","nf":"687","areas":{"C":1600,"D":4400},"qtde":6000,"total":7800.0,"frete":0,"valorRecebido":7800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1012,"data":"2023-01-20","cliente":"DANIEL - MACEIÓ","nf":"688","areas":{"MA":4500,"MDC":1000,"MDB":2500},"qtde":8000,"total":9600.0,"frete":0,"valorRecebido":9600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1013,"data":"2023-01-20","cliente":"FRYSK","nf":"689","areas":{"D":9000},"qtde":9000,"total":9140.199999999999,"frete":2318.0,"valorRecebido":6822.199999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3974.0,"vPorLitro":2.3},{"id":1014,"data":"2023-01-23","cliente":"RAFAEL - MACEIÓ","nf":"690","areas":{"C":5000},"qtde":5000,"total":6500.0,"frete":0,"valorRecebido":6500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1015,"data":"2023-01-24","cliente":"DANIEL - MACEIÓ","nf":"RECIBO","areas":{"A2":8000},"qtde":8000,"total":8800.0,"frete":0,"valorRecebido":8800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1016,"data":"2023-01-26","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":2300},"qtde":2300,"total":3105.0,"frete":0,"valorRecebido":3105.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1017,"data":"2023-01-26","cliente":"MARLY - COCO VIDA","nf":"691","areas":{"A2":3500},"qtde":3500,"total":4550.0,"frete":0,"valorRecebido":4550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1018,"data":"2023-01-26","cliente":"ALEXANDRE - MT","nf":"692","areas":{"A2":3600,"MDC":3800},"qtde":7400,"total":9250.0,"frete":0,"valorRecebido":9250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1019,"data":"2023-01-27","cliente":"CEARÁ - CAMPINAS","nf":"693","areas":{"MDC":2300,"MDB":6200},"qtde":8500,"total":10200.0,"frete":0,"valorRecebido":10200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1020,"data":"2023-01-30","cliente":"MARCOS FALCÃO","nf":"697","areas":{"C":1000,"D":6500,"MDB":1000},"qtde":8500,"total":4438.7,"frete":1900.0,"valorRecebido":2538.7,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2611.0,"vPorLitro":1.7},{"id":1021,"data":"2023-02-02","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A1":2500},"qtde":2500,"total":3250.0,"frete":0,"valorRecebido":3250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1022,"data":"2023-02-02","cliente":"RAUL ALVES - ARACAJU","nf":"RECIBO","areas":{"A1":3700,"D":2300},"qtde":6000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1023,"data":"2023-02-02","cliente":"FRYSK","nf":"698","areas":{"A1":10000},"qtde":10000,"total":7582.639999999999,"frete":2154.0,"valorRecebido":5428.639999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3296.8,"vPorLitro":2.3},{"id":1024,"data":"2023-02-03","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"699","areas":{"MDC":6700,"MDB":1300},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1025,"data":"2023-02-04","cliente":"FRYSK","nf":"700","areas":{"A1":8600},"qtde":8600,"total":6959.57,"frete":2061.0,"valorRecebido":4898.57,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3025.9,"vPorLitro":2.3},{"id":1026,"data":"2023-02-04","cliente":"FRYSK","nf":"701","areas":{"A1":10000},"qtde":10000,"total":8117.159999999999,"frete":2199.0,"valorRecebido":5918.159999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3529.2,"vPorLitro":2.3},{"id":1027,"data":"2023-02-06","cliente":"MARLY - COCO VIDA","nf":"702","areas":{"MA":3500},"qtde":3500,"total":4550.0,"frete":0,"valorRecebido":4550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1028,"data":"2023-02-06","cliente":"FRYSK","nf":"703","areas":{"A1":11100},"qtde":11100,"total":8162.929999999999,"frete":2514.0,"valorRecebido":5648.929999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3549.1,"vPorLitro":2.3},{"id":1029,"data":"2023-02-06","cliente":"FRYSK","nf":"704","areas":{"D":10000},"qtde":10000,"total":8126.82,"frete":2310.0,"valorRecebido":5816.82,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3533.4,"vPorLitro":2.3},{"id":1030,"data":"2023-02-06","cliente":"FRYSK","nf":"705","areas":{"A1":3900,"D":5500},"qtde":9400,"total":6981.42,"frete":2141.0,"valorRecebido":4840.42,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3035.4,"vPorLitro":2.3},{"id":1031,"data":"2023-02-07","cliente":"FRYSK","nf":"706","areas":{"A1":11000},"qtde":11000,"total":7662.45,"frete":2450.0,"valorRecebido":5212.45,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3331.5,"vPorLitro":2.3},{"id":1032,"data":"2023-02-07","cliente":"FRYSK","nf":"707","areas":{"A1":7200},"qtde":7200,"total":5742.409999999999,"frete":1646.0,"valorRecebido":4096.409999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2496.7,"vPorLitro":2.3},{"id":1033,"data":"2023-02-07","cliente":"FRYSK","nf":"708","areas":{"A1":8600},"qtde":8600,"total":6392.62,"frete":1953.0,"valorRecebido":4439.62,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2779.4,"vPorLitro":2.3},{"id":1034,"data":"2023-02-07","cliente":"WANDERLEY - ARACAJU","nf":"709","areas":{"A1":4000},"qtde":4000,"total":4400.0,"frete":0,"valorRecebido":4400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1035,"data":"2023-02-08","cliente":"ALEXANDRE - MT","nf":"710","areas":{"MA":4700,"MDC":1600,"MDB":1200},"qtde":7500,"total":9375.0,"frete":0,"valorRecebido":9375.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1036,"data":"2023-02-08","cliente":"RAFAEL - MACEIÓ","nf":"711","areas":{"MA":1200,"MDC":2800},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1037,"data":"2023-02-08","cliente":"FRYSK","nf":"712","areas":{"A1":10000},"qtde":10000,"total":7086.99,"frete":2295.0,"valorRecebido":4791.99,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3081.3,"vPorLitro":2.3},{"id":1038,"data":"2023-02-09","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":2800},"qtde":2800,"total":3360.0,"frete":0,"valorRecebido":3360.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1039,"data":"2023-02-09","cliente":"RAUL ALVES - ARACAJU","nf":"RECIBO","areas":{"A2":7000},"qtde":7000,"total":8400.0,"frete":0,"valorRecebido":8400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1040,"data":"2023-02-13","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MA":3300,"MDB":1700},"qtde":5000,"total":5500.0,"frete":0,"valorRecebido":5500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1041,"data":"2023-02-13","cliente":"FRYSK","nf":"719","areas":{"A1":11000},"qtde":11000,"total":7076.87,"frete":2371.0,"valorRecebido":4705.87,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3076.9,"vPorLitro":2.3},{"id":1042,"data":"2023-02-13","cliente":"FRYSK","nf":"720","areas":{"A1":8750},"qtde":8750,"total":6909.429999999999,"frete":1964.0,"valorRecebido":4945.429999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3004.1,"vPorLitro":2.3},{"id":1043,"data":"2023-02-14","cliente":"FRYSK","nf":"721","areas":{"A1":8000},"qtde":8000,"total":6876.999999999999,"frete":1710.0,"valorRecebido":5166.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2990.0,"vPorLitro":2.3},{"id":1044,"data":"2023-02-14","cliente":"FRYSK","nf":"722","areas":{"A1":11000},"qtde":11000,"total":8833.38,"frete":2397.0,"valorRecebido":6436.379999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3840.6,"vPorLitro":2.3},{"id":1045,"data":"2023-02-14","cliente":"FRYSK","nf":"723","areas":{"A1":10500},"qtde":10500,"total":9220.24,"frete":2337.0,"valorRecebido":6883.24,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4008.8,"vPorLitro":2.3},{"id":1046,"data":"2023-02-15","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":2400},"qtde":2400,"total":2880.0,"frete":0,"valorRecebido":2880.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1048,"data":"2023-02-15","cliente":"FRYSK","nf":"725","areas":{"A1":9000},"qtde":9000,"total":7362.07,"frete":2040.0,"valorRecebido":5322.07,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3200.9,"vPorLitro":2.3},{"id":1049,"data":"2023-02-15","cliente":"FRYSK","nf":"726","areas":{"A1":9000},"qtde":9000,"total":7001.89,"frete":1999.0,"valorRecebido":5002.89,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3044.3,"vPorLitro":2.3},{"id":1050,"data":"2023-02-16","cliente":"MARLY - COCO VIDA","nf":"727","areas":{"A2":3500},"qtde":3500,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1051,"data":"2023-02-16","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"728","areas":{"A2":700,"MDB":5300},"qtde":6000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1052,"data":"2023-02-16","cliente":"RAUL ALVES - ARACAJU","nf":"RECIBO","areas":{"MDC":7000},"qtde":7000,"total":8400.0,"frete":0,"valorRecebido":8400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1053,"data":"2023-02-17","cliente":"JACIARA - FEIRA DE SANTANA","nf":"729","areas":{"C":10000},"qtde":10000,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1054,"data":"2023-02-17","cliente":"RAFAEL - MACEIÓ","nf":"730","areas":{"MA":4000},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1055,"data":"2023-02-22","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDB":2500},"qtde":2500,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1056,"data":"2023-02-22","cliente":"FRYSK","nf":"731","areas":{"B":8000},"qtde":8000,"total":5672.95,"frete":1749.0,"valorRecebido":3923.95,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2466.5,"vPorLitro":2.3},{"id":1057,"data":"2023-02-22","cliente":"MARCOS FALCÃO","nf":"732","areas":{"A1":8000},"qtde":8000,"total":3580.8,"frete":1900.0,"valorRecebido":1680.8000000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2238.0,"vPorLitro":1.6},{"id":1058,"data":"2023-02-22","cliente":"FRYSK","nf":"733","areas":{"B":11000},"qtde":11000,"total":8496.429999999998,"frete":2492.0,"valorRecebido":6004.4299999999985,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3694.1,"vPorLitro":2.3},{"id":1059,"data":"2023-02-23","cliente":"FRYSK","nf":"734","areas":{"B":8000},"qtde":8000,"total":5290.92,"frete":1959.0,"valorRecebido":3331.92,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2300.4,"vPorLitro":2.3},{"id":1060,"data":"2023-02-23","cliente":"JACIARA - FEIRA DE SANTANA","nf":"735","areas":{"D":10000},"qtde":10000,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1061,"data":"2023-02-23","cliente":"RAUL ALVES - ARACAJU","nf":"RECIBO","areas":{"MA":6000},"qtde":6000,"total":6600.000000000001,"frete":0,"valorRecebido":6600.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1062,"data":"2023-02-24","cliente":"RAFAEL - MACEIÓ","nf":"736","areas":{"MA":3000},"qtde":3000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1063,"data":"2023-02-24","cliente":"FRYSK","nf":"737","areas":{"D":9000},"qtde":9000,"total":4761.69,"frete":2031.0,"valorRecebido":2730.6899999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2070.3,"vPorLitro":2.3},{"id":1064,"data":"2023-02-24","cliente":"FRYSK","nf":"738","areas":{"B":6000,"D":5000},"qtde":11000,"total":6976.82,"frete":2386.0,"valorRecebido":4590.82,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3033.4,"vPorLitro":2.3},{"id":1065,"data":"2023-02-24","cliente":"MARCOS FALCÃO","nf":"739","areas":{"A1":4000,"C":4000},"qtde":8000,"total":3708.8,"frete":1900.0,"valorRecebido":1808.8000000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2318.0,"vPorLitro":1.6},{"id":1066,"data":"2023-02-24","cliente":"FRYSK","nf":"740","areas":{"B":9000},"qtde":9000,"total":5664.9,"frete":2097.0,"valorRecebido":3567.8999999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2463.0,"vPorLitro":2.3},{"id":1067,"data":"2023-02-25","cliente":"FRYSK","nf":"741","areas":{"B":8000},"qtde":8000,"total":5726.079999999999,"frete":1799.0,"valorRecebido":3927.079999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2489.6,"vPorLitro":2.3},{"id":1068,"data":"2023-02-25","cliente":"MIGUEL - CUIABÁ","nf":"743","areas":{"D":16800},"qtde":16800,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1069,"data":"2023-02-27","cliente":"FRYSK","nf":"744","areas":{"B":7000,"D":2000},"qtde":9000,"total":7124.48,"frete":2154.0,"valorRecebido":4970.48,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3097.6,"vPorLitro":2.3},{"id":1070,"data":"2023-02-27","cliente":"FRYSK","nf":"745","areas":{"B":11000},"qtde":11000,"total":7136.9,"frete":2450.0,"valorRecebido":4686.9,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3103.0,"vPorLitro":2.3},{"id":1071,"data":"2023-02-27","cliente":"MARCOS FALCÃO","nf":"763","areas":{"B":9000},"qtde":9000,"total":3374.4,"frete":1900.0,"valorRecebido":1474.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2109.0,"vPorLitro":1.6},{"id":1072,"data":"2023-02-28","cliente":"MARCOS FALCÃO","nf":"764","areas":{"B":8000},"qtde":8000,"total":3152.0,"frete":1900.0,"valorRecebido":1252.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":1970.0,"vPorLitro":1.6},{"id":1073,"data":"2023-02-28","cliente":"FRYSK","nf":"765","areas":{"B":9000},"qtde":9000,"total":7150.009999999999,"frete":2094.0,"valorRecebido":5056.009999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3108.7,"vPorLitro":2.3},{"id":1074,"data":"2023-02-28","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MA":200,"MDC":1800,"MDB":500},"qtde":2500,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1075,"data":"2023-02-28","cliente":"MARCOS FALCÃO","nf":"766","areas":{"A1":3000,"B":6000},"qtde":9000,"total":3689.6000000000004,"frete":1900.0,"valorRecebido":1789.6000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2306.0,"vPorLitro":1.6},{"id":1076,"data":"2023-03-01","cliente":"RAFAEL - MACEIÓ","nf":"767","areas":{"MDC":3000},"qtde":3000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1077,"data":"2023-03-01","cliente":"ALEXANDRE - MT","nf":"769","areas":{"MDC":3000,"MDB":5000},"qtde":8000,"total":9600.0,"frete":0,"valorRecebido":9600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1078,"data":"2023-03-01","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"770","areas":{"A2":4000,"MDB":3000},"qtde":7000,"total":7700.000000000001,"frete":0,"valorRecebido":7700.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1079,"data":"2023-03-01","cliente":"FRYSK","nf":"771","areas":{"D":9000},"qtde":9000,"total":8200.88,"frete":2096.0,"valorRecebido":6104.879999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3565.6,"vPorLitro":2.3},{"id":1080,"data":"2023-03-02","cliente":"MARLY - COCO VIDA","nf":"772","areas":{"A2":3500},"qtde":3500,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1081,"data":"2023-03-03","cliente":"CEARÁ - CAMPINAS","nf":"773","areas":{"A2":8500},"qtde":8500,"total":9350.0,"frete":0,"valorRecebido":9350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1082,"data":"2023-03-06","cliente":"RAFAEL - MACEIÓ","nf":"774","areas":{"A2":4000},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1083,"data":"2023-03-06","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":1400,"MDC":1400},"qtde":2800,"total":3080.0000000000005,"frete":0,"valorRecebido":3080.0000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1084,"data":"2023-03-07","cliente":"MIGUEL - CUIABÁ","nf":"775","areas":{"A1":4100,"D":14400},"qtde":18500,"total":14800.0,"frete":0,"valorRecebido":14800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1085,"data":"2023-03-08","cliente":"MARCOS FALCÃO","nf":"776","areas":{"A1":1500,"D":7500},"qtde":9000,"total":5124.8,"frete":1900.0,"valorRecebido":3224.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3203.0,"vPorLitro":1.6},{"id":1086,"data":"2023-03-10","cliente":"MIGUEL - CUIABÁ","nf":"777","areas":{"A1":17000},"qtde":17000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1087,"data":"2023-03-13","cliente":"FRYSK","nf":"780","areas":{"C":10000},"qtde":10000,"total":7639.679999999999,"frete":2270.0,"valorRecebido":5369.679999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3321.6,"vPorLitro":2.3},{"id":1088,"data":"2023-03-13","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDC":3200},"qtde":3200,"total":3520.0000000000005,"frete":0,"valorRecebido":3520.0000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1089,"data":"2023-03-14","cliente":"MARCOS FALCÃO","nf":"785","areas":{"C":7800},"qtde":7800,"total":3528.0,"frete":1900.0,"valorRecebido":1628.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2205.0,"vPorLitro":1.6},{"id":1090,"data":"2023-03-14","cliente":"RAFAEL - MACEIÓ","nf":"786","areas":{"MDC":3000},"qtde":3000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1091,"data":"2023-03-16","cliente":"FRYSK","nf":"788","areas":{"C":10000},"qtde":10000,"total":6425.28,"frete":2170.0,"valorRecebido":4255.28,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2793.6,"vPorLitro":2.3},{"id":1092,"data":"2023-03-16","cliente":"FRYSK","nf":"789","areas":{"C":8700},"qtde":8700,"total":6300.39,"frete":1951.0,"valorRecebido":4349.39,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2739.3,"vPorLitro":2.3},{"id":1093,"data":"2023-03-17","cliente":"FRYSK","nf":"790","areas":{"C":10000},"qtde":10000,"total":7074.57,"frete":2054.0,"valorRecebido":5020.57,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3075.9,"vPorLitro":2.3},{"id":1094,"data":"2023-03-17","cliente":"FRYSK","nf":"791","areas":{"C":7400,"D":1600},"qtde":9000,"total":7843.919999999999,"frete":2142.0,"valorRecebido":5701.919999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3410.4,"vPorLitro":2.3},{"id":1095,"data":"2023-03-20","cliente":"MARLY - COCO VIDA","nf":"793","areas":{"MDC":3500},"qtde":3500,"total":3850.0000000000005,"frete":0,"valorRecebido":3850.0000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1096,"data":"2023-03-21","cliente":"GILDO - CEASA","nf":"794","areas":{"A1":8000},"qtde":8000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1097,"data":"2023-03-21","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDC":2500},"qtde":2500,"total":2625.0,"frete":0,"valorRecebido":2625.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1098,"data":"2023-03-21","cliente":"FRYSK","nf":"795","areas":{"B":1600,"D":8400},"qtde":10000,"total":8967.699999999999,"frete":2328.0,"valorRecebido":6639.699999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3899.0,"vPorLitro":2.3},{"id":1099,"data":"2023-03-22","cliente":"FRYSK","nf":"796","areas":{"B":10100},"qtde":10100,"total":7963.98,"frete":2125.0,"valorRecebido":5838.98,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3462.6,"vPorLitro":2.3},{"id":1100,"data":"2023-03-22","cliente":"ASSIS - CAMPINAS","nf":"797","areas":{"MDC":10000},"qtde":10000,"total":21000.0,"frete":9500.0,"valorRecebido":11500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1101,"data":"2023-03-22","cliente":"FRYSK","nf":"798","areas":{"B":8000,"MA":2000},"qtde":10000,"total":7437.74,"frete":2104.0,"valorRecebido":5333.74,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3233.8,"vPorLitro":2.3},{"id":1102,"data":"2023-03-22","cliente":"FRYSK","nf":"799","areas":{"B":10000},"qtde":10000,"total":8021.249999999999,"frete":2130.0,"valorRecebido":5891.249999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3487.5,"vPorLitro":2.3},{"id":1103,"data":"2023-03-23","cliente":"FRYSK","nf":"800","areas":{"B":2000,"D":7100},"qtde":9100,"total":7854.499999999999,"frete":2056.0,"valorRecebido":5798.499999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3415.0,"vPorLitro":2.3},{"id":1104,"data":"2023-03-23","cliente":"FRYSK","nf":"801","areas":{"D":10000},"qtde":10000,"total":8398.679999999998,"frete":2144.0,"valorRecebido":6254.6799999999985,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3651.6,"vPorLitro":2.3},{"id":1105,"data":"2023-03-23","cliente":"FRYSK","nf":"802","areas":{"D":10500},"qtde":10500,"total":9194.25,"frete":2490.0,"valorRecebido":6704.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3997.5,"vPorLitro":2.3},{"id":1106,"data":"2023-03-24","cliente":"CEARÁ - CAMPINAS","nf":"803","areas":{"MA":9000},"qtde":9000,"total":9900.0,"frete":0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1107,"data":"2023-03-24","cliente":"FRYSK","nf":"804","areas":{"D":10000,"MA":2000},"qtde":12000,"total":9985.68,"frete":2475.0,"valorRecebido":7510.68,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4341.6,"vPorLitro":2.3},{"id":1108,"data":"2023-03-27","cliente":"FRYSK","nf":"805","areas":{"D":10000},"qtde":10000,"total":8653.06,"frete":2156.0,"valorRecebido":6497.0599999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3762.2,"vPorLitro":2.3},{"id":1109,"data":"2023-03-27","cliente":"FRYSK","nf":"806","areas":{"A1":7200,"D":2800},"qtde":10000,"total":8044.0199999999995,"frete":2135.0,"valorRecebido":5909.0199999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3497.4,"vPorLitro":2.3},{"id":1110,"data":"2023-03-28","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDB":2600},"qtde":2600,"total":2730.0,"frete":0,"valorRecebido":2730.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1111,"data":"2023-03-28","cliente":"ASSIS - CAMPINAS","nf":"807","areas":{"MA":900,"MDB":8100},"qtde":9000,"total":18900.0,"frete":9000.0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1112,"data":"2023-03-28","cliente":"CEARÁ - CAMPINAS","nf":"809","areas":{"MDC":5300,"MDB":2700},"qtde":8000,"total":8800.0,"frete":0,"valorRecebido":8800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1113,"data":"2023-03-28","cliente":"RAFAEL - MACEIÓ","nf":"810","areas":{"MDB":3500},"qtde":3500,"total":3850.0000000000005,"frete":0,"valorRecebido":3850.0000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1114,"data":"2023-03-29","cliente":"FRYSK","nf":"821","areas":{"C":5200,"MDC":2200,"MDB":2600},"qtde":10000,"total":7351.49,"frete":2167.0,"valorRecebido":5184.49,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3196.3,"vPorLitro":2.3},{"id":1115,"data":"2023-03-29","cliente":"FRYSK","nf":"822","areas":{"A1":4400,"B":4100,"C":1500},"qtde":10000,"total":8878.92,"frete":2150.0,"valorRecebido":6728.92,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3860.4,"vPorLitro":2.3},{"id":1116,"data":"2023-03-31","cliente":"MARCELLA - CEAGESP","nf":"823","areas":{"A1":10000},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1117,"data":"2023-04-03","cliente":"RAFAEL - MACEIÓ","nf":"RECIBO","areas":{"A2":1400,"MDC":2100},"qtde":3500,"total":3850.0000000000005,"frete":0,"valorRecebido":3850.0000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1118,"data":"2023-04-03","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":1100,"MDC":2100},"qtde":3200,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1119,"data":"2023-04-03","cliente":"MARCOS FALCÃO","nf":"825","areas":{"A1":8000},"qtde":8000,"total":4178.25,"frete":1900.0,"valorRecebido":2278.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3095.0,"vPorLitro":1.35},{"id":1120,"data":"2023-04-04","cliente":"GILDO - CEASA","nf":"826","areas":{"A1":8000},"qtde":8000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1121,"data":"2023-04-04","cliente":"FRYSK","nf":"827","areas":{"A1":8000,"A2":2000},"qtde":10000,"total":8179.719999999999,"frete":2036.0,"valorRecebido":6143.719999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3556.4,"vPorLitro":2.3},{"id":1122,"data":"2023-04-06","cliente":"ASSIS - CAMPINAS","nf":"828","areas":{"MA":2000,"MDB":6000},"qtde":8000,"total":17600.0,"frete":7600.0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1123,"data":"2023-04-10","cliente":"CEARÁ - CAMPINAS","nf":"829","areas":{"MA":10000},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1124,"data":"2023-04-10","cliente":"GILDO - CEASA","nf":"RECIBO","areas":{"A2":8000},"qtde":8000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1125,"data":"2023-04-11","cliente":"RAFAEL - MACEIÓ","nf":"838","areas":{"A2":2900,"MA":600},"qtde":3500,"total":3850.0000000000005,"frete":0,"valorRecebido":3850.0000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1126,"data":"2023-04-11","cliente":"MARCELLA - CEAGESP","nf":"839","areas":{"A2":600,"MDC":3900,"MDB":5500},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1127,"data":"2023-04-12","cliente":"NETO - PIRACICABA","nf":"840","areas":{"MDB":8000},"qtde":8000,"total":19200.0,"frete":8800.0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1128,"data":"2023-04-12","cliente":"MARCOS FALCÃO","nf":"841","areas":{"A2":5000,"MDB":3000},"qtde":8000,"total":5166.450000000001,"frete":1900.0,"valorRecebido":3266.4500000000007,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3827.0,"vPorLitro":1.35},{"id":1129,"data":"2023-04-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"842","areas":{"A1":7000,"A2":1100,"MDB":1900},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1130,"data":"2023-04-14","cliente":"MARCELLA - CEAGESP","nf":"843","areas":{"A1":4500,"A2":4700},"qtde":9200,"total":10120.0,"frete":0,"valorRecebido":10120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1131,"data":"2023-04-17","cliente":"GILDO - CEASA","nf":"RECIBO","areas":{"A1":8000},"qtde":8000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1132,"data":"2023-04-18","cliente":"TITIL - INDAIATUBA","nf":"844","areas":{"MDC":8000},"qtde":8000,"total":8800.0,"frete":0,"valorRecebido":8800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1133,"data":"2023-04-18","cliente":"FRYSK","nf":"845","areas":{"A1":9000},"qtde":9000,"total":8739.08,"frete":2032.0,"valorRecebido":6707.08,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3799.6,"vPorLitro":2.3},{"id":1134,"data":"2023-04-18","cliente":"FRYSK","nf":"846","areas":{"D":9800},"qtde":9800,"total":8458.71,"frete":1722.0,"valorRecebido":6736.709999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3677.7,"vPorLitro":2.3},{"id":1135,"data":"2023-04-19","cliente":"FRYSK","nf":"847","areas":{"D":10000},"qtde":10000,"total":8064.719999999999,"frete":2462.0,"valorRecebido":5602.719999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3506.4,"vPorLitro":2.3},{"id":1136,"data":"2023-04-19","cliente":"FRYSK","nf":"848","areas":{"D":10000},"qtde":10000,"total":10963.64,"frete":2068.0,"valorRecebido":8895.64,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4766.8,"vPorLitro":2.3},{"id":1137,"data":"2023-04-19","cliente":"FRYSK","nf":"850","areas":{"D":9460},"qtde":9460,"total":9090.98,"frete":2007.0,"valorRecebido":7083.98,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3952.6,"vPorLitro":2.3},{"id":1138,"data":"2023-04-20","cliente":"ALEXANDRE - MT","nf":"851","areas":{"A1":7000,"A2":1200},"qtde":8200,"total":8580.0,"frete":0,"valorRecebido":8580.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1139,"data":"2023-04-20","cliente":"GILDO - CEASA","nf":"RECIBO","areas":{"A1":7600,"D":400},"qtde":8000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1140,"data":"2023-04-24","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":2700},"qtde":2700,"total":2700.0,"frete":0,"valorRecebido":2700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1141,"data":"2023-04-24","cliente":"FRYSK","nf":"853","areas":{"D":8000},"qtde":8000,"total":8297.02,"frete":2036.0,"valorRecebido":6261.02,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3607.4,"vPorLitro":2.3},{"id":1142,"data":"2023-04-24","cliente":"FRYSK","nf":"854","areas":{"D":10500},"qtde":10500,"total":9069.359999999999,"frete":2260.0,"valorRecebido":6809.359999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3943.2,"vPorLitro":2.3},{"id":1143,"data":"2023-04-24","cliente":"FRYSK","nf":"855","areas":{"C":5600,"D":5400},"qtde":11000,"total":9167.8,"frete":2339.0,"valorRecebido":6828.799999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3986.0,"vPorLitro":2.3},{"id":1144,"data":"2023-04-25","cliente":"CEARÁ - CAMPINAS","nf":"856","areas":{"MA":5000,"MDC":5500},"qtde":10500,"total":11550.000000000002,"frete":0,"valorRecebido":11550.000000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1145,"data":"2023-04-25","cliente":"MAIKE - COCO MACENA","nf":"857","areas":{"A1":16000},"qtde":16000,"total":17600.0,"frete":0,"valorRecebido":17600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1146,"data":"2023-04-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"860","areas":{"A1":3100,"A2":7900},"qtde":11000,"total":11550.0,"frete":0,"valorRecebido":11550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1147,"data":"2023-04-26","cliente":"FRYSK","nf":"861","areas":{"A1":2000,"A2":8000},"qtde":10000,"total":11185.819999999998,"frete":2658.0,"valorRecebido":8527.819999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4863.4,"vPorLitro":2.3},{"id":1148,"data":"2023-04-27","cliente":"MIGUEL - CUIABÁ","nf":"870","areas":{"A1":3500,"B":12100},"qtde":15600,"total":14040.0,"frete":0,"valorRecebido":14040.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1149,"data":"2023-04-27","cliente":"ASSIS - CAMPINAS","nf":"871","areas":{"MDC":5500,"MDB":2500},"qtde":8000,"total":17200.0,"frete":8000.0,"valorRecebido":9200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1150,"data":"2023-04-27","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDB":2600},"qtde":2600,"total":2600.0,"frete":0,"valorRecebido":2600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1151,"data":"2023-04-28","cliente":"ALEXANDRE - MT","nf":"872","areas":{"B":7000},"qtde":7000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1152,"data":"2023-04-28","cliente":"LINCOLN - CAMPO GRANDE","nf":"873","areas":{"A2":4900,"B":2500,"MA":2600},"qtde":10000,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1153,"data":"2023-04-28","cliente":"FRYSK","nf":"874","areas":{"B":9000},"qtde":9000,"total":8068.629999999999,"frete":2268.0,"valorRecebido":5800.629999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3508.1,"vPorLitro":2.3},{"id":1154,"data":"2023-04-28","cliente":"FRYSK","nf":"875","areas":{"A2":3000,"B":6000},"qtde":9000,"total":8701.359999999999,"frete":2190.0,"valorRecebido":6511.359999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3783.2,"vPorLitro":2.3},{"id":1155,"data":"2023-05-03","cliente":"MIGUEL - CUIABÁ","nf":"876","areas":{"C":16000},"qtde":16000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1156,"data":"2023-05-03","cliente":"FRYSK","nf":"877","areas":{"A2":3000,"C":6000},"qtde":9000,"total":8299.32,"frete":2236.0,"valorRecebido":6063.32,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3608.4,"vPorLitro":2.3},{"id":1157,"data":"2023-05-03","cliente":"FRYSK","nf":"878","areas":{"C":9000},"qtde":9000,"total":7008.79,"frete":1881.0,"valorRecebido":5127.79,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3047.3,"vPorLitro":2.3},{"id":1158,"data":"2023-05-03","cliente":"GLAUBER - BH","nf":"879","areas":{"C":4500,"MDB":7500},"qtde":12000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1159,"data":"2023-05-08","cliente":"ALEXANDRE - MT","nf":"883","areas":{"MDC":1700,"MDB":6800},"qtde":8500,"total":9350.0,"frete":0,"valorRecebido":9350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1160,"data":"2023-05-08","cliente":"ASSIS - CAMPINAS","nf":"884","areas":{"MA":2400,"MDC":5600},"qtde":8000,"total":17200.0,"frete":8000.0,"valorRecebido":9200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1161,"data":"2023-05-09","cliente":"LINCOLN - CAMPO GRANDE","nf":"885","areas":{"A1":8300,"D":1700},"qtde":10000,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1162,"data":"2023-05-10","cliente":"GLAUBER - BH","nf":"889","areas":{"A1":7700,"A2":3400,"MA":900},"qtde":12000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1163,"data":"2023-05-11","cliente":"FRYSK","nf":"890","areas":{"A1":9000},"qtde":9000,"total":9494.859999999999,"frete":2293.0,"valorRecebido":7201.859999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4128.2,"vPorLitro":2.3},{"id":1164,"data":"2023-05-12","cliente":"FRYSK","nf":"891","areas":{"A1":9000},"qtde":9000,"total":10481.789999999999,"frete":2250.0,"valorRecebido":8231.789999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1165,"data":"2023-05-12","cliente":"MIGUEL - CUIABÁ","nf":"892","areas":{"A1":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1166,"data":"2023-05-15","cliente":"ASSIS - CAMPINAS","nf":"893","areas":{"MA":8000},"qtde":8000,"total":17200.0,"frete":8000.0,"valorRecebido":9200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1167,"data":"2023-05-15","cliente":"FRYSK","nf":"894","areas":{"D":8000},"qtde":8000,"total":9748.55,"frete":2144.0,"valorRecebido":7604.549999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1168,"data":"2023-05-15","cliente":"FRYSK","nf":"895","areas":{"D":8000},"qtde":8000,"total":8228.25,"frete":2203.0,"valorRecebido":6025.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3577.5,"vPorLitro":2.3},{"id":1169,"data":"2023-05-16","cliente":"FRYSK","nf":"896","areas":{"B":2800,"D":8200},"qtde":11000,"total":9492.099999999999,"frete":2321.0,"valorRecebido":7171.0999999999985,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4127.0,"vPorLitro":2.3},{"id":1170,"data":"2023-05-16","cliente":"FRYSK","nf":"897","areas":{"D":11000},"qtde":11000,"total":10959.96,"frete":2205.0,"valorRecebido":8754.96,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4765.2,"vPorLitro":2.3},{"id":1171,"data":"2023-05-16","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MA":2200},"qtde":2200,"total":2090.0,"frete":0,"valorRecebido":2090.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1172,"data":"2023-05-17","cliente":"MIGUEL - CUIABÁ","nf":"898","areas":{"D":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1173,"data":"2023-05-17","cliente":"FRYSK","nf":"899","areas":{"D":10000},"qtde":10000,"total":10231.78,"frete":2315.0,"valorRecebido":7916.780000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4448.6,"vPorLitro":2.3},{"id":1174,"data":"2023-05-18","cliente":"FRYSK","nf":"900","areas":{"B":9000,"MA":2000},"qtde":11000,"total":8775.88,"frete":2099.0,"valorRecebido":6676.879999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3815.6,"vPorLitro":2.3},{"id":1175,"data":"2023-05-18","cliente":"FRYSK","nf":"907","areas":{"B":12000},"qtde":12000,"total":8552.779999999999,"frete":2282.0,"valorRecebido":6270.779999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3718.6,"vPorLitro":2.3},{"id":1176,"data":"2023-05-19","cliente":"ALEXANDRE - MT","nf":"908","areas":{"MA":3000,"MDC":1000,"MDB":3500},"qtde":7500,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1177,"data":"2023-05-19","cliente":"FRYSK","nf":"909","areas":{"B":8500,"D":500,"MA":1000},"qtde":10000,"total":8320.25,"frete":1980.0,"valorRecebido":6340.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3617.5,"vPorLitro":2.3},{"id":1178,"data":"2023-05-22","cliente":"FRYSK","nf":"910","areas":{"A2":10000},"qtde":10000,"total":11971.039999999999,"frete":2199.0,"valorRecebido":9772.039999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1179,"data":"2023-05-23","cliente":"FRYSK","nf":"913","areas":{"A2":5900,"B":6100},"qtde":12000,"total":9409.99,"frete":2394.0,"valorRecebido":7015.99,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4091.3,"vPorLitro":2.3},{"id":1180,"data":"2023-05-23","cliente":"FRYSK","nf":"914","areas":{"B":4600,"C":6600},"qtde":11200,"total":8843.039999999999,"frete":2187.0,"valorRecebido":6656.039999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3844.8,"vPorLitro":2.3},{"id":1181,"data":"2023-05-24","cliente":"MIGUEL - CUIABÁ","nf":"915","areas":{"A1":5500,"A2":5000,"D":7500},"qtde":18000,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1182,"data":"2023-05-25","cliente":"FRYSK","nf":"916","areas":{"A1":1000,"A2":6000,"D":5000},"qtde":12000,"total":10417.159999999998,"frete":2499.0,"valorRecebido":7918.159999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4529.2,"vPorLitro":2.3},{"id":1183,"data":"2023-05-26","cliente":"FRYSK","nf":"917","areas":{"A1":6000,"D":4000},"qtde":10000,"total":8634.429999999998,"frete":1953.0,"valorRecebido":6681.4299999999985,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3754.1,"vPorLitro":2.3},{"id":1184,"data":"2023-05-26","cliente":"FRYSK","nf":"918","areas":{"A1":11000,"D":1000},"qtde":12000,"total":10193.14,"frete":2287.0,"valorRecebido":7906.139999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4431.8,"vPorLitro":2.3},{"id":1185,"data":"2023-05-29","cliente":"CEARÁ - CAMPINAS","nf":"919","areas":{"MDC":8500},"qtde":8500,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1186,"data":"2023-05-30","cliente":"ASSIS - CAMPINAS","nf":"920","areas":{"MDC":4100,"MDB":4400},"qtde":8500,"total":18275.0,"frete":8500.0,"valorRecebido":9775.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1187,"data":"2023-06-02","cliente":"FRYSK","nf":"930","areas":{"A1":11560},"qtde":11560,"total":8156.34,"frete":2311.0,"valorRecebido":5845.34,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4531.3,"vPorLitro":1.8},{"id":1188,"data":"2023-06-02","cliente":"FRYSK","nf":"931","areas":{"A1":11000},"qtde":11000,"total":6502.320000000001,"frete":2128.0,"valorRecebido":4374.320000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3612.4,"vPorLitro":1.8},{"id":1189,"data":"2023-06-02","cliente":"FRYSK","nf":"932","areas":{"A1":11000},"qtde":11000,"total":6736.14,"frete":2163.0,"valorRecebido":4573.14,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3742.3,"vPorLitro":1.8},{"id":1190,"data":"2023-06-02","cliente":"FRYSK","nf":"933","areas":{"A1":11000},"qtde":11000,"total":6974.64,"frete":2142.0,"valorRecebido":4832.64,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3874.8,"vPorLitro":1.8},{"id":1191,"data":"2023-06-05","cliente":"ASSIS - CAMPINAS","nf":"934","areas":{"MDB":8000},"qtde":8000,"total":17200.0,"frete":8000.0,"valorRecebido":9200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1192,"data":"2023-06-05","cliente":"ALEXANDRE - MT","nf":"935","areas":{"MDC":3200,"MDB":4600},"qtde":7800,"total":8580.0,"frete":0,"valorRecebido":8580.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1193,"data":"2023-06-07","cliente":"DIEGO - LINHARES","nf":"936","areas":{"A1":11500,"C":5500},"qtde":17000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1194,"data":"2023-06-07","cliente":"GLAUBER - BH","nf":"937","areas":{"A1":12000},"qtde":12000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1195,"data":"2023-06-08","cliente":"CEARÁ - CAMPINAS","nf":"938","areas":{"MA":10500},"qtde":10500,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1196,"data":"2023-06-08","cliente":"FRYSK","nf":"939","areas":{"A1":6000,"C":900,"MA":2100},"qtde":9000,"total":6393.360000000001,"frete":2023.0,"valorRecebido":4370.360000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3760.8,"vPorLitro":1.7},{"id":1197,"data":"2023-06-12","cliente":"DIEGO - LINHARES","nf":"946","areas":{"A1":15000,"D":1000},"qtde":16000,"total":12800.0,"frete":0,"valorRecebido":12800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1198,"data":"2023-06-13","cliente":"DIEGO - LINHARES","nf":"947","areas":{"D":20000},"qtde":20000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1199,"data":"2023-06-14","cliente":"FRYSK","nf":"948","areas":{"A1":9000},"qtde":9000,"total":5270.0,"frete":1904.0,"valorRecebido":3366.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3100.0,"vPorLitro":1.7},{"id":1200,"data":"2023-06-14","cliente":"FRYSK","nf":"949","areas":{"A1":3000,"D":6000},"qtde":9000,"total":5993.69,"frete":1861.0,"valorRecebido":4132.69,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3525.7,"vPorLitro":1.7},{"id":1201,"data":"2023-06-19","cliente":"NECTTARE","nf":"950","areas":{"D":10000},"qtde":10000,"total":6240.0,"frete":2600.0,"valorRecebido":3640.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3900.0,"vPorLitro":1.6},{"id":1202,"data":"2023-06-19","cliente":"NECTTARE","nf":"951","areas":{"D":10000},"qtde":10000,"total":7040.0,"frete":2500.0,"valorRecebido":4540.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4400.0,"vPorLitro":1.6},{"id":1203,"data":"2023-06-20","cliente":"ALEXANDRE - MT","nf":"952","areas":{"MA":8800},"qtde":8800,"total":8800.0,"frete":0,"valorRecebido":8800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1204,"data":"2023-06-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"953","areas":{"A2":6200,"MA":4800},"qtde":11000,"total":11550.0,"frete":0,"valorRecebido":11550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1205,"data":"2023-06-21","cliente":"PAULO - SINOP","nf":"954","areas":{"A2":3900,"MDC":13000,"MDB":4100},"qtde":21000,"total":18900.0,"frete":0,"valorRecebido":18900.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1206,"data":"2023-06-23","cliente":"MARCOS FALCÃO","nf":"955","areas":{"A2":7500,"MA":1500},"qtde":9000,"total":5229.599999999999,"frete":1900.0,"valorRecebido":3329.5999999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4358.0,"vPorLitro":1.2},{"id":1207,"data":"2023-06-23","cliente":"FRYSK","nf":"956","areas":{"A2":3500,"MA":6500},"qtde":10000,"total":7942.74,"frete":2232.0,"valorRecebido":5710.74,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4672.2,"vPorLitro":1.7},{"id":1208,"data":"2023-06-23","cliente":"FRYSK","nf":"957","areas":{"D":8000,"MDC":2300,"MDB":700},"qtde":11000,"total":9014.76,"frete":2422.0,"valorRecebido":6592.76,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":5302.8,"vPorLitro":1.7},{"id":1209,"data":"2023-06-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"958","areas":{"A2":10000},"qtde":10000,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1210,"data":"2023-06-27","cliente":"CEARÁ - CAMPINAS","nf":"959","areas":{"A2":4600,"MDC":4400},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1211,"data":"2023-06-28","cliente":"ASSIS - CAMPINAS","nf":"960","areas":{"MDC":5000,"MDB":3500},"qtde":8500,"total":17000.0,"frete":8500.0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1212,"data":"2023-06-29","cliente":"GLAUBER - BH","nf":"965","areas":{"A2":6500,"D":6500},"qtde":13000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1213,"data":"2023-06-29","cliente":"MARCOS FALCÃO","nf":"966","areas":{"A2":9000},"qtde":9000,"total":5282.4,"frete":0,"valorRecebido":5282.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4402.0,"vPorLitro":1.2},{"id":1214,"data":"2023-06-29","cliente":"MARCOS FALCÃO","nf":"967","areas":{"A2":9000},"qtde":9000,"total":4340.4,"frete":0,"valorRecebido":4340.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3617.0,"vPorLitro":1.2},{"id":1215,"data":"2023-06-30","cliente":"MARIA - CEAGESP","nf":"968","areas":{"D":2700,"MDB":6300},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1216,"data":"2023-06-30","cliente":"LINCOLN - CAMPO GRANDE","nf":"969","areas":{"D":1600,"MA":1900,"MDB":7500},"qtde":11000,"total":11550.0,"frete":0,"valorRecebido":11550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1217,"data":"2023-07-03","cliente":"GLAUBER - BH","nf":"971","areas":{"A2":2500,"B":13500},"qtde":16000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1218,"data":"2023-07-04","cliente":"MARCOS FALCÃO","nf":"972","areas":{"A1":3000,"C":3000,"D":3000},"qtde":9000,"total":4508.4,"frete":1900.0,"valorRecebido":2608.3999999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3757.0,"vPorLitro":1.2},{"id":1219,"data":"2023-07-04","cliente":"LINCOLN - CAMPO GRANDE","nf":"973","areas":{"A1":10500},"qtde":10500,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1220,"data":"2023-07-05","cliente":"MARCOS FALCÃO","nf":"975","areas":{"A1":5000,"C":1500,"D":2500},"qtde":9000,"total":5227.2,"frete":1900.0,"valorRecebido":3327.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4356.0,"vPorLitro":1.2},{"id":1221,"data":"2023-07-05","cliente":"MARCOS FALCÃO","nf":"976","areas":{"A1":4500,"D":4500},"qtde":9000,"total":5106.0,"frete":1900.0,"valorRecebido":3206.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4255.0,"vPorLitro":1.2},{"id":1222,"data":"2023-07-07","cliente":"MARCOS FALCÃO","nf":"977","areas":{"A1":4000,"B":5000},"qtde":9000,"total":4210.8,"frete":1900.0,"valorRecebido":2310.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3509.0,"vPorLitro":1.2},{"id":1223,"data":"2023-07-07","cliente":"ALEXANDRE - MT","nf":"978","areas":{"MA":7250},"qtde":7250,"total":7250.0,"frete":0,"valorRecebido":7250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1224,"data":"2023-07-10","cliente":"MARCOS FALCÃO","nf":"979","areas":{"B":8000,"MA":1000},"qtde":9000,"total":3914.3999999999996,"frete":1900.0,"valorRecebido":2014.3999999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3262.0,"vPorLitro":1.2},{"id":1225,"data":"2023-07-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"980","areas":{"MA":9100,"MDB":900},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1226,"data":"2023-07-11","cliente":"FRYSK","nf":"981","areas":{"B":2000,"MA":7000},"qtde":9000,"total":7096.160000000001,"frete":1820.0,"valorRecebido":5276.160000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4435.1,"vPorLitro":1.6},{"id":1227,"data":"2023-07-11","cliente":"FRYSK","nf":"982","areas":{"B":12000},"qtde":12000,"total":6486.880000000001,"frete":1978.2,"valorRecebido":4508.680000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4054.3,"vPorLitro":1.6},{"id":1228,"data":"2023-07-12","cliente":"FRYSK","nf":"983","areas":{"B":12000},"qtde":12000,"total":6418.240000000001,"frete":2062.8,"valorRecebido":4355.4400000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4011.4,"vPorLitro":1.6},{"id":1229,"data":"2023-07-13","cliente":"MIGUEL - CUIABÁ","nf":"984","areas":{"A1":1400,"D":14600},"qtde":16000,"total":12800.0,"frete":0,"valorRecebido":12800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1230,"data":"2023-07-15","cliente":"LINCOLN - CAMPO GRANDE","nf":"985","areas":{"MDC":7500,"MDB":3500},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1231,"data":"2023-07-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"986","areas":{"MDC":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1232,"data":"2023-07-18","cliente":"ALEXANDRE - MT","nf":"987","areas":{"MDC":7500},"qtde":7500,"total":7500.0,"frete":0,"valorRecebido":7500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1233,"data":"2023-07-19","cliente":"FRYSK","nf":"988","areas":{"A1":4000,"C":4000,"D":4000},"qtde":12000,"total":6597.12,"frete":2115.0,"valorRecebido":4482.12,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4123.2,"vPorLitro":1.6},{"id":1234,"data":"2023-07-19","cliente":"FRYSK","nf":"989","areas":{"C":12000},"qtde":12000,"total":7000.160000000001,"frete":2331.9,"valorRecebido":4668.26,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4375.1,"vPorLitro":1.6},{"id":1235,"data":"2023-07-20","cliente":"FRYSK","nf":"990","areas":{"A1":10000,"C":1800},"qtde":11800,"total":7788.4800000000005,"frete":2086.2,"valorRecebido":5702.280000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4867.8,"vPorLitro":1.6},{"id":1236,"data":"2023-07-21","cliente":"LINCOLN - CAMPO GRANDE","nf":"991","areas":{"A2":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1237,"data":"2023-07-22","cliente":"FRYSK","nf":"992","areas":{"C":12000},"qtde":12000,"total":5431.360000000001,"frete":1799.3,"valorRecebido":3632.0600000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3394.6,"vPorLitro":1.6},{"id":1238,"data":"2023-07-22","cliente":"FRYSK","nf":"993","areas":{"C":9700},"qtde":9700,"total":8386.880000000001,"frete":2533.65,"valorRecebido":5853.230000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1239,"data":"2023-07-24","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":2500},"qtde":2500,"total":2000.0,"frete":0,"valorRecebido":2000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1240,"data":"2023-07-25","cliente":"LINCOLN - CAMPO GRANDE","nf":"994","areas":{"MDB":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1241,"data":"2023-07-25","cliente":"CEARÁ - CAMPINAS","nf":"995","areas":{"MDB":8500},"qtde":8500,"total":7650.0,"frete":0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1242,"data":"2023-07-27","cliente":"ASSIS - CAMPINAS","nf":"1004","areas":{"A2":8000},"qtde":8000,"total":15200.0,"frete":8000.0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1243,"data":"2023-07-31","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A2":2200},"qtde":2200,"total":1760.0,"frete":0,"valorRecebido":1760.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1244,"data":"2023-07-31","cliente":"ALEXANDRE - MT","nf":"1005","areas":{"A2":2000,"MA":8000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1245,"data":"2023-07-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1006","areas":{"MA":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1246,"data":"2023-08-02","cliente":"TITIL - INDAIATUBA","nf":"1007","areas":{"A2":4400,"MA":3600},"qtde":8000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1247,"data":"2023-08-02","cliente":"MARCOS FALCÃO","nf":"1008","areas":{"D":9000},"qtde":9000,"total":3998.5000000000005,"frete":1900.0,"valorRecebido":2098.5000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3635.0,"vPorLitro":1.1},{"id":1248,"data":"2023-08-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1009","areas":{"D":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1249,"data":"2023-08-03","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"D":3000},"qtde":3000,"total":2250.0,"frete":0,"valorRecebido":2250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1250,"data":"2023-08-03","cliente":"FRYSK","nf":"1010","areas":{"A2":12000},"qtde":12000,"total":8821.12,"frete":2468.1,"valorRecebido":6353.02,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":5513.2,"vPorLitro":1.6},{"id":1251,"data":"2023-08-04","cliente":"FRYSK","nf":"1011","areas":{"A1":1000,"A2":3000,"D":7000},"qtde":11000,"total":7425.12,"frete":2120.4,"valorRecebido":5304.719999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4640.7,"vPorLitro":1.6},{"id":1252,"data":"2023-08-04","cliente":"ASSIS - CAMPINAS","nf":"1012","areas":{"D":8500},"qtde":8500,"total":16150.0,"frete":8500.0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1253,"data":"2023-08-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1013","areas":{"MDC":10000,"MDB":1000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1254,"data":"2023-08-07","cliente":"RAFAEL - MACEIÓ","nf":"1014","areas":{"MDC":3000},"qtde":3000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1255,"data":"2023-08-08","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDC":3200},"qtde":3200,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1256,"data":"2023-08-09","cliente":"MARCOS FALCÃO","nf":"1015","areas":{"D":5000,"MA":4000},"qtde":9000,"total":4433.0,"frete":1900.0,"valorRecebido":2533.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4030.0,"vPorLitro":1.1},{"id":1257,"data":"2023-08-09","cliente":"LINCOLN - CAMPO GRANDE","nf":"1016","areas":{"A1":3000,"A2":1000,"MDC":7000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1258,"data":"2023-08-10","cliente":"EDVANEIDE - HORTOLANDIA","nf":"1017","areas":{"A1":4250},"qtde":4250,"total":3400.0,"frete":0,"valorRecebido":3400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1259,"data":"2023-08-10","cliente":"NETO - PIRACICABA","nf":"1018","areas":{"A1":4250},"qtde":4250,"total":3400.0,"frete":0,"valorRecebido":3400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1260,"data":"2023-08-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1019","areas":{"A2":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1261,"data":"2023-08-14","cliente":"ALEXANDRE - MT","nf":"1020","areas":{"A2":9000,"MDB":2000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1262,"data":"2023-08-14","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDB":2000},"qtde":2000,"total":1600.0,"frete":0,"valorRecebido":1600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1263,"data":"2023-08-14","cliente":"LINCOLN - CAMPO GRANDE","nf":"1022","areas":{"MDB":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1264,"data":"2023-08-15","cliente":"FRYSK","nf":"1023","areas":{"A2":11000},"qtde":11000,"total":7237.12,"frete":2119.45,"valorRecebido":5117.67,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4523.2,"vPorLitro":1.6},{"id":1265,"data":"2023-08-15","cliente":"FRYSK","nf":"1024","areas":{"A2":11000},"qtde":11000,"total":8574.560000000001,"frete":2273.35,"valorRecebido":6301.210000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":5359.1,"vPorLitro":1.6},{"id":1266,"data":"2023-08-16","cliente":"FRYSK","nf":"1025","areas":{"A2":11000},"qtde":11000,"total":6964.0,"frete":1855.35,"valorRecebido":5108.65,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4352.5,"vPorLitro":1.6},{"id":1267,"data":"2023-08-16","cliente":"NETO - PIRACICABA","nf":"1028","areas":{"MA":1700,"MDB":2800},"qtde":4500,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1268,"data":"2023-08-16","cliente":"CARLÃO FALECIDO","nf":"1029","areas":{"MA":2000},"qtde":2000,"total":1800.0,"frete":0,"valorRecebido":1800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1269,"data":"2023-08-16","cliente":"RAFAEL - MACEIÓ","nf":"1030","areas":{"MA":2000},"qtde":2000,"total":1800.0,"frete":0,"valorRecebido":1800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1270,"data":"2023-08-17","cliente":"FRYSK","nf":"1031","areas":{"A2":11000},"qtde":11000,"total":6428.0,"frete":2229.65,"valorRecebido":4198.35,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4017.5,"vPorLitro":1.6},{"id":1271,"data":"2023-08-17","cliente":"FRYSK","nf":"1032","areas":{"A2":22000},"qtde":22000,"total":11330.720000000001,"frete":3150.0,"valorRecebido":8180.720000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":7081.7,"vPorLitro":1.6},{"id":1272,"data":"2023-08-18","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"MDB":2700},"qtde":2700,"total":2025.0,"frete":0,"valorRecebido":2025.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1273,"data":"2023-08-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"1034","areas":{"MA":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1274,"data":"2023-08-21","cliente":"ASSIS - CAMPINAS","nf":"1035","areas":{"A2":4300,"MA":2600,"MDB":1100},"qtde":8000,"total":15200.0,"frete":8000.0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1275,"data":"2023-08-22","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A2":1400,"MDC":1800},"qtde":3200,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1276,"data":"2023-08-23","cliente":"LINCOLN - CAMPO GRANDE","nf":"1041","areas":{"A1":8800,"D":2200},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1277,"data":"2023-08-23","cliente":"CARLÃO FALECIDO","nf":"1042","areas":{"MDC":4000},"qtde":4000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1278,"data":"2023-08-23","cliente":"RAFAEL - MACEIÓ","nf":"1043","areas":{"MDC":4500},"qtde":4500,"total":4050.0,"frete":0,"valorRecebido":4050.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1279,"data":"2023-08-24","cliente":"NECTTARE","nf":"1044","areas":{"D":11000},"qtde":11000,"total":7950.0,"frete":3879.8,"valorRecebido":4070.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":5300.0,"vPorLitro":1.5},{"id":1280,"data":"2023-08-24","cliente":"NECTTARE","nf":"1045","areas":{"D":11000},"qtde":11000,"total":6750.0,"frete":3163.08,"valorRecebido":3586.92,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4500.0,"vPorLitro":1.5},{"id":1281,"data":"2023-08-25","cliente":"NECTTARE","nf":"1046","areas":{"A2":5000,"D":11000,"MA":2000},"qtde":18000,"total":12750.0,"frete":5135.0,"valorRecebido":7615.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":8500.0,"vPorLitro":1.5},{"id":1282,"data":"2023-08-28","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDC":2000},"qtde":2000,"total":1600.0,"frete":0,"valorRecebido":1600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1283,"data":"2023-08-28","cliente":"LINCOLN - CAMPO GRANDE","nf":"1047","areas":{"D":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1284,"data":"2023-08-28","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1048","areas":{"D":800,"MDC":7600,"MDB":1600},"qtde":10000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1285,"data":"2023-08-29","cliente":"ALEXANDRE - MT","nf":"1049","areas":{"D":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1286,"data":"2023-08-30","cliente":"MIGUEL - CUIABÁ","nf":"1050","areas":{"A1":1700,"C":1100,"D":15200},"qtde":18000,"total":11700.0,"frete":0,"valorRecebido":11700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1287,"data":"2023-08-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1051","areas":{"A1":6200,"MDB":3800},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1288,"data":"2023-08-31","cliente":"MARCOS FALCÃO","nf":"1052","areas":{"D":5000,"MA":4000},"qtde":9000,"total":4197.6,"frete":1900.0,"valorRecebido":2297.6000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3816.0,"vPorLitro":1.1},{"id":1289,"data":"2023-08-31","cliente":"MARCOS FALCÃO","nf":"1053","areas":{"D":5000,"MA":4000},"qtde":9000,"total":4969.8,"frete":1900.0,"valorRecebido":3069.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1290,"data":"2023-09-01","cliente":"CEARÁ - CAMPINAS","nf":"1054","areas":{"MDB":8500},"qtde":8500,"total":7650.0,"frete":0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1291,"data":"2023-09-04","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDB":2000},"qtde":2000,"total":1600.0,"frete":0,"valorRecebido":1600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1292,"data":"2023-09-04","cliente":"MIGUEL - CUIABÁ","nf":"1055","areas":{"A1":5400,"A2":11400,"D":3600},"qtde":20400,"total":13260.0,"frete":0,"valorRecebido":13260.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1293,"data":"2023-09-05","cliente":"MARCOS FALCÃO","nf":"1056","areas":{"D":5000,"MA":4000},"qtde":9000,"total":3499.1000000000004,"frete":1900.0,"valorRecebido":1599.1000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3181.0,"vPorLitro":1.1},{"id":1294,"data":"2023-09-05","cliente":"MARCOS FALCÃO","nf":"1057","areas":{"D":5000,"MA":4000},"qtde":9000,"total":3449.6000000000004,"frete":1900.0,"valorRecebido":1549.6000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3136.0,"vPorLitro":1.1},{"id":1295,"data":"2023-09-06","cliente":"LINCOLN - CAMPO GRANDE","nf":"1058","areas":{"A2":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1296,"data":"2023-09-06","cliente":"RAFAEL - MACEIÓ","nf":"1059","areas":{"MA":700,"MDB":3300},"qtde":4000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1297,"data":"2023-09-06","cliente":"CARLÃO FALECIDO","nf":"1060","areas":{"MA":4000},"qtde":4000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1298,"data":"2023-09-07","cliente":"MIGUEL - CUIABÁ","nf":"1061","areas":{"B":18000},"qtde":18000,"total":9900.0,"frete":0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1299,"data":"2023-09-08","cliente":"LINCOLN - CAMPO GRANDE","nf":"1062","areas":{"MA":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1300,"data":"2023-09-11","cliente":"FRYSK","nf":"1063","areas":{"A2":10000},"qtde":10000,"total":7507.200000000001,"frete":2286.0,"valorRecebido":5221.200000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4692.0,"vPorLitro":1.6},{"id":1301,"data":"2023-09-11","cliente":"ALEXANDRE - MT","nf":"1064","areas":{"A2":6200,"MA":1800},"qtde":8000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1302,"data":"2023-09-11","cliente":"ASSIS - CAMPINAS","nf":"1065","areas":{"MDC":8500},"qtde":8500,"total":16150.0,"frete":8500.0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1303,"data":"2023-09-12","cliente":"FRYSK","nf":"1066","areas":{"MA":10000},"qtde":10000,"total":8334.72,"frete":2304.0,"valorRecebido":6030.719999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1304,"data":"2023-09-12","cliente":"FRYSK","nf":"1067","areas":{"B":5000,"MA":5000},"qtde":10000,"total":6686.080000000001,"frete":1944.0,"valorRecebido":4742.080000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4178.8,"vPorLitro":1.6},{"id":1305,"data":"2023-09-12","cliente":"FRYSK","nf":"1068","areas":{"B":10000},"qtde":10000,"total":7456.32,"frete":2079.0,"valorRecebido":5377.32,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4660.2,"vPorLitro":1.6},{"id":1306,"data":"2023-09-12","cliente":"FRYSK","nf":"1069","areas":{"B":10000},"qtde":10000,"total":8035.52,"frete":2238.0,"valorRecebido":5797.52,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1307,"data":"2023-09-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1070","areas":{"A1":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1308,"data":"2023-09-13","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1071","areas":{"A1":9000},"qtde":9000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1309,"data":"2023-09-14","cliente":"RAFAEL - MACEIÓ","nf":"1072","areas":{"MDC":8000},"qtde":8000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1310,"data":"2023-09-14","cliente":"MARCELLA - CEAGESP","nf":"1073","areas":{"A1":10000},"qtde":10000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1311,"data":"2023-09-15","cliente":"LINCOLN - CAMPO GRANDE","nf":"1074","areas":{"A1":200,"A2":6300,"MDC":3500},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1312,"data":"2023-09-15","cliente":"CEARÁ - CAMPINAS","nf":"1075","areas":{},"qtde":8500,"total":7650.0,"frete":0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1313,"data":"2023-09-16","cliente":"FRYSK","nf":"1076","areas":{"MA":10000},"qtde":10000,"total":6912.0,"frete":2002.0,"valorRecebido":4910.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4320.0,"vPorLitro":1.6},{"id":1314,"data":"2023-09-16","cliente":"FRYSK","nf":"1077","areas":{"B":5000,"MA":5000},"qtde":10000,"total":7181.6,"frete":2172.0,"valorRecebido":5009.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4488.5,"vPorLitro":1.6},{"id":1315,"data":"2023-09-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"1078","areas":{},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1316,"data":"2023-09-18","cliente":"ASSIS - CAMPINAS","nf":"1079","areas":{"C":1000,"D":7500},"qtde":8500,"total":16150.0,"frete":8500.0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1317,"data":"2023-09-18","cliente":"FRYSK","nf":"1080","areas":{"A1":4000,"A2":3000,"D":3000},"qtde":10000,"total":7117.12,"frete":2427.0,"valorRecebido":4690.12,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4448.2,"vPorLitro":1.6},{"id":1318,"data":"2023-09-19","cliente":"MARCOS FALCÃO","nf":"1081","areas":{"B":10000},"qtde":10000,"total":3129.5000000000005,"frete":1900.0,"valorRecebido":1229.5000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2845.0,"vPorLitro":1.1},{"id":1319,"data":"2023-09-19","cliente":"FRYSK","nf":"1082","areas":{"A2":6000,"MDC":4000},"qtde":10000,"total":7326.880000000001,"frete":2271.0,"valorRecebido":5055.880000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4579.3,"vPorLitro":1.6},{"id":1320,"data":"2023-09-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1083","areas":{},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1321,"data":"2023-09-20","cliente":"MARCELLA - CEAGESP","nf":"1084","areas":{},"qtde":9000,"total":8100.0,"frete":0,"valorRecebido":8100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1322,"data":"2023-09-20","cliente":"MIGUEL - CUIABÁ","nf":"1085","areas":{"D":18000},"qtde":18000,"total":11700.0,"frete":0,"valorRecebido":11700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1323,"data":"2023-09-22","cliente":"NETO - PIRACICABA","nf":"1086","areas":{"MDB":5000},"qtde":5000,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1324,"data":"2023-09-22","cliente":"CARLÃO FALECIDO","nf":"1087","areas":{"MDB":4000},"qtde":4000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1325,"data":"2023-09-22","cliente":"ALEXANDRE - MT","nf":"1088","areas":{},"qtde":8500,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1326,"data":"2023-09-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1089","areas":{},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1327,"data":"2023-09-22","cliente":"MARCELLA - CEAGESP","nf":"1090","areas":{"MDB":8500},"qtde":8500,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1328,"data":"2023-09-25","cliente":"LINCOLN - CAMPO GRANDE","nf":"1091","areas":{"MA":2500,"MDB":7500},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1329,"data":"2023-09-25","cliente":"ASSIS - CAMPINAS","nf":"1092","areas":{"MA":9000},"qtde":9000,"total":18000.0,"frete":9450.0,"valorRecebido":8550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1330,"data":"2023-09-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1093","areas":{"A2":7000},"qtde":7000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1331,"data":"2023-09-26","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1094","areas":{},"qtde":9000,"total":7650.0,"frete":0,"valorRecebido":7650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1332,"data":"2023-09-26","cliente":"MARCELLA - CEAGESP","nf":"1095","areas":{"A2":8500},"qtde":8500,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1333,"data":"2023-09-27","cliente":"MIGUEL - CUIABÁ","nf":"1096","areas":{"C":17000},"qtde":17000,"total":12750.0,"frete":0,"valorRecebido":12750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1334,"data":"2023-09-28","cliente":"MIGUEL - CUIABÁ","nf":"1099","areas":{"A1":9700,"C":9300},"qtde":19000,"total":14250.0,"frete":0,"valorRecebido":14250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1335,"data":"2023-09-29","cliente":"ALEXANDRE - MT","nf":"1100","areas":{"MDC":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1336,"data":"2023-09-29","cliente":"RAFAEL - MACEIÓ","nf":"1110","areas":{"MA":700,"MDC":7300},"qtde":8000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1337,"data":"2023-09-29","cliente":"MARCELLA - CEAGESP","nf":"1111","areas":{},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1338,"data":"2023-09-29","cliente":"LINCOLN - CAMPO GRANDE","nf":"1112","areas":{"A2":8200,"MA":7800},"qtde":16000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1339,"data":"2023-10-02","cliente":"JACIARA - FEIRA DE SANTANA","nf":"RECIBO","areas":{},"qtde":9000,"total":8100.0,"frete":0,"valorRecebido":8100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1340,"data":"2023-10-02","cliente":"LINCOLN - CAMPO GRANDE","nf":"1115","areas":{"A1":1300,"A2":9700},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1341,"data":"2023-10-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1116","areas":{"A1":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1342,"data":"2023-10-03","cliente":"MARCOS FALCÃO","nf":"1117","areas":{"A1":8000},"qtde":10000,"total":3690.5000000000005,"frete":1900.0,"valorRecebido":1790.5000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3355.0,"vPorLitro":1.1},{"id":1343,"data":"2023-10-03","cliente":"MIGUEL - CUIABÁ","nf":"1120","areas":{"A1":19000},"qtde":19000,"total":15200.0,"frete":0,"valorRecebido":15200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1344,"data":"2023-10-04","cliente":"MARCOS FALCÃO","nf":"1121","areas":{"A1":8000},"qtde":10000,"total":3417.7000000000003,"frete":1900.0,"valorRecebido":1517.7000000000003,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3107.0,"vPorLitro":1.1},{"id":1345,"data":"2023-10-04","cliente":"LINCOLN - CAMPO GRANDE","nf":"1122","areas":{"A1":3200,"D":6800},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1346,"data":"2023-10-06","cliente":"MIGUEL - CUIABÁ","nf":"1124","areas":{"B":19000},"qtde":19000,"total":15200.0,"frete":0,"valorRecebido":15200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1347,"data":"2023-10-06","cliente":"LINCOLN - CAMPO GRANDE","nf":"1125","areas":{"D":1000,"MDB":15000},"qtde":16000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1348,"data":"2023-10-09","cliente":"MARCOS FALCÃO","nf":"1126","areas":{"D":8000},"qtde":10000,"total":2465.1000000000004,"frete":1900.0,"valorRecebido":565.1000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2241.0,"vPorLitro":1.1},{"id":1349,"data":"2023-10-09","cliente":"MIGUEL - CUIABÁ","nf":"1127","areas":{"B":3800,"D":13200},"qtde":17000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1350,"data":"2023-10-10","cliente":"MIGUEL - CUIABÁ","nf":"1128","areas":{"D":18000},"qtde":18000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1351,"data":"2023-10-11","cliente":"LINCOLN - CAMPO GRANDE","nf":"1129","areas":{"D":9400,"MDB":600},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1352,"data":"2023-10-13","cliente":"ALEXANDRE - MT","nf":"1130","areas":{"MA":4000,"MDB":4000},"qtde":8000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1353,"data":"2023-10-13","cliente":"JONATHAN - MG","nf":"1131","areas":{"MA":8000},"qtde":8000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1354,"data":"2023-10-16","cliente":"LINCOLN - CAMPO GRANDE","nf":"1132","areas":{"A2":3900,"MA":6100},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1355,"data":"2023-10-17","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1133","areas":{"A2":9000},"qtde":9000,"total":8100.0,"frete":0,"valorRecebido":8100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1356,"data":"2023-10-17","cliente":"MIGUEL - CUIABÁ","nf":"1134","areas":{"A2":600,"C":18400},"qtde":19000,"total":15200.0,"frete":0,"valorRecebido":15200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1357,"data":"2023-10-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"1135","areas":{"A2":16000},"qtde":16000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1358,"data":"2023-10-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1136","areas":{"A2":900,"MDC":10100},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1359,"data":"2023-10-23","cliente":"ALEXANDRE - MT","nf":"1137","areas":{"MDC":8000},"qtde":8000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1360,"data":"2023-10-23","cliente":"MIGUEL - CUIABÁ","nf":"1138","areas":{"A1":17000,"MDC":1000},"qtde":18000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1361,"data":"2023-10-24","cliente":"RAFAEL - MACEIÓ","nf":"1139","areas":{"A1":1500},"qtde":1500,"total":1500.0,"frete":0,"valorRecebido":1500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1362,"data":"2023-10-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1140","areas":{"A1":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1363,"data":"2023-10-24","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1141","areas":{"A1":9000},"qtde":9000,"total":8100.0,"frete":0,"valorRecebido":8100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1364,"data":"2023-10-25","cliente":"MIGUEL - CUIABÁ","nf":"1142","areas":{"A1":4000,"B":13000,"D":3000},"qtde":20000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1365,"data":"2023-10-27","cliente":"LINCOLN - CAMPO GRANDE","nf":"1143","areas":{"D":9500,"MDB":500},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1366,"data":"2023-10-30","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1144","areas":{"D":9000},"qtde":9000,"total":8100.0,"frete":0,"valorRecebido":8100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1367,"data":"2023-10-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1145","areas":{"D":4200,"MDB":6800},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1368,"data":"2023-11-01","cliente":"MIGUEL - CUIABÁ","nf":"1146","areas":{"B":1000,"C":6700,"D":5000,"MDB":5300},"qtde":18000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1369,"data":"2023-11-03","cliente":"CEARÁ - CAMPINAS","nf":"1147","areas":{"MA":1800,"MDB":8200},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1370,"data":"2023-11-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1148","areas":{"MA":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1371,"data":"2023-11-06","cliente":"LINCOLN - CAMPO GRANDE","nf":"1149","areas":{"A2":4700,"MA":5300},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1372,"data":"2023-11-06","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1150","areas":{"A2":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1373,"data":"2023-11-07","cliente":"MARCOS FALCÃO","nf":"1151","areas":{"B":5000,"C":3000},"qtde":8000,"total":2403.5,"frete":1900.0,"valorRecebido":503.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2185.0,"vPorLitro":1.1},{"id":1374,"data":"2023-11-07","cliente":"CARLÃO FALECIDO","nf":"1152","areas":{"A2":8000},"qtde":8000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1375,"data":"2023-11-08","cliente":"LINCOLN - CAMPO GRANDE","nf":"1153","areas":{"A2":2500,"MDC":8500},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1376,"data":"2023-11-08","cliente":"MIGUEL - CUIABÁ","nf":"1154","areas":{"A1":5300,"C":13700},"qtde":19000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1377,"data":"2023-11-09","cliente":"TITIL - INDAIATUBA","nf":"1155","areas":{"A1":700,"MDC":7300},"qtde":8000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1378,"data":"2023-11-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"1156","areas":{"A1":11000},"qtde":11000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1379,"data":"2023-11-10","cliente":"MIGUEL - CUIABÁ","nf":"1157","areas":{"A1":18500},"qtde":18500,"total":18500.0,"frete":0,"valorRecebido":18500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1380,"data":"2023-11-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1158","areas":{"A1":2500,"D":1000,"MDB":6500},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1381,"data":"2023-11-14","cliente":"MIGUEL - CUIABÁ","nf":"1159","areas":{"B":7000,"D":11000},"qtde":18000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1382,"data":"2023-11-14","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1160","areas":{"B":8000,"D":1000},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1383,"data":"2023-11-17","cliente":"LINCOLN - CAMPO GRANDE","nf":"1161","areas":{"D":6600,"MDB":9400},"qtde":16000,"total":17600.0,"frete":0,"valorRecebido":17600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1384,"data":"2023-11-17","cliente":"DAIANE - ARACAJU","nf":"1162","areas":{"MA":3000},"qtde":3000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1385,"data":"2023-11-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1163","areas":{"D":2200,"MA":7800},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1386,"data":"2023-11-20","cliente":"CARLÃO FALECIDO","nf":"1164","areas":{"A2":3200,"D":4800},"qtde":8000,"total":9600.0,"frete":0,"valorRecebido":9600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1387,"data":"2023-11-21","cliente":"RAFAEL - MACEIÓ","nf":"1165","areas":{"A2":3000},"qtde":3000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1388,"data":"2023-11-21","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1166","areas":{"A2":10000},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1389,"data":"2023-11-21","cliente":"DAIANE - ARACAJU","nf":"1167","areas":{"A2":900,"MA":2100},"qtde":3000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1390,"data":"2023-11-23","cliente":"LINCOLN - CAMPO GRANDE","nf":"1168","areas":{"C":1900,"MDB":9100},"qtde":11000,"total":13200.0,"frete":0,"valorRecebido":13200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1391,"data":"2023-11-23","cliente":"DAIANE - ARACAJU","nf":"1169","areas":{"C":4000},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1392,"data":"2023-11-25","cliente":"LINCOLN - CAMPO GRANDE","nf":"1171","areas":{"A1":11000},"qtde":11000,"total":13200.0,"frete":0,"valorRecebido":13200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1393,"data":"2023-11-28","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1172","areas":{"A1":9000},"qtde":9000,"total":11700.0,"frete":0,"valorRecebido":11700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1394,"data":"2023-11-29","cliente":"DAIANE - ARACAJU","nf":"1173","areas":{"A1":3000},"qtde":3000,"total":3900.0,"frete":0,"valorRecebido":3900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1395,"data":"2023-12-01","cliente":"DAIANE - ARACAJU","nf":"1174","areas":{"MDB":3000},"qtde":3000,"total":3900.0,"frete":0,"valorRecebido":3900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1396,"data":"2023-12-04","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1175","areas":{"MA":1500,"MDB":6500},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1397,"data":"2023-12-04","cliente":"LINCOLN - CAMPO GRANDE","nf":"1177","areas":{"A1":2000,"MA":8000},"qtde":10000,"total":13000.0,"frete":0,"valorRecebido":13000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1398,"data":"2023-12-04","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"A1":3000},"qtde":3000,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1399,"data":"2023-12-05","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1178","areas":{"A1":9000},"qtde":9000,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1400,"data":"2023-12-05","cliente":"DAIANE - ARACAJU","nf":"1179","areas":{"A1":1800,"D":1700},"qtde":3500,"total":4900.0,"frete":0,"valorRecebido":4900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1401,"data":"2023-12-05","cliente":"RAMON - ARACAJU","nf":"1180","areas":{"D":3500},"qtde":3500,"total":4900.0,"frete":0,"valorRecebido":4900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1402,"data":"2023-12-06","cliente":"MARCOS FALCÃO","nf":"1181","areas":{"B":4500,"C":4500},"qtde":9000,"total":4912.0,"frete":1900.0,"valorRecebido":3012.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":2456.0,"vPorLitro":2.0},{"id":1403,"data":"2023-12-06","cliente":"LINCOLN - CAMPO GRANDE","nf":"1183","areas":{"C":1700,"D":8300},"qtde":10000,"total":14000.0,"frete":0,"valorRecebido":14000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1404,"data":"2023-12-07","cliente":"RAFAEL - MACEIÓ","nf":"1184","areas":{"A2":8000},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1405,"data":"2023-12-07","cliente":"CARLÃO FALECIDO","nf":"1185","areas":{"A2":5000,"C":3000},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1406,"data":"2023-12-08","cliente":"DAIANE - ARACAJU","nf":"1186","areas":{"C":3000},"qtde":3000,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1407,"data":"2023-12-08","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"C":3000},"qtde":3000,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1408,"data":"2023-12-11","cliente":"LINCOLN - CAMPO GRANDE","nf":"1187","areas":{"D":2200,"MDC":8800},"qtde":11000,"total":15399.999999999998,"frete":0,"valorRecebido":15399.999999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1409,"data":"2023-12-11","cliente":"DAIANE - ARACAJU","nf":"1188","areas":{"D":3000},"qtde":3000,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1410,"data":"2023-12-11","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1189","areas":{"D":9000},"qtde":9000,"total":13500.0,"frete":0,"valorRecebido":13500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1411,"data":"2023-12-12","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1190","areas":{"B":2700,"C":1500,"D":3800},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1412,"data":"2023-12-13","cliente":"DAIANE - ARACAJU","nf":"1191","areas":{"B":3500},"qtde":3500,"total":5250.0,"frete":0,"valorRecebido":5250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1413,"data":"2023-12-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1192","areas":{"B":11000},"qtde":11000,"total":16500.0,"frete":0,"valorRecebido":16500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1414,"data":"2023-12-14","cliente":"PRETO DO COCO - ARACAJU","nf":"RECIBO","areas":{"B":3000},"qtde":3000,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1415,"data":"2023-12-15","cliente":"LINCOLN - CAMPO GRANDE","nf":"1193","areas":{"A1":4100,"B":3000,"C":6900},"qtde":14000,"total":21000.0,"frete":0,"valorRecebido":21000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1416,"data":"2023-12-15","cliente":"DAIANE - ARACAJU","nf":"1194","areas":{"A1":3500},"qtde":3500,"total":5250.0,"frete":0,"valorRecebido":5250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1417,"data":"2023-12-18","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1195","areas":{"A1":9000},"qtde":9000,"total":13500.0,"frete":0,"valorRecebido":13500.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1418,"data":"2023-12-18","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1196","areas":{"A1":8000},"qtde":8000,"total":12800.0,"frete":0,"valorRecebido":12800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1419,"data":"2023-12-18","cliente":"DAIANE - ARACAJU","nf":"1197","areas":{"A1":4000},"qtde":4000,"total":6400.0,"frete":0,"valorRecebido":6400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1420,"data":"2023-12-19","cliente":"LINCOLN - CAMPO GRANDE","nf":"1198","areas":{"A1":4000,"MA":4100,"MDB":6900},"qtde":15000,"total":22500.0,"frete":0,"valorRecebido":22500.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1421,"data":"2023-12-20","cliente":"DAIANE - ARACAJU","nf":"1199","areas":{"A1":2000,"C":2000},"qtde":4000,"total":6400.0,"frete":0,"valorRecebido":6400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1422,"data":"2023-12-20","cliente":"CARLÃO FALECIDO","nf":"1200","areas":{"C":6700,"D":1300},"qtde":8000,"total":12800.0,"frete":0,"valorRecebido":12800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1423,"data":"2023-12-21","cliente":"DAIANE - ARACAJU","nf":"1201","areas":{"D":3000},"qtde":3000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1424,"data":"2023-12-22","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1202","areas":{"D":6000},"qtde":6000,"total":9600.0,"frete":0,"valorRecebido":9600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1425,"data":"2023-12-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1203","areas":{"A2":11000},"qtde":11000,"total":17600.0,"frete":0,"valorRecebido":17600.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1426,"data":"2023-12-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1204","areas":{"A2":9500,"MA":1500},"qtde":11000,"total":17600.0,"frete":0,"valorRecebido":17600.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1427,"data":"2023-12-27","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1205","areas":{"D":5300,"MA":2700},"qtde":8000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1428,"data":"2023-12-27","cliente":"DAIANE - ARACAJU","nf":"1206","areas":{"D":4000},"qtde":4000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1429,"data":"2023-12-28","cliente":"DAIANE - ARACAJU","nf":"1207","areas":{"D":4000},"qtde":4000,"total":6800.0,"frete":0,"valorRecebido":6800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1430,"data":"2023-12-28","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1208","areas":{"D":5300,"MDC":3700},"qtde":9000,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1431,"data":"2023-12-29","cliente":"DAIANE - ARACAJU","nf":"1209","areas":{"MDC":3500},"qtde":3500,"total":5950.0,"frete":0,"valorRecebido":5950.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1432,"data":"2024-01-02","cliente":"LINCOLN - CAMPO GRANDE","nf":"1210","areas":{"B":4800,"MDC":5200},"qtde":10000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1433,"data":"2024-01-03","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1211","areas":{"B":8000},"qtde":8000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1434,"data":"2024-01-03","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1212","areas":{"A1":2200,"B":6800},"qtde":9000,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1435,"data":"2024-01-03","cliente":"DAIANE - ARACAJU","nf":"1213","areas":{"A1":3000},"qtde":3000,"total":5100.0,"frete":0,"valorRecebido":5100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1436,"data":"2024-01-04","cliente":"LINCOLN - CAMPO GRANDE","nf":"1214","areas":{"A1":10000},"qtde":10000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1437,"data":"2024-01-04","cliente":"CARLÃO FALECIDO","nf":"1215","areas":{"C":8000},"qtde":8000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1438,"data":"2024-01-04","cliente":"DAIANE - ARACAJU","nf":"1216","areas":{"A1":3500},"qtde":3500,"total":5950.0,"frete":0,"valorRecebido":5950.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1439,"data":"2024-01-08","cliente":"DAIANE - ARACAJU","nf":"1217","areas":{"A1":3000},"qtde":3000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1440,"data":"2024-01-08","cliente":"LINCOLN - CAMPO GRANDE","nf":"1218","areas":{"A1":5000,"MDB":6000},"qtde":11000,"total":18700.0,"frete":0,"valorRecebido":18700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1441,"data":"2024-01-08","cliente":"SEVERINO - CAMPINAS","nf":"1219","areas":{"MA":3200,"MDB":4800},"qtde":8000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1442,"data":"2024-01-09","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1220","areas":{"A1":8000},"qtde":8000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1443,"data":"2024-01-09","cliente":"TOMOHIDE - BA","nf":"1221","areas":{},"qtde":8000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1444,"data":"2024-01-09","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1222","areas":{"A1":5500,"C":3500},"qtde":9000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1445,"data":"2024-01-10","cliente":"DAIANE - ARACAJU","nf":"1223","areas":{"A2":3000},"qtde":3000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1446,"data":"2024-01-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"1225","areas":{"D":11000},"qtde":11000,"total":18700.0,"frete":0,"valorRecebido":18700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1447,"data":"2024-01-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1226","areas":{"C":8000,"D":2000},"qtde":10000,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1448,"data":"2024-01-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1227","areas":{"D":1000,"MA":10000},"qtde":11000,"total":19800.0,"frete":0,"valorRecebido":19800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1449,"data":"2024-01-12","cliente":"DAIANE - ARACAJU","nf":"1228","areas":{"D":1800,"MA":1200},"qtde":3000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1450,"data":"2024-01-15","cliente":"LINCOLN - CAMPO GRANDE","nf":"1229","areas":{"A2":16000},"qtde":16000,"total":28800.0,"frete":0,"valorRecebido":28800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1451,"data":"2024-01-15","cliente":"SEVERINO - CAMPINAS","nf":"1230","areas":{"A2":9500},"qtde":9500,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1452,"data":"2024-01-16","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1231","areas":{"D":9000},"qtde":9000,"total":17100.0,"frete":0,"valorRecebido":17100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1453,"data":"2024-01-16","cliente":"DAIANE - ARACAJU","nf":"1232","areas":{"A2":800,"D":2200},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1454,"data":"2024-01-17","cliente":"CEARÁ - CAMPINAS","nf":"1233","areas":{"D":4000,"MDC":1000},"qtde":5000,"total":9500.0,"frete":0,"valorRecebido":9500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1455,"data":"2024-01-18","cliente":"DAIANE - ARACAJU","nf":"1234","areas":{"MDC":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1456,"data":"2024-01-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1235","areas":{"MDC":10000},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1457,"data":"2024-01-22","cliente":"TOMOHIDE - BA","nf":"1236","areas":{"A1":3000,"MDC":3000},"qtde":6000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1458,"data":"2024-01-22","cliente":"DAIANE - ARACAJU","nf":"1237","areas":{"A1":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1459,"data":"2024-01-23","cliente":"MARCOS FALCÃO","nf":"1238","areas":{"B":8500},"qtde":8500,"total":8386.2,"frete":1900.0,"valorRecebido":6486.200000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":3106.0,"vPorLitro":2.7},{"id":1460,"data":"2024-01-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1239","areas":{"A1":11000},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1461,"data":"2024-01-24","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1240","areas":{"A1":7000},"qtde":7000,"total":13300.0,"frete":0,"valorRecebido":13300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1462,"data":"2024-01-25","cliente":"DAIANE - ARACAJU","nf":"1241","areas":{"MDB":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1463,"data":"2024-01-25","cliente":"GEORGE - VITTA FRUTAS","nf":"1242","areas":{"A1":800,"C":6800,"MDB":10000},"qtde":17600,"total":33440.0,"frete":0,"valorRecebido":33440.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1464,"data":"2024-01-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1243","areas":{"A1":7500,"B":2500},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1465,"data":"2024-01-26","cliente":"DAIANE - ARACAJU","nf":"1244","areas":{"B":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1466,"data":"2024-01-29","cliente":"LINCOLN - CAMPO GRANDE","nf":"1245","areas":{"MA":10000},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1467,"data":"2024-01-30","cliente":"DAIANE - ARACAJU","nf":"1246","areas":{"MA":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1468,"data":"2024-01-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1247","areas":{"B":5000,"C":6000},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1469,"data":"2024-01-31","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1248","areas":{"C":3700,"D":5300},"qtde":9000,"total":17100.0,"frete":0,"valorRecebido":17100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1470,"data":"2024-02-01","cliente":"DAIANE - ARACAJU","nf":"1249","areas":{"D":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1471,"data":"2024-02-01","cliente":"GEORGE - VITTA FRUTAS","nf":"1250","areas":{"A2":2500,"D":14500,"MA":3000},"qtde":20000,"total":38000.0,"frete":0,"valorRecebido":38000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1472,"data":"2024-02-05","cliente":"LINCOLN - CAMPO GRANDE","nf":"1251","areas":{"A2":10000},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1473,"data":"2024-02-05","cliente":"CEARÁ - CAMPINAS","nf":"1252","areas":{"A2":9000},"qtde":9000,"total":17100.0,"frete":0,"valorRecebido":17100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1474,"data":"2024-02-06","cliente":"DAIANE - ARACAJU","nf":"1253","areas":{"A2":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1475,"data":"2024-02-08","cliente":"LINCOLN - CAMPO GRANDE","nf":"1254","areas":{"A2":2000,"D":2300,"MDC":6700},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1476,"data":"2024-02-08","cliente":"DAIANE - ARACAJU","nf":"1255","areas":{"MDC":3500},"qtde":3500,"total":6650.0,"frete":0,"valorRecebido":6650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1477,"data":"2024-02-09","cliente":"CEARÁ - CAMPINAS","nf":"1256","areas":{"A1":9000},"qtde":9000,"total":17100.0,"frete":0,"valorRecebido":17100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1478,"data":"2024-02-09","cliente":"DAIANE - ARACAJU","nf":"1257","areas":{"A1":3500},"qtde":3500,"total":6650.0,"frete":0,"valorRecebido":6650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1479,"data":"2024-02-14","cliente":"CEARÁ - CAMPINAS","nf":"1258","areas":{"MDC":6500,"MDB":2500},"qtde":9000,"total":17100.0,"frete":0,"valorRecebido":17100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1480,"data":"2024-02-14","cliente":"LINCOLN - CAMPO GRANDE","nf":"1259","areas":{"MDB":11000},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1481,"data":"2024-02-15","cliente":"NOELTON - SP","nf":"1262","areas":{"A1":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1482,"data":"2024-02-16","cliente":"ASSIS - CAMPINAS","nf":"1263","areas":{"A1":8200,"MA":300},"qtde":8500,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1483,"data":"2024-02-16","cliente":"LINCOLN - CAMPO GRANDE","nf":"1264","areas":{"MA":10000},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1484,"data":"2024-02-16","cliente":"DAIANE - ARACAJU","nf":"1265","areas":{"MA":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1485,"data":"2024-02-20","cliente":"NETO - PIRACICABA","nf":"1266","areas":{"C":5000,"D":3000},"qtde":8000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1486,"data":"2024-02-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1267","areas":{"B":3000,"D":9000},"qtde":12000,"total":22800.0,"frete":0,"valorRecebido":22800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1487,"data":"2024-02-20","cliente":"CEARÁ - CAMPINAS","nf":"1268","areas":{"D":7000},"qtde":7000,"total":14000.0,"frete":0,"valorRecebido":14000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1488,"data":"2024-02-21","cliente":"TITIL - INDAIATUBA","nf":"1269","areas":{"B":3000,"D":5000},"qtde":8000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1489,"data":"2024-02-21","cliente":"RAFAEL - MACEIÓ","nf":"1270","areas":{"B":3600,"D":4900},"qtde":8500,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1490,"data":"2024-02-22","cliente":"ALDO SERGIO - CURITIBA","nf":"1272","areas":{"A2":8000,"MA":2000},"qtde":10000,"total":32000.0,"frete":10800.0,"valorRecebido":21200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1491,"data":"2024-02-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1273","areas":{"A2":10000},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1492,"data":"2024-02-22","cliente":"DAIANE - ARACAJU","nf":"1274","areas":{"A2":3500},"qtde":3500,"total":6650.0,"frete":0,"valorRecebido":6650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1493,"data":"2024-02-23","cliente":"CEARÁ - CAMPINAS","nf":"1275","areas":{"B":4500,"C":5500},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1494,"data":"2024-02-26","cliente":"ASSIS - CAMPINAS","nf":"1276","areas":{"A1":3300,"C":5700},"qtde":9000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1495,"data":"2024-02-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1277","areas":{"A1":11000},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1496,"data":"2024-02-27","cliente":"CEARÁ - CAMPINAS","nf":"1278","areas":{"A1":4500,"A2":3500,"MDC":2000},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1497,"data":"2024-02-27","cliente":"RAFAEL - MACEIÓ","nf":"1279","areas":{"MDC":8000},"qtde":8000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1498,"data":"2024-02-27","cliente":"NETO - PIRACICABA","nf":"1280","areas":{"MDC":6500,"MDB":1500},"qtde":8000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1499,"data":"2024-02-28","cliente":"LINCOLN - CAMPO GRANDE","nf":"1281","areas":{"MDB":11000},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1500,"data":"2024-02-29","cliente":"DAIANE - ARACAJU","nf":"1282","areas":{"A1":3500},"qtde":3500,"total":6650.0,"frete":0,"valorRecebido":6650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1501,"data":"2024-03-01","cliente":"LINCOLN - CAMPO GRANDE","nf":"1283","areas":{"A1":11000},"qtde":11000,"total":20900.0,"frete":0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1502,"data":"2024-03-04","cliente":"LINCOLN - CAMPO GRANDE","nf":"1284","areas":{"A1":5500,"MA":2700,"MDC":1800},"qtde":10000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1503,"data":"2024-03-04","cliente":"DAIANE - ARACAJU","nf":"1285","areas":{"MA":3000},"qtde":3000,"total":5700.0,"frete":0,"valorRecebido":5700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1504,"data":"2024-03-07","cliente":"ASSIS - CAMPINAS","nf":"1286","areas":{"MA":9000},"qtde":9000,"total":27900.0,"frete":8800.0,"valorRecebido":19100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1505,"data":"2024-03-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1287","areas":{"D":9700,"MA":300},"qtde":10000,"total":19000.0,"frete":0,"valorRecebido":19000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1506,"data":"2024-03-07","cliente":"DAIANE - ARACAJU","nf":"1288","areas":{"D":3500},"qtde":3500,"total":6650.0,"frete":0,"valorRecebido":6650.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1507,"data":"2024-03-11","cliente":"LINCOLN - CAMPO GRANDE","nf":"1289","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1508,"data":"2024-03-12","cliente":"ASSIS - CAMPINAS","nf":"1290","areas":{"A2":9000},"qtde":9000,"total":29700.0,"frete":8800.0,"valorRecebido":20900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1509,"data":"2024-03-12","cliente":"EDGAR - SP","nf":"1291","areas":{"D":8000},"qtde":8000,"total":18400.0,"frete":0,"valorRecebido":18400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1510,"data":"2024-03-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1293","areas":{"A2":7500,"C":3500},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1511,"data":"2024-03-13","cliente":"DAIANE - ARACAJU","nf":"1294","areas":{"D":3000},"qtde":3000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1512,"data":"2024-03-14","cliente":"GLAUBER - BH","nf":"1295","areas":{"MDC":12000},"qtde":12000,"total":26400.000000000004,"frete":0,"valorRecebido":26400.000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1513,"data":"2024-03-14","cliente":"ALDO SERGIO - CURITIBA","nf":"1296","areas":{"MDC":2000},"qtde":2000,"total":4400.0,"frete":0,"valorRecebido":4400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1514,"data":"2024-03-15","cliente":"DAIANE - ARACAJU","nf":"1297","areas":{"C":3000},"qtde":3000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1515,"data":"2024-03-15","cliente":"CEARÁ - CAMPINAS","nf":"1298","areas":{"C":8200,"D":1800},"qtde":10000,"total":21000.0,"frete":0,"valorRecebido":21000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1516,"data":"2024-03-15","cliente":"LINCOLN - CAMPO GRANDE","nf":"1300","areas":{"D":5500,"MDC":3000,"MDB":2500},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1517,"data":"2024-03-18","cliente":"DAIANE - ARACAJU","nf":"1301","areas":{"A1":3000},"qtde":3000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1518,"data":"2024-03-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"1302","areas":{"A1":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1519,"data":"2024-03-18","cliente":"EDGAR - SP","nf":"1303","areas":{"A1":2800,"MDB":6200},"qtde":9000,"total":21600.0,"frete":0,"valorRecebido":21600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1520,"data":"2024-03-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1304","areas":{"A1":6200,"C":2300,"MDB":2500},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1521,"data":"2024-03-21","cliente":"ALDO SERGIO - CURITIBA","nf":"1305","areas":{"B":10000},"qtde":10000,"total":34000.0,"frete":10800.0,"valorRecebido":23200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1522,"data":"2024-03-21","cliente":"ASSIS - CAMPINAS","nf":"1307","areas":{"B":9000},"qtde":9000,"total":31500.0,"frete":8800.0,"valorRecebido":22700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1523,"data":"2024-03-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1308","areas":{"A1":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1524,"data":"2024-03-22","cliente":"CEARÁ - CAMPINAS","nf":"1310","areas":{"A1":7100,"MA":1400},"qtde":8500,"total":18700.0,"frete":0,"valorRecebido":18700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1525,"data":"2024-03-22","cliente":"DAIANE - ARACAJU","nf":"1311","areas":{"MA":3000},"qtde":3000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1526,"data":"2024-03-25","cliente":"DAIANE - ARACAJU","nf":"1312","areas":{"D":3000},"qtde":3000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1527,"data":"2024-03-25","cliente":"CEARÁ - CAMPINAS","nf":"1313","areas":{"D":10500},"qtde":10500,"total":24675.0,"frete":0,"valorRecebido":24675.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1528,"data":"2024-03-28","cliente":"DAIANE - ARACAJU","nf":"1314","areas":{"A2":3500},"qtde":3500,"total":7350.0,"frete":0,"valorRecebido":7350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1529,"data":"2024-03-28","cliente":"NOELTON - SP","nf":"1315","areas":{"A2":9000},"qtde":9000,"total":19800.0,"frete":0,"valorRecebido":19800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1530,"data":"2024-03-28","cliente":"ALDO SERGIO - CURITIBA","nf":"1316","areas":{"A2":9000},"qtde":9000,"total":31500.0,"frete":9600.0,"valorRecebido":21900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1531,"data":"2024-03-28","cliente":"ASSIS - CAMPINAS","nf":"1318","areas":{"A2":5000,"MA":4000},"qtde":9000,"total":31500.0,"frete":8800.0,"valorRecebido":22700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1532,"data":"2024-04-01","cliente":"LINCOLN - CAMPO GRANDE","nf":"1320","areas":{"D":4500,"MA":6500},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1533,"data":"2024-04-01","cliente":"CEARÁ - CAMPINAS","nf":"1329","areas":{"D":8500},"qtde":8500,"total":19975.0,"frete":0,"valorRecebido":19975.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1534,"data":"2024-04-02","cliente":"NOELTON - SP","nf":"1330","areas":{"C":900,"D":8600},"qtde":9500,"total":21850.0,"frete":0,"valorRecebido":21850.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1535,"data":"2024-04-04","cliente":"ALDO SERGIO - CURITIBA","nf":"1331","areas":{"MDC":8500},"qtde":8500,"total":29750.0,"frete":9600.0,"valorRecebido":20150.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1536,"data":"2024-04-04","cliente":"LINCOLN - CAMPO GRANDE","nf":"1333","areas":{"MDC":9000,"MDB":1000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1537,"data":"2024-04-04","cliente":"DAIANE - ARACAJU","nf":"1334","areas":{"C":3000},"qtde":3000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1538,"data":"2024-04-05","cliente":"LEONARDO - CEAGESP","nf":"1335","areas":{"MDC":9000},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1539,"data":"2024-04-05","cliente":"CEARÁ - CAMPINAS","nf":"1336","areas":{"C":4500,"MDC":4500},"qtde":9000,"total":21150.0,"frete":0,"valorRecebido":21150.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1540,"data":"2024-04-08","cliente":"DAIANE - ARACAJU","nf":"1337","areas":{"C":3000},"qtde":3000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1541,"data":"2024-04-08","cliente":"LEONARDO - CEAGESP","nf":"1338","areas":{"A1":2300,"C":6700},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1542,"data":"2024-04-09","cliente":"LINCOLN - CAMPO GRANDE","nf":"1339","areas":{"A1":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1543,"data":"2024-04-10","cliente":"EDGAR - SP","nf":"1341","areas":{"A1":9500},"qtde":9500,"total":22800.0,"frete":0,"valorRecebido":22800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1544,"data":"2024-04-11","cliente":"LEONARDO - CEAGESP","nf":"1342","areas":{"A1":9000},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1545,"data":"2024-04-11","cliente":"DAIANE - ARACAJU","nf":"RECIBO","areas":{"A1":3000},"qtde":3000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1546,"data":"2024-04-12","cliente":"ALDO SERGIO - CURITIBA","nf":"1343","areas":{"A1":8500},"qtde":8500,"total":29750.0,"frete":9600.0,"valorRecebido":20150.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1547,"data":"2024-04-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1345","areas":{"A1":3500,"MA":7500},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1548,"data":"2024-04-15","cliente":"DAIANE - ARACAJU","nf":"RECIBO","areas":{"B":3000},"qtde":3000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1549,"data":"2024-04-15","cliente":"LEONARDO - CEAGESP","nf":"1346","areas":{"A2":8000},"qtde":8000,"total":27200.0,"frete":8800.0,"valorRecebido":18400.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1550,"data":"2024-04-18","cliente":"LEONARDO - CEAGESP","nf":"1347","areas":{"B":9000},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1551,"data":"2024-04-18","cliente":"DAIANE - ARACAJU","nf":"RECIBO","areas":{"B":3000},"qtde":3000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1552,"data":"2024-04-19","cliente":"LINCOLN - CAMPO GRANDE","nf":"1348","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1553,"data":"2024-04-19","cliente":"NOELTON - SP","nf":"1349","areas":{"A2":9000},"qtde":9000,"total":19800.0,"frete":0,"valorRecebido":19800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1554,"data":"2024-04-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1350","areas":{"A2":1500,"MA":8500},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1555,"data":"2024-04-22","cliente":"LEONARDO - CEAGESP","nf":"1351","areas":{"B":6200,"D":400,"MA":2400},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1556,"data":"2024-04-22","cliente":"DAIANE - ARACAJU","nf":"RECIBO","areas":{"D":3000},"qtde":3000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1557,"data":"2024-04-24","cliente":"ALDO SERGIO - CURITIBA","nf":"1352","areas":{"D":9000},"qtde":9000,"total":31500.0,"frete":9600.0,"valorRecebido":21900.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1558,"data":"2024-04-24","cliente":"RAFAEL - MACEIÓ","nf":"1354","areas":{"C":3000,"D":5000},"qtde":8000,"total":17600.0,"frete":0,"valorRecebido":17600.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1559,"data":"2024-04-25","cliente":"LEONARDO - CEAGESP","nf":"1355","areas":{"D":9000},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1560,"data":"2024-04-25","cliente":"ASSIS - CAMPINAS","nf":"1356","areas":{"D":9000},"qtde":9000,"total":30150.0,"frete":8800.0,"valorRecebido":21350.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1561,"data":"2024-04-25","cliente":"LINCOLN - CAMPO GRANDE","nf":"1357","areas":{"D":2500,"MA":7500},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1562,"data":"2024-04-26","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1358","areas":{"MDC":6000},"qtde":6000,"total":11400.0,"frete":0,"valorRecebido":11400.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1563,"data":"2024-04-26","cliente":"NECTTARE","nf":"1359","areas":{"B":3000,"C":1100,"D":2900,"MDC":2000},"qtde":9000,"total":12800.0,"frete":3200.0,"valorRecebido":9600.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4000.0,"vPorLitro":3.2},{"id":1564,"data":"2024-04-29","cliente":"LINCOLN - CAMPO GRANDE","nf":"1360","areas":{"MDC":6000,"MDB":4000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1565,"data":"2024-04-29","cliente":"LEONARDO - CEAGESP","nf":"1361","areas":{"MDB":9000},"qtde":9000,"total":30600.0,"frete":8800.0,"valorRecebido":21800.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1566,"data":"2024-04-29","cliente":"DAIANE - ARACAJU","nf":"RECIBO","areas":{"MDB":3000},"qtde":3000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1567,"data":"2024-04-30","cliente":"LINCOLN - CAMPO GRANDE","nf":"1362","areas":{"C":10400,"MDB":600},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1568,"data":"2024-05-02","cliente":"ASSIS - CAMPINAS","nf":"1363","areas":{"A1":6800,"C":2200},"qtde":9000,"total":27900.0,"frete":8800.0,"valorRecebido":19100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1569,"data":"2024-05-02","cliente":"LEONARDO - CEAGESP","nf":"1364","areas":{"A1":8500},"qtde":8500,"total":28900.0,"frete":8800.0,"valorRecebido":20100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1570,"data":"2024-05-03","cliente":"EDGAR - SP","nf":"1365","areas":{"A1":6000,"MA":2000},"qtde":8000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1571,"data":"2024-05-03","cliente":"ALDO SERGIO - CURITIBA","nf":"1366","areas":{"A2":3100,"MA":5400},"qtde":8500,"total":29750.0,"frete":9600.0,"valorRecebido":20150.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1572,"data":"2024-05-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1368","areas":{"A1":6000,"A2":4000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1573,"data":"2024-05-03","cliente":"JOÃO FRANCISCO - ARACAJU","nf":"1369","areas":{"A1":6000},"qtde":6000,"total":11400.0,"frete":0,"valorRecebido":11400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1574,"data":"2024-05-04","cliente":"DIEGO - LINHARES","nf":"1370","areas":{"B":8700,"C":5800,"D":2000,"MA":1000,"MDB":1000},"qtde":18500,"total":39999.996999999996,"frete":8500.0,"valorRecebido":31499.996999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1575,"data":"2024-05-04","cliente":"LEONARDO - CEAGESP","nf":"1371","areas":{"A1":8500},"qtde":8500,"total":28900.0,"frete":8800.0,"valorRecebido":20100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1576,"data":"2024-05-06","cliente":"LINCOLN - CAMPO GRANDE","nf":"1377","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1577,"data":"2024-05-06","cliente":"LEONARDO - CEAGESP","nf":"1378","areas":{"A2":7200,"MA":1300},"qtde":8500,"total":28900.0,"frete":8800.0,"valorRecebido":20100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1578,"data":"2024-05-09","cliente":"LINCOLN - CAMPO GRANDE","nf":"1379","areas":{"B":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1579,"data":"2024-05-09","cliente":"ALDO SERGIO - CURITIBA","nf":"1380","areas":{"B":600,"D":4600,"MA":3300},"qtde":8500,"total":14199.998,"frete":0,"valorRecebido":14199.998,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1580,"data":"2024-05-09","cliente":"LEONARDO - CEAGESP","nf":"1383","areas":{"D":4300,"MA":4200},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1581,"data":"2024-05-10","cliente":"LEONARDO - CEAGESP","nf":"1384","areas":{"D":8500},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1582,"data":"2024-05-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1386","areas":{"MDC":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1583,"data":"2024-05-13","cliente":"LEONARDO - CEAGESP","nf":"1388","areas":{"D":6100,"MDC":2400},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1584,"data":"2024-05-13","cliente":"DAIANE - ARACAJU","nf":"RECIBO","areas":{"D":2500},"qtde":2500,"total":5000.0,"frete":0,"valorRecebido":5000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1585,"data":"2024-05-15","cliente":"NECTTARE","nf":"1389","areas":{},"qtde":9000,"total":9890.0,"frete":2954.9,"valorRecebido":6935.1,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1586,"data":"2024-05-16","cliente":"ASSIS - CAMPINAS","nf":"1390","areas":{"D":6000,"MDC":2500},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1587,"data":"2024-05-16","cliente":"LINCOLN - CAMPO GRANDE","nf":"1391","areas":{"MDC":1800,"MDB":6700},"qtde":8500,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1588,"data":"2024-05-17","cliente":"LEONARDO - CEAGESP","nf":"1393","areas":{"C":800,"MDB":7700},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1589,"data":"2024-05-20","cliente":"LEONARDO - CEAGESP","nf":"1394","areas":{"A2":5800,"MA":2700},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1590,"data":"2024-05-22","cliente":"NECTTARE","nf":"1397","areas":{"C":18500},"qtde":18500,"total":16340.0,"frete":3569.4,"valorRecebido":12770.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":7600.0,"vPorLitro":2.15},{"id":1591,"data":"2024-05-23","cliente":"LEONARDO - CEAGESP","nf":"1398","areas":{"A2":8500},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1592,"data":"2024-05-24","cliente":"CEARÁ - CAMPINAS","nf":"1400","areas":{"A2":6900,"MA":2100},"qtde":9000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1593,"data":"2024-05-27","cliente":"LINCOLN - CAMPO GRANDE","nf":"1401","areas":{"C":150,"MA":10850},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1594,"data":"2024-05-28","cliente":"NECTTARE","nf":"1403","areas":{"C":16100},"qtde":16100,"total":14620.0,"frete":3662.0,"valorRecebido":10958.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":6800.0,"vPorLitro":2.15},{"id":1595,"data":"2024-05-29","cliente":"NECTTARE","nf":"1404","areas":{"C":16100},"qtde":16100,"total":13975.0,"frete":3414.0,"valorRecebido":10561.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":6500.0,"vPorLitro":2.15},{"id":1596,"data":"2024-05-29","cliente":"EDGAR - SP","nf":"1405","areas":{"MDC":9000},"qtde":9000,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1597,"data":"2024-05-31","cliente":"FRYSK","nf":"1406","areas":{"A1":3100,"B":12000},"qtde":15100,"total":14853.539999999999,"frete":2890.8,"valorRecebido":11962.739999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":32120.0,"litragem":5712.9,"vPorLitro":2.6},{"id":1598,"data":"2024-05-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1407","areas":{"MDC":7000,"MDB":3000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1599,"data":"2024-06-01","cliente":"LEONARDO - CEAGESP","nf":"1409","areas":{"A1":1600,"MDB":6900},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1600,"data":"2024-06-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1410","areas":{"A1":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1601,"data":"2024-06-04","cliente":"NECTTARE","nf":"1412","areas":{"A1":14100,"MDC":1900},"qtde":16000,"total":13975.0,"frete":3584.0,"valorRecebido":10391.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35840.0,"litragem":6500.0,"vPorLitro":2.15},{"id":1602,"data":"2024-06-05","cliente":"NECTTARE","nf":"1413","areas":{"A1":28700},"qtde":28700,"total":25585.0,"frete":6684.0,"valorRecebido":18901.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":66840.0,"litragem":11900.0,"vPorLitro":2.15},{"id":1603,"data":"2024-06-06","cliente":"NECTTARE","nf":"1414","areas":{"A1":1300,"D":28400},"qtde":29700,"total":27305.0,"frete":6404.0,"valorRecebido":20901.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":64040.00000000001,"litragem":12700.0,"vPorLitro":2.15},{"id":1604,"data":"2024-06-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1417","areas":{"D":10100},"qtde":10100,"total":20200.0,"frete":0,"valorRecebido":20200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1605,"data":"2024-06-10","cliente":"LEONARDO - CEAGESP","nf":"1418","areas":{"MA":2800,"MDB":5700},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1606,"data":"2024-06-11","cliente":"NECTTARE","nf":"1419","areas":{"D":10770},"qtde":10770,"total":9675.0,"frete":2878.2,"valorRecebido":6796.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":28782.0,"litragem":4500.0,"vPorLitro":2.15},{"id":1607,"data":"2024-06-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1420","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1608,"data":"2024-06-12","cliente":"EDGAR - SP","nf":"1423","areas":{"A2":9000},"qtde":9000,"total":13500.0,"frete":0,"valorRecebido":13500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1609,"data":"2024-06-13","cliente":"NECTTARE","nf":"1425","areas":{"A2":3250,"C":6400,"D":12500},"qtde":22150,"total":22790.0,"frete":4842.0,"valorRecebido":17948.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":48420.0,"litragem":10600.0,"vPorLitro":2.15},{"id":1610,"data":"2024-06-14","cliente":"LEONARDO - CEAGESP","nf":"1426","areas":{"A2":8500},"qtde":8500,"total":26350.0,"frete":8800.0,"valorRecebido":17550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1611,"data":"2024-06-17","cliente":"LEONARDO - CEAGESP","nf":"1427","areas":{"A2":5000,"MA":3500},"qtde":8500,"total":21250.0,"frete":8800.0,"valorRecebido":12450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1612,"data":"2024-06-17","cliente":"LINCOLN - CAMPO GRANDE","nf":"1428","areas":{"MA":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1613,"data":"2024-06-18","cliente":"NECTTARE","nf":"1429","areas":{"C":21000},"qtde":21000,"total":20210.0,"frete":4394.0,"valorRecebido":15816.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":43940.0,"litragem":9400.0,"vPorLitro":2.15},{"id":1614,"data":"2024-06-19","cliente":"LINCOLN - CAMPO GRANDE","nf":"1439","areas":{"MA":2200,"MDC":8800},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1615,"data":"2024-06-20","cliente":"NECTTARE","nf":"1441","areas":{"B":9700,"C":10800},"qtde":20500,"total":17415.0,"frete":4653.5,"valorRecebido":12761.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":46535.0,"litragem":8100.0,"vPorLitro":2.15},{"id":1616,"data":"2024-06-21","cliente":"NECTTARE","nf":"1442","areas":{"B":34000,"MA":2200},"qtde":36200,"total":30745.0,"frete":8217.4,"valorRecebido":22527.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":82174.0,"litragem":14300.0,"vPorLitro":2.15},{"id":1617,"data":"2024-06-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1443","areas":{"MDC":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1618,"data":"2024-06-25","cliente":"NECTTARE","nf":"1445","areas":{"A1":25000},"qtde":25000,"total":22145.0,"frete":5675.0,"valorRecebido":16470.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":56750.0,"litragem":10300.0,"vPorLitro":2.15},{"id":1619,"data":"2024-06-26","cliente":"NECTTARE","nf":"1446","areas":{"A1":23900},"qtde":23900,"total":21070.0,"frete":5425.3,"valorRecebido":15644.7,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":54253.0,"litragem":9800.0,"vPorLitro":2.15},{"id":1620,"data":"2024-06-27","cliente":"NECTTARE","nf":"1447","areas":{"A1":15000},"qtde":15000,"total":13545.0,"frete":3405.0,"valorRecebido":10140.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":34050.0,"litragem":6300.0,"vPorLitro":2.15},{"id":1621,"data":"2024-06-27","cliente":"LEONARDO - CEAGESP","nf":"1448","areas":{"MDC":2000,"MDB":6500},"qtde":8500,"total":21250.0,"frete":8800.0,"valorRecebido":12450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1622,"data":"2024-06-28","cliente":"NECTTARE","nf":"1449","areas":{"A1":32000},"qtde":32000,"total":27520.0,"frete":7264.0,"valorRecebido":20256.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":72640.0,"litragem":12800.0,"vPorLitro":2.15},{"id":1623,"data":"2024-07-01","cliente":"LINCOLN - CAMPO GRANDE","nf":"1450","areas":{"MDB":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1624,"data":"2024-07-01","cliente":"LEONARDO - CEAGESP","nf":"1452","areas":{"A2":2300,"MDB":6200},"qtde":8500,"total":21250.0,"frete":8800.0,"valorRecebido":12450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1625,"data":"2024-07-02","cliente":"CEARÁ - CAMPINAS","nf":"1453","areas":{"A2":2700,"MA":4300},"qtde":7000,"total":8049.999999999999,"frete":0,"valorRecebido":8049.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1626,"data":"2024-07-03","cliente":"NECTTARE","nf":"1461","areas":{"A1":8100,"D":6300},"qtde":14400,"total":12685.0,"frete":3026.0,"valorRecebido":9659.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":5900.0,"vPorLitro":2.15},{"id":1627,"data":"2024-07-04","cliente":"NECTTARE","nf":"1462","areas":{"D":19200},"qtde":19200,"total":17200.0,"frete":3744.0,"valorRecebido":13456.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":8000.0,"vPorLitro":2.15},{"id":1628,"data":"2024-07-08","cliente":"NECTTARE","nf":"1464","areas":{"D":20800},"qtde":20800,"total":19565.0,"frete":4126.0,"valorRecebido":15439.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":9100.0,"vPorLitro":2.15},{"id":1629,"data":"2024-07-09","cliente":"NECTTARE","nf":"1465","areas":{"D":23300},"qtde":23300,"total":22575.0,"frete":4710.0,"valorRecebido":17865.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":10500.0,"vPorLitro":2.15},{"id":1630,"data":"2024-07-10","cliente":"NECTTARE","nf":"1466","areas":{"C":19300},"qtde":19300,"total":18920.0,"frete":3978.0,"valorRecebido":14942.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":8800.0,"vPorLitro":2.15},{"id":1631,"data":"2024-07-11","cliente":"NECTTARE","nf":"1467","areas":{"C":15600},"qtde":15600,"total":15695.0,"frete":3184.0,"valorRecebido":12511.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":7300.0,"vPorLitro":2.15},{"id":1632,"data":"2024-07-11","cliente":"NECTTARE","nf":"1469","areas":{"B":2400,"C":16600},"qtde":19000,"total":17200.0,"frete":3490.0,"valorRecebido":13710.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":8000.0,"vPorLitro":2.15},{"id":1633,"data":"2024-07-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1470","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1634,"data":"2024-07-16","cliente":"LINCOLN - CAMPO GRANDE","nf":"1478","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1635,"data":"2024-07-16","cliente":"NECTTARE","nf":"1480","areas":{"B":20000},"qtde":20000,"total":16340.0,"frete":3680.0,"valorRecebido":12660.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":7600.0,"vPorLitro":2.15},{"id":1636,"data":"2024-07-17","cliente":"NECTTARE","nf":"1481","areas":{"A1":10300,"B":19000},"qtde":29300,"total":24725.0,"frete":5522.0,"valorRecebido":19203.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":11500.0,"vPorLitro":2.15},{"id":1637,"data":"2024-07-18","cliente":"NECTTARE","nf":"1482","areas":{"A1":20500},"qtde":20500,"total":16770.0,"frete":3946.0,"valorRecebido":12824.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":7800.0,"vPorLitro":2.15},{"id":1638,"data":"2024-07-19","cliente":"MIGUEL - CUIABÁ","nf":"1483","areas":{"A2":14700,"MA":5300},"qtde":20000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":"2024-07-31","tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1639,"data":"2024-07-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1484","areas":{"MA":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1640,"data":"2024-07-23","cliente":"NECTTARE","nf":"1486","areas":{"A1":17000},"qtde":17000,"total":14405.0,"frete":3222.0,"valorRecebido":11183.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":6700.0,"vPorLitro":2.15},{"id":1641,"data":"2024-07-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1487","areas":{"MA":900,"MDC":10100},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1642,"data":"2024-07-29","cliente":"LINCOLN - CAMPO GRANDE","nf":"1489","areas":{"MDC":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1643,"data":"2024-07-29","cliente":"LEONARDO - CEAGESP","nf":"1491","areas":{"MDC":300,"MDB":8200},"qtde":8500,"total":18700.0,"frete":8800.0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1644,"data":"2024-07-30","cliente":"NECTTARE","nf":"1492","areas":{"A1":18000},"qtde":18000,"total":15480.0,"frete":3642.0,"valorRecebido":11838.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":7200.0,"vPorLitro":2.15},{"id":1645,"data":"2024-07-31","cliente":"MIGUEL - CUIABÁ","nf":"1493","areas":{"MA":3500,"MDB":13500},"qtde":17000,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1646,"data":"2024-07-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1494","areas":{"A2":9300,"MA":700},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1647,"data":"2024-09-02","cliente":"LINCOLN - CAMPO GRANDE","nf":"1542","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1648,"data":"2024-09-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1544","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1649,"data":"2024-09-03","cliente":"NECTTARE","nf":"1547","areas":{"C":1000,"D":21000},"qtde":22000,"total":23220.0,"frete":4544.0,"valorRecebido":18676.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":45440.0,"litragem":10800.0,"vPorLitro":2.15},{"id":1650,"data":"2024-09-04","cliente":"QUALICOCO","nf":"1548","areas":{"B":20900},"qtde":20900,"total":22600.0,"frete":3233.6,"valorRecebido":19366.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40420.0,"litragem":9040.0,"vPorLitro":2.5},{"id":1651,"data":"2024-09-05","cliente":"NECTTARE","nf":"1549","areas":{"A1":19700,"B":3200},"qtde":22900,"total":22145.0,"frete":4874.0,"valorRecebido":17271.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":48740.0,"litragem":10300.0,"vPorLitro":2.15},{"id":1652,"data":"2024-09-06","cliente":"GEORGE - VITTA FRUTAS","nf":"1552","areas":{"C":2300,"MA":16200},"qtde":18500,"total":18500.0,"frete":0,"valorRecebido":18500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1653,"data":"2024-09-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1550","areas":{"A2":6000,"MA":5000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1654,"data":"2024-09-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"1555","areas":{"MDC":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1655,"data":"2024-09-10","cliente":"QUALICOCO","nf":"1557","areas":{"C":21500},"qtde":21500,"total":22599.2,"frete":3267.2000000000003,"valorRecebido":19332.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40840.0,"litragem":8692.0,"vPorLitro":2.6},{"id":1656,"data":"2024-09-11","cliente":"MIGUEL - CUIABÁ","nf":"1559","areas":{"A1":18000},"qtde":18000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1657,"data":"2024-09-12","cliente":"ALEX - COCO BAMBU","nf":"1560","areas":{"MDC":7000},"qtde":7000,"total":8400.0,"frete":0,"valorRecebido":8400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1658,"data":"2024-09-12","cliente":"QUALICOCO","nf":"1561","areas":{"A1":16500,"B":6000},"qtde":22500,"total":23613.2,"frete":3472.0,"valorRecebido":20141.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":43400.0,"litragem":9082.0,"vPorLitro":2.6},{"id":1659,"data":"2024-09-16","cliente":"LINCOLN - CAMPO GRANDE","nf":"1562","areas":{"MDC":2300,"MDB":7700},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1660,"data":"2024-09-16","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"MDB":80},"qtde":80,"total":112.0,"frete":0,"valorRecebido":112.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1661,"data":"2024-09-17","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"MDB":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1662,"data":"2024-09-17","cliente":"ALEX - COCO BAMBU","nf":"1568","areas":{"A1":3000,"A2":4600,"MDB":8400},"qtde":16000,"total":20800.0,"frete":0,"valorRecebido":20800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1663,"data":"2024-09-17","cliente":"LINCOLN - CAMPO GRANDE","nf":"1566","areas":{"MDC":2000,"MDB":8000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1664,"data":"2024-09-18","cliente":"QUALICOCO","nf":"1569","areas":{"B":1000,"C":19200},"qtde":20200,"total":26172.5,"frete":3275.2000000000003,"valorRecebido":22897.3,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40940.0,"litragem":9025.0,"vPorLitro":2.9},{"id":1665,"data":"2024-09-19","cliente":"MARCOS FALCÃO","nf":"1570","areas":{"A1":2500,"C":6500},"qtde":9000,"total":13965.0,"frete":1900.0,"valorRecebido":12065.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1666,"data":"2024-09-19","cliente":"QUALICOCO","nf":"1571","areas":{"A1":12000},"qtde":12000,"total":15960.0,"frete":3069.0,"valorRecebido":12891.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":34100.0,"litragem":5320.0,"vPorLitro":3.0},{"id":1667,"data":"2024-09-21","cliente":"THALYSON - ZE DO COCO","nf":"RECIBO","areas":{"A1":8500},"qtde":8500,"total":12049.175000000001,"frete":1000.0,"valorRecebido":11049.175000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1668,"data":"2024-09-23","cliente":"LINCOLN - CAMPO GRANDE","nf":"1572","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1669,"data":"2024-09-24","cliente":"ALEX - COCO BAMBU","nf":"1576","areas":{"A2":8000},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1670,"data":"2024-09-24","cliente":"RICARDO - COCO DIAMANTE","nf":"1577","areas":{"A1":9000},"qtde":9000,"total":13500.0,"frete":0,"valorRecebido":13500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1671,"data":"2024-09-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1578","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1672,"data":"2024-09-25","cliente":"QUALICOCO","nf":"1580","areas":{"A1":25500,"D":7300},"qtde":32800,"total":41049.5,"frete":5620.8,"valorRecebido":35428.7,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":70260.0,"litragem":14155.0,"vPorLitro":2.9},{"id":1673,"data":"2024-09-26","cliente":"ALEX - COCO BAMBU","nf":"1581","areas":{"A2":4400,"MA":12600},"qtde":17000,"total":22100.0,"frete":0,"valorRecebido":22100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1674,"data":"2024-09-26","cliente":"GEORGE - VITTA FRUTAS","nf":"1583","areas":{"D":22000},"qtde":22000,"total":28600.0,"frete":0,"valorRecebido":28600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1675,"data":"2024-09-27","cliente":"LINCOLN - CAMPO GRANDE","nf":"1584","areas":{"MA":5000,"MDC":6000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1676,"data":"2024-09-27","cliente":"MARCOS FALCÃO","nf":"1587","areas":{"D":10300},"qtde":10300,"total":13197.0,"frete":1900.0,"valorRecebido":11297.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":null,"litragem":4399.0,"vPorLitro":3.0},{"id":1677,"data":"2024-09-27","cliente":"ANTONIO ALVES","nf":"RECIBO","areas":{"MA":700},"qtde":700,"total":979.9999999999999,"frete":0,"valorRecebido":979.9999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1678,"data":"2024-09-30","cliente":"ALEX - COCO BAMBU","nf":"1589","areas":{"MDC":8000},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1679,"data":"2024-09-30","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"D":80},"qtde":80,"total":112.0,"frete":0,"valorRecebido":112.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1680,"data":"2024-09-30","cliente":"THALYSON - ZE DO COCO","nf":"1591","areas":{"D":8000},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1681,"data":"2024-10-01","cliente":"LINCOLN - CAMPO GRANDE","nf":"1592","areas":{"D":3200,"MDC":4000,"MDB":2800},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1682,"data":"2024-10-01","cliente":"GEORGE - VITTA FRUTAS","nf":"1594","areas":{"D":18000},"qtde":18000,"total":23400.0,"frete":0,"valorRecebido":23400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1683,"data":"2024-10-02","cliente":"QUALICOCO","nf":"1595","areas":{"B":19600,"D":12900},"qtde":32500,"total":42750.0,"frete":5427.2,"valorRecebido":37322.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":67840.0,"litragem":14250.0,"vPorLitro":3.0},{"id":1684,"data":"2024-10-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1596","areas":{"MDB":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1685,"data":"2024-10-03","cliente":"THALYSON - ZE DO COCO","nf":"1598","areas":{"C":8000},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1686,"data":"2024-10-04","cliente":"ALEX - COCO BAMBU","nf":"1601","areas":{"A1":8400,"C":8600},"qtde":17000,"total":19550.0,"frete":0,"valorRecebido":19550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1687,"data":"2024-10-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1603","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1688,"data":"2024-10-07","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"MDB":80},"qtde":80,"total":112.0,"frete":0,"valorRecebido":112.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1689,"data":"2024-10-08","cliente":"THALYSON - ZE DO COCO","nf":"1605","areas":{"A1":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1690,"data":"2024-10-09","cliente":"QUALICOCO","nf":"1606","areas":{"A1":13700,"B":600,"C":8600},"qtde":22900,"total":24795.0,"frete":3332.8,"valorRecebido":21462.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41660.0,"litragem":8265.0,"vPorLitro":3.0},{"id":1691,"data":"2024-10-09","cliente":"THALYSON - ZE DO COCO","nf":"1607","areas":{"A1":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1692,"data":"2024-10-09","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"A1":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1693,"data":"2024-10-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"1608","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1694,"data":"2024-10-11","cliente":"ALEX - COCO BAMBU","nf":"1611","areas":{"A2":12000},"qtde":12000,"total":16800.0,"frete":0,"valorRecebido":16800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1695,"data":"2024-10-11","cliente":"MARCOS FALCÃO","nf":"1610","areas":{"A1":9000},"qtde":9000,"total":10935.0,"frete":1900.0,"valorRecebido":9035.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18040.0,"litragem":3645.0,"vPorLitro":3.0},{"id":1696,"data":"2024-10-11","cliente":"JOSE GENILSON","nf":"RECIBO","areas":{"A1":3000},"qtde":3000,"total":3900.0,"frete":0,"valorRecebido":3900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1697,"data":"2024-10-11","cliente":"RAFAEL - MACEIÓ","nf":"RECIBO","areas":{"A1":3000},"qtde":3000,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1698,"data":"2024-10-14","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"A2":80},"qtde":80,"total":112.0,"frete":0,"valorRecebido":112.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1699,"data":"2024-10-14","cliente":"LINCOLN - CAMPO GRANDE","nf":"1612","areas":{"A2":5000,"MA":6000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1700,"data":"2024-10-14","cliente":"ALEX - COCO BAMBU","nf":"1614","areas":{"MA":10400,"MDC":4600},"qtde":15000,"total":22500.0,"frete":0,"valorRecebido":22500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1701,"data":"2024-10-16","cliente":"LINCOLN - CAMPO GRANDE","nf":"1615","areas":{"MDC":9500,"MDB":500},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1702,"data":"2024-10-16","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"MDC":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1703,"data":"2024-10-17","cliente":"QUALICOCO","nf":"1617","areas":{"A1":2000,"A2":16000},"qtde":18000,"total":25935.0,"frete":3096.0,"valorRecebido":22839.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38700.0,"litragem":8645.0,"vPorLitro":3.0},{"id":1704,"data":"2024-10-17","cliente":"THALYSON - ZE DO COCO","nf":"1619","areas":{"A1":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1705,"data":"2024-10-17","cliente":"RAFAEL - MACEIÓ","nf":"RECIBO","areas":{"A1":3000},"qtde":3000,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1706,"data":"2024-10-18","cliente":"GEORGE - VITTA FRUTAS","nf":"1621","areas":{"C":7500,"D":15500},"qtde":23000,"total":32199.999999999996,"frete":0,"valorRecebido":32199.999999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1707,"data":"2024-10-21","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"MDB":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1708,"data":"2024-10-22","cliente":"WELLINGTON - ARACAJU","nf":"1623","areas":{"MDB":3000},"qtde":3000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1709,"data":"2024-10-23","cliente":"MARCOS FALCÃO","nf":"1625","areas":{"A1":8300,"D":1700},"qtde":10000,"total":11935.0,"frete":1900.0,"valorRecebido":10035.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18230.0,"litragem":3850.0,"vPorLitro":3.1},{"id":1710,"data":"2024-10-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1626","areas":{"MDB":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1711,"data":"2024-10-24","cliente":"GEORGE - VITTA FRUTAS","nf":"1628","areas":{"D":22000},"qtde":22000,"total":30799.999999999996,"frete":0,"valorRecebido":30799.999999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1712,"data":"2024-10-25","cliente":"FRYSK","nf":"1629","areas":{"D":11500},"qtde":11500,"total":25110.0,"frete":2068.0,"valorRecebido":23042.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1713,"data":"2024-10-25","cliente":"MARCOS FALCÃO","nf":"1630","areas":{"C":1600,"D":8600},"qtde":10200,"total":13537.7,"frete":1900.0,"valorRecebido":11637.7,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":20180.0,"litragem":4367.0,"vPorLitro":3.1},{"id":1714,"data":"2024-10-25","cliente":"THALYSON - ZE DO COCO","nf":"1631","areas":{"D":8000},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1715,"data":"2024-10-28","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"A1":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1716,"data":"2024-10-28","cliente":"MARCOS FALCÃO","nf":"1632","areas":{"A1":10000},"qtde":10000,"total":11181.7,"frete":1900.0,"valorRecebido":9281.7,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":20040.0,"litragem":3607.0,"vPorLitro":3.1},{"id":1717,"data":"2024-10-29","cliente":"LINCOLN - CAMPO GRANDE","nf":"1633","areas":{"A2":6600,"MDC":3400},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1718,"data":"2024-10-29","cliente":"WELLINGTON - ARACAJU","nf":"1635","areas":{"A1":3000},"qtde":3000,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1719,"data":"2024-10-29","cliente":"QUALICOCO","nf":"1636","areas":{"A1":19000},"qtde":19000,"total":25916.0,"frete":3377.6,"valorRecebido":22538.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":42220.0,"litragem":8360.0,"vPorLitro":3.1},{"id":1720,"data":"2024-10-29","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"A1":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1721,"data":"2024-10-30","cliente":"MARCOS FALCÃO","nf":"1638","areas":{"A1":9000},"qtde":9000,"total":11829.6,"frete":1900.0,"valorRecebido":9929.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19580.0,"litragem":3816.0,"vPorLitro":3.1},{"id":1722,"data":"2024-10-30","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1637","areas":{"A1":9000},"qtde":9000,"total":13050.0,"frete":0,"valorRecebido":13050.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1723,"data":"2024-10-30","cliente":"MARCOS FALCÃO","nf":"1639","areas":{"A1":9000},"qtde":9000,"total":11160.0,"frete":1900.0,"valorRecebido":9260.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19750.0,"litragem":3600.0,"vPorLitro":3.1},{"id":1724,"data":"2024-10-31","cliente":"MARCOS FALCÃO","nf":"1640","areas":{"A1":9000},"qtde":9000,"total":12148.9,"frete":1900.0,"valorRecebido":10248.9,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":20250.0,"litragem":3919.0,"vPorLitro":3.1},{"id":1725,"data":"2024-10-31","cliente":"MARCOS FALCÃO","nf":"1641","areas":{"A1":5700,"D":3700},"qtde":9400,"total":12958.0,"frete":1900.0,"valorRecebido":11058.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":21750.0,"litragem":4180.0,"vPorLitro":3.1},{"id":1726,"data":"2024-11-01","cliente":"LINCOLN - CAMPO GRANDE","nf":"1643","areas":{"A1":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1727,"data":"2024-11-01","cliente":"THALYSON - ZE DO COCO","nf":"1645","areas":{"D":8000},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1728,"data":"2024-11-04","cliente":"QUALICOCO","nf":"1647","areas":{"D":9800},"qtde":9800,"total":10830.0,"frete":1816.0,"valorRecebido":9014.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22700.0,"litragem":3610.0,"vPorLitro":3.0},{"id":1729,"data":"2024-11-05","cliente":"LINCOLN - CAMPO GRANDE","nf":"1648","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1730,"data":"2024-11-06","cliente":"QUALICOCO","nf":"1650","areas":{"B":7500,"D":3900},"qtde":11400,"total":13110.0,"frete":1910.4,"valorRecebido":11199.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":23880.0,"litragem":4370.0,"vPorLitro":3.0},{"id":1731,"data":"2024-11-06","cliente":"WEYSIANE - NEOLPOLIS","nf":"RECIBO","areas":{"B":200},"qtde":200,"total":300.0,"frete":0,"valorRecebido":300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1732,"data":"2024-11-06","cliente":"NECTTARE","nf":"1652","areas":{"B":17000},"qtde":17000,"total":25110.0,"frete":4338.4,"valorRecebido":20771.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":39440.0,"litragem":8100.0,"vPorLitro":3.1},{"id":1733,"data":"2024-11-08","cliente":"LINCOLN - CAMPO GRANDE","nf":"1654","areas":{"A2":1000,"B":10000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1734,"data":"2024-11-08","cliente":"THALYSON - ZE DO COCO","nf":"1656","areas":{"A1":8000},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1735,"data":"2024-11-11","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A1":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1736,"data":"2024-11-11","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"A1":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1737,"data":"2024-11-11","cliente":"QUALICOCO","nf":"1657","areas":{"A1":9960},"qtde":9960,"total":9513.9,"frete":1755.2,"valorRecebido":7758.7,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":21940.0,"litragem":3069.0,"vPorLitro":3.1},{"id":1738,"data":"2024-11-12","cliente":"LINCOLN - CAMPO GRANDE","nf":"1661","areas":{"MA":8900,"MDC":2100},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1739,"data":"2024-11-12","cliente":"NECTTARE","nf":"1660","areas":{"C":17000},"qtde":17000,"total":21080.0,"frete":4070.0,"valorRecebido":17010.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37000.0,"litragem":6800.0,"vPorLitro":3.1},{"id":1740,"data":"2024-11-13","cliente":"NECTTARE","nf":"1663","areas":{"C":17300},"qtde":17300,"total":25110.0,"frete":3545.2,"valorRecebido":21564.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41320.0,"litragem":8100.0,"vPorLitro":3.1},{"id":1741,"data":"2024-11-13","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"C":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1742,"data":"2024-11-14","cliente":"THALYSON - ZE DO COCO","nf":"1664","areas":{"MDC":7000},"qtde":7000,"total":9800.0,"frete":0,"valorRecebido":9800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1743,"data":"2024-11-14","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDC":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1744,"data":"2024-11-18","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDB":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1745,"data":"2024-11-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"1665","areas":{"MDC":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1746,"data":"2024-11-19","cliente":"NECTTARE","nf":"1667","areas":{"A1":17200},"qtde":17200,"total":19530.0,"frete":4287.8,"valorRecebido":15242.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38980.0,"litragem":6300.0,"vPorLitro":3.1},{"id":1747,"data":"2024-11-19","cliente":"LINCOLN - CAMPO GRANDE","nf":"1668","areas":{"MDB":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1748,"data":"2024-11-21","cliente":"NECTTARE","nf":"1670","areas":{"A1":18000},"qtde":18000,"total":22010.0,"frete":4219.6,"valorRecebido":17790.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40820.0,"litragem":7100.0,"vPorLitro":3.1},{"id":1749,"data":"2024-11-22","cliente":"NECTTARE","nf":"1671","areas":{"A1":18200},"qtde":18200,"total":22630.0,"frete":4492.4,"valorRecebido":18137.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41520.0,"litragem":7300.0,"vPorLitro":3.1},{"id":1750,"data":"2024-11-25","cliente":"LINCOLN - CAMPO GRANDE","nf":"1672","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1751,"data":"2024-11-25","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDB":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1752,"data":"2024-11-26","cliente":"NECTTARE","nf":"1676","areas":{"A1":16000},"qtde":16000,"total":21080.0,"frete":3799.4,"valorRecebido":17280.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38360.0,"litragem":6800.0,"vPorLitro":3.1},{"id":1753,"data":"2024-11-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1677","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1754,"data":"2024-11-27","cliente":"NECTTARE","nf":"1679","areas":{"A1":11400,"B":6600},"qtde":18000,"total":21700.0,"frete":4582.6,"valorRecebido":17117.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40840.0,"litragem":7000.0,"vPorLitro":3.1},{"id":1755,"data":"2024-11-27","cliente":"NECTTARE","nf":"1680","areas":{"B":12500,"D":3500},"qtde":16000,"total":18600.0,"frete":4131.6,"valorRecebido":14468.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":34540.0,"litragem":6000.0,"vPorLitro":3.1},{"id":1756,"data":"2024-11-28","cliente":"NECTTARE","nf":"1681","areas":{"A1":18000},"qtde":18000,"total":22320.0,"frete":4589.2,"valorRecebido":17730.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41720.0,"litragem":7200.0,"vPorLitro":3.1},{"id":1757,"data":"2024-11-28","cliente":"NECTTARE","nf":"1682","areas":{"D":16000},"qtde":16000,"total":18600.0,"frete":3687.2,"valorRecebido":14912.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33500.0,"litragem":6000.0,"vPorLitro":3.1},{"id":1758,"data":"2024-11-29","cliente":"NECTTARE","nf":"1683","areas":{"C":18000},"qtde":18000,"total":22320.0,"frete":4589.2,"valorRecebido":17730.8,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41720.0,"litragem":7200.0,"vPorLitro":3.1},{"id":1759,"data":"2024-12-02","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"A2":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1760,"data":"2024-12-02","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"A2":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1761,"data":"2024-12-02","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A2":2000},"qtde":2000,"total":2800.0,"frete":0,"valorRecebido":2800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1762,"data":"2024-12-02","cliente":"LINCOLN - CAMPO GRANDE","nf":"1685","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1763,"data":"2024-12-03","cliente":"THALYSON - ZE DO COCO","nf":"1687","areas":{"MA":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1764,"data":"2024-12-03","cliente":"NECTTARE","nf":"1688","areas":{"A1":22000},"qtde":22000,"total":22910.0,"frete":4544.0,"valorRecebido":18366.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":46300.0,"litragem":7900.0,"vPorLitro":2.9},{"id":1765,"data":"2024-12-04","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MA":5000},"qtde":5000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1766,"data":"2024-12-05","cliente":"MARCOS FALCÃO","nf":"1689","areas":{"D":9300},"qtde":9300,"total":9066.4,"frete":1900.0,"valorRecebido":7166.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19230.0,"litragem":3238.0,"vPorLitro":2.8},{"id":1767,"data":"2024-12-09","cliente":"NECTTARE","nf":"1692","areas":{"D":16100},"qtde":16100,"total":15370.0,"frete":4874.0,"valorRecebido":10496.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33520.0,"litragem":5300.0,"vPorLitro":2.9},{"id":1768,"data":"2024-12-05","cliente":"THALYSON - ZE DO COCO","nf":"1691","areas":{"MA":4300,"MDC":3700},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1769,"data":"2024-12-05","cliente":"MARCOS FALCÃO","nf":"1694","areas":{"D":9300},"qtde":9300,"total":9242.8,"frete":1900.0,"valorRecebido":7342.799999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":20570.0,"litragem":3301.0,"vPorLitro":2.8},{"id":1770,"data":"2024-12-05","cliente":"RAFAEL - MACEIÓ","nf":"1690","areas":{"MA":3000},"qtde":3000,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1771,"data":"2024-12-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1695","areas":{"MDC":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1772,"data":"2024-12-09","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDC":5000},"qtde":5000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1773,"data":"2024-12-09","cliente":"QUALICOCO","nf":"1698","areas":{"D":16000},"qtde":16000,"total":15640.8,"frete":2651.2000000000003,"valorRecebido":12989.599999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33140.0,"litragem":5586.0,"vPorLitro":2.8},{"id":1774,"data":"2024-12-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"1699","areas":{"MDC":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1775,"data":"2024-12-10","cliente":"QUALICOCO","nf":"1701","areas":{"D":17000},"qtde":17000,"total":16492.0,"frete":2904.0,"valorRecebido":13588.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36300.0,"litragem":5890.0,"vPorLitro":2.8},{"id":1776,"data":"2024-12-10","cliente":"MARCOS FALCÃO","nf":"1702","areas":{"D":8800},"qtde":8800,"total":9293.400000000001,"frete":1900.0,"valorRecebido":7393.4000000000015,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19760.0,"litragem":3442.0,"vPorLitro":2.7},{"id":1777,"data":"2024-12-12","cliente":"THALYSON - ZE DO COCO","nf":"1703","areas":{"A2":2200,"MDB":5800},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1778,"data":"2024-12-12","cliente":"MARCOS FALCÃO","nf":"1704","areas":{"D":9300},"qtde":9300,"total":8993.7,"frete":1900.0,"valorRecebido":7093.700000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19630.0,"litragem":3331.0,"vPorLitro":2.7},{"id":1779,"data":"2024-12-12","cliente":"RENAN - RIO DE JANEIRO","nf":"1707","areas":{"D":9000},"qtde":9000,"total":11700.0,"frete":0,"valorRecebido":11700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1780,"data":"2024-12-13","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"A2":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1781,"data":"2024-12-13","cliente":"DIEGO - LINHARES","nf":"1708","areas":{"A1":16000},"qtde":16000,"total":13342.5,"frete":0,"valorRecebido":13342.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1782,"data":"2024-12-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1710","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1783,"data":"2024-12-16","cliente":"RENAN - RIO DE JANEIRO","nf":"1713","areas":{"A1":5600,"D":4400},"qtde":10000,"total":13000.0,"frete":0,"valorRecebido":13000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1784,"data":"2024-12-16","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A2":1700},"qtde":1700,"total":2380.0,"frete":0,"valorRecebido":2380.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1785,"data":"2024-12-16","cliente":"THALYSON - ZE DO COCO","nf":"1715","areas":{"A2":8000},"qtde":8000,"total":6358.823529411764,"frete":0,"valorRecebido":6358.823529411764,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1786,"data":"2024-12-17","cliente":"LINCOLN - CAMPO GRANDE","nf":"1716","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1787,"data":"2024-12-17","cliente":"DIEGO - LINHARES","nf":"1718","areas":{"A1":16250,"D":2000},"qtde":18250,"total":14965.0,"frete":0,"valorRecebido":14965.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1788,"data":"2024-12-17","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A2":1700},"qtde":1700,"total":2380.0,"frete":0,"valorRecebido":2380.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1789,"data":"2024-12-18","cliente":"DIEGO - LINHARES","nf":"1719","areas":{"A1":16000},"qtde":16000,"total":13440.0,"frete":0,"valorRecebido":13440.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1790,"data":"2024-12-18","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"D":500,"MA":4500},"qtde":5000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1791,"data":"2024-12-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1724","areas":{"MA":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1792,"data":"2024-12-20","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"MA":50},"qtde":50,"total":75.0,"frete":0,"valorRecebido":75.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1793,"data":"2024-12-23","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MA":1500,"MDC":200},"qtde":1700,"total":2380.0,"frete":0,"valorRecebido":2380.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1794,"data":"2024-12-23","cliente":"DIEGO - LINHARES","nf":"1729","areas":{"C":16000},"qtde":16000,"total":13440.0,"frete":0,"valorRecebido":13440.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1795,"data":"2024-12-23","cliente":"THALYSON - ZE DO COCO","nf":"1730","areas":{"MDC":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1796,"data":"2024-12-23","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"C":100},"qtde":100,"total":130.0,"frete":0,"valorRecebido":130.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1797,"data":"2024-12-24","cliente":"RAFAEL - MACEIÓ","nf":"1731","areas":{"D":3500},"qtde":3500,"total":4900.0,"frete":0,"valorRecebido":4900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1798,"data":"2024-12-24","cliente":"JONATHAN - ARACAJU","nf":"1732","areas":{"D":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1799,"data":"2024-12-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1733","areas":{"MDC":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1800,"data":"2024-12-26","cliente":"DIEGO - LINHARES","nf":"1736","areas":{"C":10600,"D":6400},"qtde":17000,"total":13430.0,"frete":0,"valorRecebido":13430.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1801,"data":"2024-12-27","cliente":"BINHO DO COCO","nf":"1737","areas":{"MDC":1700},"qtde":1700,"total":2380.0,"frete":0,"valorRecebido":2380.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1802,"data":"2024-12-27","cliente":"DIEGO - LINHARES","nf":"1738","areas":{"C":14800},"qtde":14800,"total":12728.0,"frete":0,"valorRecebido":12728.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1803,"data":"2024-12-27","cliente":"THALYSON - ZE DO COCO","nf":"1740","areas":{"D":8000},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1804,"data":"2024-12-30","cliente":"DIEGO - LINHARES","nf":"1741","areas":{"C":10900,"D":4000},"qtde":14900,"total":14006.0,"frete":0,"valorRecebido":14006.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1805,"data":"2024-12-30","cliente":"LINCOLN - CAMPO GRANDE","nf":"1742","areas":{"MDC":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1806,"data":"2024-12-30","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDC":5000},"qtde":5000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1807,"data":"2024-12-31","cliente":"DIEGO - LINHARES","nf":"1746","areas":{"A1":17900},"qtde":17900,"total":14857.0,"frete":0,"valorRecebido":14857.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1808,"data":"2024-12-31","cliente":"WELLINGTON - ARACAJU","nf":"RECIBO","areas":{"A1":3000},"qtde":3000,"total":3700.0,"frete":0,"valorRecebido":3700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1809,"data":"2025-01-02","cliente":"LINCOLN - CAMPO GRANDE","nf":"1747","areas":{"A2":8000,"MDB":3000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1810,"data":"2025-01-02","cliente":"DONA FATIMA - MACIEO","nf":"1749","areas":{"A2":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1811,"data":"2025-01-03","cliente":"WELLINGTON -  ARACAJU","nf":"1751","areas":{"A1":3000},"qtde":3000,"total":3750.0,"frete":0,"valorRecebido":3750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1812,"data":"2025-01-03","cliente":"DIEGO - LINHARES","nf":"1753","areas":{"A1":16000},"qtde":16000,"total":13431.25,"frete":0,"valorRecebido":13431.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1813,"data":"2025-01-03","cliente":"DIEGO - LINHARES","nf":"1754","areas":{"A1":16000},"qtde":16000,"total":13440.999999999998,"frete":0,"valorRecebido":13440.999999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1814,"data":"2025-01-03","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDB":1700},"qtde":1700,"total":1215.234375,"frete":0,"valorRecebido":1215.234375,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1815,"data":"2025-01-06","cliente":"WELLINGTON -  ARACAJU","nf":"1755","areas":{"A1":4000},"qtde":4000,"total":5000.0,"frete":0,"valorRecebido":5000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1816,"data":"2025-01-06","cliente":"RENAN - CEAGESP","nf":"1757","areas":{"A1":18000},"qtde":18000,"total":23400.0,"frete":0,"valorRecebido":23400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1817,"data":"2025-01-06","cliente":"LINCOLN - CAMPO GRANDE","nf":"1758","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1818,"data":"2025-01-07","cliente":"DONA FATIMA - MACIEO","nf":"1760","areas":{"A2":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1819,"data":"2025-01-07","cliente":"ASSIS - CAMPINAS","nf":"1761","areas":{"MA":9000},"qtde":9000,"total":24300.0,"frete":9900.0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1820,"data":"2025-01-07","cliente":"DIEGO - LINHARES","nf":"1763","areas":{"A1":16000},"qtde":16000,"total":11437.5,"frete":0,"valorRecebido":11437.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1821,"data":"2025-01-08","cliente":"DIEGO - LINHARES","nf":"1764","areas":{"A1":13600,"D":2400},"qtde":16000,"total":11740.0,"frete":0,"valorRecebido":11740.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1822,"data":"2025-01-08","cliente":"LINCOLN - CAMPO GRANDE","nf":"1765","areas":{"MA":6300,"MDC":4700},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1823,"data":"2025-01-08","cliente":"DONA FATIMA - MACIEO","nf":"1765","areas":{"D":8000},"qtde":8000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1824,"data":"2025-01-09","cliente":"DIEGO - LINHARES","nf":"1771","areas":{"D":16000},"qtde":16000,"total":11364.749999999998,"frete":0,"valorRecebido":11364.749999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1825,"data":"2025-01-09","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1772","areas":{"D":9000},"qtde":9000,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1826,"data":"2025-01-13","cliente":"DIEGO - LINHARES","nf":"1777","areas":{"A1":16000},"qtde":16000,"total":11740.0,"frete":0,"valorRecebido":11740.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1827,"data":"2025-01-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1778","areas":{"MDC":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1828,"data":"2025-01-13","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"A1":100},"qtde":100,"total":150.0,"frete":0,"valorRecebido":150.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1829,"data":"2025-01-14","cliente":"HORTA PARA PORTA","nf":"1780","areas":{"D":9000},"qtde":9000,"total":25200.0,"frete":9900.0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1830,"data":"2025-01-14","cliente":"DIEGO - LINHARES","nf":"1781","areas":{"A1":16200,"D":1800},"qtde":18000,"total":13207.5,"frete":0,"valorRecebido":13207.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1831,"data":"2025-01-15","cliente":"DIEGO - LINHARES","nf":"1782","areas":{"A1":13800,"D":4200},"qtde":18000,"total":13376.25,"frete":0,"valorRecebido":13376.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1832,"data":"2025-01-15","cliente":"LINCOLN - CAMPO GRANDE","nf":"1783","areas":{"MDC":7400,"MDB":2600},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1833,"data":"2025-01-16","cliente":"DIEGO - LINHARES","nf":"1787","areas":{"A1":2400,"B":11100,"D":4500},"qtde":18000,"total":12785.343749999998,"frete":0,"valorRecebido":12785.343749999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1834,"data":"2025-01-17","cliente":"ASSIS - CAMPINAS","nf":"1789","areas":{"A1":5000,"MDB":4000},"qtde":9000,"total":27900.0,"frete":9900.0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1835,"data":"2025-01-17","cliente":"DIEGO - LINHARES","nf":"1790","areas":{"A1":16000},"qtde":16000,"total":11666.666666666668,"frete":0,"valorRecebido":11666.666666666668,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1836,"data":"2025-01-20","cliente":"BINHO DO COCO","nf":"1793","areas":{"B":1700},"qtde":1700,"total":2550.0,"frete":0,"valorRecebido":2550.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1837,"data":"2025-01-20","cliente":"DIEGO - LINHARES","nf":"1794","areas":{"B":16200},"qtde":16200,"total":15876.0,"frete":0,"valorRecebido":15876.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1838,"data":"2025-01-20","cliente":"LINCOLN - CAMPO GRANDE","nf":"1795","areas":{"A2":200,"MDB":9800},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1839,"data":"2025-01-20","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"MDB":100},"qtde":100,"total":150.0,"frete":0,"valorRecebido":150.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1840,"data":"2025-01-21","cliente":"DIEGO - LINHARES","nf":"1797","areas":{"B":8700,"D":7300},"qtde":16000,"total":15360.0,"frete":0,"valorRecebido":15360.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1841,"data":"2025-01-21","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1798","areas":{"B":10000},"qtde":10000,"total":15000.0,"frete":0,"valorRecebido":15000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1842,"data":"2025-01-22","cliente":"LINCOLN - CAMPO GRANDE","nf":"1800","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1843,"data":"2025-01-23","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"D":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1844,"data":"2025-01-24","cliente":"DIEGO - LINHARES","nf":"1803","areas":{"B":4500,"C":6300,"D":5200},"qtde":16000,"total":13280.0,"frete":0,"valorRecebido":13280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1845,"data":"2025-01-27","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"C":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1846,"data":"2025-01-27","cliente":"DIEGO - LINHARES","nf":"1806","areas":{"C":18000},"qtde":18000,"total":14940.0,"frete":0,"valorRecebido":14940.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1847,"data":"2025-01-28","cliente":"DIEGO - LINHARES","nf":"1807","areas":{"C":18000},"qtde":18000,"total":14940.0,"frete":0,"valorRecebido":14940.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1848,"data":"2025-01-28","cliente":"LINCOLN - CAMPO GRANDE","nf":"1808","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1849,"data":"2025-01-28","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1810","areas":{"A1":9000},"qtde":9000,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1850,"data":"2025-01-29","cliente":"DIEGO - LINHARES","nf":"1811","areas":{"A1":12400,"C":5600},"qtde":18000,"total":16915.2,"frete":8588.0,"valorRecebido":8327.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":42940.0,"litragem":5286.0,"vPorLitro":3.2},{"id":1851,"data":"2025-01-30","cliente":"LINCOLN - CAMPO GRANDE","nf":"1813","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1852,"data":"2025-01-30","cliente":"DIEGO - LINHARES","nf":"1815","areas":{"A1":16000},"qtde":16000,"total":16799.68,"frete":7480.0,"valorRecebido":9319.68,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37400.0,"litragem":5249.9,"vPorLitro":3.2},{"id":1853,"data":"2025-01-30","cliente":"LEONARDO - CEAGESP","nf":"1816","areas":{"A2":3500,"MDC":5500},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1855,"data":"2025-01-31","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1819","areas":{"D":9000},"qtde":9000,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1856,"data":"2025-01-31","cliente":"DIEGO - LINHARES","nf":"1821","areas":{"A1":18000},"qtde":18000,"total":16128.0,"frete":7760.0,"valorRecebido":8368.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38800.0,"litragem":5040.0,"vPorLitro":3.2},{"id":1857,"data":"2025-02-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1822","areas":{"MA":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1858,"data":"2025-02-03","cliente":"DIEGO - LINHARES","nf":"1824","areas":{"A1":16000},"qtde":16000,"total":15110.400000000001,"frete":7120.0,"valorRecebido":7990.4000000000015,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35600.0,"litragem":4722.0,"vPorLitro":3.2},{"id":1859,"data":"2025-02-03","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"MA":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1860,"data":"2025-02-04","cliente":"ASSIS - CAMPINAS","nf":"1826","areas":{"MDC":9000},"qtde":9000,"total":27900.0,"frete":9900.0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1861,"data":"2025-02-04","cliente":"LEONARDO - CEAGESP","nf":"1827","areas":{"MA":1000,"MDC":8000},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1862,"data":"2025-02-05","cliente":"DIEGO - LINHARES","nf":"1828","areas":{"D":16000},"qtde":16000,"total":16342.400000000001,"frete":7660.0,"valorRecebido":8682.400000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38300.0,"litragem":5107.0,"vPorLitro":3.2},{"id":1863,"data":"2025-02-05","cliente":"DIEGO - LINHARES","nf":"1830","areas":{"A1":7100,"D":9200},"qtde":16300,"total":17027.2,"frete":8212.0,"valorRecebido":8815.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41060.0,"litragem":5321.0,"vPorLitro":3.2},{"id":1864,"data":"2025-02-06","cliente":"LEONARDO - CEAGESP","nf":"1835","areas":{"MDC":9000},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1865,"data":"2025-02-06","cliente":"DIEGO - LINHARES","nf":"1838","areas":{"A1":14200},"qtde":14200,"total":14592.0,"frete":7084.0,"valorRecebido":7508.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35420.0,"litragem":4560.0,"vPorLitro":3.2},{"id":1866,"data":"2025-02-07","cliente":"DIEGO - LINHARES","nf":"1839","areas":{"A1":14940,"D":1200},"qtde":16140,"total":13107.2,"frete":8376.0,"valorRecebido":4731.200000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":41880.0,"litragem":4096.0,"vPorLitro":3.2},{"id":1867,"data":"2025-02-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1836","areas":{"MDB":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1868,"data":"2025-02-10","cliente":"DIEGO - LINHARES","nf":"1840","areas":{"B":2100,"D":11900},"qtde":14000,"total":13267.2,"frete":6524.0,"valorRecebido":6743.200000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":32620.0,"litragem":4146.0,"vPorLitro":3.2},{"id":1869,"data":"2025-02-10","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"D":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1870,"data":"2025-02-11","cliente":"LINCOLN - CAMPO GRANDE","nf":"1842","areas":{"A2":7000,"MDB":4000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1871,"data":"2025-02-12","cliente":"DIEGO - LINHARES","nf":"1847","areas":{"C":7800,"D":8600,"MDC":800,"MDB":800},"qtde":18000,"total":16553.600000000002,"frete":7616.0,"valorRecebido":8937.600000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38080.0,"litragem":5173.0,"vPorLitro":3.2},{"id":1872,"data":"2025-02-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1848","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1873,"data":"2025-02-13","cliente":"LEONARDO - CEAGESP","nf":"1850","areas":{"A1":1500,"B":2100,"C":5400},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1874,"data":"2025-02-14","cliente":"DIEGO - LINHARES","nf":"1852","areas":{"A1":400,"B":14000,"C":1600},"qtde":16000,"total":14857.6,"frete":7080.0,"valorRecebido":7777.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35400.0,"litragem":4643.0,"vPorLitro":3.2},{"id":1875,"data":"2025-02-17","cliente":"LINCOLN - CAMPO GRANDE","nf":"1853","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1876,"data":"2025-02-17","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"C":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1877,"data":"2025-02-18","cliente":"LEONARDO - CEAGESP","nf":"1855","areas":{"A1":4400,"C":4600},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1878,"data":"2025-02-18","cliente":"DIEGO - LINHARES","nf":"1856","areas":{"A1":3500,"B":14500},"qtde":18000,"total":17107.2,"frete":7768.0,"valorRecebido":9339.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38840.0,"litragem":5346.0,"vPorLitro":3.2},{"id":1879,"data":"2025-02-19","cliente":"LINCOLN - CAMPO GRANDE","nf":"1857","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1880,"data":"2025-02-19","cliente":"CEARÁ - CAMPINAS","nf":"1860","areas":{"A2":400,"MA":8600},"qtde":9000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1881,"data":"2025-02-19","cliente":"VALTENIO","nf":"RECIBO","areas":{"A2":100},"qtde":100,"total":200.0,"frete":0,"valorRecebido":200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1882,"data":"2025-02-20","cliente":"ASSIS - CAMPINAS","nf":"1861","areas":{"MA":9000},"qtde":9000,"total":27900.0,"frete":9900.0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1883,"data":"2025-02-20","cliente":"LEONARDO - CEAGESP","nf":"1866","areas":{"MA":1800,"MDC":7200},"qtde":9000,"total":27180.0,"frete":10080.000000000002,"valorRecebido":17100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1884,"data":"2025-02-20","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1667","areas":{"D":9000},"qtde":9000,"total":13500.0,"frete":0,"valorRecebido":13500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1885,"data":"2025-02-20","cliente":"DAVID - SANTANA","nf":"RECIBO","areas":{"MA":200},"qtde":200,"total":400.0,"frete":0,"valorRecebido":400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1887,"data":"2025-02-21","cliente":"DIEGO - LINHARES","nf":"1869","areas":{"A1":16500},"qtde":16500,"total":15808.0,"frete":7556.0,"valorRecebido":8252.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37780.0,"litragem":4940.0,"vPorLitro":3.2},{"id":1888,"data":"2025-02-24","cliente":"DIEGO - LINHARES","nf":"1870","areas":{"A1":16000},"qtde":16000,"total":7840.0,"frete":0,"valorRecebido":7840.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1889,"data":"2025-02-24","cliente":"LEONARDO - CEAGESP","nf":"1871","areas":{"MDC":9000},"qtde":9000,"total":28080.0,"frete":9900.0,"valorRecebido":18180.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1890,"data":"2025-02-24","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"D":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1891,"data":"2025-02-25","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1872","areas":{"D":10000},"qtde":10000,"total":15000.0,"frete":0,"valorRecebido":15000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1892,"data":"2025-02-25","cliente":"LINCOLN - CAMPO GRANDE","nf":"1873","areas":{"MDC":6000,"MDB":4000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1893,"data":"2025-02-25","cliente":"DIEGO - LINHARES","nf":"1876","areas":{"A1":18000},"qtde":18000,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1894,"data":"2025-02-27","cliente":"LEONARDO - CEAGESP","nf":"1879","areas":{"MDB":10000},"qtde":10000,"total":31200.0,"frete":11000.0,"valorRecebido":20200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1895,"data":"2025-02-27","cliente":"LINCOLN - CAMPO GRANDE","nf":"1880","areas":{"A2":2300,"MDB":6700},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1896,"data":"2025-02-28","cliente":"DIEGO - LINHARES","nf":"1882","areas":{"A1":14000,"D":1200,"MDC":1200,"MDB":1200},"qtde":17600,"total":14960.0,"frete":0,"valorRecebido":14960.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1897,"data":"2025-02-28","cliente":"CEARÁ - CAMPINAS","nf":"1883","areas":{"A2":9000},"qtde":9000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1898,"data":"2025-03-03","cliente":"LINCOLN - CAMPO GRANDE","nf":"1884","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1899,"data":"2025-03-03","cliente":"JOSE EVERLAN","nf":"RECIBO","areas":{"A2":80},"qtde":80,"total":120.0,"frete":0,"valorRecebido":120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1900,"data":"2025-03-05","cliente":"LINCOLN - CAMPO GRANDE","nf":"1886","areas":{"D":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1901,"data":"2025-03-06","cliente":"LEONARDO - CEAGESP","nf":"1888","areas":{"A2":3400,"D":6600},"qtde":10000,"total":30200.0,"frete":11000.0,"valorRecebido":19200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1902,"data":"2025-03-06","cliente":"ASSIS - CAMPINAS","nf":"1889","areas":{"D":9000},"qtde":9000,"total":27900.0,"frete":9900.0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1903,"data":"2025-03-06","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"D":2000},"qtde":2000,"total":3000.0,"frete":0,"valorRecebido":3000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1904,"data":"2025-03-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1890","areas":{"A2":9000},"qtde":9000,"total":18000.0,"frete":0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1905,"data":"2025-03-07","cliente":"LEONARDO - CEAGESP","nf":"1892","areas":{"A2":3000,"MA":6000},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1906,"data":"2025-03-11","cliente":"LINCOLN - CAMPO GRANDE","nf":"1893","areas":{"MA":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1907,"data":"2025-03-11","cliente":"DIEGO - LINHARES","nf":"1895","areas":{"A1":15500},"qtde":15500,"total":13175.0,"frete":0,"valorRecebido":13175.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1908,"data":"2025-03-13","cliente":"LEONARDO - CEAGESP","nf":"1896","areas":{"MA":3900,"MDC":5100},"qtde":9000,"total":27180.0,"frete":9900.0,"valorRecebido":17280.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1909,"data":"2025-03-13","cliente":"LINCOLN - CAMPO GRANDE","nf":"1897","areas":{"MA":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1910,"data":"2025-03-13","cliente":"DIEGO - LINHARES","nf":"1899","areas":{"A1":16000},"qtde":16000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1911,"data":"2025-03-14","cliente":"DIEGO - LINHARES","nf":"1900","areas":{"A1":16000},"qtde":16000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1912,"data":"2025-03-17","cliente":"DIEGO - LINHARES","nf":"1902","areas":{"A1":17300},"qtde":17300,"total":14705.0,"frete":0,"valorRecebido":14705.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1913,"data":"2025-03-17","cliente":"LEONARDO - CEAGESP","nf":"1903","areas":{"D":10000},"qtde":10000,"total":27200.000000000004,"frete":11000.0,"valorRecebido":16200.000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1914,"data":"2025-03-18","cliente":"DIEGO - LINHARES","nf":"1904","areas":{"A1":18000},"qtde":18000,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1915,"data":"2025-03-18","cliente":"LEONARDO - CEAGESP","nf":"1905","areas":{"MDC":6000,"MDB":4000},"qtde":10000,"total":31200.0,"frete":11000.0,"valorRecebido":20200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1916,"data":"2025-03-18","cliente":"LINCOLN - CAMPO GRANDE","nf":"1906","areas":{"MDB":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1917,"data":"2025-03-18","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"D":2500},"qtde":2500,"total":3750.0,"frete":0,"valorRecebido":3750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1918,"data":"2025-03-19","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1908","areas":{"C":10000},"qtde":10000,"total":15000.0,"frete":0,"valorRecebido":15000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1919,"data":"2025-03-20","cliente":"ASSIS - CAMPINAS","nf":"1910","areas":{"A2":2500,"MDB":6500},"qtde":9000,"total":27900.0,"frete":9900.0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1920,"data":"2025-03-20","cliente":"LEONARDO - CEAGESP","nf":"1911","areas":{"D":10000},"qtde":10000,"total":27200.000000000004,"frete":11000.0,"valorRecebido":16200.000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1921,"data":"2025-03-21","cliente":"DIEGO - LINHARES","nf":"1920","areas":{"B":15500,"MDC":850,"MDB":850},"qtde":17200,"total":14620.0,"frete":0,"valorRecebido":14620.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1922,"data":"2025-03-21","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"C":2500},"qtde":2500,"total":3750.0,"frete":0,"valorRecebido":3750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1923,"data":"2025-03-21","cliente":"LEONARDO - CEAGESP","nf":"1922","areas":{"C":9000},"qtde":9000,"total":24480.0,"frete":9900.0,"valorRecebido":14580.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1924,"data":"2025-03-24","cliente":"LINCOLN - CAMPO GRANDE","nf":"1924","areas":{"A2":10000},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1925,"data":"2025-03-24","cliente":"DIEGO - LINHARES","nf":"1926","areas":{"C":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1926,"data":"2025-03-24","cliente":"LEONARDO - CEAGESP","nf":"1927","areas":{"D":11000},"qtde":11000,"total":29920.000000000004,"frete":12100.000000000002,"valorRecebido":17820.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1927,"data":"2025-03-25","cliente":"DIEGO - LINHARES","nf":"1929","areas":{"B":4800,"D":12200},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1928,"data":"2025-03-25","cliente":"LEONARDO - CEAGESP","nf":"1930","areas":{"D":10000},"qtde":10000,"total":27200.000000000004,"frete":11000.0,"valorRecebido":16200.000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1929,"data":"2025-03-25","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A2":2500},"qtde":2500,"total":4500.0,"frete":0,"valorRecebido":4500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1930,"data":"2025-03-26","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1933","areas":{"C":9000},"qtde":9000,"total":13500.0,"frete":0,"valorRecebido":13500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1931,"data":"2025-03-26","cliente":"LINCOLN - CAMPO GRANDE","nf":"1935","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1932,"data":"2025-03-27","cliente":"LEONARDO - CEAGESP","nf":"1937","areas":{"C":6000,"D":4000},"qtde":10000,"total":27200.000000000004,"frete":11000.0,"valorRecebido":16200.000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1933,"data":"2025-03-28","cliente":"DIEGO - LINHARES","nf":"1939","areas":{"A1":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1934,"data":"2025-03-28","cliente":"LEONARDO - CEAGESP","nf":"1942","areas":{"MA":9000},"qtde":9000,"total":28080.0,"frete":9900.0,"valorRecebido":18180.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1935,"data":"2025-03-28","cliente":"DIEGO - LINHARES","nf":"1943","areas":{"A1":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1936,"data":"2025-03-31","cliente":"DIEGO - LINHARES","nf":"1944","areas":{"A1":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1937,"data":"2025-03-31","cliente":"LINCOLN - CAMPO GRANDE","nf":"1945","areas":{"A2":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1938,"data":"2025-04-01","cliente":"LEONARDO - CEAGESP","nf":"1949","areas":{"A1":9000},"qtde":9000,"total":24480.0,"frete":9900.0,"valorRecebido":14580.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1939,"data":"2025-04-01","cliente":"JACIARA - FEIRA DE SANTANA","nf":"1950","areas":{"A1":9000},"qtde":9000,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1940,"data":"2025-04-01","cliente":"DIEGO - LINHARES","nf":"1951","areas":{"A1":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1941,"data":"2025-04-02","cliente":"GEORGE - VITTA FRUTAS","nf":"1952","areas":{"D":14500},"qtde":14500,"total":21750.0,"frete":0,"valorRecebido":21750.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1942,"data":"2025-04-03","cliente":"LEONARDO - CEAGESP","nf":"1953","areas":{"A2":5000,"MDB":4000},"qtde":9000,"total":24480.0,"frete":9900.0,"valorRecebido":14580.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1943,"data":"2025-04-04","cliente":"DIEGO - LINHARES","nf":"1954","areas":{"A1":17000},"qtde":17000,"total":14450.0,"frete":0,"valorRecebido":14450.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1944,"data":"2025-04-07","cliente":"LINCOLN - CAMPO GRANDE","nf":"1955","areas":{"MA":5400,"MDC":4600},"qtde":10000,"total":20000.0,"frete":0,"valorRecebido":20000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1945,"data":"2025-04-08","cliente":"DIEGO - LINHARES","nf":"1960","areas":{"C":15000,"D":1100,"MDC":900},"qtde":17000,"total":19874.0,"frete":7580.0,"valorRecebido":12294.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":37900.0,"litragem":5230.0,"vPorLitro":3.8},{"id":1946,"data":"2025-04-08","cliente":"CEARÁ - CAMPINAS","nf":"1961","areas":{"MA":10000},"qtde":10000,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1947,"data":"2025-04-08","cliente":"LEONARDO - CEAGESP","nf":"1962","areas":{"D":10000},"qtde":10000,"total":27200.000000000004,"frete":11000.0,"valorRecebido":16200.000000000004,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1948,"data":"2025-04-09","cliente":"GEORGE - VITTA FRUTAS","nf":"1963","areas":{"D":12500,"MDC":2000},"qtde":14500,"total":18850.0,"frete":0,"valorRecebido":18850.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1949,"data":"2025-04-10","cliente":"LEONARDO - CEAGESP","nf":"1964","areas":{"MDC":3500,"MDB":5500},"qtde":9000,"total":24480.0,"frete":9900.0,"valorRecebido":14580.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1950,"data":"2025-04-10","cliente":"LINCOLN - CAMPO GRANDE","nf":"1965","areas":{"MDB":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1951,"data":"2025-04-11","cliente":"LEONARDO - CEAGESP","nf":"1967","areas":{"A2":6500,"MDB":3500},"qtde":10000,"total":27200.000000000004,"frete":11000.0,"valorRecebido":16200.000000000004,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1952,"data":"2025-04-11","cliente":"DIEGO - LINHARES","nf":"1968","areas":{"B":9300,"MDC":4100,"MDB":3600},"qtde":17000,"total":20706.2,"frete":7852.0,"valorRecebido":12854.2,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":39260.0,"litragem":5449.0,"vPorLitro":3.8},{"id":1953,"data":"2025-04-14","cliente":"DIEGO - LINHARES","nf":"1969","areas":{"B":9000,"C":2000,"D":6000},"qtde":17000,"total":19737.2,"frete":7528.0,"valorRecebido":12209.2,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":37640.0,"litragem":5194.0,"vPorLitro":3.8},{"id":1954,"data":"2025-04-14","cliente":"LEONARDO - CEAGESP","nf":"1971","areas":{"A2":8500},"qtde":8500,"total":22270.0,"frete":9350.0,"valorRecebido":12920.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1955,"data":"2025-04-16","cliente":"LEONARDO - CEAGESP","nf":"1972","areas":{"A2":9000},"qtde":9000,"total":23580.0,"frete":9900.0,"valorRecebido":13680.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1956,"data":"2025-04-16","cliente":"DIEGO - LINHARES","nf":"1973","areas":{"A1":1700,"C":9000,"D":7300},"qtde":18000,"total":24244.0,"frete":8376.0,"valorRecebido":15868.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":41880.0,"litragem":6380.0,"vPorLitro":3.8},{"id":1957,"data":"2025-04-17","cliente":"LEONARDO - CEAGESP","nf":"1974","areas":{"A2":10000},"qtde":10000,"total":26200.0,"frete":11000.0,"valorRecebido":15200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1958,"data":"2025-04-22","cliente":"DIEGO - LINHARES","nf":"1975","areas":{"A1":16000},"qtde":16000,"total":18711.2,"frete":7012.0,"valorRecebido":11699.2,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":35060.0,"litragem":4924.0,"vPorLitro":3.8},{"id":1959,"data":"2025-04-23","cliente":"COCO DIAMANTE","nf":"1977","areas":{"A1":4500},"qtde":4500,"total":11790.0,"frete":4950.0,"valorRecebido":6840.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1960,"data":"2025-04-23","cliente":"DA HORTA PARA PORTA","nf":"1983","areas":{"A1":4500},"qtde":4500,"total":11790.0,"frete":4950.0,"valorRecebido":6840.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1961,"data":"2025-04-24","cliente":"LEONARDO - CEAGESP","nf":"1984","areas":{"A2":5800,"MA":3200},"qtde":9000,"total":23580.0,"frete":9900.0,"valorRecebido":13680.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1962,"data":"2025-04-25","cliente":"DIEGO - LINHARES","nf":"1985","areas":{"A1":13000,"A2":2000},"qtde":15000,"total":17153.2,"frete":6612.0,"valorRecebido":10541.2,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":33060.0,"litragem":4514.0,"vPorLitro":3.8},{"id":1963,"data":"2025-04-25","cliente":"DIEGO - LINHARES","nf":"1986","areas":{"A1":18000},"qtde":18000,"total":21629.6,"frete":7888.0,"valorRecebido":13741.599999999999,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":39440.0,"litragem":5692.0,"vPorLitro":3.8},{"id":1964,"data":"2025-04-28","cliente":"DIEGO - LINHARES","nf":"1987","areas":{"A1":16000},"qtde":16000,"total":18808.1,"frete":7288.0,"valorRecebido":11520.099999999999,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":36440.0,"litragem":4949.5,"vPorLitro":3.8},{"id":1965,"data":"2025-04-28","cliente":"LINCOLN - CAMPO GRANDE","nf":"1988","areas":{"MA":11000},"qtde":11000,"total":22000.0,"frete":0,"valorRecebido":22000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1966,"data":"2025-04-28","cliente":"LEONARDO - CEAGESP","nf":"1990","areas":{"MA":6000,"MDC":3000},"qtde":9000,"total":23580.0,"frete":9900.0,"valorRecebido":13680.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1967,"data":"2025-04-29","cliente":"DIEGO - LINHARES","nf":"1991","areas":{"A1":14000,"MA":2000},"qtde":16000,"total":18576.3,"frete":7296.0,"valorRecebido":11280.3,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":36480.0,"litragem":4888.5,"vPorLitro":3.8},{"id":1968,"data":"2025-04-29","cliente":"DIEGO - LINHARES","nf":"1992","areas":{"A1":16000},"qtde":16000,"total":17733.08,"frete":7224.0,"valorRecebido":10509.080000000002,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":36120.0,"litragem":4666.6,"vPorLitro":3.8},{"id":1969,"data":"2025-04-30","cliente":"DA HORTA PARA PORTA","nf":"1993","areas":{"D":4500},"qtde":4500,"total":11790.0,"frete":4950.0,"valorRecebido":6840.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1970,"data":"2025-04-30","cliente":"COCO DIAMANTE","nf":"1994","areas":{"A1":4500},"qtde":4500,"total":11790.0,"frete":4950.0,"valorRecebido":6840.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1971,"data":"2025-05-02","cliente":"LEONARDO - CEAGESP","nf":"1995","areas":{"MDC":10000},"qtde":10000,"total":24200.0,"frete":11000.0,"valorRecebido":13200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1972,"data":"2025-05-05","cliente":"DIEGO - LINHARES","nf":"1996","areas":{"A1":15000},"qtde":15000,"total":19051.3,"frete":7324.0,"valorRecebido":11727.3,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":36620.0,"litragem":5013.5,"vPorLitro":3.8},{"id":1973,"data":"2025-05-05","cliente":"LEONARDO - CEAGESP","nf":"1997","areas":{"MDC":7000,"MDB":3000},"qtde":10000,"total":24200.0,"frete":11000.0,"valorRecebido":13200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1974,"data":"2025-05-06","cliente":"MARCOS FALCÃO","nf":"1998","areas":{"B":7300,"MDC":1800,"MDB":400},"qtde":9500,"total":6130.2,"frete":2000.0,"valorRecebido":4130.2,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":19290.0,"litragem":3606.0,"vPorLitro":1.7},{"id":1975,"data":"2025-05-07","cliente":"LEONARDO - CEAGESP","nf":"1999","areas":{"D":4500},"qtde":4500,"total":10890.0,"frete":4950.0,"valorRecebido":5940.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1976,"data":"2025-05-07","cliente":"COCO DIAMANTE","nf":"2000","areas":{"C":4500},"qtde":4500,"total":11790.0,"frete":4950.0,"valorRecebido":6840.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1977,"data":"2025-05-08","cliente":"LEONARDO - CEAGESP","nf":"2001","areas":{"C":9000},"qtde":9000,"total":21780.0,"frete":9900.0,"valorRecebido":11880.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1978,"data":"2025-05-09","cliente":"DIEGO - LINHARES","nf":"2002","areas":{"B":17000},"qtde":17000,"total":21235.92,"frete":6968.0,"valorRecebido":14267.919999999998,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":34840.0,"litragem":5588.4,"vPorLitro":3.8},{"id":1979,"data":"2025-05-09","cliente":"DIEGO - LINHARES","nf":"2003","areas":{"B":6800,"C":3000,"D":6200},"qtde":16000,"total":17853.16,"frete":7796.0,"valorRecebido":10057.16,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":38980.0,"litragem":4698.2,"vPorLitro":3.8},{"id":1980,"data":"2025-05-09","cliente":"LEONARDO - CEAGESP","nf":"2004","areas":{"MDB":10000},"qtde":10000,"total":24200.0,"frete":11000.0,"valorRecebido":13200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1981,"data":"2025-05-12","cliente":"DIEGO - LINHARES","nf":"2011","areas":{"B":9900,"D":7100},"qtde":17000,"total":19484.5,"frete":7260.0,"valorRecebido":12224.5,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":36300.0,"litragem":5127.5,"vPorLitro":3.8},{"id":1982,"data":"2025-05-12","cliente":"LEONARDO - CEAGESP","nf":"2012","areas":{"MDB":9000},"qtde":9000,"total":21780.0,"frete":9900.0,"valorRecebido":11880.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1983,"data":"2025-05-13","cliente":"ASSIS - CAMPINAS","nf":"2013","areas":{"B":6200,"MDB":1800},"qtde":8000,"total":16800.0,"frete":8800.0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1984,"data":"2025-05-13","cliente":"DIEGO - LINHARES","nf":"2014","areas":{"D":16000},"qtde":16000,"total":19526.3,"frete":7552.0,"valorRecebido":11974.3,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":37760.0,"litragem":5138.5,"vPorLitro":3.8},{"id":1985,"data":"2025-05-14","cliente":"GLAUBER - BH","nf":"2015","areas":{"D":10000},"qtde":10000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1986,"data":"2025-05-15","cliente":"LEONARDO - CEAGESP","nf":"2017","areas":{"D":10000},"qtde":10000,"total":24200.0,"frete":11000.0,"valorRecebido":13200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1987,"data":"2025-05-16","cliente":"DIEGO - LINHARES","nf":"2021","areas":{"C":5400,"D":10600},"qtde":16000,"total":20057.54,"frete":7344.0,"valorRecebido":12713.54,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":36720.0,"litragem":5278.3,"vPorLitro":3.8},{"id":1988,"data":"2025-05-16","cliente":"FRYSK","nf":"2023","areas":{"A2":900,"C":9000},"qtde":9900,"total":7657.19,"frete":2426.0,"valorRecebido":5231.19,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":24260.0,"litragem":4030.1,"vPorLitro":1.9},{"id":1989,"data":"2025-05-16","cliente":"LEONARDO - CEAGESP","nf":"2022","areas":{"A2":10000},"qtde":10000,"total":24200.0,"frete":11000.0,"valorRecebido":13200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1990,"data":"2025-05-20","cliente":"DIEGO - LINHARES","nf":"2024","areas":{"A2":16800},"qtde":16800,"total":21170.559999999998,"frete":8260.0,"valorRecebido":12910.559999999998,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":41300.0,"litragem":5571.2,"vPorLitro":3.8},{"id":1991,"data":"2025-05-23","cliente":"LEONARDO - CEAGESP","nf":"2027","areas":{"A2":9000},"qtde":9000,"total":21780.0,"frete":9900.0,"valorRecebido":11880.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1992,"data":"2025-05-23","cliente":"DIEGO - LINHARES","nf":"2028","areas":{"A1":11400,"A2":3600},"qtde":15000,"total":17126.6,"frete":6552.0,"valorRecebido":10574.599999999999,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":32760.0,"litragem":4507.0,"vPorLitro":3.8},{"id":1993,"data":"2025-05-26","cliente":"CEARÁ - CAMPINAS","nf":"2032","areas":{"A2":8500},"qtde":8500,"total":8500.0,"frete":0,"valorRecebido":8500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1994,"data":"2025-05-27","cliente":"RAFAEL - MACEIÓ","nf":"2033","areas":{"A2":2500},"qtde":2500,"total":2500.0,"frete":0,"valorRecebido":2500.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1995,"data":"2025-04-27","cliente":"DIEGO - LINHARES","nf":"2034","areas":{"A1":9000,"A2":7500},"qtde":16500,"total":17654.8,"frete":6888.0,"valorRecebido":10766.8,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"litro","pesoKg":34440.0,"litragem":4646.0,"vPorLitro":3.8},{"id":1996,"data":"2025-05-28","cliente":"JOÃO - ARACAJU","nf":"2035","areas":{"A2":3500,"MA":500},"qtde":4000,"total":4000.0,"frete":0,"valorRecebido":4000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1997,"data":"2025-05-29","cliente":"GENILSON - AJU","nf":"2036","areas":{"MA":2000},"qtde":2000,"total":2200.0,"frete":0,"valorRecebido":2200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":1998,"data":"2025-05-30","cliente":"DIEGO - LINHARES","nf":"2037","areas":{"A1":12600,"A2":2100,"MA":300},"qtde":15000,"total":17632.76,"frete":7276.0,"valorRecebido":10356.759999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36380.0,"litragem":4640.2,"vPorLitro":3.8},{"id":1999,"data":"2025-05-30","cliente":"LEONARDO - CEAGESP","nf":"2038","areas":{"MA":10000},"qtde":10000,"total":24200.0,"frete":11000.0,"valorRecebido":13200.0,"status":"PENDENTE","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2000,"data":"2025-06-03","cliente":"DIEGO - LINHARES","nf":"2041","areas":{"A1":12300,"MA":4700},"qtde":17000,"total":18789.859999999997,"frete":8168.0,"valorRecebido":10621.859999999997,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40840.0,"litragem":4944.7,"vPorLitro":3.8},{"id":2001,"data":"2025-06-03","cliente":"FRYSK","nf":"2042","areas":{"A1":9300},"qtde":9300,"total":6420.240000000001,"frete":2234.0,"valorRecebido":4186.240000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22340.0,"litragem":3566.8,"vPorLitro":1.8},{"id":2002,"data":"2025-06-04","cliente":"FRYSK","nf":"2044","areas":{"A1":10000},"qtde":10000,"total":6681.78,"frete":2288.0,"valorRecebido":4393.78,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22880.0,"litragem":3712.1,"vPorLitro":1.8},{"id":2003,"data":"2025-06-05","cliente":"FRYSK","nf":"2045","areas":{"A1":9300},"qtde":9300,"total":6092.820000000001,"frete":2080.0,"valorRecebido":4012.8200000000006,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":20800.0,"litragem":3384.9,"vPorLitro":1.8},{"id":2004,"data":"2025-06-05","cliente":"FRYSK","nf":"2046","areas":{"A1":9300},"qtde":9300,"total":5491.26,"frete":2196.0,"valorRecebido":3295.26,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":21960.0,"litragem":3050.7,"vPorLitro":1.8},{"id":2005,"data":"2025-06-06","cliente":"DIEGO - LINHARES","nf":"2048","areas":{"A1":16500},"qtde":16500,"total":19423.319999999996,"frete":7584.0,"valorRecebido":11839.319999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37920.0,"litragem":5111.4,"vPorLitro":3.8},{"id":2006,"data":"2025-06-06","cliente":"DIEGO - LINHARES","nf":"2049","areas":{"A1":7200,"D":8800},"qtde":16000,"total":7840.0,"frete":0,"valorRecebido":7840.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2007,"data":"2025-06-09","cliente":"BINHO DO COCO","nf":"2050","areas":{"MDC":3000},"qtde":3000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2008,"data":"2025-06-10","cliente":"DIEGO - LINHARES","nf":"2051","areas":{"C":3800,"D":4900,"MA":5800,"MDC":2500},"qtde":17000,"total":20318.6,"frete":7988.0,"valorRecebido":12330.599999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":39940.0,"litragem":5347.0,"vPorLitro":3.8},{"id":2009,"data":"2025-06-12","cliente":"DIEGO - LINHARES","nf":"2052","areas":{"MDC":16000},"qtde":16000,"total":10533.6,"frete":8144.0,"valorRecebido":2389.6000000000004,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40720.0,"litragem":5852.0,"vPorLitro":1.8},{"id":2010,"data":"2025-06-13","cliente":"DIEGO - LINHARES","nf":"2056","areas":{"D":7200,"MDC":7800},"qtde":15000,"total":19600.019999999997,"frete":0,"valorRecebido":19600.019999999997,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37880.0,"litragem":5157.9,"vPorLitro":3.8},{"id":2011,"data":"2025-06-16","cliente":"BINHO DO COCO","nf":"2060","areas":{"MDC":3000},"qtde":3000,"total":2100.0,"frete":0,"valorRecebido":2100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2012,"data":"2025-06-16","cliente":"GENISLSON","nf":"2061","areas":{"MDC":1500},"qtde":1500,"total":1500.0,"frete":0,"valorRecebido":1500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2013,"data":"2025-06-17","cliente":"DIEGO - LINHARES","nf":"2062","areas":{"D":13000,"MDB":2000},"qtde":15000,"total":19497.04,"frete":7472.0,"valorRecebido":12025.04,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37360.0,"litragem":5130.8,"vPorLitro":3.8},{"id":2014,"data":"2025-06-19","cliente":"CEARÁ - CAMPINAS","nf":"2063","areas":{"MDB":7000},"qtde":7000,"total":5600.0,"frete":0,"valorRecebido":5600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2015,"data":"2025-06-20","cliente":"DIEGO - LINHARES","nf":"2064","areas":{"C":8700,"D":7300},"qtde":16000,"total":16404.6,"frete":7976.0,"valorRecebido":8428.599999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":39880.0,"litragem":4317.0,"vPorLitro":3.8},{"id":2016,"data":"2025-06-20","cliente":"DIEGO - LINHARES","nf":"2065","areas":{"C":11900,"D":2800},"qtde":14700,"total":15747.199999999999,"frete":7000.0,"valorRecebido":8747.199999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35000.0,"litragem":4144.0,"vPorLitro":3.8},{"id":2017,"data":"2025-06-23","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"MDB":1500},"qtde":1500,"total":1050.0,"frete":0,"valorRecebido":1050.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2018,"data":"2025-06-25","cliente":"DIEGO - LINHARES","nf":"2068","areas":{"C":14900,"D":1100},"qtde":16000,"total":18269.26,"frete":7984.0,"valorRecebido":10285.259999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":39920.0,"litragem":4807.7,"vPorLitro":3.8},{"id":2019,"data":"2025-06-26","cliente":"NECTTARE","nf":"2069","areas":{"D":6430,"MDB":8800},"qtde":15230,"total":9240.0,"frete":4648.6,"valorRecebido":4591.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":42260.0,"litragem":6600.0,"vPorLitro":1.4},{"id":2020,"data":"2025-06-26","cliente":"NECTTARE","nf":"2070","areas":{"D":20000},"qtde":20000,"total":10780.0,"frete":5585.8,"valorRecebido":5194.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":50780.0,"litragem":7700.0,"vPorLitro":1.4},{"id":2021,"data":"2025-06-30","cliente":"DIEGO - LINHARES","nf":"2075","areas":{"A2":15000},"qtde":15000,"total":20401.819999999996,"frete":7844.0,"valorRecebido":12557.819999999996,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":39220.0,"litragem":5368.9,"vPorLitro":3.8},{"id":2022,"data":"2025-07-01","cliente":"NECTTARE","nf":"2076","areas":{"D":15000},"qtde":15000,"total":7839.999999999999,"frete":4204.2,"valorRecebido":3635.7999999999993,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38220.0,"litragem":5600.0,"vPorLitro":1.4},{"id":2023,"data":"2025-07-01","cliente":"NECTTARE","nf":"2077","areas":{"A1":19500,"D":500},"qtde":20000,"total":10780.0,"frete":5489.0,"valorRecebido":5291.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":49900.0,"litragem":7700.0,"vPorLitro":1.4},{"id":2024,"data":"2025-07-02","cliente":"NECTTARE","nf":"2079","areas":{"A1":27000},"qtde":27000,"total":14699.999999999998,"frete":7167.6,"valorRecebido":7532.399999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":65160.0,"litragem":10500.0,"vPorLitro":1.4},{"id":2025,"data":"2025-07-03","cliente":"DIEGO - LINHARES","nf":"2080","areas":{"A1":2900,"A2":14600},"qtde":17500,"total":18144.24,"frete":7464.0,"valorRecebido":10680.240000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37320.0,"litragem":4774.8,"vPorLitro":3.8},{"id":2026,"data":"2025-07-03","cliente":"LEONARDO - CEAGESP","nf":"2081","areas":{"A2":9000},"qtde":9000,"total":6310.159999999998,"frete":0,"valorRecebido":6310.159999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2027,"data":"2025-07-03","cliente":"GENILSON","nf":"RECIBO","areas":{"A2":1500},"qtde":1500,"total":1200.0,"frete":0,"valorRecebido":1200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2028,"data":"2025-07-04","cliente":"DIEGO - LINHARES","nf":"2082","areas":{"A2":17300},"qtde":17300,"total":19472.719999999998,"frete":8588.0,"valorRecebido":10884.719999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":42940.0,"litragem":5124.4,"vPorLitro":3.8},{"id":2029,"data":"2025-07-07","cliente":"NECTTARE","nf":"2084","areas":{"A1":9700,"A2":10800},"qtde":20500,"total":10500.0,"frete":5244.8,"valorRecebido":5255.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":47680.0,"litragem":7500.0,"vPorLitro":1.4},{"id":2030,"data":"2025-07-08","cliente":"LEONARDO - CEAGESP","nf":"2085","areas":{"MA":9000},"qtde":9000,"total":5370.040000000003,"frete":0,"valorRecebido":5370.040000000003,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2031,"data":"2025-07-09","cliente":"NECTTARE","nf":"2086","areas":{"A1":17500,"MA":3500},"qtde":21000,"total":10500.0,"frete":5401.0,"valorRecebido":5099.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":49100.0,"litragem":7500.0,"vPorLitro":1.4},{"id":2032,"data":"2025-07-10","cliente":"NECTTARE","nf":"2088","areas":{"A1":16000},"qtde":16000,"total":8400.0,"frete":4109.6,"valorRecebido":4290.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37360.0,"litragem":6000.0,"vPorLitro":1.4},{"id":2033,"data":"2025-07-10","cliente":"RAFAEL - MACEIÓ","nf":"2087","areas":{"MA":3000},"qtde":3000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2034,"data":"2025-07-11","cliente":"DIEGO - LINHARES","nf":"2089","areas":{"A1":15300,"C":500,"D":600},"qtde":16400,"total":20687.2,"frete":8004.0,"valorRecebido":12683.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40020.0,"litragem":5444.0,"vPorLitro":3.8},{"id":2035,"data":"2025-07-11","cliente":"LEONARDO - CEAGESP","nf":"2090","areas":{"MA":9000},"qtde":9000,"total":5830.807999999999,"frete":0,"valorRecebido":5830.807999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2036,"data":"2025-07-11","cliente":"FRYSK","nf":"2091","areas":{"C":1700,"D":3400,"MA":4200},"qtde":9300,"total":4871.2,"frete":2129.0,"valorRecebido":2742.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":21290.0,"litragem":3044.5,"vPorLitro":1.6},{"id":2037,"data":"2025-07-15","cliente":"DIEGO - LINHARES","nf":"2093","areas":{"C":4800,"D":10000},"qtde":14800,"total":18483.2,"frete":7284.0,"valorRecebido":11199.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36420.0,"litragem":4864.0,"vPorLitro":3.8},{"id":2038,"data":"2025-07-15","cliente":"LEONARDO - CEAGESP","nf":"2094","areas":{"D":4900,"MA":4100},"qtde":9000,"total":6067.7119999999995,"frete":0,"valorRecebido":6067.7119999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2039,"data":"2025-07-16","cliente":"NECTTARE","nf":"2098","areas":{"C":4700,"D":8000,"MA":2300,"MDC":2000},"qtde":17000,"total":8540.0,"frete":4466.0,"valorRecebido":4074.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40600.0,"litragem":6100.0,"vPorLitro":1.4},{"id":2040,"data":"2025-07-17","cliente":"NECTTARE","nf":"2099","areas":{"C":6500,"D":14500},"qtde":21000,"total":10780.0,"frete":5599.0,"valorRecebido":5181.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":50900.0,"litragem":7700.0,"vPorLitro":1.4},{"id":2041,"data":"2025-07-18","cliente":"LEONARDO - CEAGESP","nf":"2103","areas":{"MDC":9000},"qtde":9000,"total":4573.399999999997,"frete":0,"valorRecebido":4573.399999999997,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2042,"data":"2025-07-18","cliente":"DIEGO - LINHARES","nf":"2021","areas":{"C":4000,"D":11000},"qtde":15000,"total":20078.059999999998,"frete":7452.0,"valorRecebido":12626.059999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37260.0,"litragem":5283.7,"vPorLitro":3.8},{"id":2043,"data":"2025-07-21","cliente":"LEONARDO - CEAGESP","nf":"2104","areas":{"MDC":9000},"qtde":9000,"total":5071.760000000001,"frete":0,"valorRecebido":5071.760000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2044,"data":"2025-07-21","cliente":"GENILSON","nf":"RECIBO","areas":{"MDC":2000},"qtde":2000,"total":1600.0,"frete":0,"valorRecebido":1600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2045,"data":"2025-07-21","cliente":"FRYSK","nf":"2105","areas":{"C":1600,"D":1700,"MDC":7700},"qtde":11000,"total":7084.32,"frete":2690.0,"valorRecebido":4394.32,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":26900.0,"litragem":4427.7,"vPorLitro":1.6},{"id":2046,"data":"2025-07-22","cliente":"DIEGO - LINHARES","nf":"2107","areas":{"C":11100,"D":5900},"qtde":17000,"total":17609.899999999998,"frete":7644.0,"valorRecebido":9965.899999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38220.0,"litragem":5031.4,"vPorLitro":3.5},{"id":2047,"data":"2025-07-23","cliente":"FRYSK","nf":"2109","areas":{"D":15700,"MDC":1000},"qtde":16700,"total":8236.64,"frete":3716.0,"valorRecebido":4520.639999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37160.0,"litragem":5147.9,"vPorLitro":1.6},{"id":2048,"data":"2025-07-24","cliente":"FRYSK","nf":"2110","areas":{"C":1000,"D":9200},"qtde":10200,"total":7265.12,"frete":2577.0,"valorRecebido":4688.12,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":25770.0,"litragem":4540.7,"vPorLitro":1.6},{"id":2049,"data":"2025-07-25","cliente":"LEONARDO - CEAGESP","nf":"2111","areas":{"MDC":4100,"MDB":4900},"qtde":9000,"total":5897.208000000001,"frete":0,"valorRecebido":5897.208000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2050,"data":"2025-07-28","cliente":"CEARÁ - CAMPINAS","nf":"2112","areas":{"MDB":10000},"qtde":10000,"total":7500.0,"frete":0,"valorRecebido":7500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2051,"data":"2025-07-28","cliente":"LEONARDO - CEAGESP","nf":"2113","areas":{"MDB":9000},"qtde":9000,"total":6066.959999999997,"frete":0,"valorRecebido":6066.959999999997,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2052,"data":"2025-07-28","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2114","areas":{"MDB":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2053,"data":"2025-07-29","cliente":"DIEGO - LINHARES","nf":"2119","areas":{"C":700,"MDC":2300,"MDB":14300},"qtde":17300,"total":17209.5,"frete":7404.0,"valorRecebido":9805.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37020.0,"litragem":4917.0,"vPorLitro":3.5},{"id":2054,"data":"2025-07-30","cliente":"RAFAEL - MACEIÓ","nf":"2120","areas":{"MDB":3000},"qtde":3000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2055,"data":"2025-08-01","cliente":"LEONARDO - CEAGESP","nf":"2122","areas":{"A2":2000,"MDB":7000},"qtde":9000,"total":5687.9439999999995,"frete":0,"valorRecebido":5687.9439999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2056,"data":"2025-08-01","cliente":"DIEGO - LINHARES","nf":"2123","areas":{"A2":3500,"C":3300,"D":5800,"MDB":4400},"qtde":17000,"total":18161.5,"frete":7328.0,"valorRecebido":10833.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36640.0,"litragem":5189.0,"vPorLitro":3.5},{"id":2057,"data":"2025-08-04","cliente":"LEONARDO - CEAGESP","nf":"2124","areas":{"A2":10000},"qtde":10000,"total":6926.160000000001,"frete":0,"valorRecebido":6926.160000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2058,"data":"2025-08-05","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2125","areas":{"A2":9000},"qtde":9000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2059,"data":"2025-08-06","cliente":"FRYSK","nf":"2127","areas":{"A2":10000},"qtde":10000,"total":6144.0,"frete":2072.0,"valorRecebido":4072.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":20720.0,"litragem":3840.0,"vPorLitro":1.6},{"id":2060,"data":"2025-08-06","cliente":"GLAUBER - BH","nf":"2128","areas":{"A2":9000},"qtde":9000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2061,"data":"2025-08-07","cliente":"RAFAEL - MACEIÓ","nf":"2129","areas":{"MA":3000},"qtde":3000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2062,"data":"2025-08-07","cliente":"DONA FATIMA - MACIEO","nf":"2130","areas":{"MA":8000},"qtde":8000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2063,"data":"2025-08-07","cliente":"GENILSON","nf":"RECIBO","areas":{"MA":2000},"qtde":2000,"total":1600.0,"frete":0,"valorRecebido":1600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2064,"data":"2025-08-08","cliente":"DIEGO - LINHARES","nf":"2132","areas":{"A2":11800,"MA":7200},"qtde":19000,"total":21297.149999999998,"frete":7752.0,"valorRecebido":13545.149999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38760.0,"litragem":6084.9,"vPorLitro":3.5},{"id":2065,"data":"2025-08-11","cliente":"DIEGO - LINHARES","nf":"2135","areas":{"C":2200,"D":3700,"MA":9100},"qtde":15000,"total":17121.475000000002,"frete":6616.0,"valorRecebido":10505.475000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33080.0,"litragem":4891.85,"vPorLitro":3.5},{"id":2066,"data":"2025-08-11","cliente":"BINHO DO COCO","nf":"2136","areas":{"MA":4000},"qtde":4000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2067,"data":"2025-08-12","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2137","areas":{"MA":6000,"MDC":4000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2068,"data":"2025-08-12","cliente":"DONA FATIMA - MACIEO","nf":"2138","areas":{"MDC":9000},"qtde":9000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2069,"data":"2025-08-14","cliente":"DIEGO - LINHARES","nf":"2139","areas":{"D":1000,"MDC":5300,"MDB":8700},"qtde":15000,"total":16221.100000000002,"frete":6408.0,"valorRecebido":9813.100000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":32040.0,"litragem":4634.6,"vPorLitro":3.5},{"id":2070,"data":"2025-08-15","cliente":"ALEXANDRE - MT","nf":"2140","areas":{"MDC":6000},"qtde":6000,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2071,"data":"2025-08-15","cliente":"RAFAEL - MACEIÓ","nf":"2142","areas":{"MDC":3000},"qtde":3000,"total":2400.0,"frete":0,"valorRecebido":2400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2072,"data":"2025-08-18","cliente":"BENASSI - SP","nf":"2143","areas":{"MDC":9000},"qtde":9000,"total":7110.0,"frete":0,"valorRecebido":7110.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2073,"data":"2025-08-19","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2144","areas":{"MDC":3600,"MDB":6400},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2074,"data":"2025-08-20","cliente":"MM FRUTAS","nf":"2145","areas":{"A2":2000,"MDB":7000},"qtde":9000,"total":5850.0,"frete":0,"valorRecebido":5850.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2075,"data":"2025-08-21","cliente":"FRYSK","nf":"2148","areas":{"MDC":10000,"MDB":2000},"qtde":12000,"total":5754.1900000000005,"frete":2426.0,"valorRecebido":3328.1900000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":24260.0,"litragem":4426.3,"vPorLitro":1.3},{"id":2076,"data":"2025-08-22","cliente":"ALEX - COCO BAMBU","nf":"2149","areas":{"A2":500,"MDC":8500},"qtde":9000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2077,"data":"2025-08-23","cliente":"FRYSK","nf":"2150","areas":{"MDC":9100,"MDB":2300},"qtde":11400,"total":6113.12,"frete":2500.0,"valorRecebido":3613.12,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":25000.0,"litragem":4702.4,"vPorLitro":1.3},{"id":2078,"data":"2025-08-26","cliente":"MARCOS FALCÃO","nf":"2151","areas":{"MDB":9500},"qtde":9500,"total":4260.0,"frete":2000.0,"valorRecebido":2260.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19030.0,"litragem":4260.0,"vPorLitro":1.0},{"id":2079,"data":"2025-08-26","cliente":"MM FRUTAS","nf":"2153","areas":{"D":9000},"qtde":9000,"total":5850.0,"frete":0,"valorRecebido":5850.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2080,"data":"2025-08-26","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2154","areas":{"C":200,"D":9800},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2081,"data":"2025-08-27","cliente":"MARCOS FALCÃO","nf":"2157","areas":{"MA":1000,"MDB":8500},"qtde":9500,"total":4353.0,"frete":2000.0,"valorRecebido":2353.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19600.0,"litragem":4353.0,"vPorLitro":1.0},{"id":2082,"data":"2025-08-28","cliente":"DIEGO - LINHARES","nf":"2155","areas":{"D":8800,"MA":6200},"qtde":15000,"total":14707.0,"frete":6272.0,"valorRecebido":8435.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":31360.0,"litragem":4202.0,"vPorLitro":3.5},{"id":2083,"data":"2025-08-28","cliente":"DIEGO - LINHARES","nf":"2156","areas":{"A2":3000,"C":800,"D":11200},"qtde":15000,"total":12484.5,"frete":6724.0,"valorRecebido":5760.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33620.0,"litragem":3567.0,"vPorLitro":3.5},{"id":2084,"data":"2025-08-29","cliente":"BENASSI - SP","nf":"2160","areas":{"D":9900},"qtde":9900,"total":7920.0,"frete":0,"valorRecebido":7920.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2085,"data":"2025-08-30","cliente":"MARCOS FALCÃO","nf":"2161","areas":{"A2":8100,"D":1400},"qtde":9500,"total":2608.0,"frete":2000.0,"valorRecebido":608.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":17160.0,"litragem":2608.0,"vPorLitro":1.0},{"id":2086,"data":"2025-09-01","cliente":"ASSIS - CAMPINAS","nf":"2162","areas":{"MDC":8000},"qtde":8000,"total":6400.0,"frete":0,"valorRecebido":6400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2087,"data":"2025-09-01","cliente":"MARCOS FALCÃO","nf":"2163","areas":{"D":10000},"qtde":10000,"total":3242.0,"frete":2000.0,"valorRecebido":1242.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19760.0,"litragem":3242.0,"vPorLitro":1.0},{"id":2088,"data":"2025-09-02","cliente":"LEONARDO - CEAGESP","nf":"2164","areas":{"MDC":10000},"qtde":10000,"total":7500.0,"frete":0,"valorRecebido":7500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2089,"data":"2025-09-02","cliente":"MM FRUTAS","nf":"2165","areas":{"MDC":9000},"qtde":9000,"total":5400.0,"frete":0,"valorRecebido":5400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2090,"data":"2025-09-03","cliente":"ARTHUR - PETROLINA","nf":"2169","areas":{"MDC":5400,"MDB":4600},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2091,"data":"2025-09-03","cliente":"MARCOS FALCÃO","nf":"2170","areas":{"D":400,"MDC":9600},"qtde":10000,"total":3816.0,"frete":2000.0,"valorRecebido":1816.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19440.0,"litragem":3816.0,"vPorLitro":1.0},{"id":2092,"data":"2025-09-04","cliente":"DIEGO - LINHARES","nf":"2171","areas":{"A2":17000},"qtde":17000,"total":16734.899999999998,"frete":7192.0,"valorRecebido":9542.899999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35960.0,"litragem":4781.4,"vPorLitro":3.5},{"id":2093,"data":"2025-09-04","cliente":"MARCOS FALCÃO","nf":"2172","areas":{"A2":9500},"qtde":9500,"total":3018.0,"frete":2000.0,"valorRecebido":1018.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19410.0,"litragem":3018.0,"vPorLitro":1.0},{"id":2094,"data":"2025-09-05","cliente":"LEONARDO - CEAGESP","nf":"2173","areas":{"MDC":10000},"qtde":10000,"total":8100.000000000001,"frete":0,"valorRecebido":8100.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2095,"data":"2025-09-05","cliente":"DIEGO - LINHARES","nf":"2174","areas":{"MA":17000},"qtde":17000,"total":16945.25,"frete":6708.0,"valorRecebido":10237.25,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33540.0,"litragem":4841.5,"vPorLitro":3.5},{"id":2096,"data":"2025-09-05","cliente":"ARTHUR - PETROLINA","nf":"2175","areas":{"MA":11000},"qtde":11000,"total":7699.999999999999,"frete":0,"valorRecebido":7699.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2097,"data":"2025-09-05","cliente":"ALDO SERGIO - CURITIBA","nf":"2176","areas":{"MA":6000},"qtde":6000,"total":4200.0,"frete":0,"valorRecebido":4200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2098,"data":"2025-09-08","cliente":"LEONARDO - CEAGESP","nf":"2178","areas":{"MDB":10000},"qtde":10000,"total":6000.0,"frete":0,"valorRecebido":6000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2099,"data":"2025-09-08","cliente":"MARCOS FALCÃO","nf":"2180","areas":{"MDB":10000},"qtde":10000,"total":3500.0,"frete":2000.0,"valorRecebido":1500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":16500.0,"litragem":3500.0,"vPorLitro":1.0},{"id":2100,"data":"2025-09-08","cliente":"ARTHUR - PETROLINA","nf":"2181","areas":{"MA":1400,"MDB":7600},"qtde":9000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2101,"data":"2025-09-09","cliente":"ARTHUR - PETROLINA","nf":"2182","areas":{"A2":7000,"MA":8000},"qtde":15000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2102,"data":"2025-09-09","cliente":"MM FRUTAS","nf":"2183","areas":{"A2":9000},"qtde":9000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2103,"data":"2025-09-10","cliente":"MARCOS FALCÃO","nf":"2184","areas":{"A2":10000},"qtde":10000,"total":2904.0,"frete":2000.0,"valorRecebido":904.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19400.0,"litragem":2904.0,"vPorLitro":1.0},{"id":2104,"data":"2025-09-10","cliente":"MARCOS FALCÃO","nf":"2185","areas":{"A2":10000},"qtde":10000,"total":2862.0,"frete":2000.0,"valorRecebido":862.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18950.0,"litragem":2862.0,"vPorLitro":1.0},{"id":2105,"data":"2025-09-10","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2186","areas":{"A2":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2106,"data":"2025-09-11","cliente":"DIEGO - LINHARES","nf":"2188","areas":{"A2":18900},"qtde":18900,"total":16047.850000000002,"frete":6956.0,"valorRecebido":9091.850000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":34780.0,"litragem":4585.1,"vPorLitro":3.5},{"id":2107,"data":"2025-09-11","cliente":"LEONARDO - CEAGESP","nf":"2190","areas":{"A2":10000},"qtde":10000,"total":7100.0,"frete":0,"valorRecebido":7100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2108,"data":"2025-09-12","cliente":"LEONARDO - CEAGESP","nf":"2191","areas":{"A2":11000},"qtde":11000,"total":6269.999999999999,"frete":0,"valorRecebido":6269.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2109,"data":"2025-09-12","cliente":"ASSIS - CAMPINAS","nf":"2192","areas":{"A2":8000},"qtde":8000,"total":15200.0,"frete":8800.0,"valorRecebido":6400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2110,"data":"2025-09-16","cliente":"LEONARDO - CEAGESP","nf":"2193","areas":{"A1":1100,"D":6600,"MDC":1300},"qtde":9000,"total":5850.0,"frete":0,"valorRecebido":5850.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2111,"data":"2025-09-16","cliente":"FRYSK","nf":"2194","areas":{"A2":14000},"qtde":14000,"total":4325.88,"frete":2230.0,"valorRecebido":2095.88,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22300.0,"litragem":3327.6,"vPorLitro":1.3},{"id":2112,"data":"2025-09-16","cliente":"ARTHUR - PETROLINA","nf":"2197","areas":{"MDC":15000},"qtde":15000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2113,"data":"2025-09-17","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2198","areas":{"D":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2114,"data":"2025-09-17","cliente":"MARCOS FALCÃO","nf":"2199","areas":{"MDB":10100},"qtde":10100,"total":4112.0,"frete":2000.0,"valorRecebido":2112.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18560.0,"litragem":4112.0,"vPorLitro":1.0},{"id":2115,"data":"2025-09-17","cliente":"FRYSK","nf":"2200","areas":{"A2":11000},"qtde":11000,"total":4343.04,"frete":1880.0,"valorRecebido":2463.04,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18800.0,"litragem":3340.8,"vPorLitro":1.3},{"id":2116,"data":"2025-09-18","cliente":"MARCOS FALCÃO","nf":"2201","areas":{"A2":5700,"MDB":5600},"qtde":11300,"total":3548.0,"frete":2000.0,"valorRecebido":1548.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18440.0,"litragem":3548.0,"vPorLitro":1.0},{"id":2117,"data":"2025-09-18","cliente":"MARCOS FALCÃO","nf":"2202","areas":{"A2":10500},"qtde":10500,"total":3329.0,"frete":2000.0,"valorRecebido":1329.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19170.0,"litragem":3329.0,"vPorLitro":1.0},{"id":2118,"data":"2025-09-18","cliente":"LEONARDO - CEAGESP","nf":"2203","areas":{"D":11000},"qtde":11000,"total":7480.000000000001,"frete":0,"valorRecebido":7480.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2119,"data":"2025-09-19","cliente":"LEONARDO - CEAGESP","nf":"2204","areas":{"MDC":9100,"MDB":1900},"qtde":11000,"total":7370.0,"frete":0,"valorRecebido":7370.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2120,"data":"2025-09-22","cliente":"MARCOS FALCÃO","nf":"2205","areas":{"A1":9500},"qtde":9500,"total":2980.0,"frete":2000.0,"valorRecebido":980.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":2852.0,"litragem":2980.0,"vPorLitro":1.0},{"id":2121,"data":"2025-09-22","cliente":"LEONARDO - CEAGESP","nf":"2206","areas":{"A1":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2122,"data":"2025-09-23","cliente":"LEONARDO - CEAGESP","nf":"2207","areas":{"MDB":10000},"qtde":10000,"total":6899.999999999999,"frete":0,"valorRecebido":6899.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2123,"data":"2025-09-23","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2208","areas":{"MDB":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2124,"data":"2025-09-24","cliente":"LEONARDO - CEAGESP","nf":"2211","areas":{"MA":4300,"MDB":5700},"qtde":10000,"total":7700.0,"frete":0,"valorRecebido":7700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2125,"data":"2025-09-24","cliente":"MARCOS FALCÃO","nf":"2213","areas":{"D":9000},"qtde":9000,"total":3290.0,"frete":2000.0,"valorRecebido":1290.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":2543.0,"litragem":3290.0,"vPorLitro":1.0},{"id":2126,"data":"2025-09-24","cliente":"FRYSK","nf":"2212","areas":{"A2":12000},"qtde":12000,"total":4429.62,"frete":2260.0,"valorRecebido":2169.62,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22600.0,"litragem":3407.4,"vPorLitro":1.3},{"id":2127,"data":"2025-09-24","cliente":"FRYSK","nf":"2214","areas":{"A2":10000},"qtde":10000,"total":4060.03,"frete":1880.0,"valorRecebido":2180.03,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18800.0,"litragem":3123.1,"vPorLitro":1.3},{"id":2128,"data":"2025-09-25","cliente":"LEONARDO - CEAGESP","nf":"2215","areas":{"MA":10000},"qtde":10000,"total":3600.0,"frete":0,"valorRecebido":3600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2129,"data":"2025-09-25","cliente":"FRYSK","nf":"2216","areas":{"A2":12000},"qtde":12000,"total":4609.41,"frete":2201.0,"valorRecebido":2408.41,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22010.0,"litragem":3545.7,"vPorLitro":1.3},{"id":2130,"data":"2025-09-25","cliente":"FRYSK","nf":"2217","areas":{"A2":13000},"qtde":13000,"total":4470.3099999999995,"frete":2312.0,"valorRecebido":2158.3099999999995,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":23120.0,"litragem":3438.7,"vPorLitro":1.3},{"id":2131,"data":"2025-09-26","cliente":"LEONARDO - CEAGESP","nf":"2218","areas":{"A2":1800,"MA":8200},"qtde":10000,"total":6700.0,"frete":0,"valorRecebido":6700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2132,"data":"2025-09-26","cliente":"LEONARDO - CEAGESP","nf":"2219","areas":{"A1":6000,"D":6000},"qtde":12000,"total":7800.0,"frete":0,"valorRecebido":7800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2133,"data":"2025-09-27","cliente":"DIEGO - LINHARES","nf":"2221","areas":{"A1":11500,"A2":8500},"qtde":20000,"total":21045.149999999998,"frete":10069.4,"valorRecebido":10975.749999999998,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":43780.0,"litragem":6012.9,"vPorLitro":3.5},{"id":2134,"data":"2025-09-30","cliente":"DIEGO - LINHARES","nf":"2222","areas":{"A1":14900},"qtde":14900,"total":14432.600000000002,"frete":6824.0,"valorRecebido":7608.600000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":34120.0,"litragem":4123.6,"vPorLitro":3.5},{"id":2135,"data":"2025-09-30","cliente":"LEONARDO - CEAGESP","nf":"2223","areas":{"A2":10000},"qtde":10000,"total":7300.0,"frete":0,"valorRecebido":7300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2136,"data":"2025-09-30","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2224","areas":{"A2":10000},"qtde":10000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2137,"data":"2025-09-30","cliente":"ARTHUR - PETROLINA","nf":"2225","areas":{"A2":12400,"MA":2600},"qtde":15000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2138,"data":"2025-10-01","cliente":"MARCOS FALCÃO","nf":"2226","areas":{"A1":9200},"qtde":9200,"total":2852.0,"frete":2000.0,"valorRecebido":852.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":18470.0,"litragem":2852.0,"vPorLitro":1.0},{"id":2139,"data":"2025-10-01","cliente":"1900-01-21 00:00:00","nf":"2227","areas":{"A2":700,"D":10300},"qtde":11000,"total":8800.0,"frete":0,"valorRecebido":8800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2140,"data":"2025-10-01","cliente":"FRYSK","nf":"2228","areas":{"A1":9400},"qtde":9400,"total":3727.75,"frete":1980.0,"valorRecebido":1747.75,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19800.0,"litragem":2867.5,"vPorLitro":1.3},{"id":2141,"data":"2025-10-02","cliente":"MARCOS FALCÃO","nf":"2229","areas":{"D":9400},"qtde":9400,"total":2543.0,"frete":2000.0,"valorRecebido":543.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19980.0,"litragem":2543.0,"vPorLitro":1.0},{"id":2142,"data":"2025-10-02","cliente":"LEONARDO - CEAGESP","nf":"2230","areas":{"A1":10000},"qtde":10000,"total":6700.0,"frete":0,"valorRecebido":6700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2143,"data":"2025-10-02","cliente":"DIEGO - LINHARES","nf":"2231","areas":{"A1":15750},"qtde":15750,"total":14481.600000000002,"frete":7036.0,"valorRecebido":7445.600000000002,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":35180.0,"litragem":4137.6,"vPorLitro":3.5},{"id":2144,"data":"2025-10-02","cliente":"FRYSK","nf":"2232","areas":{"A1":11000},"qtde":11000,"total":4188.34,"frete":2382.0,"valorRecebido":1806.3400000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":23820.0,"litragem":3221.8,"vPorLitro":1.3},{"id":2145,"data":"2025-10-03","cliente":"LEONARDO - CEAGESP","nf":"2236","areas":{"A1":10000},"qtde":10000,"total":5600.000000000001,"frete":0,"valorRecebido":5600.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2146,"data":"2025-10-03","cliente":"LEONARDO - CEAGESP","nf":"2237","areas":{"A1":10000},"qtde":10000,"total":6800.000000000001,"frete":0,"valorRecebido":6800.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2147,"data":"2025-10-03","cliente":"FRYSK","nf":"2238","areas":{"A1":17000},"qtde":17000,"total":6361.55,"frete":3701.0,"valorRecebido":2660.55,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37010.0,"litragem":4893.5,"vPorLitro":1.3},{"id":2148,"data":"2025-10-04","cliente":"FRYSK","nf":"2239","areas":{"A1":17000},"qtde":17000,"total":5363.82,"frete":3348.0,"valorRecebido":2015.8199999999997,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":33480.0,"litragem":3831.3,"vPorLitro":1.4},{"id":2149,"data":"2025-10-04","cliente":"FRYSK","nf":"2240","areas":{"A1":15000},"qtde":15000,"total":6745.759999999999,"frete":3664.0,"valorRecebido":3081.7599999999993,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36640.0,"litragem":4818.4,"vPorLitro":1.4},{"id":2150,"data":"2025-10-06","cliente":"FRYSK","nf":"2241","areas":{"A1":28000},"qtde":28000,"total":10582.650000000001,"frete":6129.0,"valorRecebido":4453.6500000000015,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":61290.0,"litragem":7055.1,"vPorLitro":1.5},{"id":2151,"data":"2025-10-06","cliente":"LEONARDO - CEAGESP","nf":"2242","areas":{"MDC":9000},"qtde":9000,"total":6120.0,"frete":0,"valorRecebido":6120.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2152,"data":"2025-10-07","cliente":"LEONARDO - CEAGESP","nf":"2247","areas":{"A1":7000,"MDC":1000},"qtde":8000,"total":4560.0,"frete":0,"valorRecebido":4560.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2153,"data":"2025-10-07","cliente":"FRYSK","nf":"2248","areas":{"A1":17900},"qtde":17900,"total":7116.0,"frete":4057.0,"valorRecebido":3059.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40570.0,"litragem":4744.0,"vPorLitro":1.5},{"id":2154,"data":"2025-10-07","cliente":"FRYSK","nf":"2249","areas":{"A1":11000},"qtde":11000,"total":4819.049999999999,"frete":2303.0,"valorRecebido":2516.0499999999993,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":23030.0,"litragem":3212.7,"vPorLitro":1.5},{"id":2155,"data":"2025-10-08","cliente":"LEONARDO - CEAGESP","nf":"2250","areas":{"A1":9000},"qtde":9000,"total":5310.0,"frete":0,"valorRecebido":5310.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2156,"data":"2025-10-08","cliente":"FRYSK","nf":"2252","areas":{"A1":28500},"qtde":28500,"total":10573.2,"frete":6346.0,"valorRecebido":4227.200000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":63460.0,"litragem":7048.8,"vPorLitro":1.5},{"id":2157,"data":"2025-10-09","cliente":"DIEGO - LINHARES","nf":"2253","areas":{"A1":18000},"qtde":18000,"total":16366.0,"frete":7560.0,"valorRecebido":8806.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37800.0,"litragem":4676.0,"vPorLitro":3.5},{"id":2158,"data":"2025-10-09","cliente":"FRYSK","nf":"2254","areas":{"A1":16800},"qtde":16800,"total":7394.560000000001,"frete":4090.0,"valorRecebido":3304.5600000000013,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":40900.0,"litragem":4621.6,"vPorLitro":1.6},{"id":2159,"data":"2025-10-10","cliente":"DIEGO - LINHARES","nf":"2255","areas":{"A1":18000},"qtde":18000,"total":14920.5,"frete":7260.0,"valorRecebido":7660.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36300.0,"litragem":4263.0,"vPorLitro":3.5},{"id":2160,"data":"2025-10-10","cliente":"LEONARDO - CEAGESP","nf":"2256","areas":{"D":1400,"MDC":5600,"MDB":2000},"qtde":9000,"total":5760.0,"frete":0,"valorRecebido":5760.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2161,"data":"2025-10-10","cliente":"LEONARDO - CEAGESP","nf":"2257","areas":{"D":9000},"qtde":9000,"total":5490.0,"frete":0,"valorRecebido":5490.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2162,"data":"2025-10-13","cliente":"LEONARDO - CEAGESP","nf":"2260","areas":{"MDB":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2163,"data":"2025-10-13","cliente":"LEONARDO - CEAGESP","nf":"2261","areas":{"MA":1900,"MDB":7100},"qtde":9000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2164,"data":"2025-10-13","cliente":"MARCOS FALCÃO","nf":"2262","areas":{"A1":4000,"D":5300},"qtde":9300,"total":3398.4,"frete":2000.0,"valorRecebido":1398.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19840.0,"litragem":2832.0,"vPorLitro":1.2},{"id":2165,"data":"2025-10-14","cliente":"FRYSK","nf":"2263","areas":{"A1":2200,"C":10000,"D":18900},"qtde":31100,"total":13488.320000000002,"frete":6453.0,"valorRecebido":7035.3200000000015,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":64530.0,"litragem":8430.2,"vPorLitro":1.6},{"id":2166,"data":"2025-10-15","cliente":"LEONARDO - CEAGESP","nf":"2270","areas":{"MA":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2167,"data":"2025-10-15","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2271","areas":{"D":9200,"MA":800},"qtde":10000,"total":8000.0,"frete":0,"valorRecebido":8000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2168,"data":"2025-10-15","cliente":"FRYSK","nf":"2272","areas":{"C":13200,"D":4000},"qtde":17200,"total":8050.080000000001,"frete":3859.0,"valorRecebido":4191.080000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38590.0,"litragem":5031.3,"vPorLitro":1.6},{"id":2169,"data":"2025-10-16","cliente":"LEONARDO - CEAGESP","nf":"2273","areas":{"D":11000},"qtde":11000,"total":7699.999999999999,"frete":0,"valorRecebido":7699.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2170,"data":"2025-10-16","cliente":"DIEGO - LINHARES","nf":"2275","areas":{"C":16000},"qtde":16000,"total":15073.800000000001,"frete":7256.0,"valorRecebido":7817.800000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":36280.0,"litragem":4306.8,"vPorLitro":3.5},{"id":2171,"data":"2025-10-17","cliente":"FRYSK","nf":"2276","areas":{"C":33000},"qtde":33000,"total":13240.0,"frete":6588.0,"valorRecebido":6652.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":65880.0,"litragem":8275.0,"vPorLitro":1.6},{"id":2172,"data":"2025-10-20","cliente":"LEONARDO - CEAGESP","nf":"2277","areas":{"A1":7700,"A2":2300},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2173,"data":"2025-10-21","cliente":"MARCOS FALCÃO","nf":"2279","areas":{"C":10000},"qtde":10000,"total":4534.400000000001,"frete":2000.0,"valorRecebido":2534.4000000000005,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":19840.0,"litragem":2834.0,"vPorLitro":1.6},{"id":2174,"data":"2025-10-23","cliente":"LEONARDO - CEAGESP","nf":"2283","areas":{"D":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2175,"data":"2025-10-24","cliente":"LEONARDO - CEAGESP","nf":"2284","areas":{"D":9000},"qtde":9000,"total":5040.000000000001,"frete":0,"valorRecebido":5040.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2176,"data":"2025-10-27","cliente":"LEONARDO - CEAGESP","nf":"2286","areas":{"D":11000},"qtde":11000,"total":7260.0,"frete":0,"valorRecebido":7260.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2177,"data":"2025-10-28","cliente":"FRYSK","nf":"2287","areas":{"A1":2000,"C":15000},"qtde":17000,"total":11498.23,"frete":3748.0,"valorRecebido":7750.23,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37480.0,"litragem":6051.7,"vPorLitro":1.9},{"id":2178,"data":"2025-10-28","cliente":"LEONARDO - CEAGESP","nf":"2288","areas":{"A1":10000},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2179,"data":"2025-10-29","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2289","areas":{"A2":10000},"qtde":10000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2180,"data":"2025-10-30","cliente":"DIEGO - LINHARES","nf":"2293","areas":{"A1":17000},"qtde":17000,"total":17811.5,"frete":7596.0,"valorRecebido":10215.5,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":37980.0,"litragem":5089.0,"vPorLitro":3.5},{"id":2181,"data":"2025-10-30","cliente":"LEONARDO - CEAGESP","nf":"2294","areas":{"A1":600,"D":9400},"qtde":10000,"total":7000.0,"frete":0,"valorRecebido":7000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2182,"data":"2025-10-31","cliente":"ALDO SERGIO - CURITIBA","nf":"2296","areas":{"A1":5000},"qtde":5000,"total":5000.0,"frete":0,"valorRecebido":5000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2183,"data":"2025-11-03","cliente":"MATEUS - BRASILIA","nf":"2297","areas":{"A2":10000},"qtde":10000,"total":18000.0,"frete":9000.0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2184,"data":"2025-11-05","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2298","areas":{"A2":10000},"qtde":10000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2185,"data":"2025-11-05","cliente":"LEONARDO - CEAGESP","nf":"2299","areas":{"D":9000},"qtde":9000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2186,"data":"2025-11-05","cliente":"FRYSK","nf":"2300","areas":{"D":18000},"qtde":18000,"total":14837.099999999999,"frete":4259.0,"valorRecebido":10578.099999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":42590.0,"litragem":7809.0,"vPorLitro":1.9},{"id":2187,"data":"2025-11-06","cliente":"LEONARDO - CEAGESP","nf":"2301","areas":{"A1":12000,"C":3000},"qtde":15000,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2188,"data":"2025-11-07","cliente":"LEONARDO - CEAGESP","nf":"2302","areas":{"C":2700,"D":6300},"qtde":9000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2189,"data":"2025-11-10","cliente":"LEONARDO - CEAGESP","nf":"2303","areas":{"A2":7000,"MA":2000},"qtde":9000,"total":6300.0,"frete":0,"valorRecebido":6300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2190,"data":"2025-11-10","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2305","areas":{"MA":10000},"qtde":10000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2191,"data":"2025-11-10","cliente":"MATEUS - BRASILIA","nf":"2305","areas":{"MA":4400,"MDC":5600},"qtde":10000,"total":18000.0,"frete":9000.0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2192,"data":"2025-11-12","cliente":"LEONARDO - CEAGESP","nf":"2306","areas":{"C":13000},"qtde":13000,"total":9100.0,"frete":0,"valorRecebido":9100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2193,"data":"2025-11-14","cliente":"ARTHUR - PETROLINA","nf":"2308","areas":{"MDC":15000},"qtde":15000,"total":12750.0,"frete":0,"valorRecebido":12750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2194,"data":"2025-11-14","cliente":"LEONARDO - CEAGESP","nf":"2309","areas":{"A1":7000,"C":4000},"qtde":11000,"total":7699.999999999999,"frete":0,"valorRecebido":7699.999999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2195,"data":"2025-11-17","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2311","areas":{"MDC":9100,"MDB":900},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2196,"data":"2025-11-18","cliente":"TITIL - INDAIATUBA","nf":"2312","areas":{"MDB":8000},"qtde":8000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2197,"data":"2025-11-18","cliente":"LEONARDO - CEAGESP","nf":"2313","areas":{"A1":4000,"C":5000},"qtde":9000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2198,"data":"2025-11-18","cliente":"EDGAR - SP","nf":"2314","areas":{"MDB":9000},"qtde":9000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2199,"data":"2025-11-19","cliente":"LEONARDO - CEAGESP","nf":"2315","areas":{"A1":9000},"qtde":9000,"total":7200.0,"frete":0,"valorRecebido":7200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2200,"data":"2025-11-19","cliente":"FRYSK","nf":"2316","areas":{"A1":9200,"C":3500},"qtde":12700,"total":8256.6,"frete":2344.0,"valorRecebido":5912.6,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":23440.0,"litragem":4128.3,"vPorLitro":2.0},{"id":2201,"data":"2025-11-21","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2317","areas":{"A1":300,"D":9700},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2202,"data":"2025-11-24","cliente":"MATEUS - BRASILIA","nf":"2321","areas":{"MDB":9000},"qtde":9000,"total":16200.0,"frete":8100.0,"valorRecebido":8100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2203,"data":"2025-11-24","cliente":"JAMISSON","nf":"2322","areas":{"MDB":7300},"qtde":7300,"total":7665.0,"frete":0,"valorRecebido":7665.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2204,"data":"2025-11-26","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2323","areas":{"A2":8800,"MDB":200},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2205,"data":"2025-11-26","cliente":"EDGAR - SP","nf":"2324","areas":{"D":9000},"qtde":9000,"total":9000.0,"frete":0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2206,"data":"2025-11-28","cliente":"ARTHUR - PETROLINA","nf":"2026","areas":{"D":15000},"qtde":15000,"total":15000.0,"frete":0,"valorRecebido":15000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2207,"data":"2025-11-28","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2027","areas":{"D":10000},"qtde":10000,"total":10000.0,"frete":0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2208,"data":"2025-12-01","cliente":"JAMISSON","nf":"RECIBO","areas":{"A2":6300},"qtde":6300,"total":6930.000000000001,"frete":0,"valorRecebido":6930.000000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2209,"data":"2025-12-01","cliente":"ARTHUR - PETROLINA","nf":"2328","areas":{"A2":3100,"D":11900},"qtde":15000,"total":16500.0,"frete":0,"valorRecebido":16500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2210,"data":"2025-12-02","cliente":"TITIL - INDAIATUBA","nf":"2330","areas":{"A2":7600},"qtde":7600,"total":8360.0,"frete":0,"valorRecebido":8360.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2211,"data":"2025-12-02","cliente":"MATEUS - BRASILIA","nf":"2331","areas":{"A2":7600,"MA":1400},"qtde":9000,"total":17100.0,"frete":8100.0,"valorRecebido":9000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2212,"data":"2025-12-02","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2332","areas":{"A1":10000},"qtde":10000,"total":10500.0,"frete":0,"valorRecebido":10500.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2213,"data":"2025-12-04","cliente":"JOSE VALTENOS","nf":"2333","areas":{"A1":1200},"qtde":1200,"total":1440.0,"frete":0,"valorRecebido":1440.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2214,"data":"2025-12-04","cliente":"FRYSK","nf":"2334","areas":{"D":11500},"qtde":11500,"total":8861.8,"frete":2197.0,"valorRecebido":6664.799999999999,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":21970.0,"litragem":4430.9,"vPorLitro":2.0},{"id":2215,"data":"2025-12-05","cliente":"MATEUS - BRASILIA","nf":"2335","areas":{"C":9070,"MDB":930},"qtde":10000,"total":19000.0,"frete":9000.0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2216,"data":"2025-12-04","cliente":"WANDERLEY - ARACAJU","nf":"2336","areas":{"A1":4000},"qtde":4000,"total":4400.0,"frete":0,"valorRecebido":4400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2217,"data":"2025-12-05","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2337","areas":{"MA":9000},"qtde":9000,"total":9900.0,"frete":0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2218,"data":"2025-12-05","cliente":"ARTHUR - PETROLINA","nf":"2338","areas":{"A1":16000},"qtde":16000,"total":17600.0,"frete":0,"valorRecebido":17600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2219,"data":"2025-12-08","cliente":"JAMISSON","nf":"RECIBO","areas":{"MA":3200,"MDC":3500},"qtde":6700,"total":8040.0,"frete":0,"valorRecebido":8040.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2220,"data":"2025-12-08","cliente":"ARTHUR - PETROLINA","nf":"2342","areas":{"A1":6500,"D":8500},"qtde":15000,"total":17250.0,"frete":0,"valorRecebido":17250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2221,"data":"2025-12-09","cliente":"GILDO - CEASA","nf":"2345","areas":{"A1":8000},"qtde":8000,"total":9600.0,"frete":0,"valorRecebido":9600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2222,"data":"2025-12-09","cliente":"WANDERLEY - ARACAJU","nf":"2347","areas":{"A1":4000},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2223,"data":"2025-12-09","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2344","areas":{"MDC":10000},"qtde":10000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2224,"data":"2025-12-10","cliente":"MATEUS - BRASILIA","nf":"2348","areas":{"A1":2000,"C":5000,"MDC":3000},"qtde":10000,"total":19000.0,"frete":9000.0,"valorRecebido":10000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2225,"data":"2025-12-10","cliente":"JOSE VALTENOS","nf":"RECIBO","areas":{"C":1500},"qtde":1500,"total":1800.0,"frete":0,"valorRecebido":1800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2226,"data":"2025-12-15","cliente":"JAMISSON","nf":"RECIBO","areas":{"MDB":7000},"qtde":7000,"total":8400.0,"frete":0,"valorRecebido":8400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2227,"data":"2025-12-15","cliente":"BINHO DO COCO","nf":"RECIBO","areas":{"A1":4000},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2228,"data":"2025-12-15","cliente":"MATEUS - BRASILIA","nf":"2350","areas":{"A1":9000},"qtde":9000,"total":18000.0,"frete":8100.0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2229,"data":"2025-12-16","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2351","areas":{"MDC":8000},"qtde":8000,"total":9600.0,"frete":0,"valorRecebido":9600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2230,"data":"2025-12-17","cliente":"JONATHAN - ARACAJU","nf":"2353","areas":{"D":7400,"MDC":600},"qtde":8000,"total":10400.0,"frete":0,"valorRecebido":10400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2231,"data":"2025-12-17","cliente":"MATEUS - BRASILIA","nf":"2352","areas":{"D":9000},"qtde":9000,"total":18000.0,"frete":8100.0,"valorRecebido":9900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2232,"data":"2025-12-18","cliente":"ALDO SERGIO - CURITIBA","nf":"2354","areas":{"D":9000},"qtde":9000,"total":11700.0,"frete":0,"valorRecebido":11700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2233,"data":"2025-12-18","cliente":"WANDERLEY - ARACAJU","nf":"2354","areas":{"A2":4000},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2234,"data":"2025-12-19","cliente":"TITIL - INDAIATUBA","nf":"2355","areas":{"A2":7000},"qtde":7000,"total":8400.0,"frete":0,"valorRecebido":8400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2235,"data":"2025-12-19","cliente":"WANDERLEY - ARACAJU","nf":"2356","areas":{"A1":2900,"A2":1100},"qtde":4000,"total":4800.0,"frete":0,"valorRecebido":4800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2236,"data":"2025-12-22","cliente":"JAMISSON","nf":"RECIBO","areas":{"A2":10000},"qtde":10000,"total":15000.0,"frete":0,"valorRecebido":15000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2237,"data":"2025-12-22","cliente":"RAUL ALVES - ARACAJU","nf":"2358","areas":{"A2":8000},"qtde":8000,"total":12000.0,"frete":0,"valorRecebido":12000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2238,"data":"2025-12-23","cliente":"JONATHAN - ARACAJU","nf":"2359","areas":{"A1":6100,"C":900},"qtde":7000,"total":11200.0,"frete":0,"valorRecebido":11200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2239,"data":"2025-12-23","cliente":"CARLOS - ARACAJU","nf":"2360","areas":{"A1":5000,"A2":3600,"MA":1400},"qtde":10000,"total":16000.0,"frete":0,"valorRecebido":16000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2240,"data":"2025-12-24","cliente":"PRETO DO COCO - ARACAJU","nf":"2362","areas":{"MA":8000},"qtde":8000,"total":12800.0,"frete":0,"valorRecebido":12800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2241,"data":"2025-12-26","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2363","areas":{"D":4000,"MA":3200,"MDC":800},"qtde":8000,"total":13600.0,"frete":0,"valorRecebido":13600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2242,"data":"2025-12-26","cliente":"WANDERLEY - ARACAJU","nf":"2364","areas":{"MDC":4000},"qtde":4000,"total":6400.0,"frete":0,"valorRecebido":6400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2243,"data":"2025-12-27","cliente":"CARLOS - ARACAJU","nf":"2365","areas":{"A1":5000,"MDC":4000},"qtde":9000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2244,"data":"2025-12-29","cliente":"JAMISSON","nf":"RECIBO","areas":{"A1":800,"MDC":6200},"qtde":7000,"total":12250.0,"frete":0,"valorRecebido":12250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2245,"data":"2025-12-29","cliente":"RAUL ALVES - ARACAJU","nf":"2366","areas":{"A1":8000},"qtde":8000,"total":14000.0,"frete":0,"valorRecebido":14000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2246,"data":"2025-12-30","cliente":"JONATHAN - ARACAJU","nf":"2367","areas":{"B":7000},"qtde":7000,"total":12250.0,"frete":0,"valorRecebido":12250.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2247,"data":"2025-12-30","cliente":"CARLOS - ARACAJU","nf":"2368","areas":{"B":800,"C":2600,"D":5100},"qtde":8500,"total":14875.0,"frete":0,"valorRecebido":14875.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2248,"data":"2025-12-31","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2369","areas":{"MDB":9000},"qtde":9000,"total":15750.0,"frete":0,"valorRecebido":15750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2249,"data":"2026-01-05","cliente":"JAMISSON","nf":"RECIBO","areas":{"D":1300,"MDB":5700},"qtde":7000,"total":14000.0,"frete":0,"valorRecebido":14000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2250,"data":"2026-01-05","cliente":"TITIL - INDAIATUBA","nf":"2369","areas":{"C":2700,"D":5300},"qtde":8000,"total":16800.0,"frete":0,"valorRecebido":16800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2251,"data":"2026-01-06","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2370","areas":{"A2":9000},"qtde":9000,"total":18900.0,"frete":0,"valorRecebido":18900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2252,"data":"2026-01-06","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2371","areas":{"C":2300,"D":5700},"qtde":8000,"total":16800.0,"frete":0,"valorRecebido":16800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2253,"data":"2026-01-06","cliente":"WANDERLEY - ARACAJU","nf":"2372","areas":{"C":1600,"D":2400},"qtde":4000,"total":8400.0,"frete":0,"valorRecebido":8400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2254,"data":"2026-01-08","cliente":"ALDO SERGIO - CURITIBA","nf":"2373","areas":{"A2":10000},"qtde":10000,"total":21000.0,"frete":0,"valorRecebido":21000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2255,"data":"2026-01-08","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2374","areas":{"A2":3400,"C":1300,"D":3300},"qtde":8000,"total":16800.0,"frete":0,"valorRecebido":16800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2256,"data":"2026-01-09","cliente":"CEARÁ - CAMPINAS","nf":"2375","areas":{"A2":3900,"MA":6100},"qtde":10000,"total":21000.0,"frete":0,"valorRecebido":21000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2257,"data":"2026-01-09","cliente":"JONATHAN - ARACAJU","nf":"2376","areas":{"D":7000},"qtde":7000,"total":14700.0,"frete":0,"valorRecebido":14700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2258,"data":"2026-01-12","cliente":"JAMISSON","nf":"RECIBO","areas":{"MA":5000},"qtde":5000,"total":10560.0,"frete":0,"valorRecebido":10560.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2259,"data":"2026-01-15","cliente":"ALDO SERGIO - CURITIBA","nf":"2378","areas":{"C":3500},"qtde":3500,"total":7350.0,"frete":0,"valorRecebido":7350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2260,"data":"2026-01-15","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2379","areas":{"MDC":8000},"qtde":8000,"total":18400.0,"frete":0,"valorRecebido":18400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2261,"data":"2026-01-15","cliente":"ALDO SERGIO - CURITIBA","nf":"2380","areas":{"A1":2000,"C":1200,"D":1000,"MA":3000,"MDC":1800},"qtde":9000,"total":20700.0,"frete":0,"valorRecebido":20700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2262,"data":"2026-01-16","cliente":"ARTHUR - PETROLINA","nf":"2381","areas":{"A1":12900,"D":2600},"qtde":15500,"total":34100.0,"frete":0,"valorRecebido":34100.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2263,"data":"2026-01-19","cliente":"JAMISSON","nf":"RECIBO","areas":{"MDC":5000},"qtde":5000,"total":11000.0,"frete":0,"valorRecebido":11000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2264,"data":"2026-01-20","cliente":"MATEUS - BRASILIA","nf":"2383","areas":{"A1":15200,"MDC":800},"qtde":16000,"total":48000.0,"frete":13000.0,"valorRecebido":35000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2265,"data":"2026-01-21","cliente":"VAL DA BANANA","nf":"RECIBO","areas":{"A1":1500},"qtde":1500,"total":3750.0,"frete":0,"valorRecebido":3750.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2266,"data":"2026-01-26","cliente":"JAMISSON","nf":"RECIBO","areas":{"MDC":1600,"MDB":3200},"qtde":4800,"total":10560.0,"frete":0,"valorRecebido":10560.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2267,"data":"2026-02-02","cliente":"EVERLAN","nf":"RECIBO","areas":{"MDB":100},"qtde":100,"total":200.0,"frete":0,"valorRecebido":200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2268,"data":"2026-02-02","cliente":"JOÃO - ARACAJU","nf":"2385","areas":{"MDB":7000},"qtde":7000,"total":14700.0,"frete":0,"valorRecebido":14700.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2269,"data":"2026-02-03","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2386","areas":{"MDB":3500},"qtde":3500,"total":7350.0,"frete":0,"valorRecebido":7350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2270,"data":"2026-02-03","cliente":"FRYSK","nf":"2387","areas":{"D":11000},"qtde":11000,"total":13745.4,"frete":2245.0,"valorRecebido":11500.4,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22450.0,"litragem":4434.0,"vPorLitro":3.1},{"id":2271,"data":"2026-02-04","cliente":"FRYSK","nf":"2388","areas":{"A1":2600,"C":5300,"D":4900},"qtde":12800,"total":12499.2,"frete":2277.0,"valorRecebido":10222.2,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":22770.0,"litragem":4032.0,"vPorLitro":3.1},{"id":2272,"data":"2026-02-05","cliente":"ASSIS - CAMPINAS","nf":"2389","areas":{"A1":9000},"qtde":9000,"total":24300.0,"frete":9900.0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2273,"data":"2026-02-05","cliente":"ALDO SERGIO - CURITIBA","nf":"2390","areas":{"A1":8500},"qtde":8500,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2274,"data":"2026-02-06","cliente":"WALTER - SP","nf":"2391","areas":{"A2":3400,"MDB":5600},"qtde":9000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2275,"data":"2026-02-09","cliente":"JAMISSON","nf":"RECIBO","areas":{"A2":2000},"qtde":2000,"total":4000.0,"frete":0,"valorRecebido":4000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2276,"data":"2026-02-09","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2392","areas":{"A2":8500},"qtde":8500,"total":17000.0,"frete":0,"valorRecebido":17000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2277,"data":"2026-02-09","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2393","areas":{"A2":8000},"qtde":8000,"total":15200.0,"frete":0,"valorRecebido":15200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2278,"data":"2026-02-12","cliente":"ALDO SERGIO - CURITIBA","nf":"2397","areas":{"A2":9000},"qtde":9000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2279,"data":"2026-02-13","cliente":"FATIMA","nf":"2398","areas":{"MA":8000},"qtde":8000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2280,"data":"2026-02-13","cliente":"SR JOAO","nf":"2399","areas":{"MA":4300,"MDC":2700},"qtde":7000,"total":13300.0,"frete":0,"valorRecebido":13300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2281,"data":"2026-02-13","cliente":"MATEUS - BRASILIA","nf":"2400","areas":{"A1":600,"A2":800,"C":1100,"D":2500,"MA":5000},"qtde":10000,"total":26000.0,"frete":8000.0,"valorRecebido":18000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2282,"data":"2026-02-14","cliente":"ASSIS - CAMPINAS","nf":"2401","areas":{"C":900,"D":2900,"MA":5200},"qtde":9000,"total":24300.0,"frete":9900.0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2283,"data":"2026-02-18","cliente":"WALTER - SP","nf":"2402","areas":{"MDC":9000},"qtde":9000,"total":16200.0,"frete":0,"valorRecebido":16200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2284,"data":"2026-02-18","cliente":"EVERLAN","nf":"RECIBO","areas":{"MDC":100},"qtde":100,"total":200.0,"frete":0,"valorRecebido":200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2285,"data":"2026-02-19","cliente":"FRYSK","nf":"2403","areas":{"C":5000,"D":10200},"qtde":15200,"total":12688.300000000001,"frete":4223.0,"valorRecebido":8465.300000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":42230.0,"litragem":4093.0,"vPorLitro":3.1},{"id":2286,"data":"2026-02-19","cliente":"JACIARA - FEIRA DE SANTANA","nf":"2404","areas":{"A1":7700,"D":300},"qtde":8000,"total":14400.0,"frete":0,"valorRecebido":14400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2287,"data":"2026-02-20","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2406","areas":{"A1":150,"MDC":400,"MDB":7450},"qtde":8000,"total":15200.0,"frete":0,"valorRecebido":15200.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2288,"data":"2026-02-20","cliente":"ASSIS - CAMPINAS","nf":"2407","areas":{"A1":4600,"MDB":3400},"qtde":8000,"total":21600.0,"frete":8800.0,"valorRecebido":12800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2289,"data":"2026-02-23","cliente":"JOÃO - ARACAJU","nf":"2408","areas":{"A1":7000},"qtde":7000,"total":13300.0,"frete":0,"valorRecebido":13300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2290,"data":"2026-02-23","cliente":"FRYSK","nf":"2409","areas":{"C":3000,"D":5400},"qtde":8400,"total":7607.400000000001,"frete":2343.0,"valorRecebido":5264.400000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":23430.0,"litragem":2454.0,"vPorLitro":3.1},{"id":2291,"data":"2026-02-24","cliente":"GEORGE - VITTA FRUTAS","nf":"2410","areas":{"A1":15600,"C":100,"D":300},"qtde":16000,"total":28800.0,"frete":0,"valorRecebido":28800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2292,"data":"2026-02-24","cliente":"BENASSI - SP","nf":"2411","areas":{"A2":3500,"C":600,"D":900,"MDB":4000},"qtde":9000,"total":28800.0,"frete":9900.0,"valorRecebido":18900.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2293,"data":"2026-02-25","cliente":"WALTER - SP","nf":"2412","areas":{"A2":4400,"C":1000,"D":3100},"qtde":8500,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2294,"data":"2026-02-26","cliente":"FRYSK","nf":"2413","areas":{"A1":2100,"C":4000,"D":8900},"qtde":15000,"total":14920.300000000001,"frete":3834.0,"valorRecebido":12514.300000000001,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":38340.0,"litragem":4813.0,"vPorLitro":3.1},{"id":2295,"data":"2026-02-26","cliente":"FRYSK","nf":"2414","areas":{"D":9000},"qtde":9000,"total":11191.0,"frete":2406.0,"valorRecebido":11191.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"litro","pesoKg":24060.0,"litragem":3610.0,"vPorLitro":3.1},{"id":2296,"data":"2026-02-27","cliente":"JOÃO - ARACAJU","nf":"2415","areas":{"A2":7000},"qtde":7000,"total":12600.0,"frete":0,"valorRecebido":12600.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2297,"data":"2026-03-02","cliente":"ASSIS - CAMPINAS","nf":"2416","areas":{"A2":8500},"qtde":8500,"total":22950.0,"frete":9350.0,"valorRecebido":22948.9,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2298,"data":"2026-03-03","cliente":"GEORGE - VITTA FRUTAS","nf":"2421","areas":{"C":5900,"D":12100},"qtde":18000,"total":32400.0,"frete":0,"valorRecebido":32400.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2299,"data":"2026-03-04","cliente":"GEORGE - VITTA FRUTAS","nf":"2422","areas":{"C":4800,"D":10200},"qtde":15000,"total":27000.0,"frete":0,"valorRecebido":27000.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2300,"data":"2026-03-04","cliente":"FRYSK","nf":"2423","areas":{"A1":2700,"C":2500,"D":3800},"qtde":9000,"total":0,"frete":0,"valorRecebido":0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2301,"data":"2026-03-09","cliente":"EVERLAN","nf":"RECIBO","areas":{"A1":90},"qtde":90,"total":162.0,"frete":0,"valorRecebido":162.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2302,"data":"2026-03-09","cliente":"VAL - PENEDO","nf":"2424","areas":{"C":500,"D":700},"qtde":1200,"total":2160.0,"frete":0,"valorRecebido":2160.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2303,"data":"2026-03-10","cliente":"GEORGE - VITTA FRUTAS","nf":"2426","areas":{"A1":13200,"C":500,"D":1800},"qtde":15500,"total":26350.0,"frete":0,"valorRecebido":26350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2304,"data":"2026-03-10","cliente":"GEORGE - VITTA FRUTAS","nf":"2427","areas":{"A1":15500},"qtde":15500,"total":26350.0,"frete":0,"valorRecebido":26350.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2305,"data":"2026-03-11","cliente":"CLEIDIANE","nf":"2426","areas":{"MA":1000},"qtde":1000,"total":1800.0,"frete":0,"valorRecebido":1800.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null},{"id":2306,"data":"2026-03-11","cliente":"CARLÃO - SÃO JOSÉ DO RIO PRETO - SP","nf":"2430","areas":{"A1":3100,"MA":5400},"qtde":8500,"total":15300.0,"frete":0,"valorRecebido":15300.0,"status":"PAGO","dataDeposito":null,"tipoVenda":"coco","pesoKg":null,"litragem":null,"vPorLitro":null}];
  localStorage.setItem('neofrut_vendas_v1', JSON.stringify(dados));
  showToast('\u2713 Banco normalizado \u2014 78 clientes \u00fanicos');
  initVendas();
  var btn = document.getElementById('btn-normalizar');
  if(btn) btn.style.display='none';
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
    if(!pc[v.cliente])pc[v.cliente]={c:0,r:0,ult:null};
    pc[v.cliente].c+=v.qtde||0;
    pc[v.cliente].r+=v.total||0;
    if(!pc[v.cliente].ult||v.data>pc[v.cliente].ult)pc[v.cliente].ult=v.data;
  });

  let rank=Object.entries(pc).sort((a,b)=>b[1].c-a[1].c);
  if(busca) rank=rank.filter(([n])=>n.toLowerCase().includes(busca));

  const maxC=rank[0]?.[1].c||1;
  const _totalCocos=rank.reduce((s,[,d])=>s+d.c,0);
  const _totalReceita=rank.reduce((s,[,d])=>s+d.r,0);
  const _precoMedio=_totalCocos>0?(_totalReceita/_totalCocos).toFixed(2):null;
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
    const precoCli=d.c>0?(d.r/d.c).toFixed(2):null;
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

// ─────────── FILTRO MAPA ───────────
let _mapaFiltro = 'todos';

function setMapaFiltro(filtro) {
  _mapaFiltro = filtro;
  ['todos','vermelho','amarelo','verde'].forEach(f => {
    const btn = document.getElementById('mapa-filtro-' + f);
    if (btn) btn.classList.toggle('ativo', f === filtro);
  });
  renderMapa();
}

// ─────────── INIT ───────────
// ─────────── SUPABASE ───────────
const _SB = supabase.createClient('https://gdskveecuarclajuchfx.supabase.co', 'sb_publishable_ocksk4S_Gw9cAXCZSHtFmw_l0IqAERL');

// ─────────── AUTH ───────────
let _appIniciado = false;

async function checkAuth() {
  const { data: { session } } = await _SB.auth.getSession();
  if (!session) {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  } else {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-email').textContent = session.user.email;
    if(!_appIniciado) {
      _appIniciado = true;
      await initApp();
    }
  }
}

async function loginGoogle() {
  await _SB.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.href }
  });
}

async function logout() {
  _appIniciado = false;
  await _SB.auth.signOut();
  location.reload();
}

_SB.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-email').textContent = session.user.email;
    if(!_appIniciado) {
      _appIniciado = true;
      await initApp();
    }
  } else if (event === 'SIGNED_OUT') {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  }
});

async function initApp() {
  window._lancAreaAtiva = 'todas';
  window._analiseAreaAtiva = null;
  window._gestaoAreaAtiva = null;
  window._vendaAnoAtivo = 'todos';
  window._vendaMesAtivo = 'todos';
  // carregar dados do Supabase em paralelo
  await Promise.all([
    loadDBFromSupabase(),
    loadVendasSupabase(),
    carregarTelefones()
  ]);
  // Restaurar aba ativa salva ou ir para dashboard
  const abaAtiva = localStorage.getItem('neofrut_aba_ativa') || 'dashboard';
  setTimeout(() => showPage(abaAtiva), 50);
}

// Aguardar DOM pronto e verificar autenticação
document.addEventListener('DOMContentLoaded', checkAuth);
// initAnalise será chamado ao abrir a página



// ── MÓDULO MERCADOS (integrado) ──
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

const DADOS_UF = {"SE": {"cocos": 934500, "receita": 1376090.0, "rpc": 1.47, "por_ano": {"2023": {"cocos": 246700, "receita": 302025.0}, "2024": {"cocos": 398500, "receita": 628440.0}, "2025": {"cocos": 198300, "receita": 281625.0}, "2026": {"cocos": 91000, "receita": 164000.0}}, "por_mes": {"1": 92000, "2": 115900, "3": 115100, "4": 114500, "7": 2500, "8": 39100, "11": 13050, "12": 201650, "5": 13000, "9": 114550, "10": 113150}, "clientes": {"GEORGE - VITTA FRUTAS": {"cocos": 250100, "receita": 386440.0, "ultima": "2026-03-10", "n_pedidos": 14}, "DAIANE - ARACAJU": {"cocos": 160000, "receita": 284700.0, "ultima": "2024-05-13", "n_pedidos": 50}, "ALEX - COCO BAMBU": {"cocos": 109000, "receita": 136350.0, "ultima": "2025-08-22", "n_pedidos": 9}, "JOÃO FRANCISCO - ARACAJU": {"cocos": 94000, "receita": 148600.0, "ultima": "2024-05-03", "n_pedidos": 13}, "PRETO DO COCO - ARACAJU": {"cocos": 66200, "receita": 75625.0, "ultima": "2025-12-24", "n_pedidos": 22}, "GILDO - CEASA": {"cocos": 48000, "receita": 43600.0, "ultima": "2025-12-09", "n_pedidos": 6}, "RAUL ALVES - ARACAJU": {"cocos": 42000, "receita": 55400.0, "ultima": "2025-12-29", "n_pedidos": 6}, "JONATHAN - ARACAJU": {"cocos": 37000, "receita": 59750.0, "ultima": "2026-01-09", "n_pedidos": 5}, "MM FRUTAS": {"cocos": 36000, "receita": 23400.0, "ultima": "2025-09-09", "n_pedidos": 4}, "WANDERLEY - ARACAJU": {"cocos": 32500, "receita": 43850.0, "ultima": "2026-01-06", "n_pedidos": 8}, "CARLOS - ARACAJU": {"cocos": 27500, "receita": 45275.0, "ultima": "2025-12-30", "n_pedidos": 3}, "COCO DIAMANTE": {"cocos": 13500, "receita": 35370.0, "ultima": "2025-05-07", "n_pedidos": 3}, "WELLINGTON - ARACAJU": {"cocos": 9000, "receita": 13000.0, "ultima": "2024-12-31", "n_pedidos": 3}, "DA HORTA PARA PORTA": {"cocos": 9000, "receita": 23580.0, "ultima": "2025-04-30", "n_pedidos": 2}, "DAVID - SANTANA": {"cocos": 700, "receita": 1150.0, "ultima": "2025-02-20", "n_pedidos": 10}}, "fabrica": false, "por_mes_ano": {"2023": {"1": 6800, "2": 56700, "3": 26100, "4": 40500, "7": 2500, "8": 12100, "11": 13000, "12": 89000}, "2024": {"1": 74100, "2": 43000, "3": 25000, "4": 27000, "5": 8500, "9": 96550, "10": 113150, "11": 50, "12": 11150}, "2025": {"1": 100, "2": 200, "4": 47000, "5": 4500, "8": 27000, "9": 18000, "12": 101500}, "2026": {"1": 11000, "2": 16000, "3": 64000}}}, "AL": {"cocos": 278600, "receita": 346285.234375, "rpc": 1.24, "por_ano": {"2023": {"cocos": 114900, "receita": 128850.0}, "2024": {"cocos": 73800, "receita": 121020.0}, "2025": {"cocos": 89900, "receita": 96415.234375}}, "por_mes": {"1": 55400, "2": 36500, "3": 23000, "4": 15000, "5": 4700, "7": 8200, "8": 40500, "9": 22000, "10": 7500, "11": 11000, "12": 47300, "6": 7500}, "clientes": {"RAFAEL - MACEIÓ": {"cocos": 151000, "receita": 195500.0, "ultima": "2025-08-15", "n_pedidos": 35}, "BINHO DO COCO": {"cocos": 86600, "receita": 106985.234375, "ultima": "2025-12-15", "n_pedidos": 33}, "DONA FATIMA - MACIEO": {"cocos": 41000, "receita": 43800.0, "ultima": "2025-08-12", "n_pedidos": 5}}, "fabrica": false, "por_mes_ano": {"2023": {"1": 26000, "2": 16000, "3": 13500, "4": 7000, "5": 2200, "7": 2200, "8": 13500, "9": 22000, "10": 1500, "11": 3000, "12": 8000}, "2024": {"2": 16500, "4": 8000, "10": 6000, "11": 8000, "12": 35300}, "2025": {"1": 29400, "2": 4000, "3": 9500, "5": 2500, "6": 7500, "7": 6000, "8": 27000, "12": 4000}}}, "MT": {"cocos": 714750, "receita": 634885.0, "rpc": 0.89, "por_ano": {"2023": {"cocos": 653750, "receita": 575685.0}, "2024": {"cocos": 55000, "receita": 55000.0}, "2025": {"cocos": 6000, "receita": 4200.0}}, "por_mes": {"1": 13400, "2": 24300, "3": 43500, "4": 30800, "5": 84000, "6": 37600, "7": 77750, "8": 46000, "9": 137900, "10": 146000, "11": 73500}, "clientes": {"MIGUEL - CUIABÁ": {"cocos": 520800, "receita": 434500.0, "ultima": "2024-09-11", "n_pedidos": 29}, "ALEXANDRE - MT": {"cocos": 172950, "receita": 181485.0, "ultima": "2025-08-15", "n_pedidos": 21}, "PAULO - SINOP": {"cocos": 21000, "receita": 18900.0, "ultima": "2023-06-21", "n_pedidos": 1}}, "fabrica": false, "por_mes_ano": {"2023": {"1": 13400, "2": 24300, "3": 43500, "4": 30800, "5": 84000, "6": 37600, "7": 40750, "8": 40000, "9": 119900, "10": 146000, "11": 73500}, "2024": {"7": 37000, "9": 18000}, "2025": {"8": 6000}}}, "SP": {"cocos": 2067300, "receita": 3792397.1520000002, "rpc": 1.83, "por_ano": {"2023": {"cocos": 388700, "receita": 534395.0}, "2024": {"cocos": 514500, "receita": 1349700.0}, "2025": {"cocos": 1066100, "receita": 1685202.1519999998}, "2026": {"cocos": 98000, "receita": 223100.0}}, "por_mes": {"1": 83500, "3": 287500, "4": 291700, "5": 261000, "6": 94500, "7": 122500, "8": 49500, "9": 266000, "11": 153000, "12": 48600, "2": 235500, "10": 174000}, "clientes": {"LEONARDO - CEAGESP": {"cocos": 1074000, "receita": 1981292.1519999998, "ultima": "2025-11-19", "n_pedidos": 114}, "ASSIS - CAMPINAS": {"cocos": 319000, "receita": 793775.0, "ultima": "2026-03-02", "n_pedidos": 37}, "CEARÁ - CAMPINAS": {"cocos": 303000, "receita": 459900.0, "ultima": "2026-01-09", "n_pedidos": 34}, "MARCELLA - CEAGESP": {"cocos": 74200, "receita": 75220.0, "ultima": "2023-09-29", "n_pedidos": 8}, "CARLÃO - SÃO JOSÉ DO RIO PRETO - SP": {"cocos": 72500, "receita": 126800.0, "ultima": "2026-03-11", "n_pedidos": 9}, "EDGAR - SP": {"cocos": 70500, "receita": 123800.0, "ultima": "2025-11-26", "n_pedidos": 8}, "TITIL - INDAIATUBA": {"cocos": 62600, "receita": 80760.0, "ultima": "2026-01-05", "n_pedidos": 8}, "CARLÃO FALECIDO": {"cocos": 54000, "receita": 69400.0, "ultima": "2024-01-04", "n_pedidos": 9}, "NOELTON - SP": {"cocos": 37500, "receita": 81450.0, "ultima": "2024-04-19", "n_pedidos": 4}}, "fabrica": false, "por_mes_ano": {"2023": {"1": 8500, "3": 54500, "4": 63700, "5": 33000, "6": 36000, "7": 16500, "8": 30500, "9": 96000, "11": 34000, "12": 16000}, "2024": {"1": 13000, "2": 89500, "3": 91000, "4": 125500, "5": 120000, "6": 51500, "7": 24000}, "2025": {"1": 27000, "2": 100000, "3": 125000, "4": 102500, "5": 108000, "6": 7000, "7": 82000, "8": 19000, "9": 170000, "10": 174000, "11": 119000, "12": 32600}, "2026": {"1": 35000, "2": 46000, "3": 17000}}}, "BA": {"cocos": 514000, "receita": 607200.0, "rpc": 1.18, "por_ano": {"2023": {"cocos": 158000, "receita": 168850.0}, "2024": {"cocos": 45000, "receita": 78750.0}, "2025": {"cocos": 279000, "receita": 296400.0}, "2026": {"cocos": 32000, "receita": 63200.0}}, "por_mes": {"2": 55000, "8": 49000, "9": 58000, "10": 65000, "11": 88000, "12": 72000, "1": 89000, "3": 19000, "4": 9000, "7": 10000}, "clientes": {"JACIARA - FEIRA DE SANTANA": {"cocos": 514000, "receita": 607200.0, "ultima": "2026-02-19", "n_pedidos": 55}}, "fabrica": false, "por_mes_ano": {"2023": {"2": 20000, "8": 10000, "9": 18000, "10": 36000, "11": 38000, "12": 36000}, "2024": {"1": 36000, "10": 9000}, "2025": {"1": 37000, "2": 19000, "3": 19000, "4": 9000, "7": 10000, "8": 39000, "9": 40000, "10": 20000, "11": 50000, "12": 36000}, "2026": {"1": 16000, "2": 16000}}}, "MS": {"cocos": 1933100, "receita": 3202550.0, "rpc": 1.66, "por_ano": {"2023": {"cocos": 669500, "receita": 725250.0}, "2024": {"cocos": 961600, "receita": 1882300.0}, "2025": {"cocos": 302000, "receita": 595000.0}}, "por_mes": {"4": 157000, "5": 80500, "6": 95100, "7": 145500, "8": 97000, "9": 203000, "10": 210000, "11": 186000, "12": 177000, "1": 226000, "2": 168000, "3": 188000}, "clientes": {"LINCOLN - CAMPO GRANDE": {"cocos": 1933100, "receita": 3202550.0, "ultima": "2025-04-28", "n_pedidos": 181}}, "fabrica": false, "por_mes_ano": {"2023": {"4": 31000, "5": 10000, "6": 32000, "7": 73500, "8": 97000, "9": 107000, "10": 126000, "11": 100000, "12": 93000}, "2024": {"1": 131000, "2": 86000, "3": 95000, "4": 94000, "5": 70500, "6": 63100, "7": 72000, "9": 96000, "10": 84000, "11": 86000, "12": 84000}, "2025": {"1": 95000, "2": 82000, "3": 93000, "4": 32000}}}, "MG": {"cocos": 104000, "receita": 114000.0, "rpc": 1.1, "por_ano": {"2023": {"cocos": 73000, "receita": 71200.0}, "2024": {"cocos": 12000, "receita": 26400.000000000004}, "2025": {"cocos": 19000, "receita": 16400.0}}, "por_mes": {"5": 34000, "6": 25000, "7": 16000, "10": 8000, "3": 12000, "8": 9000}, "clientes": {"GLAUBER - BH": {"cocos": 96000, "receita": 106800.0, "ultima": "2025-08-06", "n_pedidos": 8}, "JONATHAN - MG": {"cocos": 8000, "receita": 7200.0, "ultima": "2023-10-13", "n_pedidos": 1}}, "fabrica": false, "por_mes_ano": {"2023": {"5": 24000, "6": 25000, "7": 16000, "10": 8000}, "2024": {"3": 12000}, "2025": {"5": 10000, "8": 9000}}}, "ES": {"cocos": 1820640, "receita": 1789388.7724166673, "rpc": 0.98, "por_ano": {"2023": {"cocos": 53000, "receita": 42400.0}, "2024": {"cocos": 149350, "receita": 150208.497}, "2025": {"cocos": 1618290, "receita": 1596780.275416667}}, "por_mes": {"6": 227200, "5": 162300, "12": 130850, "1": 302200, "2": 212740, "3": 185000, "4": 216500, "7": 115300, "8": 96000, "9": 87800, "10": 84750}, "clientes": {"DIEGO - LINHARES": {"cocos": 1820640, "receita": 1789388.7724166673, "ultima": "2025-10-30", "n_pedidos": 110}}, "fabrica": false, "por_mes_ano": {"2023": {"6": 53000}, "2024": {"5": 18500, "12": 130850}, "2025": {"1": 302200, "2": 212740, "3": 185000, "4": 216500, "5": 143800, "6": 174200, "7": 115300, "8": 96000, "9": 87800, "10": 84750}}}, "PR": {"cocos": 134000, "receita": 339999.998, "rpc": 2.54, "por_ano": {"2024": {"cocos": 74000, "receita": 236849.998}, "2025": {"cocos": 20000, "receita": 20900.0}, "2026": {"cocos": 40000, "receita": 82250.0}}, "por_mes": {"2": 27500, "3": 21000, "4": 26000, "5": 17000, "9": 6000, "10": 5000, "12": 9000, "1": 22500}, "clientes": {"ALDO SERGIO - CURITIBA": {"cocos": 134000, "receita": 339999.998, "ultima": "2026-02-12", "n_pedidos": 17}}, "fabrica": false, "por_mes_ano": {"2024": {"2": 10000, "3": 21000, "4": 26000, "5": 17000}, "2025": {"9": 6000, "10": 5000, "12": 9000}, "2026": {"1": 22500, "2": 17500}}}, "RJ": {"cocos": 19000, "receita": 24700.0, "rpc": 1.3, "por_ano": {"2024": {"cocos": 19000, "receita": 24700.0}}, "por_mes": {"12": 19000}, "clientes": {"RENAN - RIO DE JANEIRO": {"cocos": 19000, "receita": 24700.0, "ultima": "2024-12-16", "n_pedidos": 2}}, "fabrica": false, "por_mes_ano": {"2024": {"12": 19000}}}, "PE": {"cocos": 166500, "receita": 171100.0, "rpc": 1.03, "por_ano": {"2025": {"cocos": 151000, "receita": 137000.0}, "2026": {"cocos": 15500, "receita": 34100.0}}, "por_mes": {"9": 75000, "11": 30000, "12": 46000, "1": 15500}, "clientes": {"ARTHUR - PETROLINA": {"cocos": 166500, "receita": 171100.0, "ultima": "2026-01-16", "n_pedidos": 12}}, "fabrica": false, "por_mes_ano": {"2025": {"9": 75000, "11": 30000, "12": 46000}, "2026": {"1": 15500}}}, "DF": {"cocos": 102000, "receita": 217300.0, "rpc": 2.13, "por_ano": {"2025": {"cocos": 76000, "receita": 143300.0}, "2026": {"cocos": 26000, "receita": 74000.0}}, "por_mes": {"11": 29000, "12": 47000, "1": 16000, "2": 10000}, "clientes": {"MATEUS - BRASILIA": {"cocos": 102000, "receita": 217300.0, "ultima": "2026-02-13", "n_pedidos": 10}}, "fabrica": false, "por_mes_ano": {"2025": {"11": 29000, "12": 47000}, "2026": {"1": 16000, "2": 10000}}}, "FAB_QUALICOCO": {"cocos": 286460, "receita": 336977.10000000003, "rpc": 1.18, "por_ano": {"2024": {"cocos": 286460, "receita": 336977.10000000003}}, "por_mes": {"9": 129900, "10": 92400, "11": 31160, "12": 33000}, "clientes": {"QUALICOCO": {"cocos": 286460, "receita": 336977.10000000003, "ultima": "", "n_pedidos": 0}}, "fabrica": true, "nome_fab": "QUALICOCO", "por_mes_ano": {"2024": {"9": 129900, "10": 92400, "11": 31160, "12": 33000}}}, "FAB_FRYSK": {"cocos": 1744870, "receita": 1241677.19, "rpc": 0.71, "por_ano": {"2023": {"cocos": 1125370, "receita": 879907.0699999998}, "2024": {"cocos": 26600, "receita": 39963.54}, "2025": {"cocos": 512500, "receita": 249154.98}, "2026": {"cocos": 80400, "receita": 72651.6}}, "por_mes": {"1": 28800, "2": 327550, "3": 187400, "4": 115760, "5": 209200, "6": 130460, "7": 137700, "8": 122400, "9": 162000, "10": 281400, "11": 30700, "12": 11500}, "clientes": {"FRYSK": {"cocos": 1744870, "receita": 1241677.19, "ultima": "", "n_pedidos": 0}}, "fabrica": true, "nome_fab": "FRYSK", "por_mes_ano": {"2023": {"1": 28800, "2": 256150, "3": 178400, "4": 115760, "5": 184200, "6": 92560, "7": 90500, "8": 89000, "9": 90000}, "2024": {"5": 15100, "10": 11500}, "2025": {"5": 9900, "6": 37900, "7": 47200, "8": 33400, "9": 72000, "10": 269900, "11": 30700, "12": 11500}, "2026": {"2": 71400, "3": 9000}}}, "FAB_NECTTARE": {"cocos": 1128450, "receita": 1017690.0, "rpc": 0.9, "por_ano": {"2023": {"cocos": 60000, "receita": 40730.0}, "2024": {"cocos": 875720, "receita": 874900.0}, "2025": {"cocos": 192730, "receita": 102060.0}}, "por_mes": {"6": 336150, "8": 40000, "4": 9000, "5": 59700, "7": 393900, "9": 44900, "11": 206700, "12": 38100}, "clientes": {"NECTTARE": {"cocos": 1128450, "receita": 1017690.0, "ultima": "", "n_pedidos": 0}}, "fabrica": true, "nome_fab": "NECTTARE", "por_mes_ano": {"2023": {"6": 20000, "8": 40000}, "2024": {"4": 9000, "5": 59700, "6": 280920, "7": 236400, "9": 44900, "11": 206700, "12": 38100}, "2025": {"6": 35230, "7": 157500}}}, "FAB_MARCOS FALCÃO": {"cocos": 600200, "receita": 361692.40000000014, "rpc": 0.6, "por_ano": {"2023": {"cocos": 274300, "receita": 126582.00000000001}, "2024": {"cocos": 140100, "receita": 167830.39999999997}, "2025": {"cocos": 185800, "receita": 67280.0}}, "por_mes": {"1": 25000, "2": 42000, "3": 16800, "4": 16000, "6": 27000, "7": 45000, "8": 64500, "9": 157200, "10": 143500, "11": 8000, "12": 45700, "5": 9500}, "clientes": {"MARCOS FALCÃO": {"cocos": 600200, "receita": 361692.40000000014, "ultima": "", "n_pedidos": 0}}, "fabrica": true, "nome_fab": "MARCOS FALCÃO", "por_mes_ano": {"2023": {"1": 16500, "2": 42000, "3": 16800, "4": 16000, "6": 27000, "7": 45000, "8": 36000, "9": 28000, "10": 30000, "11": 8000, "12": 9000}, "2024": {"1": 8500, "9": 19300, "10": 75600, "12": 36700}, "2025": {"5": 9500, "8": 28500, "9": 109900, "10": 37900}}}};

const HEATMAP_DIAS = {"1": {"cocos": 2426210, "n": 287}, "2": {"cocos": 2823920, "n": 267}, "4": {"cocos": 2445430, "n": 245}, "5": {"cocos": 2606750, "n": 247}, "3": {"cocos": 2465910, "n": 233}, "6": {"cocos": 275000, "n": 24}, "0": {"cocos": 16500, "n": 1}};

const CIDADES_CLIMA = [
  {nome:'Campinas',        uf:'SP', lat:-22.9056, lon:-47.0608,  chegada:[2]},
  {nome:'São Paulo',       uf:'SP', lat:-23.5505, lon:-46.6333,  chegada:[2]},
  {nome:'Rio de Janeiro',  uf:'RJ', lat:-22.9068, lon:-43.1729,  chegada:[2]},
  {nome:'Belo Horizonte',  uf:'MG', lat:-19.9167, lon:-43.9345,  chegada:[2]},
  {nome:'Brasília',        uf:'DF', lat:-15.7942, lon:-47.8822,  chegada:[2]},
  {nome:'Goiânia',         uf:'GO', lat:-16.6869, lon:-49.2648,  chegada:[2]},
  {nome:'Campo Grande',    uf:'MS', lat:-20.4697, lon:-54.6201,  chegada:[3]},
  {nome:'Cuiabá',          uf:'MT', lat:-15.5961, lon:-56.0963,  chegada:[3]},
  {nome:'Curitiba',        uf:'PR', lat:-25.4284, lon:-49.2733,  chegada:[3]},
  {nome:'Feira de Santana',uf:'BA', lat:-12.2664, lon:-38.9663,  chegada:[0]},
  {nome:'Maceió',          uf:'AL', lat:-9.66583, lon:-35.73511, chegada:[0]},
  {nome:'Aracaju',         uf:'SE', lat:-10.9472, lon:-37.0731,  chegada:[0]},
];

const MESES_NOME = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const DIAS_PT    = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const MESES_PT   = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const NOMES_UF   = {
  SP:'São Paulo',MS:'Mato Grosso do Sul',ES:'Espírito Santo',SE:'Sergipe',
  MT:'Mato Grosso',BA:'Bahia',AL:'Alagoas',MG:'Minas Gerais',
  PR:'Paraná',DF:'Distrito Federal',PE:'Pernambuco',RJ:'Rio de Janeiro',GO:'Goiás',
};

let _dadosClima = {};
let _rankAno    = 'todos';
let _sazAno     = 'todos';

// ── UTILS ──
function fmtN(n){return n>=1000000?(n/1000000).toFixed(1).replace('.',',')+' M':n.toLocaleString('pt-BR');}
function fmtR(n){return 'R$'+(n>=1000?(n/1000).toFixed(0)+'k':n.toFixed(0));}
function fmtData(s){if(!s)return'—';const p=s.split('-');return p[2]+'/'+p[1]+'/'+p[0];}

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
function round(n,d){return Math.round(n*Math.pow(10,d))/Math.pow(10,d);}

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
    const nomeMostrar = isFab ? '🏭 '+(v.nome_fab||uf.replace('FAB_','')) : (NOMES_UF[uf]||uf);
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
        +'<span style="font-size:12px;font-weight:700;font-family:var(--font-mono);min-width:65px">'+fmtR(v.receita)+'</span></div></td>'
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
   +kpiCard('Receita total',fmtR(d.receita),'var(--teal)')
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

  // Clientes
  const clientes = Object.entries(d.clientes).sort((a,b)=>(b[1].ultima||'').localeCompare(a[1].ultima||''));
  const tbodyEl = document.getElementById('mest-clientes');
  tbodyEl.innerHTML='';
  clientes.forEach(([cli,cv])=>{
    const tr=document.createElement('tr');
    tr.style.borderBottom='1px solid var(--border)';
    const diasSemComprar = cv.ultima ? Math.floor((new Date()-new Date(cv.ultima+'T00:00:00'))/(1000*60*60*24)) : 999;
    const inativo = diasSemComprar > 60;
    const bgInativo = inativo ? 'background:#fff5f5;' : '';
    tr.style.cssText = 'border-bottom:1px solid var(--border);'+bgInativo;
    tr.innerHTML='<td style="padding:8px;font-size:12px;font-weight:700;color:var(--text)">'+cli
      +(inativo?'<span style="margin-left:6px;font-size:9px;font-weight:700;background:#fde8ea;color:var(--vermelho);padding:2px 5px;border-radius:4px">⚠️ +'+diasSemComprar+'d</span>':'')
      +'</td>'
      +'<td style="padding:8px;font-size:12px;font-family:var(--font-mono)">'+fmtN(cv.cocos)+'</td>'
      +'<td style="padding:8px;font-size:12px;font-family:var(--font-mono)">'+fmtR(cv.receita)+'</td>'
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
function fmtDia(s){const d=new Date(s+'T12:00:00');return DIAS_PT[d.getDay()]+' '+d.getDate()+'/'+MESES_PT[d.getMonth()];}
function wcEmoji(wc){if(wc<=1)return'☀️';if(wc<=3)return'🌤️';if(wc<=48)return'☁️';if(wc<=67)return'🌧️';if(wc<=77)return'❄️';return'⛈️';}
function wcDesc(wc){if(wc<=1)return'Sol aberto';if(wc<=3)return'Nublado';if(wc<=48)return'Névoa';if(wc<=57)return'Garoa';if(wc<=67)return'Chuva';return'Tempestade';}
function temChuva(wc){return wc>=51;}

async function carregarClima(){
  const grid=document.getElementById('clima-grid');
  const alertaEl=document.getElementById('alerta');
  const alertaTxt=document.getElementById('alerta-txt');
  const cidadesChuva=[];
  if(grid) grid.innerHTML='<div style="grid-column:1/-1;padding:20px;color:var(--muted);font-size:13px;text-align:center">⏳ Carregando previsão do tempo...</div>';
  const resultados=await Promise.all(CIDADES_CLIMA.map(async c=>{
    try{
      const url='https://api.open-meteo.com/v1/forecast?latitude='+c.lat+'&longitude='+c.lon
        +'&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum'
        +'&timezone=America%2FSao_Paulo&forecast_days=16';
      let resp;
      for(let t=0;t<3;t++){
        try{
          const ctrl = new AbortController();
          const tid = setTimeout(()=>ctrl.abort(), 8000);
          resp = await fetch(url, {signal:ctrl.signal});
          clearTimeout(tid);
          if(resp.ok) break;
        }catch(e){
          if(t===2) throw e;
          await new Promise(r=>setTimeout(r,1000*(t+1)));
        }
      }
      if(!resp||!resp.ok) throw new Error('HTTP '+(resp?resp.status:'timeout'));
      const d=await resp.json();const dl=d.daily;
      const dias=dl.time.map((dt,i)=>({
        data:fmtDia(dt),wc:dl.weathercode[i],
        tmax:Math.round(dl.temperature_2m_max[i]),
        tmin:Math.round(dl.temperature_2m_min[i]),
        mm:parseFloat(dl.precipitation_sum[i]||0).toFixed(1),
        chuva:temChuva(dl.weathercode[i])
      }));
      _dadosClima[c.nome]={cidade:c,dias};
      const chegadaRuim=c.chegada.some(i=>dias[i]?.chuva);
      if(chegadaRuim)cidadesChuva.push(c.nome+'/'+c.uf);
      return{c,dias,chegadaRuim,ok:true};
    }catch(e){console.warn(c.nome,e.message);return{c,dias:null,chegadaRuim:false,ok:false};}
  }));
  grid.innerHTML='';
  resultados.forEach(r=>{
    const card=document.createElement('div');
    card.className='clima-card'+(r.chegadaRuim?' ruim':(!r.dias||r.dias[0].chuva||r.dias[0].tmax<28)?'':' otimo');
    if(!r.ok||!r.dias){card.innerHTML='<div class="card-header"><span class="card-cidade">'+r.c.nome+'</span><span class="card-uf"> '+r.c.uf+'</span></div><div class="card-loading">Sem dados</div>';grid.appendChild(card);return;}
    const diasCard=r.dias.slice(0,7);
    const bCls=r.chegadaRuim?'ruim':r.dias[0].tmax>=28?'ok':'neutro';
    const bTxt=r.chegadaRuim?'🌧️ CHUVA NA CHEGADA':r.dias[0].tmax>=28?'☀️ FAVORÁVEL':'🌤️ NEUTRO';
    const hdr=document.createElement('div');hdr.className='card-header';
    hdr.innerHTML='<span class="card-cidade">'+r.c.nome+'</span><span class="card-uf"> '+r.c.uf+'</span>';
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
document.querySelectorAll('.modal-overlay').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===e.currentTarget)m.classList.remove('open');});
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));});


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

// Mercados iniciado apenas ao abrir a aba (via initMercados)





const MAPA_CLIENTES = {"LINCOLN - CAMPO GRANDE": {"uf": "MS", "cidade": "CAMPO GRANDE", "fabrica": false}, "DIEGO - LINHARES": {"uf": "ES", "cidade": "LINHARES", "fabrica": false}, "LEONARDO - CEAGESP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "MIGUEL - CUIABÁ": {"uf": "MT", "cidade": "CUIABÁ", "fabrica": false}, "JACIARA - FEIRA DE SANTANA": {"uf": "BA", "cidade": "FEIRA DE SANTANA", "fabrica": false}, "ASSIS - CAMPINAS": {"uf": "SP", "cidade": "CAMPINAS", "fabrica": false}, "CEARÁ - CAMPINAS": {"uf": "SP", "cidade": "CAMPINAS", "fabrica": false}, "GEORGE - VITTA FRUTAS": {"uf": "DF", "cidade": "BRASILIA", "fabrica": false}, "ARTHUR - PETROLINA": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "DONA FATIMA - THALYSON - MACEIÓ": {"uf": "AL", "cidade": "MACEIÓ", "fabrica": false}, "ALEXANDRE - MT": {"uf": "MT", "cidade": "RONDONOPOLIS", "fabrica": false}, "DAIANE - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "RAFAEL - MACEIÓ": {"uf": "AL", "cidade": "MACEIÓ", "fabrica": false}, "ALDO SERGIO - CURITIBA": {"uf": "PR", "cidade": "CURITIBA", "fabrica": false}, "ALEX - COCO BAMBU": {"uf": "GO", "cidade": "GOIANIA", "fabrica": false}, "MATEUS - BRASILIA": {"uf": "DF", "cidade": "BRASILIA", "fabrica": false}, "GLAUBER - BH": {"uf": "MG", "cidade": "BELO HORIZONTE", "fabrica": false}, "SR JOAO - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "BINHO DO COCO": {"uf": "AL", "cidade": "ARAPIRACA", "fabrica": false}, "MARCELLA - CEAGESP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "CARLÃO - SÃO JOSÉ DO RIO PRETO - SP": {"uf": "SP", "cidade": "SÃO JOSE DO RIO PRETO", "fabrica": false}, "EDGAR - SP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "JAMISSON": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "PRETO DO COCO - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "TITIL - INDAIATUBA": {"uf": "SP", "cidade": "CAMPINAS", "fabrica": false}, "CARLÃO FALECIDO": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "GILDO - CEASA": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "RAUL ALVES - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "NETO - PIRACICABA": {"uf": "SP", "cidade": "PIRACICABA", "fabrica": false}, "NOELTON - SP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "RENAN - RIO DE JANEIRO": {"uf": "RJ", "cidade": "RIO DE JANEIRO", "fabrica": false}, "JONATHAN - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "MM FRUTAS - SP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "WANDERLEY - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "BENASSI - SP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "CARLOS - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "WALTER - SP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "RICARDO - COCO DIAMANTE": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "PAULO - SINOP": {"uf": "MT", "cidade": "SINOP", "fabrica": false}, "DA HORTA PARA PORTA": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "MARLY - COCO VIDA": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "SEVERINO - CAMPINAS": {"uf": "SP", "cidade": "CAMPINAS", "fabrica": false}, "WELLINGTON - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "DANIEL - MACEIÓ": {"uf": "AL", "cidade": "MACEIÓ", "fabrica": false}, "MAIKE - COCO MACENA": {"uf": "ES", "cidade": "LINHARES", "fabrica": false}, "TOMOHIDE - BA": {"uf": "BA", "cidade": "COSTA DO SAUIPE", "fabrica": false}, "GENILSON - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "JAILSON - ARUANA": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "MARIA - CEAGESP": {"uf": "SP", "cidade": "SÃO PAULO", "fabrica": false}, "JONATHAN - MG": {"uf": "MG", "cidade": "UBERLANDIA", "fabrica": false}, "EDVANEIDE - HORTOLANDIA": {"uf": "SP", "cidade": "PIRACICABA", "fabrica": false}, "RAMON - ARACAJU": {"uf": "SE", "cidade": "ARACAJU", "fabrica": false}, "VALTENIO - NEOPOLIS": {"uf": "SE", "cidade": "NEOPOLIS", "fabrica": false}, "VAL DA BANANA": {"uf": "SE", "cidade": "PROPRIÁ", "fabrica": false}, "EVERLAN - AQUIDABÃ": {"uf": "SE", "cidade": "AQUIDABÃ", "fabrica": false}, "VAL - PENEDO": {"uf": "AL", "cidade": "PENEDO", "fabrica": false}, "CLEIDIANE": {"uf": "SE", "cidade": "PROPRIÁ", "fabrica": false}, "ANTONIO ALVES": {"uf": "SE", "cidade": "PROPRIÁ", "fabrica": false}, "DAVID - SANTANA": {"uf": "SE", "cidade": "SANTANA SÃO FRANCISCO", "fabrica": false}, "WEYSIANE - NEOLPOLIS": {"uf": "SE", "cidade": "NEOPOLIS", "fabrica": false}, "MARCOS FALCÃO": {"uf": "", "cidade": "", "fabrica": true}, "FRYSK": {"uf": "", "cidade": "", "fabrica": true}, "NECTTARE": {"uf": "", "cidade": "", "fabrica": true}, "QUALICOCO": {"uf": "", "cidade": "", "fabrica": true}};


function initMercados(){
  // Renderizar componentes do painel de mercados
  initRanking();
  initSazonalidade();
  renderHeatmapDias();
  carregarClima();
}
