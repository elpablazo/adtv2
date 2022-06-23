import React from "react";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email";
  id?: string;
};

const Input = (props: Props) => {
  if (props.type === "password")
    return (
      <input
        id={props.id}
        type="password"
        onChange={props.onChange}
        className="rounded-xl border-2 border-secondary py-2 px-4 text-normal focus:border-primary focus:outline-none"
        placeholder={props.placeholder || "Llena el campo"}
      />
    );
  return (
    <input
      id={props.id}
      type="text"
      onChange={props.onChange}
      className="rounded-xl border-2 border-secondary py-2 px-4 text-normal focus:border-primary focus:outline-none"
      placeholder={props.placeholder || "Llena el campo"}
    />
  );
};

export default Input;
