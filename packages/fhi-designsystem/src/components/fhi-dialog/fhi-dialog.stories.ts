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
        'Decides whether the dialog is open or closed. This property is reflected as an attribute and will therefor also change if the user opens or closes the dialog.',
      defaultValue: { summary: false },
    },
    maxWidth: {
      name: 'max-width',
      control: { type: 'text' },
      description:
        'Sets the maximum width of the dialog. Can be a predefined size (`small`, `medium`, `large`) or a custom size in rem units (e.g., `30rem`).',
      defaultValue: { summary: 'medium' },
    },
    closeButtonLabel: {
      name: 'close-button-label',
      control: { type: 'text' },
      description:
        'Label for the close button. If not provided, the button will be icon-only.',
      defaultValue: { summary: 'undefined' },
    },
    hideCloseButton: {
      name: 'hide-close-button',
      control: { type: 'boolean' },
      description: 'If true, the close button will be hidden.',
      defaultValue: { summary: false },
    },
    heading: {
      control: { type: 'text' },
      description:
        'The heading text of the dialog. This is displayed at the top of the dialog.',
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
        <fhi-body
          >Toggle the <code>"open"</code> attribute in the control panel to
          open/close the dialog</fhi-body
        >
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
  tags: [],
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
