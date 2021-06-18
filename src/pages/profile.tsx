import * as _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import DeleteModal from "../components/DeleteModal";
import { TextField } from "../components/Forms/TextField";
import { Heading } from "../components/Heading";
import LayoutWrapper from "../components/LayoutWrapper";
import ProjectLayoutWrapper from "../components/ProjectLayoutWrapper";
import ProjectController from "../controllers/ProjectController";
import UserController from "../controllers/UserController";
import getCurrentUser from "../helpers/getUser";

export default function Profile({ user, token }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const [errors, setErrors] = useState(null);

  const update = async () => {
    setLoading(true);
    setErrors(null);
    const data = await UserController.updateUser(
      user.id,
      name,
      email,
      password,
      passwordConfirm
    );
    setLoading(false);
    if (data?.errors) {
      setLoading(false);
      setErrors(() => data.errors);
      return;
    }

    await toast.success("Perfil atualizado com sucesso!");
  };

  const deleteProject = async () => {
    setLoading(true);
    // const data = await ProjectController.destroy(token, project.id);

    //if (!data) {
    await toast.error("Erro ao remover o projeto");
    setIsOpen(false);
    setLoading(false);
    return;
    //}

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
      <LayoutWrapper user={user}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 ">
          <Heading size="h2" weight="bold">
            A minha conta
          </Heading>

          <div className="md:flex gap-8"></div>
        </div>
        <div>
          <div className="w-full md:w-1/3 ">
            <TextField
              name="name"
              type="text"
              error={errors?.name || null}
              onChange={setName}
              value={name}
              label="Nome"
              required
            />
            <TextField
              name="email"
              type="text"
              error={errors?.email || null}
              onChange={setEmail}
              value={email}
              label="Email"
              required
            />

            <TextField
              name="password"
              type="password"
              error={errors?.password || null}
              onChange={setPassword}
              label="Password"
              required
            />

            <TextField
              name="password_confirmation"
              type="password"
              error={errors?.password_confirmation || null}
              onChange={setPasswordConfirm}
              label="Confirmar Password"
              required
            />
            <Button
              loading={loading}
              color={"primary"}
              disabled={name.length < 3}
              className=""
              onClick={update}
            >
              Guardar
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { user, token } = await getCurrentUser(ctx);

  return { props: { user: user, token: token } };
}
