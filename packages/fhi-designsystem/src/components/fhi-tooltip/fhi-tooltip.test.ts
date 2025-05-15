import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTooltip } from './fhi-tooltip.component';

describe('fhi-tooltip', () => {
  new FhiTooltip();

  let component: FhiTooltip;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-tooltip></fhi-tooltip>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });
});
