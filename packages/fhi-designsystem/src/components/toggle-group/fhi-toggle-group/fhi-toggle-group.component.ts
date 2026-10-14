import { html, css, LitElement, PropertyValues } from 'lit';
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

  @property({ type: String, reflect: true }) value?: string;

  private _selectedItem: FhiToggleGroupItem | null = null;

  private readonly _mutationObserver = new MutationObserver(mutations => {
    const hasItemChanges = mutations.some(
      mutation => mutation.type !== 'attributes' || mutation.target !== this,
    );

    if (!hasItemChanges) {
      return;
    }

    if (mutations.some(mutation => mutation.type === 'childList')) {
      this._syncVariant();
    }

    this._syncSelectionFromItems();
  });

  public connectedCallback() {
    super.connectedCallback();

    this.role = 'group';

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }

    this._mutationObserver.observe(this, {
      attributes: true,
      attributeFilter: ['selected', 'value'],
      childList: true,
      characterData: true,
      subtree: true,
    });

    // Sync if the component is reconnected to the DOM after being disconnected.
    if (this.hasUpdated) {
      void this.updateComplete.then(() => {
        if (!this.isConnected) {
          return;
        }

        this._syncVariant();
        this._syncSelectionFromItems();
      });
    }
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._mutationObserver.disconnect();
  }

  protected update(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('variant')) {
      if (!this.variant) {
        this.variant = 'strong';
      }
    }

    super.update(_changedProperties);
  }

  public updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('variant')) {
      this._syncVariant();
    }

    if (changedProperties.has('value')) {
      this._syncSelectionFromValue();
    }
  }

  private _syncSelectionFromValue() {
    const items = this._getItems();
    const selectedItem = this._getSelectedItem(items);

    if (selectedItem && this._getItemValue(selectedItem) === this.value) {
      this._setSelectedItem(selectedItem);
      return;
    }

    const valueMatchingItem = items.find(
      item => this._getItemValue(item) === this.value,
    );

    this._setSelectedItem(valueMatchingItem ?? selectedItem);
  }

  private _syncSelectionFromItems() {
    const items = this._getItems();
    this._setSelectedItem(this._getSelectedItem(items));
  }

  private _getSelectedItem(
    items: FhiToggleGroupItem[],
  ): typeof this._selectedItem {
    const newlySelectedItem = items.find(
      item => item.selected && item !== this._selectedItem,
    );

    if (newlySelectedItem) {
      return newlySelectedItem;
    }

    const selectedItem = items.find(item => item.selected);

    return selectedItem ?? items[0] ?? null;
  }

  private _getItems(): FhiToggleGroupItem[] {
    return Array.from(
      this.querySelectorAll<FhiToggleGroupItem>(FhiToggleGroupItemSelector),
    );
  }

  private _dispatchChangeEvent() {
    /**
     * @type {Event} - Standard DOM event with the type `change`.
     * This event is dispatched when the selected item of the toggle group changes.
     */
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _getItemValue(item: FhiToggleGroupItem | null): string {
    return item?.value ?? item?.textContent?.trim() ?? '';
  }

  private _setSelectedItem(item: FhiToggleGroupItem | null) {
    const selectionChanged = this._selectedItem !== item;

    this._getItems().forEach(groupItem => {
      groupItem.selected = groupItem === item;
    });

    this._selectedItem = item;
    this.value = this._getItemValue(item);

    if (selectionChanged) {
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
    this._syncSelectionFromItems();
  };

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      width: fit-content;
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
