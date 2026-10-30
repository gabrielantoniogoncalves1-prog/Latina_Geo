# PROMPT — RECRIAÇÃO DO ZERO: TERRITÓRIO & PODER (ATLAS GEOPOLÍTICO DA AMÉRICA LATINA)

> Leia este documento inteiro antes de qualquer ação. Ele **substitui por completo** todas as especificações anteriores (`00` a `07`, `PLANO.md`, etc.). Onde houver conflito, vale este documento.

## 0. Prioridade absoluta

**Qualidade acima de quantidade.** A versão anterior tentou fazer coisas demais e o resultado ficou fraco, principalmente no visual e nos mapas. Este escopo foi propositalmente reduzido. Cada item mantido precisa ficar **bem acabado, bonito, preciso e profissional**. É melhor entregar menos telas excelentes do que muitas telas medianas. Se o tempo apertar, corte profundidade de conteúdo secundário, nunca o acabamento visual nem a correção dos dados.

## 1. Contexto do projeto

- Trabalho escolar de Geografia, 2º ano do curso técnico integrado, seminário “Geopolítica do Poder”, 4º bimestre de 2026. Tema do grupo: **Geopolítica da América Latina**.
- **Pergunta norteadora:** “Em que medida a influência dos EUA contribuiu para moldar as relações políticas, econômicas e geopolíticas da América Latina?”
- O site é um **atlas digital educacional**, autoral e autossuficiente: mapas, gráficos, linha do tempo e análise, com fontes confiáveis. Deve funcionar bem para um professor ou colega navegar sozinho, sem narração.
- Pasta do projeto: `C:\Users\gabri\VS Code\Proj_Geografia`. Trabalhe **somente** dentro dela. Use aspas em caminhos com espaços.

## 2. Primeira ação: apagar a arquitetura atual e recomeçar

1. Confirme que o diretório de trabalho é exatamente a pasta acima. **Nunca** execute comandos destrutivos (`git clean`, `rm -rf`, `Remove-Item -Recurse`) em pastas-pai. Observação: a raiz do repositório Git detectada anteriormente era `C:\Users\gabri`; não toque em nada fora de `Proj_Geografia`.
2. **Apague todo o conteúdo atual da pasta**: `src/`, `public/`, `index.html`, `package.json`, lockfile, `node_modules/`, configs (`vite`, `tsconfig`, `vitest`), os `.md` de especificação antigos (`00`–`07`) e quaisquer restos da arquitetura anterior.
3. **Preservar apenas:** a pasta `.github/` (workflow de deploy no GitHub Pages), a pasta `.git/` se existir, e este arquivo de prompt. Se `.opencode/` ou `.ai-continuacao/` estiverem em uso pelo próprio agente em execução, não os apague, mas não os trate como parte do projeto.
4. Recrie tudo do zero com a arquitetura nova descrita abaixo. Pode reaproveitar **ideias** e **textos** do que existia (ex.: lista dos 20 eventos históricos), mas **nenhum código antigo**.
5. Revise o `deploy.yml` preservado: ajuste ao novo projeto (Node compatível, `npm ci`, typecheck, `vitest run`, build, deploy do `dist`), **remova qualquer passo de Playwright/E2E** e confirme que o `base` do Vite corresponde ao nome do repositório. Não faça `git push` sem confirmar o remoto e sem autorização.

## 3. Escopo FINAL (somente isto — nada além)

Qualquer funcionalidade que não esteja nesta lista **não deve ser criada**. Em especial: **não existe Simulador/jogo, nem estudos de caso, nem podcast/documentário, nem testes E2E, nem documentação extra**.

### 3.1 Fundação
- Cabeçalho com navegação (ver adaptação obrigatória em 3.9), tema claro/escuro persistente, rodapé institucional.
- Rotas em **hash** (`createWebHashHistory(import.meta.env.BASE_URL)`) para funcionar no GitHub Pages; rotas carregadas sob demanda.
- Busca global (atalho `Ctrl+K`, sobreposição) cobrindo países, eventos da linha do tempo, termos do glossário e indicadores.
- Glossário com popovers de definição (hegemonia, soberania, imperialismo, intervenção, autodeterminação, dependência, interdependência, multipolaridade, comércio bilateral, saldo comercial, IED, sanções, integração, geoestratégia, diplomacia, globalização).
- Página de **Fontes e Metodologia** (catálogo central de fontes).
- Acessibilidade avançada (WCAG 2.2 AA): teclado completo, foco visível, contraste verificado nos dois temas, `prefers-reduced-motion`, tabelas alternativas para mapas e gráficos.
- Testes unitários com Vitest (dados, adaptadores, cálculos como HHI e saldo, validações Zod, busca). `README.md` curto (como rodar, build, deploy) — apenas isso.

