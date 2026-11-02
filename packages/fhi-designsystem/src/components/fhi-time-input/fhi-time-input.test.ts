import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isSafari } from '../../utils/browser';
import { FhiTimeInput } from './fhi-time-input.component';

describe('fhi-time-input', () => {
  new FhiTimeInput();

  let component: FhiTimeInput;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <fhi-time-input
          label="Tid"
          name="time"
          message="Message"
          help-text="Help text"
        ></fhi-time-input>
      `);
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
      component = await fixture(html`
        <fhi-time-input
          label="Tid"
          name="time"
          message="Message"
          help-text="Help text"
          disabled
        ></fhi-time-input>
      `);
      await expect(component).to.be.accessible();
    });

    it('is accessible when readonly', async () => {
      component = await fixture(html`
        <fhi-time-input
          label="Tid"
          name="time"
          message="Message"
          help-text="Help text"
          readonly
        ></fhi-time-input>
      `);
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set value', async () => {
      component = await fixture(
        html`<fhi-time-input value="08:30"></fhi-time-input>`,
      );

      expect(component.getAttribute('value')).to.equal('08:30');
      expect(component.value).to.equal('08:30');
    });

    it('has an attribute to set min', async () => {
      component = await fixture(
        html`<fhi-time-input min="08:00"></fhi-time-input>`,
      );

      expect(component.getAttribute('min')).to.equal('08:00');
      expect(component.min).to.equal('08:00');
    });

    it('has an attribute to set max', async () => {
      component = await fixture(
        html`<fhi-time-input max="16:00"></fhi-time-input>`,
      );

      expect(component.getAttribute('max')).to.equal('16:00');
      expect(component.max).to.equal('16:00');
    });

    it('has an attribute to set name', async () => {
      component = await fixture(
        html`<fhi-time-input name="Time"></fhi-time-input>`,
      );

      expect(component.getAttribute('name')).to.equal('Time');
      expect(component.name).to.equal('Time');
    });

    it('has an attribute to set label', async () => {
      component = await fixture(
        html`<fhi-time-input label="label text"></fhi-time-input>`,
      );

      expect(component.getAttribute('label')).to.equal('label text');
      expect(component.label).to.equal('label text');
    });

    it('has an attribute to set message', async () => {
      component = await fixture(
        html`<fhi-time-input message="message text"></fhi-time-input>`,
      );

      expect(component.getAttribute('message')).to.equal('message text');
      expect(component.message).to.equal('message text');
    });

    it('has an attribute to set help-text', async () => {
      component = await fixture(
        html`<fhi-time-input help-text="help text"></fhi-time-input>`,
      );

      expect(component.getAttribute('help-text')).to.equal('help text');
      expect(component.helpText).to.equal('help text');
    });

    it('has an attribute to set status', async () => {
      component = await fixture(
        html`<fhi-time-input status="error"></fhi-time-input>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('has an attribute to set the readonly', async () => {
      component = await fixture(
        html`<fhi-time-input readonly></fhi-time-input>`,
      );

      expect(component.hasAttribute('readonly')).to.equal(true);
      expect(component.readonly).to.equal(true);
    });

    it('has an attribute to set disabled', async () => {
      component = await fixture(
        html`<fhi-time-input disabled></fhi-time-input>`,
      );

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the "name" property with the "name" attribute', async () => {
      component = await fixture(
        html`<fhi-time-input name="hello"></fhi-time-input> `,
      );

      expect(component.name).to.equal('hello');
      expect(component.getAttribute('name')).to.equal('hello');

      component.name = 'world';
      await component.updateComplete;

      expect(component.name).to.equal('world');
      expect(component.getAttribute('name')).to.equal('world');
    });
  });

  describe('form association', () => {
    it("associates to it's parent form", async () => {
      component = await fixture(
        html`<fhi-time-input name="time"></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('time')).to.not.equal(null);
      expect(form.get('time')).to.not.equal(undefined);
    });

    it("updates it's associated form when it's value changes", async () => {
      component = await fixture(
        html`<fhi-time-input name="time" value="08:30"></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('time')).to.equal('08:30');

      component.value = '09:45';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('time')).to.equal('09:45');
    });

    it("updates it's associated form when it's name changes", async () => {
      component = await fixture(
        html`<fhi-time-input name="time" value="08:30"></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('time')).to.equal('08:30');

      component.name = 'new-time';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('time')).to.equal(null);
      expect(form.get('new-time')).to.equal('08:30');
    });

    it("updates it's value when there is a value change from the associated form", async () => {
      component = await fixture(
        html`<fhi-time-input name="time" value="08:30"></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.time.value = '09:45';

      expect(component.value).to.equal('09:45');
    });

    it("updates it's value when there is a value change from the associated form and the input is readonly", async () => {
      component = await fixture(
        html`<fhi-time-input
          name="time"
          value="08:30"
          readonly
        ></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.time.value = '09:45';

      expect(component.value).to.equal('09:45');
    });

    it("updates it's value when there is a value change from the associated form and the input is disabled", async () => {
      component = await fixture(
        html`<fhi-time-input
          name="time"
          value="08:30"
          disabled
        ></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.time.value = '09:45';

      expect(component.value).to.equal('09:45');
    });

    it('is not included in the associated forms formData when disabled', async () => {
      component = await fixture(
        html`<fhi-time-input
          name="time"
          value="08:30"
          disabled
        ></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('time')).to.equal(null);
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      component = await fixture(
        html`<fhi-time-input
          name="time"
          value="08:30"
          disabled
        ></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('time')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('time')).to.equal('08:30');
    });

    it('implicitly submits the form when the Enter key is pressed', async () => {
      let count = 0;

      const form = document.createElement('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        count++;
      });

      component = await fixture(
        html`<fhi-time-input name="time" value="08:30"></fhi-time-input>`,
        { parentNode: form },
      );

      component['_input'].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' }),
      );

      expect(count).to.equal(1);
    });

    it("resets it's value when the associated form is reset", async () => {
      component = await fixture(
        html`<fhi-time-input name="time" value="08:30"></fhi-time-input>`,
        { parentNode: document.createElement('form') },
      );

      component.value = '09:45';
      await component.updateComplete;

      expect(component.value).to.equal('09:45');

      const form = document.querySelector('form') as HTMLFormElement;

      form.reset();
      await component.updateComplete;

      expect(component.value).to.equal('08:30');
    });
  });

  describe('label, message & helpText', () => {
    it('displays a label', async () => {
      component = await fixture(
        html`<fhi-time-input label="label text"></fhi-time-input>`,
      );

      const label = component.shadowRoot!.querySelector('label');

      expect(label).to.not.equal(null);
      expect(label?.textContent).to.equal('label text');
    });

    it('displays a message', async () => {
      component = await fixture(
        html`<fhi-time-input message="message text"></fhi-time-input>`,
      );

      const message = component.shadowRoot!.querySelector('.message');

      expect(message).to.not.equal(null);
      expect(message?.textContent).to.equal('message text');
    });

    it('displays helpText', async () => {
      component = await fixture(
        html`<fhi-time-input help-text="help text"></fhi-time-input>`,
      );

      const helpText = component.shadowRoot!.querySelector('.help-text');

      expect(helpText).to.not.equal(null);
      expect(helpText?.textContent).to.equal('help text');
    });
  });

  describe('events', () => {
    let input: HTMLInputElement;

    beforeEach(async () => {
      component = await fixture(
        html`<fhi-time-input name="time"></fhi-time-input>`,
      );
      input = component.shadowRoot!.querySelector('input') as HTMLInputElement;
    });

    it('dispatches an "input" event and updates its value when the user types', async () => {
      let inputEventCounter = 0;
      component.addEventListener('input', () => {
        inputEventCounter++;
      });

      input.value = '12:30';
      input.dispatchEvent(new Event('input'));

      await component.updateComplete;

      expect(inputEventCounter).to.equal(1);
      expect(component.value).to.equal('12:30');
    });

    it('dispatches a "change" event when the value is changed by the user', async () => {
      let changeEventCounter = 0;
      component.addEventListener('change', () => {
        changeEventCounter++;
      });

      input.value = '12:30';
      input.dispatchEvent(new Event('change'));

      await component.updateComplete;

      expect(changeEventCounter).to.equal(1);
    });
  });

  describe('keyboard navigation and interaction', () => {
    let input: HTMLInputElement;
    let icon: HTMLElement;

    beforeEach(async () => {
      component = await fixture(
        html`<fhi-time-input label="Tid"></fhi-time-input>`,
      );
      input = component.shadowRoot!.querySelector('input') as HTMLInputElement;
      icon = component.shadowRoot!.querySelector('.time-icon') as HTMLElement;
    });

    it('should have focusable input and icon elements, unless safari', () => {
      expect(input.tabIndex).to.not.equal(-1);
      expect(icon.tabIndex).to.equal(isSafari() ? -1 : 0);
    });

    it('should not have a focusable icon when component is readonly', async () => {
      component.readonly = true;
      await component.updateComplete;

      expect(getComputedStyle(icon).display).to.equal('none');
    });

    it('should not have a focusable icon when component is disabled', async () => {
      component.disabled = true;
      await component.updateComplete;

      expect(icon.tabIndex).to.equal(-1);
    });
  });
});
