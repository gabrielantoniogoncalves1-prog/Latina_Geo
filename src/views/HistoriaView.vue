<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MapaBase from '@/components/maps/MapaBase.vue'
import EventoSelo from '@/components/art/EventoSelo.vue'
import { EVENTOS, EVENTO_POR_ID, PERIODOS } from '@/data/timeline'
import { nomeDe } from '@/data/paises'

const route = useRoute()
const router = useRouter()
const atual = ref(EVENTOS[0].id)
const evento = computed(() => EVENTO_POR_ID.get(atual.value)!)
const indice = computed(() => EVENTOS.findIndex((e) => e.id === atual.value))
const periodo = computed(() => PERIODOS.find((p) => p.id === evento.value.periodo)!)

onMounted(() => {
  const q = route.query.evento
  if (typeof q === 'string' && EVENTO_POR_ID.has(q)) atual.value = q
})
watch(atual, (id) => router.replace({ path: '/historia', query: { evento: id } }))

function ir(delta: number) {
  const i = Math.min(EVENTOS.length - 1, Math.max(0, indice.value + delta))
  atual.value = EVENTOS[i].id
}
function teclas(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); ir(1) }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); ir(-1) }
  else if (e.key === 'Home') { e.preventDefault(); atual.value = EVENTOS[0].id }
  else if (e.key === 'End') { e.preventDefault(); atual.value = EVENTOS[EVENTOS.length - 1].id }
}

// ---------- geometria do infográfico (desktop) ----------
const VB_W = 1200
const X0 = 48
const X1 = 1152
const AXIS_Y = 112
const MARK_Y = 196
const slotX = (i: number) => X0 + (i * (X1 - X0)) / (EVENTOS.length - 1)
const anoX = (a: number) => X0 + ((a - 1820) / (2026 - 1820)) * (X1 - X0)
const decadas = Array.from({ length: 11 }, (_, i) => 1820 + i * 20)
const CORES = ['var(--cat-1)', 'var(--cat-3)', 'var(--cat-4)', 'var(--cat-5)', 'var(--cat-2)']
const NOMES_CURTOS = ['Independências', 'Intervenções', 'Guerra Fria', 'Pós-Guerra Fria', 'Multipolaridade']
const faixas = computed(() =>
  PERIODOS.map((p, n) => {
    const idx = EVENTOS.map((e, i) => (e.periodo === p.id ? i : -1)).filter((i) => i >= 0)
    const a = slotX(idx[0]) - (X1 - X0) / (EVENTOS.length - 1) / 2
    const b = slotX(idx[idx.length - 1]) + (X1 - X0) / (EVENTOS.length - 1) / 2
    return { p, n, x: Math.max(a, 20), w: Math.min(b, VB_W - 20) - Math.max(a, 20), cor: CORES[n], curto: NOMES_CURTOS[n] }
  }),
)
const corDe = (periodo: number) => CORES[periodo - 1]

const destaque = computed(() => evento.value.paises)
const legendaMapa = computed(() => `Países atuais ligados ao evento “${evento.value.titulo}”. Fronteiras de hoje, usadas só como referência: elas não existiam na época em vários casos.`)
</script>

