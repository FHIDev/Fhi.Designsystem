import { css } from 'lit';

export const ComponentStyles = css`
  :host button {
    background-color: var(--background-color-accent-strong-default);
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--border-color-accent-strong-default);
    color: var(--color-accent-strong);
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    letter-spacing: var(--letter-spacing);
    line-height: var(--line-height);
    padding: var(--padding-medium);
    transition: var(--transition);

    &:active:not(:disabled) {
      background-color: var(--background-color-accent-strong-active);
      border-color: var(--border-color-accent-active);
    }

    &:hover:not(:disabled) {
      background-color: var(--background-color-accent-strong-hover);
      border-color: var(--border-color-accent-strong-hover);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: var(--opacity-disabled);
    }
  }

  /* Sizes */

  :host([size='small']) button {
    padding: var(--padding-small);
  }

  :host([size='large']) button {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-large);
    letter-spacing: var(--letter-spacing-large);
    line-height: var(--line-height-large);
    padding: var(--padding-large);
  }

  /* Colors */

  :host([color='neutral'][variant='strong']) button {
    background-color: var(--background-color-neutral-strong-default);
    border-color: var(--border-color-neutral-strong-default);
    color: var(--color-neutral-strong);

    &:hover:not(:disabled) {
      background-color: var(--background-color-neutral-strong-hover);
      border-color: var(--border-color-neutral-strong-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--background-color-neutral-strong-hover);
      border-color: var(--border-color-neutral-strong-hover);
    }
  }
`;
