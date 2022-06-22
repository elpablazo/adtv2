import React from "react";
import gsap from "gsap";
import Button from "$components/Button";
import { useRouter } from "next/router";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <i className="bi bi-list text-4xl text-decorator lg:hidden"></i>
      <div className="hidden space-x-4 lg:flex">
        <Button size="sm" onClick={() => router.push("/signup")} primary>
          Crear cuenta
        </Button>
        <Button size="sm" onClick={() => router.push("/signup")}>
          Iniciar sesión
        </Button>
      </div>
    </header>
  );
};

export default Header;
