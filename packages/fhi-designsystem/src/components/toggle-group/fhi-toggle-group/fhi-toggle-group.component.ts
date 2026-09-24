import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiToggleGroupSelector = 'fhi-toggle-group';

type ToggleGroupItemElement = HTMLElement & {
  variant: 'strong' | 'subtle';
  selected: boolean;
  setTabbable: (isTabbable: boolean) => void;
  focus: (options?: FocusOptions) => void;
};

@customElement(FhiToggleGroupSelector)
export class FhiToggleGroup extends LitElement {
  @property({ type: String, reflect: true }) variant: 'strong' | 'subtle' =
    'strong';

  private _selectedItem: ToggleGroupItemElement | null = null;
  private _mutationObserver: MutationObserver | null = null;

  constructor() {
    super();
    this._mutationObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        this._setSelectedItem(mutation.target as ToggleGroupItemElement);
      }
      //this._handleSlotChange();
    });
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._mutationObserver?.disconnect();
  }

  public updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('variant')) {
      this._syncVariant();
    }
    if (!this._selectedItem) {
      const items = this._getItems();
      const selectedItem = items.find(item => item.selected);
      if (selectedItem) {
        this._setSelectedItem(selectedItem);
      } else {
        this._setSelectedItem(items[0]);
      }
    }
  }

  private _getItems(): ToggleGroupItemElement[] {
    return Array.from(
      this.querySelectorAll<ToggleGroupItemElement>('fhi-toggle-group-item'),
    );
  }

  private _dispatchChangeEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the selected item of the toggle group changes.
     */
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _setSelectedItem(item: ToggleGroupItemElement) {
    if (!this._selectedItem) {
      item.selected = true;
      this._selectedItem = item;
      this._dispatchChangeEvent();
    }

    if (this._selectedItem && this._selectedItem !== item && item.selected) {
      this._selectedItem.selected = false;
      this._selectedItem = item;
      this._dispatchChangeEvent();
    }
  }

  private _syncVariant() {
    const items = this._getItems();

    items.forEach(item => {
      item.variant = this.variant;
    });
  }

  private _observeItems() {
    this._mutationObserver?.disconnect();

    const items = this._getItems();

    for (const item of items) {
      this._mutationObserver?.observe(item, {
        attributes: true,
        attributeFilter: ['selected'],
      });
    }
  }

  private _handleSlotChange = () => {
    this._observeItems();
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="group" role="group">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      border-radius: var(--fhi-border-radius-full);
      border: 1px solid;
      padding: var(--fhi-spacing-050);
      gap: var(--fhi-spacing-100);
    }

    :host([variant='strong']) {
      background-color: var(--fhi-color-neutral-background-default);
      border-color: var(--fhi-color-neutral-border-subtle);
    }

    :host([variant='subtle']) {
      background-color: var(--fhi-color-neutral-surface-default);
      border-color: var(--fhi-color-neutral-surface-default);
    }
  `;
}
