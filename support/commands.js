Cypress.Commands.add('safeVisit', (url) => {
    cy.viewport('macbook-13')
    cy.visit(url)
    cy.document({ timeout: 20000 })
        .its('readyState')
        .should('eq', 'complete')
    cy.get('body', { timeout: 15000 }).should('be.visible')
    cy.wait(500)
})