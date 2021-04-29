import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "../../../components/Button";
import Select from "../../../components/Forms/Select";
import { TextField } from "../../../components/Forms/TextField";
import { Heading } from "../../../components/Heading";
import Modal from "../../../components/Modal";
import ModalBody from "../../../components/Modal/ModalBody";
import ModalFooter from "../../../components/Modal/ModalFooter";
import ModalHeader from "../../../components/Modal/ModalHeader";
import ProjectLayoutWrapper from "../../../components/ProjectLayoutWrapper";
import Table from "../../../components/Table";
import TableData from "../../../components/Table/TableData";
import TableHead from "../../../components/Table/TableHead";
import TableRow from "../../../components/Table/TableRow";
import TBody from "../../../components/Table/TBody";
import THead from "../../../components/Table/THead";
import BuilderController from "../../../controllers/BuilderController";
import ProjectController from "../../../controllers/ProjectController";
import getCurrentUser from "../../../helpers/getUser";
import * as _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

export default function New({ user, token, project, fields }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [databaseFieldName, setDatabaseFieldName] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [validations, setValidations] = useState({});
  const [crudFields, setCrudFields] = useState([]);
  const [isEditingField, setIsEditingField] = useState(false);
  const [softDeletes, setSoftDeletes] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const toggleIsRequired = () => setIsRequired(!isRequired);

  const addCrudFields = (name, data) => {
    let crudFieldMutation = crudFields;

    if (isEditingField) {
      crudFieldMutation[editingIndex] = data;
    } else {
      crudFieldMutation.push(data);
    }
    setCrudFields(crudFieldMutation);
  };

  const removeCrudField = (field) => {
    setCrudFields(crudFields.filter((item) => item.name !== field.name));
  };

  const resetFormModal = () => {
    setIsEditingField(false);
    setErrors(null);
    setFieldName("");
    setFieldType("");
    setDatabaseFieldName("");
    setValidations({});
  };

  const setupModalForEdit = (field) => {
    setEditingIndex(crudFields.indexOf(field));
    setIsEditingField(true);
    setErrors(null);
    setFieldName(field.name);
    setDatabaseFieldName(field.databaseFieldName);
    setFieldType(field.type);
    setValidations(field.validations);
  };

  const buildValidationField = () => {
    if (!fieldType) return;

    const field = fields.find((field) => field.type === fieldType);

    if (!field) return;

    const htmlFields = field.validations.map((validation, i) => {
      if (validation.type === "checkbox") {
        return (
          <div className="flex my-8">
            <input
              key={fieldType + "-" + validation.name + i}
              type="checkbox"
              className="h-6 w-6 rounded border-none bg-indigo-100 mr-4 font-thin"
              name={validation.name}
              onChange={(e) => {
                setValidations({
                  ...validations,
                  [validation.name]: e.target.checked,
                });
              }}
              checked={validations[validation.name]}
            />
            {validation.label}
          </div>
        );
      }
      if (validation.type === "number") {
        return (
          <div className="flex my-8">
            <TextField
              name={validation.name}
              type="number"
              onChange={(value) => {
                setValidations({ ...validations, [validation.name]: value });
              }}
              label={validation.label}
              required={validation.required}
              value={validations[validation.name]}
              max={validation.max ?? ""}
            />
          </div>
        );
      }
      if (validation.type === "text") {
        return (
          <div className="flex my-8">
            <TextField
              name={validation.name}
              type="text"
              onChange={(value) => {
                setValidations({ ...validations, [validation.name]: value });
              }}
              label={validation.label}
              required={validation.required}
              value={validations[validation.name]}
            />
          </div>
        );
      }
    });

    return htmlFields;
  };

  const addField = () => {
    let errors = {};
    if (!databaseFieldName) {
      errors["databaseFieldName"] = "Campo obrigatório";
    }
    if (!fieldName) {
      errors["fieldName"] = "Campo obrigatório";
    }

    if (!fieldType || fieldType === "0") {
      errors["fieldType"] = "Campo obrigatório";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const newField = {
      name: fieldName,
      databaseFieldName: databaseFieldName,
      type: fieldType,
      validations: validations,
    };

    addCrudFields(fieldName, newField);
    setIsOpen(false);
  };

  const SortableItem = SortableElement(({ value }) => {
    return (
      <TableRow>
        <TableData>
          <div className="font-bold">{value.databaseFieldName}</div>
        </TableData>
        <TableData>{value.name}</TableData>
        <TableData>{value.type}</TableData>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => {
              setupModalForEdit(value);
              setIsOpen(true);
            }}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Editar
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => removeCrudField(value)}
            className="text-red-600 hover:text-red-900 cursor-pointer"
          >
            Remover
          </button>
        </td>
      </TableRow>
    );
  });

  const SortableList = SortableContainer(({ items }) => {
    return (
      <TBody>
        <TableRow>
          <TableData>
            <div className="font-bold">id</div>
          </TableData>
          <TableData>ID</TableData>
          <TableData>PRIMARY_KEY</TableData>
          <td className="px-6 py-4 whitespace-nowrap text-right text-gray-200 text-sm font-medium">
            <a href="#" className="text-indigo-200 cursor-not-allowed">
              Editar
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button className="text-red-200 cursor-not-allowed">Remover</button>
          </td>
        </TableRow>
        {_.map(items, (field, index) => (
          <SortableItem
            key={`item-${field.name}`}
            index={index}
            value={field}
          />
        ))}
        <TableRow>
          <TableData>
            <div className="font-bold">created_at</div>
          </TableData>
          <TableData>Criado a</TableData>
          <TableData>Datetime</TableData>
          <td className="px-6 py-4 whitespace-nowrap text-right text-gray-200 text-sm font-medium">
            <a href="#" className="text-indigo-200 cursor-not-allowed">
              Editar
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button className="text-red-200 cursor-not-allowed">Remover</button>
          </td>
        </TableRow>
        <TableRow>
          <TableData>
            <div className="font-bold">updated_at</div>
          </TableData>
          <TableData>Atualizado a</TableData>
          <TableData>Datetime</TableData>
          <td className="px-6 py-4 whitespace-nowrap text-right text-gray-200 text-sm font-medium">
            <a href="#" className="text-indigo-200 cursor-not-allowed">
              Editar
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button className="text-red-200 cursor-not-allowed">Remover</button>
          </td>
        </TableRow>
      </TBody>
    );
  });

  useEffect(() => {
    setLabel(name.replace(/([A-Z])/g, " $1").trim());
  }, [name]);

  return (
    <>
      <Head>
        <title>Tempus | Projects</title>
      </Head>
      <Modal isOpen={isOpen}>
        <ModalHeader>
          <Heading size="h2" weight="bold">
            {isEditingField ? "Editar" : "Novo"} Campo
          </Heading>
        </ModalHeader>
        <ModalBody>
          <div className="grid md:grid-cols-2 gap-8">
            <TextField
              name="fieldName"
              type="text"
              error={errors?.databaseFieldName || null}
              onChange={setDatabaseFieldName}
              value={databaseFieldName}
              label="Coluna na Base de Dados"
              required
            />
            <TextField
              name="fieldName"
              type="text"
              error={errors?.fieldName || null}
              onChange={setFieldName}
              value={fieldName}
              label="Nome do Campo"
              required
            />
            <Select
              name="fieldType"
              error={errors?.fieldType || null}
              onChange={(v) => {
                setFieldType(v);
                setValidations({});
              }}
              label="Tipo de Campo"
              defaultValue={fieldType}
              required
            >
              <option value="0">Selecione uma opção</option>
              {fields.map((field) => (
                <option value={field.type}>{field.label}</option>
              ))}
            </Select>
          </div>
          <div className="my-4">
            <Heading size="h4" weight="normal">
              Validações
            </Heading>
          </div>
          <div className="grid grid-cols-2">{buildValidationField()}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full mt-4 md:w-1/2 lg:w-64 md:mt-0"
            color="primary"
            onClick={() => {
              addField();
            }}
            icon={<FiPlus />}
          >
            Concluido
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
      <ProjectLayoutWrapper user={user} project={project}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-14">
          <Heading size="h2" weight="bold">
            Adicionar CRUD
          </Heading>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <TextField
            name="name"
            type="text"
            value={name}
            error={errors?.name || null}
            onChange={setName}
            label="Nome do Model"
            required
          />
          <TextField
            name="label"
            type="text"
            value={label}
            error={errors?.label || null}
            onChange={setLabel}
            label="Label"
            required
          />
          <div className="checkbox flex">
            <input
              type="checkbox"
              className="h-6 w-6 rounded border-none bg-indigo-100 mr-4 font-thin"
              name="soft_deletes"
              onChange={(e) => setSoftDeletes(e.target.checked)}
            />
            Utilizar soft-deletes
          </div>
        </div>
        <div className="my-8">
          <Heading size="h3" weight="thin">
            Campos
          </Heading>
        </div>

        <Button
          className="w-full mt-4 md:w-1/3 lg:w-48 md:mt-0"
          color="primary"
          onClick={() => {
            setIsOpen(true);
            resetFormModal();
          }}
          icon={<FiPlus />}
        >
          Novo Campo
        </Button>
        <div className="my-8">
          <Table>
            <THead>
              <TableHead>Nome do Campo</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Tipo</TableHead>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only text-red-300">Remover</span>
              </th>
            </THead>
            <SortableList
              items={crudFields}
              onSortEnd={({ oldIndex, newIndex }) => {
                setCrudFields(arrayMove(crudFields, oldIndex, newIndex));
              }}
            />
          </Table>
        </div>
        <div className="grid grid-rows-4"></div>
      </ProjectLayoutWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { user, token } = await getCurrentUser(ctx);
  const { id } = ctx.query;

  const project = await ProjectController.show(token, id);
  const fields = await BuilderController.showFields();

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user: user, token: token, project: project, fields: fields },
  };
}
