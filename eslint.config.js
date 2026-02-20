// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { configs } from 'eslint-plugin-lit';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...tseslint.config(
    configs['flat/recommended'],
    ...tseslint.configs.recommended,
  ),
  eslintConfigPrettier,
  ...storybook.configs['flat/recommended'],
];
