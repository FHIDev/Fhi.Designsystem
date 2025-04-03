import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiButton } from './fhi-button';

describe('fhi-button', () => {
  new FhiButton();

  let component: FhiButton;

  beforeEach(async () => {
    component = await fixture(
      html`<fhi-button>I am a test button</fhi-button>`,
    );
  });

  describe('Accessibility', () => {
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

  describe('User interaction', () => {
    it('should emit click event when clicked', async () => {
      let clicked = false;

      component = await fixture(html`<fhi-button>Click me</fhi-button>`);

      component.addEventListener('click', () => {
        clicked = true;
      });

      component.click();

      await expect(clicked).to.equal(true);
    });

    it('clicks the button when the enter key is pressed', async () => {
      let clicked = false;
      component = await fixture(html`<fhi-button>Click me</fhi-button>`);

      component.addEventListener('click', () => {
        clicked = true;
      });

      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.dispatchEvent(event);

      await component.updateComplete;

      await expect(clicked).to.equal(true);
    });

    it('clicks the button when the space key is pressed and released', async () => {
      let count = 0;

      const onClick = (): void => {
        count++;
      };

      component = await fixture(html`
        <fhi-button @click=${onClick}>I am a button link</fhi-button>
      `);

      component.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));

      await component.updateComplete;

      expect(count).to.equal(1);
    });
  });

  describe('API', () => {
    it('should display child', async () => {
      component = await fixture(
        html`<fhi-button>Look at my child</fhi-button>`,
      );

      expect(component.textContent).to.equal(component.firstChild?.textContent);
    });
  });
});
