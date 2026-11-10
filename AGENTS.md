# FHI Designsystem Agent Guidelines

## Repository

- This is a pnpm monorepo.
- all projects are located in the `packages/` folder.
- IMPORTANT: Follow `CONTRIBUTING.md` for contribution, naming, testing, and component
  development requirements.
- Use nearby components as the primary implementation examples and keep changes
  focused on the requested behavior.

## Components

- Components are Lit web components written in TypeScript.
- Write code and public API names in English, except established domain terms.
- Prefer native web semantics and behavior. Deviate from web standards only
  when the component requirements make it necessary.
- Preserve accessibility, keyboard interaction, focus behavior, and assistive
  technology semantics when changing components.
- Use FHI design tokens for visual values, preferring semantic tokens over
  primitive tokens. Avoid hardcoded colors, spacing, typography, and borders
  when a suitable token exists.
- Preserve existing public APIs unless the task explicitly requires a breaking
  change.

## Tests And Documentation

- Every component must have unit tests.
- Add or update tests for changed public properties and attributes, reflection,
  validation and error handling, events, accessibility, and user interactions
  where applicable.
- Update stories and MDX documentation when public behavior or usage changes.
