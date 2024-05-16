describe("Test View Answers", () => {
    beforeEach(() => {
        // Seed the database before each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    afterEach(() => {
        // Clear the database after each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    const createDummyUser = () => {
        cy.contains("Ask a Question").click();
        cy.contains("SignUp").click();
        cy.get("#formUsernameInput").type("abc");
        cy.get("#formPasswordInput").type("12345678");
        cy.get("#formNameInput").type("abc123");
        cy.get("#formEmailInput").type("abc123@gmail.com");
        cy.get("#formPhoneInput").type("0012234434132")
        cy.get("#formSummaryInput").type("Hi I am abc...")
        cy.contains("SignUp").click();
    }

    const logoutUser = () => {
        cy.get("#logoutBtn").click()
    }


    it("1 | Answer is mandatory when creating a new answer", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.contains("Post Answer").click();
        cy.contains("Answer text cannot be empty");

        logoutUser()
    });

    it("2 | Created new answer should be displayed at the top of the answers page", () => {
        const answers = [
            "Test Answer 1",
            "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
            "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        ];
        cy.visit("http://localhost:3000");
        createDummyUser()

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type(answers[0]);
        cy.contains("Post Answer").click();
        cy.get(".answerText").each(($el, index) => {
            cy.contains(answers[index]);
        });
        cy.contains("abc");
        cy.contains("0 seconds ago");

        logoutUser()
    });
})





