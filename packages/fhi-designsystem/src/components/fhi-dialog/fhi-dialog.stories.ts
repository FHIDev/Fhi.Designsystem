import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiDialog } from './fhi-dialog.component';

new FhiDialog();

const meta: Meta<FhiDialog> = {
  title: 'Komponenter/Dialog',
  component: 'fhi-dialog',
  parameters: {},
  decorators: [],
  render: () => html`<fhi-dialog></fhi-dialog>`,
  argTypes: {},
};

type Story = StoryObj<FhiDialog>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
