<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { select } from 'd3-selection'
import 'd3-transition'
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom'
import { W, H, FRAME, VISTAS, projection, mapa, erro, carregarMapa, type Unidade } from '@/composables/useLatamMap'
import { nomeDe } from '@/data/paises'
import RosaDosVentos from '@/components/art/RosaDosVentos.vue'

const props = withDefaults(
  defineProps<{
    /** Cor de preenchimento por id (qualquer valor CSS, inclusive var(--x)). */
    fills?: Record<string, string>
    selectedId?: string | null
    /** Países destacados; os demais ficam esmaecidos quando `dim` está ativo. */
    highlight?: string[]
    dim?: boolean
    interactive?: boolean
    compact?: boolean
    showCapitals?: boolean
    label?: string
    legendaFigura?: string
    /** Em mapas não interativos, enquadra automaticamente os países destacados. */
    fit?: boolean
  }>(),
  { interactive: true, compact: false, showCapitals: true, dim: false, label: 'Mapa político da América Latina e do Caribe' },
)
const emit = defineEmits<{ (e: 'select', id: string | null): void; (e: 'hover', id: string | null): void }>()

const svgRef = ref<SVGSVGElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)
const t = ref<ZoomTransform>(zoomIdentity)
const hoverId = ref<string | null>(null)
const tip = ref({ x: 0, y: 0 })
const visibleLabels = ref<{ u: Unidade; w: number }[]>([])
let behavior: ZoomBehavior<SVGSVGElement, unknown> | null = null
let raf = 0
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const k = computed(() => t.value.k)
const tf = computed(() => `translate(${t.value.x} ${t.value.y}) scale(${t.value.k})`)
const hi = computed(() => new Set(props.highlight ?? []))

function fillOf(u: Unidade) {
  if (props.fills && props.fills[u.id]) return props.fills[u.id]
  if (u.kind === 'ctx') return 'var(--map-context)'
  if (u.kind === 'dep') return 'var(--map-nonsovereign)'
  return 'var(--map-land)'
}
function opacityOf(u: Unidade) {
  if (!props.dim || !hi.value.size) return 1
  return hi.value.has(u.id) ? 1 : u.kind === 'ctx' ? 0.55 : 0.42
}

const regionais = computed(() => (mapa.value?.unidades ?? []).filter((u) => u.kind !== 'ctx'))
const contexto = computed(() => (mapa.value?.unidades ?? []).filter((u) => u.kind === 'ctx'))
const selecionada = computed(() => mapa.value?.unidades.find((u) => u.id === props.selectedId) ?? null)
const destacadas = computed(() => (mapa.value?.unidades ?? []).filter((u) => hi.value.has(u.id)))

// ---- rótulos com nível de detalhe e anticolisão ----
function minZoom(u: Unidade) {
  if (u.kind === 'ctx') return u.id === 'USA' || u.id === 'CAN' ? 0 : 99
  if (u.area > 420) return 0
  if (u.area > 140) return 1.8
  if (u.area > 55) return 2.8
  if (u.area > 18) return 4
  return 6
}
function fontPx(u: Unidade) {
  if (u.kind === 'ctx') return 11
  return u.area > 9000 ? 13.5 : u.area > 1500 ? 11.5 : 10
}
function computeLabels() {
  if (!mapa.value || (props.compact && !props.interactive && !props.highlight?.length)) {
    visibleLabels.value = []
    return
  }
  const soDestaque = !props.interactive
  const tr = t.value
  const placed: [number, number, number, number][] = []
  const out: { u: Unidade; w: number }[] = []
  const lista = [...mapa.value.unidades].sort((a, b) => b.area - a.area)
  for (const u of lista) {
    if (soDestaque) { if (!hi.value.has(u.id)) continue } else if (tr.k < minZoom(u)) continue
    if (props.highlight?.length && props.dim && !hi.value.has(u.id) && u.kind !== 'sov') continue
    const [sx, sy] = tr.apply(u.anchor)
    if (sx < FRAME || sx > W - FRAME || sy < FRAME || sy > H - FRAME) continue
    const text = nomeDe(u.id)
    const f = fontPx(u)
    const w = text.length * f * 0.56
    const small = u.area < 140
    const x0 = small ? sx + 5 : sx - w / 2
    const box: [number, number, number, number] = [x0 - 2, sy - f, x0 + w + 2, sy + 3]
    if (placed.some((p) => box[0] < p[2] && box[2] > p[0] && box[1] < p[3] && box[3] > p[1])) continue
    placed.push(box)
    out.push({ u, w })
  }
  visibleLabels.value = out
}
function schedule() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(computeLabels)
}

