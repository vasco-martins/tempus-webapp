import React from "react";
import { User } from "../../@types/user";
import { Header } from "../Header";
import Sidebar from "../Sidebar";

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
    </>
  );
};

export default LayoutWrapper;
