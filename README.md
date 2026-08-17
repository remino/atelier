# Atelier

Rémino’s monorepo for publishable JavaScript libraries and their shared Astro
documentation site.

Atelier v0.1.0

By Rémino Rem  
<https://remino.net/>

[Docs](https://remino.net/) |
[Code Repo](https://github.com/remino/atelier)

---

<!-- mtoc-start -->

- [Packages](#packages)
- [Documentation](#documentation)
- [Development](#development)
- [Repository layout](#repository-layout)
- [Contributing](#contributing)
- [Licence](#licence)

<!-- mtoc-end -->

---

## Packages

Atelier contains independently versioned npm packages:

- `dactylo`: typography and text utilities.
- `paradimg`: browser-side image URL modifiers.
- `remarqueeble`: a custom element tribute to `<marquee>`.
- `scrollerful`: scroll-driven web components.
- `@remino/jukette-*`: the Jukette audio, MIDI, SoundCloud, and core packages.

Each package keeps its own README with installation, usage, API, and release
documentation.

[Back to top](#)

---

## Documentation

The single Astro 7 site lives in `apps/docs`. Library sites retain their public
paths:

- <https://remino.net/dactylo/>
- <https://remino.net/jukette/>
- <https://remino.net/paradimg/>
- <https://remino.net/remarqueeble/>
- <https://remino.net/scrollerful/>

Shared navigation, fonts, and other site assets are supplied through the
environment-configured middleware proxy.

[Back to top](#)

---

## Development

```sh
npm install
npm run dev
npm run build
```

Pass Astro arguments after `--`:

```sh
npm run dev -- --host 0.0.0.0
```

Useful checks:

```sh
npm run typecheck
npm test
npm run lint
npm run format:check
```

[Back to top](#)

---

## Repository layout

- `packages/` contains the publishable workspaces.
- `apps/docs/` contains the merged documentation site.
- `bin/` contains shared Jukette build and release helpers.

[Back to top](#)

---

## Contributing

Install dependencies, run the checks above, and keep package-specific changes
inside the relevant workspace. Update the package README when changing a
library’s public API.

[Back to top](#)

---

## Licence

Individual packages retain their own licence files and terms.

[Back to top](#)
