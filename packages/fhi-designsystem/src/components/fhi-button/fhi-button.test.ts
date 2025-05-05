import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiButton } from './fhi-button.component';

describe('fhi-button', () => {
  new FhiButton();

  let component: FhiButton;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-button>I am a test button</fhi-button>`,
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

    it('is accessible as the subtle variant', async () => {
      component.variant = 'subtle';
      await component.updateComplete;
      await expect(component).to.be.accessible();
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set type', async () => {
      component = await fixture(
        html`<fhi-button type="button">I am a test button</fhi-button>`,
      );

      expect(component.type).to.equal('button');
    });

    it('has an attribute to set color', async () => {
      component = await fixture(
        html`<fhi-button color="neutral">I am a test button</fhi-button>`,
      );

      expect(component.color).to.equal('neutral');
    });

    it('has an attribute to set disabled', async () => {
      component = await fixture(
        html`<fhi-button disabled>I am a test button</fhi-button>`,
      );

      expect(component.disabled).to.equal(true);
    });

    it('has an attribute to set variant', async () => {
      component = await fixture(
        html`<fhi-button variant="subtle">I am a test button</fhi-button>`,
      );

      expect(component.variant).to.equal('subtle');
    });

    it('has an attribute to set size', async () => {
      component = await fixture(
        html`<fhi-button size="small">I am a test button</fhi-button>`,
      );

      expect(component.size).to.equal('small');
    });
  });

  describe('property-attribute reflection', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-button>I am a test button</fhi-button>`,
      );
    });

    it('should reflect the disabled property to the attribute', async () => {
      component.disabled = true;
      await component.updateComplete;

      expect(component.hasAttribute('disabled')).to.equal(true);
    });

    it('should reflect the variant property to the attribute', async () => {
      component.variant = 'subtle';
      await component.updateComplete;

      expect(component.getAttribute('variant')).to.equal('subtle');
    });

    it('should reflect the size property to the attribute', async () => {
      component.size = 'small';
      await component.updateComplete;

      expect(component.getAttribute('size')).to.equal('small');
    });

    it('should reflect the color property to the attribute', async () => {
      component.color = 'neutral';
      await component.updateComplete;

      expect(component.getAttribute('color')).to.equal('neutral');
    });
  });

  describe('event interactions', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-button>I am a test button</fhi-button>`,
      );
    });

    it('should emit click event when clicked', async () => {
      let clicked = false;

      component.addEventListener('click', () => {
        clicked = true;
      });

      component.click();

      await expect(clicked).to.equal(true);
    });

    it('should not emit click event when disabled', async () => {
      let clicked = false;

      component.addEventListener('click', () => {
        clicked = true;
      });

      component.disabled = true;
      await component.updateComplete;

      component.click();

      await expect(clicked).to.equal(false);
    });

    it('should emit click event when the enter key is pressed', async () => {
      let clicked = false;

      component.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.dispatchEvent(event);

      await component.updateComplete;

      await expect(clicked).to.equal(true);
    });

    it('should emit click event when the space key is pressed and released', async () => {
      let clicked = false;

      component.addEventListener('click', () => {
        clicked = true;
      });

      component.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));

      await component.updateComplete;

      expect(clicked).to.equal(true);
    });
  });

  describe('form interactions', () => {
    it('should submit from its associated form when clicked', async () => {
      let submitted = false;

      const form = document.createElement('form');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitted = true;
      });

      component = await fixture(html`<fhi-button>Click</fhi-button>`, {
        parentNode: form,
      });

      component.click();

      expect(submitted).to.equal(true);
    });

    it('should not submit from its associated form when disabled', async () => {
      let submitted = false;

      const form = document.createElement('form');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitted = true;
      });

      component = await fixture(html`<fhi-button disabled>Click</fhi-button>`, {
        parentNode: form,
      });

      component.click();

      expect(submitted).to.equal(false);
    });

    it('should not submit from its associated form when type is not submit', async () => {
      let submitted = false;

      const form = document.createElement('form');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitted = true;
      });

      component = await fixture(
        html`<fhi-button type="button">Click</fhi-button>`,
        { parentNode: form },
      );

      component.click();

      expect(submitted).to.equal(false);
    });

    it('should reset its associated form when type is reset', async () => {
      let reset = false;

      const form = document.createElement('form');
      form.addEventListener('reset', function (event) {
        event.preventDefault();
        reset = true;
      });

      component = await fixture(
        html`<fhi-button type="reset">Click</fhi-button>`,
        { parentNode: form },
      );

      component.click();

      expect(reset).to.equal(true);
    });

    it('should not reset its associated form when disabled', async () => {
      let reset = false;

      const form = document.createElement('form');
      form.addEventListener('reset', function (event) {
        event.preventDefault();
        reset = true;
      });

      component = await fixture(
        html`<fhi-button type="reset" disabled>Click</fhi-button>`,
        { parentNode: form },
      );

      component.click();

      expect(reset).to.equal(false);
    });
  });

  describe('child elements', () => {
    it('should display child', async () => {
      component = await fixture(
        html`<fhi-button><span>Look at my child</span></fhi-button>`,
      );

      await component.updateComplete;

      const child = component.querySelector('span');

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(child).to.exist;
      expect(child).to.be.accessible();
      expect(child!.textContent).to.equal('Look at my child');
    });
  });
});
