import AddOrEdit from "../../../../../components/Crud/AddOrEdit";
import BuilderController from "../../../../../controllers/BuilderController";
import CrudController from "../../../../../controllers/CrudController";
import ProjectController from "../../../../../controllers/ProjectController";
import getCurrentUser from "../../../../../helpers/getUser";

export default AddOrEdit;

export async function getServerSideProps(ctx) {
  const { user, token } = await getCurrentUser(ctx);
  const { id, mid } = ctx.query;

  const project = await ProjectController.show(token, id);
  const fields = await BuilderController.showFields();
  const modelNames = await BuilderController.getModelNames(token, project.id);
  const parentMenuNames = await BuilderController.getParentMenuNames(
    token,
    project.id
  );
  const projectModel = await CrudController.showCrud(mid, token);

  if (!project || !projectModel) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: user,
      token: token,
      project: project,
      fields: fields,
      modelNames: modelNames,
      parentMenuNames: parentMenuNames,
      projectModel: projectModel,
    },
  };
}
