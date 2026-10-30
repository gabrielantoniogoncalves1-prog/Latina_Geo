<script setup lang="ts">
const fontes = [
  { item: 'Geometria do mapa (países, costas, rios, lagos, capitais)', origem: 'Natural Earth, escala 1:50m (admin 0 map units, rios e lagos, lugares povoados)', licenca: 'Domínio público', nota: 'Extraído do repositório nvkelso/natural-earth-vector em 29/10/2026 e convertido para TopoJSON por scripts/build-map.mjs, sem simplificação adicional.' },
  { item: 'Projeção', origem: 'Cônica equivalente de Albers (d3-geo)', licenca: 'BSD-3 (biblioteca)', nota: 'Preserva áreas, boa para comparar territórios. A escala gráfica é aproximada.' },
  { item: 'Lista de países e capitais', origem: 'Critério CEPAL/CELAC (33 Estados); nomes oficiais e moedas de referência geral', licenca: 'Compilação autoral', nota: 'Conferir nos sítios oficiais antes da apresentação.' },
  { item: 'Organizações regionais', origem: 'Sítios oficiais de Mercosul, CAN, Aliança do Pacífico, SICA, CARICOM, CELAC e OEA', licenca: 'Compilação autoral', nota: 'Composição e status (suspensões, saídas) devem ser reverificados.' },
  { item: 'Linha do tempo', origem: 'Fontes listadas em cada evento (Office of the Historian, National Archives, CIJ, ONU, comissões da verdade, imprensa para 2025–2026)', licenca: 'Textos autorais', nota: 'Imagens históricas licenciadas não foram incluídas: cada evento usa ilustração autoral.' },
  { item: 'Fontes tipográficas', origem: 'Fraunces, Inter e IBM Plex Mono (pacotes @fontsource)', licenca: 'SIL OFL 1.1', nota: 'Empacotadas localmente; funcionam sem internet.' },
]
const pendencias = [
  'Relevo sombreado (hillshade): o raster do Natural Earth não pôde ser baixado neste ambiente. O mapa usa águas rasas e graticule no lugar.',
  'Indicadores econômicos (Banco Mundial, UN Comtrade/WITS) e camadas de comércio, exposição e recursos: não carregados. Por isso essas páginas e camadas foram retiradas do escopo e nenhum número é exibido.',
  'População e PIB nas fichas dos países: pendentes da coleta nas bases oficiais.',
  'Composição dos blocos regionais e status da OEA: conferir nos sítios oficiais.',
  'Eventos de 2025–2026: ainda em desenvolvimento; confirmar antes de apresentar.',
]
</script>

<template>
  <section class="container pg">
    <p class="kicker num-mono">04 · Fontes e metodologia</p>
    <h1>De onde vem cada informação</h1>
    <p class="lead">Nada aqui é número inventado. Onde um dado não foi obtido, o atlas diz que está ausente.</p>

    <h2>Catálogo de fontes</h2>
    <div class="rolagem">
      <table>
        <thead><tr><th scope="col">Item</th><th scope="col">Origem</th><th scope="col">Licença</th><th scope="col">Observação</th></tr></thead>
        <tbody>
          <tr v-for="f in fontes" :key="f.item"><th scope="row">{{ f.item }}</th><td>{{ f.origem }}</td><td>{{ f.licenca }}</td><td>{{ f.nota }}</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Metodologia</h2>
    <p>“América Latina e Caribe” corresponde aos 33 Estados da CELAC. Territórios não soberanos aparecem em outro tom. As fronteiras são as atuais, mesmo na linha do tempo, e servem só de referência. Na contagem da camada “Relações geopolíticas”, cada país conta um ponto por evento em que é citado; isso indica presença nos registros, não intensidade de influência. Distinguimos fato documentado, interpretação historiográfica e hipótese; quando há debate, o evento traz uma ressalva.</p>

    <h2>Pendências e limitações</h2>
    <ul class="pend"><li v-for="p in pendencias" :key="p">{{ p }}</li></ul>
  </section>
</template>

<style scoped>
.pg { padding-block: var(--space-7); }
.kicker { margin: 0 0 var(--space-2); font-size: var(--step--1); letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent-text); }
.lead { font-family: var(--font-serif); font-size: var(--step-1); color: var(--ink-2); }
h2 { margin-top: var(--space-7); font-size: var(--step-2); }
.rolagem { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
th, td { padding: 0.7rem 0.8rem; text-align: left; vertical-align: top; border-bottom: var(--rule); }
thead th { font: 500 0.78rem var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-2); border-bottom: var(--rule-strong); }
.pend { max-width: var(--measure); padding-left: 1.2rem; }
.pend li { margin-bottom: var(--space-2); }
</style>
