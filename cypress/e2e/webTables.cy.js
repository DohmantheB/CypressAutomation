/// <reference types="cypress" />
describe('Cypress Web Table Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /*
    different from the Base URL
    define it at describe block
    or

    */
  beforeEach('Navigate to upload page', () => {
    cy.clearCookies();
    cy.visit('/webtables');
  });

  it('Check finding and editing a record', () => {
    // locate table body
    // then navigate through this element to find Alden,
    // then update info with another person

    cy.get('.rt-tbody') // getting table body
      .contains('.rt-tr-group', 'Alden') //
      .then((row) => {
        // click on edit button for Alden record
        cy.wrap(row).find('[title="Edit"]').click();
        // fill in the box with new person
        cy.get('#firstName').clear().type('Harvey');
        cy.get('#lastName').clear().type('Specter');
        cy.get('#submit').click();
        // still inside the row element
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
      });
  });
});
