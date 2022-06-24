import { useField } from "formik";
import React from "react";
import { Field } from "formik";

type Props = {
  label: string;
  id?: string;
  name: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, ...props }: Props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col space-y-2">
      <label
        className="pl-4 text-left text-dark"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <div className="flex flex-col space-y-1">
        <Field
          className="rounded-xl border-2 border-secondary py-2 px-4 text-normal focus:border-primary focus:outline-none"
          {...field}
          {...props}
        />

        {meta.touched && meta.error ? (
          <div className="pl-4 text-left text-sm text-red-500">
            {meta.error}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
