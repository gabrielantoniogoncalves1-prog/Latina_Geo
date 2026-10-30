<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import MapaBase from '@/components/maps/MapaBase.vue'

const router = useRouter()
const eixos = [
  { n: '01', t: 'Herança histórica', d: 'Independências, Doutrina Monroe e intervenções criaram laços e desconfianças que ainda pesam na região.' },
  { n: '02', t: 'Estruturas econômicas', d: 'Exportar matérias-primas e depender de crédito e mercados externos limita escolhas, mas varia muito de país para país.' },
  { n: '03', t: 'Autonomia diplomática', d: 'Governos latino-americanos recusaram propostas dos EUA (como a ALCA) e construíram foros próprios (Mercosul, CELAC).' },
  { n: '04', t: 'Nova configuração geopolítica', d: 'A presença da China e a volta de ações diretas dos EUA mostram um cenário multipolar e disputado.' },
]
</script>

<template>
  <section class="container hero">
    <div class="texto">
      <p class="kicker num-mono">Atlas geopolítico · América Latina</p>
      <h1>Quem decide o futuro de uma região?</h1>
      <p class="lead">
        Em que medida a influência dos EUA contribuiu para moldar as relações políticas, econômicas e
        geopolíticas da América Latina? Este atlas reúne um mapa interativo e uma linha do tempo para
        você investigar a resposta.
      </p>
      <div class="acoes">
        <RouterLink to="/mapa" class="btn primario">Investigue o mapa</RouterLink>
        <RouterLink to="/historia" class="btn">Entenda a história</RouterLink>
      </div>
    </div>
    <MapaBase
      compact
      :interactive="false"
      :show-capitals="false"
      legenda-figura="Figura 1. América Latina e Caribe. Clique em um país para abrir a ficha no mapa interativo."
      @select="(id) => id && router.push({ path: '/mapa', query: { pais: id } })"
    />
  </section>

  <section class="container conceitos" aria-labelledby="conceitos-t">
    <p class="kicker num-mono">01 · Conceitos</p>
    <h2 id="conceitos-t">Quem influencia as decisões de uma região?</h2>
    <div class="tres">
      <article><h3>Poder</h3><p>Capacidade de levar outros a agir de certo modo: por força militar, dinheiro, regras ou prestígio. Pode ser exercido por Estados, empresas e organizações.</p></article>
      <article><h3>Território</h3><p>Espaço apropriado e disputado. Onde ficam as rotas, os recursos e as bases, e quem controla isso, orienta a política externa.</p></article>
      <article><h3>Interdependência</h3><p>Relações em que ambos os lados dependem um do outro. Só é vulnerabilidade quando a dependência é muito desigual e sem alternativas.</p></article>
    </div>
  </section>

  <section class="container chamadas" aria-label="Por onde começar">
    <RouterLink to="/mapa" class="card">
      <span class="num-mono">Mapa interativo</span>
      <h3>Investigue o mundo real</h3>
      <p>Três camadas: panorama político, integração regional e relações geopolíticas, com ficha e comparação de países.</p>
      <span class="seta">Abrir o mapa →</span>
    </RouterLink>
    <RouterLink to="/historia" class="card">
      <span class="num-mono">Linha do tempo</span>
      <h3>Entenda a história</h3>
      <p>Vinte eventos entre 1820 e 2026, cada um com contexto, interesses, consequências e fontes.</p>
      <span class="seta">Ver a linha do tempo →</span>
    </RouterLink>
  </section>

  <section class="container conclusao" aria-labelledby="concl-t">
    <p class="kicker num-mono">Conclusão</p>
    <h2 id="concl-t">A América Latina decide seu futuro?</h2>
    <p class="lead">
      A influência dos EUA foi real e documentada, de tratados e intervenções a crédito e comércio. Mas
      não foi igual em todo lugar nem em todas as épocas, e os países latino-americanos também agiram:
      negociaram, recusaram, buscaram outros parceiros. A resposta depende do país, do período e do eixo analisado.
    </p>
    <ol class="eixos">
      <li v-for="e in eixos" :key="e.n"><span class="num-mono">{{ e.n }}</span><h3>{{ e.t }}</h3><p>{{ e.d }}</p></li>
    </ol>
    <p class="fim">
      <RouterLink to="/fontes">Fontes e Metodologia</RouterLink> · <RouterLink to="/mapa">Voltar ao mapa</RouterLink>
    </p>
  </section>
</template>

<style scoped>
.hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr); gap: var(--space-7); align-items: center; padding-block: var(--space-7); }
.kicker { margin: 0 0 var(--space-2); font-size: var(--step--1); letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent-text); }
.hero h1 { font-size: var(--step-5); max-width: 12ch; }
.lead { font-family: var(--font-serif); font-size: var(--step-1); line-height: 1.5; color: var(--ink-2); max-width: 46ch; }
.acoes { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-top: var(--space-5); }
.btn { padding: 0.7rem 1.3rem; font-weight: 500; color: var(--ink); text-decoration: none; border: var(--rule-strong); border-radius: var(--radius-2); transition: background-color var(--dur-1) var(--ease); }
.btn:hover { background: var(--surface); text-decoration: none; }
.btn.primario { color: var(--on-accent); background: var(--accent-btn); border-color: var(--accent-btn); }
.btn.primario:hover { filter: brightness(1.08); background: var(--accent-btn); }
.conceitos { padding-block: var(--space-7); border-top: var(--rule); }
.tres { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); margin-top: var(--space-5); }
.tres article { padding-top: var(--space-3); border-top: 3px solid var(--accent); }
.tres h3 { font-size: var(--step-1); }
.chamadas { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); padding-block: var(--space-5) var(--space-7); }
.card { display: block; padding: var(--space-5); color: var(--ink); text-decoration: none; background: var(--surface); border: var(--rule-strong); transition: border-color var(--dur-2) var(--ease), transform var(--dur-2) var(--ease); }
.card:hover { border-color: var(--accent-text); text-decoration: none; transform: translateY(-2px); }
.card .num-mono { font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-2); }
.card h3 { margin: var(--space-2) 0; font-size: var(--step-2); }
.seta { color: var(--accent-text); font-weight: 500; }
.conclusao { padding-block: var(--space-7); border-top: var(--rule); }
.eixos { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); margin: var(--space-5) 0; padding: 0; list-style: none; }
.eixos li { padding-top: var(--space-3); border-top: var(--rule-strong); }
.eixos .num-mono { color: var(--accent-text); font-size: 0.85rem; }
.eixos h3 { margin: var(--space-1) 0 var(--space-2); font-size: var(--step-1); }
.eixos p { font-size: 0.93rem; }
.fim { font-weight: 500; }
@media (max-width: 62rem) {
  .hero, .tres, .chamadas { grid-template-columns: 1fr; }
  .eixos { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 40rem) { .eixos { grid-template-columns: 1fr; } }
</style>
