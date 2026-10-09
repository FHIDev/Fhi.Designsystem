import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiToggleGroup } from './fhi-toggle-group.component';
import { FhiToggleGroupItem } from '../fhi-toggle-group-item/fhi-toggle-group-item.component';

describe('fhi-toggle-group', () => {
  new FhiToggleGroup();
  new FhiToggleGroupItem();

  let component: FhiToggleGroup;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-toggle-group></fhi-toggle-group>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });
});
