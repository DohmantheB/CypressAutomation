/// <reference types="cypress" />

describe("Context: My First Tests", () => {
  before(() => {
    // runs once before all test cases in this describe block, like beforeClass
  });
  beforeEach(() => {
    // run before each test cases, like beforeMethod in TestNG
    cy.clearCookies();
  });
  after(() => {
    // runs once after all test cases in this describe block, like afterClass
  });
  afterEach(() => {
    // run after each test cases, like afterMethod in TestNG

  });
});
