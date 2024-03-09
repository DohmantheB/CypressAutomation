/// <reference types="cypress" />
describe("Context: My First Tests", () => {
  before(() => {
    //runs once before all test cases in this describe block
  });

  beforeEach(() => {
    //run before each test case
    cy.clearCookies();
  });

  after(() => {
    //run once after all test cases in this describe block
  });

  afterEach(() => {
    //run before each test case
  });

  it.skip("Opening a web application", () => {
    cy.visit("https://practice.cydeo.com/");
  });

  xit("Test 2", () => {
    expect(false).to.equal(false);
  });

  it("Test 3", () => {
    expect(false).not.to.equal(true);
  });

  it("Test 4", () => {
    expect(5).to.equal(5);
  });

  it("Test 5", () => {
    expect(true).to.equal("5" == 5);
  });
});