<template>
  <section class="container topo">
    <p class="kicker num-mono">03 · Linha do tempo</p>
    <h1>Dois séculos de relações entre os EUA e a América Latina</h1>
    <p class="lead">Vinte eventos, de 1820 a 2026, em cinco períodos. Escolha um evento na linha ou use as setas do teclado: o mapa mostra os países envolvidos.</p>
  </section>

  <!-- Infográfico: eixo em escala real (em cima) ligado a marcadores igualmente espaçados (embaixo) -->
  <section class="container linha" aria-label="Linha do tempo">
    <div class="svg-wrap" role="group" aria-label="Linha do tempo de 1820 a 2026" @keydown="teclas">
      <svg :viewBox="`0 0 ${VB_W} 250`" class="tl">
        <g v-for="f in faixas" :key="f.p.id">
          <rect :x="f.x" y="8" :width="f.w" height="226" :fill="f.cor" opacity="0.1" />
          <rect :x="f.x" y="8" :width="f.w" height="4" :fill="f.cor" />
          <text :x="f.x + 10" y="34" class="per-nome">{{ f.curto }}</text>
          <text :x="f.x + 10" y="50" class="per-ano">{{ f.p.inicio }}–{{ f.p.fim }}</text>
        </g>

        <!-- eixo cronológico em escala real -->
        <line :x1="X0" :x2="X1" :y1="AXIS_Y" :y2="AXIS_Y" class="eixo" />
        <g v-for="d in decadas" :key="d">
          <line :x1="anoX(d)" :x2="anoX(d)" :y1="AXIS_Y - 5" :y2="AXIS_Y + 5" class="eixo" />
          <text :x="anoX(d)" :y="AXIS_Y - 12" text-anchor="middle" class="tick">{{ d }}</text>
        </g>

        <!-- ligações -->
        <g fill="none">
          <path
            v-for="(e, i) in EVENTOS"
            :key="'c' + e.id"
            :d="`M${anoX(e.ano)} ${AXIS_Y} C${anoX(e.ano)} ${AXIS_Y + 50}, ${slotX(i)} ${MARK_Y - 60}, ${slotX(i)} ${MARK_Y - 14}`"
            :class="['lig', { ativo: e.id === atual }]"
            :stroke="e.id === atual ? corDe(e.periodo) : undefined"
          />
        </g>
        <circle v-for="e in EVENTOS" :key="'p' + e.id" :cx="anoX(e.ano)" :cy="AXIS_Y" r="3" :fill="corDe(e.periodo)" />

        <!-- marcadores -->
        <g
          v-for="(e, i) in EVENTOS"
          :key="e.id"
          :transform="`translate(${slotX(i)} ${MARK_Y})`"
          class="marc"
          :class="{ ativo: e.id === atual }"
          role="button"
          tabindex="0"
          :aria-label="`${e.data}: ${e.titulo}`"
          :aria-pressed="e.id === atual"
          @click="atual = e.id"
          @keydown.enter.prevent="atual = e.id"
          @keydown.space.prevent="atual = e.id"
        >
          <circle r="22" fill="transparent" />
          <circle r="10" :fill="e.id === atual ? corDe(e.periodo) : 'var(--bg)'" :stroke="corDe(e.periodo)" stroke-width="2" />
          <text y="30" text-anchor="middle" class="m-ano">{{ e.ano }}</text>
        </g>
      </svg>
    </div>

    <!-- Versão vertical para telas estreitas -->
    <ol class="lista-v" aria-label="Eventos">
      <li v-for="e in EVENTOS" :key="e.id">
        <button type="button" :class="{ ativo: e.id === atual }" :style="{ '--cor': corDe(e.periodo) }" @click="atual = e.id">
          <span class="num-mono">{{ e.ano }}</span>
          <span>{{ e.titulo }}</span>
        </button>
      </li>
    </ol>

    <div class="passos">
      <button type="button" class="passo" :disabled="indice === 0" @click="ir(-1)">← Anterior</button>
      <span class="num-mono contador">{{ indice + 1 }} / {{ EVENTOS.length }}</span>
      <button type="button" class="passo" :disabled="indice === EVENTOS.length - 1" @click="ir(1)">Próximo →</button>
    </div>
  </section>

  <section class="container detalhe" aria-live="polite" :aria-label="`Evento: ${evento.titulo}`">
    <article class="ficha">
      <p class="kicker num-mono" :style="{ color: 'var(--ink-2)' }">
        <span class="bolinha" :style="{ background: corDe(evento.periodo) }"></span>
        {{ evento.data }} · {{ periodo.nome }}
      </p>
      <h2>{{ evento.titulo }}</h2>
      <p class="resumo">{{ evento.resumo }}</p>

      <dl>
        <div><dt>Contexto</dt><dd>{{ evento.contexto }}</dd></div>
        <div>
          <dt>Atores</dt>
          <dd><ul class="chips"><li v-for="a in evento.atores" :key="a">{{ a }}</li></ul></dd>
        </div>
        <div><dt>Interesses</dt><dd>{{ evento.interesses }}</dd></div>
        <div><dt>Consequências</dt><dd>{{ evento.consequencias }}</dd></div>
        <div class="eua"><dt>Relação com os EUA</dt><dd>{{ evento.relacaoEUA }}</dd></div>
        <div v-if="evento.ressalva" class="ressalva"><dt>Ressalva</dt><dd>{{ evento.ressalva }}</dd></div>
        <div>
          <dt>Fontes</dt>
          <dd>
            <ul class="fontes">
              <li v-for="f in evento.fontes" :key="f.titulo">
                <a v-if="f.url" :href="f.url" target="_blank" rel="noopener noreferrer">{{ f.instituicao }}: {{ f.titulo }}</a>
                <template v-else>{{ f.instituicao }}: <em>{{ f.titulo }}</em></template>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </article>

    <aside class="lado">
      <MapaBase :highlight="destaque" dim fit compact :interactive="false" :show-capitals="false" :legenda-figura="legendaMapa" :label="`Mapa com os países ligados ao evento ${evento.titulo}`" />
      <div class="selo-wrap">
        <EventoSelo :evento-id="evento.id" :size="150" />
        <div>
          <p class="mini num-mono">Países destacados</p>
          <p class="paises">{{ destaque.map(nomeDe).join(' · ') }}</p>
          <RouterLink to="/mapa?camada=eventos" class="link">Ver no mapa interativo →</RouterLink>
        </div>
      </div>
    </aside>
  </section>
