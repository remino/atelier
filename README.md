# Atelier

Creative libraries for the web.

2026 Rémino Rem <https://remino.net/>

[Docs](https://remino.net/) | [Code Repo](https://github.com/remino/atelier)

<!-- mtoc-start -->

- [Packages](#packages)
- [Development](#development)
    - [Tasks](#tasks)
    - [Publishing](#publishing)
- [Licence](#licence)

<!-- mtoc-end -->

## Packages

Atelier contains independently versioned npm packages:

<!-- atelier-packages -->

- [`Dactylo`](https://remino.net/dactylo/): Typewriter effect in JS using CSS.
- [`Jukette`](https://remino.net/jukette/): White-label jukebox custom element
  for audio, SoundCloud, and MIDI playlists.
- [`Paradimg`](https://remino.net/paradimg/): Browser-side image URL modifiers
  and canvas effects.
- [`Remarqueeble`](https://remino.net/remarqueeble/): Custom element tribute to
  the cursed glory of marquee.
- [`Scrollerful`](https://remino.net/scrollerful/): Small JS & CSS library for
  scroll animations.

<!-- /atelier-packages -->

Each package keeps its own README with installation, usage, API, and release
documentation.

## Development

Atelier is an npm workspace with one Astro 7 documentation site in `apps/docs`.
Install dependencies with `npm install`, then use the tasks below.

### Tasks

- `npm run dev`
    - Start the documentation site locally.
- `npm run build`
    - Build the packages and the documentation site.
- `npm test`
    - Run the package and Jukette test suites.
- `npm run lint`
    - Check the workspace lint configuration.
- `npm run format:check`
    - Check the shared formatting configuration.

Pass Astro arguments after `--`:

```sh
npm run dev -- --host 0.0.0.0
```

### Publishing

- `npm run docs:publish`
    - Build the site into the deployment worktree, commit it, deploy it with
      rsdeploy, and push the deployment branch.
- `npm run release:jukette:dry-run`
    - Validate the coordinated Jukette release without publishing.

## Licence

Individual packages retain their own licence files and terms.
