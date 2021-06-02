import { formatRelative } from "date-fns";
import { pt } from "date-fns/locale";
import React from "react";
import { FiBookmark, FiMenu, FiTrash } from "react-icons/fi";
import { ProjectModel } from "../../../@types/projectModel";
import { Button } from "../../Button";
import { Heading } from "../../Heading";

// import { Container } from './styles';

export interface ProjectModelCardProps {
  //label: string;
  projectModel: any;
  onDelete: (e) => void;
}

const ProjectModelCard: React.FC<ProjectModelCardProps> = ({
  projectModel,
  onDelete,
}) => {
  return (
    <div
      className="w-100 h-24 bg-white-100 flex items-center justify-between px-8"
      style={{ boxShadow: "0px 4px 40px rgba(122, 122, 122, 0.1)" }}
    >
      <div className="flex items-center">
        <FiMenu />
        <div className="flex justify-center px-8 flex-col">
          <div className="flex gap-4">
            <Heading size="h4">{projectModel.label}</Heading>
            {projectModel.is_parent ? (
              <div className="w-38 bg-blue-100 rounded-lg px-4 py-1">pai</div>
            ) : (
              <></>
            )}
          </div>
          <p className="text-gray-400 font-thin mt-1">
            Atualizado{" "}
            {formatRelative(new Date(projectModel.created_at), new Date(), {
              locale: pt,
            })}{" "}
          </p>
        </div>
      </div>

      <div className="button-group">
        <Button className="mt-4  md:mt-0" color="danger" onClick={onDelete}>
          <FiTrash />
        </Button>
      </div>
    </div>
  );
};

export default ProjectModelCard;