// ---- capitais ----
const capitaisVisiveis = computed(() => {
  if (!mapa.value || !props.showCapitals) return []
  return mapa.value.capitais.filter((c) => (c.pop > 2_500_000 ? k.value >= 1.4 : c.pop > 500_000 ? k.value >= 2.6 : k.value >= 4))
})
const capitaisComNome = computed(() => capitaisVisiveis.value.filter((c) => (c.pop > 2_500_000 ? k.value >= 2.4 : c.pop > 500_000 ? k.value >= 4 : k.value >= 6)))

// ---- legendas ----
const seasLabels = computed(() => {
  const pts: { nome: string; lon: number; lat: number; rot: number; size: number }[] = [
    { nome: 'OCEANO PACÍFICO', lon: -102, lat: -14, rot: -62, size: 17 },
    { nome: 'OCEANO ATLÂNTICO', lon: -42, lat: -28, rot: 0, size: 17 },
    { nome: 'MAR DO CARIBE', lon: -74.5, lat: 14.6, rot: 4, size: 12 },
    { nome: 'GOLFO DO MÉXICO', lon: -90, lat: 24.2, rot: 0, size: 11 },
    { nome: 'OCEANO ATLÂNTICO NORTE', lon: -52, lat: 21, rot: 0, size: 14 },
  ]
  return pts.map((p) => {
    const [x, y] = projection([p.lon, p.lat]) ?? [0, 0]
    return { ...p, x, y }
  })
})

const escala = computed(() => {
  const kmPx = (projection.scale() * t.value.k) / 6371
  const opcoes = [10, 25, 50, 100, 250, 500, 1000, 2000]
  let km = opcoes[opcoes.length - 1]
  for (const o of opcoes) if (o * kmPx >= 70) { km = o; break }
  return { km, px: km * kmPx }
})

// ---- zoom / pan ----
function setupZoom() {
  if (!svgRef.value || !props.interactive) return
  behavior = zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 80])
    .extent([[0, 0], [W, H]])
    .translateExtent([[0, 0], [W, H]])
    .on('zoom', (e) => {
      t.value = e.transform
      schedule()
    })
  select(svgRef.value).call(behavior).on('dblclick.zoom', null)
}
function animateTo(target: ZoomTransform) {
  if (!svgRef.value || !behavior) return
  const s = select(svgRef.value)
  if (reduced) s.call(behavior.transform, target)
  else s.transition().duration(550).call(behavior.transform, target)
}
function zoomToBounds(b: [[number, number], [number, number]], margem = 0.78) {
  const [[x0, y0], [x1, y1]] = b
  const dx = Math.max(x1 - x0, 1), dy = Math.max(y1 - y0, 1)
  const kk = Math.min(60, Math.max(1, margem / Math.max(dx / W, dy / H)))
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
  animateTo(zoomIdentity.translate(W / 2, H / 2).scale(kk).translate(-cx, -cy))
}
function zoomToIds(ids: string[]) {
  const us = (mapa.value?.unidades ?? []).filter((u) => ids.includes(u.id))
  if (!us.length) return
  const x0 = Math.min(...us.map((u) => u.bounds[0][0])), y0 = Math.min(...us.map((u) => u.bounds[0][1]))
  const x1 = Math.max(...us.map((u) => u.bounds[1][0])), y1 = Math.max(...us.map((u) => u.bounds[1][1]))
  zoomToBounds([[x0, y0], [x1, y1]], us.length === 1 && us[0].area < 200 ? 0.2 : 0.7)
}
function zoomToVista(id: string) {
  const v = VISTAS.find((x) => x.id === id)
  if (!v) return
  if (id === 'regiao') return reset()
  const [w, s, e, n] = v.caixa
  const pts = [projection([w, s]), projection([e, s]), projection([w, n]), projection([e, n])].filter(Boolean) as [number, number][]
  zoomToBounds([[Math.min(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1]))], [Math.max(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[1]))]], 0.92)
}
function reset() { animateTo(zoomIdentity) }

