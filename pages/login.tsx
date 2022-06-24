import type { NextPage } from "next";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "$components/myInput";
import Form from "$components/Form";
import Button from "$components/Button";
import axios from "axios";
import Router from "next/router";
import { useAppContext } from "$components/context/Context";

type Props = {};

const Login: NextPage = (props: Props) => {
  const [isEmail, setIsEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const { setToken } = useAppContext();

  return (
    <div className="container flex justify-center p-24 text-center">
      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={Yup.object({
          identifier: isEmail
            ? Yup.string()
                .required("Llena este campo")
                .email("El email no es válido")
            : Yup.string()
                .required("Llena este campo")
                .matches(/^[0-9]*$/, "El número no es válido")
                .length(10, "El número debe tener 10 dígitos"),
          password: Yup.string().required("Llena este campo"),
        })}
        onSubmit={(values: any, { setSubmitting }: any) => {
          setLoginError("");
          setIsLoading(true);
          setTimeout(() => {
            axios
              .post("/api/login", values)
              .then((res) => {
                setToken(res.data.id);
                Router.push("/");
              })
              .catch((err) => {
                console.log(err.response.data);
                setLoginError(err.response.data.message);
              })
              .finally(() => {
                setIsLoading(false);
                setSubmitting(false);
              });
          }, 500);
        }}
      >
        {({ values }) => {
          // Todo: esto puede mejorar un poco para que sea con cualquier letra del alfabeto
          if (
            values.identifier.includes("@") ||
            values.identifier.includes(".") ||
            values.identifier.match(/^[a-zA-Z]+$/)
          ) {
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
              <div className="flex flex-col space-y-4 pt-6 text-center">
                {loginError && (
                  <p className="text-red-500" id="login-error">
                    {loginError}
                  </p>
                )}
                <Button
                  id="entrar-a-cuenta"
                  className="grow"
                  type="submit"
                  primary
                >
                  {isLoading ? (
                    <i className="bi bi-three-dots animate-pulse text-lg"></i>
                  ) : (
                    "Iniciar sesión"
                  )}
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
