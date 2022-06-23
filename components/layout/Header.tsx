import React from "react";
import gsap from "gsap";
import Button from "$components/Button";
import { useRouter } from "next/router";
import { useAppContext } from "$components/context/Context";

type Props = {};

const Header = (props: Props) => {
  const { token, setToken } = useAppContext();
  const router = useRouter();

  return (
    <header
      className={`flex items-center ${
        token ? "justify-end" : "justify-between"
      } px-4 py-4`}
    >
      <i className="bi bi-list text-4xl text-decorator lg:hidden"></i>
      <div className="hidden space-x-4 lg:flex">
        {token ? (
          <Button
            size="sm"
            onClick={() => {
              setToken(undefined);
              router.push("/");
            }}
            primary
          >
            Cerrar sesión
          </Button>
        ) : (
          <React.Fragment>
            <Button size="sm" onClick={() => router.push("/signup")} primary>
              Crear cuenta
            </Button>
            <Button size="sm" onClick={() => router.push("/")}>
              Iniciar sesión
            </Button>
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;
