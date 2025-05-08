import * as fs from 'fs';
import * as path from 'path';

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

const generateWebComponentName = customElementSelector => {
  return toPascalCase(customElementSelector);
};

const generateCustomElementSelector = fileName => {
  return 'fhi-icon-' + path.basename(fileName, '.svg');
};

const writeWebComponentFile = (webComponentCode, filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, webComponentCode, 'utf8');
};

const getSVGIconNames = inputFolder => {
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

const generateOutputFilePath = (outputFolder, customElementSelector) => {
  return path.join(outputFolder, `${customElementSelector}.ts`);
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

  return [process.argv[2], process.argv[3]];
};

const main = () => {
  const [inputFolder, outputFolder] = getInputAndOutputFolders();

  const iconNames = getSVGIconNames(inputFolder);

  iconNames.forEach(fileName => {
    const customElementSelector = generateCustomElementSelector(fileName);

    const iconData = getIcon(inputFolder, fileName);

    const webComponentName = generateWebComponentName(customElementSelector);

    const webComponentCode = generateWebComponentCode(
      webComponentName,
      customElementSelector,
      iconData,
    );

    const outputFilePath = generateOutputFilePath(
      outputFolder,
      customElementSelector,
    );

    writeWebComponentFile(webComponentCode, outputFilePath);
  });
};

main();
// This script generates web component files from SVG icons.
// It reads SVG files from a specified input folder, wrapps them in WebComponents using Lit, and writes the output files to a specified output folder.
// e.g use in terminal: node generate-icon-components.js ./src/assets/icons ./src/components/icons
