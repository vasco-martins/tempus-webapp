import * as _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import DeleteModal from "../../../components/DeleteModal";
import { TextField } from "../../../components/Forms/TextField";
import { Heading } from "../../../components/Heading";
import Modal from "../../../components/Modal";
import ModalBody from "../../../components/Modal/ModalBody";
import ModalFooter from "../../../components/Modal/ModalFooter";
import ModalHeader from "../../../components/Modal/ModalHeader";
import ProjectLayoutWrapper from "../../../components/ProjectLayoutWrapper";
import ProjectController from "../../../controllers/ProjectController";
import getCurrentUser from "../../../helpers/getUser";

export default function Settings({ user, token, project }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(project.name);
  const [nameError, setNameError] = useState(null);

  const updateName = async () => {
    setNameError(null);
    setLoading(true);
    const data = await ProjectController.update(token, project.id, name);
    setLoading(false);

    if (data.error) {
      setNameError(data.error);
      return;
    }

    setIsOpen(false);

    toast.success("Projeto atualizado com sucesso!");
  };

  const deleteProject = async () => {
    setLoading(true);
    const data = await ProjectController.destroy(token, project.id);

    if (!data) {
      await toast.error("Erro ao remover o projeto");
      setIsOpen(false);
      setLoading(false);
      return;
    }

    await toast.success("Projeto removido com sucesso!");

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Tempus | Projects</title>
      </Head>

      <DeleteModal
        title="Remover projeto"
        message="Tem a certeza que pretende remover o projeto?"
        isOpen={isOpen}
        isLoading={loading}
        onDelete={deleteProject}
        setIsOpenCallable={setIsOpen}
      />
      <ProjectLayoutWrapper user={user} project={project} token={token}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 ">
          <Heading size="h2" weight="bold">
            Definições do Projeto
          </Heading>

          <div className="md:flex gap-8"></div>
        </div>
        <div>
          <div className="w-full md:w-1/3 ">
            <TextField
              name="name"
              type="text"
              error={nameError || null}
              onChange={setName}
              value={name}
              label="Nome do Projeto"
              required
            />
            <Button
              loading={loading}
              color={"primary"}
              disabled={name.length < 3}
              className=""
              onClick={updateName}
            >
              Guardar
            </Button>
          </div>
          <div className="flex flex-col mt-10">
            <Heading size="h5" className="mb-5">
              Remover Projeto
            </Heading>
            <div className="w-full md:w-1/3 ">
              <Button
                color={"danger"}
                className=""
                onClick={() => setIsOpen(true)}
              >
                Remover Projeto
              </Button>
            </div>
          </div>
        </div>
      </ProjectLayoutWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { user, token } = await getCurrentUser(ctx);
  const { id } = ctx.query;

  const project = await ProjectController.show(token, id);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return { props: { user: user, token: token, project: project } };
}
