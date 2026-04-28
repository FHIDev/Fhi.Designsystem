import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiDataTable } from './fhi-data-table.component';

describe('fhi-data-table', () => {
  new FhiDataTable();

  let component: FhiDataTable;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-data-table></fhi-data-table>`);
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
        html`<fhi-data-table caption="Table Caption"></fhi-data-table>`,
      );

      expect(component.getAttribute('caption')).to.equal('Table Caption');
      expect(component.caption).to.equal('Table Caption');
    });

    it('has an attribute to set striped', async () => {
      component = await fixture(
        html`<fhi-data-table striped></fhi-data-table>`,
      );

      expect(component.hasAttribute('striped')).to.equal(true);
      expect(component.striped).to.equal(true);
    });
  });
});
