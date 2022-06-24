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
  let usuario;
  const request = RequestHandler(req, [
    { name: "identifier", type: "string" },
    { name: "password", type: "string" },
  ]);
  if (request.status === 400) res.status(request.status).json({ ...request });

  if (request.method === "POST") {
    const { identifier, password } = request.body;

    try {
      usuario = await prisma.user.findUnique({
        where: {
          identifier,
        },
      });

      if (!usuario) res.status(404).json({ message: "El usuario no existe" });

      if (usuario?.password !== password)
        res.status(401).json({ message: "Usuario o contraseña incorrectos" });

      res.status(200).json({ ...usuario });
    } catch (error) {
      console.log(error);

      // resp = PrismaErrorHandler(error);
      res.status(500).json({
        data: "Error al iniciar sesión",
      });
    }
  }
}
