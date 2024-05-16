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

    it("1 | Add question by a user and report by another user and check report count", () => {
        cy.visit("http://localhost:3000");
        createDummyUser("abc1", "abc1@gmail.com")
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        logoutUser()

        createDummyUser("abc2", "abc2@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(0)
        cy.get("#flag").click()
        cy.get("#numReports").contains(1)
        cy.get("#filledFlag")
        logoutUser()
    })

    it("2 | Report 10 times and check question don't exist anymore", () => {
        cy.visit("http://localhost:3000");
        createDummyUser("abc", "abc@gmail.com")
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();
        cy.contains("Test Question 1");
        logoutUser()

        createDummyUser("abc1", "abc1@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(0)
        cy.get("#flag").click()
        cy.get("#numReports").contains(1)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc2", "abc2@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(1)
        cy.get("#flag").click()
        cy.get("#numReports").contains(2)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc3", "abc3@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(2)
        cy.get("#flag").click()
        cy.get("#numReports").contains(3)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc4", "abc4@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(3)
        cy.get("#flag").click()
        cy.get("#numReports").contains(4)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc5", "abc5@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(4)
        cy.get("#flag").click()
        cy.get("#numReports").contains(5)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc6", "abc6@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(5)
        cy.get("#flag").click()
        cy.get("#numReports").contains(6)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc7", "abc7@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(6)
        cy.get("#flag").click()
        cy.get("#numReports").contains(7)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc8", "abc8@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(7)
        cy.get("#flag").click()
        cy.get("#numReports").contains(8)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc9", "abc9@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(8)
        cy.get("#flag").click()
        cy.get("#numReports").contains(9)
        cy.get("#filledFlag")
        logoutUser()

        createDummyUser("abc10", "abc10@gmail.com")
        cy.contains("Test Question 1").click()
        cy.get("#numReports").contains(9)
        cy.get("#flag").click()
        cy.contains("All Questions")
        cy.contains('Test Question 1').should('not.exist');
        logoutUser()

    })


})