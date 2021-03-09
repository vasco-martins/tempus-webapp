import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, ButtonProps, buttonColors } from ".";

export default {
  title: "Component/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args} className="w-1/4">
    Hello World
  </Button>
);

// Title = "Hello World"
export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  onClick: (e) => {},
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  onClick: (e) => {},
};

export const Success = Template.bind({});
Success.args = {
  color: "success",
  onClick: (e) => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: "success",
  disabled: true,
  onClick: (e) => {},
};

export const Loading = Template.bind({});
Loading.args = {
  color: "primary",
  loading: true,
  onClick: (e) => {},
};
