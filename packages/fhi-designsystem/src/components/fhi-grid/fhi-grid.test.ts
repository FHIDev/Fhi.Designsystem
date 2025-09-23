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
    it('has an attribute to set rows', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid rows="2"></fhi-grid>`,
      );

      expect(component.getAttribute('rows')).to.equal('2');
      expect(component.rows).to.equal(2);
    });

    it('has an attribute to set columns', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid columns="10"></fhi-grid>`,
      );

      expect(component.getAttribute('columns')).to.equal('10');
      expect(component.columns).to.equal(10);
    });

    it('has an attribute to set gap', async () => {
      const component = await fixture<FhiGrid>(
        html`<fhi-grid gap="small"></fhi-grid>`,
      );

      expect(component.getAttribute('gap')).to.equal('small');
      expect(component.gap).to.equal('small');
    });
  });
});
