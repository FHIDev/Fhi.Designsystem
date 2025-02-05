import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiButton } from './fhi-button';

describe('fhi-button', () => {
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
    it('should not call onClick when disabled', async () => {
      let count = 0;
      const onClick = (): void => {
        count++;
      };

      component = await fixture(html`
        <fhi-button disabled @click=${onClick}>Not clickable</fhi-button>
      `);

      expect(count).to.equal(0);
    });

    it('should handle onClick event', async () => {
      let count = 0;
      const onClick = (): void => {
        count++;
      };

      component = await fixture(html`
        <fhi-button @click=${onClick}>Click me</fhi-button>
      `);

      component.click();
      await expect(count).to.equal(1);
    });
  });
});
