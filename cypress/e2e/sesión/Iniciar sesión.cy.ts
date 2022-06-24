context("El sitio carga", () => {
  describe("Entrar al sitio", () => {
    it("El sitio carga", () => {
      cy.visit("localhost:3000");
    });
    it("El login carga", () => {
      cy.get("#iniciar-sesion").click();
      cy.get("form").should("be.visible").contains("Entra a tu cuenta");
    });
  });
});

context("Validación de campos", () => {
  describe("Los campos son requeridos", () => {
    it("El identifier es requerido", () => {
      cy.get("#identifier")
        .focus()
        .blur()
        .siblings("#error-identifier")
        .contains("Llena este campo");
    });

    it("El password es requerido", () => {
      cy.get("#password")
        .focus()
        .blur()
        .siblings("#error-password")
        .contains("Llena este campo");
    });
  });

  describe("Identifier puede ser correo o teléfono", () => {
    it("Identifica un correo", () => {
      cy.get("#identifier")
        .focus()
        .type("asdf")
        .blur()
        .siblings("#error-identifier")
        .contains("El email no es válido");
    });

    it("Identifica un teléfono", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("462")
        .blur()
        .siblings("#error-identifier")
        .contains("El número no es válido");
    });
  });

  describe("Regex de identifier", () => {
    it("El email es válido", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("algo@algo.com")
        .siblings("#error-identifier")
        .should("not.exist");
    });

    it("Email con solo números no es válido", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("4621234567@4352345.43545")
        .siblings("#error-identifier")
        .should("be.visible");
    });

    it("El teléfono es válido", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("4621234567")
        .siblings("#error-identifier")
        .should("not.exist");
    });

    it("Teléfono con guiones no es válido", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("46-2123-4567")
        .siblings("#error-identifier")
        .should("be.visible")
        .contains("El número no es válido");
    });

    it("Teléfono con paréntesis o espacios no es válido", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("(462) 123 4567")
        .siblings("#error-identifier")
        .should("be.visible")
        .contains("El número no es válido");
    });
  });
});

context("Validación de usuarios", () => {
  describe("Usuario no existente", () => {
    it("Usuario con correo", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("algo@algo.com")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");
      cy.get("#password")
        .type("123456")
        .blur()
        .siblings("#error-password")
        .should("not.exist");
      cy.get("#entrar-a-cuenta").click();
      cy.get("#login-error").contains("El usuario no existe");
    });

    it("Usuario con teléfono", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("5555555555")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");
      cy.get("#password")
        .type("123456")
        .blur()
        .siblings("#error-password")
        .should("not.exist");
      cy.get("#entrar-a-cuenta").click();
      cy.get("#login-error").contains("El usuario no existe");
    });
  });

  describe("Usuario o contraseña incorrectos", () => {
    it("Usuario con correo", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("algo@email.com")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");

      cy.get("#password")
        .type("123456")
        .blur()
        .siblings("#error-password")
        .should("not.exist");

      cy.get("#entrar-a-cuenta").click();
      cy.get("#login-error").contains("Usuario o contraseña incorrectos");
    });

    it("Usuario con teléfono", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("4622641459")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");

      cy.get("#password")
        .type("123456")
        .blur()
        .siblings("#error-password")
        .should("not.exist");

      cy.get("#entrar-a-cuenta").click();
      cy.get("#login-error").contains("Usuario o contraseña incorrectos");
    });
  });
});

context("Inicio de sesión", () => {
  describe("Inicio de sesión con correo", () => {
    it("Inicia sesión", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("algo@email.com")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");
      cy.get("#password")
        .focus()
        .clear()
        .type("password")
        .blur()
        .siblings("#error-password")
        .should("not.exist");
      cy.get("#entrar-a-cuenta").click();
    });

    it("Redirige a index", () => {
      cy.url().should("eq", "http://localhost:3000/");
      cy.go("back");
    });
    localStorage.clear();
  });

  describe("Inicio de sesión con teléfono", () => {
    it("Inicia sesión con teléfono", () => {
      cy.get("#identifier")
        .focus()
        .clear()
        .type("4622641459")
        .blur()
        .siblings("#error-identifier")
        .should("not.exist");
      cy.get("#password")
        .focus()
        .clear()
        .type("password")
        .blur()
        .siblings("#error-password")
        .should("not.exist");
      cy.get("#entrar-a-cuenta").click();
    });

    it("Redirige a index", () => {
      cy.url().should("eq", "http://localhost:3000/");
    });
    localStorage.clear();
  });
});

export {};
