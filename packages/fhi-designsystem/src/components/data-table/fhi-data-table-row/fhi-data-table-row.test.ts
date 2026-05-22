import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiDataTable } from '../fhi-data-table/fhi-data-table.component';
import { FhiDataTableRow } from './fhi-data-table-row.component';
import { FhiDataTableCell } from '../fhi-data-table-cell/fhi-data-table-cell.component';

describe('fhi-data-table-row', () => {
  new FhiDataTable();
  new FhiDataTableRow();
  new FhiDataTableCell();

  let component: FhiDataTableRow;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-data-table-row></fhi-data-table-row>`,
      );
    });

    it("should have the 'row' role", async () => {
      expect(component.getAttribute('role')).to.equal('row');
    });

    it('is accessible when it has a correct parent and child structure', async () => {
      component = await fixture(
        html` <fhi-data-table>
          <fhi-data-table-row>
            <fhi-data-table-cell></fhi-data-table-cell>
          </fhi-data-table-row>
        </fhi-data-table>`,
      );

      const row = component.querySelector('fhi-data-table-row');
      await expect(row).to.be.accessible();
    });

    it('is not accessible when it does not have a correct parent', async () => {
      component = await fixture(
        html` <fhi-data-table-row>
          <fhi-data-table-cell></fhi-data-table-cell>
        </fhi-data-table-row>`,
      );

      await expect(component).not.to.be.accessible();
    });

    it('is not accessible when it does not have a correct child', async () => {
      component = await fixture(
        html` <fhi-data-table>
          <fhi-data-table-row></fhi-data-table-row>
        </fhi-data-table>`,
      );

      const row = component.querySelector('fhi-data-table-row');
      await expect(row).not.to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-data-table-row variant="header"></fhi-data-table-row>`,
      );

      expect(component.getAttribute('variant')).to.equal('header');
      expect(component.variant).to.equal('header');
    });
  });

  describe('propagation of properties', () => {
    it('should set the variant of child fhi-data-table-cell elements to match its own variant', async () => {
      component = await fixture(
        html` <fhi-data-table>
          <fhi-data-table-row variant="header">
            <fhi-data-table-cell></fhi-data-table-cell>
            <fhi-data-table-cell variant="body"></fhi-data-table-cell>
          </fhi-data-table-row>
        </fhi-data-table>`,
      );

      const cells = component.querySelectorAll<FhiDataTableCell>(
        'fhi-data-table-row fhi-data-table-cell',
      );

      cells.forEach(cell => {
        expect(cell.getAttribute('variant')).to.equal('header');
        expect(cell.variant).to.equal('header');
      });
    });

    it('should update the variant of child fhi-data-table-cell elements when its own variant changes', async () => {
      component = await fixture(
        html` <fhi-data-table>
          <fhi-data-table-row variant="header">
            <fhi-data-table-cell></fhi-data-table-cell>
            <fhi-data-table-cell></fhi-data-table-cell>
          </fhi-data-table-row>
        </fhi-data-table>`,
      );

      const row = component.querySelector(
        'fhi-data-table-row',
      ) as FhiDataTableRow;
      const cells = component.querySelectorAll<FhiDataTableCell>(
        'fhi-data-table-row fhi-data-table-cell',
      );

      cells.forEach(cell => {
        expect(cell.getAttribute('variant')).to.equal('header');
        expect(cell.variant).to.equal('header');
      });

      row.variant = 'body';
      await row.updateComplete;

      cells.forEach(cell => {
        expect(cell.getAttribute('variant')).to.equal('body');
        expect(cell.variant).to.equal('body');
      });
    });
  });
});
