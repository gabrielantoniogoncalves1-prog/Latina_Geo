import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Camada = 'politico' | 'blocos' | 'eventos'

/** Estado compartilhado do mapa: camada ativa, filtros e países selecionados. */
export const useMapaStore = defineStore('mapa', () => {
  const camada = ref<Camada>('politico')
  const bloco = ref<string>('todos')
  const periodo = ref<number>(0)
  const paisId = ref<string | null>(null)
  const comparaId = ref<string | null>(null)
  return { camada, bloco, periodo, paisId, comparaId }
})
