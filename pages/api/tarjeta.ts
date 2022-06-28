// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "$lib/prisma";
import { PrismaErrorHandler, RequestHandler } from "$lib/handlers";

// Todo: esto debe ser un global para que no se inicialice uno nuevo en cada llamada

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let tarjetas;

  if (req.method === "POST") {
    const request = RequestHandler(req, [
      { name: "nombre", type: "string" },
      { name: "saldo", type: "number" },
      { name: "fechaDeCorte", type: "string" },
      { name: "tipo", type: "string" },
    ]);
    if (request.status === 400) res.status(request.status).json({ ...request });

    const { nombre, saldo, fechaDeCorte, tipo, usuarioId, color } =
      request.body;

    try {
      tarjetas = await prisma.tarjeta.create({
        data: {
          nombre,
          color,
          saldo: tipo === "credito" ? -saldo : saldo,
          fechaDeCorte,
          tipo: tipo === "credito" ? "Credito" : "Debito",
          usuarioId,
        },
      });

      const primeraTransaccion = await prisma.transaccion.create({
        data: {
          monto: tipo === "credito" ? -saldo : saldo,
          categoria: "Creación de tarjeta",
          tarjetaId: tarjetas.id,
        },
      });

      // Todo: agregar condicion de tipo de tarjeta de débito

      if (tipo === "credito")
        try {
          const tipo = await prisma.credito.create({
            data: {
              ...request.body.credito,
              tarjetaId: tarjetas.id,
            },
          });
        } catch (error) {
          console.log(error);
        }

      res.status(201).json({ ...tarjetas });
    } catch (error) {
      console.log(error);

      // resp = PrismaErrorHandler(error);
      res.status(500).json({
        data: "Error al crear la tarjeta",
      });
    }
  } else if (req.method === "GET") {
    const url = new URL(req.url || "", `http://${req.headers.host}`);

    try {
      tarjetas = await prisma.tarjeta.findMany({
        where: {
          usuarioId: url.searchParams.get("usuarioId") || "",
        },
      });

      res.status(200).send(tarjetas);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: "Error al obtener las tarjetas",
      });
    }
  }
}
