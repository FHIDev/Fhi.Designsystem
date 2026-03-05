import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { FhiTable } from './fhi-table.component';
import { FhiTableCell } from '../fhi-table-cell/fhi-table-cell.component';
import { FhiTableRow } from '../fhi-table-row/fhi-table-row.component';

import { FhiCheckbox } from '../../fhi-checkbox/fhi-checkbox.component';
import { FhiButton } from '../../fhi-button/fhi-button.component';

import { FhiDisplay } from '../../typography/fhi-display/fhi-display.component';
import { FhiTitle } from '../../typography/fhi-title/fhi-title.component';
import { FhiBody } from '../../typography/fhi-body/fhi-body.component';

import { FhiIconEye } from '../../icons/fhi-icon-eye.component';
import { FhiIconDownload } from '../../icons/fhi-icon-download.component';
import { FhiIconTrash } from '../../icons/fhi-icon-trash.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTable();
new FhiTableCell();
new FhiTableRow();
new FhiCheckbox();
new FhiButton();
new FhiIconEye();
new FhiIconDownload();
new FhiIconTrash();

new FhiDisplay();
new FhiTitle();
new FhiBody();

const meta: Meta<FhiTable> = {
  title: 'Komponenter/Table',
  component: 'fhi-table',
  parameters: {},
  decorators: [],
  argTypes: {
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
    caption: 'Total forekomst: Utvalgte diagnoser, antall',
  },
  render: args => html`
    <fhi-table caption="${ifDefined(args.caption)}">
      <fhi-table-row variant="header" columns="3fr 1fr 1fr 1fr">
        <fhi-table-cell></fhi-table-cell>
        <fhi-table-cell variant="header"> 2021 </fhi-table-cell>
        <fhi-table-cell variant="header"> 2022 </fhi-table-cell>
        <fhi-table-cell variant="header"> 2023 </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="3fr 1fr 1fr 1fr">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Pasienter totalt
        </fhi-table-cell>
        <fhi-table-cell> 374 964 </fhi-table-cell>
        <fhi-table-cell> 383 347 </fhi-table-cell>
        <fhi-table-cell> 392 106 </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="3fr 1fr 1fr 1fr">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Sykdommer i sirkulasjonssystemet (I00-I99)
        </fhi-table-cell>
        <fhi-table-cell> 279 726 </fhi-table-cell>
        <fhi-table-cell> 289 149 </fhi-table-cell>
        <fhi-table-cell> 291 655 </fhi-table-cell>
      </fhi-table-row>
    </fhi-table>
  `,
};

export const ComplexData: Story = {
  tags: [],
  args: {},
  render: args => html`
    <style>
      .dense_table fhi-table-cell {
        --fhi-table-cell-padding: 0.25rem;
      }
    </style>

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

    <fhi-table class="dense_table" caption="${ifDefined(args.caption)}">
      <fhi-table-row variant="header" columns="2fr repeat(4, 1fr)">
        <fhi-table-cell
          variant="header"
          style="--fhi-table-cell-justify-content: start"
          >Oslo
        </fhi-table-cell>
        <fhi-table-cell variant="header"> Januar </fhi-table-cell>
        <fhi-table-cell variant="header"> Februar </fhi-table-cell>
        <fhi-table-cell variant="header"> Mars </fhi-table-cell>
        <fhi-table-cell variant="header"> April </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="2fr repeat(4, 1fr)">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Alle fødte
        </fhi-table-cell>
        <fhi-table-cell> 685 </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row
        columns="2fr repeat(4, 1fr)"
        style="--fhi-table-row-background: var(--fhi-color-neutral-background-subtle);"
      >
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Med fødselsmelding
        </fhi-table-cell>
        <fhi-table-cell> 662 </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="2fr repeat(4, 1fr)">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Uten fødselsmelding
        </fhi-table-cell>
        <fhi-table-cell> 23 </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
      </fhi-table-row>
    </fhi-table>

    <br />

    <fhi-table class="dense_table" caption="${ifDefined(args.caption)}">
      <fhi-table-row variant="header" columns="2fr repeat(4, 1fr)">
        <fhi-table-cell
          variant="header"
          style="--fhi-table-cell-justify-content: start"
          >Østfold
        </fhi-table-cell>
        <fhi-table-cell></fhi-table-cell>
        <fhi-table-cell></fhi-table-cell>
        <fhi-table-cell></fhi-table-cell>
        <fhi-table-cell></fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="2fr repeat(4, 1fr)">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Alle fødte
        </fhi-table-cell>
        <fhi-table-cell> 230 </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row
        columns="2fr repeat(4, 1fr)"
        style="--fhi-table-row-background: var(--fhi-color-neutral-background-subtle);"
      >
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Med fødselsmelding
        </fhi-table-cell>
        <fhi-table-cell> 229 </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="2fr repeat(4, 1fr)">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Uten fødselsmelding
        </fhi-table-cell>
        <fhi-table-cell> 1 </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
        <fhi-table-cell> - </fhi-table-cell>
      </fhi-table-row>
    </fhi-table>
  `,
};

export const WithCheckboxes: Story = {
  tags: [],
  args: {
    caption: 'Avkrysningsbokser.',
  },
  render: args => html`
    <fhi-table caption="${ifDefined(args.caption)}">
      <fhi-table-row variant="header" columns="2.5rem 4fr 4fr 2fr 2fr 6fr">
        <fhi-table-cell></fhi-table-cell>
        <fhi-table-cell
          variant="header"
          style="--fhi-table-cell-justify-content: start"
        >
          Mal
        </fhi-table-cell>
        <fhi-table-cell
          variant="header"
          style="--fhi-table-cell-justify-content: start"
        >
          Dimensjon
        </fhi-table-cell>
        <fhi-table-cell variant="header"> Opprettet </fhi-table-cell>
        <fhi-table-cell
          variant="header"
          style="--fhi-table-cell-justify-content: start"
        >
          Opprettet av
        </fhi-table-cell>
        <fhi-table-cell> </fhi-table-cell>
      </fhi-table-row>

      <fhi-table-row columns="2.5rem 4fr 4fr 2fr 2fr 6fr">
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          <fhi-checkbox></fhi-checkbox>
        </fhi-table-cell>
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Geografi 2020
        </fhi-table-cell>
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          ATC_Verdi
        </fhi-table-cell>
        <fhi-table-cell> 10.10.2027 </fhi-table-cell>
        <fhi-table-cell style="--fhi-table-cell-justify-content: start">
          Pelle Parafin
        </fhi-table-cell>
        <fhi-table-cell>
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
      </fhi-table-row>
    </fhi-table>
  `,
};

export default meta;
