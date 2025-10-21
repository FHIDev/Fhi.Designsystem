import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiDisplay } from './fhi-display.component';

describe('fhi-display', () => {
  new FhiDisplay();

  let component: FhiDisplay;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-display level="1">Test</fhi-display>`,
      );
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiDisplay>(
        html`<fhi-display level="1">Test</fhi-display>`,
      );
      expect(component.hasAttribute('role')).to.equal(false);
    });
  });
});
