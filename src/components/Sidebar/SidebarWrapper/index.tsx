import React from "react";

// import { Container } from './styles';

const SidebarWrapper: React.FC = ({ children }) => {
  return (
    <div className="hidden md:block col-span-3 lg:col-span-2 sticky h-(screen-20) z-10 shadow-inner	 bg-sidebar overflow-y-auto">
      <div className="grid grid-flow-row gap-8 p-12">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