### 3.2 Página inicial
- Hero com título e **mapa SVG interativo** da América Latina.
- Seção “Quem influencia as decisões de uma região?” (conceitos Poder, Território, Interdependência, com links ao glossário).
- Faixa de 4–6 indicadores oficiais (fonte, ano, unidade, botão `(i)`).
- Prévia do mapa e dos gráficos.
- Dois cards de chamada (ver adaptação em 3.9).
- Conclusão “A América Latina decide seu futuro?” por quatro eixos: herança histórica, estruturas econômicas, autonomia diplomática, nova configuração geopolítica, com interpretação equilibrada (papel documentado dos EUA, diferenças entre países e épocas, protagonismo latino-americano).

### 3.3 Mapa interativo
- Mapa político da América Latina e Caribe, zoom/pan/reset, tela cheia, pesquisa e filtros, exportar PNG, tabela alternativa acessível.
- **Seis camadas** (a antiga “socioeconomia” foi removida):
  1. Panorama político (fronteiras, capitais, soberanos x territórios não soberanos).
  2. Comércio com EUA (exportações, importações, saldo, participação no comércio total).
  3. Exposição e concentração econômica (distinguir interdependência de vulnerabilidade; **sem escore arbitrário**).
  4. Integração regional (Mercosul, Aliança do Pacífico, CELAC, Comunidade Andina, SICA, CARICOM, OEA; composição verificada).
  5. Recursos estratégicos (petróleo, cobre, lítio, gás; separar reservas, produção e exportações).
  6. Relações geopolíticas (intervenções, acordos, sanções, disputas documentadas por data; nunca “amigos/inimigos”).
- Painel lateral do país: bandeira, nome oficial, capital, moeda, população, PIB, resumo histórico, principais exportações, parceiros, organismos regionais, fontes por item. Sempre ano e unidade.
- **Comparar com um 2º país** dentro do painel.

### 3.4 Seis dashboards econômicos (os de estrutura produtiva e comparador regional foram removidos)
1. PIB e crescimento (PIB, crescimento real em gráfico separado, PIB per capita; explicar nominal x real).
2. Comércio bilateral com EUA (exportações, importações, saldo).
3. Principais parceiros comerciais (ranking de destinos/origens; alternar exportações/importações/total).
4. Investimento Estrangeiro Direto (fluxos e % do PIB; não atribuir IED aos EUA sem dado de origem).
5. Concentração / “dependência” (Top 1, Top 3, índice HHI com fórmula e cobertura) + painel educacional “Ter um grande parceiro comercial significa perder soberania?”.
6. Dívida e financiamento externo (dívida externa, serviço da dívida; sem converter correlação em causalidade).

Seletor de país, indicador, período e parceiro, sincronizando só os painéis compatíveis e mostrando claramente dados ausentes ou anos diferentes.

**Recursos obrigatórios em TODO gráfico:** título, subtítulo, unidade, período, legenda, tooltip, botão `(i)` de fonte, tabela acessível, exportar PNG, exportar CSV (quando a licença permitir), botão ampliar, e **texto de interpretação** (o que se observa, por que importa, limites).

### 3.5 Diplomacia e segurança
- Matriz/mapa de organizações regionais (membros, status, datas verificados).
- Painel qualitativo das **quatro formas de influência** (política, econômica, estratégica, cultural), com exemplos e fontes — **sem pontuações inventadas**.
- Seção analítica “A influência estadunidense foi igual em toda a América Latina?” (país, período, regime, localização, estrutura econômica, agência dos Estados latino-americanos).

