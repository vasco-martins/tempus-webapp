import React from "react";

// import { Container } from './styles';

const TableRow: React.FC = ({ children }, className = "") => {
  return <tr className={`bg-emerald-200 ${className}`}>{children}</tr>;
};

export default TableRow;
