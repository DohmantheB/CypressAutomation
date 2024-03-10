/// <reference types="cypress" />
describe('Input Forms Tests', () => {
  beforeEach('Navigate to registration page', () => {
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it('Check different box fields and verify', () => {
    //fill the form for username and other info
    cy.get('input[name="firstname"]').type('Mike');
    cy.get('input[name="lastname"]').type('Brown');
    cy.get('input[name="username"]').type('CrazyHeart');
    /*
        Math.random();     creates a number btw 0-1  ~0.005678
        
    */
    let email = `formTest${Math.floor(100000 + Math.random() * 900000)}@dohman.com`; //reverse single quotes + ${}+ Math.random()

    cy.get('placeholder="email@email.com"').type(email);
  });
});
