import { RequestHandler } from "../lib/handlers";

let req = {};
let parametros = {};

describe("Requests", () => {
  it("Tiene un método", () => {
    const handler = RequestHandler(req, []);
    expect(handler).toEqual({ status: 405, message: "No hay un método." });
  });

  it("Tiene un cuerpo si lo necesita", () => {
    req = {
      method: "POST",
    };
    const handler = RequestHandler(req, []);
    expect(handler).toEqual({ status: 400, message: "No hay cuerpo." });
  });

  it("Están todos los parámetros requeridos", () => {
    req = { body: {}, method: "POST" };
    parametros = { name: "name", type: "string" };
    const handler = RequestHandler(req, [parametros]);
    expect(handler).toEqual({
      status: 400,
      message: "Parámetros faltantes.",
      parameters: [parametros],
    });
  });

  it("Los parámetros requeridos son del tipo especificado", () => {
    req = {
      body: { name: "name", number: "50", email: {}, date: new Date() },
      method: "POST",
    };
    const handler = RequestHandler(req, [
      { name: "name", type: typeof "string" },
      { name: "email", type: typeof {} },
      { name: "number", type: typeof 50 },
      { name: "date", type: typeof new Date() },
    ]);
    expect(handler).toEqual({
      status: 400,
      message: "Parámetros de tipo incorrecto.",
      parameters: [
        "El parámetro number no es del tipo number, sino del tipo String.",
      ],
    });
  });

  it.todo("Autenticación de usuario");
});
