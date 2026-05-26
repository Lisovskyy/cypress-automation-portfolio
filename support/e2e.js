import './commands'
import 'cypress-mailslurp'
import "cypress-real-events"
Cypress.on('uncaught:exception', (err) => {
    const msg = err.message || ''
    if (
        msg.includes('classList') ||
        msg.includes('Cannot read properties of null') ||
        msg.includes('googletagmanager') ||
        msg.includes('gtm') ||
        msg.includes('Script error') ||
        msg.includes('cross origin script') ||
        msg.includes('Invariant Violation')
    ) {
        return false;
    }
})