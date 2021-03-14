import React from "react";
import { ToastContainer } from "react-toastify";
import { User } from "../../@types/user";
import { Header } from "../Header";
import Sidebar from "../Sidebar";
import "react-toastify/dist/ReactToastify.css";

// import { Container } from './styles';
export interface LayoutProps {
  user: User;
}

const LayoutWrapper: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <>
      <Header user={user} />
      <div className="grid grid-cols-12 z-10">
        <Sidebar />
        <div className="col-span-9 lg:col-span-10 p-12">{children}</div>
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

export default LayoutWrapper;
