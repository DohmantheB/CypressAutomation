/// <reference types="cypress" />
describe('Context: My First Tests', () => {
  beforeEach(() => {
    // run before each test case
    cy.clearCookies();
    cy.visit('/multiple_buttons');
  });

  it('Check Different Button Actions', () => {
    // select a button with text
    cy.contains('Button 2').should('be.visible').click();
    cy.contains('Clicked on button two!').should('be.visible');

    // find element wit class attribute and create a list then select3rd element from the  list
    cy.get('.btn.btn-primary').then(($buttons) => {
      cy.wrap($buttons).eq(2).click();
      // assert the text
      cy.contains('Clicked on button three!').should('be.visible');
    });
    // you got all buttons with tagName, each method is creating me a loop
    cy.get('button').each((item, index, list) => {
      // assert length of the list, verify number of buttons
      expect(list).to.have.length(6);
      expect(item).to.have.attr('onclick');
    });

    // get all button, get only the item then check text of each item, ir it is eq to button 4 then click on it.
    cy.get('button').each((item) => {
      if (item.text() == 'Button 4') {
        cy.log(item.text()); // logging text
        // item.click(); --> can not use cy click func on jQuery element
        cy.wrap(item).click();
        // assertion
        cy.contains('Clicked on button four!').should('be.visible');
      }
    });
  });
});
