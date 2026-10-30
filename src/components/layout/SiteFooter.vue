<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoMark from '@/components/ui/LogoMark.vue'
import { NAV_ITEMS } from '@/router/nav'

const REPO_URL = 'https://github.com/gabrielantoniogoncalves1-prog/Latina_Geo'

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
      <a
        class="repo-link"
        :href="REPO_URL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Código-fonte no GitHub (abre em nova aba)"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        Código
      </a>
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}
.repo-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.2rem 0.6rem;
  border: var(--rule);
  border-radius: 999px;
  color: var(--ink-3);
  font-size: var(--step--1);
  text-decoration: none;
}
.repo-link:hover,
.repo-link:focus-visible {
  color: var(--accent-text);
  border-color: currentColor;
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
