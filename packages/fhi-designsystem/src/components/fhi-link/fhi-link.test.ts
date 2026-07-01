import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiLink } from './fhi-link.component';

describe('fhi-link', () => {
  new FhiLink();

  let component: FhiLink;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-link></fhi-link>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-link href="https://www.fhi.no" target="_blank"></fhi-link>`,
      );
    });

    it('sets the href attribute', async () => {
      expect(component.getAttribute('href')).to.equal('https://www.fhi.no');
      expect(component.href).to.equal('https://www.fhi.no');
    });

    it('sets the target attribute', async () => {
      expect(component.getAttribute('target')).to.equal('_blank');
      expect(component.target).to.equal('_blank');
    });
  });

  describe('property-attribute reflection', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-link href="https://www.fhi.no" target="_blank"></fhi-link>`,
      );
    });

    it('reflects the href property to the attribute', async () => {
      component.href = 'https://www.example.com';

      await component.updateComplete;

      expect(component.getAttribute('href')).to.equal(
        'https://www.example.com',
      );
    });

    it('reflects the target property to the attribute', async () => {
      component.target = '_self';

      await component.updateComplete;

      expect(component.getAttribute('target')).to.equal('_self');
    });
  });

  describe('automatic rel attribute', () => {
    it('sets rel to "noopener noreferrer" when target is not "_self"', async () => {
      component = await fixture(
        html`<fhi-link href="https://www.fhi.no" target="_blank"></fhi-link>`,
      );

      const anchor = component.shadowRoot?.querySelector('a');

      expect(anchor?.getAttribute('rel')).to.equal('noopener noreferrer');
    });

    it('does not set rel when target is "_self"', async () => {
      component = await fixture(
        html`<fhi-link href="https://www.fhi.no" target="_self"></fhi-link>`,
      );

      const anchor = component.shadowRoot?.querySelector('a');

      expect(anchor?.getAttribute('rel')).to.equal(null);
    });
  });
});
