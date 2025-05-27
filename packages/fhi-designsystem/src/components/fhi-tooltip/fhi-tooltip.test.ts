import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiTooltip } from './fhi-tooltip.component';

describe('fhi-tooltip', () => {
  new FhiTooltip();

  let component: FhiTooltip;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );
    });

    it('is not visible by default', async () => {
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      const isVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isVisible).to.equal(false);
    });

    it('is has an accessible child', async () => {
      const child = component.querySelector('#child');

      const isVisible = child?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isVisible).to.equal(true);
      await expect(child).to.be.accessible();
    });

    it('has role "tooltip"', async () => {
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      expect(tooltip?.getAttribute('role')).to.equal('tooltip');
    });

    it('labels the child with aria-labelledby on the slot"', async () => {
      const tooltip = component.shadowRoot?.querySelector('slot');

      expect(tooltip?.getAttribute('aria-labelledby')).to.equal('tooltip');
    });

    it('has aria-hidden set to "true" when hidden', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip" trigger="click">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      const tooltip = component.shadowRoot?.querySelector('#tooltip');
      const child = component.querySelector('#child') as HTMLElement;

      child?.click();
      await component.updateComplete;

      expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');
    });

    it('has aria-hidden set to "false" when visible', async () => {
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      expect(tooltip?.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  /*

  describe('interactions', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span>My Element</span>
        </fhi-tooltip>`,
      );
    });

    it('will open, and become accessable, on child click', () => {
      const child = component.querySelector('span');
      child?.dispatchEvent(new Event('click'));

      console.log(component.shadowRoot?.querySelector('.tooltip'));

      expect(
        component.shadowRoot?.querySelector('.tooltip'),
      ).to.be.accessible();

      expect(
        component.shadowRoot?.querySelector('.tooltip'),
      ).not.to.be.accessible();
    });
  });

  */
});
