# Cypress Automation Portfolio

End-to-end test suite built with Cypress covering key user flows of a fintech investment platform.

## Project Structure

```
cypress/
  e2e/
    tests/
      forms.cy.js
      invest_proc.cy.js
      login.cy.js
      profile.cy.js
      registration.cy.js
  support/
    commands.js
    e2e.js
```

## Test Coverage

| File | Description |
|------|-------------|
| `login.cy.js` | Login flow — valid/invalid credentials, empty fields, error messages |
| `registration.cy.js` | Registration with email verification via temp mail (MailSlurp API) |
| `profile.cy.js` | Profile update — change password, email, personal data, data persistence |
| `invest_proc.cy.js` | Full investment flow — project selection, bank transfer payment |
| `forms.cy.js` | Form validation across multiple pages |

## Tech Stack

- [Cypress](https://www.cypress.io/) — E2E testing framework
- [cypress-mailslurp](https://www.npmjs.com/package/cypress-mailslurp) — temp email & OTP verification
- [cypress-real-events](https://www.npmjs.com/package/cypress-real-events) — real browser events (hover, etc.)

## Key Features

- Custom `safeVisit` command for stable page loading
- Exception handling for third-party scripts
- Positive and negative test scenarios
- Data persistence verification after reload