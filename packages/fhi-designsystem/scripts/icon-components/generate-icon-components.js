import * as fs from 'fs';
import * as path from 'path';

import { optimize } from 'svgo';

const optimizeSvg = svgString => {
  const result = optimize(svgString, {
    multipass: true, // all other config fields are available here
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
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const ${webComponentName}Selector = "${customElementSelector}";

@customElement(${webComponentName}Selector)
export class ${webComponentName} extends LitElement {
  @property({ type: String }) color: string = "var(--fhi-color-neutral-text-default)";

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
import { Meta, IconGallery, IconItem, Controls, Canvas } from '@storybook/blocks';

import * as FhiIconStories from './fhi-icon.stories';

${iconSelectors
  .map(
    selector =>
      `import { ${generateWebComponentName(selector)}Selector } from './${selector}.component';`,
  )
  .join('\n')}

<Meta of={FhiIconStories} />

# Icon

_Icon_ er ikke èn komponenet men heller en samling av komponenter som er laget for å vise ikoner i FHI sine applikasjoner.

Hvert ikon er en web-komponent som kan brukes i HTML-koden din på denne måten:
\`\`\`html
<${iconSelectors[0]}></${iconSelectors[0]}>
\`\`\`

### Eksempel
<Canvas of={FhiIconStories.Preview} />
<Controls />

<br />

# Alle Ikoner

<br />

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
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import { ${iconKomponentName} } from './${iconSelector}.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new ${iconKomponentName}();

const meta: Meta<${iconKomponentName}> = {
  title: 'Komponenter/Icons',
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
        'Setter farge på ikonet. Skal helst være et farge token. Se [FHI design system: Farge Tokens](https://fhi-designsystem.netlify.app/komponenter/farge/#farge-variabler)',
      defaultValue: { summary: 'var(--fhi-color-neutral-text-default)' },
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

const writeFile = (webComponentCode, filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, webComponentCode, 'utf8');
};

const getSVGIconFileNames = inputFolder => {
  const inputFiles = fs.readdirSync(inputFolder);

  console.log('inputFiles: ', inputFiles);

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

const generateOutputFilePath = (outputFolder, customElementSelector) => {
  return path.join(outputFolder, `${customElementSelector}.component.ts`);
};

const getInputAndOutputFolders = () => {
  if (!process.argv[2]) {
    throw new Error(
      'No input folder specified. Please provide a path to the input folder.',
    );
  }

  if (!process.argv[3]) {
    throw new Error(
      'No output folder specified. Please provide a path to the output folder.',
    );
  }

  // console.log(path.relative(__dirname, path.join(process.argv[2], file)));

  console.log(process.argv[2], process.argv[3]);

  return [process.argv[2], process.argv[3]];
};

const main = () => {
  const [inputFolder, outputFolder] = getInputAndOutputFolders();

  const iconFileNames = getSVGIconFileNames(inputFolder);

  iconFileNames.forEach(fileName => {
    const optimizedSvg = optimizeSvg(getIcon(inputFolder, fileName));

    const customElementSelector = generateCustomElementSelector(fileName);

    const webComponentName = generateWebComponentName(customElementSelector);

    const webComponentCode = generateWebComponentCode(
      webComponentName,
      customElementSelector,
      optimizedSvg,
    );

    const outputFilePath = generateOutputFilePath(
      outputFolder,
      customElementSelector,
    );

    writeFile(webComponentCode, outputFilePath);
  });

  const storyFileDate = generateIconStory(
    generateCustomElementSelector(iconFileNames[0]),
  );

  writeFile(storyFileDate, path.join(outputFolder, 'fhi-icon.stories.ts'));

  const documentationFileData = generateIconDocs(
    iconFileNames.map(generateCustomElementSelector),
  );

  writeFile(
    documentationFileData,
    path.join(outputFolder, 'fhi-icon.docs.mdx'),
  );
};

main();
// This script generates web component files from SVG icons.
// It reads SVG files from a specified input folder, wrapps them in WebComponents using Lit, and writes the output files to a specified output folder.
// It also generates a Storybook documentation file for the icons.
// e.g use in terminal: node generate-icon-components.js ./src/assets/icons ./src/components/icons
