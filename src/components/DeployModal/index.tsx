import { useEffect } from "@storybook/addons";
import React from "react";
import ProjectController from "../../controllers/ProjectController";
import { Button } from "../Button";
import { TextField } from "../Forms/TextField";
import { Heading } from "../Heading";
import Modal from "../Modal";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";

export interface DeployModalProps {
  setIsOpenCallable: (value) => void;
  projectId: number;
  token: string;
  isOpen: boolean;
}

const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  setIsOpenCallable,
  projectId,
  token,
}) => {
  const [message, setMessage] = React.useState("A iniciar");
  const [percentage, setPercentage] = React.useState(0);
  const [url, setUrl] = React.useState(null);

  React.useEffect(() => {
    const startDeploy = async () => {
      await ProjectController.deploy(token, projectId);
    };

    if (isOpen) {
      startDeploy();
    }
  }, [isOpen]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isOpen) {
        ProjectController.getDeployStatus(token, projectId).then((data) => {
          setMessage(data.message);
          setPercentage(data.percentage);
          setUrl(data.url);
        });
        console.log(token);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOutsideClick={() => {
        setIsOpenCallable(false);
      }}
    >
      <ModalHeader>
        <Heading size="h2" weight="bold">
          Deploy para o servidor
        </Heading>
      </ModalHeader>

      <ModalBody>
        {url && (
          <div className="mb-6">
            <div className="font-bold">Dados do utilizador:</div>
            <div className="mt-4">
              <p>
                Username:{" "}
                <span className="font-bold text-blue-800">admin@admin.com</span>
              </p>
              <p className="mt-2">
                Password:{" "}
                <span className="font-bold text-blue-800">password</span>
              </p>
            </div>
          </div>
        )}
        <p>{message}</p>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: percentage + "%" }}
              className="shadow-none transition duration-200 flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="w-full flex items-center justify-between">
          <p>Este processo pode demorar alguns minutos.</p>
          <div className="flex gap-8">
            {url ? (
              <a href={url} target="_blank">
                <Button className="" color="primary" onClick={() => {}}>
                  Visitar Website
                </Button>
              </a>
            ) : (
              <Button
                onClick={() => {}}
                loading={true}
                color={"primary"}
              ></Button>
            )}
            <Button
              className=""
              color="secondary"
              onClick={() => {
                setIsOpenCallable(false);
              }}
            >
              Fechar
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default DeployModal;
