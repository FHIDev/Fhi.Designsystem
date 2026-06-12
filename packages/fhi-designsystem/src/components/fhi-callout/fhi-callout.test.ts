import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiCallout } from './fhi-callout.component';

describe('fhi-callout', () => {
  new FhiCallout();

  let component: FhiCallout;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-callout></fhi-callout>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the heading', async () => {
      component = await fixture(
        html`<fhi-callout heading="Heading"></fhi-callout>`,
      );
      expect(component.heading).to.equal('Heading');
    });

    it('has an attribute to set the color', async () => {
      component = await fixture(
        html`<fhi-callout color="success"></fhi-callout>`,
      );
      expect(component.color).to.equal('success');
    });

    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-callout variant="bordered"></fhi-callout>`,
      );
      expect(component.variant).to.equal('bordered');
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the heading property to an attribute', async () => {
      component = await fixture(html`<fhi-callout></fhi-callout>`);

      component.heading = 'Heading';

      await component.updateComplete;
      expect(component.getAttribute('heading')).to.equal('Heading');
    });

    it('reflects the color property to an attribute', async () => {
      component = await fixture(html`<fhi-callout></fhi-callout>`);

      component.color = 'warning';

      await component.updateComplete;
      expect(component.getAttribute('color')).to.equal('warning');
    });

    it('reflects the variant property to an attribute', async () => {
      component = await fixture(html`<fhi-callout></fhi-callout>`);

      component.variant = 'bordered';

      await component.updateComplete;
      expect(component.getAttribute('variant')).to.equal('bordered');
    });
  });
});
