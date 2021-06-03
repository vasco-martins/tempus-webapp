import { useState } from "@storybook/addons";
import { useRouter } from "next/router";
import { truncate } from "node:fs/promises";
import React from "react";
import {
  FiArrowLeft,
  FiBox,
  FiCheck,
  FiDownloadCloud,
  FiHome,
  FiSettings,
} from "react-icons/fi";
import { Project } from "../../@types/project";
import { Button } from "../Button";
import DeployModal from "../DeployModal";
import SidebarWrapper from "../Sidebar/SidebarWrapper";
import SidebarItem from "../SidebarItem";

export interface ProjectLayoutProps {
  project: Project;
  token: string;
}

const ProjectSidebar: React.FC<ProjectLayoutProps> = ({ project, token }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
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

        <p className="text-gray-600">Código do Projeto</p>

        <Button
          className=" my-auto"
          color="primary"
          onClick={() => {
            setIsOpen(true);
          }}
          icon={<FiCheck />}
        >
          Deploy
        </Button>

        <SidebarItem
          icon={<FiDownloadCloud />}
          name="Download"
          href={project.download_link}
        />

        <DeployModal
          isOpen={isOpen}
          setIsOpenCallable={setIsOpen}
          projectId={project.id}
          token={token}
        />
      </SidebarWrapper>
    </>
  );
};

export default ProjectSidebar;
