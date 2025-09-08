import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './fhi-flex.component';
import { FhiFlex, FhiFlexSelector } from './fhi-flex.component';

describe(FhiFlexSelector, () => {
  describe('Accessibility', () => {
    it('passes the a11y audit', async () => {
      const component = await fixture<FhiFlex>(html`
        <fhi-flex>
          <button>Button 1</button>
          <a href="#">Link 1</a>
        </fhi-flex>
      `);
      await expect(component).to.be.accessible();
    });

    it('has no role attribute by default, behaving as a presentational element', async () => {
      const component = await fixture<FhiFlex>(html`<fhi-flex></fhi-flex>`);
      expect(component.hasAttribute('role')).to.equal(false);
    });

    it('maintains correct order in a row layout)', async () => {
      const component = await fixture(html`
        <fhi-flex direction="row">
          <button id="btn1">Button 1</button>
          <button id="btn2">Button 2</button>
        </fhi-flex>
      `);
      const buttons = component.querySelectorAll('button');
      expect(buttons[0].id).to.equal('btn1');
      expect(buttons[1].id).to.equal('btn2');
    });
    it('maintains correct order in a row column)', async () => {
      const component = await fixture(html`
        <fhi-flex direction="column">
          <button id="btn1">Button 1</button>
          <button id="btn2">Button 2</button>
        </fhi-flex>
      `);
      const buttons = component.querySelectorAll('button');
      expect(buttons[0].id).to.equal('btn1');
      expect(buttons[1].id).to.equal('btn2');
    });
  });

  describe('Setting attributes', () => {
    it('has an attribute to set direction', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex direction="column"></fhi-flex>`,
      );
      expect(component.getAttribute('direction')).to.equal('column');
      expect(component.direction).to.equal('column');
    });
    it('has an attribute to set gap', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex gap="large"></fhi-flex>`,
      );
      expect(component.getAttribute('gap')).to.equal('large');
      expect(component.gap).to.equal('large');
    });
    it('has an attribute to set wrap', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex wrap></fhi-flex>`,
      );
      expect(component.hasAttribute('wrap')).to.equal(true);
      expect(component.wrap).to.equal(true);
    });
  });
  describe('Styles', async () => {
    it('applies custom gap style when gap is a number', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex gap="20"></fhi-flex>`,
      );
      expect(component.style.gap).to.equal('20px');
    });
    it('applies custom gap style when gap is a string with unit', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex gap="1.5rem"></fhi-flex>`,
      );
      expect(component.style.gap).to.equal('1.5rem');
    });

    it('applies the default medium gap when no gap is provided', async () => {
      const component = await fixture<HTMLDivElement>(html`
        <div>
          <style>
            fhi-flex {
              --fhi-spacing-200: 16px;
            }
          </style>
          <fhi-flex></fhi-flex>
        </div>
      `);
      expect(component.querySelector<FhiFlex>('fhi-flex')!.style.gap).to.equal(
        '',
      );
      expect(
        getComputedStyle(component.querySelector<FhiFlex>('fhi-flex')!).gap,
      ).to.equal('16px');
    });
    it('applies the small gap when gap is set to small', async () => {
      const component = await fixture<HTMLDivElement>(html`
        <div>
          <style>
            fhi-flex {
              --fhi-spacing-100: 8px;
            }
          </style>
          <fhi-flex gap="small"></fhi-flex>
        </div>
      `);
      expect(
        getComputedStyle(component.querySelector<FhiFlex>('fhi-flex')!).gap,
      ).to.equal('8px');
    });
    it('applies the large gap when gap is set to large', async () => {
      const component = await fixture<HTMLDivElement>(html`
        <div>
          <style>
            fhi-flex {
              --fhi-spacing-300: 24px;
            }
          </style>
          <fhi-flex gap="large"></fhi-flex>
        </div>
      `);
      expect(
        getComputedStyle(component.querySelector<FhiFlex>('fhi-flex')!).gap,
      ).to.equal('24px');
    });

    it('applies default direction as row when no direction is set.', async () => {
      const component = await fixture<FhiFlex>(html`<fhi-flex></fhi-flex>`);
      expect(getComputedStyle(component).flexDirection).to.equal('row');
    });
    it('applies flex-direction to column when direction is set to column', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex direction="column"></fhi-flex>`,
      );
      expect(getComputedStyle(component).flexDirection).to.equal('column');
    });
    it('applies flex-wrap style when wrap is set to true', async () => {
      const component = await fixture<FhiFlex>(
        html`<fhi-flex wrap></fhi-flex>`,
      );
      expect(getComputedStyle(component).flexWrap).to.equal('wrap');
    });
    it('does not apply flex-wrap style when wrap is not set to true', async () => {
      const component = await fixture<FhiFlex>(html`<fhi-flex></fhi-flex>`);
      expect(getComputedStyle(component).flexWrap).to.equal('nowrap');
    });
  });
});
