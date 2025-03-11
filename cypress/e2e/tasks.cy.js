/// <reference types="Cypress"/>

describe("tasks page", () => {
  it("should display the title", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header").find("h1").contains("Today's Task");
  });

  it("should display the main image", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header").find("img");
  });

  it("should display information for empty task list", () => {
    cy.visit("http://localhost:5173/");
    cy.get("main").find('[data-cy="no-tasks"]');
  });

  it("should display filter options", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#filter").find("option").should("have.length", 5);
  });

  it("should display button for adding task", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').contains("Add Task");
  });
});

describe("add task modal", () => {
  it("should contains inputs fields in the modal", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]');
    cy.get('[data-cy="summary-input"]');
    cy.get('[data-cy="category-input"]').find("option").should("have.length", 4);
    cy.get('[data-cy="cancel"]').contains("Cancel");
    cy.get('[data-cy="submit"]').contains("Add Task");
  });
});

describe("tasks interactions", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="cancel"]').click();
    cy.get('[data-cy="modal"]').should("not.exist");
  });

  it("should add new task", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]').type("Task 1");
    cy.get('[data-cy="summary-input"]').type("Description for task 1");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="task"]').should("have.length",1);
    cy.get('[data-cy="task"]').find("h2").contains("Task 1");
    cy.get('[data-cy="task"]').find("p").contains("Description for task 1");
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]').type("Task 1");
    cy.get('[data-cy="summary-input"]').type("Description for task 1");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="task"]').should("have.length",1);

    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]').type("Task 2");
    cy.get('[data-cy="summary-input"]').type("Description for task 2");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="task"]').should("have.length",2);

    cy.get('[data-cy="task"]').eq(0).find("h2").contains("Task 1");
    cy.get('[data-cy="task"]').eq(0).find("p").contains("Description for task 1");

    cy.get('[data-cy="task"]').eq(1).find("h2").contains("Task 2");
    cy.get('[data-cy="task"]').eq(1).find("p").contains("Description for task 2");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-message"]').contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]').type("Task 1");
    cy.get('[data-cy="summary-input"]').type("Description for task 1");
    cy.get('[data-cy="category-input"]').select("urgent");
    cy.get('[data-cy="submit"]').click();

    cy.get('[data-cy="task"]').should("have.length",1);
    
    cy.get('[data-cy="filter"]').select("urgent");
    cy.get('[data-cy="task"]').should("have.length",1);
     
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]').type("Task 2");
    cy.get('[data-cy="summary-input"]').type("Description for task 2");
    cy.get('[data-cy="category-input"]').select("low");
    cy.get('[data-cy="submit"]').click();

    cy.get('[data-cy="task"]').should("have.length",2);
    
    cy.get('[data-cy="filter"]').select("low");
    cy.get('[data-cy="task"]').should("have.length",1);

  });


});
