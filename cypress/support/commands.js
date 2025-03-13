// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("openAddNewTaskForm", () => {
    cy.get('[data-cy="start-add-task-button"]').click();    
});

Cypress.Commands.add("addTask", (title, summary, category = "moderate") => {
    cy.get('[data-cy="start-add-task-button"]').click();
    cy.get('[data-cy="title-input"]').type(title);
    cy.get('[data-cy="summary-input"]').type(summary);
    cy.get('[data-cy="category-input"]').select(category);
    cy.get('[data-cy="submit"]').click();
  });