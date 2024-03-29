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

  it('Check finding and deleting a record', () => {
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden')
      .then((row) => {
        cy.wrap(row).find('[title="Delete"]').click();
      });
    // #1st => Assert that table does NOT have Allen record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // 2nd => search for Alden on search box
    cy.get('#searchBox').type('Alden');
    // assert that there is no record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // 3rd =>
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });

  it('Check search for different age records', () => {
    // define age group
    const ages = [29, 39, 45, 77];
    // for each age group perform same test scenario
    cy.wrap(ages).each((age) => {
      // type age into search box
      cy.get('#searchBox').clear().type(age);

      // negative scenario
      cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
      cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');

      // positive scenario
      // verify if that age exists, second number of records
      cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
      cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
    });
  });
  it('Check adding a new record - Bad code practice', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Harvey');
    cy.get('#lastName').type('Specter');
    cy.get('#userMail').type('specter@example.com');
    cy.get('#age').type('40');
    cy.get('#salary').type('70000');
    cy.get('#department').type('legal');
    cy.get('#submit').click();

    // assert that new record is added
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Harvey')
      .then((row) => {
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '70000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');
      });
  });

  it('Adding a new record - Better Aproach', () => {
    // click on add button
    cy.get('#addNewRecordButton').click();
    cy.fixture('user').then((user) => {
      const columnNames = Object.keys(user.user1); // go to fixture folder gets user1 obj keys and stores into columnName Array
      const userData = Object.values(user.user1);
      cy.wrap(columnNames).each((columnName, index) => {
        // cy.log(columnNames);
        // cy.log(userData[index]);
        cy.get(`#${columnName}`).type(`${userData[index]}`);
      });
      cy.get('#submit').click();
      // assert that new rec is added
      cy.get('.rt-tbody')
        .contains('.rt-tr-group', userData[0])
        .then((row) => {
          cy.wrap(userData).each((value, index) => {
            cy.wrap(row).find('.rt-td').eq(index).should('contain', value);
          });
        });
    });
  });
});
