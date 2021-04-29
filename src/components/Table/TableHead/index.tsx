import React from "react";

// import { Container } from './styles';

const TableHead: React.FC = (props: any) => {
  const { children, className, ...otherProps } = props;
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
      {...otherProps}
    >
      {children}
    </th>
  );
};

export default TableHead;
