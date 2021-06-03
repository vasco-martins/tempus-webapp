import React from "react";
import { ToastContainer } from "react-toastify";
import { User } from "../../@types/user";
import { Header } from "../Header";

import "react-toastify/dist/ReactToastify.css";
import { Project } from "../../@types/project";
import ProjectSidebar from "../ProjectSidebar";

// import { Container } from './styles';
export interface LayoutProps {
  user: User;
  token: string;
  project: Project;
}

const ProjectLayoutWrapper: React.FC<LayoutProps> = ({
  children,
  user,
  token,
  project,
}) => {
  return (
    <>
      <Header user={user} />
      <div className="grid grid-cols-12 z-10">
        <ProjectSidebar project={project} token={token} />
        <div className="col-span-12 md:col-span-9 lg:col-span-10 p-12">
          {children}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ProjectLayoutWrapper;
