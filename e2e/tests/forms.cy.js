describe('Form Tests', () => {

  // === TEST DATA ===
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    phone: '34567890',
    email: 'test@example.com',
    message: 'Test message'
  }

  // === HELPER FUNCTIONS ===

  const waitForSuccess = () => {
    cy.get('div.swal2-popup', { timeout: 15000 }).should('be.visible')
    cy.get('div.swal2-success-ring').should('be.visible')
  }

  // === TESTS ===

  // Test 1: form 1
  it('should submit popup form successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('.timeout__inner').should('not.exist')
    cy.get('.timeout__inner', { timeout: 100000 }).should('exist').and('be.visible')
    cy.get('input[placeholder="Full name:"]').type(testData.firstName)
    cy.get('input.modal_input').type(testData.phone)
    cy.get('div.timeout__fields input[placeholder="Email:"]').type(testData.email)
    cy.get('button.timeout__button').click()
    waitForSuccess()
  })

  // Test 2: form 2
  it('should submit footer form successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('#footer_fotm_contact input[placeholder="First name:"]').type(testData.firstName)
    cy.get('#footer_fotm_contact [name="lastname"]').type(testData.lastName)
    cy.get('#customPhone').type(testData.phone)
    cy.get('#footer_fotm_contact [name="email"]').type(testData.email)
    cy.get('#footer_fotm_contact textarea.form-control').type(testData.message)
    cy.get('#footer_fotm_contact button.Btn_contactFormFooter').click()
    waitForSuccess()
  })

  // Test 3: form 3
  it('should submit fundraising form successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('ul.nav__inner li:nth-child(3) a.nav-link').click()
    cy.get('form.d-flex input[placeholder="First name:"]').type(testData.firstName)
    cy.get('form.d-flex [name="lastname"]').type(testData.lastName)
    cy.get('input.vti__input').type(testData.phone)
    cy.get('form.d-flex [name="email"]').type(testData.email)
    cy.get('button.Btn_contactForm').click()
    waitForSuccess()
  })

  // Test 4: form 4
  it('should submit Smart Club form successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a[href="/smart-investor-club"]').click()
    cy.get('form.d-flex input[placeholder="First name:"]').type(testData.firstName)
    cy.get('form.d-flex [name="lastname"]').type(testData.lastName)
    cy.get('input.vti__input').type(testData.phone)
    cy.get('form.d-flex [name="email"]').type(testData.email)
    cy.get('button.Btn_contactForm').click()
    waitForSuccess()
  })

  // Test 5: form 5
  it('should submit How It Works form successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('ul.nav__inner li:nth-child(5) a.nav-link').click()
    cy.get('div.col-md-12 input[placeholder="First name:"]').type(testData.firstName)
    cy.get('div.col-md-12 [name="lastname"]').type(testData.lastName)
    cy.get('#idea__form div.col-md-12').type(testData.phone)
    cy.get('div.col-md-12 [name="email"]').type(testData.email)
    cy.get('form textarea.form-control').type(testData.message)
    cy.get('button.btn-primary').click()
    waitForSuccess()
  })

  // Test 6: form 6
  it('should submit contact form successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('ul.nav__inner li:nth-child(6) a.nav-link').click()
    cy.get('form.d-flex input[placeholder="First name:"]').type(testData.firstName)
    cy.get('form.d-flex [name="lastname"]').type(testData.lastName)
    cy.get('input.vti__input').type(testData.phone)
    cy.get('form.d-flex [name="email"]').type(testData.email)
    cy.get('button.Btn_contactForm').click()
    waitForSuccess()
  })

})