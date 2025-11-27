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
   * @type {'small' | 'medium' | `${string}rem`}
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth: 'small' | 'medium' | `${string}rem` = 'medium';

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

  private _triggerElement: HTMLElement | null = null;
  private _bodyOverflowStyle: string = '';

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

  private _handleDialogClick(event: MouseEvent) {
    if (event.target === this._dialog) {
      this.close();
    }

    event.stopPropagation();
  }

  private _handleKeyPress(event: KeyboardEvent) {
    if (!this.open) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
    }
  }

  render() {
    return html` <dialog
      @click=${this._handleDialogClick}
      ?aria-modal=${this.open}
      aria-labelledby="dialog-label"
    >
      <section class="dialog-content">
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
                  @click=${this.close}
                  aria-roledescription="button that will close the dialog"
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

        <button
          data-focus-trap
          aria-hidden
          @focus=${this._focusDialog}
        ></button>
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
      display: none;

      [data-focus-trap] {
        position: absolute;
        opacity: 0;
      }

      dialog {
        border: var(--dimension-dialog-border-width) solid
          var(--color-dialog-border);
        border-radius: var(--dimension-dialog-border-radius);
        animation: var(--motion-transition) fhi-dialog-fade-in;
        padding: 0;
        .dialog-content {
          padding: var(--dimension-dialog-padding);
        }
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
          background-color: var(--color-backdrop);
          opacity: var(--opacity-backdrop);
          backdrop-filter: blur(80px);
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