let tween = 0
function fitHighlight() {
  if (!props.fit || props.interactive || !mapa.value) return
  const todos = mapa.value.unidades.filter((u) => hi.value.has(u.id))
  const regionais2 = todos.filter((u) => u.kind !== 'ctx')
  const us = regionais2.length ? regionais2 : todos
  let alvo = zoomIdentity
  if (us.length) {
    const x0 = Math.min(...us.map((u) => u.bounds[0][0])), y0 = Math.min(...us.map((u) => u.bounds[0][1]))
    const x1 = Math.max(...us.map((u) => u.bounds[1][0])), y1 = Math.max(...us.map((u) => u.bounds[1][1]))
    const kk = Math.min(7, Math.max(1, 0.8 / Math.max((x1 - x0) / W, (y1 - y0) / H)))
    alvo = zoomIdentity.translate(W / 2, H / 2).scale(kk).translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
  }
  cancelAnimationFrame(tween)
  const de = t.value
  if (reduced) { t.value = alvo; schedule(); return }
  const ini = performance.now()
  const passo = (agora: number) => {
    const f = Math.min(1, (agora - ini) / 450)
    const e = 1 - Math.pow(1 - f, 3)
    const kk = de.k + (alvo.k - de.k) * e
    t.value = zoomIdentity.translate(de.x + (alvo.x - de.x) * e, de.y + (alvo.y - de.y) * e).scale(kk)
    schedule()
    if (f < 1) tween = requestAnimationFrame(passo)
  }
  tween = requestAnimationFrame(passo)
}
function step(f: number) {
  if (!svgRef.value || !behavior) return
  const s = select(svgRef.value)
  if (reduced) s.call(behavior.scaleBy, f)
  else s.transition().duration(250).call(behavior.scaleBy, f)
}

// ---- interação ----
function onEnter(u: Unidade, ev: PointerEvent) {
  if (!props.interactive && !props.compact) return
  hoverId.value = u.id
  emit('hover', u.id)
  moveTip(ev)
}
function moveTip(ev: PointerEvent) {
  const r = wrapRef.value?.getBoundingClientRect()
  if (!r) return
  tip.value = { x: ev.clientX - r.left, y: ev.clientY - r.top }
}
function onLeave() { hoverId.value = null; emit('hover', null) }
function onPick(u: Unidade) { emit('select', u.id === props.selectedId ? null : u.id) }
function onKey(u: Unidade, e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(u) }
}

// ---- tela cheia e PNG ----
function fullscreen() {
  const el = wrapRef.value
  if (!el) return
  if (document.fullscreenElement) document.exitFullscreen()
  else el.requestFullscreen?.()
}
async function exportPng() {
  const svg = svgRef.value
  if (!svg) return
  const clone = svg.cloneNode(true) as SVGSVGElement
  const src = svg.querySelectorAll('*'), dst = clone.querySelectorAll('*')
  const props2 = ['fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'stroke-linejoin', 'opacity', 'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'paint-order', 'display', 'visibility']
  src.forEach((el, i) => {
    const cs = getComputedStyle(el)
    const target = dst[i] as SVGElement
    for (const p of props2) target.style.setProperty(p, cs.getPropertyValue(p))
  })
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', String(W * 2))
  clone.setAttribute('height', String(H * 2))
  const xml = new XMLSerializer().serializeToString(clone)
  const img = new Image()
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml)
  await img.decode()
  const canvas = document.createElement('canvas')
  canvas.width = W * 2
  canvas.height = H * 2
  canvas.getContext('2d')!.drawImage(img, 0, 0)
  const a = document.createElement('a')
  a.download = 'territorio-e-poder-mapa.png'
  a.href = canvas.toDataURL('image/png')
  a.click()
}

