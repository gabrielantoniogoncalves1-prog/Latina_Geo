<script setup lang="ts">
const fontes = [
  { item: 'Geometria do mapa (países, costas, rios, lagos, capitais)', origem: 'Natural Earth, escala 1:50m (admin 0 map units, rios e lagos, lugares povoados)', licenca: 'Domínio público', nota: 'Base cartográfica Natural Earth adaptada para visualização interativa em TopoJSON.' },
  { item: 'Projeção', origem: 'Cônica equivalente de Albers (d3-geo)', licenca: 'BSD-3 (biblioteca)', nota: 'Preserva áreas, boa para comparar territórios. A escala gráfica é aproximada.' },
  { item: 'Lista de países e capitais', origem: 'Critério CEPAL/CELAC (33 Estados); nomes oficiais e moedas de referência geral', licenca: 'Compilação autoral', nota: 'Relação organizada segundo o recorte geográfico adotado no atlas.' },
  { item: 'Organizações regionais', origem: 'Sítios oficiais de Mercosul, CAN, Aliança do Pacífico, SICA, CARICOM, CELAC e OEA', licenca: 'Compilação autoral', nota: 'A participação nas organizações corresponde ao recorte apresentado no mapa e pode mudar ao longo do tempo.' },
  { item: 'Linha do tempo', origem: 'Fontes listadas em cada evento (Office of the Historian, National Archives, CIJ, ONU, comissões da verdade, imprensa para 2025–2026)', licenca: 'Textos autorais', nota: 'Imagens históricas licenciadas não foram incluídas: cada evento usa ilustração autoral.' },
  { item: 'Fontes tipográficas', origem: 'Fraunces, Inter e IBM Plex Mono (pacotes @fontsource)', licenca: 'SIL OFL 1.1', nota: 'Empacotadas localmente; funcionam sem internet.' },
]
const pendencias = [
  'Representação cartográfica: o mapa privilegia fronteiras, hidrografia e coordenadas geográficas, sem uma camada de relevo sombreado.',
  'Indicadores econômicos: séries quantitativas de comércio, investimentos e recursos naturais não integram esta versão do atlas.',
  'População e PIB: valores não apresentados nas fichas dos países por ausência de uma série padronizada incorporada ao projeto.',
  'Organizações regionais: a composição e a condição de participação dos países podem variar conforme a data de referência.',
  'Eventos recentes: informações sobre acontecimentos de 2025–2026 estão sujeitas a atualizações e novos desdobramentos.',
]
</script>

<template>
  <section class="container pg">
    <p class="kicker num-mono">04 · Fontes e metodologia</p>
    <h1>De onde vem cada informação</h1>
    <p class="lead">O atlas reúne referências históricas, cartográficas e institucionais. As informações são apresentadas conforme o recorte e os limites metodológicos descritos nesta página.</p>

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

    <h2>Recorte e limitações da pesquisa</h2>
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
