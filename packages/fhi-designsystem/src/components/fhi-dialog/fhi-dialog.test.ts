import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { FhiDialog } from './fhi-dialog.component';

describe('fhi-dialog', () => {
  new FhiDialog();

  let component: FhiDialog;

  describe('accessibility', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
        ></fhi-dialog>`,
      );
    });

    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it("should use a 'dialog' element", async () => {
      const dialog = component.shadowRoot?.querySelector('dialog');

      expect(dialog).to.not.equal(null);
    });

    it('should be closed by default', async () => {
      const dialog = component.shadowRoot?.querySelector('dialog');

      expect(component.open).to.equal(false);
      expect(dialog?.open).to.equal(false);
    });

    it("should open the 'dialog' element when opened", async () => {
      component.open = true;
      await component.updateComplete;
      const dialog = component.shadowRoot?.querySelector('dialog');

      expect(dialog?.open).to.equal(true);
    });

    it("should close the 'dialog' element when closed", async () => {
      component.open = false;
      await component.updateComplete;
      const dialog = component.shadowRoot?.querySelector('dialog');

      expect(dialog?.open).to.equal(false);
    });
  });

  describe('setting attributes', () => {
    it('has an attribute to set open', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      expect(component.getAttribute('open')).to.equal('');
      expect(component.open).to.equal(true);
    });

    it('has an attribute to set size', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          size="small"
        ></fhi-dialog>`,
      );

      expect(component.getAttribute('size')).to.equal('small');
      expect(component.size).to.equal('small');
    });

    it('has an attribute to set close-button-label', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close me"
        ></fhi-dialog>`,
      );

      expect(component.getAttribute('close-button-label')).to.equal('Close me');
      expect(component.closeButtonLabel).to.equal('Close me');
    });

    it('has an attribute to set heading', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
        ></fhi-dialog>`,
      );

      expect(component.getAttribute('heading')).to.equal('Dialog Heading');
      expect(component.heading).to.equal('Dialog Heading');
    });
  });

  describe('Error handling', () => {
    it('will throw a TypeError if the heading is not set', async () => {
      let shouldBeTypeError;
      try {
        component = await fixture(
          html`<fhi-dialog close-button-label="Close"></fhi-dialog>`,
        );
      } catch (error) {
        shouldBeTypeError = error;
      }

      expect(shouldBeTypeError).to.be.instanceOf(TypeError);
    });

    it('will throw a TypeError if the close-button-label is not set', async () => {
      let shouldBeTypeError;
      try {
        component = await fixture(
          html`<fhi-dialog heading="Dialog Heading"></fhi-dialog>`,
        );
      } catch (error) {
        shouldBeTypeError = error;
      }

      expect(shouldBeTypeError).to.be.instanceOf(TypeError);
    });
  });

  describe('interaction', () => {
    it('will close when the close button is clicked', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      const closeButton = component.shadowRoot?.querySelector(
        'fhi-button',
      ) as HTMLButtonElement;

      closeButton.click();
      await component.updateComplete;

      expect(component.open).to.equal(false);
    });

    it('will close when clicking on the backdrop', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      const dialog = component.shadowRoot?.querySelector(
        'dialog',
      ) as HTMLDialogElement;
      const rect = dialog.getBoundingClientRect();

      // Click outside the dialog content and on the backdrop.
      dialog.dispatchEvent(
        new MouseEvent('mouseup', {
          bubbles: true,
          clientX: rect.left + 1,
          clientY: rect.top + 1,
        }),
      );

      await component.updateComplete;

      expect(component.open).to.equal(false);
    });

    it('will close when pressing the Escape key', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
      });
      window.dispatchEvent(escapeEvent);
      await component.updateComplete;

      expect(component.open).to.equal(false);
    });

    it('will not close when pressing another key than Escape', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
      });
      window.dispatchEvent(enterEvent);
      await component.updateComplete;

      expect(component.open).to.equal(true);
    });
  });

  describe('events', () => {
    it('will dispatch a close event when closed', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      let closed = false;
      component.addEventListener('close', () => {
        closed = true;
      });

      component.close();
      await component.updateComplete;

      expect(closed).to.equal(true);
    });

    it('will dispatch a toggle event when closed', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
          open=""
        ></fhi-dialog>`,
      );

      let toggled = false;
      component.addEventListener('toggle', () => {
        toggled = true;
      });

      component.close();
      await component.updateComplete;

      expect(toggled).to.equal(true);
    });

    it('will dispatch a toggle event when opened', async () => {
      component = await fixture(
        html`<fhi-dialog
          heading="Dialog Heading"
          close-button-label="Close"
        ></fhi-dialog>`,
      );

      let toggled = false;
      component.addEventListener('toggle', () => {
        toggled = true;
      });

      component.open = true;
      await component.updateComplete;

      expect(toggled).to.equal(true);
    });
  });
});
