import Button from "$components/Button";
import Input from "$components/Input";
import React from "react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="mx-auto flex w-full items-center justify-center p-16 lg:p-24">
      <div className="container flex flex-col content-center items-center space-y-8 rounded-xl border-2 border-decorator p-8 text-center">
        <h1 className="text-2xl text-dark lg:text-3xl">Crea una cuenta</h1>
        <div className="flex flex-col space-y-8 lg:w-1/2">
          <Input
            placeholder="Correo"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <Button primary>Crea tu cuenta</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
