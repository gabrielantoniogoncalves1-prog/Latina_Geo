<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MapaBase from '@/components/maps/MapaBase.vue'
import { useMapaStore, type Camada } from '@/stores/mapa'
import { PAISES, PAIS_POR_ID, SOBERANOS, nomeDe } from '@/data/paises'
import { BLOCOS, BLOCO_POR_ID, blocosDe } from '@/data/blocos'
import { EVENTOS, PERIODOS, eventosDoPais } from '@/data/timeline'
import { VISTAS } from '@/composables/useLatamMap'

const store = useMapaStore()
const route = useRoute()
const router = useRouter()
const mapaRef = ref<InstanceType<typeof MapaBase> | null>(null)
const busca = ref('')

const CAMADAS: { id: Camada; nome: string; texto: string }[] = [
  { id: 'politico', nome: 'Panorama político', texto: 'Países soberanos, territórios não soberanos e capitais. É a base de todas as outras camadas.' },
  { id: 'blocos', nome: 'Integração regional', texto: 'Quem participa de cada organização regional. Veja um bloco por vez ou a sobreposição de todos.' },
  { id: 'eventos', nome: 'Relações geopolíticas', texto: 'Quantos dos 20 eventos da linha do tempo envolvem cada país. Mostra onde há mais registros, não "quem é aliado ou inimigo".' },
]

// ---------- preenchimento por camada ----------
const contagemEventos = computed(() => {
  const m: Record<string, number> = {}
  for (const e of EVENTOS) {
    if (store.periodo && e.periodo !== store.periodo) continue
    for (const id of e.paises) m[id] = (m[id] ?? 0) + 1
  }
  return m
})
const maxEventos = computed(() => Math.max(1, ...SOBERANOS.concat(PAISES.filter((p) => p.tipo === 'dep')).map((p) => contagemEventos.value[p.id] ?? 0)))
const SEQ = ['var(--seq-1)', 'var(--seq-2)', 'var(--seq-3)', 'var(--seq-4)', 'var(--seq-5)', 'var(--seq-6)', 'var(--seq-7)']
function classeEventos(n: number) {
  if (n <= 0) return -1
  return Math.min(6, Math.ceil((n / maxEventos.value) * 7) - 1)
}
const nBlocos = computed(() => {
  const m: Record<string, number> = {}
  for (const b of BLOCOS) for (const id of b.membros) m[id] = (m[id] ?? 0) + 1
  return m
})

const fills = computed<Record<string, string>>(() => {
  const f: Record<string, string> = {}
  if (store.camada === 'blocos') {
    for (const p of PAISES) {
      if (p.tipo === 'ctx') continue
      if (store.bloco === 'todos') {
        const n = nBlocos.value[p.id] ?? 0
        f[p.id] = n ? SEQ[Math.min(6, n)] : 'var(--map-nodata)'
      } else {
        const b = BLOCO_POR_ID.get(store.bloco)
        f[p.id] = b?.membros.includes(p.id) ? 'var(--cat-1)' : 'var(--map-nodata)'
      }
    }
    // Estados dependentes: só entram se forem membros (Montserrat)
  } else if (store.camada === 'eventos') {
    for (const p of PAISES) {
      if (p.tipo === 'ctx') continue
      const c = classeEventos(contagemEventos.value[p.id] ?? 0)
      f[p.id] = c < 0 ? 'var(--map-nodata)' : SEQ[c]
    }
  }
  return f
})

