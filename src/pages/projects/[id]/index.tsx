import * as _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import LayoutWrapper from "../../../components/LayoutWrapper";
import ProjectLayoutWrapper from "../../../components/ProjectLayoutWrapper";
import ProjectController from "../../../controllers/ProjectController";
import getCurrentUser from "../../../helpers/getUser";

export default function Home({ user, token, project }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tempus | Projects</title>
      </Head>
      <ProjectLayoutWrapper user={user} project={project}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 ">
          <Heading size="h2" weight="bold">
            {project.name}
          </Heading>

          <div className="md:flex gap-8">
            <Button
              className="w-full mt-4 md:w-1/3 lg:w-48 md:mt-0"
              color="primary"
              onClick={() => {
                router.push(`${project.id}/new`);
              }}
              icon={<FiPlus />}
            >
              Novo CRUD
            </Button>
            <Button
              className="w-full mt-4 md:w-1/3 lg:w-48 md:mt-0"
              color="success"
              onClick={() => {}}
              icon={<FiCheck />}
            >
              Deploy
            </Button>
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
