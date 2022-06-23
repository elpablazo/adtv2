import Button from "$components/Button";
import Input from "$components/Input";
import React from "react";
import { User } from "@prisma/client";
import axios from "axios";

type Props = {};

const Signup = (props: Props) => {
  const [user, setUser] = React.useState<any>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ ...errors, form: undefined });
    if (user.identifier && user.password) {
      setLoading(true);
      setTimeout(() => {
        axios
          .post("/api/user", user)
          .then((res) => {
            // Todo: esto debe ser un token, no el id de usuario
            localStorage.setItem("token", res.data.id);
          })
          .catch((err) => {
            if (err.response.status === 409)
              setErrors({ ...errors, form: "El usuario ya está registrado" });
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500);
    }
  };

  return (
    <div className="mx-auto flex w-full items-center justify-center p-16 lg:p-24">
      <div className="container flex flex-col content-center items-center space-y-8 rounded-xl border-2 border-decorator p-8 text-center">
        <h1 className="text-2xl text-dark lg:text-3xl">Crea una cuenta</h1>
        <form
          className="flex flex-col space-y-8 lg:w-1/2"
          onSubmit={submitHandler}
        >
          <Input
            placeholder="Correo o Teléfono"
            onChange={(e) => setUser({ ...user, identifier: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <div className="flex flex-col space-y-4">
            <Button primary>
              {loading ? (
                <i className="bi bi-three-dots animate-pulse text-lg" />
              ) : (
                "Crea tu cuenta"
              )}
            </Button>
            {errors.form && <p className="text-red-500">{errors.form}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
