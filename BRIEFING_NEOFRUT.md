# BRIEFING COMPLETO — Sistema Neofrut

> **Objetivo deste documento:** fornecer contexto completo para que outro assistente de IA possa analisar o sistema, identificar melhorias e propor novas funcionalidades. O código é implementado por outro agente (Claude Code). Este documento serve para gerar ideias.

---

## 1. O QUE É O NEOFRUT

Sistema web de controle de colheita e vendas de coco verde para a Fazenda Paim (120 hectares, 100 em produção). Substitui planilhas Excel de campo. Hospedado em GitHub Pages, usa Supabase como banco de dados e funciona offline via localStorage.

**URL em produção:** https://victorpaimferrario.github.io/neofrut/

**Stack:** HTML/CSS/JS vanilla (sem frameworks), Supabase (PostgreSQL + Auth), ~6.500 linhas de código em 13 arquivos JS.

---

## 2. ESTRUTURA DA FAZENDA

- 7 áreas (talhões): **A1, A2, C, D, MARACUJÁ, MAMÃO DE CIMA, MAMÃO DE BAIXO**
  - MARACUJÁ e MAMÃO são nomes dos talhões, NÃO são frutas. O produto é exclusivamente coco verde.
- Cada área tem **eitos** (1 eito = 2 linhas de coqueiro). Ex: eito "01/02" = linhas 1 e 2
- Espaçamento: triângulo equilátero 7,5m × 7,5m × 7,5m
- Colheita e contagem são feitas **por eito**

---

## 3. REGRAS DE NEGÓCIO

### Ciclo de colheita (21 dias)
- O coqueiro lança um novo cacho a cada ~21 dias
- Do lançamento do cacho à colheita: ~6 meses
- Ideal: colher o mesmo coqueiro a cada 21 dias
- **Semáforo de urgência:**
  - VERDE: 1–14 dias (ok)
  - AMARELO: 15–20 dias (atenção)
  - VERMELHO: 21+ dias (atrasado, precisa colher)

### Classificação do coco
- **Mesa:** coco de qualidade para venda direta (feirante, distribuidor, mercado)
- **Fábrica:** coco para industrialização (água de coco envasada)

### Vendas para fábrica — regras específicas
- Pagamento é SEMPRE por **litragem × R$/litro**, nunca por quantidade de cocos
- **CIF** = preço que a fábrica paga (inclui frete). **FOB** = CIF − frete (o que sobra para o produtor)
- **Contagem dupla:** QTD NF (nota fiscal do produtor, sempre menor) vs QTD Fábrica (contagem na chegada)
- **ml/fruto** = litragem ÷ (qtde_fabrica + fora) × 1000. A fábrica inclui os cocos descartados ("fora") no denominador
- Frete = R$/tonelada × peso da carga em toneladas
- **R$/coco efetivo** = (receita − frete) ÷ quantidade de cocos — principal indicador para comparar fábricas

### Classificação de rendimento (ml/fruto)
| Faixa | Classificação |
|-------|---------------|
| < 300ml | PÉSSIMO |
| 300–349ml | RUIM |
| 350–399ml | RAZOÁVEL |
| 400–449ml | BOM |
| ≥ 450ml | ÓTIMO |

### Contratos de fábrica
- Contratos anuais com cotas mensais (volume em litros + preço por litro, variam por mês)
- Se litragem ≤ cota disponível → modo CONTRATO
- Se litragem > cota mas cota > 0 → modo MISTO (split automático)
- Se cota esgotada → modo SPOT (preço negociado à parte)

### Simulador de carga
- Conversões fixas: **1 litro = 2,3 cocos** | **1 coco = 2,2 kg**
- Operador informa qtde de cocos → sistema calcula peso e litragem automaticamente
- Adiciona cenários por fábrica (R$/litro + frete R$/ton) e compara resultados
- Ranking pelo maior R$/coco efetivo

---

## 4. MÓDULOS DO SISTEMA (o que existe hoje)

### 4.1 PAINEL GERAL (Dashboard)
- 7 KPIs principais: vencidos, atenção, em dia, colhidos no mês, colhidos no ano, plantas ativas, frutos/planta/ano
- Cards por área com barra de status (verde/amarelo/vermelho) e 6 métricas cada
- **Projeção de colheita** em 3 blocos: esta semana, próxima semana, próximos 21 dias — com tabela expandível por eito
- **Comparativo semanal:** produção desta semana vs anterior, variação por área
- **Mapa da fazenda:** heatmap visual com filtro por status
- **Alertas de contrato:** barra de progresso da cota mensal por fábrica, alertas de cota baixa e vencimento

