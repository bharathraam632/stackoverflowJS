import AnswerHeader from '../../src/components/main/answerPage/header/index.js';
import QuestionBody from '../../src/components/main/answerPage/questionBody/index.js'
import Answer from '../../src/components/main/answerPage/answer/index.js';

// Answer Page - Header Tests
it('Answer Header component shows question title, answer count and onclick function', () => {
    const answerCount = 3;
    const title = 'android studio save string shared preference, start activity and load the saved string';
    const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');
    
    cy.mount(<AnswerHeader 
        ansCount={answerCount} 
        title={title}
        handleNewQuestion={handleNewQuestion}/>);
    cy.get('.bold_title').contains(answerCount + " answers");
    cy.get('.answer_question_title').contains(title);
    cy.get('.bluebtn').click();
    cy.get('@handleNewQuestionSpy').should('have.been.called');
})

// Answer Page - Question Body
it('Component should have a question body which shows question text, views, asked by and asked', () => {
    const questionBody = 'Sample Question Body'
    const views = '150'
    const askedBy = 'vanshitatilwani'
    const date = new Date().toLocaleString()
    cy.mount(<QuestionBody 
        text={questionBody}
        views={views} 
        askby={askedBy}
        meta={date}
        />)
    
    cy.get('.answer_question_text > div').contains(questionBody)
    cy.get('.answer_question_view').contains(views + ' views')
    cy.get('.answer_question_right > .question_author').contains(askedBy)
    cy.get('.answer_question_right > .answer_question_meta').contains('asked ' + date)
    
})

// Answer Page - Answer component
it('Component should have a answer text ,answered by and answered date', () => {
    const answerText = 'Sample Answer Text'
    const answeredBy = 'joydeepmitra'
    const date = new Date().toLocaleString()
    cy.mount(<Answer 
        text={answerText}
        ansBy={answeredBy}
        meta={date}
        />)
    
    cy.get('.answerText').contains(answerText)
    cy.get('.answerAuthor > .answer_author').contains(answeredBy)
    cy.get('.answerAuthor > .answer_question_meta').contains(date)
    
    
})
