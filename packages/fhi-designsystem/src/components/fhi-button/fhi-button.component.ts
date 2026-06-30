import { html, css, LitElement, PropertyValues } from 'lit';
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
   * @deprecated This property is deprecated and will be removed in a future release. The button will automatically detect if it only contains an icon and apply the appropriate styling.
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

  protected update(_changedProperties: PropertyValues): void {
    // If a falsy value is provided, default to 'accent'.
    if (_changedProperties.has('color')) {
      if (!this.color) {
        this.color = 'accent';
      }
    }

    // If a falsy value is provided, default to 'strong'.
    if (_changedProperties.has('variant')) {
      if (!this.variant) {
        this.variant = 'strong';
      }
    }

    // If an invalid value is provided, default to 'medium'.
    if (_changedProperties.has('size')) {
      if (!this.size) {
        this.size = 'medium';
      }
    }

    if (_changedProperties.has('iconOnly')) {
      if (this.getAttribute('icon-only') !== null) {
        console.warn(
          "The 'iconOnly' property is deprecated and will be removed in a future release. The button automatically detects if it only contains an icon and applies the appropriate styling.",
        );
      }
    }

    super.update(_changedProperties);
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

      if (this.iconOnly || validNodes.length === 1) {
        if (!this.iconOnly) {
          this.iconOnly = true;
        }

        firstIcon.setAttribute('size', this._getIconSize());
        return;
      }

      if (this.size != 'small') {
        firstIcon.style.marginRight = 'var(--fhi-spacing-050)';
      }
      firstIcon.style.marginLeft = 'calc(-1 * var(--fhi-spacing-050))';
      firstIcon.setAttribute('size', this._getIconSize());
    }

    const lastNode: Node = validNodes[validNodes.length - 1];

    // if the last node is an icon, style it.
    if (
      lastNode.nodeType === Node.ELEMENT_NODE &&
      (lastNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      const lastIcon = lastNode as HTMLElement;

      lastIcon.style.marginRight = 'calc(-1 * var(--fhi-spacing-050))';
      if (this.size != 'small') {
        lastIcon.style.marginLeft = 'var(--fhi-spacing-050)';
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
      ?data-icon-only=${this.iconOnly}
    >
      <div class="slot-container">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    </button>`;
  }

  static styles = css`
    :host {
      display: block;
      width: fit-content;

      button {
        border-radius: var(--fhi-border-radius-full);
        border: solid var(--fhi-dimension-border-width);
        font-family: var(--fhi-font-family-default);
        -webkit-font-smoothing: antialiased;
        transition: var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default);
        width: 100%;
        justify-items: center;

        cursor: pointer;
        &:disabled {
          opacity: var(--fhi-opacity-disabled);
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
      font-size: var(--fhi-typography-label-large-font-size);
      font-weight: var(--fhi-typography-label-large-font-weight);
      line-height: var(--fhi-typography-label-large-line-height);
      letter-spacing: var(--fhi-typography-label-large-letter-spacing);
      padding: calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width))
        calc(
          var(--fhi-spacing-300) + var(--fhi-spacing-050) - var(
              --fhi-dimension-border-width
            )
        );
    }

    :host([size='large'][variant='text']) button {
      padding: calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width))
        calc(var(--fhi-spacing-300) - var(--fhi-dimension-border-width));
    }

    :host([size='medium']) button {
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
    }

    :host([size='medium'][variant='text']) button {
      padding: calc(var(--fhi-spacing-100) - var(--fhi-dimension-border-width))
        calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width));
    }

    :host([size='small']) button {
      font-size: var(--fhi-typography-label-medium-font-size);
      font-weight: var(--fhi-typography-label-medium-font-weight);
      line-height: var(--fhi-typography-label-medium-line-height);
      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);
      padding: calc(var(--fhi-spacing-050) - var(--fhi-dimension-border-width))
        calc(
          var(--fhi-spacing-150) + var(--fhi-spacing-050) - var(
              --fhi-dimension-border-width
            )
        );
    }

    :host([size='small'][variant='text']) button {
      padding: calc(var(--fhi-spacing-050) - var(--fhi-dimension-border-width))
        calc(var(--fhi-spacing-150) - var(--fhi-dimension-border-width));
    }

    :host([color='accent'][variant='strong']) button {
      background-color: var(--fhi-color-accent-base-default);
      border-color: var(--fhi-color-accent-base-default);
      color: var(--fhi-color-accent-text-inverted);
      &:hover {
        background-color: var(--fhi-color-accent-base-hover);
        border-color: var(--fhi-color-accent-base-hover);
        color: var(--fhi-color-accent-text-inverted);
      }
      &:active {
        background-color: var(--fhi-color-accent-base-active);
        border-color: var(--fhi-color-accent-base-active);
        color: var(--fhi-color-accent-text-inverted);
      }
      &:disabled {
        background-color: var(--fhi-color-accent-base-default);
        border-color: var(--fhi-color-accent-base-default);
        color: var(--fhi-color-accent-text-inverted);
      }
    }

    :host([color='accent'][variant='subtle']) button {
      background-color: var(--fhi-color-accent-surface-default);
      border-color: var(--fhi-color-accent-surface-default);
      color: var(--fhi-color-accent-text-subtle);
      &:hover {
        background-color: var(--fhi-color-accent-surface-hover);
        border-color: var(--fhi-color-accent-surface-hover);
        color: var(--fhi-color-accent-text-default);
      }
      &:active {
        background-color: var(--fhi-color-accent-surface-active);
        border-color: var(--fhi-color-accent-surface-active);
        color: var(--fhi-color-accent-text-default);
      }
      &:disabled {
        background-color: var(--fhi-color-accent-surface-default);
        border-color: var(--fhi-color-accent-surface-default);
        color: var(--fhi-color-accent-text-subtle);
      }
    }

    :host([color='accent'][variant='outlined']) button {
      background-color: transparent;
      border-color: var(--fhi-color-accent-border-subtle);
      color: var(--fhi-color-accent-text-subtle);
      &:hover {
        background-color: var(--fhi-color-accent-surface-default);
        border-color: var(--fhi-color-accent-surface-default);
        color: var(--fhi-color-accent-text-default);
      }
      &:active {
        background-color: var(--fhi-color-accent-surface-hover);
        border-color: var(--fhi-color-accent-surface-hover);
        color: var(--fhi-color-accent-text-default);
      }
      &:disabled {
        background-color: transparent;
        border-color: var(--fhi-color-accent-border-subtle);
        color: var(--fhi-color-accent-text-subtle);
      }
    }

    :host([color='accent'][variant='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--fhi-color-accent-text-subtle);
      &:hover {
        background-color: var(--fhi-color-accent-surface-default);
        border-color: var(--fhi-color-accent-surface-default);
        color: var(--fhi-color-accent-text-default);
      }
      &:active {
        background-color: var(--fhi-color-accent-surface-hover);
        border-color: var(--fhi-color-accent-surface-hover);
        color: var(--fhi-color-accent-text-default);
      }
      &:disabled {
        background-color: transparent;
        border-color: transparent;
        color: var(--fhi-color-accent-text-default);
      }
    }

    :host([color='neutral'][variant='strong']) button {
      background-color: var(--fhi-color-neutral-base-default);
      border-color: var(--fhi-color-neutral-base-default);
      color: var(--fhi-color-neutral-text-inverted);
      &:hover {
        background-color: var(--fhi-color-neutral-base-hover);
        border-color: var(--fhi-color-neutral-base-hover);
        color: var(--fhi-color-neutral-text-inverted);
      }
      &:active {
        background-color: var(--fhi-color-neutral-base-active);
        border-color: var(--fhi-color-neutral-base-active);
        color: var(--fhi-color-neutral-text-inverted);
      }
      &:disabled {
        background-color: var(--fhi-color-neutral-base-default);
        border-color: var(--fhi-color-neutral-base-default);
        color: var(--fhi-color-neutral-text-inverted);
      }
    }

    :host([color='neutral'][variant='subtle']) button {
      background-color: var(--fhi-color-neutral-surface-default);
      border-color: var(--fhi-color-neutral-surface-default);
      color: var(--fhi-color-neutral-text-subtle);
      &:hover {
        background-color: var(--fhi-color-neutral-surface-hover);
        border-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text-default);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-active);
        border-color: var(--fhi-color-neutral-surface-active);
        color: var(--fhi-color-neutral-text-default);
      }
      &:disabled {
        background-color: var(--fhi-color-neutral-surface-default);
        border-color: var(--fhi-color-neutral-surface-default);
        color: var(--fhi-color-neutral-text-default);
      }
    }

    :host([color='neutral'][variant='outlined']) button {
      background-color: transparent;
      border-color: var(--fhi-color-neutral-border-subtle);
      color: var(--fhi-color-neutral-text-subtle);
      &:hover {
        background-color: var(--fhi-color-neutral-surface-default);
        border-color: var(--fhi-color-neutral-surface-default);
        color: var(--fhi-color-neutral-text-default);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-hover);
        border-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text-default);
      }
      &:disabled {
        background-color: transparent;
        border-color: var(--fhi-color-neutral-border-subtle);
        color: var(--fhi-color-neutral-text-subtle);
      }
    }

    :host([color='neutral'][variant='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--fhi-color-neutral-text-subtle);
      &:hover {
        background-color: var(--fhi-color-neutral-surface-default);
        border-color: var(--fhi-color-neutral-surface-default);
        color: var(--fhi-color-neutral-text-default);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-hover);
        border-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text-default);
      }
      &:disabled {
        background-color: transparent;
        border-color: transparent;
        color: var(--fhi-color-neutral-text-subtle);
      }
    }

    :host([color='danger'][variant='strong']) button {
      background-color: var(--fhi-color-danger-base-default);
      border-color: var(--fhi-color-danger-base-default);
      color: var(--fhi-color-danger-text-inverted);
      &:hover {
        background-color: var(--fhi-color-danger-base-hover);
        border-color: var(--fhi-color-danger-base-hover);
        color: var(--fhi-color-danger-text-inverted);
      }
      &:active {
        background-color: var(--fhi-color-danger-base-active);
        border-color: var(--fhi-color-danger-base-active);
        color: var(--fhi-color-danger-text-inverted);
      }
      &:disabled {
        background-color: var(--fhi-color-danger-base-default);
        border-color: var(--fhi-color-danger-base-default);
        color: var(--fhi-color-danger-text-inverted);
      }
    }

    :host([color='danger'][variant='subtle']) button {
      background-color: var(--fhi-color-danger-surface-default);
      border-color: var(--fhi-color-danger-surface-default);
      color: var(--fhi-color-danger-text-subtle);
      &:hover {
        background-color: var(--fhi-color-danger-surface-hover);
        border-color: var(--fhi-color-danger-surface-hover);
        color: var(--fhi-color-danger-text-default);
      }
      &:active {
        background-color: var(--fhi-color-danger-surface-active);
        border-color: var(--fhi-color-danger-surface-active);
        color: var(--fhi-color-danger-text-default);
      }
      &:disabled {
        background-color: var(--fhi-color-danger-surface-default);
        border-color: var(--fhi-color-danger-surface-default);
        color: var(--fhi-color-danger-text-subtle);
      }
    }

    :host([color='danger'][variant='outlined']) button {
      background-color: transparent;
      border-color: var(--fhi-color-danger-border-subtle);
      color: var(--fhi-color-danger-text-subtle);
      &:hover {
        background-color: var(--fhi-color-danger-surface-default);
        border-color: var(--fhi-color-danger-surface-default);
        color: var(--fhi-color-danger-text-default);
      }
      &:active {
        background-color: var(--fhi-color-danger-surface-hover);
        border-color: var(--fhi-color-danger-surface-hover);
        color: var(--fhi-color-danger-text-default);
      }
      &:disabled {
        background-color: transparent;
        border-color: var(--fhi-color-danger-border-subtle);
        color: var(--fhi-color-danger-text-subtle);
      }
    }

    :host([color='danger'][variant='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--fhi-color-danger-text-subtle);
      &:hover {
        background-color: var(--fhi-color-danger-surface-default);
        border-color: var(--fhi-color-danger-surface-default);
        color: var(--fhi-color-danger-text-default);
      }
      &:active {
        background-color: var(--fhi-color-danger-surface-hover);
        border-color: var(--fhi-color-danger-surface-hover);
        color: var(--fhi-color-danger-text-default);
      }
      &:disabled {
        background-color: transparent;
        border-color: transparent;
        color: var(--fhi-color-danger-text-subtle);
      }
    }

    :host([size='small']) button[data-icon-only] {
      padding: calc(0.375rem - var(--fhi-dimension-border-width));
    }

    :host([size='medium']) button[data-icon-only] {
      padding: calc(var(--fhi-spacing-100) - var(--fhi-dimension-border-width));
    }

    :host([size='large']) button[data-icon-only] {
      padding: calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width));
    }
  `;
}
