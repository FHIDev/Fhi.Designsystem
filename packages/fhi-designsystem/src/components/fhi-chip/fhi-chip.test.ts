import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiChip } from './fhi-chip.component';

describe('fhi-chip', () => {
  new FhiChip();

  let component: FhiChip;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-chip>Test Chip</fhi-chip>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('renders the text slot', async () => {
      expect(component.innerText?.trim()).to.equal('Test Chip');
    });

    it('renders a remove icon', async () => {
      const icon = component.shadowRoot?.querySelector('fhi-icon-x');
      expect(icon).to.not.equal(null);
    });
  });

  describe('events', () => {
    it('dispatches a click event when clicked', async () => {
      component = await fixture(html`<fhi-chip>Test Chip</fhi-chip>`);

      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      const button = component.shadowRoot?.querySelector('button');
      button?.click();

      expect(clicked).to.equal(true);
    });
  });
});
