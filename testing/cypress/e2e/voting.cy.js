describe("Test User Voting", () => {
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
        cy.get("#formNameInput").type("abc123");
        cy.get("#formEmailInput").type(email);
        cy.get("#formPhoneInput").type("0012234434132")
        cy.get("#formSummaryInput").type("Hi I am abc...")
        cy.contains("SignUp").click();
    }

    const logoutUser = () => {
        cy.get("#logoutBtn").click()
    }

    it("1 | Upvote DownVote single user", () => {
        cy.visit("http://localhost:3000");
        createDummyUser("abc","abc@gmail.com")

        // Add multiple questions
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("Test Question 1").click();

        cy.get("#numVote").contains(0)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(1)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(0)

        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)
        cy.get("#downVote").click()
        cy.get("#numVote").contains(0)

        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(1)
        cy.get("#upvote").click()


        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(1)
        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)

        logoutUser()
    })

    it("2 | Upvote DownVote multiple users", () => {
        cy.visit("http://localhost:3000");
        createDummyUser("abc","abc@gmail.com")

        // Add multiple questions
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("Test Question 1").click();

        cy.get("#numVote").contains(0)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(1)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(0)

        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)
        cy.get("#downVote").click()
        cy.get("#numVote").contains(0)

        logoutUser()

        createDummyUser("abc2","abc2@gmail.com")
        cy.contains("Test Question 1").click();
        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(1)
        cy.get("#upvote").click()


        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)
        cy.get("#upvote").click()
        cy.get("#numVote").contains(1)
        cy.get("#downVote").click()
        cy.get("#numVote").contains(-1)

        logoutUser()
    })

})