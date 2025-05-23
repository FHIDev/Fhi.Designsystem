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
          <span>My Element</span>
        </fhi-tooltip>`,
      );
    });

    it('is not accessable by default', async () => {
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      const isVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isVisible).to.equal(false);
      await expect(tooltip).to.not.be.accessible();
    });

    it('is has an accessible child', async () => {
      const child = component.querySelector('span');

      const isVisible = child?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isVisible).to.equal(true);
      await expect(child).to.be.accessible();
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