const legenda = computed(() => {
  if (store.camada === 'politico') {
    return {
      titulo: 'Situação política',
      itens: [
        { cor: 'var(--map-land)', rotulo: 'Estado soberano (33 países)' },
        { cor: 'var(--map-nonsovereign)', rotulo: 'Território não soberano' },
        { cor: 'var(--map-context)', rotulo: 'Contexto (EUA, Canadá)' },
      ],
    }
  }
  if (store.camada === 'blocos') {
    if (store.bloco === 'todos') {
      return { titulo: 'Número de organizações das quais o país participa (entre 7)', itens: [{ cor: 'var(--map-nodata)', rotulo: '0' }, ...[1, 2, 3, 4, 5, 6].map((n) => ({ cor: SEQ[n], rotulo: String(n) }))] }
    }
    return { titulo: BLOCO_POR_ID.get(store.bloco)?.sigla ?? '', itens: [{ cor: 'var(--cat-1)', rotulo: 'Membro' }, { cor: 'var(--map-nodata)', rotulo: 'Não membro' }] }
  }
  const max = maxEventos.value
  const passos = [1, 2, 3, 4, 5, 6, 7].map((i) => ({ cor: SEQ[i - 1], de: Math.floor(((i - 1) * max) / 7) + 1, ate: Math.floor((i * max) / 7) }))
  return {
    titulo: store.periodo ? `Eventos no período ${store.periodo} (de ${max} no máximo)` : 'Eventos da linha do tempo (de 20)',
    itens: [{ cor: 'var(--map-nodata)', rotulo: '0' }, ...passos.filter((p, i) => i === 0 || p.ate >= p.de).map((p) => ({ cor: p.cor, rotulo: p.de === p.ate ? String(p.de) : `${p.de}–${p.ate}` }))],
  }
})

// ---------- seleção ----------
const pais = computed(() => (store.paisId ? PAIS_POR_ID.get(store.paisId) ?? null : null))
const outro = computed(() => (store.comparaId ? PAIS_POR_ID.get(store.comparaId) ?? null : null))
function infoPais(id: string) {
  const p = PAIS_POR_ID.get(id)!
  return { p, blocos: blocosDe(id), eventos: eventosDoPais(id) }
}
const info = computed(() => (pais.value ? infoPais(pais.value.id) : null))
const infoOutro = computed(() => (outro.value ? infoPais(outro.value.id) : null))
const opcoesComparar = computed(() => SOBERANOS.filter((p) => p.id !== store.paisId))

function escolher(id: string | null) {
  store.paisId = id
  store.comparaId = null
  if (id) mapaRef.value?.zoomToIds([id])
}
function norm(s: string) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() }
const resultados = computed(() => {
  const q = norm(busca.value.trim())
  if (!q) return []
  return PAISES.filter((p) => p.tipo !== 'ctx' && (norm(p.nome).includes(q) || norm(p.capital ?? '').includes(q))).slice(0, 6)
})
function irPara(id: string) { busca.value = ''; escolher(id) }
function submitBusca() { if (resultados.value[0]) irPara(resultados.value[0].id) }

// ---------- URL compartilhável ----------
const CAMADAS_IDS = CAMADAS.map((c) => c.id)
onMounted(() => {
  const q = route.query
  if (typeof q.camada === 'string' && CAMADAS_IDS.includes(q.camada as Camada)) store.camada = q.camada as Camada
  if (typeof q.bloco === 'string' && (q.bloco === 'todos' || BLOCO_POR_ID.has(q.bloco))) store.bloco = q.bloco
  if (typeof q.periodo === 'string' && +q.periodo >= 0 && +q.periodo <= 5) store.periodo = +q.periodo
  if (typeof q.pais === 'string' && PAIS_POR_ID.has(q.pais.toUpperCase())) {
    store.paisId = q.pais.toUpperCase()
    setTimeout(() => mapaRef.value?.zoomToIds([store.paisId!]), 700)
  }
  if (typeof q.com === 'string' && PAIS_POR_ID.has(q.com.toUpperCase())) store.comparaId = q.com.toUpperCase()
})
watch(
  () => [store.camada, store.bloco, store.periodo, store.paisId, store.comparaId],
  () => {
    const query: Record<string, string> = {}
    if (store.camada !== 'politico') query.camada = store.camada
    if (store.camada === 'blocos' && store.bloco !== 'todos') query.bloco = store.bloco
    if (store.camada === 'eventos' && store.periodo) query.periodo = String(store.periodo)
    if (store.paisId) query.pais = store.paisId
    if (store.comparaId) query.com = store.comparaId
    router.replace({ path: '/mapa', query })
  },
)

