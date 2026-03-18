# Neofrut — Sistema de Controle de Colheita de Coco Verde

## O que é
Sistema web para fazenda de coco verde (120 hectares, 100 em produção).
Substitui planilhas Excel de campo para controle de colheita e vendas.
Espaçamento de plantio: triângulo equilátero 7,5m x 7,5m x 7,5m.

## Estrutura de arquivos
```
index.html   → HTML (estrutura das páginas e modais)
styles.css   → CSS (estilos, variáveis de tema)
app.js       → JavaScript (toda a lógica — ~3800 linhas)
```

## Regras de negócio

### Eitos e áreas
- A fazenda é dividida em **áreas** (talhões): AREA A1, AREA A2, AREA C, AREA D, MARACUJÁ, MAMÃO DE CIMA, MAMÃO DE BAIXO
- **ATENÇÃO**: MARACUJÁ e MAMÃO são nomes de talhões/áreas, NÃO são frutas. O produto é exclusivamente **coco verde**
- Cada área tem **eitos**. Um eito = 2 linhas de coqueiro (ex: eito "01/02" = linhas 1 e 2)
- Colheita e contagem são feitas **por eito**

### Ciclo de colheita (21 dias)
- Ciclo ideal: colher o mesmo coqueiro a cada 21 dias
- O coqueiro lança um novo cacho a cada ~21 dias; do lançamento à colheita leva ~6 meses
- Semáforo de status por dias desde a última colheita:
  - **VERDE**: 1–14 dias (ok)
  - **AMARELO**: 15–20 dias (atenção)
  - **VERMELHO**: 21+ dias (atrasado, precisa colher)

### Classificação da colheita
- **Mesa**: coco de qualidade para venda direta
- **Fábrica**: coco para industrialização

## Tecnologias
- HTML/CSS/JS vanilla (sem framework)
- Supabase (PostgreSQL + Auth) como banco de dados principal
- localStorage como cache offline
- Hospedagem: GitHub Pages

## Tabelas Supabase
- `eitos`: area, eito_id, plantas
- `colheitas`: area, eito_id, data, total, mesa, fabrica
- `vendas`: id, data, cliente, nf, areas, qtde, total, frete, valor_recebido, status, data_deposito, tipo_venda, peso_kg, litragem, v_por_litro
- `clientes_telefone`: nome, telefone, updated_at

## Persistência (3 camadas)
1. **Memória** (DB, _vendasCache): leitura rápida
2. **localStorage**: cache offline para funcionar sem internet
3. **Supabase**: fonte primária de verdade

### Fluxo de dados
- **Leitura**: Supabase primeiro → salva no localStorage → se falhar, usa localStorage
- **Escrita**: salva no localStorage imediatamente + sincroniza com Supabase em background
- Nunca sobrescrever dados locais com dados vazios do Supabase

## Páginas/Módulos
- **PAINEL GERAL**: dashboard com status dos eitos e projeções
- **ANÁLISE**: produtividade por eito, comparativo semanal
- **LANÇAMENTO**: registro de colheita do dia
- **VENDAS**: registro de vendas, ranking de clientes, pendências
- **GESTÃO**: cadastro de áreas, eitos e plantas
- **MERCADOS**: inteligência comercial (clima, sazonalidade, oportunidades)

## Hospedagem e testes
- **Produção**: GitHub Pages (push para main deploya automaticamente)
- **Teste local**: abrir index.html via extensão Live Server do VS Code, ou instalar Node.js e rodar `npx lite-server`
- **URL produção**: https://victorpaimferrario.github.io/neofrut/

## Convenções
- Variáveis globais: DB (colheitas), _vendasCache (vendas), _SB (cliente Supabase)
- Storage keys: 'fazenda_paim_v1' (colheitas), 'neofrut_vendas_v1' (vendas)
- Funções render*() atualizam a UI, salvar*() persistem dados
- Datas em formato ISO (YYYY-MM-DD)
