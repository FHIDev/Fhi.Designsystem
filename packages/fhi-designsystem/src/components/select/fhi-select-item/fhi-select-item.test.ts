import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiSelectItem } from './fhi-select-item.component';

describe('fhi-select-item', () => {
  new FhiSelectItem();

  let component: FhiSelectItem;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-select-item></fhi-select-item>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-select-item></fhi-select-item>`);
    });

    it('has an attribute to set the label', async () => {
      const label = 'My Label';

      component = await fixture(
        html`<fhi-select-item label="${label}"></fhi-select-item>`,
      );

      expect(component.getAttribute('label')).to.equal(label);
      expect(component.label).to.equal(label);
    });

    it('has an attribute to set the value', async () => {
      const value = 'my-value';

      component = await fixture(
        html`<fhi-select-item value="${value}"></fhi-select-item>`,
      );

      expect(component.getAttribute('value')).to.equal(value);
      expect(component.value).to.equal(value);
    });

    it('has an attribute to set selected', async () => {
      component = await fixture(
        html`<fhi-select-item selected></fhi-select-item>`,
      );

      expect(component.hasAttribute('selected')).to.equal(true);
      expect(component.selected).to.equal(true);
    });
  });

  describe('reflecting attributes', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-select-item></fhi-select-item>`);
    });

    it('reflects the label attribute', async () => {
      const label = 'My Label';

      component.label = label;
      await component.updateComplete;

      expect(component.getAttribute('label')).to.equal(label);
    });

    it('reflects the value attribute', async () => {
      const value = 'my-value';

      component.value = value;
      await component.updateComplete;

      expect(component.getAttribute('value')).to.equal(value);
    });

    it('reflects the selected attribute', async () => {
      component.selected = true;
      await component.updateComplete;

      expect(component.hasAttribute('selected')).to.equal(true);
    });
  });
});
