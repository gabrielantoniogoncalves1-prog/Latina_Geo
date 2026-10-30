<script setup lang="ts">
import { computed } from 'vue'
import { EVENTOS } from '@/data/timeline'

const props = defineProps<{ eventoId: string; size?: number }>()
const ev = computed(() => EVENTOS.find((e) => e.id === props.eventoId))
const idx = computed(() => Math.max(0, EVENTOS.findIndex((e) => e.id === props.eventoId)))
const arco = computed(() => {
  // Arco de destaque proporcional à posição do evento na linha do tempo (1820 → 2026).
  const frac = ev.value ? (ev.value.ano - 1820) / 206 : 0
  const a = -Math.PI / 2
  const b = a + frac * Math.PI * 2
  const r = 86
  const large = frac > 0.5 ? 1 : 0
  return `M${r * Math.cos(a)} ${r * Math.sin(a)} A${r} ${r} 0 ${large} 1 ${r * Math.cos(b)} ${r * Math.sin(b)}`
})
const romano = ['I', 'II', 'III', 'IV', 'V']
</script>

<template>
  <!-- Selo autoral: anel graduado de 1820 a 2026, com arco proporcional à data e ano ao centro. -->
  <svg :width="size ?? 200" :height="size ?? 200" viewBox="-100 -100 200 200" role="img" :aria-label="`Selo do evento: ${ev?.data}`" class="selo">
    <g fill="none" stroke="currentColor">
      <circle r="97" stroke-width="1" />
      <circle r="90" stroke-width="0.5" />
      <circle r="62" stroke-width="0.5" />
      <g stroke-width="0.7">
        <path v-for="i in 41" :key="i" :d="`M0 -90 V${(i - 1) % 5 === 0 ? -80 : -85}`" :transform="`rotate(${(i - 1) * 9})`" />
      </g>
    </g>
    <path :d="arco" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="butt" />
    <circle :cx="0" :cy="-86" r="0" />
    <text y="-8" text-anchor="middle" class="ano">{{ ev?.ano }}</text>
    <text y="16" text-anchor="middle" class="rom">Período {{ romano[(ev?.periodo ?? 1) - 1] }}</text>
    <text y="34" text-anchor="middle" class="num">n.º {{ String(idx + 1).padStart(2, '0') }} de {{ EVENTOS.length }}</text>
  </svg>
</template>

<style scoped>
.selo { color: var(--ink); display: block; }
.ano { font: 600 34px var(--font-serif); fill: var(--ink); letter-spacing: -0.02em; }
.rom { font: 500 10px var(--font-mono); fill: var(--ink-2); text-transform: uppercase; letter-spacing: 0.12em; }
.num { font: 400 9px var(--font-mono); fill: var(--ink-3); }
</style>
