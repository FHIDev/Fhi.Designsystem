import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTableCell } from './fhi-table-cell.component';
import { FhiTableRow } from '../fhi-table-row/fhi-table-row.component';
import { FhiTable } from '../fhi-table/fhi-table.component';

describe('fhi-table-cell', () => {
  new FhiTableCell();
  new FhiTableRow();
  new FhiTable();

  let component: FhiTableCell;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-table-cell></fhi-table-cell>`);
    });

    it('is accessible when it has a correct parent structure', async () => {
      const table = await fixture(
        html` <fhi-table>
          <fhi-table-row>
            <fhi-table-cell></fhi-table-cell>
          </fhi-table-row>
        </fhi-table>`,
      );

      const cell = table.querySelector('fhi-table-cell');
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
        html`<fhi-table-cell variant="header"></fhi-table-cell>`,
      );

      expect(component.getAttribute('variant')).to.equal('header');
      expect(component.variant).to.equal('header');
    });
  });
});
