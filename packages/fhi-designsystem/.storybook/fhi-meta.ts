import type { Meta } from '@storybook/web-components';

export interface FhiStorybookMeta<T> extends Meta<T> {
  parameters?: Meta['parameters'] & {
    eventTypes?: {
      name: string;
      valueLocation?: string[];
      description: string;
    }[];
    slotTypes?: {
      name?: string;
      description: string;
    }[];
    methodTypes?: {
      name: string;
      description: string;
    }[];
  };
}
