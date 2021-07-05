import * as _ from "lodash";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import ProjectCard from "../components/Cards/ProjectCard";
import { TextField } from "../components/Forms/TextField";
import { Heading } from "../components/Heading";
import LayoutWrapper from "../components/LayoutWrapper";
import Modal from "../components/Modal";
import ModalBody from "../components/Modal/ModalBody";
import ModalFooter from "../components/Modal/ModalFooter";
import ModalHeader from "../components/Modal/ModalHeader";
import ProjectController from "../controllers/ProjectController";
import getCurrentUser from "../helpers/getUser";

export default function Home({ user, token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectError, setProjectError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState(null);

  const handleKeydownEvent = async (e) => {
    if (!(e.key === "Enter") || projectName.length < 2) return;

    await createProject();
  };

  const createProject = async () => {
    setProjectError(null);
    setLoading(true);
    const data = await ProjectController.store(token, projectName);
    setLoading(false);

    if (data.error) {
      setProjectError(data.error);
      return;
    }

    setIsOpen(false);

    setProjects(() => [data, ...projects]);
    toast.success("Projeto adicionado com sucesso!");
  };

  const getProjects = async () => {
    const projects = await ProjectController.index(token);
    setProjects(projects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <Head>
        <title>Tempus | Projects</title>
      </Head>
      <Modal
        isOpen={isOpen}
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        <ModalHeader>
          <Heading size="h2" weight="bold">
            Novo Projeto
          </Heading>
        </ModalHeader>
        <ModalBody>
          <TextField
            name="name"
            onChange={setProjectName}
            error={projectError}
            label="Nome do Projeto"
            onKeyDown={handleKeydownEvent}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            loading={loading}
            color={"primary"}
            disabled={projectName.length < 2}
            className=""
            onClick={createProject}
          >
            Criar
          </Button>
          <Button
            className=""
            color="secondary"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <LayoutWrapper user={user}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 ">
          <Heading size="h2" weight="bold">
            Projetos
          </Heading>
          <Button
            className="w-full mt-4 md:w-1/3 lg:w-48 md:mt-0"
            color="primary"
            onClick={() => {
              setIsOpen(true);
            }}
            icon={<FiPlus />}
          >
            Novo Projeto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {!projects && _.times(8, (i) => <Skeleton key={i} height={150} />)}

          {projects &&
            projects.length > 0 &&
            _.map(projects, (project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

          {projects && projects.length == 0 && <p>Sem projetos adicionados</p>}
        </div>
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { user, token } = (await getCurrentUser(ctx)) || {};

  return { props: { user: user, token: token } };
}
