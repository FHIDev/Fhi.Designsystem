import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiTag } from './fhi-tag.component';

describe('fhi-tag', () => {
  new FhiTag();

  let component: FhiTag;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(html`<fhi-tag></fhi-tag>`);
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });
  });

  describe('', () => {
    it('has an attribute to set color', async () => {
      component = await fixture(
        html`<fhi-tag color="neutral">I am a test button</fhi-tag>`,
      );

      expect(component.color).to.equal('neutral');
    });
  });
});
