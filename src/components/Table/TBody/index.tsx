import React from "react";

// import { Container } from './styles';

const TBody: React.FC = ({ children }, className = "") => {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

export default TBody;