### 3.6 Linha do tempo (peça de destaque)
- **20 eventos**, de 1820 a 2026, divididos em **5 períodos**: 1820–1899, 1900–1945, 1946–1991, 1992–2009, 2010–2026.
- Lista mínima: independências; Doutrina Monroe (1823); Guerra Mexicano-Americana (1846–48); Guerra Hispano-Americana (1898); Big Stick; independência do Panamá e canal; Boa Vizinhança; criação da OEA (1948); Revolução Cubana (1959); Baía dos Porcos (1961); Crise dos Mísseis (1962); golpe no Chile (1973); conflitos da América Central; crise da dívida dos anos 1980; invasão do Panamá (1989); reorganização pós-Guerra Fria; NAFTA (1994); integração sul-americana; ascensão da China como parceiro comercial; mudanças comerciais e diplomáticas recentes (com data e fonte verificadas).
- Cada evento: data, título, contexto, atores, países, interesses, consequências, relação com os EUA, fontes.
- **Mapa sincronizado** que destaca os países envolvidos no evento selecionado (sem fingir que fronteiras atuais existiam na época; incluir nota).
- **Imagens históricas licenciadas**: somente de domínio público ou com licença livre (ex.: Wikimedia Commons, Library of Congress, arquivos oficiais), com crédito, autor, licença e link. Se não houver imagem legítima para um evento, **não improvise**: use a ilustração gráfica autoral descrita em 5.5.
- *Removidos:* filtros por tema, busca própria da timeline e ligações entre eventos.

### 3.7 Itens removidos (não criar)
Simulador inteiro; 6 estudos de caso; podcast/documentário e estados de mídia; camada de socioeconomia; dashboards de estrutura produtiva e comparador regional; matriz diplomática documentada; módulo SIPRI de segurança; filtros e busca da timeline; ligações entre eventos; testes Playwright; documentação extra (`docs/`).

### 3.8 Rotas sugeridas (hash)
`#/` início · `#/mapa` · `#/indicadores` · `#/diplomacia` · `#/historia` · `#/fontes`. País e filtros compartilháveis por query (ex.: `#/indicadores?pais=MEX&indicador=PIB`).

### 3.9 Adaptações obrigatórias por coerência (o escopo antigo citava o Simulador)
- O cabeçalho não terá a aba “Simulador”. A navegação principal será: **Início, Mapa, Indicadores, Diplomacia, História, Fontes**, mais busca e alternador de tema.
- Os “dois cards” da home passam a ser: **“Investigue o mundo real”** (leva a Mapa/Indicadores) e **“Entenda a história”** (leva à linha do tempo). Não criar nenhum botão que aponte para algo inexistente.
- A conclusão final termina com chamadas para **Fontes e Metodologia** e para voltar ao mapa — sem referência a jogo.
- Em nenhum lugar do site deve restar texto, link ou botão relacionado a Simulador, campanha ou jogo.

## 4. Stack (enxuta)

Vue 3 (Composition API, `<script setup lang="ts">`), TypeScript strict, Vite, Vue Router (hash), Pinia (apenas tema, filtros e país selecionado), **D3** (`d3-geo`, `d3-scale`, `d3-shape`, `d3-array`) + `topojson-client`, Zod, Vitest. Gráficos: ECharts **somente se** for totalmente customizado ao design (ver 5.4); caso contrário, D3/SVG sob medida. CSS com **variáveis de design tokens** (Tailwind é permitido, mas os tokens manda; **sem kits de componentes prontos** com visual genérico). Fontes tipográficas empacotadas localmente (ex.: pacotes `@fontsource`), para funcionar offline e no Pages. Sem backend, login ou serviço pago.

## 5. Direção de arte e design — leia com atenção

### 5.1 Conceito visual
Um **atlas editorial impresso, levado à web**: revista de geografia + atlas de museu + observatório estatístico. Aparência **sóbria, sofisticada, educacional e profissional**. Pense em tipografia cuidadosa, grade modular, filetes finos, muito espaço em branco, hierarquia clara. **Evite** o visual genérico de “template de dashboard”: sem neon, sem gradientes chamativos, sem sombras pesadas, sem emojis, sem cartões idênticos repetidos sem critério, sem ícones decorativos usados como ilustração.

### 5.2 Paleta (ponto de partida — pode refinar, mantendo a direção)
**Modo claro — creme com laranja (papel de atlas):**
- Fundo `#F6EEDD` · superfície `#FBF6EA` · elevado `#FFFDF7` · borda `#DCCDB2`
- Texto `#2B2118` · texto secundário `#6B5B4B`
- Destaque (preenchimentos) `#C4571A` · destaque para **texto/links** `#A8470F` (verifique contraste)
- Apoio para dados: azul-petróleo `#2F6F73`, ocre `#D9A441`, oliva `#6B7A3A`, tijolo `#A33A2B`

