import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiButtonSelector = 'fhi-button';

export type FhiButtonProps = Pick<
  FhiButton,
  'color' | 'variant' | 'disabled' | 'size'
>;

/**
 * Button component
 *
 * @tag fhi-button
 *
 * @slot contains the content of the button
 *
 */
@customElement(FhiButtonSelector)
export class FhiButton extends LitElement {
  /**
   * Bestemmer fargen på knappen.
   * @default 'accent'
   */
  @property({ type: String, reflect: true }) color:
    | 'accent'
    | 'neutral'
    | 'danger' = 'accent';

  /**
   * Bestemmer varianten av knappen.
   * @default 'strong'
   */
  @property({ type: String, reflect: true }) variant:
    | 'strong'
    | 'subtle'
    | 'outlined'
    | 'text' = 'strong';

  /**
   * Bestemmer størrelsen på knappen.
   * @default 'medium'
   */
  @property({ type: String, reflect: true }) size?:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  /**
   * Bestemmer om knappen er tilgjengelig.
   * @deafult false
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: String, reflect: true }) type?:
    | 'button'
    | 'submit'
    | 'reset';

  /*  private _formButton!: HTMLButtonElement;
  private _form!: HTMLFormElement | null;

  private _handleClick(event: MouseEvent): void {
    if (
      (this.type === 'submit' || this.type === 'reset') &&
      this._form &&
      !event.defaultPrevented
    ) {
      this._formButton.type = this.type;
      this._form?.appendChild(this._formButton);
      this._formButton.click();
      this._form?.removeChild(this._formButton);
    }
  }

  protected override firstUpdated(): void {
    this._formButton = document.createElement('button');
    this.addEventListener('click', this._handleClick);
  } */

  render() {
    return html`<button ?disabled=${this.disabled} type=${ifDefined(this.type)}>
      <slot></slot>
    </button>`;
  }

  // An alternative compnent aarchitecture: two extra files.
  // I don't have a strong opinion on this, but I coulden't figure out how to collaps ":host {}" ;)
  //
  // static styles = [ComponentTokens, ComponentStyles];

