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
    it('has an attribute to set the placeholder', async () => {
      component = await fixture(
        html`<fhi-text-input placeholder="my placeholder"></fhi-text-input>`,
      );

      expect(component.getAttribute('placeholder')).to.equal('my placeholder');
      expect(component.placeholder).to.equal('my placeholder');
    });

    it('has an attribute to set the value', async () => {
      component = await fixture(
        html`<fhi-text-input value="my value"></fhi-text-input>`,
      );

      expect(component.getAttribute('value')).to.equal('my value');
      expect(component.value).to.equal('my value');
    });

    it('has an attribute to set the name', async () => {
      component = await fixture(
        html`<fhi-text-input name="my name"></fhi-text-input>`,
      );

      expect(component.getAttribute('name')).to.equal('my name');
      expect(component.name).to.equal('my name');
    });

    it('has an attribute to set the label', async () => {
      component = await fixture(
        html`<fhi-text-input label="my label"></fhi-text-input>`,
      );

      expect(component.getAttribute('label')).to.equal('my label');
      expect(component.label).to.equal('my label');
    });

    it('has an attribute to set the message', async () => {
      component = await fixture(
        html`<fhi-text-input message="my message"></fhi-text-input>`,
      );

      expect(component.getAttribute('message')).to.equal('my message');
      expect(component.message).to.equal('my message');
    });

    it('has an attribute to set the status', async () => {
      component = await fixture(
        html`<fhi-text-input status="error"></fhi-text-input>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('has an attribute to set the readonly', async () => {
      component = await fixture(
        html`<fhi-text-input readonly></fhi-text-input>`,
      );

      expect(component.hasAttribute('readonly')).to.equal(true);
      expect(component.readonly).to.equal(true);
    });

    it('has an attribute to set the disabled', async () => {
      component = await fixture(
        html`<fhi-text-input disabled></fhi-text-input>`,
      );

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the "name" property with the "name" attribute', async () => {
      component = await fixture(
        html`<fhi-text-input name="hello"></fhi-text-input>`,
      );

      expect(component.getAttribute('name')).to.equal('hello');
      expect(component.name).to.equal('hello');

      component.name = 'world';
      await component.updateComplete;

      expect(component.getAttribute('name')).to.equal('world');
      expect(component.name).to.equal('world');
    });
  });

  describe('form association', () => {
    it('is associated to its parent form', async () => {
      component = await fixture(
        html`<fhi-text-input name="myInput"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myInput')).to.not.equal(null);
      expect(form.get('myInput')).to.not.equal(undefined);
    });

    it('updates its associated form when its value changes', async () => {
      component = await fixture(
        html`<fhi-text-input name="myInput" value="hello"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myInput')).to.equal('hello');

      component.value = 'world';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('myInput')).to.equal('world');
    });

    it('updates its associated form when its name changes', async () => {
      component = await fixture(
        html`<fhi-text-input name="myInput" value="hello"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myInput')).to.equal('hello');

      component.name = 'my-new-input';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('my-new-input')).to.equal('hello');
    });

    it('updates its value when there is a value change from the associated form', async () => {
      component = await fixture(
        html`<fhi-text-input name="myInput" value="hello"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myInput.value = 'world';

      expect(component.value).to.equal('world');
    });

    it('updates its value when there is a value change from the associated form and the input is readonly', async () => {
      component = await fixture(
        html`<fhi-text-input
          name="myInput"
          value="hello"
          readonly
        ></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myInput.value = 'world';

      expect(component.value).to.equal('world');
    });

    it('updates its value when there is a value change from the associated form and the input is disabled', async () => {
      component = await fixture(
        html`<fhi-text-input
          name="myInput"
          value="hello"
          disabled
        ></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myInput.value = 'world';

      expect(component.value).to.equal('world');
    });

    it('is not included in the associated forms formData when disabled', async () => {
      component = await fixture(
        html`<fhi-text-input
          name="myInput"
          value="hello"
          disabled
        ></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myInput')).to.equal(null);
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      component = await fixture(
        html`<fhi-text-input
          name="myInput"
          value="hello"
          disabled
        ></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myInput')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('myInput')).to.equal('hello');
    });

    it('implicitly submits the form when the Enter key is pressed', async () => {
      let count = 0;

      const form = document.createElement('form');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        count++;
      });

      component = await fixture(
        html`<fhi-text-input name="myInput" value="hello"></fhi-text-input>`,
        { parentNode: form },
      );

      component._input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' }),
      );

      expect(count).to.equal(1);
    });

    it('resets its value when the form is reset', async () => {
      component = await fixture(
        html`<fhi-text-input name="myInput" value="hello"></fhi-text-input>`,
        { parentNode: document.createElement('form') },
      );

      component.value = 'world';
      await component.updateComplete;

      expect(component.value).to.equal('world');

      const form = document.querySelector('form') as HTMLFormElement;

      form.reset();
      await component.updateComplete;

      expect(component.value).to.equal('hello');
    });
  });

  describe('label & message', async () => {
    it('displays a label', async () => {
      component = await fixture(
        html`<fhi-text-input label="my label"></fhi-text-input>`,
      );

      const label = component.shadowRoot!.querySelector('label');

      expect(label).to.not.equal(null);
      expect(label!.textContent).to.equal('my label');
    });

    it('displays a message', async () => {
      component = await fixture(
        html`<fhi-text-input message="my message"></fhi-text-input>`,
      );

      const message = component.shadowRoot!.querySelector('.message');

      expect(message).to.not.equal(null);
      expect(message!.textContent).to.equal('my message');
    });
  });
});
