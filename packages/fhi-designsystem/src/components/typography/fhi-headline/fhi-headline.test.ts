import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiHeadline } from './fhi-headline.component';

describe('fhi-headline', () => {
  new FhiHeadline();

  let component: FhiHeadline;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-headline level="1">Test</fhi-headline>`,
      );
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiHeadline>(
        html`<fhi-headline level="1">Test</fhi-headline>`,
      );
      expect(component.hasAttribute('role')).to.equal(false);
    });
  });

  describe('Setting attributes', () => {
    it('has an attribute to set level', async () => {
      const component = await fixture<FhiHeadline>(
        html`<fhi-headline level="1">Test</fhi-headline>`,
      );

      expect(component.getAttribute('level')).to.equal('1');
      expect(component.level).to.equal(1);
    });

    it('has an attribute to set color', async () => {
      const component = await fixture<FhiHeadline>(
        html`<fhi-headline level="1" color="black">Test</fhi-headline>`,
      );

      expect(component.getAttribute('color')).to.equal('black');
      expect(component.color).to.equal('black');
    });

    it('has an attribute to set size', async () => {
      const component = await fixture<FhiHeadline>(
        html`<fhi-headline level="1" size="small">Test</fhi-headline>`,
      );

      expect(component.getAttribute('size')).to.equal('small');
      expect(component.size).to.equal('small');
    });

    it('renders the correct h level', async () => {
      component = await fixture(html`
        <fhi-headline level="2">Test</fhi-headline>
      `);
      expect(component).shadowDom.to.equal(`
      <h2 class="headline">
        <slot></slot>
      </h2>
    `);
    });
  });
});
