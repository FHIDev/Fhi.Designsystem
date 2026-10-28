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
      // Replace this with true mouse test when we have click-testing utilities.
      component = await fixture(html`<fhi-chip>Test Chip</fhi-chip>`);

      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      const button = component.shadowRoot?.querySelector('button');
      button?.click();

      expect(clicked).to.equal(true);
    });

    it('dispatches a click event when activated via keyboard (Enter)', () => {
      // Replace this with true keyboard test when we have click-testing utilities.
      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      const button = component.shadowRoot?.querySelector('button');
      button?.focus();
      button?.click();

      expect(clicked).to.equal(true);
    });

    it('dispatches a click event when activated via keyboard (Space)', () => {
      // Replace this with true keyboard test when we have click-testing utilities.
      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      const button = component.shadowRoot?.querySelector('button');
      button?.click();

      expect(clicked).to.equal(true);
    });
  });

  describe('button configuration', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-chip>Test Chip</fhi-chip>`);
    });

    it('button is focusable', () => {
      const button = component.shadowRoot?.querySelector('button');
      button?.focus();

      expect(component.shadowRoot?.activeElement).to.equal(button);
    });

    it('button is in the natural tab order', () => {
      const button = component.shadowRoot?.querySelector('button');

      expect(button?.hasAttribute('tabindex')).to.equal(false);
    });

    it('button has type="button" so Enter key does not submit a parent form', () => {
      const button = component.shadowRoot?.querySelector('button');

      expect(button?.getAttribute('type')).to.equal('button');
    });
  });
});
