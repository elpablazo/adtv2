import { NextPage } from "next";
import React from "react";
import { GetServerSideProps } from "next";
import prisma from "$lib/prisma";
import { Tarjeta } from "@prisma/client";

type Props = {
  tarjeta?: Tarjeta | null;
};

const PageTarjeta: NextPage = (props: Props) => {
  return <div className="text-center">{props.tarjeta?.nombre}</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id = ctx.params?.tarjeta;
  if (typeof id === "object") id = id[0];
  console.log("Id de la tarjeta mediante params: ", id);

  let tarjeta;

  try {
    tarjeta = await prisma.tarjeta.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return {
      props: {
        tarjeta: null,
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
    },
  };
};

export default PageTarjeta;
