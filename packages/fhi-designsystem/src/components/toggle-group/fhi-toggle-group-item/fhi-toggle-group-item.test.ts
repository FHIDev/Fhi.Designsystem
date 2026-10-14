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
      const group = await fixture<FhiToggleGroup>(html`
        <fhi-toggle-group>
          <fhi-toggle-group-item>My item</fhi-toggle-group-item>
        </fhi-toggle-group>
      `);
      component = group.querySelector('fhi-toggle-group-item')!;
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the value', async () => {
      component = await fixture(
        html`<fhi-toggle-group-item value="table"
          >My item</fhi-toggle-group-item
        >`,
      );

      expect(component.getAttribute('value')).to.equal('table');
      expect(component.value).to.equal('table');
    });

    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-toggle-group-item variant="subtle"
          >My item</fhi-toggle-group-item
        >`,
      );

      expect(component.getAttribute('variant')).to.equal('subtle');
      expect(component.variant).to.equal('subtle');
    });

    it('has an attribute to set selected', async () => {
      component = await fixture(
        html`<fhi-toggle-group-item selected>My item</fhi-toggle-group-item>`,
      );

      expect(component.hasAttribute('selected')).to.equal(true);
      expect(component.selected).to.equal(true);
    });
  });

  describe('property-attribute reflection', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-toggle-group-item>My item</fhi-toggle-group-item>`,
      );
    });

    it('reflects the value property to an attribute', async () => {
      component.value = 'table';
      await component.updateComplete;

      expect(component.getAttribute('value')).to.equal('table');
    });

    it('reflects the variant property to an attribute', async () => {
      component.variant = 'subtle';
      await component.updateComplete;

      expect(component.getAttribute('variant')).to.equal('subtle');
    });

    it('reflects the selected property to an attribute', async () => {
      component.selected = true;
      await component.updateComplete;

      expect(component.hasAttribute('selected')).to.equal(true);
    });
  });

  describe('interactions', () => {
    it('selects the item and dispatches a click event when click() is called', async () => {
      component = await fixture(
        html`<fhi-toggle-group-item>My item</fhi-toggle-group-item>`,
      );

      let clickEventCounter = 0;
      component.addEventListener('click', () => {
        clickEventCounter += 1;
      });

      component.click();
      await component.updateComplete;

      expect(component.selected).to.equal(true);
      expect(component.hasAttribute('selected')).to.equal(true);
      expect(
        component
          .shadowRoot!.querySelector('button')!
          .getAttribute('aria-pressed'),
      ).to.equal('true');

      expect(clickEventCounter).to.equal(1);
    });

    it('selects the item when clicked', async () => {
      component = await fixture(
        html`<fhi-toggle-group-item>My item</fhi-toggle-group-item>`,
      );
      const button = component.shadowRoot!.querySelector('button')!;

      button.click();
      await component.updateComplete;

      expect(component.selected).to.equal(true);
      expect(button.getAttribute('aria-pressed')).to.equal('true');
    });
  });
});
