describe("Test Tags Functionality", () => {
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

    it("1 | Adds a question with tags, checks the tags existied", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        // add a question with tags
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("test1 test2 test3");
        cy.contains("Post Question").click();

        // clicks tags
        cy.contains("Tags").click();
        cy.contains("test1");
        cy.contains("test2");
        cy.contains("test3");

        logoutUser()
    });

    it("2 | Checks if all tags exist", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()
        // all tags exist in the page
        cy.contains("Tags").click();
        cy.contains("react", {matchCase: false});
        cy.contains("javascript", {matchCase: false});
        cy.contains("android-studio", {matchCase: false});
        cy.contains("shared-preferences", {matchCase: false});
        cy.contains("storage", {matchCase: false});
        cy.contains("website", {matchCase: false});
        cy.contains("Flutter", {matchCase: false});

        logoutUser()
    });

    it("3 | Checks if all questions exist inside tags", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("7 Tags");
        cy.contains("1 question");
        cy.contains("2 question");
        cy.contains("0 question");

        logoutUser()
    });

    it("4 | go to question in tag react", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("react").click();
        cy.contains("Programmatically navigate using React router");

        logoutUser()
    });

    it("5 | go to questions in tag storage", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("storage").click();
        cy.contains("Quick question about storage on android");
        cy.contains("Object storage for a web application");

        logoutUser()
    });

    it("6 | create a new question with a new tag and finds the question through tag", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        // add a question with tags
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("test1-tag1");
        cy.contains("Post Question").click();

        // clicks tags
        cy.contains("Tags").click();
        cy.contains("test1-tag1").click();
        cy.contains("Test Question A");

        logoutUser()
    });

    it("7 | Clicks on a tag and verifies the tag is displayed", () => {
        const tagNames = "javascript";

        cy.visit("http://localhost:3000");
        createDummyUser()
        cy.contains("Tags").click();

        cy.contains(tagNames).click();
        cy.get(".question_tags").each(($el, index, $list) => {
            cy.wrap($el).should("contain", tagNames);
        });

        logoutUser()
    });

    it("8 | Clicks on a tag in homepage and verifies the questions related tag is displayed", () => {
        const tagNames = "storage";

        cy.visit("http://localhost:3000");
        createDummyUser()

        //clicks the 3rd tag associated with the question.
        cy.get(".question_tag_button").eq(2).click();

        cy.get(".question_tags").each(($el, index, $list) => {
            cy.wrap($el).should("contain", tagNames);
        });

        logoutUser()
    });

})


