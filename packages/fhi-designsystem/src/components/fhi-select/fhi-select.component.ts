import { html, css, LitElement } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators.js';
import { FhiSelectItem } from './fhi-select-item.component';

export const FhiSelectSelector = 'fhi-select';

@customElement(FhiSelectSelector)
export class FhiSelect extends LitElement {
  @queryAssignedElements()
  slotElements!: Array<HTMLElement>;

  private _renderOptionElements() {
    const items = this.slotElements.filter(
      element => element.tagName.toLowerCase() === 'fhi-select-item',
    ) as FhiSelectItem[];

    return html`
      ${items.map(item => {
        return html`<option
          value="${item.value}"
          label="${item.label}"
          ?disabled="${item.disabled}"
          ?selected="${item.selected}"
        >
          ${item.textContent}
        </option>`;
      })}
    `;
  }

  private _handleSlotChange() {
    this.requestUpdate();
  }

  render() {
    return html`
      <slot hidden @slotchange=${this._handleSlotChange}></slot>
      <select>
        ${this._renderOptionElements()}
      </select>
    `;
  }

  static styles = css``;
}
