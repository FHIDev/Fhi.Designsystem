import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiLabel } from './fhi-label.component';

describe('fhi-label', () => {
  new FhiLabel();

  let component: FhiLabel;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-label>Test</fhi-label>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiLabel>(
        html`<fhi-label>Test</fhi-label>`,
      );
      expect(component.hasAttribute('role')).to.equal(false);
    });
  });

  describe('Setting attributes', () => {
    it('has an attribute to set color', async () => {
      const component = await fixture<FhiLabel>(
        html`<fhi-label color="black">Test</fhi-label>`,
      );

      expect(component.getAttribute('color')).to.equal('black');
      expect(component.color).to.equal('black');
    });

    it('has an attribute to set size', async () => {
      const component = await fixture<FhiLabel>(
        html`<fhi-label size="small">Test</fhi-label>`,
      );

      expect(component.getAttribute('size')).to.equal('small');
      expect(component.size).to.equal('small');
    });
  });
});