watch(() => [props.highlight, props.dim], () => { schedule(); fitHighlight() })
watch(mapa, () => { schedule(); fitHighlight() })
onMounted(async () => {
  await carregarMapa()
  setupZoom()
  schedule()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  cancelAnimationFrame(tween)
  if (svgRef.value) select(svgRef.value).on('.zoom', null)
})

defineExpose({ zoomToIds, zoomToVista, reset, exportPng, fullscreen })

const hoverNome = computed(() => (hoverId.value ? nomeDe(hoverId.value) : ''))
const ariaTabela = computed(() => props.interactive)
</script>

<template>
  <figure ref="wrapRef" class="mapa" :class="{ compact }">
    <div class="stage">
      <svg
        ref="svgRef"
        :viewBox="`0 0 ${W} ${H}`"
        role="group"
        :aria-label="label"
        preserveAspectRatio="xMidYMid meet"
        :class="{ grabbable: interactive }"
      >
        <defs>
          <clipPath id="mapa-clip"><rect :x="FRAME" :y="FRAME" :width="W - 2 * FRAME" :height="H - 2 * FRAME" /></clipPath>
          <linearGradient id="mapa-mar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--map-ocean)" />
            <stop offset="1" stop-color="var(--map-ocean-deep)" />
          </linearGradient>
        </defs>

        <rect :width="W" :height="H" fill="var(--map-ocean)" />
        <g clip-path="url(#mapa-clip)">
          <rect :width="W" :height="H" fill="url(#mapa-mar)" />
          <g v-if="mapa" :transform="tf">
            <path :d="mapa.graticula" fill="none" stroke="var(--map-graticule)" :stroke-width="0.6 / k" opacity="0.8" />
            <!-- águas rasas junto à costa (some ao aproximar muito, por desempenho) -->
            <g v-if="k < 2.5" fill="none" stroke="var(--map-shelf)" stroke-linejoin="round" stroke-linecap="round" pointer-events="none">
              <path :d="mapa.costa" :stroke-width="14" opacity="0.32" />
              <path :d="mapa.costa" :stroke-width="7" opacity="0.5" />
            </g>

            <g class="paises">
              <path v-for="u in contexto" :key="u.id" :d="u.d" :fill="fillOf(u)" :opacity="opacityOf(u)" class="ctx" @pointerenter="onEnter(u, $event)" @pointermove="moveTip" @pointerleave="onLeave" />
              <path
                v-for="u in regionais"
                :key="u.id"
                :d="u.d"
                :fill="fillOf(u)"
                :opacity="opacityOf(u)"
                class="pais"
                :tabindex="interactive ? 0 : undefined"
                :role="interactive ? 'button' : undefined"
                :aria-label="interactive ? nomeDe(u.id) : undefined"
                :aria-pressed="interactive ? u.id === selectedId : undefined"
                @pointerenter="onEnter(u, $event)"
                @pointermove="moveTip"
                @pointerleave="onLeave"
                @click="onPick(u)"
                @keydown="onKey(u, $event)"
              />
            </g>

            <g fill="var(--map-lake)" stroke="var(--map-river)" :stroke-width="0.5 / k">
              <path v-for="(d, i) in mapa.lagos" :key="'l' + i" :d="d" />
            </g>
            <g fill="none" stroke="var(--map-river)" :stroke-width="0.8 / k" stroke-linecap="round" opacity="0.85">
              <path v-for="(d, i) in mapa.rios" :key="'r' + i" :d="d" />
            </g>

            <path :d="mapa.malha" fill="none" stroke="var(--map-border)" :stroke-width="0.7 / k" stroke-linejoin="round" pointer-events="none" />
            <path :d="mapa.costa" fill="none" stroke="var(--map-border-region)" :stroke-width="0.9 / k" stroke-linejoin="round" pointer-events="none" />

            <g pointer-events="none" fill="none" stroke-linejoin="round">
              <path v-for="u in destacadas" :key="'h' + u.id" :d="u.d" stroke="var(--accent)" :stroke-width="1.6 / k" />
              <path v-if="hoverId && hoverId !== selectedId" :d="mapa.unidades.find((x) => x.id === hoverId)?.d" stroke="var(--map-selected)" :stroke-width="1.2 / k" opacity="0.7" />
              <path v-if="selecionada" :d="selecionada.d" stroke="var(--map-selected)" :stroke-width="2.4 / k" />
            </g>

            <!-- capitais -->
            <g v-if="!compact">
              <g v-for="c in capitaisVisiveis" :key="c.nome" :transform="`translate(${c.x} ${c.y}) scale(${1 / k})`" pointer-events="none">
                <circle r="3.2" fill="var(--map-label)" stroke="var(--map-label-halo)" stroke-width="1" />
                <circle r="1.1" fill="var(--map-label-halo)" />
              </g>
              <g v-for="c in capitaisComNome" :key="'n' + c.nome" :transform="`translate(${c.x} ${c.y}) scale(${1 / k})`" pointer-events="none">
                <text x="6" y="3.5" class="cap-nome">{{ c.nome }}</text>
              </g>
            </g>

            <!-- rótulos de países -->
            <g pointer-events="none">
              <g v-for="l in visibleLabels" :key="'t' + l.u.id" :transform="`translate(${l.u.anchor[0]} ${l.u.anchor[1]}) scale(${1 / k})`">
                <text
                  :class="['rot', l.u.kind]"
                  :text-anchor="l.u.area < 140 ? 'start' : 'middle'"
                  :dx="l.u.area < 140 ? 5 : 0"
                  dy="3"
                  :font-size="fontPx(l.u)"
                >{{ nomeDe(l.u.id) }}</text>
              </g>
            </g>

            <!-- mares e oceanos -->
            <g v-if="!compact || interactive" pointer-events="none" :opacity="k > 3.2 ? 0.55 : 1">
              <g v-for="s in seasLabels" :key="s.nome" :transform="`translate(${s.x} ${s.y}) rotate(${s.rot}) scale(${1 / Math.sqrt(k)})`">
                <text class="mar" text-anchor="middle" :font-size="s.size">{{ s.nome }}</text>
              </g>
            </g>
          </g>
        </g>

        <!-- moldura, norte e escala (fixos) -->
        <g pointer-events="none" fill="none">
          <rect :x="FRAME" :y="FRAME" :width="W - 2 * FRAME" :height="H - 2 * FRAME" stroke="var(--map-border-region)" stroke-width="1.4" />
          <rect :x="FRAME - 8" :y="FRAME - 8" :width="W - 2 * FRAME + 16" :height="H - 2 * FRAME + 16" stroke="var(--map-border-region)" stroke-width="0.6" />
        </g>
        <g v-if="!compact" pointer-events="none" :transform="`translate(${W - 92} 92)`" class="ornamento">
          <RosaDosVentos :size="112" />
        </g>
        <g v-if="!compact" pointer-events="none" :transform="`translate(${FRAME + 24} ${H - FRAME - 54})`" class="ornamento">
          <rect x="0" y="0" :width="escala.px / 2" height="6" fill="var(--map-label)" />
          <rect :x="escala.px / 2" y="0" :width="escala.px / 2" height="6" fill="var(--map-label-halo)" stroke="var(--map-label)" stroke-width="1" />
          <rect x="0" y="0" :width="escala.px" height="6" fill="none" stroke="var(--map-label)" stroke-width="1" />
          <text x="0" y="20" class="esc">0</text>
          <text :x="escala.px / 2" y="20" text-anchor="middle" class="esc">{{ escala.km / 2 }}</text>
          <text :x="escala.px" y="20" text-anchor="middle" class="esc">{{ escala.km }} km</text>
          <text x="0" y="36" class="esc fonte">Projeção cônica equivalente de Albers · Natural Earth 1:50m</text>
        </g>
      </svg>

      <div v-if="!mapa && !erro" class="estado" role="status">
        <span class="spinner" aria-hidden="true"></span> Carregando o mapa…
      </div>
      <div v-if="erro" class="estado erro" role="alert">{{ erro }}</div>

      <div v-if="hoverNome" class="tip" :style="{ left: tip.x + 'px', top: tip.y + 'px' }" aria-hidden="true">{{ hoverNome }}</div>

      <div v-if="interactive" class="controles">
        <button type="button" class="ctrl" aria-label="Aproximar" @click="step(1.6)">+</button>
        <button type="button" class="ctrl" aria-label="Afastar" @click="step(1 / 1.6)">−</button>
        <button type="button" class="ctrl" aria-label="Redefinir visão" @click="reset">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" /></svg>
        </button>
        <button type="button" class="ctrl" aria-label="Tela cheia" @click="fullscreen">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
        </button>
        <button type="button" class="ctrl" aria-label="Exportar como imagem PNG" @click="exportPng">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14" /></svg>
        </button>
      </div>
    </div>
    <figcaption v-if="legendaFigura" class="legenda">{{ legendaFigura }}</figcaption>
    <span v-if="ariaTabela" class="sr-only">Use Tab para percorrer os países e Enter para selecionar. A tabela alternativa fica abaixo do mapa.</span>
  </figure>
