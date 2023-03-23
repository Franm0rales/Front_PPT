/// <reference types="cypress" />

describe('My Cypress test', () => {
  it('Visits the homepage', () => {
    cy.visit('http://localhost:3000/home')
    cy.get('.content-ltr > .container > .opciones > .nombre-input')
    .type('Fran');
    cy.get('.content-ltr > .container > .opciones > .botones-container > .boton-piedra').click()
    cy.get('.swal2-confirm').click()
    cy.get('.content-ltr > .container > .opciones > .boton-jugar').click()

  })
})