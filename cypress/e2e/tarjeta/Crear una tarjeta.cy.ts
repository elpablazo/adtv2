context("Entrar al dashboard", () => {
  describe("Entrar al sitio", () => {
    it("El sitio carga", () => {
      cy.visit("localhost:3000");
    });
    it("El login carga", () => {
      cy.get("#iniciar-sesion").click();
      cy.get("form").should("be.visible").contains("Entra a tu cuenta");
    });
  });

  describe("Iniciar sesión", () => {
    it("Identificador correcto", () => {
      cy.get("#identifier")
        .type("algo@email.com")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");
    });

    it("Contraseña correcta", () => {
      cy.get("#password")
        .type("password")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");
    });

    it("Login correcto", () => {
      cy.get("#entrar-a-cuenta")
        .click()
        .siblings("#login-error")
        .should("not.exist");
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
});

context("Crear una tarjeta", () => {
  it("Seleccionar tarjeta de crédito", () => {
    cy.get("#tipo").select("Crédito").should("have.value", "credito");
  });
  it("Llenado de datos", () => {
    cy.get("#nombre").type("Rappicard");
    cy.get("#limiteDeCredito").type("12000");
    cy.get("#saldo").type("1000");
    cy.get("#tasaDeInteres").type("55.56");
    cy.get("#anualidad").type("1200");
    cy.get("#fechaDeCorte").type("03");
  });
  it("Creación de tarjeta", () => {
    cy.get("#agregar-tarjeta").click();
  });
  it("La tarjeta se agregó", () => {
    cy.get("#tarjetas").contains("Rappicard");
  });
  it("La página de la tarjeta carga", () => {
    cy.get("#tarjetas").contains("Rappicard").click();
    cy.url().should("contain", `http://localhost:3000/tarjeta/`);
  });
});

export {};
