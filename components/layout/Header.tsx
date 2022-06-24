import React from "react";
import gsap from "gsap";
import Button from "$components/Button";
import { useRouter } from "next/router";
import { useAppContext } from "$components/context/Context";
import Link from "next/link";

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
      <div className="space-x-4 lg:flex">
        {token ? (
          <Button
            type="button"
            id="cerrar-sesion"
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
            <Link href="/signup">
              <Button type="button" id="crear-cuenta" size="sm" primary>
                Crear cuenta
              </Button>
            </Link>
            <Link href="/login">
              <Button type="button" id="iniciar-sesion" size="sm">
                Iniciar sesión
              </Button>
            </Link>
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;
