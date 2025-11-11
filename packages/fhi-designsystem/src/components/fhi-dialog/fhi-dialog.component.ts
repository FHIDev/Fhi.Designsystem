import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '../fhi-button/fhi-button.component';
import '../icons/fhi-icon-x.component';
import '../fhi-headline/fhi-headline.component';

export const FhiDialogSelector = 'fhi-dialog';

/**
 * ## FHI Dialog
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-dialog--docs}
 *
 * @tag fhi-dialog
 * @element fhi-dialog
 *
 * @slot body - The main content of the dialog. Typically contains text or form elements.
 * @slot footer - The footer content of the dialog, typically containing action buttons.
 */
@customElement(FhiDialogSelector)
export class FhiDialog extends LitElement {
  /**
   * Decides whether the dialog is open or closed.
   * This property is reflected as an attribute and will therefor also change if the user opens or closes the dialog.
   * @attr
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  /**
   * Sets the maximum width of the dialog.
   * @attr
   * @type {'small' | 'medium' | `${string}rem`}
   */
  @property({ type: String, attribute: 'max-width' }) maxWidth:
    | 'small'
    | 'medium'
    | `${string}rem` = 'medium';

  /**
   * Label for the close button. If not provided, the button will be icon-only.
   * @attr
   * @type {string | undefined}
   */
  @property({ type: String, attribute: 'close-button-label' })
  closeButtonLabel?: string = undefined;

  /**
   * If true, the close button will be hidden.
   * @attr
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'hide-close-button' })
  hideCloseButton: boolean = false;

  /**
   * The heading text of the dialog. This is displayed at the top of the dialog.
   * @attr
   * @type {string | undefined}
   */
  @property({ type: String }) heading?: string = undefined;

  @query('dialog') private _dialog!: HTMLDialogElement;

  private _triggerElement: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('keydown', this._handleEscapeClick.bind(this));

    this.addEventListener('click', this._handleBackdropClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('keydown', this._handleEscapeClick);

    this.addEventListener('click', this._handleBackdropClick);
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.show();
      } else {
        this.close();
      }
    }

    if (changedProperties.has('maxWidth')) {
      if (this.maxWidth.endsWith('rem')) {
        this._dialog.style.maxWidth = this.maxWidth;
      } else {
        this._dialog.style.maxWidth = '';
      }
    }
  }

  public show() {
    this._triggerElement = document.activeElement as HTMLElement | null;

    console.log('Showing dialog', this._triggerElement);

    if (!this.open) {
      this.open = true;
    }

    this._dialog.showPopover();

    this._dispatchToggleEvent();
  }

  public close() {
    if (this.open) {
      this.open = false;
    }

    this._dialog.hidePopover();

    this._triggerElement?.focus();

    this._dispatchToggleEvent();

    /**@type {Event} - Standard DOM event of type `close` */
    this.dispatchEvent(new CloseEvent('close'));
  }

  private _handleSlotClick(event: MouseEvent) {
    event.stopPropagation();
  }

  private _dispatchToggleEvent() {
    /**@type {Event} - Standard DOM event with the type `toggle` */
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
  }

  render() {
    return html` <dialog popover="manual" @click=${this._handleSlotClick}>
      <header>
        <fhi-headline level="1">${this.heading}</fhi-headline>
        ${!this.hideCloseButton
          ? html`
              <fhi-button
                ?icon-only=${!this.closeButtonLabel}
                variant="text"
                color="neutral"
                @click=${this.close}
                aria-label="Close dialog"
              >
                ${this.closeButtonLabel}
                <fhi-icon-x></fhi-icon-x>
              </fhi-button>
            `
          : null}
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
    @keyframes fhi-dialog-fade-in {
      from {
        opacity: 0;
      }
    }

    :host {
      --dimension-dialog-padding: var(--fhi-spacing-500);
      --dimension-dialog-body-padding: var(--fhi-spacing-500) 0;
      --dimension-dialog-border-width: var(--fhi-dimension-border-width);
      --dimension-dialog-border-radius: var(--fhi-border-radius-200);
      --dimension-dialog-footer-gap: var(--fhi-spacing-050);

      --dimension-dialog-max-width-small: 28rem;
      --dimension-dialog-max-width-medium: 40rem;

      --color-backdrop: var(--fhi-color-neutral-border-default);
      --color-dialog-border: var(--fhi-color-neutral-border-subtle);

      --opacity-backdrop: var(--fhi-opacity-disabled);

      --motion-transition: var(--fhi-motion-duration-quick)
        var(--fhi-motion-ease-default);
    }

    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      visibility: hidden;

      dialog {
        border: var(--dimension-dialog-border-width) solid
          var(--color-dialog-border);
        border-radius: var(--dimension-dialog-border-radius);
        padding: var(--dimension-dialog-padding);
        animation: var(--motion-transition) fhi-dialog-fade-in;
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--fhi-spacing-400);
        }
        slot[name='body'] {
          display: block;
          padding: var(--dimension-dialog-body-padding);
        }
        footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: var(--dimension-dialog-footer-gap);
          flex-wrap: wrap;
        }
        &::backdrop {
          content: '';
          width: 100%;
          height: 100%;
          background-color: var(--color-backdrop);
          opacity: var(--opacity-backdrop);
          backdrop-filter: blur(80px);
          animation: var(--motion-transition) fhi-dialog-fade-in;
        }
      }
    }

    :host([open]) {
      opacity: 1;
      visibility: visible;
      display: flex;
    }

    dialog:popover-open {
      animation: var(--motion-transition) fhi-dialog-fade-in;
    }

    :host([max-width='small']) {
      dialog {
        max-width: var(--dimension-dialog-max-width-small);
      }
    }

    :host([max-width='medium']) {
      dialog {
        max-width: var(--dimension-dialog-max-width-medium);
      }
    }
  `;
}
