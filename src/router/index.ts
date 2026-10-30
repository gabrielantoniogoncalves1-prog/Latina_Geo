import { createRouter, createWebHashHistory } from 'vue-router'

// Rotas em hash para funcionar no GitHub Pages; views carregadas sob demanda.
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: () => import('@/views/HomeView.vue'), meta: { title: 'Início' } },
    { path: '/mapa', name: 'mapa', component: () => import('@/views/MapaView.vue'), meta: { title: 'Mapa' } },
    { path: '/historia', name: 'historia', component: () => import('@/views/HistoriaView.vue'), meta: { title: 'História' } },
    { path: '/fontes', name: 'fontes', component: () => import('@/views/FontesView.vue'), meta: { title: 'Fontes e Metodologia' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const page = to.meta.title as string | undefined
  document.title = page && to.name !== 'inicio'
    ? `${page} | Território & Poder`
    : 'Território & Poder: atlas geopolítico da América Latina'
})
