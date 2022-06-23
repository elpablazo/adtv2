describe("Entrar al sitio", () => {
  it("El sitio carga", () => {
    cy.visit("localhost:3000");
  });
});

describe("Crear usuario", () => {
  it("Se crea un usuario", () => {
    cy.get("#crear-cuenta").click();
    let date = new Date().toISOString();
    date = date.replaceAll(" ", "-");
    cy.get("#identifier").type(`${date}@mail.com`);
    cy.get("#password").type("123456");
    cy.get("#crear").click();
  });
});

describe("Añadir 5 tarjeta", () => {
  it("Crear tarjeta de crédito", () => {
    cy.get("#tipo").select("Crédito");
    cy.get("#nombre").type("Rappicard");
    cy.get("#limiteDeCredito").type("12000");
    cy.get("#saldo").type("1000");
    cy.get("#tasaDeInteres").type("55.56");
    cy.get("#anualidad").type("1200");
    cy.get("#fechaDeCorte").type("03");
    cy.get("#agregar-tarjeta").click();
    cy.get("div").contains("Rappicard");
  });

  it("Crear nueva tarjeta", () => {
    cy.get("#agregar-nueva-tarjeta").click();
    cy.get("#tipo").select("Débito");
    cy.get("#nombre").type("Perfiles Banamex");
    cy.get("#saldo").type(String(Math.random() * 10000));
    cy.get("#fechaDeCorte").type("03");
    cy.get("#agregar-tarjeta").click();
    cy.get("div").contains("Perfiles Banamex");
  });

  it("Añadir 5 tarjetas", () => {
    let x = 0;
    while (x < 5) {
      cy.get("#agregar-nueva-tarjeta").click();
      cy.get("#tipo").select("Débito");
      cy.get("#nombre").type("BBVA");
      cy.get("#saldo").type(String(Math.random() * 10000));
      cy.get("#fechaDeCorte").type("03");
      cy.get("#agregar-tarjeta").click();
      cy.get("div").contains("BBVA");
      x++;
    }
  });
});

export {};
