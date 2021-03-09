import React from "react";

export interface HeadingProps {
  size: size;
  className?: string;
  weight?: weight;
}

export const sizes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export const weights = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const;

export type size = typeof sizes[number];
export type weight = typeof weights[number];

export const Heading: React.FC<HeadingProps> = ({
  size,
  children,
  className,
  weight = "bold",
}) => {
  const classNames = {
    h1: "text-5xl",
    h2: "text-4xl",
    h3: "text-3xl",
    h4: "text-2xl",
    h5: "text-xl",
    h6: "text-large",
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  return (
    <span
      className={classNames[size] + " " + classNames[weight] + " " + className}
    >
      {children}
    </span>
  );
};
