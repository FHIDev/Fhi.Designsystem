import * as fs from 'fs';
import * as path from 'path';

import { optimize } from 'svgo';

const warning = `This file is auto-generated by ${path.basename(import.meta.filename)}. Do not edit it manually.`;

const args = (function () {
  const inputArgIndex = process.argv.indexOf('--input');

  if (inputArgIndex === -1 || !process.argv[inputArgIndex + 1]) {
    throw new Error(
      'No input folder specified. Please provide a path to the input folder using the "--input" flag.',
    );
  }
  const inputFolder = process.argv[inputArgIndex + 1];

  const outputArgIndex = process.argv.indexOf('--output');

  if (outputArgIndex === -1 || !process.argv[outputArgIndex + 1]) {
    throw new Error(
      'No output folder specified. Please provide a path to the output folder using the "--output" flag.',
    );
  }
  const outputFolder = process.argv[outputArgIndex + 1];

  const cleanFlagIndex = process.argv.indexOf('--clean-output-folder');

  return {
    inputFolder,
    outputFolder,
    cleanOutputFolder: cleanFlagIndex !== -1,
  };
})();

const optimizeSvg = svgString => {
  const result = optimize(svgString, {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: 'removeAttributesBySelector',
        params: {
          selector: '*',
          attributes: ['width', 'height', 'fill'],
        },
      },
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              width: '${this.size}',
              height: '${this.size}',
              fill: '${this.color}',
            },
          ],
        },
      },
    ],
  });

  return result.data;
};

const toPascalCase = value => {
  return value
    .replace(/([-_][a-z0-9])/g, group =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    )
    .replace(/^[a-z0-9]/, firstCharacter => firstCharacter.toUpperCase());
};

const generateWebComponentCode = (
  webComponentName,
  customElementSelector,
  svg,
) => `
/*
  ${warning}
*/
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const ${webComponentName}Selector = "${customElementSelector}";

@customElement(${webComponentName}Selector)
export class ${webComponentName} extends LitElement {
  @property({ type: String }) color: string = "currentcolor";

  @property({ type: Number }) size: number = 24;

  render() {
    return html\`
      ${svg}
    \`;
  }
      
  static styles = css\`
    :host {
      display: flex;
      max-height: min-content;
      max-width: min-content;
    }
  \`;
  }
`;

const generateIconDocs = iconSelectors => `
[//]: # "${warning}"

import { Meta, IconGallery, IconItem, Controls, Canvas } from '@storybook/blocks';

import * as FhiIconStories from './fhi-icon.stories';

${iconSelectors
  .map(
    selector =>
      `import { ${generateWebComponentName(selector)}Selector } from './${selector}.component';`,
  )
  .join('\n')}

<Meta of={FhiIconStories} />

# Ikoner
Ikoner brukes for å representere eller forsterke handlinger, områder og mer. De kan trekke til seg oppmerksomhet og kan kommunisere budskap, så lenge vi bruker dem konsekvent. Vi bruker ikoner med intensjon og mening, ikke for å pynte.

Hvert ikon er en web-komponent som kan brukes i HTML-koden din på denne måten:
\`\`\`html
<${iconSelectors[0]}></${iconSelectors[0]}>
\`\`\`

### Eksempel
<Canvas of={FhiIconStories.Preview} />
<Controls />

<br />

## Alle Ikoner

<div style={{padding: ".25rem 1rem", background: "#D3E3F5", borderRadius: "2px", borderBottom: "4px solid #3283CE", marginBottom: "2rem"}}>
Savner du et ikon, eller mener et kan forbedres, kan du <a href="https://github.com/FHIDev/Fhi.Designsystem/issues" target="_blank" rel="noopener" style={{ color: "#222", textDecoration: "underline" }}>åpne en sak i Github</a>, gi beskjed på <a href="https://teams.microsoft.com/l/channel/19%3Aa0d23e5a6954497d9e378d3367e7f458%40thread.skype/General?groupId=571dd359-777d-4c02-85ea-d56854d03ef7&tenantId=54475f80-1baa-4ea9-9185-c0de5cc603fe" target="_blank" rel="noopener" style={{ color: "#222", textDecoration: "underline" }}>Designsystem-kanalen på Teams</a> eller kommentere i <a href="https://www.figma.com/design/XPDnpuIUU1ckXvxCnO1ksA/Ikoner-%E2%80%A2-FHI-Designsystem?node-id=0-1&p=f&t=atKKOv95HMlv2AzU-11" target="_blank" rel="noopener" style={{ color: "#222", textDecoration: "underline" }}>Figma-filen for ikoner</a>.

Om du ikke finner ikonet du leter etter, og ikke tror ikonet bør inkluderes i designsystemet, kan du bruke ikoner fra <a href="https://lucide.dev/" target="_blank" rel="noopener" style={{ color: "#222", textDecoration: "underline" }}>Lucide</a>.
</div>

<IconGallery>
${iconSelectors
  .map(
    selector =>
      `<IconItem name="${selector}"><${selector}></${selector}></IconItem>`,
  )
  .join('\n')}
</IconGallery>
`;

