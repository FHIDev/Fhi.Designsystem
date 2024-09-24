import { configs } from 'eslint-plugin-lit';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...tseslint.config(
    configs['flat/recommended'],
    ...tseslint.configs.recommended,
  ),
  eslintConfigPrettier,
];
