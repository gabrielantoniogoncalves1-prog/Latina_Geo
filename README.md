# Território & Poder

Atlas geopolítico da América Latina (Vue 3 + TypeScript + Vite). Páginas: Início, Mapa, História, Fontes.

## Como rodar
```bash
npm ci
npm run dev          # desenvolvimento
npm run typecheck && npm test
npm run build        # saída em dist/ (use VITE_BASE_PATH=/NOME_DO_REPO/ para o GitHub Pages)
```
O deploy está em `.github/workflows/deploy.yml`.

## Regenerar os dados do mapa
`node scripts/build-map.mjs <pasta-com-geojson-natural-earth-1:50m>` grava `public/maps/latam.topo.json`.
