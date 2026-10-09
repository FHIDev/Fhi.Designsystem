import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  FhiToggleGroupItemSelector,
  type FhiToggleGroupItem,
} from '../fhi-toggle-group-item/fhi-toggle-group-item.component';

export const FhiToggleGroupSelector = 'fhi-toggle-group';

@customElement(FhiToggleGroupSelector)
export class FhiToggleGroup extends LitElement {
  @property({ type: String, reflect: true }) variant: 'strong' | 'subtle' =
    'strong';

  private _selectedItem: FhiToggleGroupItem | null = null;

  private readonly _mutationObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (
        mutation.target instanceof Element &&
        mutation.target.matches(FhiToggleGroupItemSelector)
      ) {
        const item = mutation.target as FhiToggleGroupItem;
        if (item.selected) {
          this._setSelectedItem(item);
        }
      }
    }
  });

  public connectedCallback() {
    super.connectedCallback();
    this._mutationObserver.observe(this, {
      attributes: true,
      attributeFilter: ['selected'],
      subtree: true,
    });
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._mutationObserver.disconnect();
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

  private _getItems(): FhiToggleGroupItem[] {
    return Array.from(
      this.querySelectorAll<FhiToggleGroupItem>('fhi-toggle-group-item'),
    );
  }

  private _dispatchChangeEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the selected item of the toggle group changes.
     */
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _setSelectedItem(item: FhiToggleGroupItem) {
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

  private _handleSlotChange = () => {
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
      border: 1px solid var(--fhi-color-neutral-border-subtle);
      padding: calc(var(--fhi-spacing-050) - var(--fhi-dimension-border-width));
      gap: var(--fhi-spacing-100);
    }

    :host([variant='subtle']) {
      background-color: var(--fhi-color-neutral-surface-default);
      border-color: var(--fhi-color-neutral-surface-default);
    }
  `;
}
