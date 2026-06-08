import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiSelectItemSelector = 'fhi-select-item';

/**
 * ## FHI Select Item
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-select--docs}
 *
 * The `<fhi-select-item>` component is used to represent an individual option within a `<fhi-select>` dropdown list.
 * It provides a labeled option element with selection state and value attribute.
 *
 * @tag fhi-select-item
 * @element fhi-select-item
 *
 * @slot - The default slot is used to provide text content for the `<fhi-select-item>` element.
 */
@customElement(FhiSelectItemSelector)
export class FhiSelectItem extends LitElement {
  /**
   * The label attribute of the select item. This property is used to provide a descriptive label for the select item. If not provided, the content of the `value` attribute will be used instead.
   * @type {string | null}
   */
  @property({ type: String, reflect: true })
  label: string | null = null;

  /**
   * The selected attribute of the select item. This property is used to indicate whether the select item is selected or not.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The value attribute of the select item. This property is used to identify the select item when submitting a form. If not provided, the text content will be used instead.
   * @type {string | null}
   */
  @property({ type: String, reflect: true })
  value: string | null = null;
}
