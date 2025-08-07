import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiRadio } from './fhi-radio.component';

describe('fhi-radio', () => {
  new FhiRadio();

  let component: FhiRadio;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html` <fhi-radio
          label="Test Radio"
          name="test-radio"
          value="test-value"
        ></fhi-radio>`,
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
        html`<fhi-radio
          label="Test Radio"
          name="test-radio"
          value="test-value"
          disabled
        ></fhi-radio>`,
      );
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set the label', async () => {
      const label = 'My Label';

      component = await fixture(html`<fhi-radio label="${label}"></fhi-radio>`);

      expect(component.getAttribute('label')).to.equal(label);
      expect(component.label).to.equal(label);
    });

    it('has an attribute to set the name', async () => {
      const name = 'My Name';

      component = await fixture(html`<fhi-radio name="${name}"></fhi-radio>`);

      expect(component.getAttribute('name')).to.equal(name);
      expect(component.name).to.equal(name);
    });

    it('has an attribute to set the status', async () => {
      const status = 'My Status';

      component = await fixture(
        html`<fhi-radio status="${status}"></fhi-radio>`,
      );

      expect(component.getAttribute('status')).to.equal(status);
      expect(component.status).to.equal(status);
    });

    it('has an attribute to set the disabled', async () => {
      const disabled = '';

      component = await fixture(
        html`<fhi-radio disabled="${disabled}"></fhi-radio>`,
      );

      expect(component.getAttribute('disabled')).to.equal(disabled);
      expect(component.disabled).to.equal(true);
    });

    it('has an attribute to set the checked', async () => {
      const checked = '';

      component = await fixture(
        html`<fhi-radio checked="${checked}"></fhi-radio>`,
      );

      expect(component.getAttribute('checked')).to.equal(checked);
      expect(component.checked).to.equal(true);
    });

    it('has an attribute to set the value', async () => {
      const value = 'My Value';

      component = await fixture(html`<fhi-radio value="${value}"></fhi-radio>`);

      expect(component.getAttribute('value')).to.equal(value);
      expect(component.value).to.equal(value);
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the "name" property with the "name" attribute', async () => {
      const name = 'myName';

      component = await fixture(html`<fhi-radio name="${name}"></fhi-radio>`);

      expect(component.getAttribute('name')).to.equal(name);
      expect(component.name).to.equal(name);

      component.name = 'newName';
      await component.updateComplete;

      expect(component.getAttribute('name')).to.equal('newName');
      expect(component.name).to.equal('newName');
    });

    it('reflects the "status" property with the "status" attribute', async () => {
      const status = 'error';

      component = await fixture(
        html`<fhi-radio status="${status}"></fhi-radio>`,
      );

      expect(component.getAttribute('status')).to.equal(status);
      expect(component.status).to.equal(status);

      component.status = undefined;
      await component.updateComplete;

      expect(component.getAttribute('status')).to.equal(null);
      expect(component.status).to.equal(undefined);
    });

    it('reflects the "disabled" property with the "disabled" attribute', async () => {
      const disabled = '';

      component = await fixture(
        html`<fhi-radio disabled="${disabled}"></fhi-radio>`,
      );

      expect(component.getAttribute('disabled')).to.equal(disabled);
      expect(component.disabled).to.equal(true);

      component.disabled = false;
      await component.updateComplete;

      expect(component.getAttribute('disabled')).to.equal(null);
      expect(component.disabled).to.equal(false);
    });
  });

  describe('events', () => {
    it('dispatches a "change" event when checked by the user', async () => {
      component = await fixture(
        html`<fhi-radio name="test" value="test"></fhi-radio>`,
      );

      let changeEvent = false;
      component.addEventListener('change', () => {
        changeEvent = true;
      });

      const input = component.shadowRoot?.querySelector(
        'input[type="radio"]',
      ) as HTMLInputElement;

      input.click();

      await component.updateComplete;

      expect(changeEvent).to.equal(true);
    });

    it('dispatches an "input" event when checked by the user', async () => {
      component = await fixture(
        html`<fhi-radio name="test" value="test"></fhi-radio>`,
      );

      let inputEvent = false;
      component.addEventListener('input', () => {
        inputEvent = true;
      });

      const input = component.shadowRoot?.querySelector(
        'input[type="radio"]',
      ) as HTMLInputElement;

      input.click();

      await component.updateComplete;

      expect(inputEvent).to.equal(true);
    });

    it('does not dispatch an "input" nor "change" event when disabled', async () => {
      component = await fixture(
        html`<fhi-radio name="test" value="test" disabled></fhi-radio>`,
      );

      let changeEvent = false;
      component.addEventListener('change', () => {
        changeEvent = true;
      });

      let inputEvent = false;
      component.addEventListener('input', () => {
        inputEvent = true;
      });

      const input = component.shadowRoot?.querySelector(
        'input[type="radio"]',
      ) as HTMLInputElement;

      input.click();

      await component.updateComplete;

      expect(changeEvent).to.equal(false);
      expect(inputEvent).to.equal(false);
    });
  });

  describe('form association & Grouping', () => {
    it('is associated to its parent form', async () => {
      component = await fixture(
        html`<fhi-radio name="myRadio" value="myRadio" checked></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myRadio')).to.not.equal(null);
      expect(form.get('myRadio')).to.not.equal(undefined);
    });

    it('sets form value to "on" when checked if value is not specified', async () => {
      component = await fixture(
        html`<fhi-radio name="myRadio" checked></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myRadio')).to.equal('on');
    });

    it('updates its checked state when changed by the associated form', async () => {
      component = await fixture(
        html`<fhi-radio name="myRadio" value="myRadio" checked></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.myRadio.checked = false;

      expect(component.checked).to.equal(false);
    });

    it('updates its associated form when its checked state changes', async () => {
      const name = 'myName';
      const value = 'myValue';

      component = await fixture(
        html`<fhi-radio name="${name}" value="${value}" checked></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get(name)).to.equal(value);

      component.value = 'newValue';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get(name)).to.equal('newValue');
    });

    it('updates its associated form when its name changes', async () => {
      const name = 'myName';
      const value = 'myValue';

      component = await fixture(
        html`<fhi-radio name="${name}" value="${value}" checked></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get(name)).to.equal(value);

      component.name = 'newName';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('newName')).to.equal(value);
    });

    it('unchecks other radios in the same group when checked', async () => {
      const name = 'myGroup';

      const radio1 = (await fixture(
        html`<fhi-radio name="${name}" value="radio1"></fhi-radio>`,
      )) as FhiRadio;
      const radio2 = (await fixture(
        html`<fhi-radio name="${name}" value="radio2"></fhi-radio>`,
      )) as FhiRadio;

      radio1.checked = true;
      await radio1.updateComplete;

      expect(radio1.checked).to.equal(true);
      expect(radio2.checked).to.equal(false);

      radio2.checked = true;
      await radio2.updateComplete;

      expect(radio1.checked).to.equal(false);
      expect(radio2.checked).to.equal(true);
    });

    it('does not uncheck other radios in a different group when checked', async () => {
      const name = 'myGroup';

      const radio1 = (await fixture(
        html`<fhi-radio name="${name}" value="radio1"></fhi-radio>`,
      )) as FhiRadio;

      const radio2 = (await fixture(
        html`<fhi-radio name="${name}1" value="radio2" checked></fhi-radio>`,
      )) as FhiRadio;

      radio1.checked = true;
      await radio1.updateComplete;

      expect(radio1.checked).to.equal(true);
      expect(radio2.checked).to.equal(true);
    });

    it('does not uncheck itself when checked', async () => {
      const name = 'myGroup';

      component = (await fixture(
        html`<fhi-radio name="${name}" value="radio1"></fhi-radio>`,
      )) as FhiRadio;

      component.checked = true;
      await component.updateComplete;

      expect(component.checked).to.equal(true);
    });

    it('is not included in the associated forms formData when unchecked', async () => {
      component = await fixture(
        html`<fhi-radio name="myRadio" value="myRadio"></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myRadio')).to.equal(null);
    });

    it('is not included in the associated forms formData when disabled, even if checked', async () => {
      component = await fixture(
        html`<fhi-radio
          name="myRadio"
          value="myRadio"
          checked
          disabled
        ></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myRadio')).to.equal(null);
    });

    it('resets its checked state when the form is reset', async () => {
      component = await fixture(
        html`<fhi-radio name="gender" value="male" checked></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      component.checked = false;
      await component.updateComplete;

      expect(component.checked).to.equal(false);

      const form = document.querySelector('form') as HTMLFormElement;

      form.reset();
      await component.updateComplete;

      expect(component.checked).to.equal(true);
    });

    it('correctly resets its checked state when multiple radios have the checked attribute and the form is reset', async () => {
      const name = 'myGroup';

      const form = document.createElement('form');

      const radio1 = (await fixture(
        html`<fhi-radio name="${name}" value="radio1" checked></fhi-radio>`,
      )) as FhiRadio;

      const radio2 = (await fixture(
        html`<fhi-radio name="${name}" value="radio2" checked></fhi-radio>`,
      )) as FhiRadio;

      form.appendChild(radio1);
      form.appendChild(radio2);

      form.reset();
      await radio1.updateComplete;
      await radio2.updateComplete;

      // when multiple radios in a group have the checked attribute, the last one should remain checked after the reset
      expect(radio1.checked).to.equal(false);
      expect(radio2.checked).to.equal(true);
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      component = await fixture(
        html`<fhi-radio
          name="myRadio"
          value="myRadio"
          checked
          disabled
        ></fhi-radio>`,
        {
          parentNode: document.createElement('form'),
        },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myRadio')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      const updatedForm = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(updatedForm.get('myRadio')).to.equal('myRadio');
    });
  });
});
