import { Prisma } from "@prisma/client";
import type { NextApiRequest } from "next";

interface Parameter {
  name: string;
  type: string;
}

export const PrismaErrorHandler = (e: any) => {
  if (e instanceof Prisma.PrismaClientValidationError)
    return { status: 400, message: e.message };
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002")
      return {
        status: 409,
        message: "Campos únicos ya existentes.",
        fields: e.meta?.target,
      };
  }
};

export const RequestHandler = (
  req: NextApiRequest,
  parameters: Parameter[]
): any => {
  // Si no hay método
  if (!req.method) return { status: 405, message: "No hay un método." };

  // Si el método necesita un body, pero no lo tiene
  if (!req.body && req.method !== "GET")
    return { status: 400, message: "No hay cuerpo." };

  // Si existen parámetros y no se encuentran en el body
  if (parameters.length > 0) {
    const missing = parameters.filter((p) => !req.body[p.name]);
    if (missing.length > 0)
      return {
        status: 400,
        message: "Parámetros faltantes.",
        parameters: missing,
      };
  }

  // Si los parámetros no son del tipo especificado
  if (parameters.length > 0) {
    let wrong: String[] = [];
    parameters.forEach((p) => {
      if (String(typeof req.body[p.name]) !== p.type)
        wrong.push(
          `El parámetro ${p.name} no es del tipo ${p.type}, sino del tipo ${
            req.body[p.name].constructor.name
          }.`
        );
    });

    return {
      status: 400,
      message: "Parámetros de tipo incorrecto.",
      parameters: wrong,
    };
  }

  return req;
};
