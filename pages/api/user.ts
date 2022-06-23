// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "$lib/prisma";
import { User } from "@prisma/client";
import { PrismaErrorHandler } from "$lib/handlers";

// Todo: esto debe ser un global para que no se inicialice uno nuevo en cada llamada

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let resp;
  // Crear un nuevo usuario
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    try {
      resp = await prisma.user.create({
        data: {
          identifier,
          password,
        },
      });
      res.status(200).json({ resp });
    } catch (error) {
      // Todo: Terminar error handler
      resp = PrismaErrorHandler(error);
      res.status(resp?.status || 500).json(resp);
    }
  }
}
