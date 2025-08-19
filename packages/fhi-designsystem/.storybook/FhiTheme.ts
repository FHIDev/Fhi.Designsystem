import { create } from '@storybook/theming/create';
import '../src/theme/default.css';

const getCssPropertyValue = property =>
  getComputedStyle(document.querySelector(':root') as Element).getPropertyValue(
    property,
  );

export default create({
  colorSecondary: getCssPropertyValue('--fhi-color-accent-base-default'),

  base: 'light',
  brandTitle: 'FHI Designsystem Storybook',
  brandImage:
    'https://github.com/user-attachments/assets/221facf3-ce02-4810-8143-cad4b23e8fb8',
  brandTarget: '_self',

  fontBase: getCssPropertyValue('--fhi-font-family-default'),
  appBg: getCssPropertyValue('--fhi-color-neutral-background-default'),
  textColor: getCssPropertyValue('--fhi-color-neutral-text-default'),
  textInverseColor: getCssPropertyValue('--fhi-color-neutral-text-inverted'),
});
