/* eslint-disable no-undef */
/**
 * Happy Path Test
 * Steps:
 * ================ Hosted ===================
 * 0. Visit home page through landing page
 * 1. Create a user through register page
 * 2. Create a listing through create listing page
 * 3. Edit the listing through edit listing page
 * 4. Set availability through availability page
 * 5. Publish the listing through publish button
 * 6. Unpublish the listing through unpublish button
 * ================== User ====================
 * 7. Visit listing page through home page
 * 8. Visit listing detail page through listing detail page
 * 9. Make a booking through booking page
 * 10. Logout through logout button
 */
describe('airbrb happy path', () => {
  // Before each test we need to restore local storage to preserve it.
  beforeEach(() => {
    cy.restoreLocalStorage()
  });
  // After each test we save local storage.
  afterEach(() => {
    cy.saveLocalStorage()
  });
  // Step0: Jump to home page
  it('Step0: jump to home page successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
    // Check whether have an airbrb h1 label and a welcome h3 label
    cy.get('h1').should('have.text', 'Airbrb');
    cy.get('h3').should('have.text', 'Welcome!');
  });
  // <==================== END ==========================>
});
