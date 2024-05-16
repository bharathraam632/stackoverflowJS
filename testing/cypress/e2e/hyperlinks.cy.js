describe("Test HyperLinks", () => {
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

    it("1 | Adds a question with a hyperlink and verifies", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("How to add a hyperlink in Markdown?");
        cy.get("#formTextInput").type(
            "Here is a link: [Google](https://www.google.com)"
        );
        cy.get("#formTagInput").type("markdown");
        cy.contains("Post Question").click();
        cy.contains("How to add a hyperlink in Markdown?").click();
        cy.get("#questionBody")
            .find("a")
            .should("have.attr", "href", "https://www.google.com");

        logoutUser()
    });

    it("2 | Create new answer should be displayed at the top of the answers page", () => {
        const answers = [
            "Check this link for more info: [Documentation](https://docs.example.com)",
            "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
            "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        ];
        cy.visit("http://localhost:3000");
        createDummyUser()

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type(
            "Check this link for more info: [Documentation](https://docs.example.com)"
        );
        cy.contains("Post Answer").click();
        cy.get(".answerText")
            .first()
            .within(() => {
                cy.get("a").should("have.attr", "href", "https://docs.example.com");
            });
        cy.contains("abc");
        cy.contains("0 seconds ago");

        logoutUser()
    });

    it("3 | Tries to add a question with an invalid hyperlink and verifies failure", () => {
        const invalidUrls = [
            "[Google](htt://www.google.com)",
            "[Microsoft](microsoft.com)",
            "[](https://www.google.com/)",
            "[link]()",
            "dfv[]()",
            "[link](http://www.google.com/)",
            "[Google](https//www.google.com)",
            "[GitHub](http//github.com)",
            "[Facebook](https:/facebook.com)",
            "[Twitter](://twitter.com)",
            "[Netflix](htps://www.netflix)",
            "[Google](htts://www.goo<gle.com)",
            "[Google](http://www.google)",
            "[Dropbox](ttps://www.dropbox.c-m)",
            "[LinkedIn](ps:/www.linkedin.com)",
            "[Adobe](ttps://www.adobe..com)",
            "[Spotify](ttp:///www.spotify.com)",
            "[Reddit](http://reddit)",
            "[Wikipedia](tps://www.wikipedia=com)",
        ];
        cy.visit("http://localhost:3000");
        createDummyUser()

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type(
            "How to add an invalid hyperlink in Markdown?"
        );
        invalidUrls.forEach((url) => {
            cy.get("#formTextInput").clear().type(`This is an invalid link: ${url}`);
            cy.get("#formTagInput").clear().type("markdown");
            cy.contains("Post Question").click();
            cy.contains("Invalid hyperlink");
        });
        cy.visit("http://localhost:3000");
        cy.contains("How to add an invalid hyperlink in Markdown?").should(
            "not.exist"
        );

        logoutUser()
    });

    it("4 | Attempts to add an answer with an invalid hyperlink and verifies failure", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type(
            "Check this invalid link: [](https://wrong.url)"
        );
        cy.contains("Post Answer").click();
        cy.contains("Invalid hyperlink");
        cy.visit("http://localhost:3000");
        cy.contains("Programmatically navigate using React router").click();
        cy.get(".answerText").should("not.contain", "https://wrong.url");

        logoutUser()
    });

    it("5 | Adds multiple questions with valid hyperlinks and verify", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        // List of question data
        const questions = [
            {
                title: "Test Question 1",
                text: "Test Question 1 Text [Google](https://www.google.com)",
                tag: "javascript",
                username: "joym",
                link: "https://www.google.com",
            },
            {
                title: "Test Question 2",
                text: "Test Question 2 Text [Yahoo](https://www.yahoo.com)",
                tag: "react",
                username: "abhi",
                link: "https://www.yahoo.com",
            },
            {
                title: "How to add a hyperlink in Markdown?",
                text: "Here is a link: [Google](https://www.google.com)",
                tag: "markdown",
                username: "user1",
                link: "https://www.google.com",
            },
        ];

        // Add multiple questions with hyperlinks
        questions.forEach((question) => {
            cy.contains("Ask a Question").click();
            cy.get("#formTitleInput").type(question.title);
            cy.get("#formTextInput").type(question.text);
            cy.get("#formTagInput").type(question.tag);
            cy.contains("Post Question").click();
        });

        cy.contains("Questions").click();
        questions.reverse().forEach((q) => {
            cy.contains(q.title).click();
            cy.get("#questionBody").find("a").should("have.attr", "href", q.link);
            cy.contains("Questions").click();
        });

        logoutUser()
    });

})