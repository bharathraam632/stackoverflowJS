import UpvoteDownvote from "../../src/components/main/answerPage/questionBody/upvoteDownvote";

it('Test upvote and downvote', () => {
    cy.stub(UpvoteDownvote, 'getQuestionStatus').resolves({totalVotes: 30, voteStatus: 0})
    cy.stub(UpvoteDownvote, 'downvoteQuestion').resolves({totalVotes: 29, voteStatus: -1})
    cy.stub(UpvoteDownvote, 'upvoteQuestion').resolves({totalVotes: 31, voteStatus: 1})

    cy.mount(<UpvoteDownvote qid={0}/>)

    cy.get("#numVote").contains(30)
    cy.get("#upvote").click()
    cy.get("#numVote").contains(31)
    cy.get("#downVote").click()
    cy.get("#numVote").contains(29)
    cy.get("#downVote").click()
})