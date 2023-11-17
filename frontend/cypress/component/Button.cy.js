/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../../src/components/form/LoginForm';

describe('LoginForm Component', () => {
  it('navigates to home when "Cancel" is clicked', () => {
    // Mount the LoginForm component wrapped in Router
    cy.mount(
      <Router>
        <LoginForm />
      </Router>
    );

    // Click the "Cancel" button
    cy.get('button[type="button"]').click();

    // Check if the URL has been changed to the home page
    cy.url().should('include', 'localhost:')
  });
});
