/// <reference types="cypress" />
describe('Alerts in Cypress Test Environment', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/alerts');
  });

  it('Check alert confirmation', () => {
    /*
  Browser Commands; window:alert, window:confirm, window:on...
  */
    const stub = cy.stub(); // create a stub func
    cy.on('window:confirm', stub); // when this confirmation cmd initiated store and give the control to stub func.

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => true); // confirm the alert

    cy.contains('You selected Ok').should('be.visible');
  });

  it('Check alert cancellation', () => {
    const stub = cy.stub();
    cy.on('window:confirm', stub);

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => false); // cancel the alert

    cy.contains('You selected Cancel').should('be.visible');
  });
});
