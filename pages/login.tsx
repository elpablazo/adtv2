import type { NextPage } from "next";
import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "$components/myInput";
import Form from "$components/Form";
import Button from "$components/Button";

type Props = {};

const Login: NextPage = (props: Props) => {
  const [isEmail, setIsEmail] = React.useState(false);
  return (
    <div className="container flex justify-center p-24 text-center">
      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={Yup.object({
          identifier: isEmail
            ? Yup.string()
                .required("Llena este campo")
                .email("Escribe un email válido")
            : Yup.string()
                .required("Llena este campo")
                .matches(/^\d+${10}/, "Escribe un número de teléfono válido"),
          password: Yup.string().required("Llena este campo"),
        })}
        onSubmit={(values: any, { setSubmitting }: any) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values }) => {
          // Todo: esto puede mejorar un poco para que sea con cualquier letra del alfabeto
          if (values.identifier.includes("@")) {
            setIsEmail(true);
          } else {
            setIsEmail(false);
          }

          return (
            <Form title="Entra a tu cuenta">
              <Input
                label="Correo o número de teléfono"
                name="identifier"
                type="text"
              />
              <Input label="Contraseña" name="password" type="password" />
              <div className="flex pt-6 text-center">
                <Button id="iniciar-sesion" className="grow" primary>
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
