import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiDataTableCell } from './fhi-data-table-cell.component';
import { FhiDataTableRow } from '../fhi-data-table-row/fhi-data-table-row.component';
import { FhiDataTable } from '../fhi-data-table/fhi-data-table.component';

describe('fhi-data-table-cell', () => {
  new FhiDataTableCell();
  new FhiDataTableRow();
  new FhiDataTable();

  let component: FhiDataTableCell;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-data-table-cell></fhi-data-table-cell>`,
      );
    });

    it('is accessible when it has a correct parent structure', async () => {
      const table = await fixture(
        html` <fhi-data-table>
          <fhi-data-table-row>
            <fhi-data-table-cell></fhi-data-table-cell>
          </fhi-data-table-row>
        </fhi-data-table>`,
      );

      const cell = table.querySelector('fhi-data-table-cell');
      await expect(cell).to.be.accessible();
    });

    it('is not accessible when it does not have a correct parent', async () => {
      await expect(component).not.to.be.accessible();
    });

    it('should have the role "cell" by default', async () => {
      expect(component.getAttribute('role')).to.equal('cell');
    });

    it('should have the role "columnheader" when variant is set to "header"', async () => {
      component.variant = 'header';
      await component.updateComplete;

      expect(component.getAttribute('role')).to.equal('columnheader');
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-data-table-cell variant="header"></fhi-data-table-cell>`,
      );

      expect(component.getAttribute('variant')).to.equal('header');
      expect(component.variant).to.equal('header');
    });
  });
});
