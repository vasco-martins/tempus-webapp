import React from "react";
import Loading from "../../assets/loading.svg";

// import { Container } from './styles';
export interface ButtonProps {
  //label: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  color: colors;
  icon?: Object;
  onClick: (e) => void;
}

export const buttonColors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
] as const;
export type colors = typeof buttonColors[number];

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
  onClick,
  className,
  icon,
  loading = false,
  disabled = false,
}) => {
  const classes = `
  bg-${color}${disabled ? "-disabled cursor-not-allowed	" : ""}
   hover:bg-${color + (disabled ? "-disabled" : "-hover")}
  focus:ring-2 focus:ring-${color} focus:ring-opacity-75
  py-2 px-4 rounded text-white ${className || ""}
   text-center h-10`;

  return (
    <button
      className={classes}
      onClick={disabled || loading ? () => {} : onClick}
    >
      {loading ? (
        <Loading style={{ margin: "-10px auto" }} />
      ) : icon ? (
        <div className="flex items-center gap-4">
          {icon}
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