### 4.2 ANÁLISE
- Ranking de eitos por urgência de colheita (8 colunas: status, dias, próxima colheita, última colheita, fr/pl, tendência, spark chart)
- Alerta de queda brusca (última colheita < 70% da média)
- Gráfico de linha por eito (histórico de colheitas com canvas)
- Produtividade mensal multi-área (últimos 8 meses)

### 4.3 LANÇAMENTO
- Interface tipo planilha para registrar colheita do dia, por eito
- Colunas: eito, status, dias, plantas, última, média 3, mesa, fábrica, total, %mesa, parcial
- Alertas de desvio (total > 1,5× ou < 0,5× da mediana = amarelo/vermelho)
- Rascunho automático (salva no localStorage, restaura ao voltar)
- Resumo formatado para WhatsApp após salvar
- Vincular clientes a colheitas retroativamente
- Nado: planejamento de colheita com programação e contagens

### 4.4 VENDAS (6 sub-abas)
1. **Painel:** 8 KPIs (cocos vendidos, receita, margem, recebido, frete, R$/coco, ticket médio, a receber), ranking top 8 clientes, gráfico de preço por mês/ano, comparativo anual
2. **Nova Venda:** formulário com cliente (datalist), NF, quantidade por área, valor, frete, status obrigatório (PAGO/PENDENTE)
3. **Lista:** tabela com todas as vendas, ordenável por coluna
4. **Pendentes:** vendas com status PENDENTE para controle de cobrança
5. **Clientes:** cadastro com busca, filtro por tipo (mesa/fábrica) e status, painel lateral com 3 abas (histórico, editar, contrato)
6. **Simulador:** calculadora de comparação entre fábricas por carga

**Venda para fábrica:** campos extras automáticos — qtde fábrica, fora, BRIX, placa, ticket, frete/ton, NF complementar, importação de planilha (TSV), indicadores calculados (8 métricas), modo contrato/spot/misto

### 4.5 GESTÃO
- Cadastro de áreas e eitos (nome, plantas por eito)
- Visível apenas para administradores

### 4.6 ESTRATÉGIA DE VENDAS (Mercados)
- Ranking de estados por volume de venda
- Sazonalidade: heatmap 12 meses por estado
- Oportunidades baseadas em clima
- Heatmap por dia da semana
- Drill-down por estado: evolução anual, clientes, WhatsApp integrado

### 4.7 MANUAL DE AJUDA
- Botão "?" na barra de navegação
- 7 seções: Visão Geral, Lançamento, Vendas, Fábricas, Simulador, Clientes, Painel Geral
- Linguagem simples para operadores de campo

---

## 5. BANCO DE DADOS (Supabase/PostgreSQL)

### Tabela `eitos`
| Coluna | Tipo |
|--------|------|
| area | text |
| eito_id | text |
| plantas | integer |

### Tabela `colheitas`
| Coluna | Tipo |
|--------|------|
| id | bigint PK |
| area | text |
| eito_id | text |
| data | date |
| total | integer |
| mesa | integer |
| fabrica | integer |
| cliente | text |
| lancamento_id | text |
| parcial | boolean |

### Tabela `vendas` (32 colunas)
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | bigint PK | |
| data | date | |
| cliente | text | |
| nf | text | Nº da nota fiscal |
| areas | jsonb | Qtde por área: {"A1":500,"C":300} |
| qtde | integer | Total de cocos |
| total | numeric | Valor total R$ |
| frete | numeric | Valor do frete R$ |
| quebra | integer | Cocos quebrados |
| valor_recebido | numeric | Quanto já recebeu |
| status | text | PAGO ou PENDENTE |
| data_deposito | date | |
| tipo_venda | text | 'coco' ou 'litro' |
| peso_kg | numeric | Peso da carga |
| litragem | numeric | Litros de água |
| v_por_litro | numeric | R$/litro |
| uf_destino | text | |
| cidade_destino | text | |
| qtde_fabrica | integer | Contagem da fábrica |
| fora | integer | Cocos descartados |
| brix | numeric | Grau BRIX |
| placa | text | Placa do caminhão |
| ticket | text | Nº ticket da fábrica |
| nf_complementar | text | NF complementar |
| valor_nf_complementar | numeric | |
| modo_venda | text | contrato/spot/misto |
| litros_contrato | numeric | Litros na cota |
| litros_spot | numeric | Litros fora da cota |
| valor_litro_spot | numeric | R$/litro spot |
| contrato_id | bigint | Ref ao contrato |
| frete_por_ton | numeric | R$/tonelada |

