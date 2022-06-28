import { NextPage } from "next";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "$lib/prisma";
import { Tarjeta, Transaccion } from "@prisma/client";
import Router from "next/router";
import { currencyFormatter } from "$lib/formatters";
import { Formik, Form } from "formik";
import Input from "$components/myInput";
import * as Yup from "yup";
import Button from "$components/Button";
import axios from "axios";
import Radio from "$components/Radio";

type Props = {
  idTarjeta?: string;
  tarjeta?: Tarjeta | null;
  transacciones?: Transaccion[];
};

const PageTarjeta: NextPage = (props: Props) => {
  const [showAgregarTransaccion, setShowAgregarTransaccion] = useState(false);
  const [transacciones, setTransacciones] = useState(props.transacciones);
  const date = new Date().toISOString().split("T")[0];

  const handleEliminarTransaccion = (id: string) => {
    axios
      .delete("/api/transaccion", {
        data: {
          id,
          tarjetaId: props.idTarjeta,
        },
      })
      .then((res) => {
        setTransacciones(res.data);
      });
  };

  if (!props.tarjeta) {
    Router.push("/");
    return <p>404</p>;
  }

  return (
    <div className="flex flex-col space-y-8 p-8 text-center">
      <h1 className="text-xl text-dark">{props.tarjeta.nombre}</h1>
      <h2 className="text-lg italic text-dark">{props.tarjeta.tipo}</h2>
      {/* TODO: Se puede mejorar el uso de la función de currencyFormatter */}
      <h3 className="text-lg font-bold italic text-dark">
        {currencyFormatter.format(props.tarjeta.saldo)}
      </h3>

      {showAgregarTransaccion && (
        <div className="sticky z-10 h-full w-full bg-opacity-50">
          <div
            className="fixed inset-0 mx-auto my-auto  h-min w-5/6 overflow-y-auto rounded-lg bg-white drop-shadow-xl"
            id="my-modal"
          >
            <div className="relative mx-auto flex w-full flex-col items-center justify-center p-16 lg:p-24">
              <i
                className="bi bi-x-square-fill absolute top-4 left-4 cursor-pointer text-red-300 transition-all hover:text-red-500"
                onClick={() => setShowAgregarTransaccion(false)}
              ></i>
              <Formik
                initialValues={{
                  fecha: date,
                  categoria: "",
                  concepto: "",
                  monto: "",
                  tipoDeTransaccion: "",
                }}
                validationSchema={Yup.object({
                  fecha: Yup.string().required("Llena este campo"),
                  categoria: Yup.string().required("Llena este campo"),
                  // TODO: Validación numérica
                  monto: Yup.string().required("Llena este campo"),
                  tipoDeTransaccion: Yup.string().required(
                    "Selecciona una opción"
                  ),
                })}
                onSubmit={(values: any, { setSubmitting }: any) => {
                  setTimeout(() => {
                    axios
                      .post("/api/transaccion", {
                        fecha: new Date(values.fecha),
                        categoria: values.categoria,
                        concepto: values.concepto,
                        monto: parseFloat(
                          values.tipoDeTransaccion === "ingreso"
                            ? values.monto
                            : -values.monto
                        ),
                        tarjeta: props.idTarjeta,
                      })
                      .then((res) => {
                        setTransacciones(res.data);
                        setShowAgregarTransaccion(false);
                      });
                    setSubmitting(false);
                  }, 500);
                }}
              >
                {({ isSubmitting, errors }) => {
                  return (
                    <Form className="border-rounded-lg flex w-full flex-col justify-center space-x-4 space-y-4 border-2 border-decorator py-4 px-4 text-center">
                      <h2 className="text-center text-xl text-dark">
                        Añade una transacción
                      </h2>
                      <div className="grow">
                        <Input
                          name="fecha"
                          label="Fecha"
                          type="date"
                          required
                        />
                      </div>
                      <div className="grow">
                        <Input
                          name="categoria"
                          label="Categoría"
                          type="text"
                          placeholder="Supermercado"
                          required
                        />
                      </div>
                      <div className="grow">
                        <Input
                          name="concepto"
                          label="Concepto"
                          type="text"
                          placeholder="SORIANAMEX 452457"
                        />
                      </div>
                      <div className="grow">
                        <Input
                          name="monto"
                          label="Monto"
                          type="text"
                          required
                        />
                      </div>
                      <div className="flex w-full flex-col space-y-4">
                        <label className="pl-4 text-left text-dark">
                          Tipo de transacción
                        </label>
                        <div
                          className="flex w-full grow flex-row justify-around pb-4"
                          role="group"
                        >
                          <Radio
                            content="Gasto"
                            name="tipoDeTransaccion"
                            value="gasto"
                            id="transaccion-gasto"
                          />
                          <Radio
                            content="Ingreso"
                            name="tipoDeTransaccion"
                            value="ingreso"
                            id="transaccion-ingreso"
                          />
                        </div>
                        {errors.tipoDeTransaccion && (
                          <div className="text-sm text-red-500">
                            {errors.tipoDeTransaccion}
                          </div>
                        )}
                      </div>
                      <div className="flex w-full grow pt-6 pb-4 pr-4 md:pt-0">
                        <Button className="w-max grow" type="submit" primary>
                          {isSubmitting ? (
                            <i className="bi bi-three-dots animate-pulse text-lg"></i>
                          ) : (
                            "Añadir"
                          )}
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}

      <Button type="button" onClick={() => setShowAgregarTransaccion(true)}>
        Agrega una nueva transacción
      </Button>

      <div className="space-y-8 rounded-lg border-2 border-decorator px-8 pt-4 pb-8 text-center">
        <h2 className="text-xl text-dark">Transacciones</h2>
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row font-bold">
              <div className="table-cell border-b-2 border-b-slate-800">
                Fecha
              </div>
              <div className="table-cell border-b-2 border-b-slate-800">
                Categoría
              </div>
              <div className="table-cell border-b-2 border-b-slate-800">
                Concepto
              </div>
              <div className="table-cell border-b-2 border-b-slate-800">
                Monto
              </div>
              <div className="table-cell border-b-2 border-b-slate-800">
                Eliminar
              </div>
            </div>
          </div>
          <div className="table-row-group">
            {transacciones &&
              transacciones?.map((transaccion) => (
                <div
                  className="group table-row hover:bg-slate-200"
                  key={transaccion.id}
                >
                  <div className="table-cell">
                    {String(new Date(transaccion.fecha).toLocaleDateString())}
                  </div>
                  <div className="table-cell">{transaccion.categoria}</div>
                  <div className="group table-cell">
                    {transaccion.concepto}{" "}
                  </div>
                  <div className="table-cell">
                    {currencyFormatter.format(transaccion.monto)}
                  </div>
                  <div className="table-cell">
                    <i
                      className="bi bi-trash cursor-pointer text-red-500 transition-all hover:text-red-800"
                      onClick={() => handleEliminarTransaccion(transaccion.id)}
                    ></i>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let id = ctx.params?.tarjeta;
  if (typeof id === "object") id = id[0];

  let tarjeta;
  let transacciones;

  try {
    tarjeta = await prisma.tarjeta.findUnique({
      where: { id },
    });
    transacciones = await prisma.transaccion.findMany({
      orderBy: { fecha: "desc" },
      where: { tarjetaId: id },
    });
  } catch (error) {
    console.log(error);
    return {
      props: {
        tarjeta: null,
        transacciones: null,
        idTarjeta: id,
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
      idTarjeta: id,
    },
  };
};

export default PageTarjeta;
