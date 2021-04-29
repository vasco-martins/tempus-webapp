import { useRouter } from "next/router";
import React from "react";
import { FiArrowLeft, FiBox, FiHome, FiSettings } from "react-icons/fi";
import { Project } from "../../@types/project";
import SidebarWrapper from "../Sidebar/SidebarWrapper";
import SidebarItem from "../SidebarItem";

export interface ProjectLayoutProps {
  project: Project;
}

const ProjectSidebar: React.FC<ProjectLayoutProps> = ({ project }) => {
  const router = useRouter();

  return (
    <SidebarWrapper>
      {router.pathname !== "/" && (
        <SidebarItem icon={<FiArrowLeft />} name="Voltar" href="/" />
      )}
      <SidebarItem
        icon={<FiBox />}
        name={project.name}
        href={`/projects/${project.id}`}
      />

      <SidebarItem icon={<FiHome />} name="Projetos" href="/" />
      <SidebarItem icon={<FiSettings />} name="Definições" href="/settings" />
    </SidebarWrapper>
  );
};

export default ProjectSidebar;
