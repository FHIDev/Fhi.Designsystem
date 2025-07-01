import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiCheckbox } from './fhi-checkbox.component.ts';

describe('fhi-checkbox', () => {
  new FhiCheckbox();
  let component: FhiCheckbox;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-checkbox label="Agree" id="agree"></fhi-checkbox>`,
      );
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('is accessible when focused', async () => {
      component.dispatchEvent(new Event('focusin'));
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });

    it('is accessible when disabled', async () => {
      component = await fixture(
        html`<fhi-checkbox label="Agree" id="agree" disabled></fhi-checkbox>`,
      );
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set label', async () => {
      component = await fixture(
        html`<fhi-checkbox label="test"></fhi-checkbox>`,
      );
      expect(component.getAttribute('label')).to.equal('test');
      expect(component.label).to.equal('test');
    });

    it('has an attribute to set id', async () => {
      component = await fixture(html`<fhi-checkbox id="test"></fhi-checkbox>`);
      expect(component.getAttribute('id')).to.equal('test');
      expect(component.id).to.equal('test');
    });

    it('has an attribute to set the status', async () => {
      component = await fixture(
        html`<fhi-checkbox status="error"></fhi-checkbox>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('has an attribute to set the disabled', async () => {
      component = await fixture(html`<fhi-checkbox disabled></fhi-checkbox>`);

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });
  });
});
