import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ProjectCard, { ProjectCardProps } from ".";

export default {
  title: "Cards/ProjectCard",
  component: ProjectCard,
} as Meta;

const Template: Story<ProjectCardProps> = (args) => (
  <ProjectCard
    project={{
      id: 1,
      name: "Project",
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    }}
  />
);

// Title = "Hello World"
export const Card = Template.bind({});
