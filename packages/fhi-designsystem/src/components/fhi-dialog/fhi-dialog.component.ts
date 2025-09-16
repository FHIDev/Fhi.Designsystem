import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '../fhi-button/fhi-button.component';
import '../icons/fhi-icon-x.component';

export const FhiDialogSelector = 'fhi-dialog';

@customElement(FhiDialogSelector)
export class FhiDialog extends LitElement {
  static openDialogs = 0;

  @property({ type: Boolean, reflect: true }) open = false;

  @property({ type: String }) heading = undefined;

  @query('dialog') _dialog!: HTMLDialogElement;

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('focusin', this._focusTrap.bind(this));
    window.addEventListener('keydown', this._handleEscapeClick.bind(this));

    this.addEventListener('click', this._handleBackdropClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('focusin', this._focusTrap);
    window.removeEventListener('keydown', this._handleEscapeClick);

    this.addEventListener('click', this._handleBackdropClick);
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        FhiDialog.openDialogs += 1;

        this.style.zIndex = `${2000 + FhiDialog.openDialogs}`;

        this._dialog.focus();

        return;
      }

      this.style.zIndex = '0';

      FhiDialog.openDialogs = Math.max(0, FhiDialog.openDialogs - 1);
    }
  }

  public show() {
    this.open = true;

    this._dispatchToggleEvent();
  }

  public close() {
    this.open = false;

    this._dispatchToggleEvent();
    this.dispatchEvent(new CloseEvent('close'));
  }

  private _focusTrap = () => {
    if (!this.open) {
      return;
    }

    // Only trap focus for the topmost dialog
    if (this.style.zIndex !== `${2000 + FhiDialog.openDialogs}`) {
      return;
    }

    const active = document.activeElement as HTMLElement | null;

    if (this === active || this.contains(active)) {
      return;
    }

    this._dialog.focus();
  };

  private _handleSlotClick(event: MouseEvent) {
    event.stopPropagation();
  }

  private _dispatchToggleEvent() {
    this.dispatchEvent(
      new ToggleEvent('toggle', {
        newState: this.open ? 'open' : 'closed',
        oldState: this.open ? 'closed' : 'open',
      }),
    );
  }

  private _handleBackdropClick(event: MouseEvent) {
    if (event.target === this) {
      this.close();
    }
  }

  private _handleEscapeClick(event: KeyboardEvent) {
    if (!this.open) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
    }

    console.log(event.key, this.open);
  }

  render() {
    return html`<dialog open=${this.open} @click=${this._handleSlotClick}>
      <header>
        <h1>${this.heading}</h1>
        <fhi-button
          icon-only
          variant="text"
          color="neutral"
          @click=${() => (this.open = false)}
          aria-label="Close dialog"
        >
          <fhi-icon-x></fhi-icon-x>
        </fhi-button>
      </header>
      <section>
        <slot name="body"></slot>
      </section>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </dialog>`;
  }

  static styles = css`
    :host {
    }

    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      &::before {
        content: '';
        width: 100%;
        height: 100%;
        background-color: var(--fhi-color-neutral-border-default);
        opacity: var(--fhi-opacity-disabled);
        backdrop-filter: blur(80px);
      }

      dialog {
        border: 1px solid var(--fhi-color-neutral-border-subtle);
        border-radius: var(--fhi-border-radius-200);
        padding: var(--fhi-spacing-500);
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }
        footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: var(--fhi-spacing-050);
          flex-wrap: wrap;
        }
      }
    }

    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host(:not([open])) {
      display: none;
    }
  `;
}