  static styles = css`
    :host {
      /**
       * Color
       */

      /* Accent: strong */
      --background-color-accent-strong-default: var(--fhi-color-accent-base);
      --background-color-accent-strong-hover: var(
        --fhi-color-accent-base-hover
      );
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
      --border-color-neutral-strong-active: var(
        --fhi-color-neutral-base-active
      );
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

    /* Default button styling (accent - strong - medium) */
    :host button {
      align-items: center;
      background-color: var(--background-color-accent-strong-default);
      border-radius: var(--border-radius);
      border: var(--border-width) solid
        var(--border-color-accent-strong-default);
      color: var(--color-accent-strong);
      cursor: pointer;
      display: inline-flex;
      font: var(--font);
      gap: var(--gap-medium);
      justify-content: center;
      letter-spacing: var(--letter-spacing);
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
      gap: var(--gap-small);
      padding: var(--padding-small);
    }

    :host([size='large']) button {
      font: var(--font-large);
      gap: var(--gap-large);
      letter-spacing: var(--letter-spacing-large);
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

    /* 
    :host {
      --component-border-radius: var(--fhi-border-radius-full);
      --component-font-family: var(--fhi-font-family-roboto-flex);
      --component-transition: var(--fhi-duration-quick)
        cubic-bezier(var(--fhi-ease-default));

      --component-label-large-letter-spacing: var(
        --fhi-typography-label-large-letter-spacing
      );
      --component-label-medium-letter-spacing: var(
        --fhi-typography-label-medium-letter-spacing
      );
      --component-label-small-letter-spacing: var(
        --fhi-typography-label-small-letter-spacing
      );
      --component-label-large-line-height: var(
        --fhi-typography-label-large-line-height
      );
      --component-label-medium-line-height: var(
        --fhi-typography-label-medium-line-height
      );
      --component-label-small-line-height: var(
        --fhi-typography-label-medium-line-height
      );

      --component-padding-large: var(--fhi-spacing-200) var(--fhi-spacing-300)
        var(--fhi-spacing-200) var(--fhi-spacing-300);
      --component-padding-medium: var(--fhi-spacing-100) var(--fhi-spacing-200)
        var(--fhi-spacing-100) var(--fhi-spacing-200);
      --component-padding-small: var(--fhi-spacing-050) var(--fhi-spacing-150)
        var(--fhi-spacing-050) var(--fhi-spacing-150);

      --component-accent-strong-background-color: var(--fhi-color-accent-base);
      --component-accent-strong-border-color: var(--fhi-color-accent-base);
      --component-accent-strong-color: var(--fhi-color-accent-text-inverted);
      --component-accent-strong-background-color-hover: var(
        --fhi-color-accent-base-hover
      );
      --component-accent-strong-border-color-hover: var(
        --fhi-color-accent-base-hover
      );
      --component-accent-strong-background-color-active: var(
        --fhi-color-accent-base-active
      );

      --component-accent-strong-border-color-active: var(
        --fhi-color-accent-base-hover
      );
      --component-accent-strong-background-color-disabled: var(
        --fhi-color-accent-base
      );
      --component-accent-strong-border-color-disabled: var(
        --fhi-color-accent-base
      );

      --component-accent-subtle-background-color: var(
        --fhi-color-accent-surface
      );
      --component-accent-subtle-border-color: var(--fhi-color-accent-surface);
      --component-accent-subtle-color: var(--fhi-color-accent-text-subtle);
      --component-accent-subtle-background-color-hover: var(
        --fhi-color-accent-surface-hover
      );
      --component-accent-subtle-border-color-hover: var(
        --fhi-color-accent-surface-hover
      );
      --component-accent-subtle-background-color-active: var(
        --fhi-color-accent-surface-active
      );
      --component-accent-subtle-border-color-active: var(
        --fhi-color-accent-surface-active
      );
      --component-accent-subtle-background-color-disabled: var(
        --fhi-color-accent-surface
      );
      --component-accent-subtle-border-color-disabled: var(
        --fhi-color-accent-surface
      );

      --component-accent-outlined-background-color: transparent;
      --component-accent-outlined-border-color: var(--fhi-color-accent-border);
      --component-accent-outlined-color: var(--fhi-color-accent-text-subtle);
      --component-accent-outlined-background-color-hover: var(
        --fhi-color-accent-surface
      );
      --component-accent-outlined-border-color-hover: var(
        --fhi-color-accent-surface
      );
      --component-accent-outlined-background-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --component-accent-outlined-border-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --component-accent-outlined-background-color-disabled: transparent;
      --component-accent-outlined-border-color-disabled: var(
        --fhi-color-surface-base
      );

      --component-accent-text-background-color: transparent;
      --component-accent-text-border-color: transparent;
      --component-accent-text-color: var(--fhi-color-accent-text-subtle);
      --component-accent-text-background-color-hover: var(
        --fhi-color-accent-surface
      );
      --component-accent-text-border-color-hover: var(
        --fhi-color-accent-surface
      );
      --component-accent-text-color-hover: var(--fhi-color-accent-text);
      --component-accent-text-background-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --component-accent-text-border-color-active: var(
        --fhi-color-accent-surface-hover
      );
      --component-accent-text-background-color-disabled: transparent;
      --component-accent-text-border-color-disabled: transparent;
      --component-accent-text-color-disabled: var(--fhi-color-accent-text);

      --component-neutral-strong-background-color: var(
        --fhi-color-neutral-base
      );
      --component-neutral-strong-border-color: var(--fhi-color-neutral-base);
      --component-neutral-strong-color: var(--fhi-color-neutral-text-inverted);
      --component-neutral-strong-background-color-hover: var(
        --fhi-color-neutral-base-hover
      );
      --component-neutral-strong-border-color-hover: var(
        --fhi-color-neutral-base-hover
      );
      --component-neutral-strong-background-color-active: var(
        --fhi-color-neutral-base-active
      );
      --component-neutral-strong-border-color-active: var(
        --fhi-color-neutral-base-hover
      );
      --component-neutral-strong-background-color-disabled: var(
        --fhi-color-neutral-base
      );
      --component-neutral-strong-border-color-disabled: var(
        --fhi-color-neutral-base
      );

      --component-neutral-subtle-background-color: var(
        --fhi-color-neutral-surface
      );
      --component-neutral-subtle-border-color: var(--fhi-color-neutral-surface);
      --component-neutral-subtle-color: var(--fhi-color-neutral-text-subtle);
      --component-neutral-subtle-background-color-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --component-neutral-subtle-border-color-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --component-neutral-subtle-background-color-active: var(
        --fhi-color-neutral-surface-active
      );
      --component-neutral-subtle-border-color-active: var(
        --fhi-color-neutral-surface-active
      );
      --component-neutral-subtle-background-color-disabled: var(
        --fhi-color-neutral-surface
      );
      --component-neutral-subtle-border-color-disabled: var(
        --fhi-color-neutral-surface
      );

      --component-neutral-outlined-background-color: transparent;
      --component-neutral-outlined-border-color: var(
        --fhi-color-neutral-border
      );
      --component-neutral-outlined-color: var(--fhi-color-neutral-text-subtle);
      --component-neutral-outlined-background-color-hover: var(
        --fhi-color-neutral-surface
      );
      --component-neutral-outlined-border-color-hover: var(
        --fhi-color-neutral-surface
      );
      --component-neutral-outlined-background-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --component-neutral-outlined-border-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --component-neutral-outlined-background-color-disabled: transparent;
      --component-neutral-outlined-border-color-disabled: var(
        --fhi-color-surface-base
      );

      --component-neutral-text-background-color: transparent;
      --component-neutral-text-border-color: transparent;
      --component-neutral-text-color: var(--fhi-color-neutral-text-subtle);
      --component-neutral-text-background-color-hover: var(
        --fhi-color-neutral-surface
      );
      --component-neutral-text-border-color-hover: var(
        --fhi-color-neutral-surface
      );
      --component-neutral-text-color-hover: var(--fhi-color-neutral-text);
      --component-neutral-text-background-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --component-neutral-text-border-color-active: var(
        --fhi-color-neutral-surface-hover
      );
      --component-neutral-text-color-active: var(--fhi-color-neutral-text);
      --component-neutral-text-background-color-disabled: transparent;
      --component-neutral-text-border-color-disabled: transparent;

      --component-danger-strong-background-color: var(--fhi-color-danger-base);
      --component-danger-strong-border-color: var(--fhi-color-danger-base);
      --component-danger-strong-color: var(--fhi-color-danger-text-inverted);
      --component-danger-strong-background-color-hover: var(
        --fhi-color-danger-base-hover
      );
      --component-danger-strong-border-color-hover: var(
        --fhi-color-danger-base-hover
      );
      --component-danger-strong-background-color-active: var(
        --fhi-color-danger-base-active
      );
      --component-danger-strong-border-color-active: var(
        --fhi-color-danger-base-hover
      );
      --component-danger-strong-background-color-disabled: var(
        --fhi-color-danger-base
      );
      --component-danger-strong-border-color-disabled: var(
        --fhi-color-danger-base
      );

      --component-danger-subtle-background-color: var(
        --fhi-color-danger-surface
      );
      --component-danger-subtle-border-color: var(--fhi-color-danger-surface);
      --component-danger-subtle-color: var(--fhi-color-danger-text-subtle);
      --component-danger-subtle-background-color-hover: var(
        --fhi-color-danger-surface-hover
      );
      --component-danger-subtle-border-color-hover: var(
        --fhi-color-danger-surface-hover
      );
      --component-danger-subtle-background-color-active: var(
        --fhi-color-danger-surface-active
      );
      --component-danger-subtle-border-color-active: var(
        --fhi-color-danger-surface-active
      );
      --component-danger-subtle-background-color-disabled: var(
        --fhi-color-danger-surface
      );
      --component-danger-subtle-border-color-disabled: var(
        --fhi-color-danger-surface
      );

      --component-danger-outlined-background-color: transparent;
      --component-danger-outlined-border-color: var(--fhi-color-danger-border);
      --component-danger-outlined-color: var(--fhi-color-danger-text-subtle);
      --component-danger-outlined-background-color-hover: var(
        --fhi-color-danger-surface
      );
      --component-danger-outlined-border-color-hover: var(
        --fhi-color-danger-surface
      );
      --component-danger-outlined-background-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --component-danger-outlined-border-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --component-danger-outlined-background-color-disabled: transparent;
      --component-danger-outlined-border-color-disabled: var(
        --fhi-color-surface-base
      );

      --component-danger-text-background-color: transparent;
      --component-danger-text-border-color: transparent;
      --component-danger-text-color: var(--fhi-color-danger-text-subtle);
      --component-danger-text-background-color-hover: var(
        --fhi-color-danger-surface
      );
      --component-danger-text-border-color-hover: var(
        --fhi-color-danger-surface
      );
      --component-danger-text-color-hover: var(--fhi-color-danger-text);
      --component-danger-text-background-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --component-danger-text-border-color-active: var(
        --fhi-color-danger-surface-hover
      );
      --component-danger-text-color-active: var(--fhi-color-danger-text);
      --component-danger-text-background-color-disabled: transparent;
      --component-danger-text-border-color-disabled: transparent;
      --component-danger-text-color-disabled: var(
        --fhi-color-danger-text-subtle
      );

      button {
        border-radius: var(--component-border-radius);
        border: solid var(--fhi-border-width);
        font-family: var(--component-font-family);

        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: var(--component-transition);

        cursor: pointer;
        &:disabled {
          opacity: var(--fhi-opacity-disabled);
          cursor: not-allowed;
        }
      }
    }

    :host([size='large']) button {
      font-size: var(--component-label-large-font-size);
      font-weight: var(--component-label-large-font-weight);
      line-height: var(--component-label-large-line-height);
      letter-spacing: var(--component-label-large-letter-spacing);

      padding: var(--component-padding-large);
      gap: var(--fhi-spacing-100);
    }

    :host([size='medium']) button {
      font-size: var(--component-label-medium-font-size);
      font-weight: var(--component-label-medium-font-weight);
      line-height: var(--component-label-medium-line-height);
      letter-spacing: var(--component-label-medium-letter-spacing);

      padding: var(--component-padding-medium);
      gap: var(--fhi-spacing-050);
    }

    :host([size='small']) button {
      font-size: var(--fhi-tyopgraphy-label-small-font-size);
      font-weight: var(--component-label-small-font-weight);
      line-height: var(--component-label-small-line-height);
      letter-spacing: var(--component-label-small-letter-spacing);
      padding: var(--component-padding-small);
      gap: var(--fhi-spacing-0);
    }

    :host([color='accent'][variant='strong']) button {
      background-color: var(--component-accent-strong-background-color);
      border-color: var(--component-accent-strong-border-color);
      color: var(--component-accent-strong-color);
      &:hover {
        background-color: var(--component-accent-strong-background-color-hover);
        border-color: var(--component-accent-strong-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-accent-strong-background-color-active
        );
        border-color: var(--component-accent-strong-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-accent-strong-background-color-disabled
        );
        border-color: var(--component-accent-strong-border-color-disabled);
      }
    }

    :host([color='accent'][variant='subtle']) button {
      background-color: var(--component-accent-subtle-background-color);
      border-color: var(--component-accent-subtle-border-color);
      color: var(--component-accent-subtle-color);
      &:hover {
        background-color: var(--component-accent-subtle-background-color-hover);
        border-color: var(--component-accent-subtle-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-accent-subtle-background-color-active
        );
        border-color: var(--component-accent-subtle-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-accent-subtle-background-color-disabled
        );
        border-color: var(--component-accent-subtle-border-color-disabled);
      }
    }

    :host([color='accent'][variant='outlined']) button {
      background-color: var(--component-accent-outlined-background-colort);
      border-color: var(--component-accent-outlined-border-color);
      color: var(--component-accent-outlined-color);
      &:hover {
        background-color: var(
          --component-accent-outlined-background-color-hover
        );
        border-color: var(--component-accent-outlined-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-accent-outlined-background-color-active
        );
        border-color: var(--component-accent-outlined-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-accent-outlined-background-color-disabled
        );
        border-color: var(--component-accent-outlined-border-color-disabled);
      }
    }

    :host([color='accent'][variant='text']) button {
      background-color: var(--component-accent-text-background-color);
      border-color: var(--component-accent-text-border-color);
      color: var(--component-accent-text-color);
      &:hover {
        background-color: var(--component-accent-text-background-color-hover);
        border-color: var(--component-accent-text-border-color-hover);
        color: var(--component-accent-text-color-hover);
      }
      &:active {
        background-color: var(--component-accent-text-background-color-active);
        border-color: var(--component-accent-text-border-color-active);
        color: var(--component-accent-text-color-active);
      }
      &:disabled {
        background-color: var(
          --component-accent-text-background-color-disabled
        );
        border-color: var(--component-accent-text-border-color-disabled);
        color: var(--component-accent-text-color-disabled);
      }
    }

    :host([color='neutral'][variant='strong']) button {
      background-color: var(--component-neutral-strong-background-color);
      border-color: var(--component-neutral-strong-border-color);
      color: var(--component-neutral-strong-color);
      &:hover {
        background-color: var(
          --component-neutral-strong-background-color-hover
        );
        border-color: var(--component-neutral-strong-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-neutral-strong-background-color-active
        );
        border-color: var(--component-neutral-strong-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-neutral-strong-background-color-disabled
        );
        border-color: var(--component-neutral-strong-border-color-disabled);
      }
    }

    :host([color='neutral'][variant='subtle']) button {
      background-color: var(--component-neutral-subtle-background-color);
      border-color: var(--component-neutral-subtle-border-color);
      color: var(--component-neutral-subtle-color);
      &:hover {
        background-color: var(
          --component-neutral-subtle-background-color-hover
        );
        border-color: var(--component-neutral-subtle-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-neutral-subtle-background-color-active
        );
        border-color: var(--component-neutral-subtle-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-neutral-subtle-background-color-disabled
        );
        border-color: var(--component-neutral-subtle-border-color-disabled);
      }
    }

    :host([color='neutral'][variant='outlined']) button {
      background-color: var(--component-neutral-outlined-background-colort);
      border-color: var(--component-neutral-outlined-border-color);
      color: var(--component-neutral-outlined-color);
      &:hover {
        background-color: var(
          --component-neutral-outlined-background-color-hover
        );
        border-color: var(--component-neutral-outlined-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-neutral-outlined-background-color-active
        );
        border-color: var(--component-neutral-outlined-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-neutral-outlined-background-color-disabled
        );
        border-color: var(--component-neutral-outlined-border-color-disabled);
      }
    }

    :host([color='neutral'][variant='text']) button {
      background-color: var(--component-neutral-text-background-color);
      border-color: var(--component-neutral-text-border-color);
      color: var(--component-neutral-text-color);
      &:hover {
        background-color: var(--component-neutral-text-background-color-hover);
        border-color: var(--component-neutral-text-border-color-hover);
        color: var(--component-neutral-text-color-hover);
      }
      &:active {
        background-color: var(--component-neutral-text-background-color-active);
        border-color: var(--component-neutral-text-border-color-active);
        color: var(--component-neutral-text-color-active);
      }
      &:disabled {
        background-color: var(
          --component-neutral-text-background-color-disabled
        );
        border-color: var(--component-neutral-text-border-color-disabled);
        color: var(--component-neutral-text-color-disabled);
      }
    }

    :host([color='danger'][variant='strong']) button {
      background-color: var(--component-danger-strong-background-color);
      border-color: var(--component-danger-strong-border-color);
      color: var(--component-danger-strong-color);
      &:hover {
        background-color: var(--component-danger-strong-background-color-hover);
        border-color: var(--component-danger-strong-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-danger-strong-background-color-active
        );
        border-color: var(--component-danger-strong-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-danger-strong-background-color-disabled
        );
        border-color: var(--component-danger-strong-border-color-disabled);
      }
    }

    :host([color='danger'][variant='subtle']) button {
      background-color: var(--component-danger-subtle-background-color);
      border-color: var(--component-danger-subtle-border-color);
      color: var(--component-danger-subtle-color);
      &:hover {
        background-color: var(--component-danger-subtle-background-color-hover);
        border-color: var(--component-danger-subtle-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-danger-subtle-background-color-active
        );
        border-color: var(--component-danger-subtle-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-danger-subtle-background-color-disabled
        );
        border-color: var(--component-danger-subtle-border-color-disabled);
      }
    }

    :host([color='danger'][variant='outlined']) button {
      background-color: var(--component-danger-outlined-background-colort);
      border-color: var(--component-danger-outlined-border-color);
      color: var(--component-danger-outlined-color);
      &:hover {
        background-color: var(
          --component-danger-outlined-background-color-hover
        );
        border-color: var(--component-danger-outlined-border-color-hover);
      }
      &:active {
        background-color: var(
          --component-danger-outlined-background-color-active
        );
        border-color: var(--component-danger-outlined-border-color-active);
      }
      &:disabled {
        background-color: var(
          --component-danger-outlined-background-color-disabled
        );
        border-color: var(--component-danger-outlined-border-color-disabled);
      }
    }

    :host([color='danger'][variant='text']) button {
      background-color: var(--component-danger-text-background-color);
      border-color: var(--component-danger-text-border-color);
      color: var(--component-danger-text-color);
      &:hover {
        background-color: var(--component-danger-text-background-color-hover);
        border-color: var(--component-danger-text-border-color-hover);
        color: var(--component-danger-text-color-hover);
      }
      &:active {
        background-color: var(--component-danger-text-background-color-active);
        border-color: var(--component-danger-text-border-color-active);
        color: var(--component-danger-text-color-active);
      }
      &:disabled {
        background-color: var(
          --component-danger-text-background-color-disabled
        );
        border-color: var(--component-danger-text-border-color-disabled);
        color: var(--component-danger-text-color-disabled);
      }
    }
 */
  `;
}
