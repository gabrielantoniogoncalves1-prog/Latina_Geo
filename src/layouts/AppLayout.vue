<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

function skipToContent() {
  document.getElementById('conteudo')?.focus()
}
</script>

<template>
  <a class="skip-link" href="#conteudo" @click.prevent="skipToContent">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style scoped>
main {
  min-height: 60vh;
}
main:focus {
  outline: none;
}
</style>
