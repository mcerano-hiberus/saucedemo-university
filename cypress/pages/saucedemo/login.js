class LoginPage {
    elements = {
        usernameInput: ()=> cy.get("#user-name"),
        passwordInput: () => cy.get("#password"),
        loginButton: () => cy.get('#login-button'),
        errorMessage: () => cy.get('[data-test="error"]')
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username)
        return this
    }

    typePassword(password) {
        this.elements.passwordInput().type(password)
        return this
    }

    clickLogin() {
        this.elements.loginButton().click()
    }

    login(username, password) {
        this.typeUsername(username)
        this.typePassword(password)
        this.clickLogin()
    }

    getErrorMessage(){
        return this.elements.errorMessage()
    }
}

module.exports = new LoginPage();