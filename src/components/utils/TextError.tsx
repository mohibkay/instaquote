import React from "react";

interface Props {
  children: React.ReactChildren;
}

const TextError = ({ children }: Props) => {
  return <p className="text-red-primary -mt-1 mb-2">{children}</p>;
};

export default TextError;
