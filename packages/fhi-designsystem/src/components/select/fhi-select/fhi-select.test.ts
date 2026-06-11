import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiSelect } from './fhi-select.component';

describe('fhi-select', () => {
  new FhiSelect();

  let component: FhiSelect;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html` <fhi-select
          name="test-select"
          label="Test Label"
          message="This is a test message."
        >
          <fhi-select-item>Velg alternativ</fhi-select-item>
          <fhi-select-item>Norge</fhi-select-item>
          <fhi-select-item>Sverige</fhi-select-item>
          <fhi-select-item>Danmark</fhi-select-item>
        </fhi-select>`,
      );
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('is accessible when disabled', async () => {
      component.disabled = true;

      await component.updateComplete;

      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    beforeEach(async () => {
      component = await fixture(html` <fhi-select> </fhi-select>`);
    });

    it('has an attribute to set the label', async () => {
      const label = 'My Label';

      component = await fixture(
        html`<fhi-select label="${label}"></fhi-select>`,
      );

      expect(component.getAttribute('label')).to.equal(label);
      expect(component.label).to.equal(label);
    });

    it('has an attribute to set the name', async () => {
      const name = 'my-select';

      component = await fixture(html`<fhi-select name="${name}"></fhi-select>`);

      expect(component.getAttribute('name')).to.equal(name);
      expect(component.name).to.equal(name);
    });

    it('has an attribute to set the disabled state', async () => {
      const disabled = '';

      component = await fixture(
        html`<fhi-select disabled="${disabled}"></fhi-select>`,
      );

      expect(component.getAttribute('disabled')).to.equal(disabled);
      expect(component.disabled).to.equal(true);
    });

    it('has an attribute to set the status', async () => {
      const status = 'error';

      component = await fixture(
        html`<fhi-select status="${status}"></fhi-select>`,
      );

      expect(component.getAttribute('status')).to.equal(status);
      expect(component.status).to.equal(status);
    });

    it('has an attribute to set the message', async () => {
      const message = 'This is a test message.';

      component = await fixture(
        html`<fhi-select message="${message}"></fhi-select>`,
      );

      expect(component.getAttribute('message')).to.equal(message);
      expect(component.message).to.equal(message);
    });
  });

  describe('property-attribute reflection', () => {
    beforeEach(async () => {
      component = await fixture(html` <fhi-select> </fhi-select>`);
    });

    it('reflects the name property to an attribute', async () => {
      const name = 'my-select';

      component.name = name;
      await component.updateComplete;

      expect(component.getAttribute('name')).to.equal(name);
    });

    it('reflects the disabled property to an attribute', async () => {
      component.disabled = true;
      await component.updateComplete;

      expect(component.hasAttribute('disabled')).to.equal(true);
    });

    it('reflects the status property to an attribute', async () => {
      const status = 'error';

      component.status = status;
      await component.updateComplete;

      expect(component.getAttribute('status')).to.equal(status);
    });
  });

  describe('form association', () => {
    it('is associated to its parent form', async () => {
      component = await fixture(
        html`<fhi-select name="mySelect">
          <fhi-select-item selected>Option 1</fhi-select-item>
        </fhi-select>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('mySelect')).to.not.equal(null);
      expect(form.get('mySelect')).to.not.equal(undefined);
    });

    it('updates its associated form when the user changes the selected option', async () => {
      const formElement = document.createElement('form');

      component = await fixture(
        html`<fhi-select name="mySelect">
          <fhi-select-item selected>Option 1</fhi-select-item>
          <fhi-select-item>Option 2</fhi-select-item>
        </fhi-select>`,
        { parentNode: formElement },
      );

      await component.updateComplete;

      let form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 1');

      const select = component.shadowRoot!.querySelector(
        'select',
      ) as HTMLSelectElement;
      select.value = 'Option 2';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      await component.updateComplete;

      form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 2');
    });

    it('updates its associated form when its name changes', async () => {
      const formElement = document.createElement('form');

      component = await fixture(
        html`<fhi-select name="mySelect">
          <fhi-select-item selected>Option 1</fhi-select-item>
        </fhi-select>`,
        { parentNode: formElement },
      );

      await component.updateComplete;

      let form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 1');

      component.name = 'newName';
      await component.updateComplete;

      form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal(null);
      expect(form.get('newName')).to.equal('Option 1');
    });

    it('resets its associated form value when the form is reset', async () => {
      const formElement = document.createElement('form');

      component = await fixture(
        html`<fhi-select name="mySelect">
          <fhi-select-item selected>Option 1</fhi-select-item>
          <fhi-select-item>Option 2</fhi-select-item>
        </fhi-select>`,
        { parentNode: formElement },
      );

      await component.updateComplete;

      let form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 1');

      const select = component.shadowRoot!.querySelector(
        'select',
      ) as HTMLSelectElement;
      select.value = 'Option 2';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      await component.updateComplete;

      form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 2');

      formElement.reset();

      await component.updateComplete;

      form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 1');
    });

    it('is not included in the associated forms formData when disabled', async () => {
      const formElement = document.createElement('form');

      component = await fixture(
        html`<fhi-select name="mySelect" disabled>
          <fhi-select-item selected>Option 1</fhi-select-item>
          <fhi-select-item>Option 2</fhi-select-item>
        </fhi-select>`,
        { parentNode: formElement },
      );

      await component.updateComplete;

      const form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal(null);
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      const formElement = document.createElement('form');

      component = await fixture(
        html`<fhi-select name="mySelect" disabled>
          <fhi-select-item selected>Option 1</fhi-select-item>
          <fhi-select-item>Option 2</fhi-select-item>
        </fhi-select>`,
        { parentNode: formElement },
      );

      await component.updateComplete;

      let form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      form = new FormData(formElement);
      expect(form.get('mySelect')).to.equal('Option 1');
    });
  });

  describe('label & message', () => {
    it('displays a label', async () => {
      const label = 'Test Label';

      component = await fixture(
        html`<fhi-select label="${label}"></fhi-select>`,
      );

      const labelElement = component.shadowRoot!.querySelector(
        '.label',
      ) as HTMLElement;

      expect(labelElement).to.not.equal(null);
      expect(labelElement.textContent).to.equal(label);
    });

    it('associates the label with the select', async () => {
      const labelText = 'Test Label';

      component = await fixture(
        html`<fhi-select label="${labelText}"></fhi-select>`,
      );

      const label = component.shadowRoot!.querySelector(
        'label',
      ) as HTMLLabelElement;
      const select = component.shadowRoot!.querySelector(
        'select',
      ) as HTMLSelectElement;

      expect(label).to.not.equal(null);
      expect(select).to.not.equal(null);
      expect(label.getAttribute('for')).to.equal(select.id);
      expect(select.labels?.[0]).to.equal(label);
    });

    it('displays a message', async () => {
      const message = 'This is a test message.';

      component = await fixture(
        html`<fhi-select message="${message}"></fhi-select>`,
      );

      const messageElement = component.shadowRoot!.querySelector(
        '.message',
      ) as HTMLElement;

      expect(messageElement).to.not.equal(null);
      expect(messageElement.textContent).to.equal(message);
    });
  });
});