</template>

<style scoped>
.topo { padding-block: var(--space-7) var(--space-5); }
.kicker { margin: 0 0 var(--space-2); font-size: var(--step--1); letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent-text); }
.topo h1 { font-size: var(--step-4); max-width: 20ch; }
.lead { font-family: var(--font-serif); font-size: var(--step-1); color: var(--ink-2); max-width: 54ch; }

.linha { padding-block: var(--space-4) var(--space-5); }
.svg-wrap { background: var(--surface); border: var(--rule-strong); padding: var(--space-3) var(--space-3) 0; }
.tl { width: 100%; height: auto; display: block; }
.eixo { stroke: var(--ink-2); stroke-width: 1; }
.tick { font: 400 11px var(--font-mono); fill: var(--ink-2); }
.per-nome { font: 600 15px var(--font-serif); fill: var(--ink); }
.per-ano { font: 400 11px var(--font-mono); fill: var(--ink-2); }
.lig { stroke: var(--border-strong); stroke-width: 1; }
.lig.ativo { stroke-width: 2; }
.marc { cursor: pointer; outline: none; }
.marc circle:nth-child(2) { transition: fill var(--dur-2) var(--ease); }
.marc:hover circle:nth-child(2) { stroke-width: 3; }
.marc:focus-visible circle:nth-child(2) { stroke: var(--focus); stroke-width: 3.5; }
.m-ano { font: 500 12px var(--font-mono); fill: var(--ink-2); }
.marc.ativo .m-ano { fill: var(--ink); font-weight: 600; }

.lista-v { display: none; margin: 0; padding: 0; list-style: none; border-left: 2px solid var(--border-strong); }
.lista-v button { display: flex; gap: var(--space-3); width: 100%; padding: var(--space-2) var(--space-3); font: inherit; text-align: left; color: var(--ink-2); background: transparent; border: 0; border-left: 4px solid var(--cor); margin-left: -2px; cursor: pointer; }
.lista-v button.ativo { color: var(--ink); background: var(--surface); font-weight: 600; }
.lista-v .num-mono { min-width: 3.2rem; font-size: 0.85rem; }

.passos { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-top: var(--space-4); }
.passo { padding: 0.5rem 1rem; font: 500 0.95rem var(--font-sans); color: var(--ink); background: var(--elevated); border: var(--rule-strong); border-radius: var(--radius-2); cursor: pointer; }
.passo:hover:not(:disabled) { border-color: var(--accent-text); color: var(--accent-text); }
.passo:disabled { opacity: 0.4; cursor: default; }
.contador { color: var(--ink-2); font-size: 0.9rem; }

.detalhe { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: var(--space-7); align-items: start; padding-block: var(--space-5) var(--space-6); }
.ficha h2 { font-size: var(--step-3); margin-bottom: var(--space-3); }
.bolinha { display: inline-block; width: 0.7rem; height: 0.7rem; margin-right: 0.5rem; border-radius: 50%; }
.resumo { font-family: var(--font-serif); font-size: var(--step-1); color: var(--ink-2); }
dl { margin: var(--space-5) 0 0; }
dl > div { padding: var(--space-3) 0; border-top: var(--rule); display: grid; grid-template-columns: 9.5rem 1fr; gap: var(--space-4); }
dt { font: 500 0.78rem var(--font-mono); letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink-2); padding-top: 0.2rem; }
dd { margin: 0; max-width: 62ch; }
.eua dd { font-weight: 500; }
.ressalva { background: var(--accent-soft); margin-inline: calc(var(--space-3) * -1); padding-inline: var(--space-3); }
.chips { display: flex; flex-wrap: wrap; gap: var(--space-2); margin: 0; padding: 0; list-style: none; }
.chips li { padding: 0.1rem 0.6rem; font-size: 0.85rem; border: var(--rule-strong); border-radius: 999px; background: var(--surface); }
.fontes { margin: 0; padding-left: 1.1rem; font-size: 0.9rem; }
.fontes li { margin-bottom: 0.3rem; }

.lado { position: sticky; top: calc(var(--header-h) + var(--space-4)); display: grid; gap: var(--space-4); }
.selo-wrap { display: flex; gap: var(--space-4); align-items: center; padding: var(--space-3); background: var(--surface); border: var(--rule); }
.mini { margin: 0 0 var(--space-1); font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink-2); }
.paises { margin: 0 0 var(--space-2); font-size: 0.92rem; }
.link { font-size: 0.9rem; }

@media (max-width: 62rem) {
  .svg-wrap { display: none; }
  .lista-v { display: block; max-height: 18rem; overflow: auto; }
  .detalhe { grid-template-columns: 1fr; gap: var(--space-5); }
  .lado { position: static; order: -1; }
  dl > div { grid-template-columns: 1fr; gap: var(--space-1); }
}
</style>
