# Stackmoor documentation

Source of [docs.stackmoor.dev](https://docs.stackmoor.dev) – built with [Starlight](https://starlight.astro.build) (Astro). English at the root, Polish under `/pl/`.

## Edit

Pages are Markdown files in `src/content/docs/` (English) and `src/content/docs/pl/` (Polish). Keep both languages in sync – every page exists in both. The sidebar is set in `astro.config.mjs`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
```

Requires Node 22 or newer.

Fonts: IBM Plex Sans and IBM Plex Mono, self-hosted (SIL Open Font License, `public/fonts/OFL.txt`).
