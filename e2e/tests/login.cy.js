describe('Login Tests', () => {

  beforeEach(() => {
    cy.safeVisit(Cypress.env('BASE_URL'))
  })

  // Test 1: Successful login
  it('should login successfully with valid credentials', () => {
    cy.get('a.login-link').click()
    cy.get('.modal-header', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('.login-form > [name="email"]').type('user@example.com')
    cy.get('[name="password"]').type('Password123')
    cy.get('.modal-form-login-button').click()
    cy.contains('Profile', { timeout: 10000 }).should('be.visible')
  })

  // Test 2: Empty fields validation
  it('should show validation errors for empty fields', () => {
    cy.get('a.login-link').click()
    cy.get('.modal-header', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-form-login-button').click()
    cy.get('#login-form span:nth-child(2)').contains('Cannot be empty').should('be.visible')
    cy.get('#login-form span:nth-child(4)').contains('Cannot be empty').should('be.visible')
    cy.get('.login-form > [name="email"]').type('mmm')
    cy.get('[name="password"]').type('Qwe')
    cy.get('#login-form span:nth-child(2)').contains('Incorrect email').should('be.visible')
    cy.get('#login-form span:nth-child(4)').contains('Minimal length is 8').should('be.visible')
  })

  // Test 3: Incorrect email
  it('should show error for incorrect email', () => {
    cy.get('a.login-link').click()
    cy.get('.modal-header', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('.login-form > [name="email"]').type('wrong@example.com')
    cy.get('[name="password"]').type('Password123')
    cy.get('.modal-form-login-button').click()
    cy.get('.swal2-popup').should('be.visible')
    cy.get('.swal2-x-mark').should('be.visible')
    cy.get('#swal2-title').contains(/Error/i).should('be.visible')
    cy.get('#swal2-content').contains(/Wrong E-mail or password/i).should('be.visible')
  })

  // Test 4: Incorrect password
  it('should show error for incorrect password', () => {
    cy.get('a.login-link').click()
    cy.get('.modal-header', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('.login-form > [name="email"]').type('user@example.com')
    cy.get('[name="password"]').type('WrongPass123')
    cy.get('.modal-form-login-button').click()
    cy.get('.swal2-popup').should('be.visible')
    cy.get('.swal2-x-mark').should('be.visible')
    cy.get('#swal2-title').should('be.visible').invoke('text').should('match', /Error/i)
    cy.get('#swal2-content').should('be.visible').invoke('text').should('match', /Wrong E-mail or password/i)
  })

})