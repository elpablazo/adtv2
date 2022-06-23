import { PrismaErrorHandler } from "../lib/handlers";
import prisma from "../lib/prisma";

let response;
const date = new Date().toISOString();

describe("Prisma Error Handler", () => {
  it("Están todos los campos necesarios", async () => {
    try {
      response = await prisma.user.create({
        data: {
          identifier: date + "@mail.com",
        },
      });
    } catch (error) {}
  });

  it("Identificador único", async () => {
    try {
      response = await prisma.user.create({
        data: {
          identifier: "qwerty@qwerty.com",
          password: "Hola",
        },
      });
    } catch (error) {
      response = PrismaErrorHandler(error);
    }
    expect(response).toEqual({
      status: 409,
      message: "Campos únicos ya existentes.",
      fields: ["identifier"],
    });
  });
});
