# Fhi.Designsystem

## Contributing Guide (wip)

### Intallation
1. run `pnpm i`
3. run `pnpm exec playwright install`

- #### Development
  2. run `pnpm storybook`

- #### Testing
  2. run `pnpm test`

- #### Build
  2. run `pnpm build`
     - if you have added a new component;
       - make sure it is listed in the `build.lib.entry` object in the `npm` case in `vite.config.js`.
       - make sure it is exported in the `entry.ts` files.
