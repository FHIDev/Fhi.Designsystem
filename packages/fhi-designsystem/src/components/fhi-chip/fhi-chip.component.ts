import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../typography/fhi-label/fhi-label.component';
import '../icons/fhi-icon-x.component';

export const FhiChipSelector = 'fhi-chip';

/**
 * ## FHI Chip
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-chip--docs}
 *
 * The `<fhi-chip>` component shows a selected value the user can click to remove,
 * for example when filtering.
 *
 * @tag fhi-chip
 * @element fhi-chip
 *
 * @slot - The text content of the chip.
 */
@customElement(FhiChipSelector)
export class FhiChip extends LitElement {
  private dispatchClickEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `click`.
     * This event is dispatched when the chip is clicked.
     */
    this.dispatchEvent(new Event('click', { bubbles: true, composed: true }));
  }

  private _handleClick(event: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();

    this.dispatchClickEvent();
  }

  render() {
    return html`
      <button type="button" @click="${this._handleClick}">
        <fhi-label size="small">
          <slot></slot>
        </fhi-label>
        <fhi-icon-x size="xsmall"></fhi-icon-x>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      width: fit-content;
      height: fit-content;
    }

    button {
      display: flex;
      align-items: center;
      gap: var(--fhi-spacing-050);

      height: var(--fhi-spacing-400);
      padding: 0 var(--fhi-spacing-100) 0 var(--fhi-spacing-150);

      border: none;
      border-radius: var(--fhi-border-radius-full);

      background-color: var(--fhi-color-accent-surface-default);
      color: var(--fhi-color-accent-text-default);

      font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;

      cursor: pointer;

      transition: background-color var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);
    }

    button:hover {
      background-color: var(--fhi-color-accent-surface-hover);
    }

    button:active {
      background-color: var(--fhi-color-accent-surface-active);
    }
  `;
}
