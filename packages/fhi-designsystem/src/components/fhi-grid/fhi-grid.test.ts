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

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiGrid>(html`<fhi-grid></fhi-grid>`);
      expect(component.hasAttribute('role')).to.equal(false);
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set columns', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid columns="8"></fhi-grid>`,
      );

      expect(component.getAttribute('columns')).to.equal('8');
      expect(component.columns).to.equal(8);
    });

    it('has an attribute to set gap', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid gap="small"></fhi-grid>`,
      );

      expect(component.getAttribute('gap')).to.equal('small');
      expect(component.gap).to.equal('small');
    });
  });

  describe('Styles', async () => {
    it('applies custom gap style when gap is a number', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid gap="20"></fhi-grid>`,
      );

      expect(component.style.gap).to.equal('20px');
    });

    it('applies custom gap style when gap is a string with rem unit', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid gap="1.5rem"></fhi-grid>`,
      );

      expect(component.style.gap).to.equal('1.5rem');
    });

    it('applies custom gap style when gap is a string with px unit', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid gap="15px"></fhi-grid>`,
      );

      expect(component.style.gap).to.equal('15px');
    });

    it('applies the default medium gap when no gap is provided', async () => {
      const component = await fixture<FhiGrid>(html` <fhi-grid></fhi-grid> `);

      expect(component.style.gap).to.equal('');
      expect(component.gap).to.equal('medium');
    });
  });
});
