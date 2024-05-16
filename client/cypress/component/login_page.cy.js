import LogIn from "../../src/components/main/loginPage";

it('mounts', () => {
    cy.mount(<LogIn/>)
    cy.get('#formUsernameInput')
    cy.get('#formPasswordInput')
})


it('shows username inputted by user', () => {
    cy.mount(<LogIn/>)
    cy.get('#formUsernameInput').should('have.value', '')
    cy.get('#formUsernameInput').type('abc')
    cy.get('#formUsernameInput').should('have.value', 'abc')
})

it('shows password inputted by user', () => {
    cy.mount(<LogIn/>)
    cy.get('#formPasswordInput').should('have.value', '')
    cy.get('#formPasswordInput').type('abc')
    cy.get('#formPasswordInput').should('have.value', 'abc')
})

it('shows error message when inputs are empty', () => {
    cy.mount(<LogIn/>)
    cy.get('#login_btn').click()
    cy.get('div .input_error').contains('Username cannot be empty')
    cy.get('div .input_error').contains('Password cannot be empty')

})