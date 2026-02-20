import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiModalDialog } from './fhi-modal-dialog.component';
import { FhiBody } from '../fhi-body/fhi-body.component';
import { FhiButton } from '../fhi-button/fhi-button.component';
import { FhiTextInput } from '../fhi-text-input/fhi-text-input.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';

new FhiModalDialog();
new FhiBody();
new FhiButton();
new FhiTextInput();

const meta: FhiStorybookMeta<FhiModalDialog> = {
  title: 'Komponenter/Modal Dialog',
  component: 'fhi-modal-dialog',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
    eventTypes: [
      {
        name: 'toggle',
        description: 'Utløses når dialogen åpnes eller lukkes.',
        valueLocation: ['event.newState', 'event.oldState'],
      },
      {
        name: 'close',
        description: 'Utløses når dialogen lukkes.',
      },
    ],
    methodTypes: [
      {
        name: 'show()',
        description: 'Viser dialogen.',
      },
      {
        name: 'close()',
        description: 'Lukker dialogen.',
      },
    ],
    slotTypes: [
      {
        name: 'body',
        description:
          'Hovedinnholdet i dialogen. Inneholder vanligvis tekst eller form-elementer.',
      },
      {
        name: 'footer',
        description:
          'Innholdet i dialogens footer, vanligvis handlingsknapper.',
      },
    ],
  },
  decorators: [],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description:
        'Bestemmer om dialogen er åpen eller ikke. Dette er en property som er reflektert som en attribute og vil derfor også endre seg om brukeren åpner eller lukker dialogen selv.',
      defaultValue: { summary: false },
    },
    size: {
      options: ['medium', 'small'],
      control: { type: 'select' },
      description:
        'Setter dialogen sin maksimum bredde. Det kan være de predefinerte størrelsene `small` eller `medium`).',
      defaultValue: { summary: 'medium' },
    },
    closeButtonLabel: {
      name: 'close-button-label',
      control: { type: 'text' },
      description: '**Påkrevd**. Label for lukkeknappen.',
      defaultValue: { summary: 'undefined' },
    },
    heading: {
      control: { type: 'text' },
      description:
        '**Påkrevd**. Tittelen på dialogen. Vises øverst, over resten av innholdet.',
      defaultValue: { summary: 'undefined' },
    },
  },
};

type Story = StoryObj<FhiModalDialog>;

/**
 * Wrapper component to handle dialog open/close in the Preview story.
 * This is used to remove event listeners and automatically close the dialog when the story is re-rendered or unmounted.
 */
class ModalDialogPreviewWrapper extends HTMLElement {
  private _toggle: (() => void) | null = null;
  private _button: FhiButton | null = null;
  private _dialog: FhiModalDialog | null = null;

  connectedCallback() {
    this._button = this.querySelector('fhi-button');
    this._dialog = this.querySelector('fhi-modal-dialog');

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
    if (this._button && this._toggle) {
      this._button.removeEventListener('click', this._toggle);
    }

    if (this._dialog) {
      this._dialog.open = false;
    }
  }
}
customElements.define(
  'modal-dialog-preview-wrapper',
  ModalDialogPreviewWrapper,
);

export const Preview: Story = {
  tags: ['!dev'],
  decorators: [
    Story => html`
      <modal-dialog-preview-wrapper>
        <fhi-button>
          <span>Åpne dialogen</span>
        </fhi-button>
        ${Story()}
      </modal-dialog-preview-wrapper>
    `,
  ],
  render: args =>
    html` <fhi-modal-dialog
      ?open=${args.open}
      size=${args.size}
      close-button-label=${args.closeButtonLabel}
      heading=${args.heading}
    >
      <fhi-text-input slot="body" label="Navn på tabell"></fhi-text-input>
      <fhi-button slot="footer" variant="text">Avbryt</fhi-button>
      <fhi-button slot="footer">Opprett tabell</fhi-button>
    </fhi-modal-dialog>`,

  args: {
    open: false,
    heading: 'Ny tabell',
    closeButtonLabel: 'Lukk',
    size: 'medium',
  },
};

export default meta;
