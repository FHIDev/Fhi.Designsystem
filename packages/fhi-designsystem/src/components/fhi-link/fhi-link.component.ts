import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const FhiLinkSelector = 'fhi-link';

@customElement(FhiLinkSelector)
export class FhiLink extends LitElement {
  @property({ type: String })
  href?: string;

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

      letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

      font: var(--fhi-typography-body-medium-font-weight)
        var(--fhi-typography-body-medium-font-size) /
        var(--fhi-typography-body-medium-line-height)
        var(--fhi-font-family-default);

      a {
        color: var(--fhi-link-color);
        transition: color var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default);

        text-decoration: underline;
        text-underline-offset: 0.125rem;
      }

      &:host(:hover) {
        --fhi-link-color: var(--fhi-color-accent-text-subtle);

        a {
          color: var(--fhi-color-accent-text-subtle);
          text-decoration-thickness: 0.125rem;
        }
      }

      &:host(:active) {
        --fhi-link-color: currentcolor;

        a {
          color: var(--fhi-link-color);
          text-underline-offset: 0.25rem;
        }
      }
    }
  `;
}
