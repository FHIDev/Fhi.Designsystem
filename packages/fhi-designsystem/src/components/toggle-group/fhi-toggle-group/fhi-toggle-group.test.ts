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

  describe('setting attributes', () => {
    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-toggle-group variant="subtle"></fhi-toggle-group>`,
      );

      expect(component.getAttribute('variant')).to.equal('subtle');
      expect(component.variant).to.equal('subtle');
    });
  });

  describe('selection', () => {
    it('renders without items', async () => {
      component = await fixture(html`<fhi-toggle-group></fhi-toggle-group>`);

      await component.updateComplete;

      expect(
        component.querySelectorAll('fhi-toggle-group-item'),
      ).to.have.lengthOf(0);
    });

    it('selects the first item when no item is selected', async () => {
      component = await fixture(html`
        <fhi-toggle-group>
          <fhi-toggle-group-item>First item</fhi-toggle-group-item>
          <fhi-toggle-group-item>Second item</fhi-toggle-group-item>
        </fhi-toggle-group>
      `);

      const items = component.querySelectorAll<FhiToggleGroupItem>(
        'fhi-toggle-group-item',
      );

      expect(items[0].selected).to.equal(true);
      expect(items[1].selected).to.equal(false);
    });

    it('selects the first item added to an empty group', async () => {
      component = await fixture(html`<fhi-toggle-group></fhi-toggle-group>`);
      const slot = component.shadowRoot!.querySelector('slot')!;
      const slotChanged = new Promise<void>(resolve => {
        slot.addEventListener('slotchange', () => resolve(), { once: true });
      });
      const item = document.createElement(
        'fhi-toggle-group-item',
      ) as FhiToggleGroupItem;

      component.append(item);
      await slotChanged;
      await component.updateComplete;

      expect(item.selected).to.equal(true);
    });
  });
});
