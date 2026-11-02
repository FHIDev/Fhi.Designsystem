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

    it('is focusable', () => {
      component.focus();

      expect(document.activeElement).to.equal(component);
    });

    it('is in the tab order', () => {
      expect(component.tabIndex).to.equal(0);
    });
  });

  describe('events', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-chip>Test Chip</fhi-chip>`);
    });

    it('dispatches a click event when clicked', () => {
      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      component.click();

      expect(clicked).to.equal(true);
    });

    it('dispatches a click event when activated via keyboard (Enter)', () => {
      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      component.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );

      expect(clicked).to.equal(true);
    });

    it('dispatches a click event when activated via keyboard (Space)', () => {
      let clicked = false;
      component.addEventListener('click', () => {
        clicked = true;
      });

      component.dispatchEvent(
        new KeyboardEvent('keyup', { key: ' ', bubbles: true }),
      );

      expect(clicked).to.equal(true);
    });
  });
});
