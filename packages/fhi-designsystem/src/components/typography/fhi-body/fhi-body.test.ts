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

    it('has an attribute to set strong', async () => {
      const component = await fixture<FhiBody>(
        html`<fhi-body strong>Test</fhi-body>`,
      );

      expect(component.getAttribute('strong')).to.equal('');
      expect(component.strong).to.equal(true);
      expect(component.shadowRoot?.querySelector('strong')).to.not.equal(null);
    });

    it('has an attribute to set emphasized', async () => {
      const component = await fixture<FhiBody>(
        html`<fhi-body emphasized>Test</fhi-body>`,
      );

      expect(component.getAttribute('emphasized')).to.equal('');
      expect(component.emphasized).to.equal(true);
      expect(component.shadowRoot?.querySelector('em')).to.not.equal(null);
    });
  });

  describe('Inheritance', () => {
    it('inherits color from parent', async () => {
      const component = await fixture(html`
        <div style="color: red;">
          <fhi-body>Test</fhi-body>
        </div>
      `);

      const body = component.querySelector('fhi-body')!;
      expect(getComputedStyle(body).color).to.equal('rgb(255, 0, 0)');
    });
  });
});
