const loginPage = require("../../pages/saucedemo/login")

describe('Login section tests', () => {

  it('Login successfully', () => {
    cy.visit('https://www.saucedemo.com/')
    loginPage.login("standard_user", "secret_sauce")
    cy.url().should('contain', '/inventory.html')
  })

})
