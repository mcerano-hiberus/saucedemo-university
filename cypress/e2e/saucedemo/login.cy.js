import loginPage from "../../pages/saucedemo/login"
import inventoryPage from "../../pages/saucedemo/inventory"
const LOGIN_USERS = require('../../fixtures/login/users.json')
import * as allure from "allure-cypress";

describe('Login section tests', () => {
  
  beforeEach(()=>{
    allure.epic("Saucedemo training")
    allure.feature("Login feature")
    cy.fixture('login/error_messages').as('errorMessages')
    allure.step("User navigates to saucedemo.com", () => {
      cy.visit('/')
    })
  })

  //Test all valid credentials
  LOGIN_USERS.forEach((user) => {
    it('Test valid credentials for username: ' + user.username + 
        " @allure.label.owner=JohnDoe", () =>{
      allure.description("This test attempts to login with a validar user")
      allure.parameter("username", user.username)
      allure.step("User tries to log in using credentials: " + user.username, () => {
        loginPage.login(user.username, user.password)
      })
      allure.step("User is able to see the inventory page", () => {
        cy.url().should('contain', '/inventory.html')
        inventoryPage.getPageTitle().should('have.text', 'Swag Labs')
      })
    })
  })

  it('Test the standard user is able to log in', ()=>{
    allure.description("This test attempts to login with the standard user")
    loginPage.login(LOGIN_USERS[0].username, LOGIN_USERS[0].password)
    cy.url().should('contain', '/inventory.html')
    inventoryPage.getPageTitle().should('have.text', 'Swag Labs')
  })

  //Test valid credential for a locked out user
  it('Test valid credential for locked out user', function() {
    allure.description("This test attempts to login with a locked out user")
    loginPage.login("locked_out_user", "secret_sauce")
    loginPage.getErrorMessage().should('have.text', this.errorMessages.locked_out_error)
  })

  it('Test username required message', function() {
    allure.description("This test verifies that username input is required")
    loginPage.typePassword("secret_word")
      .clickLogin()
    loginPage.getErrorMessage().should('have.text', this.errorMessages.username_required)
  })

  it('Test password required message', function() {
    allure.description("This test verifies that password input is required")
    loginPage.typeUsername("unknown_suspect")
      .clickLogin()
    loginPage.getErrorMessage().should('have.text', this.errorMessages.password_required)
  })

  it('Test username and password does not match', function() {
    allure.description("This test verifies that user is not able to log in with a no-match username-password combination")
    loginPage.typeUsername("another_one")
      .typePassword("bites_the_dust")
      .clickLogin()
    loginPage.getErrorMessage().should('have.text', this.errorMessages.no_match)
  })

})
