/* eslint-disable no-undef */
import React from 'react';
// import Button from '../../src/components/Button';

describe('Button Component Test', () => {
  it('should mount', () => {
    cy.mount(<Button>Click Me</Button>);
    cy.get('button').contains('Click Me');
  });

  it('when button is clicked, should call onClick', () => {
    cy.mount(<Button onClick={cy.spy().as('onClick')}>Click Me</Button>);
    cy.get('button').contains('Click Me').click();
    cy.get('@onClick').should('have.been.called');
  });
});
