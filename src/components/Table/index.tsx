import React from "react";

// import { Container } from './styles';

const Table: React.FC = (props: any) => {
  const { children, className, ...otherProps } = props;
  return (
    <table
      className={`min-w-full divide-y divide-gray-200 ${className}`}
      {...otherProps}
    >
      {props.children}
    </table>
  );
};

export default Table;
