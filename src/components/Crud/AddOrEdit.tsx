import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import * as _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import CrudController from "../../controllers/CrudController";
import { Button } from "../Button";
import Select from "../Forms/Select";
import { TextField } from "../Forms/TextField";
import { Heading } from "../Heading";
import Modal from "../Modal";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import ProjectLayoutWrapper from "../ProjectLayoutWrapper";
import Table from "../Table";
import TableData from "../Table/TableData";
import TableHead from "../Table/TableHead";
import TableRow from "../Table/TableRow";
import TBody from "../Table/TBody";
import THead from "../Table/THead";

export default function AddOrEdit({
  user,
  token,
  project,
  fields,
  modelNames,
  parentMenuNames,
  projectModel,
  projectModelList,
  projectModelFieldList,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [labelError, setLabelError] = useState(null);
  const [label, setLabel] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [isSearchable, setIsSearchable] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [databaseFieldName, setDatabaseFieldName] = useState("");
  const [databaseFieldNameError, setDatabaseFieldNameError] = useState(null);
  const [isRequired, setIsRequired] = useState(false);
  const [validations, setValidations] = useState({});
  const [crudFields, setCrudFields] = useState([]);
  const [isEditingField, setIsEditingField] = useState(false);
  const [softDeletes, setSoftDeletes] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [parentMenu, setParentMenu] = useState(null);

  const [selectKey, setSelectKey] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectFields, setSelectFields] = useState([]);
  const [selectKeyError, setSelectKeyError] = useState("");

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

  const getParentOptions = () => {
    let parents = [];

    for (const index in parentMenuNames) {
      parents.push({
        id: index,
        value: parentMenuNames[index],
      });
    }

    return parents;
  };

  const submit = async () => {
    if (!name || !label) return;
    setIsLoading(true);
    setSuccess(false);
    const response = await CrudController.addOrEdit(
      name,
      label,
      softDeletes,
      crudFields,
      project.id,
      token,
      parentMenu,
      projectModel
    );

    if (response) {
      setSuccess(true);
      router.replace({
        pathname: "/projects/[id]",
        query: { id: project.id },
      });
      return;
    }

    setSuccess(false);
  };

  const addSelectFields = (name, data) => {
    setSelectKeyError("");
    if (!selectKey || !selectValue) return;
    if (selectFields.some((e) => e.name === data.name)) {
      setSelectKeyError("A chave já existe");
      return;
    }
    setSelectKey("");
    setSelectValue("");
    const selectFieldMutation = selectFields;

    selectFieldMutation.push(data);
    setSelectFields(selectFieldMutation);
    setValidations({ ...validations, values: selectFieldMutation });
    console.log(validations);
  };

  const removeSelectField = (data) => {
    setSelectFields(selectFields.filter((item) => item.name !== data.name));
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
    setDatabaseFieldNameError(null);
    setValidations({});
    setSelectFields([]);
    setSelectKey("");
    setSelectValue("");
  };

  const setupModalForEdit = (field) => {
    setEditingIndex(crudFields.indexOf(field));
    setIsEditingField(true);
    setErrors(null);
    setFieldName(field.name);
    setDatabaseFieldNameError(null);
    setDatabaseFieldName(field.databaseFieldName);
    setFieldType(field.type);
    setValidations(field.validations);
    console.log(field.validations);
    if (field.type === "select") {
      setSelectFields(field.validations["values"]);
    }
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
      if (validation.type === "select") {
        return (
          <div className="col-span-2">
            <h2 className="text-xl mb-3">{validation.label}</h2>

            <div className="flex gap-8 items-start mb-8">
              <TextField
                name="fieldName"
                type="text"
                error={selectKeyError || ""}
                onChange={setSelectKey}
                value={selectKey}
                label="Valor"
                required
              />
              <TextField
                name="fieldName"
                type="text"
                onChange={setSelectValue}
                value={selectValue}
                label="Label"
                required
              />
              <Button
                className=" my-auto"
                color="primary"
                onClick={() => {
                  addSelectFields(validation.name, {
                    name: selectKey,
                    label: selectValue,
                  });
                  console.log(selectFields);
                }}
                icon={<FiPlus />}
              ></Button>
            </div>
            <Table>
              <THead>
                <TableHead>Chave</TableHead>
                <TableHead>Valor</TableHead>

                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only text-red-300">Remover</span>
                </th>
              </THead>
              <SortableSelectList
                items={selectFields}
                onSortEnd={({ oldIndex, newIndex }) => {
                  setSelectFields(arrayMove(selectFields, oldIndex, newIndex));
                }}
              />
            </Table>
          </div>
        );
      }

      if (validation.type === "crudSelect") {
        return (
          <div className="mx-2">
            <Select
              name="crudSelect"
              error={errors?.crudSelect || null}
              onChange={(v) => {
                if (v != "0") {
                  setValidations({
                    ...validations,
                    ["field"]: Object.values(projectModelFieldList[v])[0],
                  });
                  setValidations({ ...validations, [validation.name]: v });
                }
              }}
              label={validation.label}
              value={validations[validation.name]}
            >
              <option value="0">Selecione uma opção</option>

              {Object.keys(projectModelList).map((field, index) => {
                if (!projectModel || projectModel.id != field) {
                  return (
                    <option value={field}>{projectModelList[field]}</option>
                  );
                }
              })}
            </Select>
          </div>
        );
      }

      if (validation.type === "fieldSelect") {
        return (
          <div className="mx-2">
            <Select
              name="fieldSelect"
              error={errors?.fieldSelect || null}
              onChange={(v) => {
                setValidations({ ...validations, [validation.name]: v });
                console.log(validations);
              }}
              label={validation.label}
              value={validations[validation.name]}
            >
              <option value="0">Selecione uma opção</option>
              {Object.keys(
                projectModelFieldList[validations["crud"]] ?? {}
              ).map((field, index) => {
                return (
                  <option value={field}>
                    {
                      projectModelFieldList[
                        validations["crud"] ?? Object.keys(projectModelList)[0]
                      ][field]
                    }
                  </option>
                );
              })}
            </Select>
          </div>
        );
      }
    });

    return htmlFields;
  };

  const addField = () => {
    let errors = {};
    if (databaseFieldNameError) return;
    if (!databaseFieldName) {
      errors["databaseFieldName"] = "Campo obrigatório";
      setDatabaseFieldNameError("Campo obrigatório");
    }
    if (!fieldName) {
      errors["fieldName"] = "Campo obrigatório";
    }

    if (!fieldType || fieldType === "0") {
      errors["fieldType"] = "Campo obrigatório";
    }

    if (fieldType === "belongsTo") {
      if (!validations["crud"] || validations["crud"] === 0) {
        errors["crudSelect"] = "Campo obrigatório";
      }

      if (!validations["field"] || validations["field"] === 0) {
        errors["fieldSelect"] = "Campo obrigatório";
      }
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

  const SortableSelectField = SortableElement(({ value }) => {
    return (
      <TableRow>
        <TableData>{value.name}</TableData>
        <TableData>{value.label}</TableData>

        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => {
              removeSelectField(value);
            }}
            className="text-red-600 hover:text-red-900 cursor-pointer"
          >
            Remover
          </button>
        </td>
      </TableRow>
    );
  });

  const SortableSelectList = SortableContainer(({ items }) => {
    return (
      <TBody>
        {_.map(items, (field, index) => (
          <SortableSelectField
            key={`item-${field.name}`}
            index={index}
            value={field}
          />
        ))}
      </TBody>
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
    setLabelError(null);

    if (label.length > 12) {
      setLabelError("O título do menu deve ter, no máximo, 12 carateres");
    }
  }, [label]);

  useEffect(() => {
    let newName = name;

    newName = (newName.charAt(0).toUpperCase() + name.slice(1)).replace(
      /[^A-Z0-9]/gi,
      ""
    );

    setName(newName);
    setLabel(name.replace(/([A-Z])/g, " $1").trim());
    setNameError(null);
    setLabelError(null);

    if (name.length > 0 && name.length < 3) {
      setNameError("O nome do model deve ter, pelo menos, 3 carateres");
    }

    if (name.length > 12) {
      setNameError("O nome do model deve ter, no máximo, 12 carateres");
    }

    if (label.length > 12) {
      setLabelError("O título do menu deve ter, no máximo, 12 carateres");
    }

    const search = modelNames.find(
      (key) => key.toUpperCase() === name.toUpperCase()
    );
    if (search != undefined) {
      if (!projectModel) {
        setNameError("Model já existente");
      }
      if (projectModel && search !== projectModel.name) {
        setNameError("Model já existente");
      }
    }
  }, [name]);

  useEffect(() => {
    setDatabaseFieldName(databaseFieldName.replace(/[^A-Z0-9_]/gi, ""));
    setDatabaseFieldNameError(null);
    const defaultFields = ["id", "created_at", "updated_at"];

    if (!isEditingField) {
      if (
        crudFields.find(
          (key) =>
            key.databaseFieldName.toUpperCase() ===
            databaseFieldName.toUpperCase()
        ) != undefined ||
        defaultFields.indexOf(databaseFieldName) > -1
      ) {
        setDatabaseFieldNameError("Coluna já existente");
      }
    } else {
      if (
        crudFields.find(
          (key, index) =>
            key.databaseFieldName.toUpperCase() ===
              databaseFieldName.toUpperCase() && index !== editingIndex
        ) != undefined ||
        defaultFields.indexOf(databaseFieldName) > -1
      ) {
        setDatabaseFieldNameError("Coluna já existente");
      }
    }
  }, [databaseFieldName]);

  useEffect(() => {
    if (!projectModel || name) return;

    setName(projectModel.name);
    setLabel(projectModel.label);

    if (projectModel.project_model_id) {
      setParentMenu(projectModel.project_model_id);
    }

    let fieldIndex: any = null;
    let validation: any = null;
    for (fieldIndex in projectModel.fields) {
      let validations = {};

      for (validation in projectModel.fields[fieldIndex].validations) {
        validations = {
          ...validations,
          [projectModel.fields[fieldIndex].validations[validation].name]:
            projectModel.fields[fieldIndex].validations[validation].value,
        };
      }

      const newField = {
        name: projectModel.fields[fieldIndex].label,
        databaseFieldName: projectModel.fields[fieldIndex].database_name,
        type: projectModel.fields[fieldIndex].type,
        validations: validations,
      };
      //console.log(newField);
      addCrudFields(projectModel.fields[fieldIndex].label, newField);
    }
  }, []);

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
              error={databaseFieldNameError || null}
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
              Opções Extra
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
      <ProjectLayoutWrapper user={user} project={project} token={token}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-14">
          <Heading size="h2" weight="bold">
            {projectModel ? "Editar" : "Adicionar"} CRUD
          </Heading>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <TextField
            name="name"
            type="text"
            value={name}
            error={nameError || null}
            onChange={async (value) => {
              setName(value);
            }}
            label="Nome do Model"
            required
          />
          <TextField
            name="label"
            type="text"
            value={label}
            error={labelError || null}
            onChange={setLabel}
            label="Título no Menu"
            required
          />
          <Select
            name="fieldType"
            error={errors?.parentMenu || null}
            onChange={setParentMenu}
            label="Menu Pai"
            defaultValue={projectModel ? projectModel.project_model_id : null}
          >
            <option value="">Selecione uma opção</option>
            {getParentOptions().map((item) => (
              <option value={item.id}>{item.value}</option>
            ))}
          </Select>
          <div className="div"></div>
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
        <Button
          className="w-full mt-4 md:w-1/3 lg:w-48 md:mt-0"
          onClick={submit}
          loading={isLoading}
          color={success ? "success" : "primary"}
          disabled={
            name.length < 3 ||
            label.length === 0 ||
            label.length > 12 ||
            name.length > 12 ||
            nameError
          }
        >
          Guardar
        </Button>
      </ProjectLayoutWrapper>
    </>
  );
}
