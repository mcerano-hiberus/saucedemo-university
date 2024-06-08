import loginPage from '../../pages/saucedemo/login'
import inventoryPage from '../../pages/saucedemo/inventory'

describe('Inventory section tests', ()=>{

    beforeEach(function(){
        cy.visit('/')
        loginPage.login('standard_user', 'secret_sauce')
    })

    it('Check information of the 6 items', ()=> {
        inventoryPage.getSortSelect().
        cy.pause()
    })

})
