describe("TOTEM - Panel Admin: autenticacion", () => {
  it("TT-001 - Redirige a login al acceder a dashboard sin sesion", () => {
    cy.visit("/dashboard")
    cy.url().should("include", "/login")
    cy.contains(/panel de administraci/i).should("be.visible")
  })

  it("TT-002 - No permite login con campos vacios", () => {
    cy.visit("/login")

    cy.get("button").contains(/ingresar/i).click()

    cy.contains(/usuario no puede estar vac/i).should("be.visible")
    cy.contains(/contrase.a no puede estar vac/i).should("be.visible")
    cy.url().should("include", "/login")
  })

  it("TT-003 - Rechaza credenciales incorrectas", () => {
    cy.visit("/login")

    cy.get('input[placeholder="Ingresa tu usuario"]').type("admin_inexistente")
    cy.get('input[type="password"]').type("claveincorrecta")
    cy.get("button").contains(/ingresar/i).click()

    cy.contains(/credenciales|inv.lidas|no se pudo conectar|error/i, {
      timeout: 15000,
    }).should("be.visible")
    cy.url().should("include", "/login")
  })

  it("TT-006 - Inicio de sesion exitoso de administrador", function () {
    if (!Cypress.env("adminUser") || !Cypress.env("adminPassword")) {
      this.skip()
    }

    cy.loginAdminByApi()
    cy.visit("/dashboard")

    cy.url().should("include", "/dashboard")
    cy.contains(/dashboard|t.tems|totems/i, { timeout: 15000 }).should("be.visible")
  })

  it("TT-007 - Cierre de sesion invalida el acceso al dashboard", function () {
    if (!Cypress.env("adminUser") || !Cypress.env("adminPassword")) {
      this.skip()
    }

    cy.loginAdminByApi()
    cy.request("POST", "/api/auth/logout")
    cy.clearLocalStorage()
    cy.visit("/dashboard")

    cy.url().should("include", "/login")
  })
})

