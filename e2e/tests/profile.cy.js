describe('Profile Tests', () => {

  // === TEST DATA ===
  const user = {
    email: 'user@example.com',
    password: 'Password123',
    newPassword: 'Password321',
    newEmail: 'newemail@example.com'
  }

  // === TESTS ===

  // Test 1: Change password
  it('should change password successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a.login-link').should('be.visible', { timeout: 10000 }).click()
    cy.get('div.flex-row', { timeout: 10000 }).should('be.visible')
    cy.get('div.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('#login-form [name="email"]').type(user.email)
    cy.get('#login-form [name="password"]').type(user.password)
    cy.get('#login-form button.modal-form-login-button').click()
    cy.get('a[data-cypress-el="true"]', { timeout: 10000 }).should('be.visible').click()

    // Change password
    cy.get('input[type="password"]', { timeout: 5000 }).type(user.newPassword)
    cy.get('div.form__password div.form__button').click()
    cy.get('div.swal2-popup', { timeout: 20000 }).should('be.visible')
    cy.get('div.swal2-success-ring', { timeout: 20000 }).should('be.visible')
    cy.get('button.swal2-confirm', { timeout: 20000 }).click()
  })

  // Test 2: Verify changed password
  it('should verify changed password works and change back', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a.login-link', { timeout: 10000 }).should('be.visible').click()
    cy.get('div.flex-row', { timeout: 5000 }).should('be.visible')
    cy.get('div.modal-body', { timeout: 5000 }).should('be.visible')
    cy.get('#login-form [name="email"]').type(user.email)
    cy.get('#login-form [name="password"]').type(user.password)
    cy.get('#login-form button.modal-form-login-button').click()

    // Old password should fail
    cy.get('div.swal2-popup', { timeout: 5000 }).should('be.visible')
    cy.get('span.swal2-x-mark', { timeout: 5000 }).should('be.visible')
    cy.get('button.swal2-confirm').click()

    // New password should succeed
    cy.get('#login-form [name="password"]').clear().type(user.newPassword)
    cy.get('#login-form button.modal-form-login-button').click()
    cy.get('a[data-cypress-el="true"]', { timeout: 20000 }).should('be.visible').click()

    // Change password back
    cy.get('input[type="password"]', { timeout: 20000 }).type(user.password)
    cy.get('div.form__password div.form__button').click()
    cy.get('div.swal2-popup', { timeout: 20000 }).should('be.visible')
    cy.get('div.swal2-success-ring', { timeout: 20000 }).should('be.visible')
    cy.get('button.swal2-confirm').click()
  })

  // Test 3: Change email
  it('should change email successfully', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a.login-link').should('be.visible', { timeout: 10000 }).click()
    cy.get('div.flex-row', { timeout: 10000 }).should('be.visible')
    cy.get('div.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('#login-form [name="email"]').type(user.email)
    cy.get('#login-form [name="password"]').type(user.password)
    cy.get('#login-form button.modal-form-login-button').click()
    cy.get('a[data-cypress-el="true"]', { timeout: 10000 }).should('be.visible').click()

    // Change email
    cy.get('input[name="email"]', { timeout: 10000 }).clear().type(user.newEmail)
    cy.get('div.form__email div.form__button').click()
    cy.get('div.swal2-popup', { timeout: 20000 }).should('be.visible')
    cy.get('div.swal2-success-ring', { timeout: 20000 }).should('be.visible')
    cy.get('button.swal2-confirm', { timeout: 20000 }).click()
  })

  // Test 4: Verify changed email
  it('should verify changed email works and change back', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a.login-link').should('be.visible', { timeout: 10000 }).click()
    cy.get('div.flex-row', { timeout: 10000 }).should('be.visible')
    cy.get('div.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('#login-form [name="email"]').type(user.email)
    cy.get('#login-form [name="password"]').type(user.password)
    cy.get('#login-form button.modal-form-login-button').click()

    // Old email should fail
    cy.get('div.swal2-popup', { timeout: 5000 }).should('be.visible')
    cy.get('span.swal2-x-mark', { timeout: 5000 }).should('be.visible')
    cy.get('button.swal2-confirm').click()

    // New email should succeed
    cy.get('#login-form [name="email"]').clear().type(user.newEmail)
    cy.get('#login-form button.modal-form-login-button').click()
    cy.get('a[data-cypress-el="true"]', { timeout: 10000 }).should('be.visible').click()

    // Change email back
    cy.get('input[name="email"]').clear().type(user.email)
    cy.get('div.form__email div.form__button').click()
    cy.get('div.swal2-popup', { timeout: 20000 }).should('be.visible')
    cy.get('div.swal2-success-ring', { timeout: 20000 }).should('be.visible')
  })

  // Test 5: Profile update and data persistence
  it('should update profile and persist data after reload', () => {
    cy.safeVisit(Cypress.env('BASE_URL'))
    cy.get('a.login-link').click()
    cy.get('.modal-header', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-body', { timeout: 10000 }).should('be.visible')
    cy.get('.login-form > [name="email"]').type(user.email)
    cy.get('[name="password"]').type(user.password)
    cy.get('.modal-form-login-button').click()
    cy.contains('Profile', { timeout: 10000 }).should('be.visible')
    cy.get('a[data-cypress-el="true"]').click()

    // Fill profile form
    cy.get('#country').clear().type('UKR')
    cy.get('#address').clear().type('street')
    cy.get('#post-index').clear().type('01001')
    cy.get('#code').clear().type('123456789')
    cy.get('#birthday').clear().type('2001-01-01')
    cy.get('#facebook').clear().type('facebook')
    cy.get('#linkedin').clear().type('linkedin')

    // Toggle interests
    cy.get('[name="interest[1]"]').uncheck({ force: true }).wait(500).check({ force: true })
    cy.get('[name="interest[3]"]').uncheck({ force: true }).wait(500).check({ force: true })
    cy.get('[name="interest[5]"]').uncheck({ force: true }).wait(500).check({ force: true })

    // Save
    cy.get('button.save__button').click()
    cy.get('div.swal2-popup', { timeout: 10000 }).should('be.visible')
    cy.get('div.swal2-success-ring').should('be.visible')
    cy.get('button.swal2-confirm').click()

    // Verify data persists after reload
    cy.reload()
    cy.get('#address').should('be.visible').and('have.value', 'street')
    cy.get('#post-index').should('be.visible').and('have.value', '01001')
    cy.get('#code').should('be.visible').and('have.value', '123456789')
    cy.get('#birthday').should('be.visible').and('have.value', '2001-01-01')
    cy.get('#facebook').should('be.visible').and('have.value', 'facebook')
    cy.get('#linkedin').should('be.visible').and('have.value', 'linkedin')
    cy.get('[name="interest[1]"]').should('be.checked')
    cy.get('[name="interest[3]"]').should('be.checked')
    cy.get('[name="interest[5]"]').should('be.checked')
  })

})