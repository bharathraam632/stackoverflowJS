import NewAnswer from '../../src/components/main/newAnswer/index.js';

it('mounts', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerTextInput')
    cy.get('.form_postBtn')
})

it('shows error message when both input is empty', () => {
    cy.mount(<NewAnswer/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Answer text cannot be empty')
})


it('shows error message when text is empty', () => {
    cy.mount(<NewAnswer/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Answer text cannot be empty')
})

it('shows text inputted by user', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerTextInput').should('have.value', '')
    cy.get('#answerTextInput').type('abc')
    cy.get('#answerTextInput').should('have.value', 'abc')
})


it('addAnswer is called when click Post Answer', () => {
    const handleAnswer = cy.spy().as('handleAnswerSpy')
    cy.stub(NewAnswer, 'addAnswer').as("addAnswer").resolves({_id:1,status: 200})
    cy.mount(<NewAnswer qid={123} handleAnswer={handleAnswer} />)
    cy.get('#answerTextInput').type('abc')
    cy.get('.form_postBtn').click().then(
        () => {
            expect(NewAnswer.addAnswer).to.be.called
        }
    )
})

it('handleAnswer is called when click Post Answer', () => {
    cy.stub(NewAnswer, 'addAnswer').as("addAnswer").resolves({_id:1,status: 200})
    const handleAnswer = cy.spy().as('handleAnswerSpy')
    cy.mount(<NewAnswer qid={123} handleAnswer={handleAnswer} />)
    cy.get('#answerTextInput').type('abc')
    cy.get('.form_postBtn').click()
    cy.get('@handleAnswerSpy').should('have.been.calledWith', 123)
})