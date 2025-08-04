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
        html`<fhi-checkbox label="my label"></fhi-checkbox>`,
      );
      expect(component.getAttribute('label')).to.equal('my label');
      expect(component.label).to.equal('my label');
    });

    it('has an attribute to set id', async () => {
      component = await fixture(html`<fhi-checkbox id="my id"></fhi-checkbox>`);
      expect(component.getAttribute('id')).to.equal('my id');
      expect(component.id).to.equal('my id');
    });

    it('has an attribute to set name', async () => {
      component = await fixture(
        html`<fhi-checkbox name="my name"></fhi-checkbox>`,
      );
      expect(component.getAttribute('name')).to.equal('my name');
      expect(component.name).to.equal('my name');
    });

    it('has an attribute to set value', async () => {
      component = await fixture(
        html`<fhi-checkbox name="my value"></fhi-checkbox>`,
      );
      expect(component.getAttribute('name')).to.equal('my value');
      expect(component.name).to.equal('my value');
    });

    it('has an attribute to set status', async () => {
      component = await fixture(
        html`<fhi-checkbox status="error"></fhi-checkbox>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('has an attribute to set disabled', async () => {
      component = await fixture(html`<fhi-checkbox disabled></fhi-checkbox>`);

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });

    it('has an attribute to set checked', async () => {
      component = await fixture(html`<fhi-checkbox checked></fhi-checkbox>`);

      expect(component.hasAttribute('checked')).to.equal(true);
      expect(component.checked).to.equal(true);
    });
  });

  describe('form association', () => {
    it('is associated to its parent form', async () => {
      component = await fixture(
        html`<fhi-checkbox name="myCheckbox" checked></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myCheckbox')).to.not.equal(null);
      expect(form.get('myCheckbox')).to.not.equal(undefined);
    });

    it('updates its checked state when there is a change from the associated form', async () => {
      component = await fixture(
        html`<fhi-checkbox name="myCheckbox"></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myCheckbox.checked = true;

      expect(component.checked).to.equal(true);
    });

    it('updates its checked state when there is a change from the associated form and the input is disabled', async () => {
      component = await fixture(
        html`<fhi-checkbox name="myCheckbox" disabled></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myCheckbox.checked = true;

      expect(component.checked).to.equal(true);
    });

    it('is not included in the associated forms formData when unchecked', async () => {
      component = await fixture(
        html`<fhi-checkbox name="myCheckbox"></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myCheckbox')).to.equal(null);
    });

    it('is not included in the associated forms formData when disabled even if checked', async () => {
      component = await fixture(
        html`<fhi-checkbox name="myCheckbox" checked disabled></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myCheckbox')).to.equal(null);
    });

    it('sets form value to "on" if value is not specified', async () => {
      component = await fixture(
        html`<fhi-checkbox name="myCheckbox" checked></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myCheckbox')).to.equal('on');
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      component = await fixture(
        html`<fhi-checkbox
          name="myCheckbox"
          value="hello"
          checked
          disabled
        ></fhi-checkbox>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myCheckbox')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('myCheckbox')).to.equal('hello');
    });
  });
});
