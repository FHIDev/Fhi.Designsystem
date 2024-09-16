import type { Meta, StoryObj } from "@storybook/web-components";

import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import { MyElement, MyElementProps as MyElementProps } from "./my-element";

MyElement;

const meta: Meta = {
  title: "Components/my-element",
  tags: ["autodocs"],
  render: (args) =>
    html`<my-element
      title=${ifDefined(args.title)}
      counter=${ifDefined(args.counter)}
    ></my-element>`,
};

type Story = StoryObj<MyElementProps>;

export const Primary: Story = {
  args: {
    title: "Hello from Storybook",
    value: 4,
  } satisfies MyElementProps,
};

export default meta;
