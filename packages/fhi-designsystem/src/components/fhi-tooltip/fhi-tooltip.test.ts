import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { FhiTooltip } from './fhi-tooltip.component';

describe('fhi-tooltip', () => {
  new FhiTooltip();

  let component: FhiTooltip;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );
    });

    it('is not visible by default', async () => {
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      const isVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isVisible).to.equal(false);
    });

    it('is has an accessible child', async () => {
      const child = component.querySelector('#child');

      const isVisible = child?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isVisible).to.equal(true);
      await expect(child).to.be.accessible();
    });

    it('has role "tooltip"', async () => {
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      expect(tooltip?.getAttribute('role')).to.equal('tooltip');
    });

    it('labels the child with aria-describedby on the slot"', async () => {
      const tooltip = component.shadowRoot?.querySelector('slot');

      expect(tooltip?.getAttribute('aria-describedby')).to.equal('tooltip');
    });

    it('has aria-hidden set to "true" when hidden', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip" trigger="click">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      const tooltip = component.shadowRoot?.querySelector('#tooltip');
      const child = component.querySelector('#child') as HTMLElement;

      child?.click();
      await component.updateComplete;

      expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');
    });
  });

  describe('setting attributes', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );
    });

    it('has an attribute to set the message', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      expect(component.getAttribute('message')).to.equal('myTooltip');
      expect(component.message).to.equal('myTooltip');
    });

    it('has an attribute to set the trigger', async () => {
      component = await fixture(
        html`<fhi-tooltip trigger="click">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      expect(component.getAttribute('trigger')).to.equal('click');
      expect(component.trigger).to.equal('click');
    });

    it('has an attribute to set the placement', async () => {
      component = await fixture(
        html`<fhi-tooltip placement="bottom">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      expect(component.getAttribute('placement')).to.equal('bottom');
      expect(component.placement).to.equal('bottom');
    });

    it('has an attribute to set the delay', async () => {
      component = await fixture(
        html`<fhi-tooltip delay="200">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      expect(component.getAttribute('delay')).to.equal('200');
      expect(component.delay).to.equal('200');
    });

    it('has an attribute to set the maxWidth', async () => {
      component = await fixture(
        html`<fhi-tooltip max-width="100px">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      expect(component.getAttribute('max-width')).to.equal('100px');
      expect(component.maxWidth).to.equal('100px');
    });
  });

  describe('form association', () => {
    it('does not interfer with form association', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip"
          ><input name="myInput"
        /></fhi-tooltip>`,
        { parentNode: document.createElement('form') },
      );

      const form = new FormData(
        document.querySelector('form') as HTMLFormElement,
      );

      expect(form.get('myInput')).to.not.equal(null);
      expect(form.get('myInput')).to.not.equal(undefined);
    });
  });

  describe('interactions', () => {
    it('will open on child hover', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      const anchor = component.shadowRoot?.querySelector(
        '#tooltip-anchor',
      ) as HTMLElement;
      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      anchor.dispatchEvent(new Event('mouseenter'));

      // Wait for the tooltip open delay and animation.
      await new Promise(resolve => setTimeout(resolve, 600));

      const istooltipVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(istooltipVisible).to.equal(true);
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');
    });

    it('will close on child hover exit', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      const anchor = component.shadowRoot?.querySelector(
        '#tooltip-anchor',
      ) as HTMLElement;

      const tooltip = component.shadowRoot?.querySelector('#tooltip');

      anchor.dispatchEvent(new Event('mouseenter'));

      // Wait for the tooltip open delay and animation.
      await new Promise(resolve => setTimeout(resolve, 600));

      const istooltipVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(istooltipVisible).to.equal(true);

      anchor.dispatchEvent(new Event('mouseleave'));

      // Wait for the tooltip close animation.
      await new Promise(resolve => setTimeout(resolve, 150));

      const isTooltipHidden = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isTooltipHidden).to.equal(false);
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('true');
    });

    it('will open on child click', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip" trigger="click">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      const tooltip = component.shadowRoot?.querySelector('#tooltip');
      const child = component.querySelector('#child') as HTMLElement;

      child?.click();

      // Wait for the tooltip animation to finish
      await new Promise(resolve => setTimeout(resolve, 150));

      await component.updateComplete;

      const istooltipVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(istooltipVisible).to.equal(true);
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');
    });

    it('will close on click outside', async () => {
      component = await fixture(
        html`<fhi-tooltip message="myTooltip" trigger="click">
          <span id="child">My Element</span>
        </fhi-tooltip>`,
      );

      const tooltip = component.shadowRoot?.querySelector('#tooltip');
      const child = component.querySelector('#child') as HTMLElement;

      child?.click();

      // Wait for the tooltip animation to finish
      await new Promise(resolve => setTimeout(resolve, 150));

      await component.updateComplete;

      const istooltipVisible = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(istooltipVisible).to.equal(true);
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');

      document.body.click();

      // Wait for the tooltip close animation.
      await new Promise(resolve => setTimeout(resolve, 150));

      const isTooltipHidden = tooltip?.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
      });

      expect(isTooltipHidden).to.equal(false);
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('true');
    });
  });
});
