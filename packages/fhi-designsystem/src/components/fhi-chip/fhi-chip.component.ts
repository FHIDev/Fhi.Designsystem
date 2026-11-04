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
  private _internals: ElementInternals;

  constructor() {
    super();

    this._internals = this.attachInternals();

    this._internals.role = 'button';
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }

    this.onkeydown = this._handleKeydown.bind(this);
    this.onkeyup = this._handleKeyup.bind(this);
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._dispatchClickEvent();
    }

    // Don't scroll the page when the spacebar is pressed.
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
    }
  }

  private _handleKeyup(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Spacebar') {
      this._dispatchClickEvent();
    }
  }

  private _dispatchClickEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `click`.
     * This event is dispatched when the chip is clicked or activated with the keyboard.
     */
    this.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <fhi-label role="presentation" size="small">
        <slot></slot>
      </fhi-label>
      <fhi-icon-x size="xsmall"></fhi-icon-x>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--fhi-spacing-050);

      box-sizing: border-box;
      width: fit-content;
      height: var(--fhi-spacing-400);
      padding: 0 var(--fhi-spacing-100) 0 var(--fhi-spacing-150);

      border: none;
      border-radius: var(--fhi-border-radius-full);

      background-color: var(--fhi-color-accent-surface-default);
      color: var(--fhi-color-accent-text-default);

      font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;
      text-wrap: nowrap;
      user-select: none;

      cursor: pointer;

      transition: background-color var(--fhi-motion-ease-default)
        var(--fhi-motion-duration-quick);
    }

    :host(:hover) {
      background-color: var(--fhi-color-accent-surface-hover);
    }

    :host(:active) {
      background-color: var(--fhi-color-accent-surface-active);
    }
  `;
}
