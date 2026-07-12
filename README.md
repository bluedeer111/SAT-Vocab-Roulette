# SAT Word Roulette

A daily vocabulary game: spin a wheel of 9 SAT words and answer questions
about them in one of three formats (Vocab, Meaning, Scenario).

## Requirements

- [Node.js](https://nodejs.org) 18 or newer (includes npm)

## Run it locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site into `dist/` that you can deploy
anywhere (Vercel, Netlify, GitHub Pages, a plain static file host, etc).

## Public website

This repository is configured to publish automatically to **GitHub Pages** on
every push to `main`.

- Expected public URL:
  `https://bluedeer111.github.io/SAT-Vocab-Roulette/`
- Deployment workflow:
  `.github/workflows/deploy-pages.yml`

If GitHub Pages has not been enabled for the repository yet, set **Settings >
Pages > Source** to **GitHub Actions** once. After that, each push to `main`
will rebuild and republish the site automatically.

## Notes

- The word bank, daily rotation, and all game logic live in
  `src/SatWordRoulette.jsx` — it's a single self-contained component.
- The day's 9 words are chosen deterministically from today's date, so they
  stay the same all day and rotate tomorrow.
- Game progress (lives, streak, solved words) is kept in memory only — it
  resets on page reload. If you'd like it to persist across sessions, the
  easiest option is to swap the `useState` calls for a small `localStorage`
  read/write wrapper.
- Fonts (Fraunces, Inter, IBM Plex Mono) are loaded from Google Fonts via an
  `@import` in the component, so an internet connection is needed for those
  to render correctly; otherwise the browser falls back to system fonts.
