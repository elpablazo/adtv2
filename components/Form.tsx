import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import React, { FormEvent } from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const FormComponent = (props: Props) => {
  return (
    <Form className="container flex max-w-xl flex-col space-y-6 rounded-lg border-2 border-decorator p-6 md:space-y-4 md:p-8 lg:px-12">
      {props.title && (
        <h2 className="text-center text-xl text-dark">{props.title}</h2>
      )}
      {props.children}
    </Form>
  );
};

export default FormComponent;
