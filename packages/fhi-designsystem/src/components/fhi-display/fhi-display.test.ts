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

  describe('Setting attributes', () => {
    it('has an attribute to set level', async () => {
      const component = await fixture<FhiDisplay>(
        html`<fhi-display level="1">Test</fhi-display>`,
      );

      expect(component.getAttribute('level')).to.equal('1');
      expect(component.level).to.equal(1);
    });

    it('has an attribute to set color', async () => {
      const component = await fixture<FhiDisplay>(
        html`<fhi-display level="1" color="black">Test</fhi-display>`,
      );

      expect(component.getAttribute('color')).to.equal('black');
      expect(component.color).to.equal('black');
    });

    it('has an attribute to set size', async () => {
      const component = await fixture<FhiDisplay>(
        html`<fhi-display level="1" size="small">Test</fhi-display>`,
      );

      expect(component.getAttribute('size')).to.equal('small');
      expect(component.size).to.equal('small');
    });

    it('renders the correct h level', async () => {
      component = await fixture(html`
        <fhi-display level="2">Test</fhi-display>
      `);
      expect(component).shadowDom.to.equal(`
      <h2 class="display">
        <slot></slot>
      </h2>
    `);
    });
  });
});
