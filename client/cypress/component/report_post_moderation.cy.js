import ReportButton from "../../src/components/main/answerPage/questionBody/reprtBtn";

it('Test report for post moderation', () => {
    cy.stub(ReportButton, 'reportQuestionStatus').resolves({reportStatus: -1})
    cy.stub(ReportButton, 'getReportCounts').resolves({totalReports: 1})
    cy.stub(ReportButton, 'reportQuestion').resolves({reportStatus: 1})

    const obj = {
        handleQuestions: (arg) => {
            return arg
        }
    }
    cy.spy(obj, 'handleQuestions')
    cy.mount(<ReportButton qid={0} handleQuestions={obj.handleQuestions}/>)
    cy.get("#flag").click()
    cy.get("#numReports").contains(1)
    cy.get("#filledFlag")
})

it('Test report after 10 reports', () => {
    cy.stub(ReportButton, 'reportQuestionStatus').resolves({reportStatus: -1})
    cy.stub(ReportButton, 'getReportCounts').resolves({totalReports: 9})
    cy.stub(ReportButton, 'reportQuestion').resolves({reportStatus: 1})

    const obj = {
        handleQuestions: (arg) => {
            return arg
        }
    }
    cy.spy(obj, 'handleQuestions')
    cy.mount(<ReportButton qid={0} handleQuestions={obj.handleQuestions}/>)
    cy.get("#numReports").contains(9)
    cy.get("#flag").click().then(
        () => {
            expect(obj.handleQuestions).to.be.called;
        }
    )

})