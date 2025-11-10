import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiBody } from './fhi-body.component';

describe('fhi-body', () => {
  new FhiBody();

  let component: FhiBody;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-body>Test</fhi-body>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiBody>(html`<fhi-body>Test</fhi-body>`);
      expect(component.hasAttribute('role')).to.equal(false);
    });
  });

  describe('Setting attributes', () => {
    it('has an attribute to set color', async () => {
      const component = await fixture<FhiBody>(
        html`<fhi-body color="black">Test</fhi-body>`,
      );

      expect(component.getAttribute('color')).to.equal('black');
      expect(component.color).to.equal('black');
    });

    it('has an attribute to set size', async () => {
      const component = await fixture<FhiBody>(
        html`<fhi-body size="small">Test</fhi-body>`,
      );

      expect(component.getAttribute('size')).to.equal('small');
      expect(component.size).to.equal('small');
    });
  });
});
