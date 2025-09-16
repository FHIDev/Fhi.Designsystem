import { cemSorterPlugin } from '@wc-toolkit/cem-sorter';
import { typeParserPlugin } from '@wc-toolkit/type-parser';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';

const options = {
  outdir: './',
  htmlFileName: 'vscode.html-custom-data.json',
  cssFileName: 'vscode.css-custom-data.json',
  descriptionSrc: 'description',
  hideSlotsDocs: false,
  hideEventDocs: false,
  hideCssPropertiesDocs: false,
  hideCssPartsDocs: false,
  hideMethodDocs: false,
};
export default {
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts'],
  outdir: './',
  LitElement: true,
  plugins: [
    cemSorterPlugin({
      deprecatedLast: true,
      customFields: ['customProperty'],
    }),
    typeParserPlugin(),
    customElementVsCodePlugin(options),
  ],
};
