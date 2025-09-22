import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiGrid } from './fhi-grid.component';

describe('fhi-grid', () => {
  new FhiGrid();

  let component: FhiGrid;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-grid></fhi-grid>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });
});
