import { css } from 'lit';

export const ComponentTokens = css`
  :host {
    /**
     * Color
     */

    /* Accent: strong */
    --background-color-accent-strong-default: var(--fhi-color-accent-base);
    --background-color-accent-strong-hover: var(--fhi-color-accent-base-hover);
    --background-color-accent-strong-active: var(
      --fhi-color-accent-base-active
    );
    --border-color-accent-strong-default: var(--fhi-color-accent-base);
    --border-color-accent-strong-hover: var(--fhi-color-accent-base-hover);
    --border-color-accent-strong-active: var(--fhi-color-accent-base-active);
    --color-accent-strong: var(--fhi-color-accent-text-inverted);

    /* Accent: subtle */
    /* Accent: outlined */
    /* Accent: text */

    /* Neutral: strong */
    --background-color-neutral-strong-default: var(--fhi-color-neutral-base);
    --background-color-neutral-strong-hover: var(
      --fhi-color-neutral-base-hover
    );
    --background-color-neutral-strong-active: var(
      --fhi-color-neutral-base-active
    );
    --border-color-neutral-strong-default: var(--fhi-color-neutral-base);
    --border-color-neutral-strong-hover: var(--fhi-color-neutral-base-hover);
    --border-color-neutral-strong-active: var(--fhi-color-neutral-base-active);
    --color-neutral-strong: var(--fhi-color-neutral-text-inverted);

    /* Neutral: subtle */
    /* Neutral: outlined */
    /* Neutral: text */

    /* Danger: strong */
    /* Danger: subtle */
    /* Danger: outlined */
    /* Danger: text */

    /**
     * Typography
     */

    /* Size small & medium */
    --font: var(--fhi-typography-label-medium-font-weight)
      var(--fhi-typography-label-medium-font-size) /
      var(--fhi-typography-label-medium-line-height)
      var(--fhi-font-family-roboto-flex);
    --letter-spacing: var(--fhi-typography-label-medium-letter-spacing);

    /* Size large */
    --font-large: var(--fhi-typography-label-large-font-weight)
      var(--fhi-typography-label-large-font-size) /
      var(--fhi-typography-label-large-line-height)
      var(--fhi-font-family-roboto-flex);
    --letter-spacing-large: var(--fhi-typography-label-large-letter-spacing);

    /**
     * Dimensions
     */

    --border-radius: var(--fhi-border-radius-full);
    --border-width: var(--fhi-border-width);

    /* Size small */
    --gap-small: var(--fhi-spacing-0);
    --padding-small: calc(var(--fhi-spacing-050) - var(--fhi-border-width))
      var(--fhi-spacing-150);

    /* Size medium */
    --gap-medium: var(--fhi-spacing-050);
    --padding-medium: calc(var(--fhi-spacing-100) - var(--fhi-border-width))
      var(--fhi-spacing-200);

    /* Size large */
    --gap-large: var(--fhi-spacing-100);
    --padding-large: calc(var(--fhi-spacing-200) - var(--fhi-border-width))
      var(--fhi-spacing-300);

    /**
     * Motion
     */

    --transition: all var(--fhi-duration-quick) var(--fhi-ease-default);

    /**
     * Opacity
     */
    --opacity-disabled: var(--fhi-opacity-disabled);
  }
`;
