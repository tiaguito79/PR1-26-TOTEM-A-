describe("TOTEM - Seguridad API", () => {
  it("TT-053 - No permite consultar display sin token", () => {
    cy.request({
      method: "GET",
      url: "/api/totems/display/me",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it("TT-071 - Debe bloquear descarga publica de archivos privados", function () {
    const gridfsFileId = Cypress.env("gridfsFileId")
    if (!gridfsFileId) {
      this.skip()
    }

    cy.request({
      method: "GET",
      url: `/api/contents/file/${gridfsFileId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403], "status sin autenticacion").to.include(response.status)
    })
  })

  it("TT-072 - Debe bloquear subida publica de FAQ PDF", () => {
    cy.request({
      method: "POST",
      url: "/api/faqs/upload-pdf",
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403], "status sin autenticacion").to.include(response.status)
    })
  })

  it("TT-073 - Debe bloquear lectura publica de FAQ por totemId", function () {
    const totemId = Cypress.env("totemId")
    if (!totemId) {
      this.skip()
    }

    cy.request({
      method: "GET",
      url: `/api/faqs/totem/${encodeURIComponent(totemId)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403], "status sin autenticacion").to.include(response.status)
    })
  })

  it("TT-074 - Debe bloquear lectura publica de ads por totemId", function () {
    const totemId = Cypress.env("totemId")
    if (!totemId) {
      this.skip()
    }

    cy.request({
      method: "GET",
      url: `/api/ads/totem/${encodeURIComponent(totemId)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([401, 403], "status sin autenticacion").to.include(response.status)
    })
  })

  it("TT-076 - No debe exponer contrasena de totem en listado admin", function () {
    if (!Cypress.env("adminUser") || !Cypress.env("adminPassword")) {
      this.skip()
    }

    cy.loginAdminByApi().then((token) => {
      cy.request({
        method: "GET",
        url: "/api/totems",
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.containsTotemPasswordField(response.body).should("eq", false)
      })
    })
  })
})

