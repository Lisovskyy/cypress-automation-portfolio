describe('Registration Tests', () => {

  // Create temp email inbox before tests
  before(function () {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.log('Creating temp email inbox...')
    return cy.mailslurp()
      .then(mailslurp => mailslurp.createInbox())
      .then(inbox => {
        cy.wrap(inbox.id).as('inboxId')
        cy.wrap(inbox.emailAddress).as('emailAddress')
      })
  })

  // Test 1: Successful registration with email verification
  it('should register successfully and verify email via OTP', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a.registration-link').click()
    cy.get('.modal-header').should('exist').and('be.visible')
    cy.get('.modal-body').should('exist').and('be.visible')

    // Fill registration form
    cy.get('[placeholder="Name"]').type('Auto Test')
    cy.get('@emailAddress').then(emailAddress => {
      cy.get('[placeholder="Email"]').type(emailAddress)
    })
    const randomPhone = '05' + Math.floor(10000000 + Math.random() * 90000000)
    cy.get('#idea__form > [type="tel"]').type(randomPhone)
    cy.get('[placeholder="Password"]').type('Password123')
    cy.get('[placeholder="Confirm Password"]').type('Password123')
    cy.get('.button_container > .btn').click()
    cy.wait(1000)

    // Get OTP from email and enter it
    cy.get('@inboxId').then(inboxId => {
      cy.mailslurp()
        .then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000))
        .then(email => {
          const otp = email.body.match(/(\d{6})/)[1]
          cy.get('.otp-input-container > :nth-child(1)').type(otp)
        })
    })

    // Logout and login with new account
    cy.wait(2000)
    cy.get('.links__items > :nth-child(1)').click()
    cy.wait(2000)
    cy.get('a.login-link').click()
    cy.wait(1000)
    cy.get('.modal-header').should('exist').and('be.visible')
    cy.get('.modal-body').should('exist').and('be.visible')

    cy.get('@emailAddress').then(emailAddress => {
      cy.get('.login-form > [name="email"]').type(emailAddress)
    })
    cy.get('[name="password"]').type('Password123')
    cy.get('.modal-form-login-button').click()
    cy.wait(2000)
    cy.get('.method-btn').click()
    cy.wait(5000)

    // Get login OTP from email
    cy.get('@inboxId').then(inboxId => {
      cy.mailslurp()
        .then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000))
        .then(email => {
          const otp = email.body.match(/(\d{6})/)[1]
          cy.get('.otp-input-container > :nth-child(1)').type(otp)
        })
    })

    cy.wait(5000)
    cy.contains('Profile', { timeout: 10000 }).should('be.visible')
    cy.get('[href="/investor/profile"]').click()
  })

})