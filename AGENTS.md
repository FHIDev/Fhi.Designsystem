# FHI Designsystem Agent Guidelines

**Important:** [CONTRIBUTING.md](./CONTRIBUTING.md) is the source of truth for the development environment, [code standard](./CONTRIBUTING.md#kodestandard), [testing](./CONTRIBUTING.md#testdekning) and [component development](./CONTRIBUTING.md#hvordan-utvikle-en-ny-komponent). Follow it.

Additional rules for agents:

- Use existing components as implementation examples. Keep changes focused on the requested behavior.
- When composing markup (in components, stories, docs or examples), use existing design system components instead of native HTML elements where one exists. For example, use `<fhi-body>` instead of `<p>`, `<fhi-headline>`/`<fhi-title>` instead of `<h1>`–`<h6>`, `<fhi-button>` instead of `<button>`, `<fhi-link>` instead of `<a>`, and `<fhi-flex>`/`<fhi-grid>` for layout.
- If a breaking change to a public API seems necessary, flag it to the user instead of making it.
