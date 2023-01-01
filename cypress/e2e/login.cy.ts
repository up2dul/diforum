/// <reference types="cypress" />
/**
 * - Login spec
 *   - should display Log in page correctly
 *   - should display error messages when email and password is empty
 *   - should navigate to homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => cy.visit('http://localhost:5173/login'));

  it('should display Log in page correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Log in').should('be.visible');
  });

  it('should display error messages when email and password is empty', () => {
    cy.get('button').contains('Log in').click();

    cy.get('label').contains('Email').contains('Enter your email address');
    cy.get('label').contains('Password').contains('Enter your password');
  });

  it('should navigate to homepage when email and password are correct', () => {
    cy.get('input[name="email"]').type('john123@gmail.com');
    cy.get('input[name="password"]').type('johndoe123');

    cy.get('button').contains('Log in').click();

    cy.get('h2').contains('👋 Hi, John doe!').should('be.visible');
    cy.get('article.thread-card').should('be.visible');
  });
});
