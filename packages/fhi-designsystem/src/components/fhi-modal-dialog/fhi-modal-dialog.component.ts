import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '../fhi-button/fhi-button.component';
import '../icons/fhi-icon-x.component';
import '../fhi-headline/fhi-headline.component';

export const FhiModalDialogSelector = 'fhi-modal-dialog';

/**
 * ## FHI Modal Dialog
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-modal-dialog--docs}
 *
 * The `fhi-modal-dialog` component is used to display important information or prompt the user for input in a modal window.
 * It overlays the main content and usually requires user interaction before returning to the underlying page.
 *
 * @tag fhi-modal-dialog
 * @element fhi-modal-dialog
 *
 * @slot body - The main content of the dialog. Typically contains text or form elements.
 * @slot footer - The footer content of the dialog, typically containing action buttons.
 */
@customElement(FhiModalDialogSelector)
export class FhiModalDialog extends LitElement {
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
   * Label for the close button.
   * @type {string}
   */
  @property({ type: String, attribute: 'close-button-label' })
  closeButtonLabel: string = '';

  /**
   * The heading text of the dialog. This is displayed at the top of the dialog.
   * @type {string}
   */
  @property({ type: String })
  heading: string = '';

  @query('dialog')
  private _dialog!: HTMLDialogElement;

  @query('footer')
  private _footer!: HTMLElement;

  @query('slot[name="footer"]')
  private _footerSlot!: HTMLSlotElement;

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

    // if invalid size is provided, default to 'medium'
    if (changedProperties.has('size')) {
      if (this.size !== 'small' && this.size !== 'medium') {
        this.size = 'medium';
      }
    }

    if (
      typeof this.closeButtonLabel !== 'string' ||
      this.closeButtonLabel.length === 0
    ) {
      throw new TypeError(
        'The close-button-label property must be set to a non-empty string. This label must describe the purpose of the close button for accessibility reasons.',
      );
    }

    if (typeof this.heading !== 'string' || this.heading.length === 0) {
      throw new TypeError(
        'The heading property must be set to a non-empty string. This heading describes the purpose of the dialog.',
      );
    }
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

    this._dialog.showModal();

    // Delay focus to make sure the windows screen reader properly detects the dialog
    setTimeout(() => {
      this._focusDialog();
    }, 10);

    this._dispatchToggleEvent();

    this.addEventListener('keydown', this.handleKeyPress.bind(this));
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

    this._dispatchToggleEvent();
    this._dispatchCloseEvent();

    this._triggerElement?.focus();

    this.removeEventListener('keydown', this.handleKeyPress.bind(this));
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

  private _handleCloseButtonClick() {
    this.close();
  }

  private _handleDialogContentMouseDown() {
    this._mouseDownInsideDialog = true;
  }

  private _handleFooterSlotChange() {
    this._toggleFooter();
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
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
      closedby="none"
      role="dialog"
    >
      <section
        class="dialog-content"
        @mousedown=${this._handleDialogContentMouseDown}
      >
        <header>
          <fhi-headline ?hidden=${!this.heading} id="dialog-label" level="1"
            >${this.heading}
          </fhi-headline>
          <fhi-button
            variant="text"
            color="neutral"
            size="small"
            @click=${this._handleCloseButtonClick}
          >
            ${this.closeButtonLabel}
            <fhi-icon-x></fhi-icon-x>
          </fhi-button>
        </header>
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
      --dimension-dialog-header-gap: var(--fhi-spacing-050);
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
        display: flex;
        overflow: hidden;
        border: var(--dimension-dialog-border-width) solid
          var(--color-dialog-border);
        border-radius: var(--dimension-dialog-border-radius);
        animation: var(--motion-transition) fhi-dialog-fade-in;
        padding: 0;
        .dialog-content {
          overflow: auto;
          flex: 1;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: var(--dimension-dialog-header-gap);
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
