import Button from "$components/Button";
import { useAppContext } from "$components/context/Context";
import Input from "$components/Input";
import Select from "$components/Select";
import { Tarjeta } from "@prisma/client";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";

const Home: NextPage = () => {
  const [newTarjeta, setNewTarjeta] = useState<any>();
  const { token } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [showAgregarTarjeta, setShowAgregarTarjeta] = useState(false);

  useEffect(() => {
    if (tarjetas.length === 0) {
      setShowAgregarTarjeta(true);
    } else {
      setShowAgregarTarjeta(false);
    }
  }, [tarjetas]);

  useEffect(() => {
    console.log(showAgregarTarjeta);
  }, [showAgregarTarjeta]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let tarjeta = newTarjeta;
    tarjeta.usuarioId = token;
    if (newTarjeta.tipo === "debito") {
      delete tarjeta["credito"];
    } else {
      delete tarjeta["debito"];
    }

    setNewTarjeta(tarjeta);

    console.log(newTarjeta, tarjeta);

    setIsLoading(true);
    setTimeout(() => {
      axios
        .post("/api/tarjeta", tarjeta)
        .then((res) => {
          console.log(res.data);
          setTarjetas([...tarjetas, res.data]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);
  };

  if (!token) return <div>No token</div>;

  return (
    <div>
      <Head>
        <title>Tu dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {tarjetas.map((tarjeta) => (
        <div
          className="border-rounded-lg border-2 border-decorator"
          key={tarjeta.id}
        >
          <p>Nombre: {tarjeta.nombre}</p>
          <p>Tipo: {tarjeta.tipo === "Debito" ? "Débito" : "Crédito"}</p>
          <p>Saldo: {tarjeta.saldo}</p>
        </div>
      ))}
      {showAgregarTarjeta ? (
        <div className="m-auto mx-auto flex flex-col items-center space-y-8">
          <h1 className="text-2xl text-dark lg:text-3xl">
            Agrega una nueva tarjeta
          </h1>

          <form
            className="flex flex-col space-y-4 lg:w-1/2"
            onSubmit={submitHandler}
          >
            <div className="grid grid-cols-2 gap-4">
              <Select
                id="tipo"
                options={[
                  { value: "credito", label: "Crédito" },
                  { value: "debito", label: "Débito" },
                  {
                    value: "Selecciona el tipo de tarjeta",
                    label: "Selecciona el tipo de tarjeta",
                    default: true,
                  },
                ]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setNewTarjeta({ ...newTarjeta, tipo: e.target.value });
                }}
              />

              <Input
                id="nombre"
                placeholder="Nombre"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewTarjeta({
                    ...newTarjeta,
                    nombre: e.target.value,
                  });
                }}
              />
            </div>

            <div
              className={`grid ${
                newTarjeta?.tipo === "credito"
                  ? "grid-cols-2 gap-4"
                  : "grid-cols-1"
              }`}
            >
              {newTarjeta?.tipo === "credito" && (
                <Input
                  id="limiteDeCredito"
                  placeholder="Límite de crédito"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewTarjeta({
                      ...newTarjeta,
                      credito: {
                        ...newTarjeta.credito,
                        limiteDeCredito: parseFloat(e.target.value),
                      },
                    });
                  }}
                />
              )}
              <Input
                id="saldo"
                placeholder="Saldo"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNewTarjeta({
                    ...newTarjeta,
                    saldo: parseFloat(e.target.value),
                  });
                }}
              />
            </div>

            {newTarjeta?.tipo === "credito" && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="tasaDeInteres"
                  placeholder="Tasa de interés"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewTarjeta({
                      ...newTarjeta,
                      credito: {
                        ...newTarjeta.credito,
                        tasaDeInteres: parseFloat(e.target.value),
                      },
                    });
                  }}
                />
                <Input
                  id="anualidad"
                  placeholder="Anualidad"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewTarjeta({
                      ...newTarjeta,
                      credito: {
                        ...newTarjeta.credito,
                        anualidad: parseFloat(e.target.value),
                      },
                    });
                  }}
                />
              </div>
            )}

            <Input
              id="fechaDeCorte"
              placeholder="Día de Corte"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewTarjeta({
                  ...newTarjeta,
                  fechaDeCorte: e.target.value,
                });
              }}
            />
            <Button id="agregar-tarjeta" primary>
              Agregar tarjeta
            </Button>
          </form>
        </div>
      ) : (
        <Button
          id="agregar-nueva-tarjeta"
          onClick={() => setShowAgregarTarjeta(true)}
        >
          Agregar una nueva tarjeta
        </Button>
      )}
    </div>
  );
};

export default Home;
