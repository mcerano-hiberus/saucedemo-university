import loginPage from "../../pages/saucedemo/login"
import inventoryPage from "../../pages/saucedemo/inventory"
const LOGIN_USERS = require('../../fixtures/login/users.json')

describe('Login section tests', () => {
  
  beforeEach(()=>{
    cy.fixture('login/error_messages').as('errorMessages')
    cy.visit('/')
  })

  //Test all valid credentials
  LOGIN_USERS.forEach((user) => {
    it.only('Test valid credentials for username: ' + user.username, () =>{
      loginPage.login(user.username, user.password)
      cy.url().should('contain', '/inventory.html')
      inventoryPage.getPageTitle().should('have.text', 'Swag Labs')
    })
  })

  it('Test an user is able to log in', ()=>{
    loginPage.login(LOGIN_USERS[0].username, LOGIN_USERS[0].password)
    .getPageTitle
    cy.url().should('contain', '/inventory.html')
    inventoryPage.getPageTitle().should('have.text', 'Swag Labs')
  })

  //Test valid credential for a locked out user
  it('Test valid credential for locked out user', function() {
    loginPage.login("locked_out_user", "secret_sauce")
    loginPage.getErrorMessage().should('have.text', this.errorMessages.locked_out_error)
  })

  it('Test username required message', function() {
    loginPage.typePassword("secret_word")
      .clickLogin()
    loginPage.getErrorMessage().should('have.text', this.errorMessages.username_required)
  })

  it('Test password required message', function() {
    loginPage.typeUsername("unknown_suspect")
      .clickLogin()
    loginPage.getErrorMessage().should('have.text', this.errorMessages.password_required)
  })

  it('Test username and password does not match', function() {
    loginPage.typeUsername("another_one")
      .typePassword("bites_the_dust")
      .clickLogin()
    loginPage.getErrorMessage().should('have.text', this.errorMessages.no_match)
  })

})