const generateIconStory = iconSelector => {
  const iconKomponentName = generateWebComponentName(iconSelector);

  return `
/*
  ${warning}
*/
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ${iconKomponentName} } from './${iconSelector}.component';

new ${iconKomponentName}();

const meta: Meta<${iconKomponentName}> = {
  title: 'Ikoner',
  component: '${iconSelector}',
  parameters: {},
  decorators: [],
  render: args =>
    html\`<${iconSelector}
      color=\${ifDefined(args.color)}
      size=\${ifDefined(args.size)}
    ></${iconSelector}>\`,
  argTypes: {
    color: {
      control: 'text',
      description:
        'Setter farge på ikonet. Skal helst være et farge token. Se [Farge Tokens](https://designsystem.fhi.no/?path=/docs/design-tokens-farger--docs)',
      defaultValue: { summary: 'currentcolor' },
    },
    size: {
      control: 'number',
      description: 'Setter størelsen på ikonet i px.',
      defaultValue: { summary: 24 },
    },
  },
};

type Story = StoryObj<${iconKomponentName}>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    color: 'var(--fhi-color-neutral-text-default)',
    size: 24,
  },
};

export default meta;

`;
};

const generateWebComponentName = customElementSelector => {
  return toPascalCase(customElementSelector);
};

const generateCustomElementSelector = fileName => {
  return 'fhi-icon-' + path.basename(fileName, '.svg');
};

const guardOutputFolder = outputFolderPath => {
  if (args.cleanOutputFolder) {
    const folderContent = fs.readdirSync(outputFolderPath);

    folderContent.forEach(file => {
      const filePath = path.join(outputFolderPath, file);

      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });

    return;
  }

  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
  }

  const folderContent = fs.readdirSync(outputFolderPath);

  if (folderContent.length > 0) {
    throw new Error(
      `The output folder "${outputFolderPath}" is not empty. Please provide an empty folder.`,
    );
  }
};

const writeFile = (webComponentCode, filePath) => {
  fs.writeFileSync(filePath, webComponentCode, 'utf8');

  console.log('+ ', filePath);
};

const getSVGIconFileNames = inputFolder => {
  const inputFiles = fs.readdirSync(inputFolder);

  return inputFiles.filter(file => {
    return path.extname(file) === '.svg';
  });
};

const getIcon = (inputFolder, file) => {
  let iconData = null;

  try {
    iconData = fs.readFileSync(path.join(inputFolder, file), 'utf8');
  } catch (error) {
    console.error(
      `Error reading file ${file} in folder ${inputFolder}: ${error.message}`,
    );
    throw error;
  }

  return iconData;
};

const main = () => {
  guardOutputFolder(args.outputFolder);

  const iconFileNames = getSVGIconFileNames(args.inputFolder);

  iconFileNames.forEach(fileName => {
    const optimizedSvg = optimizeSvg(getIcon(args.inputFolder, fileName));

    const customElementSelector = generateCustomElementSelector(fileName);

    const webComponentName = generateWebComponentName(customElementSelector);

    const webComponentCode = generateWebComponentCode(
      webComponentName,
      customElementSelector,
      optimizedSvg,
    );

    const componentOutputPath = path.join(
      args.outputFolder,
      `${customElementSelector}.component.ts`,
    );

    writeFile(webComponentCode, componentOutputPath);
  });

  const storyFileDate = generateIconStory(
    generateCustomElementSelector(iconFileNames[0]),
  );

  writeFile(storyFileDate, path.join(args.outputFolder, 'fhi-icon.stories.ts'));

  const documentationFileData = generateIconDocs(
    iconFileNames.map(generateCustomElementSelector),
  );

  writeFile(
    documentationFileData,
    path.join(args.outputFolder, 'fhi-icon.docs.mdx'),
  );
};

main();
// This script generates web component files from SVG icons.
// It reads SVG files from a specified input folder, wrapps them in WebComponents using Lit, and writes the output files to a specified output folder.
// It also generates a Storybook documentation file for the icons.
// e.g use in terminal: node generate-icon-components.js ./src/assets/icons ./src/components/icons
