/// <reference types="cypress" />
describe('Find or Get Elements by Using Different Locators', () => {
    beforeEach(()=>{
        //run before each test case
        cy.clearCookies();
        cy.visit('/login');
    })

    it('Check different locators strategies',()=>{
        //by CSS locator
        cy.get("input[name='username']").type("BooStudent");

        //attribute name and value
        cy.get("[type='text']").clear();  //clear what is typed.
    })

})