# Fhi.Designsystem

## Bidragsguide (under arbeid)

### installasjon
1. kjør `pnpm i`
3. kjør `pnpm exec playwright install`

- #### Utvikling
  2. kjør `pnpm storybook`

- #### Testing
  2. kjør `pnpm test`

- #### Bygg
  2. kjør `pnpm build`
     - Om du har lagt til en ny komponent;
       - pass på at komponenten er referert i `build.lib.entry` objektet inni `npm` case-et i `vite.config.js`.
       - pass på at den blir eksportert i `entry.ts` filen.