const camadaAtual = computed(() => CAMADAS.find((c) => c.id === store.camada)!)
const blocoAtual = computed(() => BLOCO_POR_ID.get(store.bloco) ?? null)
const tabela = computed(() => PAISES.filter((p) => p.tipo !== 'ctx').map((p) => ({ ...p, blocos: blocosDe(p.id).map((b) => b.sigla).join(', '), n: eventosDoPais(p.id).length })))
</script>

<template>
  <section class="container topo">
    <p class="kicker num-mono">02 · Mapa interativo</p>
    <h1>O mapa da região</h1>
    <p class="lead">Explore o México, a América Central, o Caribe e a América do Sul. Escolha uma camada, aproxime e clique em um país para abrir sua ficha.</p>
  </section>

  <section class="container ferramentas" aria-label="Controles do mapa">
    <div class="tabs" role="tablist" aria-label="Camadas do mapa">
      <button
        v-for="c in CAMADAS"
        :id="'tab-' + c.id"
        :key="c.id"
        type="button"
        role="tab"
        class="tab"
        :aria-selected="store.camada === c.id"
        :tabindex="store.camada === c.id ? 0 : -1"
        @click="store.camada = c.id"
      >{{ c.nome }}</button>
    </div>

    <div class="filtros">
      <label v-if="store.camada === 'blocos'" class="campo">
        <span>Organização</span>
        <select v-model="store.bloco">
          <option value="todos">Sobreposição de todas</option>
          <option v-for="b in BLOCOS" :key="b.id" :value="b.id">{{ b.sigla }}</option>
        </select>
      </label>
      <label v-if="store.camada === 'eventos'" class="campo">
        <span>Período</span>
        <select v-model.number="store.periodo">
          <option :value="0">Todos (1820–2026)</option>
          <option v-for="p in PERIODOS" :key="p.id" :value="p.id">{{ p.inicio }}–{{ p.fim }}</option>
        </select>
      </label>
      <div class="busca">
        <label class="campo">
          <span>Buscar país ou capital</span>
          <input v-model="busca" type="search" autocomplete="off" placeholder="Ex.: Chile, Bogotá" @keydown.enter.prevent="submitBusca" />
        </label>
        <ul v-if="resultados.length" class="resultados" role="listbox" aria-label="Resultados da busca">
          <li v-for="r in resultados" :key="r.id" role="option" :aria-selected="false">
            <button type="button" @click="irPara(r.id)">{{ r.nome }} <small v-if="r.capital">{{ r.capital }}</small><small v-else>{{ r.administracao }}</small></button>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="container palco">
    <div class="coluna-mapa">
      <div class="vistas" role="group" aria-label="Enquadramentos rápidos">
        <button v-for="v in VISTAS" :key="v.id" type="button" class="chip" @click="mapaRef?.zoomToVista(v.id)">{{ v.nome }}</button>
      </div>
      <MapaBase ref="mapaRef" :fills="fills" :selected-id="store.paisId" @select="escolher" />
      <div class="legenda-dinamica" aria-live="polite">
        <p class="leg-titulo">{{ legenda.titulo }}</p>
        <ul>
          <li v-for="(i, idx) in legenda.itens" :key="idx"><span class="amostra" :style="{ background: i.cor }"></span>{{ i.rotulo }}</li>
        </ul>
      </div>
      <p class="nota-mapa">
        Fronteiras atuais, de referência (Natural Earth 1:50m, domínio público). Nas Malvinas/Falkland há disputa de soberania entre Argentina e Reino Unido; o Essequibo é reivindicado pela Venezuela e administrado pela Guiana. O mapa mostra a situação de fato e não toma posição.
      </p>
    </div>

    <aside class="painel" aria-label="Painel do país" aria-live="polite">
      <template v-if="pais && info">
        <header class="p-cab">
          <p class="kicker num-mono">{{ pais.tipo === 'sov' ? 'Estado soberano' : pais.tipo === 'dep' ? 'Território não soberano' : 'Contexto' }}</p>
          <h2>{{ pais.nome }}</h2>
          <button type="button" class="fechar" aria-label="Fechar painel do país" @click="escolher(null)">×</button>
        </header>

        <div class="cmp-wrap">
          <label class="campo">
            <span>Comparar com</span>
            <select v-model="store.comparaId">
              <option :value="null">Nenhum</option>
              <option v-for="o in opcoesComparar" :key="o.id" :value="o.id">{{ o.nome }}</option>
            </select>
          </label>
        </div>

        <table class="ficha">
          <thead v-if="outro"><tr><th scope="col"><span class="sr-only">Campo</span></th><th scope="col">{{ pais.nome }}</th><th scope="col">{{ outro.nome }}</th></tr></thead>
          <tbody>
            <tr v-if="pais.oficial || outro?.oficial"><th scope="row">Nome oficial</th><td>{{ pais.oficial ?? '—' }}</td><td v-if="outro">{{ outro.oficial ?? '—' }}</td></tr>
            <tr v-if="pais.capital || outro?.capital"><th scope="row">Capital</th><td>{{ pais.capital ?? '—' }}</td><td v-if="outro">{{ outro.capital ?? '—' }}</td></tr>
            <tr v-if="pais.moeda || outro?.moeda"><th scope="row">Moeda</th><td>{{ pais.moeda ?? '—' }}</td><td v-if="outro">{{ outro.moeda ?? '—' }}</td></tr>
            <tr v-if="pais.administracao || outro?.administracao"><th scope="row">Administração</th><td>{{ pais.administracao ?? '—' }}</td><td v-if="outro">{{ outro.administracao ?? '—' }}</td></tr>
            <tr>
              <th scope="row">Organizações</th>
              <td>{{ info.blocos.map((b) => b.sigla).join(', ') || '—' }}</td>
              <td v-if="infoOutro">{{ infoOutro.blocos.map((b) => b.sigla).join(', ') || '—' }}</td>
            </tr>
            <tr>
              <th scope="row">Eventos na linha do tempo</th>
              <td class="num">{{ info.eventos.length }}</td>
              <td v-if="infoOutro" class="num">{{ infoOutro.eventos.length }}</td>
            </tr>
          </tbody>
        </table>

        <p v-if="pais.nota" class="aviso">{{ pais.nota }}</p>
        <ul v-if="info.blocos.some((b) => b.status?.[pais!.id])" class="status">
          <li v-for="b in info.blocos.filter((x) => x.status?.[pais!.id])" :key="b.id"><strong>{{ b.sigla }}:</strong> {{ b.status![pais!.id] }}</li>
        </ul>

        <h3 class="sub">Na linha do tempo</h3>
        <ul v-if="info.eventos.length" class="eventos">
          <li v-for="e in info.eventos" :key="e.id">
            <RouterLink :to="{ path: '/historia', query: { evento: e.id } }"><span class="num-mono ano">{{ e.ano }}</span> {{ e.titulo }}</RouterLink>
          </li>
        </ul>
        <p v-else class="vazio">Nenhum dos 20 eventos selecionados envolve diretamente este território.</p>
        <p class="rodape-ficha">Dados cadastrais de referência. População, PIB e comércio exigem a coleta nas bases oficiais e ainda não foram carregados: preferimos mostrar “sem dados” a inventar números.</p>
      </template>

      <template v-else>
        <p class="kicker num-mono">{{ camadaAtual.nome }}</p>
        <h2>Como ler esta camada</h2>
        <p>{{ camadaAtual.texto }}</p>
        <template v-if="store.camada === 'blocos' && blocoAtual">
          <h3 class="sub">{{ blocoAtual.nome }}</h3>
          <p>{{ blocoAtual.descricao }}</p>
          <ul class="status" v-if="blocoAtual.status"><li v-for="(txt, id) in blocoAtual.status" :key="id"><strong>{{ nomeDe(String(id)) }}:</strong> {{ txt }}</li></ul>
          <p class="num-mono mini">{{ blocoAtual.membros.length }} membros · {{ blocoAtual.site }}</p>
        </template>
        <h3 class="sub">Critério usado</h3>
        <p>Consideramos “América Latina e Caribe” os 33 Estados da CELAC/CEPAL. Territórios não soberanos aparecem em tom diferente. Os EUA e o Canadá são só contexto.</p>
        <p class="vazio">Clique em um país do mapa, ou busque pelo nome, para ver a ficha.</p>
      </template>
    </aside>
  </section>

  <section class="container tabela-alt">
    <details>
      <summary>Tabela alternativa dos dados do mapa</summary>
      <div class="rolagem">
        <table>
          <caption class="sr-only">Países e territórios do mapa, com capital, situação, organizações e número de eventos na linha do tempo</caption>
          <thead><tr><th scope="col">País ou território</th><th scope="col">Situação</th><th scope="col">Capital</th><th scope="col">Organizações</th><th scope="col">Eventos</th></tr></thead>
          <tbody>
            <tr v-for="r in tabela" :key="r.id">
              <th scope="row">{{ r.nome }}</th>
              <td>{{ r.tipo === 'sov' ? 'Soberano' : 'Não soberano' }}</td>
              <td>{{ r.capital ?? '—' }}</td>
              <td>{{ r.blocos || '—' }}</td>
              <td class="num">{{ r.n }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  </section>
</template>

<style scoped>
.topo { padding-block: var(--space-5) var(--space-4); display: grid; gap: 0 var(--space-6); grid-template-columns: auto 1fr; align-items: end; }
.kicker { margin: 0 0 var(--space-2); font-size: var(--step--1); letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent-text); }
.topo .kicker { grid-column: 1 / -1; }
.topo h1 { font-size: var(--step-3); margin: 0; white-space: nowrap; }
.lead { margin: 0; font-family: var(--font-serif); font-size: var(--step-0); color: var(--ink-2); max-width: 58ch; }
@media (max-width: 52rem) { .topo { grid-template-columns: 1fr; gap: var(--space-2); } .topo h1 { white-space: normal; } }

