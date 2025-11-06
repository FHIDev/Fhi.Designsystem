import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTitle } from './fhi-title.component';

describe('fhi-title', () => {
  new FhiTitle();

  let component: FhiTitle;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-title level="1">Test</fhi-title>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiTitle>(
        html`<fhi-title level="1">Test</fhi-title>`,
      );
      expect(component.hasAttribute('role')).to.equal(false);
    });
  });

  describe('Setting attributes', () => {
    it('has an attribute to set level', async () => {
      const component = await fixture<FhiTitle>(
        html`<fhi-title level="1">Test</fhi-title>`,
      );

      expect(component.getAttribute('level')).to.equal('1');
      expect(component.level).to.equal(1);
    });

    it('has an attribute to set color', async () => {
      const component = await fixture<FhiTitle>(
        html`<fhi-title level="1" color="black">Test</fhi-title>`,
      );

      expect(component.getAttribute('color')).to.equal('black');
      expect(component.color).to.equal('black');
    });

    it('has an attribute to set size', async () => {
      const component = await fixture<FhiTitle>(
        html`<fhi-title level="1" size="small">Test</fhi-title>`,
      );

      expect(component.getAttribute('size')).to.equal('small');
      expect(component.size).to.equal('small');
    });

    it('renders the correct h level', async () => {
      component = await fixture(html` <fhi-title level="2">Test</fhi-title> `);
      expect(component).shadowDom.to.equal(`
      <h2 class="title">
        <slot></slot>
      </h2>
    `);
    });
  });
});
