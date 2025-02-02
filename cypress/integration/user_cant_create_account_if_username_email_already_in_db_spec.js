describe("Sign up validation", () => {
  beforeEach(() => {
    // clear db
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });
    setTimeout(() => {}, 200);
  });
  it("user can't create a new account if username already exists in db", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get(".homepage-title").contains("Welcome to Acebook");

    // sign up again
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("ralph@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get("#sign-up-error-div").contains(
      "This username or email is already being used."
    );
    cy.get("#sign-up-error-div").contains(
      "Emails and usernames must be unique."
    );
  });

  it("user can't create a new account if email already exists in db", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get(".homepage-title").contains("Welcome to Acebook");

    // sign up again
    cy.visit("/users/new");
    cy.get("#username").type("ralph");
    cy.get("#first-name").type("ralph");
    cy.get("#last-name").type("dal");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get("#sign-up-error-div").contains(
      "This username or email is already being used."
    );
    cy.get("#sign-up-error-div").contains(
      "Emails and usernames must be unique."
    );
  });

  it("user can't create a new account if email and username already exists in db", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get(".homepage-title").contains("Welcome to Acebook");

    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get("#sign-up-error-div").contains(
      "This username or email is already being used."
    );
    cy.get("#sign-up-error-div").contains(
      "Emails and usernames must be unique."
    );
  });

  it("will only load the message once", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get(".homepage-title").contains("Welcome to Acebook");

    // sign up with existing details
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#first-name").type("billy");
    cy.get("#last-name").type("bob");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get("#sign-up-error-div").contains(
      "This username or email is already being used."
    );
    cy.get("#sign-up-error-div").contains(
      "Emails and usernames must be unique."
    );
    // sign up with existing details again
    cy.get("#username").clear();
    cy.get("#username").type("billy");
    cy.get("#email").clear();
    cy.get("#email").type("billy@example.com");
    cy.get("#password").clear();
    cy.get("#password").type("password");
    cy.get("#signup").click();
    cy.get("#sign-up-error-div").then((els) => expect(els).to.have.length(1));
  });
});
