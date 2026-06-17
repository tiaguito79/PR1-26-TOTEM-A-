function getRequiredEnv(name) {
  const value = Cypress.env(name)
  return typeof value === "string" ? value.trim() : value
}

Cypress.Commands.add("requireEnv", (name) => {
  const value = getRequiredEnv(name)
  expect(value, `Cypress.env("${name}")`).to.be.a("string").and.not.be.empty
  return cy.wrap(value, { log: false })
})

Cypress.Commands.add("loginAdminByApi", () => {
  const usuario = getRequiredEnv("adminUser")
  const contrasena = getRequiredEnv("adminPassword")

  if (!usuario || !contrasena) {
    throw new Error(
      "Configura CYPRESS_adminUser y CYPRESS_adminPassword para ejecutar este caso."
    )
  }

  return cy
    .request({
      method: "POST",
      url: "/api/login",
      body: { usuario, contrasena },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status, "login admin status").to.eq(200)
      expect(response.body, "login response").to.have.property("token")
      window.localStorage.setItem("token", response.body.token)
      window.localStorage.setItem("admin", JSON.stringify(response.body.admin))
      return cy.wrap(response.body.token, { log: false })
    })
})

Cypress.Commands.add("containsTotemPasswordField", (value) => {
  const visit = (node) => {
    if (!node || typeof node !== "object") return false
    if (Array.isArray(node)) return node.some(visit)

    return Object.entries(node).some(([key, child]) => {
      if (key.toLowerCase() === "contrase\u00f1a") return true
      if (key.toLowerCase() === "password") return true
      return visit(child)
    })
  }

  return cy.wrap(visit(value), { log: false })
})

