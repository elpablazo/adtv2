import React from "react";

type Props = {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children?: React.ReactNode;
  options: {
    value: string | number;
    label: string | number;
    default?: boolean;
  }[];
  id: string;
};

const Select = (props: Props) => {
  return (
    <select
      id={props.id}
      onChange={props.onChange}
      placeholder="Selecciona una opción"
      className="rounded-xl border-2 border-secondary bg-white py-2 px-4 text-normal focus:border-primary focus:outline-none"
    >
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.default}
          disabled={option.default}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
