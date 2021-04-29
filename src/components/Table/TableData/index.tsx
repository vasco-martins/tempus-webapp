import React from "react";

// import { Container } from './styles';

const TableData: React.FC = (props: any) => {
  const { children, className, ...otherProps } = props;

  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div
        className={`text-sm font-medium text-gray-900 ${className}`}
        {...otherProps}
      >
        {children}
      </div>
    </td>
  );
};

export default TableData;
