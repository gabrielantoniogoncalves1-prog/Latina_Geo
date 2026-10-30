<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoMark from '@/components/ui/LogoMark.vue'
import { NAV_ITEMS } from '@/router/nav'

// Em ordem alfabética.
const ALUNOS = [
  'Alice Aparecida',
  'Bernardo Duarte',
  'Eduardo Gonçalves',
  'Gabriel Antônio',
  'Luíza Mayra',
]
</script>

<template>
  <footer class="site-footer">
    <div class="container grid">
      <section class="about" aria-labelledby="footer-title">
        <div class="brand">
          <LogoMark :size="34" />
          <h2 id="footer-title" class="brand-name">Território &amp; Poder</h2>
        </div>
        <p class="question">
          Em que medida a influência dos EUA contribuiu para moldar as relações políticas,
          econômicas e geopolíticas da América Latina?
        </p>
      </section>

      <nav class="links" aria-label="Rodapé">
        <h3 class="col-title">Explorar</h3>
        <ul>
          <li v-for="item in NAV_ITEMS" :key="item.to">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <section class="project" aria-labelledby="footer-project">
        <h3 id="footer-project" class="col-title">O projeto</h3>
        <p>
          Trabalho de Geografia do 2º ano do curso técnico integrado, para o seminário
          “Geopolítica do Poder”, no 4º bimestre de 2026.
        </p>
        <p>
          Todos os dados e imagens têm fonte e licença registradas em
          <RouterLink to="/fontes">Fontes e Metodologia</RouterLink>.
        </p>
      </section>
    </div>

    <div class="container authors">
      <h3 class="col-title">Desenvolvido por</h3>
      <ul class="students">
        <li v-for="aluno in ALUNOS" :key="aluno">{{ aluno }}</li>
      </ul>
    </div>

    <div class="container legal">
      <p>Projeto educacional sem fins comerciais. As fronteiras exibidas são as atuais, usadas como referência.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: var(--space-9);
  background: var(--surface);
  border-top: var(--rule-strong);
  color: var(--ink-2);
  font-size: var(--step--1);
}
.grid {
  display: grid;
  gap: var(--space-6) var(--space-7);
  grid-template-columns: 1.4fr 0.7fr 1.2fr;
  padding-block: var(--space-7) var(--space-6);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--ink);
  margin-bottom: var(--space-4);
}
.brand-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 650;
}
.question {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: var(--step-1);
  line-height: 1.4;
  color: var(--ink);
  max-width: 34ch;
}
.col-title {
  margin: 0 0 var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--step--1);
  font-weight: 650;
  letter-spacing: 0;
  color: var(--ink);
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li + li {
  margin-top: var(--space-2);
}
.links a {
  color: var(--ink-2);
  text-decoration: none;
}
.links a:hover {
  color: var(--accent-text);
  text-decoration: underline;
}
.project p {
  max-width: 42ch;
}
.authors {
  border-top: var(--rule);
  padding-block: var(--space-4) var(--space-4);
}
.authors .col-title {
  margin-bottom: var(--space-2);
}
.students {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-5);
  color: var(--ink);
}
.students li + li {
  margin-top: 0;
}
.legal {
  border-top: var(--rule);
  padding-block: var(--space-4) var(--space-5);
}
.legal p {
  margin: 0;
  max-width: none;
  color: var(--ink-3);
}

@media (max-width: 52rem) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
