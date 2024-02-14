/// <reference types="cypress" />
describe('Context: My First Tests', () => {
    before(() => {
        //runs once before all test cases in this describe block
    })
    
    beforeEach(()=>{
        //run before each test case
        cy.clearCookies();
    })

    after(()=>{
        //run once after all test cases in this describe block
    })

    afterEach(()=>{
        //run before each test case
    })

    it('Opening a web application',()=>{
        cy.visit('https://practice.cydeo.com/');
        cy.get(':nth-child(9) > a').click();
        cy.get('.nav-link').click();
    })


})