.ferramentas { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: var(--space-4); padding-bottom: var(--space-4); border-bottom: var(--rule); }
.tabs { display: flex; flex-wrap: wrap; gap: 0; border: var(--rule-strong); border-radius: var(--radius-2); overflow: hidden; }
.tab { padding: var(--space-2) var(--space-4); font: 500 0.95rem var(--font-sans); color: var(--ink-2); background: transparent; border: 0; border-right: var(--rule-strong); cursor: pointer; transition: background-color var(--dur-1) var(--ease), color var(--dur-1) var(--ease); }
.tab:last-child { border-right: 0; }
.tab:hover { background: var(--surface); color: var(--ink); }
.tab[aria-selected='true'] { background: var(--accent-btn); color: var(--on-accent); }
.filtros { display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: end; }
.campo { display: grid; gap: 4px; font-size: var(--step--1); color: var(--ink-2); }
.campo span { font-weight: 500; }
select, input[type='search'] { min-width: 12rem; padding: 0.5rem 0.7rem; font: inherit; font-size: 0.95rem; color: var(--ink); background: var(--elevated); border: var(--rule-strong); border-radius: var(--radius-2); }
.busca { position: relative; }
.resultados { position: absolute; z-index: 10; top: 100%; left: 0; right: 0; margin: 2px 0 0; padding: 0; list-style: none; background: var(--elevated); border: var(--rule-strong); border-radius: var(--radius-2); }
.resultados button { display: flex; justify-content: space-between; gap: var(--space-3); width: 100%; padding: 0.5rem 0.7rem; font: inherit; font-size: 0.92rem; color: var(--ink); text-align: left; background: transparent; border: 0; cursor: pointer; }
.resultados button:hover, .resultados button:focus-visible { background: var(--surface); }
.resultados small { color: var(--ink-3); }

