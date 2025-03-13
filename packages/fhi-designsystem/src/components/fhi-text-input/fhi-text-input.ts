import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiTextInputSelector = 'fhi-text-input';

export type FhiTextInputProps = Pick<
  FhiTextInput,
  | 'name'
  | 'label'
  | 'message'
  | 'status'
  | 'required'
  | 'readonly'
  | 'disabled'
  | 'placeholder'
  | 'value'
>;

@customElement(FhiTextInputSelector)
export class FhiTextInput extends LitElement {
  @property({ type: String }) name = undefined;

  @property({ type: String }) label? = undefined;

  @property({ type: String }) message? = undefined;

  @property({ type: String, reflect: true }) status?:
    | 'error'
    | 'disabled'
    | 'read-only' = undefined;

  @property({ type: Boolean }) required? = false;

  @property({ type: Boolean }) readonly? = false;

  @property({ type: Boolean }) disabled? = false;

  @property({ type: String }) placeholder? = null;

  @property({ type: String, reflect: true }) value? = null;

  render() {
    return html`
      ${this.label && html`<label for="input-element">${this.label}</label>`}
      <input
        id="input-element"
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        .value=${this.value}
        ?required=${this.required}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        fhi-status=${ifDefined(this.status)}
      />
      ${this.message ? html`<p>${this.message}</p>` : ''}
    `;
  }

  static styles = css`
    :host {
      --typography-font-family: var(--fhi-font-family-roboto-flex);
      --dimension-gap: var(--fhi-spacing-100);

      --opacity-disabled: var(--fhi-opacity-disabled);

      /* label */
      --color-label-text: var(--fhi-color-neutral-text);
      --color-label-text-error: var(--fhi-color-danger-text);

      --typography-label-font-weight: var(
        --fhi-typography-label-small-font-weight
      );
      --typography-label-font-size: var(--fhi-typography-label-small-font-size);
      --typography-label-line-height: var(
        --fhi-typography-label-small-line-height
      );
      --typography-label-letter-spacing: var(
        --fhi-typography-label-small-letter-spacing
      );

      /* input */
      --color-input-placeholder: var(--fhi-color-neutral-base);
      --color-input-text: var(--fhi-color-neutral-text);
      --color-input-text-error: var(--fhi-color-danger-text);
      --color-input-background: var(--fhi-color-neutral-background);
      --color-input-background-active: var(--fhi-color-accent-background);
      --color-input-background-hover: var(--fhi-color-accent-background-subtle);
      --color-input-background-error: var(--fhi-color-danger-background);
      --color-input-border: var(--fhi-color-neutral-border);
      --color-input-border-hover: var(--fhi-color-accent-border);
      --color-input-border-active: var(--fhi-color-accent-border-strong);
      --color-input-border-error: var(--fhi-color-danger-border-strong);
      --color-input-border-disabled: var(--fhi-color-neutral-border);

      --typography-input-font-weight: var(
        --fhi-typography-body-medium-font-weight
      );
      --typography-input-font-size: var(--fhi-typography-body-medium-font-size);
      --typography-input-line-height: var(
        --fhi-typography-body-medium-line-height
      );
      --typography-input-letter-spacing: var(
        --fhi-typography-body-medium-letter-spacing
      );

      --dimension-border-width: var(--fhi-dimension-border-width);

      --dimension-input-height: var(--fhi-spacing-500);
      --dimension-input-border-radius: var(--fhi-border-radius-050);
      --dimension-input-padding-left: var(--fhi-spacing-150);
      --dimension-input-padding-right: var(--fhi-spacing-150);

      /* message */
      --color-message-text: var(--fhi-color-neutral-text);
      --color-message-text-error: var(--fhi-color-danger-text-subtle);

      --typography-message-font-weight: var(
        --fhi-typography-body-small-font-weight
      );
      --typography-message-font-size: var(
        --fhi-typography-body-small-font-size
      );
      --typography-message-line-height: var(
        --fhi-typography-body-small-line-height
      );
      --typography-message-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );
    }

    :host {
      display: grid;
      gap: var(--dimension-gap);
      font-family: var(--typography-font-family);

      label {
        font-weight: var(--typography-label-font-weight);
        font-size: var(--typography-label-font-size);
        line-height: var(--typography-label-line-height);
        letter-spacing: var(--typography-label-letter-spacing);
        color: var(--color-label-text);
      }

      input {
        box-sizing: border-box;
        height: var(--dimension-input-height);
        border: var(--dimension-border-width) solid var(--color-input-border);
        border-radius: var(--dimension-input-border-radius);
        padding: 0 var(--dimension-input-padding-right) 0
          var(--dimension-input-padding-left);
        color: var(--color-input-text);
        background-color: var(--color-input-background);
        font-weight: var(--typography-input-font-weight);
        font-size: var(--typography-input-font-size);
        line-height: var(--typography-input-line-height);
        letter-spacing: var(--typography-input-letter-spacing);
        transition: all var(--fhi-motion-ease-default)
          var(--fhi-motion-duration-quick);
        &:hover {
          border-color: var(--color-input-border-hover);
          background-color: var(--color-input-background-hover);
        }
        &:focus {
          border-color: var(--color-input-border-active);
          background-color: var(--color-input-background-active);
        }
        &::placeholder {
          color: var(--color-input-placeholder);
        }
      }

      p {
        margin: unset;
        color: var(--color-message-text);
        font-weight: var(--typography-message-font-weight);
        font-size: var(--typography-message-font-size);
        line-height: var(--typography-message-line-height);
        letter-spacing: var(--typography-message-letter-spacing);
      }
    }

    :host([disabled]) {
      opacity: var(--fhi-opacity-disabled);
      cursor: not-allowed;
      * {
        cursor: not-allowed;
      }
      input {
        &:hover {
          border-color: var(--color-input-border);
          background-color: var(--color-input-background);
        }
      }
    }

    :host([readonly]:not([disabled])) {
      input {
        border: unset;
        border-radius: unset;
        background-color: transparent;
        background-image: linear-gradient(
          90deg,
          var(--color-input-border) var(--dimension-border-width),
          transparent 1px
        );
      }
    }

    :host([status='error']:not([disabled]):not([readonly])) {
      label {
        color: var(--color-label-text-error);
      }
      input {
        border-color: var(--color-input-border-error);
        background-color: var(--color-input-background-error);
        color: var(--color-input-text-error);
      }
      p {
        color: var(--color-message-text-error);
      }
    }
  `;
}
