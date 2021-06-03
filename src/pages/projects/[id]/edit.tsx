import ProjectController from "../../../controllers/ProjectController";
import getCurrentUser from "../../../helpers/getUser";
import AddOrEdit from "./new";

export default AddOrEdit;

export async function getServerSideProps(ctx) {
  const { user, token } = await getCurrentUser(ctx);
  const { id } = ctx.query;

  const project = await ProjectController.show(token, id);
  // const projectModel = await CrudController.showCrud(token, mid);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: user,
      token: token,
      project: project,
    },
  };
}
