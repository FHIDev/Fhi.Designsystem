import type { Meta } from '@storybook/web-components';

export interface FhiStorybookMeta<T> extends Meta<T> {
  parameters?: Meta['parameters'] & {
    /**
     * The `eventTypes` parameter is used to document events emitted by the component. e.g change, click, input etc.
     */
    eventTypes?: {
      name: string;
      valueLocation?: string[];
      description: string;
    }[];
    /**
     * The `slotTypes` parameter is used to document the slots where children are passed to the component.
     */
    slotTypes?: {
      name?: string;
      description: string;
    }[];
    /**
     * The `methodTypes` parameter is used to document public methods exposed by the component.
     */
    methodTypes?: {
      name: string;
      description: string;
    }[];
  };
}
