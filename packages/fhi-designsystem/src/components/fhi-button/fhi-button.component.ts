import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiButtonSelector = 'fhi-button';

/**
 * ## FHI Button
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-button--docs}
 *
 * The `<fhi-button>` component is used to create interactive buttons in accordance with the FHI Design System guidelines.
 * Use this component instead of the standard HTML `<button>` element to ensure consistent styling and behavior across your application.
 *
 * @tag fhi-button
 * @element fhi-button
 *
 * @slot - The content of the button. This should be pure text, an icon or both.
 */
@customElement(FhiButtonSelector)
export class FhiButton extends LitElement {
  static readonly formAssociated = true;

  /**
   * Sets the color of the button.
   *
   * See: {@link https://designsystem.fhi.no/?path=/docs/komponenter-button--docs#color-farge}
   *
   * @reflect
   * @type {'accent' | 'neutral' | 'danger'}
   */
  @property({ type: String, reflect: true }) color:
    | 'accent'
    | 'neutral'
    | 'danger' = 'accent';

  /**
   *
   * Sets the button variant. The variant determines the button's visual style and emphasis.
   *
   * See: {@link https://designsystem.fhi.no/?path=/docs/komponenter-button--docs#variant}
   *
   * @reflect
   * @type {'strong' | 'subtle' | 'outlined' | 'text'}
   */
  @property({ type: String, reflect: true }) variant:
    | 'strong'
    | 'subtle'
    | 'outlined'
    | 'text' = 'strong';

  /**
   * Sets the size of the button to one of the predefined options.
   *
   * See: {@link https://designsystem.fhi.no/?path=/docs/komponenter-button--docs#size-st%C3%B8rrelse}
   *
   * @reflect
   * @type {'large' | 'medium' | 'small'}
   */
  @property({ type: String, reflect: true }) size:
    | 'large'
    | 'medium'
    | 'small' = 'medium';

