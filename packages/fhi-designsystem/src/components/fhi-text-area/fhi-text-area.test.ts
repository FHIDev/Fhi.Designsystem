import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTextArea } from './fhi-text-area.component';
import { beforeEach, describe, it } from 'node:test';

describe('fhi-text-area', () => {
  new FhiTextArea();

  let component: FhiTextArea;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-text-area
          label="Normal"
          name="name"
          placeholder="placeholder"
          message="message"
          help-text="help text"
        ></fhi-text-area>`,
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
        html`<fhi-text-area
          label="Normal"
          name="name"
          placeholder="placeholder"
          message="message"
          help-text="help text"
          disabled
        ></fhi-text-area>`,
      );
      await expect(component).to.be.accessible();
    });

    it('is accessible when readonly', async () => {
      component = await fixture(
        html`<fhi-text-area
          label="Normal"
          name="name"
          placeholder="placeholder"
          message="message"
          help-text="help text"
          readonly
        ></fhi-text-area>`,
      );
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the placeholder', async () => {
      component = await fixture(
        html`<fhi-text-area placeholder="my placeholder"></fhi-text-area>`,
      );

      expect(component.getAttribute('placeholder')).to.equal('my placeholder');
      expect(component.placeholder).to.equal('my placeholder');
    });

    it('has an attribute to set the value', async () => {
      component = await fixture(
        html`<fhi-text-area value="my value"></fhi-text-area>`,
      );

      expect(component.getAttribute('value')).to.equal('my value');
      expect(component.value).to.equal('my value');
    });

    it('has an attribute to set the name', async () => {
      component = await fixture(
        html`<fhi-text-area name="my name"></fhi-text-area>`,
      );

      expect(component.getAttribute('name')).to.equal('my name');
      expect(component.name).to.equal('my name');
    });

    it('has an attribute to set the label', async () => {
      component = await fixture(
        html`<fhi-text-area label="my label"></fhi-text-area>`,
      );

      expect(component.getAttribute('label')).to.equal('my label');
      expect(component.label).to.equal('my label');
    });

    it('has an attribute to set the message', async () => {
      component = await fixture(
        html`<fhi-text-area message="my message"></fhi-text-area>`,
      );

      expect(component.getAttribute('message')).to.equal('my message');
      expect(component.message).to.equal('my message');
    });

    it('has an attribute to set helpText', async () => {
      component = await fixture(
        html`<fhi-text-area help-text="my help text"></fhi-text-area>`,
      );

      expect(component.getAttribute('help-text')).to.equal('my help text');
      expect(component.helpText).to.equal('my help text');
    });

    it('has an attribute to set the status', async () => {
      component = await fixture(
        html`<fhi-text-area status="error"></fhi-text-area>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('has an attribute to set the readonly', async () => {
      component = await fixture(html`<fhi-text-area readonly></fhi-text-area>`);

      expect(component.hasAttribute('readonly')).to.equal(true);
      expect(component.readonly).to.equal(true);
    });

    it('has an attribute to set the disabled', async () => {
      component = await fixture(html`<fhi-text-area disabled></fhi-text-area>`);

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });
  });

  describe('form association', () => {
    it('is associated to its parent form', async () => {
      component = await fixture(
        html`<fhi-text-area name="myText"></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myText')).to.not.equal(null);
      expect(form.get('myText')).to.not.equal(undefined);
    });

    it('updates its associated form when its value changes', async () => {
      component = await fixture(
        html`<fhi-text-area name="myText" value="hello"></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myText')).to.equal('hello');

      component.value = 'world';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('myText')).to.equal('world');
    });

    it('updates its associated form when its name changes', async () => {
      component = await fixture(
        html`<fhi-text-area name="myText" value="hello"></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myText')).to.equal('hello');

      component.name = 'my-new-text-area';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('my-new-text-area')).to.equal('hello');
    });

    it('updates its value when there is a value change from the associated form', async () => {
      component = await fixture(
        html`<fhi-text-area name="myText" value="hello"></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myText.value = 'world';

      expect(component.value).to.equal('world');
    });

    it('updates its value when there is a value change from the associated form and the text area is readonly', async () => {
      component = await fixture(
        html`<fhi-text-area
          name="myText"
          value="hello"
          readonly
        ></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myText.value = 'world';

      expect(component.value).to.equal('world');
    });

    it('updates its value when there is a value change from the associated form and the text area is disabled', async () => {
      component = await fixture(
        html`<fhi-text-area
          name="myText"
          value="hello"
          disabled
        ></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myText.value = 'world';

      expect(component.value).to.equal('world');
    });

    it('is not included in the associated forms formData when disabled', async () => {
      component = await fixture(
        html`<fhi-text-area
          name="myText"
          value="hello"
          disabled
        ></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myText')).to.equal(null);
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      component = await fixture(
        html`<fhi-text-area
          name="myText"
          value="hello"
          disabled
        ></fhi-text-area>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myText')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('myText')).to.equal('hello');
    });

    it('implicitly submits the form when the Enter key is pressed', async () => {
      let count = 0;

      const form = document.createElement('form');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        count++;
      });

      component = await fixture(
        html`<fhi-text-area name="myText" value="hello"></fhi-text-area>`,
        { parentNode: form },
      );

      component['_textarea'].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' }),
      );

      expect(count).to.equal(1);
    });

    it('resets its value when the form is reset', async () => {
      component = await fixture(
        html`<fhi-text-area name="myText" value="hello"></fhi-text-area>`,
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

  describe('label, helpText & message', async () => {
    it('displays a label', async () => {
      component = await fixture(
        html`<fhi-text-area label="my label"></fhi-text-area>`,
      );

      const label = component.shadowRoot!.querySelector('label');

      expect(label).to.not.equal(null);
      expect(label!.textContent).to.equal('my label');
    });

    it('displays a message', async () => {
      component = await fixture(
        html`<fhi-text-area message="my message"></fhi-text-area>`,
      );

      const message = component.shadowRoot!.querySelector('.message');

      expect(message).to.not.equal(null);
      expect(message!.textContent).to.equal('my message');
    });

    it('displays helpText', async () => {
      component = await fixture(
        html`<fhi-text-area help-text="my help text"></fhi-text-area>`,
      );

      const helpText = component.shadowRoot!.querySelector('.help-text');

      expect(helpText).to.not.equal(null);
      expect(helpText!.textContent).to.equal('my help text');
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the "name" property with the "name" attribute', async () => {
      component = await fixture(
        html`<fhi-text-area name="hello"></fhi-text-area>`,
      );

      expect(component.getAttribute('name')).to.equal('hello');
      expect(component.name).to.equal('hello');

      component.name = 'world';
      await component.updateComplete;

      expect(component.getAttribute('name')).to.equal('world');
      expect(component.name).to.equal('world');
    });
  });
});
