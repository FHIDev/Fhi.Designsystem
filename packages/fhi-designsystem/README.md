# Fhi.Designsystem

## Bidragsguide

### Installering
1. Last ned og installer [Node LTS](https://nodejs.org/en) og [pnpm](https://pnpm.io/installation) om ikke du har de installert fra før
2. kjør `pnpm i`
3. kjør `pnpm exec playwright install`

#### Utvikling
1. kjør `pnpm storybook`

#### Testing
1. kjør `pnpm test`

#### Bygg
1. kjør `pnpm build`
   - Om du har lagt til en ny komponent;
     - pass på at komponenten er referert i `build.lib.entry` objektet inni `npm` caset i `vite.config.js`.
     - pass på at den blir eksportert i `entry.ts` filen.
