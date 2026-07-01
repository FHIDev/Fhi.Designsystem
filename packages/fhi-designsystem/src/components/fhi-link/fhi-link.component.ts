import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiLinkSelector = 'fhi-link';

/**
 * ## FHI Link
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-link--docs}
 *
 * The `<fhi-link>` component is used to create hyperlinks styled according to the FHI Design System.
 * It is usefull for navigation within the application or to external resources, providing a consistent look and feel for links across the application.
 *
 * @tag fhi-link
 * @element fhi-link
 *
 */
@customElement(FhiLinkSelector)
export class FhiLink extends LitElement {
  /**
   * The URL for the link.
   *
   * It follows the same behavior as the standard HTML `<a>` element's href attribute.
   *
   * For more information, see: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href}
   * @type {string}
   */
  @property({ type: String })
  href?: string;

  /**
   * The target attribute specifies where to open the linked document.
   *
   * It follows the same behavior as the standard HTML `<a>` element's target attribute.
   *
   * For more information, see: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target}
   */
  @property({ type: String })
  target?: '_self' | '_blank' | '_parent' | '_top' = '_self';

  get rel() {
    return this.target && this.target !== '_self'
      ? 'noopener noreferrer'
      : undefined;
  }

  render() {
    return html`
      <a
        href="${ifDefined(this.href)}"
        target="${ifDefined(this.target)}"
        rel="${ifDefined(this.rel)}"
      >
        <slot></slot>
      </a>
    `;
  }

  static styles = css`
    :host {
      --fhi-link-color: unset;
    }

    :host {
      --fhi-link-color: currentcolor;

      color: var(--fhi-link-color);

      letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

      font: var(--fhi-typography-body-medium-font-weight)
        var(--fhi-typography-body-medium-font-size) /
        var(--fhi-typography-body-medium-line-height)
        var(--fhi-font-family-default);

      a {
        color: inherit;
        transition: color var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default);

        text-decoration: underline;
        text-underline-offset: 0.125rem;
      }

      &:host(:hover) {
        --fhi-link-color: var(--fhi-color-accent-text-subtle);

        a {
          text-decoration-thickness: 0.125rem;
        }
      }

      &:host(:active) {
        --fhi-link-color: currentcolor;

        a {
          text-underline-offset: 0.25rem;
        }
      }
    }
  `;
}
