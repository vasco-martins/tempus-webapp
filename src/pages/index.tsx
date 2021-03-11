import Head from "next/head";

import getCurrentUser from "../helpers/getUser";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { User } from "../@types/user";
import LayoutWrapper from "../components/LayoutWrapper";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { TextField } from "../components/Forms/TextField";
import Modal from "../components/Modal";
import ModalHeader from "../components/Modal/ModalHeader";
import ModalBody from "../components/Modal/ModalBody";
import ModalFooter from "../components/Modal/ModalFooter";

export default function Home({ user }) {
  const [isOpen, setIsOpen] = useState(false);

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
          <TextField name="name" onChange={() => {}} label="Nome do Projeto" />
        </ModalBody>
        <ModalFooter>
          <Button className="" color="primary" onClick={() => {}}>
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
        <div className="flex justify-between items-center ">
          <Heading size="h2" weight="bold">
            Projetos
          </Heading>
          <Button
            className=""
            color="primary"
            onClick={() => {
              setIsOpen(true);
            }}
            icon={<FiPlus />}
          >
            Novo Projeto
          </Button>
        </div>
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user: User = await getCurrentUser(ctx);

  return { props: { user: user } };
}
