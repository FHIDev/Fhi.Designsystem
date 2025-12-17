import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTag } from './fhi-tag.component';

describe('fhi-tag', () => {
  new FhiTag();

  let component: FhiTag;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('renders the text slot', async () => {
      expect(component.innerText?.trim()).to.equal('Test Tag');
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set color', async () => {
      component = await fixture(
        html`<fhi-tag color="danger">Test Tag</fhi-tag>`,
      );

      expect(component.color).to.equal('danger');
    });

    it('should reflect the color property to the attribute', async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);
      component.color = 'warning';
      await component.updateComplete;

      expect(component.getAttribute('color')).to.equal('warning');
    });

    it('sets default value for color attribute', async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);

      expect(component.color).to.equal('neutral');
    });
  });

  describe('icon handling', () => {
    it('correctly styles an icon that is the first child', async () => {
      component = await fixture(
        html`<fhi-tag color="warning"
          ><fhi-icon-clock></fhi-icon-clock>Utløper snart</fhi-tag
        >`,
      );

      const icon: HTMLElement = component.querySelector('fhi-icon-clock')!;

      await expect(icon.getAttribute('size')).to.equal('1rem');
      await expect(icon.style.marginLeft).to.equal(
        'var(--dimension-icon-offset)',
      );
    });
  });

  describe('text handling', () => {
    it('correctly styles body', async () => {
      component = await fixture(
        html`<fhi-tag color="warning">Utløper snart</fhi-tag>`,
      );

      const body: HTMLElement = component.shadowRoot.querySelector('fhi-body')!;

      await expect(body.getAttribute('color')).to.equal(
        'var(--color-warning-text)',
      );
    });
  });
});
