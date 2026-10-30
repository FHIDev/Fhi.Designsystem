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

    it('has an attribute to set column-span', async () => {
      component = await fixture(
        html`<fhi-data-table-cell column-span="3"></fhi-data-table-cell>`,
      );

      expect(component.getAttribute('column-span')).to.equal('3');
      expect(component.columnSpan).to.equal(3);
    });
  });

  describe('cells spanning columns', () => {
    it('spans the given number of grid columns when column-span is set', async () => {
      component = await fixture(
        html`<fhi-data-table-cell column-span="3"></fhi-data-table-cell>`,
      );

      expect(component.style.gridColumn).to.equal('span 3');
    });

    it('sets aria-colspan when colspan is greater than 1', async () => {
      component = await fixture(
        html`<fhi-data-table-cell column-span="3"></fhi-data-table-cell>`,
      );

      expect(component.getAttribute('aria-colspan')).to.equal('3');
    });

    it('updates aria-colspan when colspan changes', async () => {
      component = await fixture(
        html`<fhi-data-table-cell column-span="2"></fhi-data-table-cell>`,
      );

      expect(component.getAttribute('aria-colspan')).to.equal('2');

      component.columnSpan = 4;
      await component.updateComplete;

      expect(component.getAttribute('aria-colspan')).to.equal('4');
    });

    it('removes aria-colspan when colspan is 1 or removed', async () => {
      component = await fixture(
        html`<fhi-data-table-cell column-span="2"></fhi-data-table-cell>`,
      );

      component.columnSpan = 1;
      await component.updateComplete;

      expect(component.hasAttribute('aria-colspan')).to.equal(false);
    });

    it('does not span multiple grid columns by default', async () => {
      component = await fixture(
        html`<fhi-data-table-cell></fhi-data-table-cell>`,
      );

      expect(component.style.gridColumn).to.equal('');
      expect(component.hasAttribute('aria-colspan')).to.equal(false);
    });
  });
});
