/// <reference types="cypress" />
describe("Find or Get Elements by Using Different Locators", () => {
  beforeEach(() => {
    //run before each test case
    cy.clearCookies();
    cy.visit("/login");
  });

  it("Check different locators strategies", () => {
    //by CSS locator
    cy.get("input[name='username']").type("BooStudent");

    //attribute name and value
    cy.get("[type='text']").clear(); //clear what is typed.

    //tagName locators
    cy.get("input").each((item, index, list) => {
      //assert the length of the list
      expect(list).to.have.length(2);
      expect(item).to.have.attr("type");
    });

    // by attributeName
    cy.get("[type]");

    //by class name value
    cy.get(".btn.btn-primary"); // use dot(.) for spaces => I-      btn btn-primary
    //                          II-     .btn.btn-primaty

    //by id
    cy.get("#wooden_spoon");

    // want to use text : not xpath in cy, but it still possible wit a different approach
    cy.get("button").should("contain", "Login").click();
  });

  it("Check finding elements by traveling through DOM", () => {
    //travel to find login button: locate usernama box-goto parent form then find button
    cy.get('input[name="username"]')
      .parents("form")
      .find("button")
      .should("contain", "Login")
      .click();
  });

  it.only("Check different type of assertions", () => {
    //Cypress itself bundles assertions provided by Chai, Sinon and jQuery libs.
    //Should assertion:
    cy.get("#wooden_spoon")
      .should("contain", "Login")
      .and("have.class", "btn btn-primary");

    //expect assertion:
    cy.get("#wooden_spoon").then((buttonElement) => {
      //creating a subject and implement it below lines.
      expect(buttonElement).to.have.text("Login");
      expect(buttonElement).to.have.class("btn btn-primary");
    });
  });
});
