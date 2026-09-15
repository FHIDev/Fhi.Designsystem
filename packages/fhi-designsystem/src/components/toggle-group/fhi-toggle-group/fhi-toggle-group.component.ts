import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiToggleGroupSelector = 'fhi-toggle-group';
const FhiToggleGroupItemSelector = 'fhi-toggle-group-item';
const FhiToggleGroupItemSelectEvent = 'fhi-toggle-group-item-select';

type ToggleGroupItemElement = HTMLElement & {
  variant: 'strong' | 'subtle';
  selected: boolean;
  checked?: boolean;
  setTabbable: (isTabbable: boolean) => void;
  focus: (options?: FocusOptions) => void;
};

@customElement(FhiToggleGroupSelector)
export class FhiToggleGroup extends LitElement {
  @property({ type: String, reflect: true }) variant: 'strong' | 'subtle' =
    'strong';

  private _selectedItem: ToggleGroupItemElement | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      FhiToggleGroupItemSelectEvent,
      this._handleItemSelect as EventListener,
    );
    this.addEventListener('keydown', this._handleKeyDown as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(
      FhiToggleGroupItemSelectEvent,
      this._handleItemSelect as EventListener,
    );
    this.removeEventListener('keydown', this._handleKeyDown as EventListener);
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('variant')) {
      this._syncItems(false);
    }
  }

  private _getItems(): ToggleGroupItemElement[] {
    return Array.from(
      this.querySelectorAll<ToggleGroupItemElement>(FhiToggleGroupItemSelector),
    );
  }

  private _dispatchChangeEvent() {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _selectItem(item: ToggleGroupItemElement, emitChange = true) {
    const didChange = this._selectedItem !== item || !item.selected;

    this._getItems().forEach(groupItem => {
      const isCurrent = groupItem === item;

      groupItem.selected = isCurrent;
      groupItem.checked = isCurrent;
    });

    this._selectedItem = item;

    if (didChange && emitChange) {
      this._dispatchChangeEvent();
    }
  }

  private _syncItems(emitChange = false) {
    const items = this._getItems();

    if (!items.length) {
      this._selectedItem = null;
      return;
    }

    items.forEach(item => {
      item.variant = this.variant;
    });

    const selectedItem = items.find(item => item.selected || item.checked);

    if (!selectedItem) {
      const firstEnabledItem = items[0] ?? null;

      if (!firstEnabledItem) {
        items.forEach(item => {
          item.selected = false;
          item.checked = false;
        });
        this._selectedItem = null;

        return;
      }

      this._selectItem(firstEnabledItem, emitChange);
      return;
    }

    this._selectItem(selectedItem, emitChange);
  }

  private _resolveItemFromEvent(event: Event): ToggleGroupItemElement | null {
    const path = event.composedPath();

    const item = path.find(node => {
      return (
        node instanceof HTMLElement &&
        node.tagName.toLowerCase() === FhiToggleGroupItemSelector
      );
    });

    return (item as ToggleGroupItemElement | undefined) ?? null;
  }

  private _handleItemSelect = (
    event: CustomEvent<{ item?: ToggleGroupItemElement }>,
  ) => {
    const item = event.detail.item;

    if (!item || !this.contains(item)) {
      return;
    }

    this._selectItem(item, true);
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (!arrows.includes(event.key)) {
      return;
    }

    const items = this._getItems();

    if (items.length < 2) {
      return;
    }

    event.preventDefault();

    const currentItem =
      this._resolveItemFromEvent(event) ?? this._selectedItem ?? items[0];

    const currentIndex = items.indexOf(currentItem);
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;

    const nextIndex =
      event.key === 'ArrowUp' || event.key === 'ArrowLeft'
        ? fallbackIndex === 0
          ? items.length - 1
          : fallbackIndex - 1
        : fallbackIndex === items.length - 1
          ? 0
          : fallbackIndex + 1;

    const nextItem = items[nextIndex];

    this._selectItem(nextItem, true);
    nextItem.focus();
  };

  private _handleSlotChange = () => {
    this._syncItems(false);
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
      background-color: var(--fhi-color-neutral-surface-strong);
      border-color: var(--fhi-color-neutral-border-subtle);
    }

    :host([variant='subtle']) {
      background-color: var(--fhi-color-neutral-surface-default);
      border-color: var(--fhi-color-neutral-surface-default);
    }
  `;
}
