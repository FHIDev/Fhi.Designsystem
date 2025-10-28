import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiDateInput } from './fhi-date-input.component';

describe('fhi-date-input', () => {
  new FhiDateInput();

  let component: FhiDateInput;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`
        <fhi-date-input
          label="Dato"
          name="date"
          message="Message"
        ></fhi-date-input>
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
        <fhi-date-input
          label="Dato"
          name="date"
          message="Message"
          disabled
        ></fhi-date-input>
      `);
      await expect(component).to.be.accessible();
    });

    it('is accessible when readonly', async () => {
      component = await fixture(html`
        <fhi-date-input
          label="Dato"
          name="date"
          message="Message"
          readonly
        ></fhi-date-input>
      `);
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set value', async () => {
      component = await fixture(
        html`<fhi-date-input value="2025-09-26"></fhi-date-input>`,
      );

      expect(component.getAttribute('value')).to.equal('2025-09-26');
      expect(component.value).to.equal('2025-09-26');
    });

    it('has an attribute to set min', async () => {
      component = await fixture(
        html`<fhi-date-input min="2025-09-26"></fhi-date-input>`,
      );

      expect(component.getAttribute('min')).to.equal('2025-09-26');
      expect(component.min).to.equal('2025-09-26');
    });

    it('has an attribute to set max', async () => {
      component = await fixture(
        html`<fhi-date-input max="2025-09-26"></fhi-date-input>`,
      );

      expect(component.getAttribute('max')).to.equal('2025-09-26');
      expect(component.max).to.equal('2025-09-26');
    });

    it('has an attribute to set name', async () => {
      component = await fixture(
        html`<fhi-date-input name="Date"></fhi-date-input>`,
      );

      expect(component.getAttribute('name')).to.equal('Date');
      expect(component.name).to.equal('Date');
    });

    it('has an attribute to set label', async () => {
      component = await fixture(
        html`<fhi-date-input label="label text"></fhi-date-input>`,
      );

      expect(component.getAttribute('label')).to.equal('label text');
      expect(component.label).to.equal('label text');
    });

    it('has an attribute to set message', async () => {
      component = await fixture(
        html`<fhi-date-input message="message text"></fhi-date-input>`,
      );

      expect(component.getAttribute('message')).to.equal('message text');
      expect(component.message).to.equal('message text');
    });

    it('has an attribute to set status', async () => {
      component = await fixture(
        html`<fhi-date-input status="error"></fhi-date-input>`,
      );

      expect(component.getAttribute('status')).to.equal('error');
      expect(component.status).to.equal('error');
    });

    it('has an attribute to set the readonly', async () => {
      component = await fixture(
        html`<fhi-date-input readonly></fhi-date-input>`,
      );

      expect(component.hasAttribute('readonly')).to.equal(true);
      expect(component.readonly).to.equal(true);
    });

    it('has an attribute to set disabled', async () => {
      component = await fixture(
        html`<fhi-date-input disabled></fhi-date-input>`,
      );

      expect(component.hasAttribute('disabled')).to.equal(true);
      expect(component.disabled).to.equal(true);
    });
  });

  describe('property-attribute reflection', () => {
    it('reflects the "name" property with the "name" attribute', async () => {
      component = await fixture(
        html`<fhi-date-input name="hello"></fhi-date-input> `,
      );

      expect(component.name).to.equal('hello');
      expect(component.getAttribute('name')).to.equal('hello');

      component.name = 'world';
      await component.updateComplete;

      expect(component.name).to.equal('world');
      expect(component.getAttribute('name')).to.equal('world');
    });
  });

  describe('form asociation', () => {
    it("associates to it's parent form", async () => {
      component = await fixture(
        html`<fhi-date-input name="date"></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('date')).to.not.equal(null);
      expect(form.get('date')).to.not.equal(undefined);
    });

    it("updates it's associated form when it's value changes", async () => {
      component = await fixture(
        html`<fhi-date-input name="date" value="2025-09-26"></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('date')).to.equal('2025-09-26');

      component.value = '2025-09-27';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('date')).to.equal('2025-09-27');
    });

    it("updates it's associated form when it's name changes", async () => {
      component = await fixture(
        html`<fhi-date-input name="date" value="2025-09-26"></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('date')).to.equal('2025-09-26');

      component.name = 'new-date';
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('date')).to.equal(null);
      expect(form.get('new-date')).to.equal('2025-09-26');
    });

    it("updates it's value when there is a value change from the associated form", async () => {
      component = await fixture(
        html`<fhi-date-input name="date" value="2025-09-26"></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.date.value = '2025-09-27';

      expect(component.value).to.equal('2025-09-27');
    });

    it("updates it's value when there is a value change from the associated form and the input is readonly", async () => {
      component = await fixture(
        html`<fhi-date-input
          name="date"
          value="2025-09-26"
          readonly
        ></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.date.value = '2025-09-27';

      expect(component.value).to.equal('2025-09-27');
    });

    it("updates it's value when there is a value change from the associated form and the input is disabled", async () => {
      component = await fixture(
        html`<fhi-date-input
          name="date"
          value="2025-09-26"
          disabled
        ></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = document.querySelector('form') as HTMLFormElement;

      form.date.value = '2025-09-27';

      expect(component.value).to.equal('2025-09-27');
    });

    it('is not included in the associated forms formData when disabled', async () => {
      component = await fixture(
        html`<fhi-date-input
          name="date"
          value="2025-09-26"
          disabled
        ></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('date')).to.equal(null);
    });

    it('is included in the associated forms formData when previously disabled, but now enabled', async () => {
      component = await fixture(
        html`<fhi-date-input
          name="date"
          value="2025-09-26"
          disabled
        ></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      let form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('date')).to.equal(null);

      component.disabled = false;
      await component.updateComplete;

      form = new FormData(document.querySelector('form') as HTMLFormElement);

      expect(form.get('date')).to.equal('2025-09-26');
    });

    it('implicitly submits the form when the Enter key is pressed', async () => {
      let count = 0;

      const form = document.createElement('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        count++;
      });

      component = await fixture(
        html`<fhi-date-input name="date" value="2025-09-26"></fhi-date-input>`,
        { parentNode: form },
      );

      component._input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' }),
      );

      expect(count).to.equal(1);
    });

    it("resets it's value when the associated form is reset", async () => {
      component = await fixture(
        html`<fhi-date-input name="date" value="2025-09-26"></fhi-date-input>`,
        { parentNode: document.createElement('form') },
      );

      component.value = '2025-09-27';
      await component.updateComplete;

      expect(component.value).to.equal('2025-09-27');

      const form = document.querySelector('form') as HTMLFormElement;

      form.reset();
      await component.updateComplete;

      expect(component.value).to.equal('2025-09-26');
    });
  });

  describe('label and message', () => {
    it('displays a label', async () => {
      component = await fixture(
        html`<fhi-date-input label="label text"></fhi-date-input>`,
      );

      const label = component.shadowRoot!.querySelector('label');

      expect(label).to.not.equal(null);
      expect(label?.textContent).to.equal('label text');
    });

    it('displays a message', async () => {
      component = await fixture(
        html`<fhi-date-input message="message text"></fhi-date-input>`,
      );

      const message = component.shadowRoot!.querySelector('.message');

      expect(message).to.not.equal(null);
      expect(message?.textContent).to.equal('message text');
    });
  });

  describe('keyboard navigation and interaction', () => {
    let input: HTMLInputElement;
    let icon: HTMLElement;

    beforeEach(async () => {
      component = await fixture(
        html`<fhi-date-input label="Dato"></fhi-date-input>`,
      );
      input = component.shadowRoot!.querySelector('input') as HTMLInputElement;
      icon = component.shadowRoot!.querySelector('.date-icon') as HTMLElement;
    });

    it('should have focusable input and icon elements, unless safari', () => {
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent,
      );

      expect(input.tabIndex).to.not.equal(-1);
      expect(icon.tabIndex).to.equal(isSafari ? -1 : 0);
    });

    it('should not have a focusable icon when component is readonly', async () => {
      component.readonly = true;
      await component.updateComplete;

      expect(getComputedStyle(icon).display).to.equal('none');
    });

    it('should not have a focusable icon when component is disabled', async () => {
      component.disabled = true;
      await component.updateComplete;
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent,
      );

      expect(icon.tabIndex).to.equal(isSafari ? -1 : 0);
    });
  });
});