**Modo escuro — cinza muito escuro (grafite) com azul:**
- Fundo `#121416` · superfície `#1A1D21` · elevado `#22262B` · borda `#2F353C`
- Texto `#ECEFF2` · texto secundário `#A3ADB8`
- Destaque azul `#6AA7E0` (texto/links) e `#3F82C4` (preenchimentos)
- Apoio para dados: verde-água `#4FB3A9`, âmbar `#E0AE5A`, coral `#E07A6A`

Regras: definir tudo como tokens (`--bg`, `--surface`, `--ink`, `--accent`, escalas categóricas e sequenciais para mapas/gráficos) nos dois temas; **calcular e garantir contraste ≥ 4,5:1 para texto** (e 3:1 para elementos gráficos) em ambos; paletas de mapa **sequenciais e divergentes bem escolhidas**, seguras para daltonismo (ex.: inspiradas em ColorBrewer), nunca arco-íris; nunca depender só de cor (usar rótulos, padrões ou valores).

### 5.3 Tipografia
- **Títulos:** serifada editorial de boa qualidade (ex.: *Fraunces*, *Newsreader* ou *Source Serif 4*).
- **Corpo e interface:** sans-serif legível (ex.: *Inter* ou *Source Sans 3*).
- **Números, legendas técnicas e coordenadas:** *IBM Plex Mono* (ou equivalente tabular).
- Escala tipográfica definida em tokens, linhas de 60–75 caracteres no texto corrido, numerais tabulares nos gráficos.

### 5.4 Gráficos tratados como infografia de qualidade
- Nada de gráfico “padrão de biblioteca”. Eixos precisos, grade sutil, **rótulos diretos nas séries** quando possível (em vez de legendas distantes), **anotações de eventos-chave** sobre as séries temporais (ex.: crise da dívida de 1982, NAFTA 1994, 2008), tooltips refinados, sem 3D, sem eixos truncados enganosos, sem casas decimais excessivas.
- Cada gráfico tem cabeçalho editorial (título forte + subtítulo explicativo + unidade), nota de fonte no rodapé e o botão `(i)`.
- Responsivo de verdade: no celular, reorganizar (não apenas encolher).
- Destruir instâncias e listeners ao desmontar.

### 5.5 Ilustração e arte gráfica (não usar ícones/desenhos improvisados)
- **Proibido** resolver identidade visual com ícones soltos de biblioteca ou desenhos mal feitos. Ícones só para **ações de interface** (buscar, fechar, tema, exportar), todos de um **único conjunto consistente**.
- Toda ilustração é **autoral e vetorial (SVG), desenhada com critério**, em estilo coerente (ex.: gravura/linha fina monocromática em tinta e destaque de cor, ou formas geométricas editoriais). Isso inclui: logotipo do projeto, ornamentos de cartografia (rosa dos ventos, escala gráfica, moldura do mapa, selos de período), cabeçalhos de seção, capas dos períodos da linha do tempo e ilustrações dos eventos sem imagem histórica licenciada.
- Capriche em detalhes de design gráfico: grid, alinhamentos, ritmo vertical, filetes, numeração de seções, legendas no estilo de atlas.

### 5.6 Mapas — exigência central (realistas, detalhados, bem construídos)
O mapa da América Latina deve parecer o de um **bom atlas escolar/profissional**, não um esboço. Requisitos:

