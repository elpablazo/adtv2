import React from "react";

type Props = {
  nombre: string;
  saldo: number;
  tipo: "credito" | "debito";
  fechaDeCorte: string;
  color:
    | "bg-primary-dark"
    | "bg-secondary-dark"
    | "bg-decorator"
    | "bg-emerald-500";
};

const Tarjeta = (props: Props) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <div
      className={`h-40 max-w-xs space-y-2 rounded-xl border-1 border-slate-300 drop-shadow-lg ${props.color} flex flex-col justify-between px-6 py-4 text-white`}
    >
      <div className="flex justify-between">
        <p className="font-bold">{props.nombre}</p>
        <p>{props.tipo === "credito" ? "Crédito" : "Débito"}</p>
      </div>

      <p className="text-center">{currencyFormatter.format(props.saldo)}</p>

      <p className="text-right">Corte {props.fechaDeCorte}</p>
    </div>
  );
};

export default Tarjeta;
