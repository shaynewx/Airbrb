/* eslint-disable no-undef */
/**
 * Happy Path Test
 * Steps:
 * ================ Hosted ===================
 * 0. Visit home page through landing page
 * 1. Create a new account in
 * 2. Go to check hosted listings in login successful page
 * 3. Create a new listing
 * 4. Edit the listing
 * 5. Publish the listing
 * 6. Check all published listings
 * 7. Log out successfully
 * 8. Login successfully
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

  // Step0 Jump to home page
  it('Step0: jump to home page successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
    // Check whether have an airbrb h1 label and a welcome h3 label
    cy.get('h1').should('have.text', 'Airbrb');
    cy.get('h3').should('have.text', 'Welcome!');
  });

  // Step1 Create a new account
  it('Step1: should navigate to register page successfully', () => {
    cy.visit('localhost:3000/register');
    cy.url().should('include', 'localhost:3000/register');
    cy.get('h2').should('have.text', 'Create an account');
    cy.get('input[id="register_email"]').focus().type('elva11@gmail.com');
    cy.get('input[id="register_name"]').focus().type('elva9');
    cy.get('input[id="register_password"]').focus().type('123456xy');
    cy.get('input[id="register_confirm"]').focus().type('123456xy');
    cy.get('button[type="submit"]').click();
    // After Registration there will be a "Registration successful" message
    cy.get('.ant-message').should('have.text', 'Registration successful');
    // store token into localStorage
    cy.window().its('localStorage.token').should('exist');

    cy.url().should('include', 'localhost:3000/login-result');
  });
  // <==================== END ==========================>
  // Step2 Go to check hosted listings in login successful page
  it('Step2: should navigate to login-result page successfully', () => {
    cy.visit('localhost:3000/login-result');
    cy.url().should('include', 'localhost:3000/login-result');
    cy.get('h1').should('have.text', 'Airbrb');
    cy.get('h3').should('have.text', 'Welcome!');
    cy.get('button[name="view-hosted-listings"]').click();
    cy.url().should('include', 'localhost:3000/hosted-listing');
  });
  // <==================== END ==========================>
  // Step3 Create a new listing
  it('Step3: should navigate to hosted-listing page successfully', () => {
    cy.visit('localhost:3000/hosted-listing');
    cy.url().should('include', 'localhost:3000/hosted-listing');
    cy.get('h2').should('have.text', 'Hosted Listings');
    cy.get('button[name="create-new-listing"]').click();
    cy.get('input[id="title"]').focus().type('elva11 house');
    cy.get('input[id="address"]').focus().type('elva11 street');
    cy.get('input[id="price"]').focus().type('90');
    cy.get('input[id="bathrooms"]').focus().type('2');
    cy.get('button.ant-btn.ant-btn-primary.css-dev-only-do-not-override-2i2tap').eq(2).click();
    cy.url().should('include', 'localhost:3000/hosted-listing');
  });
  // <==================== END ==========================>
  // Step4 Edit the listing
  it('Step4: Edit the listing', () => {
    cy.visit('localhost:3000/hosted-listing');
    cy.url().should('include', 'localhost:3000/hosted-listing');
    cy.get('h2').should('have.text', 'Hosted Listings');
    cy.get('button[name="edit-button"]').click();
    cy.url().should('include', 'localhost:3000/edit-listing');
    cy.get('h2').should('have.text', 'Edit Listing');
    cy.get('input[id="title"]').focus().type('elva1111 house');
    cy.get('button[name="save-button"]').click();
    cy.url().should('include', 'localhost:3000/hosted-listing');
  });
  // <==================== END ==========================>
  // Step5 Publish the listing
  it('Step4: Publish the listing', () => {
    cy.visit('localhost:3000/hosted-listing');
    cy.url().should('include', 'localhost:3000/hosted-listing');
    cy.get('button[name="publish-button"]').click();
    // select start date
    cy.get('input[placeholder="Start date"]')
      .invoke('removeAttr', 'readonly')
      .clear()
      .type('2023-12-01');
    // select end date
    cy.get('input[placeholder="End date"]')
      .invoke('removeAttr', 'readonly')
      .clear()
      .type('2023-12-30');
    cy.contains('button.ant-btn-primary', 'OK').click({ force: true });
  });
  // <==================== END ==========================>
  // Step6 Check all published listings
  it('Step5: Check all published listings', () => {
    cy.visit('localhost:3000/all-listing');
    cy.url().should('include', 'localhost:3000/all-listing');
  });
  // <==================== END ==========================>
  // Step7 Log out successfully
  it('Step6: Log out successfully', () => {
    cy.visit('localhost:3000/all-listing');
    cy.url().should('include', 'localhost:3000/all-listing');
    cy.get('button[name="logout-button"]').click();
    cy.url().should('include', 'localhost:3000/');
  });
  // <==================== END ==========================>
  // Step8 Login successfully
  it('Step7: Log in successfully', () => {
    cy.visit('localhost:3000/login');
    cy.url().should('include', 'localhost:3000/login');
    cy.get('h2').should('have.text', 'Login');
    cy.get('input[id="basic_email"]').focus().type('elva10@gmail.com');
    cy.get('input[id="basic_password"]').focus().type('123456xy');
    cy.get('button[type="submit"]').click();
    cy.window().its('localStorage.token').should('exist');
    cy.url().should('include', 'localhost:3000/login-result');
  });
});