  /**
   * Disables the button. This changes its appearance and makes it non-interactive.
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Styles the button for icon-only content.
   *
   * If you only have an icon as the child of the button, then you should set this property to `true`.
   *
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'icon-only' })
  iconOnly: boolean = false;

  /**
   * Sets the button's type. This determines the button's behavior when used within a form.
   * The predefined types conform to standard HTML button types.
   *
   * For more information about button types, see: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type}
   * @type {'button' | 'submit' | 'reset'}
   */
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'submit';

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.onkeyup = this._handleKeyup.bind(this);
    this.onkeydown = this._handleKeydown.bind(this);
    this.onselectstart = this._handleSelectStart.bind(this);
  }

  /**
   * Programmatically clicks the button.
   */
  public click(): void {
    this._handleClick();
  }

  private _handleClick(event?: MouseEvent | KeyboardEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.disabled) {
      return;
    }

    this._dispatchClickEvent();

    if (this.type === 'submit') {
      this._internals.form?.requestSubmit();
    }

    if (this.type === 'reset') {
      this._internals.form?.reset();
    }
  }

  private _dispatchClickEvent(): void {
    /**
     * @type {Event} - Standard DOM event with the type `click`.
     * This event is dispatched when the button is clicked, either via mouse or keyboard interaction.
     * */
    this.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true }),
    );
  }

  private _handleKeyup(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Spacebar') {
      this._handleClick(event);

      const target = event.target as HTMLElement | null;
      target?.blur();
      target?.focus();
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._handleClick(event);
    }
  }

  private _handleSelectStart(): boolean {
    return false;
  }

  private _handleFocus(event: FocusEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.dispatchEvent(
      new FocusEvent('focus', { bubbles: true, composed: true }),
    );
  }

  private _handleBlur(event: FocusEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.dispatchEvent(
      new FocusEvent('blur', { bubbles: true, composed: true }),
    );
  }

  private _getIconSize(): string {
    switch (this.size) {
      case 'small':
        return '1.25rem';
      case 'medium':
      case 'large':
      default:
        return '1.5rem';
    }
  }

  private _handleSlotChange(event: Event): void {
    const nodes = (event.target as HTMLSlotElement).assignedNodes();

    const validNodes = nodes.filter(
      node =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
    );

    if (validNodes.length === 0) {
      return;
    }

    const firstNode: Node = validNodes[0];

    // if the first node is an icon, style it.
    if (
      firstNode.nodeType === Node.ELEMENT_NODE &&
      (firstNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      const firstIcon = firstNode as HTMLElement;

      if (this.iconOnly) {
        firstIcon.setAttribute('size', this._getIconSize());
        return;
      }

      if (this.size != 'small') {
        firstIcon.style.marginRight = 'var(--dimension-icon-margin-right)';
      }
      firstIcon.style.marginLeft = 'var(--dimension-icon-margin-left-offset)';
      firstIcon.setAttribute('size', this._getIconSize());
    }

    if (validNodes.length === 1) {
      return;
    }

    const lastNode: Node = validNodes[validNodes.length - 1];

    // if the last node is an icon, style it.
    if (
      lastNode.nodeType === Node.ELEMENT_NODE &&
      (lastNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      const lastIcon = lastNode as HTMLElement;

      lastIcon.style.marginRight = 'var(--dimension-icon-margin-right-offset)';
      if (this.size != 'small') {
        lastIcon.style.marginLeft = 'var(--dimension-icon-margin-left)';
      }
      lastIcon.setAttribute('size', this._getIconSize());
    }
  }

  render() {
    return html`<button
      ?disabled=${this.disabled}
      type=${this.type}
      @keyup=${this._handleKeyup}
      @keydown=${this._handleKeydown}
      @click=${this._handleClick}
      @focus=${this._handleFocus}
      @blur=${this._handleBlur}
    >
      <div class="slot-container">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    </button>`;
  }

  static styles = css`
    :host {
      --dimension-border-radius: var(--fhi-border-radius-full);
      --dimension-border-width: var(--fhi-dimension-border-width);

      --dimension-padding-small: calc(
          var(--fhi-spacing-050) - var(--fhi-dimension-border-width)
        )
        calc(
          var(--fhi-spacing-150) + var(--fhi-spacing-050) - var(
              --fhi-dimension-border-width
            )
        );
      --dimension-padding-medium: calc(
          var(--fhi-spacing-100) - var(--fhi-dimension-border-width)
        )
        calc(
          var(--fhi-spacing-200) + var(--fhi-spacing-050) - var(
              --fhi-dimension-border-width
            )
        );
      --dimension-padding-large: calc(
          var(--fhi-spacing-200) - var(--fhi-dimension-border-width)
        )
        calc(
          var(--fhi-spacing-300) + var(--fhi-spacing-050) - var(
              --fhi-dimension-border-width
            )
        );
      --dimension-padding-small-text: calc(
          var(--fhi-spacing-050) - var(--fhi-dimension-border-width)
        )
        calc(var(--fhi-spacing-150) - var(--fhi-dimension-border-width));

      --dimension-padding-medium-text: calc(
          var(--fhi-spacing-100) - var(--fhi-dimension-border-width)
        )
        calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width));

      --dimension-padding-large-text: calc(
          var(--fhi-spacing-200) - var(--fhi-dimension-border-width)
        )
        calc(var(--fhi-spacing-300) - var(--fhi-dimension-border-width));

      /* Icon */
      --dimension-icon-margin-left: var(--fhi-spacing-050);
      --dimension-icon-margin-right: var(--fhi-spacing-050);

      /* Adjust for the button padding when the icon is present on either side */
      --dimension-icon-margin-left-offset: calc(-1 * var(--fhi-spacing-050));
      --dimension-icon-margin-right-offset: calc(-1 * var(--fhi-spacing-050));

      --dimension-icon-only-border-radius: var(--fhi-border-radius-full);

      /* Typography */
      --typography-font-family: var(--fhi-font-family-default);
      --typography-label-large-font-size: var(
        --fhi-typography-label-large-font-size
      );
      --typography-label-medium-font-size: var(
        --fhi-typography-label-medium-font-size
      );
      --typography-label-small-font-size: var(
        --fhi-typography-label-medium-font-size
      );
      --typography-label-large-font-weight: var(
        --fhi-typography-label-large-font-weight
      );
      --typography-label-medium-font-weight: var(
        --fhi-typography-label-medium-font-weight
      );
      --typography-label-small-font-weight: var(
        --fhi-typography-label-medium-font-weight
      );
      --typography-label-large-letter-spacing: var(
        --fhi-typography-label-large-letter-spacing
      );
      --typography-label-medium-letter-spacing: var(
        --fhi-typography-label-medium-letter-spacing
      );
      --typography-label-small-letter-spacing: var(
        --fhi-typography-label-medium-letter-spacing
      );
      --typography-label-large-line-height: var(
        --fhi-typography-label-large-line-height
      );
      --typography-label-small-line-height: var(
        --fhi-typography-label-medium-line-height
      );
      --typography-label-medium-line-height: var(
        --fhi-typography-label-medium-line-height
      );

      /* Accent Color */
      --color-accent-strong-background: var(--fhi-color-accent-base-default);
      --color-accent-strong-border: var(--fhi-color-accent-base-default);
      --color-accent-strong: var(--fhi-color-accent-text-inverted);
      --color-accent-strong-background-hover: var(
        --fhi-color-accent-base-hover
      );
      --color-accent-strong-border-hover: var(--fhi-color-accent-base-hover);
      --color-accent-strong-hover: var(--fhi-color-accent-text-inverted);
      --color-accent-strong-background-active: var(
        --fhi-color-accent-base-active
      );
      --color-accent-strong-border-active: var(--fhi-color-accent-base-active);
      --color-accent-strong-active: var(--fhi-color-accent-text-inverted);
      --color-accent-strong-background-disabled: var(
        --fhi-color-accent-base-default
      );
      --color-accent-strong-border-disabled: var(
        --fhi-color-accent-base-default
      );
      --color-accent-strong-disabled: var(--fhi-color-accent-text-inverted);

      --color-accent-subtle-background: var(--fhi-color-accent-surface-default);
      --color-accent-subtle-border: var(--fhi-color-accent-surface-default);
      --color-accent-subtle: var(--fhi-color-accent-text-subtle);
      --color-accent-subtle-background-hover: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-subtle-border-hover: var(--fhi-color-accent-surface-hover);
      --color-accent-subtle-hover: var(--fhi-color-accent-text-default);
      --color-accent-subtle-background-active: var(
        --fhi-color-accent-surface-active
      );
      --color-accent-subtle-border-active: var(
        --fhi-color-accent-surface-active
      );
      --color-accent-subtle-active: var(--fhi-color-accent-text-default);
      --color-accent-subtle-background-disabled: var(
        --fhi-color-accent-surface-default
      );
      --color-accent-subtle-border-disabled: var(
        --fhi-color-accent-surface-default
      );
      --color-accent-subtle-disabled: var(--fhi-color-accent-text-subtle);

      --color-accent-outlined-background: transparent;
      --color-accent-outlined-border: var(--fhi-color-accent-border-subtle);
      --color-accent-outlined: var(--fhi-color-accent-text-subtle);
      --color-accent-outlined-background-hover: var(
        --fhi-color-accent-surface-default
      );
      --color-accent-outlined-border-hover: var(
        --fhi-color-accent-surface-default
      );
      --color-accent-outlined-hover: var(--fhi-color-accent-text-default);
      --color-accent-outlined-background-active: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-outlined-border-active: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-outlined-active: var(--fhi-color-accent-text-default);
      --color-accent-outlined-background-disabled: transparent;
      --color-accent-outlined-border-disabled: var(
        --fhi-color-accent-border-subtle
      );
      --color-accent-outlined-disabled: var(--fhi-color-accent-text-subtle);

      --color-accent-text-background: transparent;
      --color-accent-text-border: transparent;
      --color-accent-text: var(--fhi-color-accent-text-subtle);
      --color-accent-text-background-hover: var(
        --fhi-color-accent-surface-default
      );
      --color-accent-text-border-hover: var(--fhi-color-accent-surface-default);
      --color-accent-text-hover: var(--fhi-color-accent-text-default);
      --color-accent-text-background-active: var(
        --fhi-color-accent-surface-hover
      );
      --color-accent-text-border-active: var(--fhi-color-accent-surface-hover);
      --color-accent-text-active: var(--fhi-color-accent-text-default);
      --color-accent-text-background-disabled: transparent;
      --color-accent-text-border-disabled: transparent;
      --color-accent-text-disabled: var(--fhi-color-accent-text-default);

      /* Neutral Color */
      --color-neutral-strong-background: var(--fhi-color-neutral-base-default);
      --color-neutral-strong-border: var(--fhi-color-neutral-base-default);
      --color-neutral-strong: var(--fhi-color-neutral-text-inverted);
      --color-neutral-strong-background-hover: var(
        --fhi-color-neutral-base-hover
      );
      --color-neutral-strong-border-hover: var(--fhi-color-neutral-base-hover);
      --color-neutral-strong-hover: var(--fhi-color-neutral-text-inverted);
      --color-neutral-strong-background-active: var(
        --fhi-color-neutral-base-active
      );
      --color-neutral-strong-border-active: var(
        --fhi-color-neutral-base-active
      );
      --color-neutral-strong-active: var(--fhi-color-neutral-text-inverted);
      --color-neutral-strong-background-disabled: var(
        --fhi-color-neutral-base-default
      );
      --color-neutral-strong-border-disabled: var(
        --fhi-color-neutral-base-default
      );
      --color-neutral-strong-disabled: var(--fhi-color-neutral-text-inverted);

      --color-neutral-subtle-background: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-subtle-border: var(--fhi-color-neutral-surface-default);
      --color-neutral-subtle: var(--fhi-color-neutral-text-subtle);
      --color-neutral-subtle-background-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-subtle-border-hover: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-subtle-hover: var(--fhi-color-neutral-text-default);
      --color-neutral-subtle-background-active: var(
        --fhi-color-neutral-surface-active
      );
      --color-neutral-subtle-border-active: var(
        --fhi-color-neutral-surface-active
      );
      --color-neutral-subtle-active: var(--fhi-color-neutral-text-default);
      --color-neutral-subtle-background-disabled: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-subtle-border-disabled: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-subtle-disabled: var(--fhi-color-neutral-text-default);

      --color-neutral-outlined-background: transparent;
      --color-neutral-outlined-border: var(--fhi-color-neutral-border-subtle);
      --color-neutral-outlined: var(--fhi-color-neutral-text-subtle);
      --color-neutral-outlined-background-hover: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-outlined-border-hover: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-outlined-hover: var(--fhi-color-neutral-text-default);
      --color-neutral-outlined-background-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-outlined-border-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-outlined-active: var(--fhi-color-neutral-text-default);
      --color-neutral-outlined-background-disabled: transparent;
      --color-neutral-outlined-border-disabled: var(
        --fhi-color-neutral-border-subtle
      );
      --color-neutral-outlined-disabled: var(--fhi-color-neutral-text-subtle);

      --color-neutral-text-background: transparent;
      --color-neutral-text-border: transparent;
      --color-neutral-text: var(--fhi-color-neutral-text-subtle);
      --color-neutral-text-background-hover: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-text-border-hover: var(
        --fhi-color-neutral-surface-default
      );
      --color-neutral-text-hover: var(--fhi-color-neutral-text-default);
      --color-neutral-text-background-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-text-border-active: var(
        --fhi-color-neutral-surface-hover
      );
      --color-neutral-text-active: var(--fhi-color-neutral-text-default);
      --color-neutral-text-background-disabled: transparent;
      --color-neutral-text-border-disabled: transparent;
      --color-neutral-text-disabled: var(--fhi-color-neutral-text-subtle);

      /* Danger Color */
      --color-danger-strong-background: var(--fhi-color-danger-base-default);
      --color-danger-strong-border: var(--fhi-color-danger-base-default);
      --color-danger-strong: var(--fhi-color-danger-text-inverted);
      --color-danger-strong-background-hover: var(
        --fhi-color-danger-base-hover
      );
      --color-danger-strong-border-hover: var(--fhi-color-danger-base-hover);
      --color-danger-strong-hover: var(--fhi-color-danger-text-inverted);
      --color-danger-strong-background-active: var(
        --fhi-color-danger-base-active
      );
      --color-danger-strong-border-active: var(--fhi-color-danger-base-active);
      --color-danger-strong-active: var(--fhi-color-danger-text-inverted);
      --color-danger-strong-background-disabled: var(
        --fhi-color-danger-base-default
      );
      --color-danger-strong-border-disabled: var(
        --fhi-color-danger-base-default
      );
      --color-danger-strong-disabled: var(--fhi-color-danger-text-inverted);

      --color-danger-subtle-background: var(--fhi-color-danger-surface-default);
      --color-danger-subtle-border: var(--fhi-color-danger-surface-default);
      --color-danger-subtle: var(--fhi-color-danger-text-subtle);
      --color-danger-subtle-background-hover: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-subtle-border-hover: var(--fhi-color-danger-surface-hover);
      --color-danger-subtle-hover: var(--fhi-color-danger-text-default);
      --color-danger-subtle-background-active: var(
        --fhi-color-danger-surface-active
      );
      --color-danger-subtle-border-active: var(
        --fhi-color-danger-surface-active
      );
      --color-danger-subtle-active: var(--fhi-color-danger-text-default);
      --color-danger-subtle-background-disabled: var(
        --fhi-color-danger-surface-default
      );
      --color-danger-subtle-border-disabled: var(
        --fhi-color-danger-surface-default
      );
      --color-danger-subtle-disabled: var(--fhi-color-danger-text-subtle);

      --color-danger-outlined-background: transparent;
      --color-danger-outlined-border: var(--fhi-color-danger-border-subtle);
      --color-danger-outlined: var(--fhi-color-danger-text-subtle);
      --color-danger-outlined-background-hover: var(
        --fhi-color-danger-surface-default
      );
      --color-danger-outlined-border-hover: var(
        --fhi-color-danger-surface-default
      );
      --color-danger-outlined-hover: var(--fhi-color-danger-text-default);
      --color-danger-outlined-background-active: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-outlined-border-active: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-outlined-active: var(--fhi-color-danger-text-default);
      --color-danger-outlined-background-disabled: transparent;
      --color-danger-outlined-border-disabled: var(
        --fhi-color-danger-border-subtle
      );
      --color-danger-outlined-disabled: var(--fhi-color-danger-text-subtle);

      --color-danger-text-background: transparent;
      --color-danger-text-border: transparent;
      --color-danger-text: var(--fhi-color-danger-text-subtle);
      --color-danger-text-background-hover: var(
        --fhi-color-danger-surface-default
      );
      --color-danger-text-border-hover: var(--fhi-color-danger-surface-default);
      --color-danger-text-hover: var(--fhi-color-danger-text-default);
      --color-danger-text-background-active: var(
        --fhi-color-danger-surface-hover
      );
      --color-danger-text-border-active: var(--fhi-color-danger-surface-hover);
      --color-danger-text-active: var(--fhi-color-danger-text-default);
      --color-danger-text-background-disabled: transparent;
      --color-danger-text-border-disabled: transparent;
      --color-danger-text-disabled: var(--fhi-color-danger-text-subtle);

      --motion-transition: var(--fhi-motion-duration-quick)
        var(--fhi-motion-ease-default);

      --opacity-disabled: var(--fhi-opacity-disabled);
    }

    :host {
      display: block;
      width: fit-content;

      button {
        border-radius: var(--dimension-border-radius);
        border: solid var(--dimension-border-width);
        font-family: var(--typography-font-family);
        -webkit-font-smoothing: antialiased;
        transition: var(--motion-transition);

        cursor: pointer;
        &:disabled {
          opacity: var(--opacity-disabled);
          cursor: not-allowed;
        }
      }

      .slot-container {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }

    :host([size='large']) button {
      font-size: var(--typography-label-large-font-size);
      font-weight: var(--typography-label-large-font-weight);
      line-height: var(--typography-label-large-line-height);
      letter-spacing: var(--typography-label-large-letter-spacing);
      padding: var(--dimension-padding-large);
    }

    :host([size='large'][variant='text']) button {
      padding: var(--dimension-padding-large-text);
    }

    :host([size='medium']) button {
      font-size: var(--typography-label-medium-font-size);
      font-weight: var(--typography-label-medium-font-weight);
      line-height: var(--typography-label-medium-line-height);
      letter-spacing: var(--typography-label-medium-letter-spacing);
      padding: var(--dimension-padding-medium);
    }

    :host([size='medium'][variant='text']) button {
      padding: var(--dimension-padding-medium-text);
    }

    :host([size='small']) button {
      font-size: var(--typography-label-small-font-size);
      font-weight: var(--typography-label-small-font-weight);
      line-height: var(--typography-label-small-line-height);
      letter-spacing: var(--typography-label-small-letter-spacing);
      padding: var(--dimension-padding-small);
    }

    :host([size='small'][variant='text']) button {
      padding: var(--dimension-padding-small-text);
    }

    :host([color='accent'][variant='strong']) button {
      background-color: var(--color-accent-strong-background);
      border-color: var(--color-accent-strong-border);
      color: var(--color-accent-strong);
      &:hover {
        background-color: var(--color-accent-strong-background-hover);
        border-color: var(--color-accent-strong-border-hover);
        color: var(--color-accent-strong-hover);
      }
      &:active {
        background-color: var(--color-accent-strong-background-active);
        border-color: var(--color-accent-strong-border-active);
        color: var(--color-accent-strong-active);
      }
      &:disabled {
        background-color: var(--color-accent-strong-background-disabled);
        border-color: var(--color-accent-strong-border-disabled);
        color: var(--color-accent-strong-disabled);
      }
    }

    :host([color='accent'][variant='subtle']) button {
      background-color: var(--color-accent-subtle-background);
      border-color: var(--color-accent-subtle-border);
      color: var(--color-accent-subtle);
      &:hover {
        background-color: var(--color-accent-subtle-background-hover);
        border-color: var(--color-accent-subtle-border-hover);
        color: var(--color-accent-subtle-hover);
      }
      &:active {
        background-color: var(--color-accent-subtle-background-active);
        border-color: var(--color-accent-subtle-border-active);
        color: var(--color-accent-subtle-active);
      }
      &:disabled {
        background-color: var(--color-accent-subtle-background-disabled);
        border-color: var(--color-accent-subtle-border-disabled);
        color: var(--color-accent-subtle-disabled);
      }
    }

    :host([color='accent'][variant='outlined']) button {
      background-color: var(--color-accent-outlined-background);
      border-color: var(--color-accent-outlined-border);
      color: var(--color-accent-outlined);
      &:hover {
        background-color: var(--color-accent-outlined-background-hover);
        border-color: var(--color-accent-outlined-border-hover);
        color: var(--color-accent-outlined-hover);
      }
      &:active {
        background-color: var(--color-accent-outlined-background-active);
        border-color: var(--color-accent-outlined-border-active);
        color: var(--color-accent-outlined-active);
      }
      &:disabled {
        background-color: var(--color-accent-outlined-background-disabled);
        border-color: var(--color-accent-outlined-border-disabled);
        color: var(--color-accent-outlined-disabled);
      }
    }

    :host([color='accent'][variant='text']) button {
      background-color: var(--color-accent-text-background);
      border-color: var(--color-accent-text-border);
      color: var(--color-accent-text);
      &:hover {
        background-color: var(--color-accent-text-background-hover);
        border-color: var(--color-accent-text-border-hover);
        color: var(--color-accent-text-hover);
      }
      &:active {
        background-color: var(--color-accent-text-background-active);
        border-color: var(--color-accent-text-border-active);
        color: var(--color-accent-text-active);
      }
      &:disabled {
        background-color: var(--color-accent-text-background-disabled);
        border-color: var(--color-accent-text-border-disabled);
        color: var(--color-accent-text-disabled);
      }
    }

    :host([color='neutral'][variant='strong']) button {
      background-color: var(--color-neutral-strong-background);
      border-color: var(--color-neutral-strong-border);
      color: var(--color-neutral-strong);
      &:hover {
        background-color: var(--color-neutral-strong-background-hover);
        border-color: var(--color-neutral-strong-border-hover);
        color: var(--color-neutral-strong-hover);
      }
      &:active {
        background-color: var(--color-neutral-strong-background-active);
        border-color: var(--color-neutral-strong-border-active);
        color: var(--color-neutral-strong-active);
      }
      &:disabled {
        background-color: var(--color-neutral-strong-background-disabled);
        border-color: var(--color-neutral-strong-border-disabled);
        color: var(--color-neutral-strong-disabled);
      }
    }

    :host([color='neutral'][variant='subtle']) button {
      background-color: var(--color-neutral-subtle-background);
      border-color: var(--color-neutral-subtle-border);
      color: var(--color-neutral-subtle);
      &:hover {
        background-color: var(--color-neutral-subtle-background-hover);
        border-color: var(--color-neutral-subtle-border-hover);
        color: var(--color-neutral-subtle-hover);
      }
      &:active {
        background-color: var(--color-neutral-subtle-background-active);
        border-color: var(--color-neutral-subtle-border-active);
        color: var(--color-neutral-subtle-active);
      }
      &:disabled {
        background-color: var(--color-neutral-subtle-background-disabled);
        border-color: var(--color-neutral-subtle-border-disabled);
        color: var(--color-neutral-subtle-disabled);
      }
    }

    :host([color='neutral'][variant='outlined']) button {
      background-color: var(--color-neutral-outlined-background);
      border-color: var(--color-neutral-outlined-border);
      color: var(--color-neutral-outlined);
      &:hover {
        background-color: var(--color-neutral-outlined-background-hover);
        border-color: var(--color-neutral-outlined-border-hover);
        color: var(--color-neutral-outlined-hover);
      }
      &:active {
        background-color: var(--color-neutral-outlined-background-active);
        border-color: var(--color-neutral-outlined-border-active);
        color: var(--color-neutral-outlined-active);
      }
      &:disabled {
        background-color: var(--color-neutral-outlined-background-disabled);
        border-color: var(--color-neutral-outlined-border-disabled);
        color: var(--color-neutral-outlined-disabled);
      }
    }

    :host([color='neutral'][variant='text']) button {
      background-color: var(--color-neutral-text-background);
      border-color: var(--color-neutral-text-border);
      color: var(--color-neutral-text);
      &:hover {
        background-color: var(--color-neutral-text-background-hover);
        border-color: var(--color-neutral-text-border-hover);
        color: var(--color-neutral-text-hover);
      }
      &:active {
        background-color: var(--color-neutral-text-background-active);
        border-color: var(--color-neutral-text-border-active);
        color: var(--color-neutral-text-active);
      }
      &:disabled {
        background-color: var(--color-neutral-text-background-disabled);
        border-color: var(--color-neutral-text-border-disabled);
        color: var(--color-neutral-text-disabled);
      }
    }

    :host([color='danger'][variant='strong']) button {
      background-color: var(--color-danger-strong-background);
      border-color: var(--color-danger-strong-border);
      color: var(--color-danger-strong);
      &:hover {
        background-color: var(--color-danger-strong-background-hover);
        border-color: var(--color-danger-strong-border-hover);
        color: var(--color-danger-strong-hover);
      }
      &:active {
        background-color: var(--color-danger-strong-background-active);
        border-color: var(--color-danger-strong-border-active);
        color: var(--color-danger-strong-active);
      }
      &:disabled {
        background-color: var(--color-danger-strong-background-disabled);
        border-color: var(--color-danger-strong-border-disabled);
        color: var(--color-danger-strong-disabled);
      }
    }

    :host([color='danger'][variant='subtle']) button {
      background-color: var(--color-danger-subtle-background);
      border-color: var(--color-danger-subtle-border);
      color: var(--color-danger-subtle);
      &:hover {
        background-color: var(--color-danger-subtle-background-hover);
        border-color: var(--color-danger-subtle-border-hover);
        color: var(--color-danger-subtle-hover);
      }
      &:active {
        background-color: var(--color-danger-subtle-background-active);
        border-color: var(--color-danger-subtle-border-active);
        color: var(--color-danger-subtle-active);
      }
      &:disabled {
        background-color: var(--color-danger-subtle-background-disabled);
        border-color: var(--color-danger-subtle-border-disabled);
        color: var(--color-danger-subtle-disabled);
      }
    }

    :host([color='danger'][variant='outlined']) button {
      background-color: var(--color-danger-outlined-background);
      border-color: var(--color-danger-outlined-border);
      color: var(--color-danger-outlined);
      &:hover {
        background-color: var(--color-danger-outlined-background-hover);
        border-color: var(--color-danger-outlined-border-hover);
        color: var(--color-danger-outlined-hover);
      }
      &:active {
        background-color: var(--color-danger-outlined-background-active);
        border-color: var(--color-danger-outlined-border-active);
        color: var(--color-danger-outlined-active);
      }
      &:disabled {
        background-color: var(--color-danger-outlined-background-disabled);
        border-color: var(--color-danger-outlined-border-disabled);
        color: var(--color-danger-outlined-disabled);
      }
    }

    :host([color='danger'][variant='text']) button {
      background-color: var(--color-danger-text-background);
      border-color: var(--color-danger-text-border);
      color: var(--color-danger-text);
      &:hover {
        background-color: var(--color-danger-text-background-hover);
        border-color: var(--color-danger-text-border-hover);
        color: var(--color-danger-text-hover);
      }
      &:active {
        background-color: var(--color-danger-text-background-active);
        border-color: var(--color-danger-text-border-active);
        color: var(--color-danger-text-active);
      }
      &:disabled {
        background-color: var(--color-danger-text-background-disabled);
        border-color: var(--color-danger-text-border-disabled);
        color: var(--color-danger-text-disabled);
      }
    }

    :host([icon-only]) button {
      border-radius: var(--dimension-icon-only-border-radius);
    }

    :host([icon-only][size='small']) button {
      padding: calc(0.375rem - var(--fhi-dimension-border-width));
    }

    :host([icon-only][size='medium']) button {
      padding: calc(var(--fhi-spacing-100) - var(--fhi-dimension-border-width));
    }

    :host([icon-only][size='large']) button {
      padding: calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width));
    }
  `;
}
