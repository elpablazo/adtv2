// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

// Todo: esto debe ser un global para que no se inicialice uno nuevo en cada llamada
const prisma = new PrismaClient();

type Data = {
  res?: any;
  user?: User;
  name?: string;
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          identifier,
          password,
        },
      });
      console.log(user);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);

      res.status(500).json({ error });
    }
  }
}
