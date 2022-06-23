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
  const request = RequestHandler(req, [{ name: "id", type: "string" }]);
  if (request.status === 400) res.status(request.status).json({ ...request });
  const { id } = request.body;

  try {
    tarjetas = await prisma.tarjeta.findMany({
      where: {
        usuarioId: id,
      },
    });
  } catch (error) {
    // Todo: Terminar error handler
    resp = PrismaErrorHandler(error);
    res.status(resp?.status || 500).json(resp);
  }
}
