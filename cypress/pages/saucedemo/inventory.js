class InventoryPage {
    elements = {
        title: () => cy.get('.app_logo'),
        items: () => cy.get('[data-test="inventory-item"]'),
        sortSelect: () => cy.get('[data-test=product-sort-container]')
    }

    getPageTitle() {
        return this.elements.title()
    }

    getSortSelect() {
        return this.elements.sortSelect()
    }
}

module.exports = new InventoryPage();