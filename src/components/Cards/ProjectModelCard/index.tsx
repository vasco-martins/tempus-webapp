import { formatRelative } from "date-fns";
import { pt } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiBookmark, FiEdit, FiMenu, FiTrash } from "react-icons/fi";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import { ProjectModel } from "../../../@types/projectModel";
import { Button } from "../../Button";
import { Heading } from "../../Heading";

// import { Container } from './styles';

export interface ProjectModelCardProps {
  //label: string;
  projectModel: any;
  onDelete: Function;
  onReorder: Function;
  onParentEdit: Function;
  dragHandle: any;
}

const ProjectModelCard: React.FC<ProjectModelCardProps> = ({
  projectModel,
  onDelete,
  onReorder,
  onParentEdit,
  dragHandle,
}) => {
  const [subMenus, setSubMenus] = React.useState(projectModel.project_models);
  const router = useRouter();

  const SortableMenuItem = SortableElement(({ value }) => {
    return (
      <div className="my-8">
        <ProjectModelCard
          projectModel={value}
          onDelete={onDelete}
          onReorder={onReorder}
          onParentEdit={onParentEdit}
          dragHandle={dragHandle}
        />
      </div>
    );
  });

  const SortableMenu = SortableContainer(({ items }) => {
    return (
      <div className="gap-8 ml-20">
        {items.map((item, index) => (
          <SortableMenuItem
            key={`item-${item.id}`}
            index={index}
            value={item}
          />
        ))}
      </div>
    );
  });

  return (
    <>
      <div
        className="w-100 h-24 bg-white-100 flex items-center justify-between px-8"
        style={{ boxShadow: "0px 4px 40px rgba(122, 122, 122, 0.1)" }}
      >
        <div className="flex items-center">
          {dragHandle}
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

        <div className="button-group flex gap-4">
          {!projectModel.is_parent ? (
            <Link
              href={
                "/projects/" +
                projectModel.project_id +
                "/cruds/" +
                projectModel.id +
                "/edit"
              }
            >
              <Button
                className="mt-4 md:mt-0"
                color="warning"
                onClick={() => {}}
              >
                <FiEdit />
              </Button>
            </Link>
          ) : (
            <Button
              className="mt-4 md:mt-0"
              color="warning"
              onClick={() => onParentEdit(projectModel)}
              icon={<FiEdit onClick={() => onParentEdit(projectModel)} />}
            ></Button>
          )}
          <Button
            className="mt-4  md:mt-0"
            color="danger"
            onClick={() => {
              onDelete(projectModel);
            }}
          >
            <FiTrash />
          </Button>
        </div>
      </div>

      <SortableMenu
        items={subMenus}
        onSortEnd={async ({ oldIndex, newIndex }) => {
          setSubMenus(arrayMove(subMenus, oldIndex, newIndex));
          await onReorder(arrayMove(subMenus, oldIndex, newIndex));
        }}
        useDragHandle
      />
    </>
  );
};

export default ProjectModelCard;
