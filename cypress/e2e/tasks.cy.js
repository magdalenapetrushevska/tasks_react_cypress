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
    cy.get("main").find(".no-tasks");
  });

  it("should display filter options", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#filter").find("option").should("have.length", 5);
  });

  it("should display button for adding task", () => {
    cy.visit("http://localhost:5173/");
    cy.get("button").should("have.length", 1).contains("Add Task");
  });
});

describe("add task modal", () => {
  it("should contains inputs fields in the modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").find("#title");
    cy.get(".modal").find("#summary");
    cy.get(".modal").find("#category").find("option").should("have.length", 4);
    cy.get(".modal").find("button").first().contains("Cancel");
    cy.get(".modal").find("button").last().contains("Add Task");
  });
});

describe("tasks interactions", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").should("exist");
    cy.get(".modal").find("button").contains("Cancel").click();
    cy.get(".modal").should("not.exist");
  });

  it("should add new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("Task 1");
    cy.get("#summary").type("Description for task 1");
    cy.get(".modal").find("button").contains("Add Task").click();
    cy.get(".task").should("have.length",1);
    cy.get(".task").find("h2").contains("Task 1");
    cy.get(".task").find("p").contains("Description for task 1");
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");

    cy.contains("Add Task").click();
    cy.get("#title").type("Task 1");
    cy.get("#summary").type("Description for task 1");
    cy.get(".modal").find("button").contains("Add Task").click();
    cy.get(".task").should("have.length",1);

    cy.contains("Add Task").click();
    cy.get("#title").type("Task 2");
    cy.get("#summary").type("Description for task 2");
    cy.get(".modal").find("button").contains("Add Task").click();
    cy.get(".task").should("have.length",2);

    cy.get(".task").eq(0).find("h2").contains("Task 1");
    cy.get(".task").eq(0).find("p").contains("Description for task 1");

    cy.get(".task").eq(1).find("h2").contains("Task 2");
    cy.get(".task").eq(1).find("p").contains("Description for task 2");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.get(".error-message").contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("Task 1");
    cy.get("#summary").type("Description for task 1");
    cy.get("#category").select("urgent");
    cy.get(".modal").find("button").contains("Add Task").click();

    cy.get(".task").should("have.length",1);
    
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length",1);
     
    cy.contains("Add Task").click();
    cy.get("#title").type("Task 2");
    cy.get("#summary").type("Description for task 2");
    cy.get("#category").select("low");
    cy.get(".modal").find("button").contains("Add Task").click();

    cy.get(".task").should("have.length",2);
    
    cy.get("#filter").select("low");
    cy.get(".task").should("have.length",1);

  });


});
