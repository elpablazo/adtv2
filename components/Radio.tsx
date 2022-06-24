import { useField } from "formik";
import React from "react";
import { Field } from "formik";

type Props = {
  content: string;
  value: string;
  id?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ id, ...props }: Props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  return (
    <label id={id}>
      <Field type="radio" {...props} />
      {props.content}
    </label>
  );
};

export default Input;
