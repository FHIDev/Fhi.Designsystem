import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTable } from './fhi-table.component';

describe('fhi-table', () => {
  new FhiTable();

  let component: FhiTable;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-table></fhi-table>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('should have the role "table"', async () => {
      expect(component.getAttribute('role')).to.equal('table');
    });

    it('should have an aria-label if caption attribute is set', async () => {
      component.caption = 'Table Caption';
      await component.updateComplete;

      expect(component.getAttribute('aria-label')).to.equal('Table Caption');
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the caption', async () => {
      component = await fixture(
        html`<fhi-table caption="Table Caption"></fhi-table>`,
      );

      expect(component.getAttribute('caption')).to.equal('Table Caption');
      expect(component.caption).to.equal('Table Caption');
    });

    it('has an attribute to set striped', async () => {
      component = await fixture(html`<fhi-table striped></fhi-table>`);

      expect(component.hasAttribute('striped')).to.equal(true);
      expect(component.striped).to.equal(true);
    });

    it('has an attribute to set columns', async () => {
      component = await fixture(
        html`<fhi-table columns="1fr 2fr 1fr"></fhi-table>`,
      );

      expect(component.getAttribute('columns')).to.equal('1fr 2fr 1fr');
      expect(component.columns).to.equal('1fr 2fr 1fr');
    });
  });
});
