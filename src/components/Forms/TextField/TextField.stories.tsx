import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TextField, TextFieldProps } from ".";

export default {
  title: "Form/TextField",
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

// Title = "Hello World"
export const WithLabelAndPlaceholder = Template.bind({});
WithLabelAndPlaceholder.args = {
  type: "text",
  placeholder: "Hello World",
  label: "Name",
  onChange: (value) => {},
};

export const WithLabelButNoPlaceholder = Template.bind({});
WithLabelButNoPlaceholder.args = {
  type: "text",
  label: "Name",
  onChange: (value) => {},
};

export const WithPlaceholderButNoLabel = Template.bind({});
WithPlaceholderButNoLabel.args = {
  type: "text",
  placeholder: "Hello World",
  onChange: (value) => {},
};
