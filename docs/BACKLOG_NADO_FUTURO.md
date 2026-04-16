# Backlog Futuro — Sistema Nado

> Melhorias opcionais avaliadas em 16/04/2026, decisão: adiar até surgir necessidade real.

---

## 1. Migrar `localStorage` → `IndexedDB`

### Quando reconsiderar
- Se o Nado começar a reclamar de "memória cheia" com frequência
- Se passar de **500 contagens/dia**
- Se quiserem guardar **fotos dos cocos** para auditoria localmente
- Se **múltiplos trabalhadores** passarem a usar o mesmo celular

### Comparativo
| | localStorage (atual) | IndexedDB |
|---|---|---|
| Capacidade | ~5 MB | ~50+ MB |
| API | Simples (setItem/getItem) | Complexa (conexões, transações) |
| Busca | Não tem | Tem índices e queries |

### Situação atual
- Nado faz ~100 contagens/dia
- Cada contagem ocupa ~500 bytes
- Em 30 dias: ~1,5 MB (bem abaixo do limite de 5 MB)
- Já implementada proteção `safeStorageSet` com limpeza automática se estourar

### Custo estimado
- **3-5 dias** de desenvolvimento
- Risco de bug durante migração de dados existentes
- Complexidade de manutenção aumenta muito

### Recomendação
**Não fazer agora.** Só se houver indicação real de quota cheia.

---

## 2. Tela de Diagnóstico Escondida

### O que é
Tela secreta acessada com gesto oculto (ex: 5 toques no logo) que mostra o estado interno do app para facilitar debug remoto.

### Conteúdo da tela
```
Última sync:       timestamp
Tempo offline:     minutos
Contagens hoje:    N
Na fila:           N
Tentativas falhas: N
Último erro:       mensagem + timestamp

Storage usado:     X / 5 MB (Y%)
Cache SW:          versão
Sessão válida:     sim/não (expira em)

Botões:
- Ver log completo
- Limpar cache
- Forçar sync
- Exportar diagnóstico por WhatsApp
```

### Quando reconsiderar
- Se acontecer novamente situação tipo "o app não está atualizando" (congelamento de cache)
- Se Victor (admin) estiver distante do Nado (campo vs escritório)
- Se **várias pessoas** usarem o app em celulares diferentes

### Custo estimado
- **1-2 dias** de desenvolvimento
- Baixa complexidade (tela de leitura)
- Botão "Exportar por WhatsApp" é o mais valioso

### Recomendação
**Maior custo-benefício dos 3 opcionais.** Fazer se surgir primeira situação de debug remoto complicado.

---

## 3. Testes E2E Automatizados

### O que é
Robô que simula o Nado usando o app, testa cada fluxo e avisa se alguma coisa quebrou. Roda automaticamente a cada push no GitHub.

### Exemplo de roteiro automatizado
```
1. Abrir nado.html
2. Clicar no eito "01/02" da Area A1
3. Digitar 500 em Mesa
4. Digitar 100 em Fábrica
5. Clicar em "Confirmar"
6. Verificar total = 600
7. Verificar toast "Eito confirmado"
8. Verificar entrada na fila de envio
```

### Ferramentas sugeridas
- **Playwright** (Microsoft, grátis) — mais moderno
- **Cypress** (grátis para projetos pequenos)

### Quando reconsiderar
- Se a fazenda crescer e tiver **múltiplos trabalhadores** usando o app
- Se **contratar outro dev** para mexer no código
- Se o código começar a quebrar com frequência após alterações

### Custo estimado
- **5-7 dias** inicial para montar infra + testes básicos
- **1-2 dias/mês** para manter e adicionar testes novos
- GitHub Actions grátis até certo limite

### Recomendação
**Esperar.** Só vale a pena quando o sistema tiver mais usuários ou mais devs mexendo.

---

## Resumo de Decisão

| Opção | Custo | Valor hoje | Decisão |
|-------|-------|-----------|---------|
| IndexedDB | 3-5 dias | Zero | Adiar |
| Tela diagnóstico | 1-2 dias | Alto | Adiar (fazer se precisar debug remoto) |
| Testes E2E | 5-7 dias | Médio | Adiar (fazer se time crescer) |

---

## Como retomar

Se algum dia precisar implementar uma destas, solicitar ao Claude no chat do Neofrut mencionando:
- "Quero implementar a tela de diagnóstico do backlog"
- "Quero migrar para IndexedDB"
- "Quero configurar testes E2E"

O Claude tem skill `anthropic-skills:neofrut` que dá contexto completo do sistema.

---

## Histórico das 3 Fases já implementadas (16/04/2026)

### Fase 1 — Segurança e perda de dados
- Retry automático com backoff exponencial
- XSS defense in depth
- Double-click protection
- Validação de quantidades (não-negativo, não-texto)

### Fase 2 — Robustez para campo
- Status detalhado de sincronização
- Mensagens de erro amigáveis em português
- Tratamento de QuotaExceededError com limpeza automática
- Timezone fixo Brasil/Sergipe (America/Maceio)

### Fase 3 — UX de campo
- Beep sonoro (sucesso/erro) via Web Audio API
- Vibração tátil reforçada
- Modo noturno automático (18h-6h) + toggle manual
