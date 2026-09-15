import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiToggleGroupItemSelector = 'fhi-toggle-group-item';
export const FhiToggleGroupItemSelectEvent = 'fhi-toggle-group-item-select';

@customElement(FhiToggleGroupItemSelector)
export class FhiToggleGroupItem extends LitElement {
  /**
   *
   * Sets the toggle group button's variant. The variant determines the button's visual style and emphasis.
   *
   * See: {@link https://designsystem.fhi.no/?path=/docs/komponenter-button--docs#variant}
   *
   * @reflect
   * @type {'strong' | 'subtle' | 'outlined' | 'text'}
   */
  @property({ type: String, reflect: true }) variant: 'strong' | 'subtle' =
    'strong';

  /**
   * Whether the toggle group button is selected or not.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  public focus(options?: FocusOptions): void {
    const button = this.shadowRoot?.querySelector('button');
    button?.focus(options);
  }

  private _handleClick(event: MouseEvent): void {
    event.stopPropagation();

    this.dispatchEvent(
      new CustomEvent(FhiToggleGroupItemSelectEvent, {
        detail: { item: this },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button
        type="button"
        class="item-button"
        aria-pressed=${this.selected ? 'true' : 'false'}
        @click=${this._handleClick}
      >
        <slot name="icon"></slot>
        <slot></slot>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    .item-button {
      appearance: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--fhi-border-radius-full);
      border: solid var(--fhi-dimension-border-width) transparent;
      font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;
      transition:
        background-color var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default),
        border-color var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default),
        color var(--fhi-motion-duration-quick) var(--fhi-motion-ease-default);
      cursor: pointer;
      background-color: transparent;
      margin: 0;

      font-size: var(--fhi-typography-label-medium-font-size);
      font-weight: var(--fhi-typography-label-medium-font-weight);
      line-height: var(--fhi-typography-label-medium-line-height);
      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);
      padding: calc(var(--fhi-spacing-100) - var(--fhi-dimension-border-width))
        calc(
          var(--fhi-spacing-200) + var(--fhi-spacing-050) - var(
              --fhi-dimension-border-width
            )
        );
      color: var(--fhi-color-neutral-text-subtle);
    }

    .item-button:focus-visible {
      outline: solid var(--fhi-dimension-border-width-medium)
        var(--fhi-color-accent-border-default);
      outline-offset: var(--fhi-spacing-025);
    }

    :host([variant='strong']) .item-button:hover {
      background-color: var(--fhi-color-neutral-surface-default);
      color: var(--fhi-color-neutral-text-default);
    }

    :host([variant='strong']) .item-button:active {
      background-color: var(--fhi-color-neutral-surface-hover);
      color: var(--fhi-color-neutral-text-default);
    }

    :host([variant='strong'][selected]) .item-button {
      background-color: var(--fhi-color-neutral-base-default);
      color: var(--fhi-color-neutral-text-inverted);
    }

    :host([variant='subtle']) .item-button:hover {
      background-color: var(--fhi-color-neutral-surface-hover);
    }

    :host([variant='subtle']) .item-button:active {
      background-color: var(--fhi-color-neutral-surface-active);
      color: var(--fhi-color-neutral-text-default);
    }

    :host([variant='subtle'][selected]) .item-button {
      background-color: var(--fhi-color-neutral-background-default);
      border-color: var(--fhi-color-neutral-border-default);
      color: var(--fhi-color-neutral-text-default);
    }
  `;
}
