import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { FhiTable } from './fhi-table.component';
import { FhiTableCell } from '../fhi-table-cell/fhi-table-cell.component';
import { FhiCheckbox } from '../../fhi-checkbox/fhi-checkbox.component';
import { FhiButton } from '../../fhi-button/fhi-button.component';
import { FhiBody } from '../../typography/fhi-body/fhi-body.component';
import { FhiLabel } from '../../typography/fhi-label/fhi-label.component';

import { FhiIconEye } from '../../icons/fhi-icon-eye.component';
import { FhiIconDownload } from '../../icons/fhi-icon-download.component';
import { FhiIconTrash } from '../../icons/fhi-icon-trash.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTable();
new FhiTableCell();
new FhiBody();
new FhiLabel();
new FhiCheckbox();
new FhiButton();
new FhiIconEye();
new FhiIconDownload();
new FhiIconTrash();

const meta: Meta<FhiTable> = {
  title: 'Komponenter/Table',
  component: 'fhi-table',
  parameters: {},
  decorators: [],
  argTypes: {
    columns: {
      control: 'text',
      description:
        'Definerer kolonnene i tabellen. Bruk CSS grid-syntaks, for eksempel "1fr 2fr 1fr" for tre kolonner med ulik bredde.',
      defaultValue: { summary: '1' },
    },
    caption: {
      control: 'text',
      description:
        'Valgfri tekst som beskriver innholdet. Dette fungerer som tabellen sin tittel og er visuelt plassert under tabellen',
      defaultValue: { summary: '1' },
    },
  },
};

type Story = StoryObj<FhiTable>;

export const Preview: Story = {
  tags: [],
  args: {},
  render: () => html`
    <fhi-table
      columns="3fr 1fr 1fr 1fr"
      caption="Total forekomst: Utvalgte diagnoser, antall"
    >
      <fhi-table-cell variant="header"></fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        <fhi-label>2021</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        <fhi-label>2022</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        <fhi-label>2023</fhi-label>
      </fhi-table-cell>

      <fhi-table-cell>
        <fhi-body>Pasienter totalt</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>374 964</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>383 347</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>392 106</fhi-body>
      </fhi-table-cell>

      <fhi-table-cell>
        <fhi-body>Sykdommer i sirkulasjonssystemet (I00-I99)</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>279 726</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>289 149</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>291 655</fhi-body>
      </fhi-table-cell>
    </fhi-table>
  `,
};

export const MoreComplex: Story = {
  tags: [],
  args: {},
  render: () => html`
    <fhi-table columns="1fr 8fr 3fr 3fr 2fr 3fr" caption="Litt mer data">
      <fhi-table-cell variant="header">
        <fhi-label>Nr. </fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header">
        <fhi-label>Tittel</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header">
        <fhi-label>Institusjon</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header">
        <fhi-label>Prosjektleder</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        <fhi-label>Sluttdato</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header"> </fhi-table-cell>

      <fhi-table-cell>
        <fhi-body>3305</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell>
        <fhi-body>VKM - inntak av energidrikker hos 13-åringer</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell>
        <fhi-body>Hesle Vest RHF</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell>
        <fhi-body>Pelle Parafin</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>10.10.2027</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <a href="#">Gå til prosjekt</a>
      </fhi-table-cell>
    </fhi-table>
  `,
};

export const WithCheckboxes: Story = {
  tags: [],
  args: {
    columns: '1fr 6fr 3fr 3fr 4fr 3fr',
    caption: 'Avkrysningsbokser.',
  },
  render: args => html`
    <fhi-table columns="${args.columns}" caption="${ifDefined(args.caption)}">
      <fhi-table-cell variant="header"></fhi-table-cell>
      <fhi-table-cell variant="header">
        <fhi-label>Mal</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header">
        <fhi-label>Dimensjon</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        <fhi-label>Opprettet</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header">
        <fhi-label>Opprettet av</fhi-label>
      </fhi-table-cell>
      <fhi-table-cell variant="header"> </fhi-table-cell>

      <fhi-table-cell>
        <fhi-checkbox></fhi-checkbox>
      </fhi-table-cell>
      <fhi-table-cell>
        <fhi-body>Geografi 2023 - norsk</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell>
        <fhi-body>GEO</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-body>10.10.2027</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell>
        <fhi-body>Pelle Parafin</fhi-body>
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        <fhi-button color="neutral" variant="text">
          <fhi-icon-download></fhi-icon-download>
          Eksportèr
        </fhi-button>
        <fhi-button color="neutral" variant="text">
          <fhi-icon-eye></fhi-icon-eye>
          Vis
        </fhi-button>
        <fhi-button color="neutral" variant="text">
          <fhi-icon-trash></fhi-icon-trash>
        </fhi-button>
      </fhi-table-cell>
    </fhi-table>
  `,
};

export default meta;
