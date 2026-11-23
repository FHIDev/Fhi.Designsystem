import { addons } from 'storybook/manager-api';
import FhiTheme from './FhiTheme';
import './titleAddon';

addons.setConfig({
  theme: FhiTheme,
});
