import React from "react";

type Props = {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children?: React.ReactNode;
  options: {
    value: string | number;
    label: string | number;
    default?: boolean;
  }[];
};

const Select = (props: Props) => {
  return (
    <select
      onChange={props.onChange}
      className="rounded-xl border-2 border-secondary bg-white py-2 px-4 text-normal focus:border-primary focus:outline-none"
    >
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultChecked={option.default}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