</template>

<style scoped>
.mapa { margin: 0; }
.stage {
  position: relative;
  background: var(--map-ocean);
  border: var(--rule-strong);
  line-height: 0;
  touch-action: none;
}
.mapa:fullscreen { background: var(--map-ocean); display: grid; place-items: center; }
.mapa:fullscreen .stage { border: 0; height: 100vh; width: 100%; display: grid; place-items: center; }
svg { display: block; width: 100%; height: auto; max-height: calc(100vh - var(--header-h) - 6rem); }
.mapa.compact svg { max-height: none; }
.mapa:fullscreen svg { max-height: 100vh; height: 100vh; }
svg.grabbable { cursor: grab; }
svg.grabbable:active { cursor: grabbing; }
.ctx { stroke: none; }
.pais { cursor: pointer; transition: opacity var(--dur-2) var(--ease); outline: none; }
.pais:focus-visible { stroke: var(--focus); stroke-width: 2px; }
.rot { font-family: var(--font-sans); font-weight: 600; fill: var(--map-label); paint-order: stroke; stroke: var(--map-label-halo); stroke-width: 3px; stroke-linejoin: round; letter-spacing: 0.01em; }
.rot.ctx { font-weight: 500; fill: var(--ink-2); font-style: italic; }
.cap-nome { font: italic 500 9.5px var(--font-serif); fill: var(--map-label); paint-order: stroke; stroke: var(--map-label-halo); stroke-width: 2.6px; }
.mar { font-family: var(--font-serif); font-style: italic; letter-spacing: 0.28em; fill: var(--map-sea-label); }
.esc { font: 500 10.5px var(--font-mono); fill: var(--map-label); }
.esc.fonte { font-size: 9.5px; fill: var(--ink-2); }
.ornamento { color: var(--map-label); }
.estado { position: absolute; inset: 0; display: grid; place-items: center; color: var(--ink-2); font-size: var(--step--1); line-height: 1.4; gap: var(--space-2); background: var(--map-ocean); }
.estado.erro { color: var(--danger); }
.spinner { width: 22px; height: 22px; border: 2px solid var(--border-strong); border-top-color: var(--accent); border-radius: 50%; animation: gira 0.9s linear infinite; }
@keyframes gira { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }
.tip { position: absolute; z-index: 3; transform: translate(12px, 12px); pointer-events: none; padding: 4px 8px; font: 500 12.5px/1.3 var(--font-sans); color: var(--ink); background: var(--elevated); border: var(--rule-strong); border-radius: var(--radius-1); white-space: nowrap; }
.controles { position: absolute; top: var(--space-3); left: var(--space-3); z-index: 3; display: flex; flex-direction: column; gap: 4px; line-height: 1; }
.ctrl { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; padding: 0; font: 500 1.2rem/1 var(--font-sans); color: var(--ink); background: var(--elevated); border: var(--rule-strong); border-radius: var(--radius-2); cursor: pointer; transition: background-color var(--dur-1) var(--ease); }
.ctrl:hover { background: var(--surface); }
.legenda { margin-top: var(--space-2); padding-top: var(--space-2); border-top: var(--rule); color: var(--ink-3); font-size: var(--step--1); line-height: 1.5; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
