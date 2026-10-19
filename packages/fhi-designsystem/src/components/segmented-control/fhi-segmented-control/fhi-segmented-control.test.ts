import { fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiSegmentedControl } from './fhi-segmented-control.component';
import {
  FhiSegmentedControlItem,
  FhiSegmentedControlItemSelector,
} from '../fhi-segmented-control-item/fhi-segmented-control-item.component';

describe('fhi-segmented-control', () => {
  new FhiSegmentedControl();
  new FhiSegmentedControlItem();

  let component: FhiSegmentedControl;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item>My item</fhi-segmented-control-item>
        </fhi-segmented-control>
      `);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('has the "radiogroup" role ', () => {
      expect(component.getAttribute('role')).to.equal('radiogroup');
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the value', async () => {
      component = await fixture(html`
        <fhi-segmented-control value="second">
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second"
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);

      expect(component.value).to.equal('second');
      expect(component.getAttribute('value')).to.equal('second');
    });

    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-segmented-control variant="subtle"></fhi-segmented-control>`,
      );

      expect(component.getAttribute('variant')).to.equal('subtle');
      expect(component.variant).to.equal('subtle');
    });
  });

  describe('value logic', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second"
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);
    });

    it('has the value of the initially selected item', () => {
      expect(component.value).to.equal('first');
    });

    it('does not dispatch a change event when the value remains the same', async () => {
      let changeEventCounter = 0;
      component.addEventListener('change', () => {
        changeEventCounter += 1;
      });

      component.value = 'first';
      await component.updateComplete;

      expect(changeEventCounter).to.equal(0);
    });

    it('does not dispatch a change event when the selected item is clicked', async () => {
      const selectedItem = component.querySelector<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      )!;

      let changeEventCounter = 0;
      component.addEventListener('change', () => {
        changeEventCounter += 1;
      });

      selectedItem.shadowRoot!.querySelector('button')!.click();

      await selectedItem.updateComplete;
      await component.updateComplete;

      expect(changeEventCounter).to.equal(0);
      expect(selectedItem.selected).to.equal(true);
      expect(component.value).to.equal('first');
    });

    it('selects the matching item when the value property changes', async () => {
      component.value = 'second';

      await component.updateComplete;

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      );

      expect(items[0].selected).to.equal(false);
      expect(items[1].selected).to.equal(true);

      expect(component.value).to.equal('second');
      expect(component.getAttribute('value')).to.equal('second');
    });

    it('updates the value before dispatching a change event when an item is clicked', async () => {
      const secondItem = component.querySelectorAll<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      )[1];

      let eventValue = null;
      let changeEventCounter = 0;

      component.addEventListener('change', () => {
        eventValue = component.value;
        changeEventCounter += 1;
      });

      secondItem.shadowRoot!.querySelector('button')!.click();

      await secondItem.updateComplete;
      await component.updateComplete;

      expect(component.value).to.equal('second');
      expect(eventValue).to.equal('second');
      expect(changeEventCounter).to.equal(1);
    });

    it('retains the selected item when the value does not match an item', async () => {
      component.value = 'okidokiloki';

      // Wait for both the selection logic and the property to update
      await component.updateComplete;
      await component.updateComplete;

      expect(component.value).to.equal('first');
      expect(component.getAttribute('value')).to.equal('first');
    });

    it('updates the value when the selected item value changes', async () => {
      const item = component.querySelector<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      )!;

      item.value = 'updated';

      await item.updateComplete;
      await component.updateComplete;

      expect(component.value).to.equal('updated');
    });

    it('uses the item text when no explicit value is provided', async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item> First item </fhi-segmented-control-item>
        </fhi-segmented-control>
      `);

      expect(component.value).to.equal('First item');
    });

    it('selects an item by its text when no explicit value is provided', async () => {
      component = await fixture(html`
        <fhi-segmented-control value="Second item">
          <fhi-segmented-control-item>First item</fhi-segmented-control-item>
          <fhi-segmented-control-item>Second item</fhi-segmented-control-item>
        </fhi-segmented-control>
      `);

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      );

      expect(items[0].selected).to.equal(false);
      expect(items[1].selected).to.equal(true);

      expect(component.value).to.equal('Second item');
    });

    it('updates the value when the selected item text changes', async () => {
      const item = component.querySelector<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      )!;

      item.value = null;

      await item.updateComplete;
      await component.updateComplete;

      item.textContent = ' Updated item ';

      await nextFrame();
      await component.updateComplete;

      expect(component.value).to.equal('Updated item');
    });

    it('has the value of the explicitly selected item', async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second" selected
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);

      expect(component.value).to.equal('second');
    });

    it('updates the value when an item is selected programmatically', async () => {
      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      );

      items[1].selected = true;

      await items[1].updateComplete;
      await component.updateComplete;

      expect(items[0].selected).to.equal(false);
      expect(component.value).to.equal('second');
    });

    it('selects an item with an explicitly empty value', async () => {
      const item = component.querySelectorAll<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      )[1];

      item.value = '';
      await item.updateComplete;

      component.value = '';
      await component.updateComplete;

      expect(item.selected).to.equal(true);
      expect(component.value).to.equal('');
    });

    it('updates the value when the selected item is removed', async () => {
      const slotChanged = oneEvent(
        component.shadowRoot!.querySelector('slot')!,
        'slotchange',
      );

      component.querySelector('fhi-segmented-control-item')!.remove();

      await slotChanged;
      await component.updateComplete;

      expect(component.value).to.equal('second');
    });

    it('selects another item with the same value when the selected item is removed', async () => {
      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      );

      items[1].value = 'first';

      await items[1].updateComplete;
      await component.updateComplete;

      let changeEventCounter = 0;
      component.addEventListener('change', () => {
        changeEventCounter += 1;
      });

      items[0].remove();

      await nextFrame();
      await component.updateComplete;

      expect(items[1].selected).to.equal(true);
      expect(component.value).to.equal('first');
      expect(changeEventCounter).to.equal(1);
    });

    it('has an empty string as value when all items are removed', async () => {
      component.replaceChildren();

      await nextFrame();
      await component.updateComplete;

      expect(component.value).to.equal('');
    });
  });

  describe('reconnection', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second"
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);
    });

    it('synchronizes a selected item value changed while disconnected', async () => {
      const parent = component.parentElement!;

      const item = component.querySelector<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      )!;

      component.remove();

      item.value = 'updated';

      await item.updateComplete;

      parent.append(component);

      await nextFrame();
      await component.updateComplete;

      expect(component.value).to.equal('updated');
      expect(component.getAttribute('value')).to.equal('updated');

      expect(item.selected).to.equal(true);
    });

    it('preserves a pending group value when reconnected immediately', async () => {
      const parent = component.parentElement!;

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      );

      component.remove();

      component.value = 'second';

      parent.append(component);

      await component.updateComplete;
      await nextFrame();

      expect(component.value).to.equal('second');
      expect(component.getAttribute('value')).to.equal('second');

      expect(items[0].selected).to.equal(false);
      expect(items[1].selected).to.equal(true);
    });

    it('synchronizes selection changed while disconnected', async () => {
      const parent = component.parentElement!;

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        FhiSegmentedControlItemSelector,
      );

      let changeEventCounter = 0;
      component.addEventListener('change', () => {
        changeEventCounter += 1;
      });

      component.remove();

      items[1].selected = true;

      await items[1].updateComplete;

      parent.append(component);

      await nextFrame();
      await component.updateComplete;

      expect(items[0].selected).to.equal(false);
      expect(items[1].selected).to.equal(true);

      expect(component.value).to.equal('second');
      expect(changeEventCounter).to.equal(1);
    });
  });

  describe('keyboard navigation', () => {
    it('navigates to the next item with the right arrow key', async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second"
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      );

      const firstButton = items[0].shadowRoot!.querySelector('button')!;
      const secondButton = items[1].shadowRoot!.querySelector('button')!;

      firstButton.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      });

      firstButton.dispatchEvent(event);

      await component.updateComplete;

      expect(items[1].shadowRoot!.activeElement).to.equal(secondButton);
    });

    it('navigates to the previous item with the left arrow key', async () => {
      component = await fixture(html`
        <fhi-segmented-control value="second">
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second"
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      );

      const firstButton = items[0].shadowRoot!.querySelector('button')!;
      const secondButton = items[1].shadowRoot!.querySelector('button')!;

      secondButton.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        composed: true,
      });

      secondButton.dispatchEvent(event);

      await component.updateComplete;

      expect(items[0].shadowRoot!.activeElement).to.equal(firstButton);
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the value property to an attribute', async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
          <fhi-segmented-control-item value="second"
            >Second item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);

      component.value = 'second';
      await component.updateComplete;

      expect(component.getAttribute('value')).to.equal('second');
    });
  });

  describe('variant inheritance', () => {
    it('applies the group variant to dynamically added items', async () => {
      component = await fixture(html`
        <fhi-segmented-control variant="subtle">
          <fhi-segmented-control-item value="first"
            >First item</fhi-segmented-control-item
          >
        </fhi-segmented-control>
      `);

      const item = document.createElement(
        FhiSegmentedControlItemSelector,
      ) as FhiSegmentedControlItem;

      item.value = 'second';
      item.textContent = 'Second item';

      component.append(item);

      await nextFrame();
      await item.updateComplete;

      expect(item.variant).to.equal('subtle');
      expect(item.getAttribute('variant')).to.equal('subtle');
      expect(item.selected).to.equal(false);

      expect(component.value).to.equal('first');
    });
  });

  describe('selection', () => {
    it('selects the first item when no item is selected', async () => {
      component = await fixture(html`
        <fhi-segmented-control>
          <fhi-segmented-control-item>First item</fhi-segmented-control-item>
          <fhi-segmented-control-item>Second item</fhi-segmented-control-item>
        </fhi-segmented-control>
      `);

      const items = component.querySelectorAll<FhiSegmentedControlItem>(
        'fhi-segmented-control-item',
      );

      expect(items[0].selected).to.equal(true);
      expect(items[1].selected).to.equal(false);
    });

    it('selects the first item added to an empty group', async () => {
      component = await fixture(
        html`<fhi-segmented-control></fhi-segmented-control>`,
      );

      const item = document.createElement(
        FhiSegmentedControlItemSelector,
      ) as FhiSegmentedControlItem;

      component.append(item);

      await nextFrame();
      await component.updateComplete;

      expect(item.selected).to.equal(true);
      expect(component.value).to.equal('');
    });
  });
});
