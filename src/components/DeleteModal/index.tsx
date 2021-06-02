import React from "react";
import { Button } from "../Button";
import { TextField } from "../Forms/TextField";
import { Heading } from "../Heading";
import Modal from "../Modal";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";

export interface DeleteModalProps {
  onDelete: (e) => void;
  setIsOpenCallable: (value) => void;
  isLoading: boolean;
  isOpen: boolean;
  title: string;
  message: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onDelete,
  title,
  message,
  isOpen,
  setIsOpenCallable,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOutsideClick={() => {
        setIsOpenCallable(false);
      }}
    >
      <ModalHeader>
        <Heading size="h2" weight="bold">
          {title}
        </Heading>
      </ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button
          loading={isLoading}
          color={"danger"}
          className=""
          onClick={onDelete}
        >
          Remover
        </Button>
        <Button
          className=""
          color="secondary"
          onClick={() => {
            setIsOpenCallable(false);
          }}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
