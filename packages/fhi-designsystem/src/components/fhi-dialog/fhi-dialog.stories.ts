import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiDialog } from './fhi-dialog.component';
import { FhiBody } from '../fhi-body/fhi-body.component';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiButton } from '../fhi-button/fhi-button.component';

new FhiDialog();
new FhiBody();
new FhiButton();

const meta: Meta<FhiDialog> = {
  title: 'Komponenter/Dialog',
  component: 'fhi-dialog',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description:
        'Bestemmer om dialogen er åpen eller ikke. Dette er en property som er reflektert som en attribute og vil derfor også endre seg om brukeren åpner eller lukker dialogen selv.',
      defaultValue: { summary: false },
    },
    maxWidth: {
      name: 'max-width',
      control: { type: 'text' },
      description:
        'Setter dialogen sin maksimum bredde. Det kan være en predefinert størrelse, (`small` eller `medium`) eller en egendefinert størrelse i rem (e.g `30rem`).',
      defaultValue: { summary: 'medium' },
    },
    closeButtonLabel: {
      name: 'close-button-label',
      control: { type: 'text' },
      description:
        'Label for lukkeknappen. Om ikke gitt vil knappen bli icon-only.',
      defaultValue: { summary: 'undefined' },
    },
    hideCloseButton: {
      name: 'hide-close-button',
      control: { type: 'boolean' },
      description: 'Om `true`, vil lukkeknappen være skjult.',
      defaultValue: { summary: false },
    },
    heading: {
      control: { type: 'text' },
      description:
        'Tittelen på dialogen. Vises øverst, over resten av innholdet.',
      defaultValue: { summary: 'undefined' },
    },
  },
};

type Story = StoryObj<FhiDialog>;

/**
 * Wrapper component to handle dialog open/close in the Preview story.
 * This is used to remove event listeners and automatically close the dialog when the story is re-rendered or unmounted.
 */
class DialogPreviewWrapper extends HTMLElement {
  private _toggle: (() => void) | null = null;
  private _button: FhiButton | null = null;
  private _dialog: FhiDialog | null = null;

  connectedCallback() {
    this._button = this.querySelector('fhi-button');
    this._dialog = this.querySelector('fhi-dialog');

    if (!this._button || !this._dialog) {
      return;
    }

    this._toggle = () => {
      this._dialog!.open = !this._dialog?.open;
    };

    this._button?.addEventListener('click', this._toggle);

    if (this.hasAttribute('autoOpen')) {
      this._dialog.open = true;
    }
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
    if (this._button && this._toggle) {
      this._button.removeEventListener('click', this._toggle);
    }

    console.log('Closing dialog on disconnect', this._dialog);

    if (this._dialog) {
      this._dialog.open = false;
    }
  }
}
customElements.define('dialog-preview-wrapper', DialogPreviewWrapper);

export const Preview: Story = {
  tags: ['!dev'],
  decorators: [
    Story => html`
      <dialog-preview-wrapper>
        <fhi-button>Åpne dialog</fhi-button>
        ${Story()}
      </dialog-preview-wrapper>
    `,
  ],
  render: args => html`
    <fhi-dialog
      ?open=${ifDefined(args.open)}
      maxWidth=${args.maxWidth}
      closeButtonLabel=${args.closeButtonLabel}
      hideCloseButton=${args.hideCloseButton}
      heading=${args.heading}
    >
      <fhi-body slot="body">
        Er du sikker på at du vil slette Sandra Salamander?
      </fhi-body>
      <fhi-button slot="footer" variant="subtle">Avbryt</fhi-button>
      <fhi-button slot="footer" variant="subtle" color="danger"
        >Ja, Hasta la vista</fhi-button
      >
    </fhi-dialog>
  `,

  args: {
    heading: 'Bekreft sletting av bruker',
    open: false,
    hideCloseButton: false,
    maxWidth: 'medium',
  },
};

export const OpenDialog: Story = {
  decorators: [
    Story => html`
      <dialog-preview-wrapper autoOpen>
        <fhi-button>Åpne dialog</fhi-button>
        ${Story()}
      </dialog-preview-wrapper>
    `,
  ],
  render: args =>
    html` <fhi-dialog
      ?open=${args.open}
      maxWidth=${args.maxWidth}
      closeButtonLabel=${args.closeButtonLabel}
      hideCloseButton=${args.hideCloseButton}
      heading=${args.heading}
    >
      <fhi-body slot="body">
        Er du sikker på at du vil slette Sandra Salamander?
      </fhi-body>
      <fhi-button slot="footer" variant="subtle">Avbryt</fhi-button>
      <fhi-button slot="footer" variant="subtle" color="danger"
        >Ja, Hasta la vista</fhi-button
      >
    </fhi-dialog>`,
  args: {
    heading: 'Bekreft sletting av bruker',
    hideCloseButton: false,
    maxWidth: 'medium',
  },
};

export default meta;
