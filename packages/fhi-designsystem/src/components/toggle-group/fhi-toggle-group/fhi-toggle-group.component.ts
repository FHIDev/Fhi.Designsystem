import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  FhiToggleGroupItemSelector,
  type FhiToggleGroupItem,
} from '../fhi-toggle-group-item/fhi-toggle-group-item.component';

export const FhiToggleGroupSelector = 'fhi-toggle-group';

/**
 * ## FHI Toggle Group
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-toggle-group--docs}
 *
 * The <fhi-toggle-group> component lets the user select one option from a group of related choices. Each choice is defined with a <fhi-toggle-group-item> element.
 *
 * The choice should affect the content within the same context.
 *
 * Example usage:
 * ```html
 * <fhi-toggle-group value="item2">
 *   <fhi-toggle-group-item value="item1">Item 1</fhi-toggle-group-item>
 *   <fhi-toggle-group-item value="item2">Item 2</fhi-toggle-group-item>
 *   <fhi-toggle-group-item value="item3">Item 3</fhi-toggle-group-item>
 * </fhi-toggle-group>
 * ```
 *
 * @tag fhi-toggle-group
 * @element fhi-toggle-group
 *
 * @slot - The default slot. Used for placing <fhi-toggle-group-item> elements.
 */
@customElement(FhiToggleGroupSelector)
export class FhiToggleGroup extends LitElement {
  /**
   * The visual style of the toggle group. This will be applied to all toggle group items within the group.
   *
   * @reflect
   * @type {'strong' | 'subtle'}
   */
  @property({ type: String, reflect: true }) variant: 'strong' | 'subtle' =
    'strong';

  /**
   * The currently selected value of the toggle group.
   *
   * @reflect
   * @type {string}
   */
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

    this._mutationObserver.observe(this, {
      attributes: true,
      attributeFilter: ['selected', 'value'],
      childList: true,
      characterData: true,
      subtree: true,
    });

    if (this.hasUpdated) {
      this._syncAfterReconnect();
    }
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._mutationObserver.disconnect();
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has('variant') && !this.variant) {
      this.variant = 'strong';
    }

    super.update(changedProperties);
  }

  public updated(changedProperties: PropertyValues) {
    if (changedProperties.has('variant')) {
      this._syncVariant();
    }

    if (changedProperties.has('value')) {
      this._syncSelectionFromValue();
    }
  }

  private async _syncAfterReconnect(): Promise<void> {
    await this.updateComplete;

    if (!this.isConnected) {
      return;
    }

    this._syncVariant();
    this._syncSelectionFromItems();
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
    // wait until all pending updates are completed before syncing.
    if (this.isUpdatePending) {
      void this.updateComplete.then(() => {
        if (this.isConnected) {
          this._syncSelectionFromItems();
        }
      });
      return;
    }

    const items = this._getItems();
    this._setSelectedItem(this._getSelectedItem(items));
  }

  private _getSelectedItem(
    items: FhiToggleGroupItem[],
  ): FhiToggleGroupItem | null {
    const newlySelectedItem = items.find(
      item => item.selected && item !== this._selectedItem,
    );
    const selectedItem = items.find(item => item.selected);

    return newlySelectedItem ?? selectedItem ?? items[0] ?? null;
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
    this._getItems().forEach(item => {
      item.variant = this.variant;
    });
  }

  private _handleSlotChange = () => {
    this._syncSelectionFromItems();
  };

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      border-radius: var(--fhi-border-radius-full);
      border: 1px solid var(--fhi-color-neutral-border-subtle);
      padding: calc(var(--fhi-spacing-050) - var(--fhi-dimension-border-width));
      gap: var(--fhi-spacing-050);
    }

    :host([variant='subtle']) {
      background-color: var(--fhi-color-neutral-surface-default);
      border-color: var(--fhi-color-neutral-surface-default);
    }
  `;
}
