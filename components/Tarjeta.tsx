import React from "react";

type Props = {
  nombre: string;
  saldo: number;
  tipo: "Credito" | "Debito";
  fechaDeCorte: string;
  // TODO: Añadir gradientes
  color: string;
};

const Tarjeta = (props: Props) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <div
      className={`h-40 w-auto max-w-xs grow space-y-2 rounded-xl border-1 border-slate-300 drop-shadow-lg ${props.color} flex flex-col justify-between px-6 py-4 text-white`}
    >
      <div className="flex justify-between">
        <p className="font-bold">{props.nombre}</p>
        <p className="italic">
          {props.tipo === "Credito" ? "Crédito" : "Débito"}
        </p>
      </div>

      <p className="text-center text-lg font-bold">
        {currencyFormatter.format(props.saldo)}
      </p>

      <p className="text-right">Corte {props.fechaDeCorte}</p>
    </div>
  );
};

export default Tarjeta;
