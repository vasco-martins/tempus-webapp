import React from "react";
import { Project } from "../../../@types/project";
import { Heading } from "../../Heading";

import { pt } from "date-fns/locale";
import { formatRelative } from "date-fns";
import Link from "next/link";

export interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className="h-36 rounded-lg flex items-center flex-row cursor-pointer hover:bg-gray-200 transition"
        style={{ boxShadow: "0px 4px 40px rgba(122, 122, 122, 0.1)" }}
      >
        <div className="card-detail mx-6">
          <Heading size="h4">{project.name}</Heading>
          <p className="text-gray-400 font-thin mt-1">
            Atualizado{" "}
            {formatRelative(new Date(project.created_at), new Date(), {
              locale: pt,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
