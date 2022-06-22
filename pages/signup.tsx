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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.identifier && user.password) {
      axios.post("/api/user", user).then((res) => {
        console.log(res.data);
      });
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
          <Button primary>Crea tu cuenta</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
