/// <reference types="cypress" />
describe('Input Forms Tests', () => {
  beforeEach('Navigate to registration page', () => {
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it.skip('Check different box fields and verify', () => {
    // fill the form for username and other info
    cy.get('input[name="firstname"]').type('Mike');
    cy.get('input[name="lastname"]').type('Brown');
    cy.get('input[name="username"]').type('CrazyHeart');
    /*
        Math.random();     creates a number btw 0-1  ~0.005678
        
    */
    const email = `formtest${Math.floor(100000 + Math.random() * 900000)}@dohman.com`; // reverse single quotes + ${}+ Math.random()
    cy.get('input[name="email"]').type(email);
    // dynamic password input
    const password = `test${Math.floor(100000 + Math.random() * 900000)}`;
    cy.get('input[name="password"]').type(password);
    const phoneNumber = `555-000-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('input[name="phone"]').type(phoneNumber);
    cy.get('input[name="birthday"]').type('01/02/1999');
  });

  it.skip('Check different radio button actions', () => {
    cy.get('input[type="radio"]')
      // cy.get('.radio') //locator olarak bu da kullanılabilir.  -->  input[type="radio"]
      //  .find('[type=radio]')
      .then((radio) => {
        // get all radio buttons, select the 1st one and verify that it is checked
        cy.wrap(radio).first().check().should('be.checked'); // cypress works in a chainable functions structure
        /**
         * radio: is jQuery element, cy.wrap(radio): turns it into cy obj
         * first() : select first element
         * check() : checks it out
         * should() : verifies whatever I provide as param  'be.checked'
         */

        // get all radio buttons, select the 2nd one and verify that it is checked

        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible');
        // checked 3rd radio button is UNCHECKED
        cy.wrap(radio).eq(2).should('not.be.checked');
      });
  });

  it.skip('Check different checkbox actions', () => {
    // get all check boxes, select JAVA is checked
    cy.get('[type="checkbox"]').then((checkBoxes) => {
      cy.wrap(checkBoxes).eq(1).check().should('be.checked');
      // unchecked java from the page
      // verify uncheck
      cy.wrap(checkBoxes).eq(1).uncheck().should('not.be.checked');
      // verify 3rd one as a value Javascript and check and verify
      cy.wrap(checkBoxes).eq(2).should('have.value', 'javascript').check().should('be.checked');
    });
  });
  it.skip('Check selection of a single choice from a select dropdown', () => {
    cy.get('select[name="job_title"]').select('SDET');
    // assert that dropdown has correct text after selecting
    cy.get('select[name="job_title"]').contains('SDET');
  });

  it('Check selection of all select dropdowns options', () => {
    // we will provide out test data through fixtures folder as JSON obj, then use that data to verify select values.
    cy.fixture('departments').then((departments) => {
        //get all options in the menu, iterate through these options one by one
        cy.get('select[name="department"] > option').each((option,index) => {
            //get each option text
            const optionText =option.text();
            cy.log(optionText);
            cy.log(index);
            cy.log(departments[index]);
        })

    })

  });
});
