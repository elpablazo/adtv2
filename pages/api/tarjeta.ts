// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "$lib/prisma";
import { PrismaErrorHandler, RequestHandler } from "$lib/handlers";

// Todo: esto debe ser un global para que no se inicialice uno nuevo en cada llamada

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let resp;
  let tarjetas;
  const request = RequestHandler(req, [
    { name: "nombre", type: "string" },
    { name: "saldo", type: "number" },
    { name: "fechaDeCorte", type: "string" },
    { name: "tipo", type: "string" },
  ]);
  if (request.status === 400) res.status(request.status).json({ ...request });

  if (request.method === "POST") {
    const { nombre, saldo, fechaDeCorte, tipo, usuarioId, color } =
      request.body;

    console.log(usuarioId, typeof usuarioId);

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

      // Todo: agregar condicion de tipo de tarjeta de débito

      if (tipo === "credito")
        try {
          const tipo = await prisma.credito.create({
            data: {
              ...request.body.credito,
              tarjetaId: tarjetas.id,
            },
          });
          console.log(tipo);
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
  }
}
