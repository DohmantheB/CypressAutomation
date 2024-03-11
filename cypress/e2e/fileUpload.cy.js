/// <reference types="cypress" />
describe('Cypress File Upload Tests', () => {
    /*
    In order to upload files in Cy we need to install plugin
    1-) run this command:
    npm install -dev cypress-file-upload
    2-) import necessary command
    add -->  import 'cypress-file-upload'; <--      to support/commands.js file
    3-) file has to be in the fixture folder
    */
    beforeEach('Navigate to upload page', () => {
      cy.clearCookies();
      cy.visit('/upload')
    });
  
    it('Check upload action', () => {
        //locator for choose file button
        cy.get('input#file-upload').attachFile('henry-link-we-generate-fears-while-we-sit.png')
        //click on upload button
        cy.get('#file-submit').click();
        //assert that path message is displayed
        cy.get('#uploaded-files').then(() => {
            cy.contains('henry-link-we-generate-fears-while-we-sit.png').should('be.visible');
        })

    });
  
   
  });
  