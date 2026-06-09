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

    it('has an attribute to set outlined', async () => {
      component = await fixture(html`<fhi-tag outlined>Test Tag</fhi-tag>`);

      expect(component.outlined).to.equal(true);
    });

    it('should reflect the color property to the attribute', async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);
      component.color = 'warning';
      await component.updateComplete;

      expect(component.getAttribute('color')).to.equal('warning');
    });

    it('should reflect the outlined property to the attribute', async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);
      component.outlined = true;
      await component.updateComplete;

      expect(component.hasAttribute('outlined')).to.equal(true);
    });

    it('sets default value for color attribute', async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);

      expect(component.color).to.equal('neutral');
    });

    it('sets default value for outlined attribute', async () => {
      component = await fixture(html`<fhi-tag>Test Tag</fhi-tag>`);

      expect(component.outlined).to.equal(false);
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
        'calc(-1 * var(--fhi-spacing-050))',
      );
    });
  });
});
