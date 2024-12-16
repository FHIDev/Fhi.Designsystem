# FHI Designsystem

## Kom i gang

### Installering av Node og pnpm

Om du mangler begge, eller en av dem på din maskin:

- Last ned og installer [Node](https://nodejs.org/en)
- Last ned og installer [pnpm](https://pnpm.io/installation)

### Jobbe i lokalt miljø

*Alle kommandoer kjøres fra samme folder som denne README-en.*

#### Installering

1. Kjør `pnpm i`
2. Kjør `pnpm exec playwright install`

#### Utvikling

Kjør `pnpm storybook`

#### Testing

Kjør `pnpm test`

#### Bygg

Kjør `pnpm build`

#### Nye komponenter

Om du har lagt til en ny komponent, pass på at den:

- er referert i `build.lib.entry` objektet inne i "switch case"-en `npm`, i filen `./vite.config.js`
- blir eksportert i filen `./library.ts`

Mer informasjon om hvordan opprette nye komponenter finnes i vår ["Hvordan hjelpe til"](../../CONTRIBUTING.md#hvordan-utvikle-en-ny-komponent)-guide.
