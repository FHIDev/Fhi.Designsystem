import { css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiSelectItemSelector = 'fhi-select-item';

@customElement(FhiSelectItemSelector)
export class FhiSelectItem extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: String, reflect: true })
  value = '';

  static styles = css``;
}
