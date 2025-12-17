# Repository Guidelines

## Project Structure & Module Organization
Source code lives in `src/`, with the single-page shell in `App.vue` and the Vue entry point in `main.js`. Route definitions stay in `src/router/index.js`, while feature views reside under `src/views/`. Reusable UI blocks live in `src/components/`, and larger landing sections are grouped within `src/components/sections/` (e.g., `HeroSection.vue`, `SuccessStories.vue`) to keep copy-heavy layouts isolated. Static assets go into `src/assets/`, global styles belong in `src/style.css`, and production bundles emit to `dist/` after a build. The `public/` folder exposes files verbatim at the root URL for icons or manifest metadata.

## Build, Test, and Development Commands
- `npm install` — install dependencies defined in `package.json`.
- `npm run dev` — start the Vite dev server with hot-module reload at `http://localhost:5173`.
- `npm run build` — create a production bundle in `dist/` and surface build errors.
- `npm run preview` — serve the most recent `dist/` build locally for final smoke testing.

## Coding Style & Naming Conventions
Use 2-space indentation across Vue, JS, and CSS files. Components rely on `<script setup>` syntax; keep logic modular by extracting composables into `src/composables/`. Name Vue files with PascalCase (`HeroGlobe.vue`) and export helpers in camelCase. Keep SCSS-like nesting inside `style.css` minimal, and prefer scoped styles inside single-file components when targeting a specific section. Run `npm run build` before opening a PR to ensure ESLint/Vite type checks pass.

## Testing Guidelines
Automated tests are not yet scaffolded, so add Vitest + Vue Test Utils alongside new features. Place specs near the code under `src/components/__tests__/ComponentName.spec.js` for UI and `src/composables/__tests__/useThing.spec.js` for logic. Target meaningful coverage around GSAP timelines, router guards, and async data fetching. Use `npx vitest run` for CI-friendly runs and `npx vitest --ui` while developing.

## Commit & Pull Request Guidelines
Git metadata is not bundled here, so follow a conventional, imperative style when creating commits once cloned (e.g., `feat: add impact numbers section`). Reference related issues in the body, keep subject lines under 72 characters, and separate summary from detail with a blank line. Pull requests should include: a concise description of the change, screenshots or short clips for visual updates, reproduction steps for bug fixes, and explicit notes on any new dependencies or environment variables. Request at least one review before merging.
