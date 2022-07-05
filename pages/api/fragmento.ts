// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "$lib/prisma";
import { PrismaErrorHandler, RequestHandler } from "$lib/handlers";

// Todo: esto debe ser un global para que no se inicialice uno nuevo en cada llamada

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request = RequestHandler(req, []);
  if (request.status === 400) res.status(request.status).json({ ...request });

  if (request.method === "POST") {
    const { fragmentos, transaccionId } = request.body;
    let frag;

    try {
      fragmentos.map(async (fragmento: any) => {
        fragmento.transaccionId = transaccionId;
        fragmento.cantidad = parseFloat(fragmento.cantidad);
        fragmento.monto = parseFloat(fragmento.monto);
        if (!fragmento.id) {
          frag = await prisma.fragmento.create({
            data: fragmento,
          });
        } else {
          frag = await prisma.fragmento.update({
            where: { id: fragmento.id },
            data: fragmento,
          });
        }
      });

      res.status(201).send("Fragmentos creados correctamente.");
    } catch (error) {
      console.log(error);

      res.status(500).json({
        data: "Error al crear el fragmento",
      });
    }
  } else if (request.method === "GET") {
    try {
      console.log(request.query);

      const fragmentos = await prisma.fragmento.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          ...request.query,
        },
      });
      console.log(fragmentos);

      res.status(200).json(fragmentos);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: "Error al obtener los fragmentos",
      });
    }
  }
}
