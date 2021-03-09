import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Heading, HeadingProps, sizes, weights } from ".";

export default {
  title: "Component/Heading",
  component: Heading,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: sizes,
      },
    },
    weight: {
      control: {
        type: "select",
        options: weights,
      },
    },
    className: { control: "string" },
  },
} as Meta;

const Template: Story<HeadingProps> = (args) => (
  <Heading {...args}>Hello World</Heading>
);

// Title = "Hello World"
export const Heading1 = Template.bind({});
Heading1.args = {
  size: "h1",
  weight: "bold",
};

export const Heading2 = Template.bind({});
Heading2.args = {
  size: "h2",
  weight: "bold",
};

export const Heading3 = Template.bind({});
Heading3.args = {
  size: "h3",
  weight: "bold",
};

export const Heading4 = Template.bind({});
Heading4.args = {
  size: "h4",
  weight: "bold",
};

export const Heading5 = Template.bind({});
Heading5.args = {
  size: "h5",
  weight: "bold",
};

export const Heading6 = Template.bind({});
Heading6.args = {
  size: "h6",
  weight: "bold",
};