### Tabela `clientes` (antigo clientes_telefone, expandida)
| Coluna | Tipo |
|--------|------|
| id | bigint PK |
| nome | text UNIQUE |
| telefone | text |
| email | text |
| cpf_cnpj | text |
| ie | text |
| uf | text |
| cidade | text |
| endereco | text |
| contato_secundario | text |
| observacoes | text |
| tipo | text (mesa/fabrica) |
| status | text (ativo/inativo) |
| frete_por_ton | numeric |
| distancia_km | integer |

### Tabela `contratos`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | bigint PK | |
| cliente | text | Nome da fábrica |
| ano | integer | |
| descricao | text | |
| cotas | jsonb | {"01":{"litros":40000,"valor_litro":1.80},...} |
| frete_por_ton | numeric | |
| distancia_km | integer | |
| status | text | ativo/encerrado |
| data_inicio | date | |
| data_fim | date | |
| observacoes | text | |

### Tabela `nado_programacao`
| Coluna | Tipo |
|--------|------|
| data | date |
| area | text |
| eito_id | text |
| plantas | integer |
| sugerido | boolean |
| dias_desde | integer |

### Tabela `nado_contagens`
| Coluna | Tipo |
|--------|------|
| id | bigint PK |
| data | date |
| status | text (pendente/confirmado) |

---

## 6. PERSISTÊNCIA (3 camadas)

1. **Memória** (variáveis globais DB, _vendasCache): leitura rápida
2. **localStorage**: cache offline para funcionar sem internet
3. **Supabase**: fonte primária de verdade

**Fluxo de leitura:** Supabase primeiro → salva no localStorage → se falhar, usa localStorage
**Fluxo de escrita:** salva no localStorage imediatamente + sincroniza com Supabase em background
**Regra:** nunca sobrescrever dados locais com dados vazios do Supabase

---

## 7. FÁBRICAS CADASTRADAS (4 clientes)

- MARCOS FALCÃO
- FRYSK
- NECTTARE
- QUALICOCO

---

## 8. O QUE AINDA NÃO TEM (ideias levantadas mas não implementadas)

- **Módulo financeiro completo:** controle de pagamentos à vista/prazo, vencimento, boleto/transferência, alertas de inadimplência, fluxo de caixa
- **Nado Contador:** app separado para contagem de cocos no campo (plano existe mas não foi implementado)
- **Relatórios exportáveis:** PDF ou Excel com dados de produção e vendas
- **Notificações/alertas push:** avisar sobre eitos vencidos, vendas pendentes, cotas acabando
- **Controle de custos:** insumos, mão de obra, diesel, para calcular lucro real
- **Previsão de safra:** estimativa de produção futura baseada em histórico + clima
- **App mobile nativo:** hoje é web responsivo, poderia ter PWA ou app dedicado
- **Integração com balança:** leitura automática de peso na saída da fazenda
- **Dashboard do motorista:** rastreio de entregas
- **Gestão de equipe:** controle de equipes de colheita, produtividade por colhedor

---

## 9. COMO ANALISAR E PROPOR MELHORIAS

Ao revisar este sistema, considere:

1. **UX/Interface:** o que pode ficar mais intuitivo para operadores de campo (celular, sol forte, mãos sujas)?
2. **Dados que já existem mas não são explorados:** quais análises/gráficos poderiam ser adicionados com os dados que já temos?
3. **Automações:** o que o sistema poderia fazer sozinho em vez de depender do operador?
4. **Indicadores de gestão:** quais KPIs faltam para o dono da fazenda tomar decisões melhores?
5. **Financeiro:** como estruturar controle de recebimentos, custos e lucro?
6. **Integrações:** WhatsApp, Excel, NF-e, clima, mercado — o que faz sentido?
7. **Alertas inteligentes:** quais situações deveriam gerar notificações automáticas?
8. **Comparativos:** benchmarks que ajudem a entender se a fazenda está indo bem ou mal

O código é implementado em outro ambiente (Claude Code). O objetivo aqui é **gerar ideias bem estruturadas** que possam ser levadas ao desenvolvedor para implementação.
