describe('Investment Process Tests', () => {

  // Test 1: Bank transfer investment flow
  it('should complete investment process via bank transfer', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))

    // Navigate to investments page
    cy.get('div.nav > .nav > :nth-child(2) > .nav-link').click()

    // Select project
    cy.get("#__layout > div > div.page-content > div > div:nth-child(3) > div > div > div > div:nth-child(9) > div")
      .scrollIntoView()
      .realHover()
      .wait(1000)
    cy.get("#__layout > div > div.page-content > div > div:nth-child(3) > div > div > div > div:nth-child(9) > div > div.tile__curtain")
      .should('be.visible')
    cy.get("#__layout > div > div.page-content > div > div:nth-child(3) > div > div > div > div:nth-child(9) > div > div.tile__curtain > div.tile__curtain-btns > a.btn.btn__gold")
      .click()

    // Start investment
    cy.get("#__layout > div > div.page-content > div > div.container-fluid > div > div > div:nth-child(2) > div.project-tiles__box-item.is-two-thirds > div > div > div.how-many-shares__footer > div > div > button")
      .scrollIntoView()
      .click()
    cy.get("#certifyInvestment").click()
    cy.get("#choose-amount > div > div.modal-body > div > div > div > div:nth-child(1) > div:nth-child(5) > div.col-12.col-sm-8 > div > div > button")
      .click()

    // Login
    cy.get('.modal-header', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('.login-form > [name="email"]').type('investor@example.com')
    cy.get('[name="password"]').type('Password123')
    cy.get('.modal-form-login-button').click()

    // Continue investment flow
    cy.contains(/Investment process/)
    cy.get('div.top-block.mr-3.ml-3.rtl').should('be.visible')
    cy.get('button.registration-btn-btn-dark.next.to-invest-step2').click()
    cy.get('label.color-black').click()
    cy.get('button.registration-btn-btn-dark.next.to-invest-step3').click()
    cy.wait(1000)

    // Select bank transfer payment
    cy.get("#payByBank").click()
    cy.get('#__layout > div > div.page-content > div > div:nth-child(3) > div > div > div > div > div > div.invest-details__content.row.pt-10 > div > div > div > div > div.mt-xs-20 > button')
      .click()

    // Verify redirect to home page after successful investment
    cy.url({ timeout: 50000 }).should('eq', Cypress.env('BASE_URL'))
  })

})