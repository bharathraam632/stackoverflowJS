import SignUp from "../../src/components/main/signUpPage";

it('mounts', () => {
    cy.mount(<SignUp/>)
    cy.get('#formUsernameInput')
    cy.get('#formPasswordInput')
    cy.get('#formNameInput')
    cy.get('#formEmailInput')
    cy.get('#formPhoneInput')
    cy.get('#formPhoneInput')
    cy.get('#formSummaryInput')
    cy.get('#formImageInput')
})


it('shows username inputted by user', () => {
    cy.mount(<SignUp/>)
    cy.get('#formUsernameInput').should('have.value', '')
    cy.get('#formUsernameInput').type('abc')
    cy.get('#formUsernameInput').should('have.value', 'abc')
})

it('shows password inputted by user', () => {
    cy.mount(<SignUp/>)
    cy.get('#formPasswordInput').should('have.value', '')
    cy.get('#formPasswordInput').type('abc')
    cy.get('#formPasswordInput').should('have.value', 'abc')
})

it('shows name inputted by user', () => {
    cy.mount(<SignUp/>)
    cy.get('#formNameInput').should('have.value', '')
    cy.get('#formNameInput').type('abc')
    cy.get('#formNameInput').should('have.value', 'abc')
})

it('shows email inputted by user', () => {
    cy.mount(<SignUp/>)
    cy.get('#formEmailInput').should('have.value', '')
    cy.get('#formEmailInput').type('abc')
    cy.get('#formEmailInput').should('have.value', 'abc')
})

it('shows phone inputted by user', () => {
    cy.mount(<SignUp/>)
    cy.get('#formPhoneInput').should('have.value', '')
    cy.get('#formPhoneInput').type('001232-232130')
    cy.get('#formPhoneInput').should('have.value', '001232-232130')
})

it('shows summary inputted by user', () => {
    cy.mount(<SignUp/>)
    cy.get('#formSummaryInput').should('have.value', '')
    cy.get('#formSummaryInput').type('Hi, I am abc a very good programmer...')
    cy.get('#formSummaryInput').should('have.value', 'Hi, I am abc a very good programmer...')
})

it('shows error message when inputs are empty', () => {
    cy.mount(<SignUp/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Username cannot be empty')
    cy.get('div .input_error').contains('Password cannot be empty')
    cy.get('div .input_error').contains('Please provide Full Name')
    cy.get('div .input_error').contains('Email cannot be empty')
    cy.get('div .input_error').contains('Please provide a brief summary about yourself.')

})

it('shows error message when summary is more than 500 characters', () => {
    cy.mount(<SignUp/>)
    cy.get('#formSummaryInput').type('a'.repeat(301))
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Summary cannot be more than 300 characters')
})

it('shows error message when email is invalid', () => {
    cy.mount(<SignUp/>)
    cy.get('#formEmailInput').type('adasdasd')
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Please enter valid email')
})

it('shows error message if invalid phone is entered', () => {
    cy.mount(<SignUp/>)
    cy.get('#formPhoneInput').type('adasdsadasdasd')
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Please enter valid phone number')
})

it('shows error when password is less than 8 characters', () => {
    cy.mount(<SignUp/>)
    cy.get('#formPasswordInput').type("1234567")
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Password length must be greater than equal to 8')
})