- **Dados geográficos:** Natural Earth (domínio público) em **escala 1:50m ou 1:10m** (países, unidades administrativas necessárias, linhas de costa, lagos, rios principais), convertidos para TopoJSON e **simplificados com critério** (ex.: `mapshaper`) mantendo ilhas do Caribe, a Terra do Fogo e fronteiras reconhecíveis. Registrar versão, licença e data da extração.
- **Cobertura:** do México à Patagônia, mais **Caribe completo**, com os EUA (e demais vizinhos) como **contexto em tom neutro**, já que o tema é a influência dos EUA. Definir explicitamente, no site, o critério de “América Latina e Caribe” (ex.: lista de 33 países da CEPAL/CELAC) e distinguir **países soberanos** de **territórios não soberanos** (ex.: Porto Rico, Guadalupe, Martinica).
- **Projeção adequada** (ex.: cônica equivalente/Albers ou azimutal equivalente centrada na região) e **inset** para pequenas ilhas do Caribe quando necessário.
- **Realismo visual:** oceano com tratamento sutil (ex.: batimetria leve ou tom gradativo), **relevo sombreado discreto** (hillshade/Natural Earth Shaded Relief, domínio público, comprimido em WebP e carregado sob demanda) sob as camadas vetoriais, graticule (paralelos/meridianos) delicada, rios e lagos principais, linhas de costa nítidas, fronteiras com espessura hierárquica.
- **Rotulagem de atlas:** nomes de países, capitais, oceanos e mares (Atlântico, Pacífico, Mar do Caribe, Golfo do México), com **tamanhos variáveis conforme o zoom** e **evitando colisões**; escala gráfica, indicador de norte, fonte e projeção no rodapé do mapa.
- **Nível de detalhe por zoom** (mais rótulos e detalhe ao aproximar), pan/zoom suave, seleção por clique, toque **e teclado**, destaque de fronteira, tooltips, legenda dinâmica para cada camada, painel lateral e drawers no mobile.
- **Honestidade cartográfica:** tratar disputas (ex.: Malvinas/Falklands, Essequibo) de forma documentada com nota explícita; não inventar fronteiras; na linha do tempo, avisar que o mapa usa fronteiras atuais como referência.
- **Desempenho:** SVG para a camada interativa com geometria simplificada; imagem de relevo como raster leve; evitar travar em zoom/pan; mapa da home com versão enxuta.
- **Verificação obrigatória:** gere capturas de tela do mapa em desktop e mobile, nos dois temas, e **inspecione-as** (países ausentes, ilhas cortadas, rótulos sobrepostos, buracos, cores ruins). Corrija até ficar com aspecto profissional.

### 5.7 Linha do tempo como peça gráfica
- Desenhada como **infográfico editorial em SVG/CSS sob medida**: eixo horizontal no desktop (vertical no mobile), **faixas coloridas por período**, marcações por década, marcadores de evento com hierarquia tipográfica, transições suaves entre eventos, índice de períodos, botões próximo/anterior, navegação por teclado.
- Ao selecionar um evento: cartão detalhado (data, contexto, atores, interesses, consequências, relação com os EUA, fontes), mapa sincronizado ao lado e imagem/ilustração.
- Deve parecer uma peça de design de museu/revista, não uma lista de cartões.

### 5.8 Movimento e experiência
Microanimações discretas de 150–300 ms (entradas, hover, transições de mapa e timeline), respeitando `prefers-reduced-motion`. Estados de loading (skeleton), vazio e erro bem desenhados. Layout responsivo cuidadoso em 360 px, 768 px, 1280 px e telas largas.

## 6. Dados, fontes e integridade (inegociável)

- **Somente dados reais e verificados.** Nunca invente número, ano, citação, fonte, tratado, intervenção ou “nível de influência”. Se um dado não puder ser obtido, mostre “Sem dados disponíveis” e documente a pendência — **não preencha com valores plausíveis**.
- Fontes prioritárias: Banco Mundial (API v2), CEPAL/CEPALSTAT, UN Comtrade e/ou WITS (comércio bilateral e parceiros), OEA, ONU, PNUD. Para recursos estratégicos, usar fontes oficiais (ex.: USGS Mineral Commodity Summaries, EIA, Energy Institute) e separar reservas, produção e exportações. Para história: documentos primários, arquivos oficiais, artigos revisados por pares e universidades.
- Indicadores do Banco Mundial a considerar (**confirme cada código na API antes de usar**): `NY.GDP.MKTP.CD`, `NY.GDP.MKTP.KD.ZG`, `NY.GDP.PCAP.CD`, `SP.POP.TOTL`, `BX.KLT.DINV.CD.WD`, `BX.KLT.DINV.WD.GD.ZS`, `DT.DOD.DECT.CD`, `DT.TDS.DECT.EX.ZS`, `NE.TRD.GNFS.ZS`.
- Crie um **script de coleta** (`scripts/`) que baixa, valida (Zod) e grava **snapshots JSON** em `public/data/` com metadados: `id`, título, instituição, dataset, código do indicador, URL oficial, unidade, período, cobertura, **data real da extração**, metodologia, transformações, limitações, licença. O site lê esses snapshots (funciona offline).
- Se o agente **não tiver acesso à internet** para coletar, **diga isso explicitamente**, entregue o pipeline e a interface funcionando com estados vazios honestos, e liste exatamente quais dados faltam. Não finja que coletou.
- **Botão `(i)` (`SourceInfoButton`)** em todo cartão/gráfico/mapa quantitativo: definição, interpretação, instituição, dataset/código, URL oficial, território, período, unidade, método, limitações, data de verificação.
- Cuidados conceituais: concentração comercial **não prova** perda de soberania; IED recebido **não indica** investidor dos EUA sem dado de origem; comparar apenas mesma unidade/indicador/período; não somar bens e serviços sem explicar; HHI exige cobertura completa dos parceiros (explicar fórmula e cobertura); influência dos EUA variou por país e época; não afirmar causalidade a partir de correlação. Diferenciar fato, interpretação historiográfica e hipótese.
- Imagens, mapas e dados: registrar licença e crédito de cada item na página de Fontes.

