# Atelier

Atelier is the shared workspace for Rémino’s publishable JavaScript libraries
and their documentation. It is deliberately a repository README: it explains
the workspace, while every published package keeps its own user-facing README.

## Layout

- `packages/` contains independently versioned npm packages.
- `apps/docs/` is the single Astro 7 documentation site. Each library keeps its
  existing public route, including `/dactylo/`, `/jukette/`, `/paradimg/`,
  `/remarqueeble/`, and `/scrollerful/`.
- `bin/` contains the shared Jukette package build and release helpers.

## Package documentation

Package READMEs follow the established library style used by dactylo and
remarqueeble:

1. Package name and one-sentence description.
2. Current version, author, and Docs / repository / npm links.
3. Generated `mtoc` navigation.
4. Installation, usage, API, development, contribution, and licence sections.

Keep documentation about using a library in its package README. Keep workspace
commands and contributor guidance here.

## Development

```sh
npm install
npm run dev
```

Build every package and the documentation site with `npm run build`.

The root also provides `npm run lint`, `npm run format`, `npm run typecheck`,
and `npm test`. `just` offers matching shortcuts; run `just hooks` to install
the Lefthook pre-commit and pre-push checks.
