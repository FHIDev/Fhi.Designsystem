import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiCheckbox } from './fhi-checkbox.component.ts';

describe('fhi-checkbox', () => {
  new FhiCheckbox();
  let component: FhiCheckbox;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-checkbox label="Agree" id="agree"></fhi-checkbox>`,
      );
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('is accessible when focused', async () => {
      component.dispatchEvent(new Event('focusin'));
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible when disabled', async () => {
      component = await fixture(
        html`<fhi-checkbox label="Agree" id="agree" disabled></fhi-checkbox>`,
      );
      await expect(component).to.be.accessible();
    });
  });
});
