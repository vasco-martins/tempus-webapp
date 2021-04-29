import React from "react";

// import { Container } from './styles';

const THead: React.FC = ({ children }, className = "") => {
  return (
    <thead className={`bg-gray-200 ${className}`}>
      <tr>{children}</tr>
    </thead>
  );
};

export default THead;
