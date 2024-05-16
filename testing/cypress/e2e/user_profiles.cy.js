describe("Test user profiles", () => {
    beforeEach(() => {
        // Seed the database before each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    afterEach(() => {
        // Clear the database after each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
    })


    const createDummyUser = (username, email) => {
        cy.contains("Ask a Question").click();
        cy.contains("SignUp").click();
        cy.get("#formUsernameInput").type(username);
        cy.get("#formPasswordInput").type("12345678");
        cy.get("#formNameInput").type("ABC");
        cy.get("#formEmailInput").type(email);
        cy.get("#formPhoneInput").type("12345678")
        cy.get("#formSummaryInput").type("Hi I am abc...")
        cy.contains("SignUp").click();
    }

    const logoutUser = () => {
        cy.get("#logoutBtn").click()
    }

    it("1 | Create a profile and check user profile", () => {
        cy.visit("http://localhost:3000");
        createDummyUser("abc","abc@gmail.com")
        cy.get("#profile_button").click()
        cy.get('#userPic')
            .should('have.attr', 'src')
            .and('include', 'https://i.ibb.co/KWMwLkv/default.jpg')
        cy.get("#userFullName").contains("ABC")
        cy.get("#username").contains("abc")
        cy.get("#userEmail").contains("abc@gmail.com")
        cy.get("#userPhone").contains("12345678")
        cy.get("#userSummary").contains("Hi I am abc...")

        logoutUser()
    })

    it("2 | Create a profile and check user profile by clicking on question", () => {
        cy.visit("http://localhost:3000");
        createDummyUser("abc","abc@gmail.com")
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("abc").click()
        cy.get('#userPic')
            .should('have.attr', 'src')
            .and('include', 'https://i.ibb.co/KWMwLkv/default.jpg')
        cy.get("#userFullName").contains("ABC")
        cy.get("#username").contains("abc")
        cy.get("#userEmail").contains("abc@gmail.com")
        cy.get("#userPhone").contains("12345678")
        cy.get("#userSummary").contains("Hi I am abc...")
        logoutUser()
    })


})