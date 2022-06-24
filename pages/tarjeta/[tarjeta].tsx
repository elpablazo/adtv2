import { NextPage } from "next";
import React from "react";
import { GetServerSideProps } from "next";
import prisma from "$lib/prisma";
import { Tarjeta, Transaccion } from "@prisma/client";
import Router from "next/router";
import { currencyFormatter } from "$lib/formatters";

type Props = {
  tarjeta?: Tarjeta | null;
  transacciones?: Transaccion[];
};

const PageTarjeta: NextPage = (props: Props) => {
  if (!props.tarjeta) {
    Router.push("/");
    return <p>404</p>;
  }

  return (
    <div className="flex flex-col space-y-8 text-center">
      <h1 className="text-xl text-dark">{props.tarjeta.nombre}</h1>
      <h2 className="text-lg italic text-dark">{props.tarjeta.tipo}</h2>
      {/* TODO: Se puede mejorar el uso de la función de currencyFormatter */}
      <h3 className="text-lg font-bold italic text-dark">
        {currencyFormatter.format(props.tarjeta.saldo)}
      </h3>

      <div className="table w-full pt-8 text-center">
        <div className="table-header-group">
          <div className="table-row font-bold">
            <div className="table-cell border-2 border-black">Fecha</div>
            <div className="table-cell border-2 border-black">Categoria</div>
            <div className="table-cell border-2 border-black">Concepto</div>
            <div className="table-cell border-2 border-black">Monto</div>
          </div>
        </div>
        <div className="table-row-group">
          {props.transacciones?.map((transaccion) => (
            <div className="group table-row" key={transaccion.id}>
              <div className="table-cell">
                {String(new Date(transaccion.fecha).toLocaleDateString())}
              </div>
              <div className="table-cell">{transaccion.categoria}</div>
              <div className="group table-cell">{transaccion.concepto} </div>
              <div className="table-cell">
                {currencyFormatter.format(transaccion.monto)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id = ctx.params?.tarjeta;
  if (typeof id === "object") id = id[0];
  console.log(
    "Id de la tarjeta mediante params en [tarjeta].tsx----------------------> ",
    id
  );

  let tarjeta;
  let transacciones;

  try {
    tarjeta = await prisma.tarjeta.findUnique({
      where: { id },
    });
    transacciones = await prisma.transaccion.findMany({
      where: { tarjetaId: id },
    });
  } catch (error) {
    console.log(error);
    return {
      props: {
        tarjeta: null,
        transacciones: null,
      },
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: {
      tarjeta: JSON.parse(JSON.stringify(tarjeta)),
      transacciones: JSON.parse(JSON.stringify(transacciones)),
    },
  };
};

export default PageTarjeta;
