import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { FhiDataTable } from './fhi-data-table.component';
import { FhiDataTableCell } from '../fhi-data-table-cell/fhi-data-table-cell.component';
import { FhiDataTableRow } from '../fhi-data-table-row/fhi-data-table-row.component';

import { FhiCheckbox } from '../../fhi-checkbox/fhi-checkbox.component';
import { FhiButton } from '../../fhi-button/fhi-button.component';

import { FhiDisplay } from '../../typography/fhi-display/fhi-display.component';
import { FhiTitle } from '../../typography/fhi-title/fhi-title.component';
import { FhiBody } from '../../typography/fhi-body/fhi-body.component';

import { FhiIconEye } from '../../icons/fhi-icon-eye.component';
import { FhiIconDownload } from '../../icons/fhi-icon-download.component';
import { FhiIconTrash } from '../../icons/fhi-icon-trash.component';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiDataTable();
new FhiDataTableCell();
new FhiDataTableRow();
new FhiCheckbox();
new FhiButton();
new FhiIconEye();
new FhiIconDownload();
new FhiIconTrash();

new FhiDisplay();
new FhiTitle();
new FhiBody();

const meta: FhiStorybookMeta<FhiDataTable> = {
  title: 'Komponenter/Data Table',
  component: 'fhi-data-table',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description:
          'Alle rader i tabellen. Bruk <fhi-data-table-row> for å definere rader, og <fhi-data-table-cell> for å definere celler i radene.',
      },
    ],
  },
  decorators: [],
  argTypes: {
    caption: {
      control: 'text',
      description:
        'Valgfri tekst som beskriver innholdet. Dette fungerer som tabellen sin tittel og er visuelt plassert under tabellen',
      defaultValue: { summary: undefined },
    },
    striped: {
      control: 'boolean',
      description: 'Om tabellen skal ha vekslende radfarger (stripete effekt).',
      defaultValue: { summary: false },
    },
  },
};

type Story = StoryObj<FhiDataTable>;

export const Preview: Story = {
  tags: [],
  args: {
    caption: 'Total forekomst: Utvalgte diagnoser, antall',
    striped: false,
  },
  render: args => html`
    <fhi-data-table
      caption="${ifDefined(args.caption)}"
      ?striped="${args.striped}"
    >
      <fhi-data-table-row variant="header">
        <fhi-data-table-cell></fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          2021
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          2022
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          2023
        </fhi-data-table-cell>
      </fhi-data-table-row>

      <fhi-data-table-row>
        <fhi-data-table-cell> Pasienter totalt </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          374 964
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          383 347
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          392 106
        </fhi-data-table-cell>
      </fhi-data-table-row>

      <fhi-data-table-row>
        <fhi-data-table-cell>
          Sykdommer i sirkulasjonssystemet (I00-I99)
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          279 726
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          289 149
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          291 655
        </fhi-data-table-cell>
      </fhi-data-table-row>
    </fhi-data-table>
  `,
};

export const ComplexData: Story = {
  tags: ['!dev'],
  args: {
    striped: true,
  },
  render: args => html`
    <fhi-title size="large" level="2">
      P0a: Fødte per måned og mors bosted (med og uten fødselsmelding i MFR)
    </fhi-title>
    <br />
    <fhi-body>
      Foreløpige tall kan endres ved senere oppdateringer. Tabellen inkluderer
      fødte med fødselsmelding i MFR, som har fødselsvekt ≥ 500 gram og/eller
      svangerskapet har vart ≥ 22 uker. Tabellen viser i tillegg fødte uten
      fødselsmelding i MFR basert på informasjon fra Folkeregisteret¹.
    </fhi-body>
    <br />

    <fhi-data-table
      caption="${ifDefined(args.caption)}"
      ?striped="${args.striped}"
    >
      <fhi-data-table-row variant="header">
        <fhi-data-table-cell> Oslo </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          Januar
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          Februar
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          Mars
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          April
        </fhi-data-table-cell>
      </fhi-data-table-row>

      <fhi-data-table-row>
        <fhi-data-table-cell> Alle fødte </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          685
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
      </fhi-data-table-row>

      <fhi-data-table-row>
        <fhi-data-table-cell> Med fødselsmelding </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          662
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
      </fhi-data-table-row>

      <fhi-data-table-row>
        <fhi-data-table-cell> Uten fødselsmelding </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          23
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
          -
        </fhi-data-table-cell>
      </fhi-data-table-row>
    </fhi-data-table>
  `,
};

export const WithCheckboxes: Story = {
  tags: ['!dev'],
  args: {
    caption: 'Avkrysningsbokser.',
    striped: false,
  },
  render: args => html`
    <fhi-data-table
      caption="${ifDefined(args.caption)}"
      ?striped="${args.striped}"
    >
      <fhi-data-table-row variant="header">
        <fhi-data-table-cell></fhi-data-table-cell>
        <fhi-data-table-cell> Mal </fhi-data-table-cell>
        <fhi-data-table-cell> Dimensjon </fhi-data-table-cell>
        <fhi-data-table-cell> Opprettet </fhi-data-table-cell>
        <fhi-data-table-cell> Opprettet av </fhi-data-table-cell>
        <fhi-data-table-cell> </fhi-data-table-cell>
      </fhi-data-table-row>

      <fhi-data-table-row>
        <fhi-data-table-cell>
          <fhi-checkbox></fhi-checkbox>
        </fhi-data-table-cell>
        <fhi-data-table-cell> Geografi 2020 </fhi-data-table-cell>
        <fhi-data-table-cell> ATC_Verdi </fhi-data-table-cell>
        <fhi-data-table-cell> 10.10.2027 </fhi-data-table-cell>
        <fhi-data-table-cell> Pelle Parafin </fhi-data-table-cell>
        <fhi-data-table-cell style="--fhi-data-table-cell-justify-content: end">
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
        </fhi-data-table-cell>
      </fhi-data-table-row>
    </fhi-data-table>
  `,
};

export default meta;
