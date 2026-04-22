import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTable } from '../fhi-table/fhi-table.component';
import { FhiTableRow } from './fhi-table-row.component';
import { FhiTableCell } from '../fhi-table-cell/fhi-table-cell.component';

describe('fhi-table-row', () => {
  new FhiTable();
  new FhiTableRow();
  new FhiTableCell();

  let component: FhiTableRow;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-table-row></fhi-table-row>`);
    });

    it("should have the 'row' role", async () => {
      expect(component.getAttribute('role')).to.equal('row');
    });

    it('is accessible when it has a correct parent and child structure', async () => {
      component = await fixture(
        html` <fhi-table>
          <fhi-table-row>
            <fhi-table-cell></fhi-table-cell>
          </fhi-table-row>
        </fhi-table>`,
      );

      const row = component.querySelector('fhi-table-row');
      await expect(row).to.be.accessible();
    });

    it('is not accessible when it does not have a correct parent', async () => {
      component = await fixture(
        html` <fhi-table-row>
          <fhi-table-cell></fhi-table-cell>
        </fhi-table-row>`,
      );

      await expect(component).not.to.be.accessible();
    });

    it('is not accessible when it does not have a correct child', async () => {
      component = await fixture(
        html` <fhi-table>
          <fhi-table-row></fhi-table-row>
        </fhi-table>`,
      );

      const row = component.querySelector('fhi-table-row');
      await expect(row).not.to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the variant', async () => {
      component = await fixture(
        html`<fhi-table-row variant="header"></fhi-table-row>`,
      );

      expect(component.getAttribute('variant')).to.equal('header');
      expect(component.variant).to.equal('header');
    });
  });

  describe('propagation of properties', () => {
    it('should set the variant of child fhi-table-cell elements to match its own variant', async () => {
      component = await fixture(
        html` <fhi-table>
          <fhi-table-row variant="header">
            <fhi-table-cell></fhi-table-cell>
            <fhi-table-cell variant="body"></fhi-table-cell>
          </fhi-table-row>
        </fhi-table>`,
      );

      const cells = component.querySelectorAll<FhiTableCell>(
        'fhi-table-row fhi-table-cell',
      );

      cells.forEach(cell => {
        expect(cell.getAttribute('variant')).to.equal('header');
        expect(cell.variant).to.equal('header');
      });
    });

    it('should update the variant of child fhi-table-cell elements when its own variant changes', async () => {
      component = await fixture(
        html` <fhi-table>
          <fhi-table-row variant="header">
            <fhi-table-cell></fhi-table-cell>
            <fhi-table-cell></fhi-table-cell>
          </fhi-table-row>
        </fhi-table>`,
      );

      const row = component.querySelector('fhi-table-row') as FhiTableRow;
      const cells = component.querySelectorAll<FhiTableCell>(
        'fhi-table-row fhi-table-cell',
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
