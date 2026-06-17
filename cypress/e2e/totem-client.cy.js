describe("TOTEM - Cliente fisico", () => {
  const visitTotemClient = () => {
    cy.visit(Cypress.env("totemClientUrl"))
  }

  it("TT-049 - No permite login del dispositivo con credenciales vacias", () => {
    visitTotemClient()

    cy.contains(/iniciar sesi.n del dispositivo/i).should("be.visible")
    cy.get("button").contains(/entrar al t.tem/i).click()

    cy.get("#totem-user:invalid").should("exist")
    cy.get("#totem-pass:invalid").should("exist")
  })

  it("TT-050 - Rechaza login del dispositivo con credenciales incorrectas", () => {
    visitTotemClient()

    cy.get("#totem-user").type("totem_inexistente")
    cy.get("#totem-pass").type("claveincorrecta")
    cy.get("button").contains(/entrar al t.tem/i).click()

    cy.contains(/no se pudo acceder|credenciales|fallido|inv.lid/i, {
      timeout: 15000,
    }).should("be.visible")
  })

  it("TT-051 - Login exitoso del dispositivo totem", function () {
    if (!Cypress.env("totemUser") || !Cypress.env("totemPassword")) {
      this.skip()
    }

    visitTotemClient()

    cy.get("#totem-user").type(Cypress.env("totemUser"))
    cy.get("#totem-pass").type(Cypress.env("totemPassword"), { log: false })
    cy.get("button").contains(/entrar al t.tem/i).click()

    cy.contains(/acceso t.tem/i, { timeout: 15000 }).should("not.exist")
    cy.window().its("localStorage.totem_device_token").should("be.a", "string").and("not.be.empty")
  })
})

