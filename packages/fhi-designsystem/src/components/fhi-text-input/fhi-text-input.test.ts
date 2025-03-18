import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiTextInput } from '.';

describe('fhi-text-input', () => {
  new FhiTextInput();

  let component: FhiTextInput;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-text-input
          label="Normal"
          name="name"
          placeholder="placeholder"
          message="message"
        ></fhi-text-input>`,
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
        html`<fhi-text-input
          label="Normal"
          name="name"
          placeholder="placeholder"
          message="message"
          disabled
        ></fhi-text-input>`,
      );
      await expect(component).to.be.accessible();
    });

    it('is accessible when readonly', async () => {
      component = await fixture(
        html`<fhi-text-input
          label="Normal"
          name="name"
          placeholder="placeholder"
          message="message"
          readonly
        ></fhi-text-input>`,
      );
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('it sets its default attributes', async () => {
      component = await fixture(html`<fhi-text-input></fhi-text-input>`);

      expect(component).dom.to.equal(
        `<fhi-text-input value=""></fhi-text-input>`,
      );
    });

    it('it has an attribute to set the placeholder', async () => {
      component = await fixture(
        html`<fhi-text-input placeholder="my placeholder"></fhi-text-input>`,
      );

      expect(component.getAttribute('placeholder')).to.equal('my placeholder');
      expect(component.placeholder).to.equal('my placeholder');
    });

    it('it has an attribute to set the value', async () => {
      component = await fixture(
        html`<fhi-text-input value="my value"></fhi-text-input>`,
      );

      expect(component.getAttribute('value')).to.equal('my value');
      expect(component.value).to.equal('my value');
    });

    it('it has an attribute to set the name', async () => {
      component = await fixture(
        html`<fhi-text-input name="my name"></fhi-text-input>`,
      );

      expect(component.getAttribute('name')).to.equal('my name');
      expect(component.name).to.equal('my name');
    });

    it('it has an attribute to set the label', async () => {
      component = await fixture(
        html`<fhi-text-input label="my label"></fhi-text-input>`,
      );

      expect(component.getAttribute('label')).to.equal('my label');
      expect(component.label).to.equal('my label');
    });

    it('it has an attribute to set the message', async () => {
      component = await fixture(
        html`<fhi-text-input message="my message"></fhi-text-input>`,
      );

      expect(component.getAttribute('message')).to.equal('my message');
      expect(component.message).to.equal('my message');
    });

    it('it has an attribute to set the status', async () => {
      component = await fixture(
        html`<fhi-text-input status="error"></fhi-text-input>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('it has an attribute to set the required', async () => {
      component = await fixture(
        html`<fhi-text-input required></fhi-text-input>`,
      );

      expect(component.hasAttribute('required')).to.equal(true);
      expect(component.required).to.equal(true);
    });

    it('it has an attribute to set the readonly', async () => {
      component = await fixture(
        html`<fhi-text-input readonly></fhi-text-input>`,
      );

      expect(component.hasAttribute('readonly')).to.equal(true);
      expect(component.readonly).to.equal(true);
    });

    it('it has an attribute to set the disabled', async () => {
      component = await fixture(
        html`<fhi-text-input disabled></fhi-text-input>`,
      );

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });
  });

  describe('property-attribute mirror', () => {
    it('it mirrors the "value" property with the "value" attribute', async () => {
      component = await fixture(
        html`<fhi-text-input value="hello"></fhi-text-input>`,
      );

      expect(component.getAttribute('value')).to.equal('hello');
      expect(component.value).to.equal('hello');

      component.value = 'world';
      await component.updateComplete;

      expect(component.getAttribute('value')).to.equal('world');
      expect(component.value).to.equal('world');
    });
  });

  describe('form association', () => {
    it('it assosiated to its parent form', async () => {
      component = await fixture(
        html`<fhi-text-input name="my-input"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('my-input')).to.not.equal(null);
      expect(form.get('my-input')).to.not.equal(undefined);
    });

    it('it updates its assosiated form when its value changes', async () => {
      component = await fixture(
        html`<fhi-text-input name="my-input" value="hello"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('my-input')).to.equal('hello');

      component.value = 'world';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('my-input')).to.equal('world');
    });
  });
});
