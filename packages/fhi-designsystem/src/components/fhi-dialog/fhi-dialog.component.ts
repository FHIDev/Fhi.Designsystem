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
 * The `fhi-dialog` component is used to display important information or prompt the user for input in a modal window.
 * It overlays the main content and usually requires user interaction before returning to the underlying page.
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
   * By setting this property to true, the dialog will be shown. Setting it to false will close the dialog.
   *
   * This property is reflected as an attribute and will therefor also change if the user toggles the dialog or
   * if you use the `show()` and `close()` methods.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  /**
   * Sets the maximum width of the dialog.
   * @type {'small' | 'medium'`}
   */
  @property({ type: String, attribute: 'size', reflect: true })
  size: 'small' | 'medium' = 'medium';

  /**
   * Label for the close button. If not provided, the button will be icon-only.
   * @type {string | undefined}
   */
  @property({ type: String, attribute: 'close-button-label' })
  closeButtonLabel?: string = undefined;

  /**
   * If true, the close button will be hidden.
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'hide-close-button' })
  hideCloseButton: boolean = false;

  /**
   * The heading text of the dialog. This is displayed at the top of the dialog.
   * @type {string | undefined}
   */
  @property({ type: String })
  heading?: string = undefined;

  @query('dialog')
  private _dialog!: HTMLDialogElement;

  @query('footer')
  private _footer!: HTMLElement;

  @query('slot[name="footer"]')
  private _footerSlot!: HTMLSlotElement;

  @query('slot[name="body"]')
  private _bodySlot!: HTMLSlotElement;

  private _triggerElement: HTMLElement | null = null;
  private _bodyOverflowStyle: string = '';
  private _mouseDownInsideDialog: boolean = false;

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.show();
      } else {
        this.close();
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopForcingFocus();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._toggleFooter();
  }

  /**
   * Programmatically opens the dialog.
   * You can also open the dialog by instead setting the `open` property to `true`.
   */
  public show() {
    this._triggerElement = document.activeElement as HTMLElement | null;
    this._bodyOverflowStyle = document.body.style.overflow;

    if (!this.open) {
      this.open = true;
    }

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', this._handleKeyPress.bind(this));

    this._dialog.showModal();

    this._focusDialog();

    this._dispatchToggleEvent();

    this._startForcingFocus();
  }

  /**
   * Programmatically closes the dialog.
   * You can also close the dialog by instead setting the `open` property to `false`.
   */
  public close() {
    if (this.open) {
      this.open = false;
    }

    document.body.style.overflow = this._bodyOverflowStyle;

    this._dialog.close();

    window.removeEventListener('keydown', this._handleKeyPress);

    this._triggerElement?.focus();

    this._dispatchToggleEvent();
    this._dispatchCloseEvent();
  }

  private _focusDialog() {
    this._dialog.focus();
  }

  private _forceFocus(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as Node | null;
    if (
      relatedTarget &&
      !this._dialog.contains(relatedTarget) &&
      !this._bodySlot
        ?.assignedNodes({ flatten: true })
        .some(node => node === relatedTarget) &&
      !this._footerSlot
        ?.assignedNodes({ flatten: true })
        .some(node => node === relatedTarget)
    ) {
      this._focusDialog();
    }
  }

  private _startForcingFocus() {
    this._dialog.addEventListener('focusout', this._forceFocus.bind(this));
  }

  private _stopForcingFocus() {
    this._dialog.removeEventListener('focusout', this._forceFocus.bind(this));
  }

  private _dispatchToggleEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `toggle`
     * This event is fired whenever the dialog is opened or closed.
     * */
    this.dispatchEvent(
      new ToggleEvent('toggle', {
        newState: this.open ? 'open' : 'closed',
        oldState: this.open ? 'closed' : 'open',
      }),
    );
  }

  private _dispatchCloseEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `close`
     * This event is fired whenever the dialog is closed.
     * */
    this.dispatchEvent(new CloseEvent('close'));
  }

  private _handleDialogMouseUp(event: MouseEvent) {
    if (this._mouseDownInsideDialog) {
      this._mouseDownInsideDialog = false;
      return;
    }

    if (event.target === this._dialog) {
      this.close();
    }

    event.stopPropagation();
  }

  private _handleDialogContentMouseDown() {
    this._mouseDownInsideDialog = true;
  }

  private _handleKeyPress(event: KeyboardEvent) {
    if (!this.open) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
    }
  }

  private _handleFooterSlotChange() {
    this._toggleFooter();
  }

  private _toggleFooter() {
    const nodes = this._footerSlot.assignedNodes({ flatten: true });

    if (nodes.length === 0) {
      this._footer.style.display = 'none';
    } else {
      this._footer.style.display = 'flex';
    }
  }

  render() {
    return html` <dialog
      @mouseup=${this._handleDialogMouseUp}
      aria-modal="true"
      aria-labelledby="dialog-label"
    >
      <section
        class="dialog-content"
        @mousedown=${this._handleDialogContentMouseDown}
      >
        ${this.heading || !this.hideCloseButton
          ? html`
              <header>
                <fhi-headline id="dialog-label" level="1"
                  >${this.heading}</fhi-headline
                >
                ${!this.hideCloseButton
                  ? html`
                      <fhi-button
                        ?icon-only=${!this.closeButtonLabel}
                        variant="text"
                        color="neutral"
                        size="small"
                        @click=${this.close}
                        aria-label=${this.closeButtonLabel
                          ? ''
                          : 'Close dialog'}
                      >
                        ${this.closeButtonLabel}
                        <fhi-icon-x></fhi-icon-x>
                      </fhi-button>
                    `
                  : null}
              </header>
            `
          : null}
        <slot name="body"></slot>
        <footer>
          <slot
            name="footer"
            @slotchange=${this._handleFooterSlotChange}
          ></slot>
        </footer>
      </section>
    </dialog>`;
  }

  static styles = css`
    @keyframes fhi-dialog-fade-in {
      from {
        opacity: 0;
      }
    }

    :host {
      --dimension-dialog-border-width: var(--fhi-dimension-border-width);
      --dimension-dialog-border-radius: var(--fhi-border-radius-200);
      --dimension-dialog-header-padding: var(--fhi-spacing-500)
        var(--fhi-spacing-500) 0 var(--fhi-spacing-500);
      --dimension-dialog-body-padding: var(--fhi-spacing-500);
      --dimension-dialog-footer-padding: 0 var(--fhi-spacing-500)
        var(--fhi-spacing-500) var(--fhi-spacing-500);
      --dimension-dialog-footer-gap: var(--fhi-spacing-050);

      --dimension-dialog-width-small: 28rem;
      --dimension-dialog-width-medium: 40rem;

      --color-backdrop: var(--fhi-color-neutral-surface-active);
      --color-dialog-border: var(--fhi-color-neutral-border-subtle);

      --motion-transition: var(--fhi-motion-duration-quick)
        var(--fhi-motion-ease-default);
    }

    :host {
      display: none;
      position: absolute;

      dialog {
        border: var(--dimension-dialog-border-width) solid
          var(--color-dialog-border);
        border-radius: var(--dimension-dialog-border-radius);
        animation: var(--motion-transition) fhi-dialog-fade-in;
        padding: 0;
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--fhi-spacing-400);
          padding: var(--dimension-dialog-header-padding);
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
          padding: var(--dimension-dialog-footer-padding);
        }
        &::backdrop {
          background-color: var(--color-backdrop);
          opacity: var(--fhi-opacity-disabled);
          animation: var(--motion-transition) fhi-dialog-fade-in;
        }
      }
    }

    :host([open]) {
      display: block;
    }

    dialog:popover-open {
      animation: var(--motion-transition) fhi-dialog-fade-in;
    }

    :host([size='small']) {
      dialog {
        width: var(--dimension-dialog-width-small);
      }
    }

    :host([size='medium']) {
      dialog {
        width: var(--dimension-dialog-width-medium);
      }
    }
  `;
}
