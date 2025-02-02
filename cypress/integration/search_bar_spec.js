describe("Post feed", () => {
  it("A user can see their friends posts in reverse chronological order", () => {
    // delete all table entries
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

    // sign up user 1.0
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    cy.get(".homepage-title").contains("Welcome to Acebook");

    // sign up user 2.0
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someoneelse");
    cy.get("#email").type("someoneelse@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in as user 2.0
    cy.visit("/");
    cy.get("#email").type("someoneelse@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
    cy.get("#search").type("someone");
    cy.get(".magnifying-glass").click();

    // can only see user 1.0's post in feed (and not enemy's)
    cy.get("#profile-header").contains("someone's profile");
  });
});
