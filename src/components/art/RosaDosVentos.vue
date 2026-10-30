<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 100 })
</script>

<template>
  <!-- Rosa dos ventos em gravura: 16 pontas, anel graduado e o Norte em destaque. -->
  <svg :width="size" :height="size" viewBox="-60 -60 120 120" fill="none" aria-hidden="true" focusable="false" overflow="visible" :x="-size / 2" :y="-size / 2">
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <circle r="47" stroke-width="0.8" />
      <circle r="42" stroke-width="0.4" />
      <g stroke-width="0.6">
        <path v-for="i in 36" :key="i" :d="`M0 -42 V${i % 3 === 1 ? -47 : -45}`" :transform="`rotate(${(i - 1) * 10})`" />
      </g>
      <g stroke-width="0.6" opacity="0.7">
        <path d="M0 -36 6 -6 36 0 6 6 0 36 -6 6 -36 0 -6 -6Z" fill="var(--map-label-halo)" />
      </g>
      <path d="M0 -40 8 -8 -8 -8Z" fill="var(--accent)" stroke-width="0.6" />
      <path d="M0 40 8 8 -8 8Z M40 0 8 -8 8 8Z M-40 0 -8 -8 -8 8Z" fill="currentColor" stroke-width="0.4" opacity="0.85" />
      <path d="M-26 -26 -5 -5 M26 -26 5 -5 M-26 26 -5 5 M26 26 5 5" stroke-width="0.8" opacity="0.65" />
    </g>
    <text y="-50" x="0" text-anchor="middle" font-family="var(--font-serif)" font-weight="700" font-size="13" fill="currentColor" paint-order="stroke" stroke="var(--map-ocean)" stroke-width="3">N</text>
  </svg>
</template>
