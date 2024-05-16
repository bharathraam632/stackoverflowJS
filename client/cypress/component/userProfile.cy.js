import UserProfile from "../../src/components/main/profile";

it('User Profile shows all fields for the given user', () => {
    const userObj={
        userName:"abc",
        userEmail:"abc@gmail.com",
        userProfilePicPath:"https://i.ibb.co/KWMwLkv/default.jpg",
        userFullName:"ABC",
        userPhoneNumber:"12345678",
        userSummary:"Hi I am ABC..."
    }
    cy.mount(<UserProfile user={userObj}/>);
    cy.get('#userPic')
        .should('have.attr', 'src')
        .and('include', 'https://i.ibb.co/KWMwLkv/default.jpg')
    cy.get("#userFullName").contains("ABC")
    cy.get("#username").contains("abc")
    cy.get("#userEmail").contains("abc@gmail.com")
    cy.get("#userPhone").contains("12345678")
    cy.get("#userSummary").contains("Hi I am ABC...")
})