## 7. Estrutura de pastas sugerida (enxuta)

```text
Proj_Geografia/
├── .github/workflows/deploy.yml        (preservado e ajustado)
├── scripts/                            (coleta e validação de dados)
├── public/{data,maps,images}/
├── src/
│   ├── main.ts · App.vue
│   ├── router/ · layouts/ · styles/ (tokens, tipografia, temas)
│   ├── components/{ui,charts,maps,timeline,sources,art}/
│   ├── views/ (Home, Mapa, Indicadores, Diplomacia, Historia, Fontes)
│   ├── data/ (timeline, glossário, organizações, catálogo de fontes)
│   ├── services/ · composables/ · stores/ · types/
├── tests/unit/
├── index.html · package.json · vite.config.ts · tsconfig*.json · README.md
```

Crie apenas arquivos com função real.

## 8. Ordem de trabalho (com portões de qualidade)

1. Apagar a arquitetura atual (seção 2) e inicializar o projeto novo.
2. **Design system primeiro:** tokens, temas claro/escuro, tipografia, componentes-base, kit de ilustração SVG (logotipo, ornamentos). Gere capturas e valide a identidade visual **antes** de construir as telas.
3. **Mapa-base**: dados Natural Earth, projeção, relevo, rotulagem, zoom. **Portão:** capturas inspecionadas e aprovadas.
4. Pipeline de dados, catálogo de fontes e `SourceInfoButton`.
5. Mapa interativo com as 6 camadas, painel de país e comparação.
6. Os 6 dashboards com todos os recursos de gráfico.
7. Diplomacia e segurança (organizações, formas de influência, análise).
8. Linha do tempo (20 eventos, 5 períodos, mapa sincronizado, imagens/ilustrações).
9. Home, glossário, busca global, Fontes e Metodologia, conclusão.
10. Acessibilidade, responsividade, contraste, `reduced-motion`; revisão visual final em ambos os temas e em mobile.
11. Typecheck, Vitest, build; teste do `base` do Vite com caminho de repositório e rotas em hash; conferência do deploy.

Em cada etapa visual, **gere e examine capturas de tela**. Se algo estiver feio, corrija antes de seguir.

## 9. Critérios de aceite

- [ ] Arquitetura antiga removida; apenas `.github/` (e `.git/`) preservados; projeto recriado do zero.
- [ ] Nada fora do escopo da seção 3; nenhuma menção a Simulador/jogo/estudos de caso/podcast.
- [ ] Visual coeso: creme/laranja no claro, grafite/azul no escuro; tipografia editorial; contraste verificado.
- [ ] Mapa realista e detalhado (relevo, costas, rios/lagos, rótulos sem colisão, Caribe completo, inset quando necessário, escala/norte), validado por capturas.
- [ ] Linha do tempo como peça gráfica, 20 eventos, 5 períodos, mapa sincronizado, imagens legítimas ou ilustrações autorais.
- [ ] 6 dashboards com todos os recursos (título, subtítulo, unidade, `(i)`, tabela, PNG, CSV, ampliar, interpretação).
- [ ] Dados reais com metadados e datas de extração; ausências sinalizadas; nada inventado.
- [ ] Busca global, glossário, Fontes e Metodologia funcionando.
- [ ] Sem botões inertes, sem links quebrados, sem 404 de assets, sem erros críticos no console.
- [ ] Acessibilidade (teclado, foco, tabelas alternativas, reduced-motion) e responsividade verificadas.
- [ ] `npm ci`, `npm run typecheck`, `npm run test`, `npm run build` executados de fato; deploy workflow ajustado.

## 10. Como reportar ao final

Informe, por item: **Concluído / Parcial / Não implementado**; comandos executados e resultados **reais**; árvore de arquivos; fontes e anos-base; dados pendentes (se houver); limitações. Anexe/descreva as capturas de tela revisadas. **Não declare concluído o que não foi implementado e testado.** Não alegue deploy antes do host confirmar. Não faça push sem confirmar o remoto e sem autorização.
