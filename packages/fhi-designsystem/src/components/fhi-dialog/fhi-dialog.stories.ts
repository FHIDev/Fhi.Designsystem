import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiDialog } from './fhi-dialog.component';
import { FhiBody } from '../fhi-body/fhi-body.component';

new FhiDialog();
new FhiBody();

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
        'Setter dialogen sin maksimum bredde. Det kan være en predefinert størrelse, (`small`, `medium`, `large`) eller en egendefinert størrelse i rem (e.g `30rem`).',
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

export const Preview: Story = {
  tags: ['!dev'],
  decorators: [
    Story => html`
      <div>
        <fhi-body>
          Samhandle med "open" attributen under i kontrolpanelet for å
          åpne/lukke dialogen.
        </fhi-body>
        ${Story()}
      </div>
    `,
  ],
  render: args =>
    html` <fhi-dialog
      .open=${args.open}
      .maxWidth=${args.maxWidth}
      .closeButtonLabel=${args.closeButtonLabel}
      .hideCloseButton=${args.hideCloseButton}
      .heading=${args.heading}
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
    open: false,
    hideCloseButton: false,
    maxWidth: 'medium',
  },
};

export const OpenDialog: Story = {
  render: args =>
    html` <fhi-dialog
      .open=${args.open}
      .maxWidth=${args.maxWidth}
      .closeButtonLabel=${args.closeButtonLabel}
      .hideCloseButton=${args.hideCloseButton}
      .heading=${args.heading}
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
    open: true,
    hideCloseButton: false,
    maxWidth: 'medium',
  },
};

export default meta;
