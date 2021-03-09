import React from "react";
import Logo from "../../assets/square-logo.svg";

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  error?: string;
  onChange: (val: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({ onChange, ...rest }) => {
  const classes = `font-bold focus:border-light-blue-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
  border-0 py-2 container rounded px-4 my-4 ${
    rest.error ? "bg-red-100" : "bg-indigo-50"
  }`;

  return (
    <div className="flex flex-col">
      {rest.label && (
        <label className="font-thin text-xl" htmlFor={rest.name || ""}>
          {rest.label}
        </label>
      )}
      <input
        className={classes}
        onChange={({ target: { value } }) => onChange(value)}
        {...rest}
      />
      {rest.error && <p className="font-light text-red-500">{rest.error}</p>}
    </div>
  );
};
