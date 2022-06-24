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

  if (req.method === "POST") {
    // TODO: Añadir campos requeridos
    const request = RequestHandler(req, []);
    if (request.status === 400) res.status(request.status).json({ ...request });

    let { fecha, categoria, concepto, monto, tarjeta } = request.body;

    fecha = new Date(fecha);

    const primeraTransaccion = await prisma.transaccion.findFirst({
      where: {
        categoria: "Creación de tarjeta",
      },
    });

    // Si la fecha es menor a la creación de la tarjeta, el movimiento inicial se actualiza
    if (primeraTransaccion && primeraTransaccion.fecha > fecha) {
      // TODO: Edge cases (testear)
      const newMovimientoInicial = await prisma.transaccion.update({
        where: {
          id: primeraTransaccion.id,
        },
        data: {
          monto:
            monto > 0
              ? primeraTransaccion.monto
              : primeraTransaccion.monto + -monto,
        },
      });
    } else {
      const newSaldo = await prisma.tarjeta.findUnique({
        where: {
          id: tarjeta,
        },
      });
      const updated = await prisma.tarjeta.update({
        where: {
          id: tarjeta,
        },
        data: {
          saldo: newSaldo?.saldo + monto,
        },
      });
    }

    try {
      const movimiento = await prisma.transaccion.create({
        data: {
          fecha: new Date(fecha),
          categoria: String(categoria),
          concepto: String(concepto),
          monto: parseFloat(monto),
          tarjetaId: tarjeta,
        },
      });
      // TODO: Aquí se debe de restar el saldo de la tarjeta
      const movimientos = await prisma.transaccion.findMany({
        orderBy: {
          fecha: "desc",
        },
        where: {
          tarjetaId: tarjeta,
        },
      });

      res.status(201).json(movimientos);
    } catch (error) {
      console.log(error);

      // resp = PrismaErrorHandler(error);
      res.status(500).json({
        data: "Error al crear la tarjeta",
      });
    }
  } else if (req.method === "DELETE") {
    let newTransacciones;
    const { id, tarjetaId } = req.body;

    try {
      const transacciones = await prisma.transaccion.delete({
        where: {
          id,
        },
      });

      const newSaldo = await prisma.tarjeta.findUnique({
        where: {
          id: tarjetaId,
        },
      });
      const updated = await prisma.tarjeta.update({
        where: {
          id: tarjetaId,
        },
        data: {
          saldo: newSaldo?.saldo && newSaldo?.saldo - transacciones.monto,
        },
      });

      try {
        newTransacciones = await prisma.transaccion.findMany({
          where: {
            tarjetaId,
          },
        });
      } catch (error) {
        console.log(error);

        // resp = PrismaErrorHandler(error);
        res.status(500).json({
          data: "Error al eliminar la tarjeta",
        });
      }

      res.status(200).json(newTransacciones);
    } catch (error) {
      console.log(error);

      // resp = PrismaErrorHandler(error);
      res.status(500).json({
        data: "Error al eliminar la tarjeta",
      });
    }
  }
}
