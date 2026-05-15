import { html, css, LitElement } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators.js';

export const FhiSelectSelector = 'fhi-select';

@customElement(FhiSelectSelector)
export class FhiSelect extends LitElement {
  @queryAssignedElements()
  options!: Array<HTMLOptionElement>;

  private _renderOptionElements() {
    return this.options.map(
      option => option.cloneNode(true) as HTMLOptionElement,
    );
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
