import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { FhiTable } from './fhi-table.component';
import { FhiTableCell } from '../fhi-table-cell/fhi-table-cell.component';
import { FhiCheckbox } from '../../fhi-checkbox/fhi-checkbox.component';
import { FhiButton } from '../../fhi-button/fhi-button.component';

import { FhiIconEye } from '../../icons/fhi-icon-eye.component';
import { FhiIconDownload } from '../../icons/fhi-icon-download.component';
import { FhiIconTrash } from '../../icons/fhi-icon-trash.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTable();
new FhiTableCell();
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
        'Definerer kolonnene i tabellen. Bruker CSS grid-template-columns i bakgrunnen. Bruke denne for å definere antall kolonner og deres bredder.',
      defaultValue: { summary: '1' },
    },
    rows: {
      control: 'text',
      description:
        'Definerer radene i tabellen. Bruker CSS grid-template-rows i bakgrunnen. Rader vil automatisk legges til om antall elementer er mer enn antall definerte kolonner. Bruk denne om du ønsker mer kontroll over radstørrelsene.',
      defaultValue: { summary: '1' },
    },
    caption: {
      control: 'text',
      description:
        'Valgfri tekst som beskriver innholdet. Dette fungerer som tabellen sin tittel og er visuelt plassert under tabellen',
      defaultValue: { summary: undefined },
    },
  },
};

type Story = StoryObj<FhiTable>;

export const Preview: Story = {
  tags: [],
  args: {
    columns: '3fr 1fr 1fr 1fr',
    caption: 'Total forekomst: Utvalgte diagnoser, antall',
  },
  render: args => html`
    <fhi-table columns="${args.columns}" caption="${ifDefined(args.caption)}">
      <fhi-table-cell variant="header"></fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        2021
      </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        2022
      </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        2023
      </fhi-table-cell>

      <fhi-table-cell> Pasienter totalt </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end"> 374 964 </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end"> 383 347 </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end"> 392 106 </fhi-table-cell>

      <fhi-table-cell>
        Sykdommer i sirkulasjonssystemet (I00-I99)
      </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end"> 279 726 </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end"> 289 149 </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end"> 291 655 </fhi-table-cell>
    </fhi-table>
  `,
};

export const MoreComplex: Story = {
  tags: [],
  args: {
    columns: '1fr 8fr 3fr 3fr 2fr 3fr',
    caption: 'Tabell med flere kolonner og mer innhold.',
  },
  render: args => html`
    <fhi-table columns="${args.columns}" caption="${ifDefined(args.caption)}">
      <fhi-table-cell variant="header"> Nr. </fhi-table-cell>
      <fhi-table-cell variant="header"> Tittel </fhi-table-cell>
      <fhi-table-cell variant="header"> Institusjon </fhi-table-cell>
      <fhi-table-cell variant="header"> Prosjektleder </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        Sluttdato
      </fhi-table-cell>
      <fhi-table-cell variant="header"> </fhi-table-cell>

      <fhi-table-cell> 3305 </fhi-table-cell>
      <fhi-table-cell>
        VKM - inntak av energidrikker hos 13-åringer
      </fhi-table-cell>
      <fhi-table-cell> Hesle Vest RHF </fhi-table-cell>
      <fhi-table-cell> Pelle Parafin </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        10.10.2027
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
      <fhi-table-cell variant="header"> Mal </fhi-table-cell>
      <fhi-table-cell variant="header"> Dimensjon </fhi-table-cell>
      <fhi-table-cell variant="header" style="--justify-content: end">
        Opprettet
      </fhi-table-cell>
      <fhi-table-cell variant="header"> Opprettet av </fhi-table-cell>
      <fhi-table-cell variant="header"> </fhi-table-cell>

      <fhi-table-cell>
        <fhi-checkbox></fhi-checkbox>
      </fhi-table-cell>
      <fhi-table-cell> Geografi 2023 - norsk </fhi-table-cell>
      <fhi-table-cell> GEO </fhi-table-cell>
      <fhi-table-cell style="--justify-content: end">
        10.10.2027
      </fhi-table-cell>
      <fhi-table-cell> Pelle Parafin </fhi-table-cell>
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
