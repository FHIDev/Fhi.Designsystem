import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiToggleGroupItem } from './fhi-toggle-group-item.component';
import { FhiToggleGroup } from '../fhi-toggle-group/fhi-toggle-group.component';

describe('fhi-toggle-group-item', () => {
  new FhiToggleGroupItem();
  new FhiToggleGroup();

  let component: FhiToggleGroupItem;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <fhi-toggle-group>
          <fhi-toggle-group-item>My item</fhi-toggle-group-item>
        </fhi-toggle-group>
      `);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });
});