.palco { display: grid; grid-template-columns: minmax(0, 1fr) 23rem; gap: var(--space-6); align-items: start; padding-block: var(--space-5) var(--space-6); }
.vistas { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3); }
.chip { padding: 0.3rem 0.8rem; font: 500 0.85rem var(--font-sans); color: var(--ink); background: var(--surface); border: var(--rule-strong); border-radius: 999px; cursor: pointer; }
.chip:hover { border-color: var(--accent-text); color: var(--accent-text); }
.legenda-dinamica { margin-top: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--surface); border: var(--rule); }
.leg-titulo { margin: 0 0 var(--space-2); font: 500 0.82rem var(--font-mono); letter-spacing: 0.02em; color: var(--ink-2); }
.legenda-dinamica ul { display: flex; flex-wrap: wrap; gap: var(--space-2) var(--space-4); margin: 0; padding: 0; list-style: none; font-size: 0.88rem; }
.legenda-dinamica li { display: flex; align-items: center; gap: var(--space-2); }
.amostra { width: 1.4rem; height: 0.8rem; border: 1px solid var(--map-border); }
.nota-mapa { margin-top: var(--space-3); font-size: var(--step--1); color: var(--ink-3); max-width: none; }

.painel { position: sticky; top: calc(var(--header-h) + var(--space-4)); padding: var(--space-5); background: var(--surface); border: var(--rule-strong); max-height: calc(100vh - var(--header-h) - var(--space-6)); overflow: auto; }
.painel h2 { font-size: var(--step-2); margin-bottom: var(--space-3); }
.p-cab { position: relative; }
.fechar { position: absolute; top: -4px; right: -4px; width: 2rem; height: 2rem; font-size: 1.4rem; line-height: 1; color: var(--ink-2); background: transparent; border: var(--rule); border-radius: var(--radius-2); cursor: pointer; }
.cmp-wrap { margin-bottom: var(--space-4); }
.cmp-wrap select { width: 100%; }
.ficha { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
.ficha th, .ficha td { padding: 0.45rem 0.5rem 0.45rem 0; text-align: left; vertical-align: top; border-top: var(--rule); }
.ficha th[scope='row'] { width: 38%; font-weight: 500; color: var(--ink-2); }
.ficha thead th { border-top: 0; font-family: var(--font-serif); font-size: 1rem; }
.aviso { margin: var(--space-4) 0 0; padding: var(--space-3); font-size: 0.88rem; background: var(--accent-soft); border-left: 3px solid var(--accent); }
.status { margin: var(--space-3) 0 0; padding-left: 1.1rem; font-size: 0.88rem; color: var(--ink-2); }
.sub { margin: var(--space-5) 0 var(--space-2); font-size: var(--step-0); font-family: var(--font-sans); font-weight: 600; letter-spacing: 0; }
.eventos { margin: 0; padding: 0; list-style: none; font-size: 0.92rem; }
.eventos li { padding: 0.3rem 0; border-top: var(--rule); }
.ano { margin-right: 0.4rem; color: var(--ink-3); font-size: 0.82rem; }
.vazio, .rodape-ficha, .mini { font-size: 0.85rem; color: var(--ink-3); }
.rodape-ficha { margin-top: var(--space-4); padding-top: var(--space-3); border-top: var(--rule); }

.tabela-alt { padding-bottom: var(--space-6); }
summary { cursor: pointer; font-weight: 500; color: var(--accent-text); }
.rolagem { overflow-x: auto; margin-top: var(--space-3); }
.tabela-alt table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.tabela-alt th, .tabela-alt td { padding: 0.45rem 0.7rem; text-align: left; border-bottom: var(--rule); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (max-width: 62rem) {
  .palco { grid-template-columns: 1fr; }
  .painel { position: static; max-height: none; }
}
</style>
