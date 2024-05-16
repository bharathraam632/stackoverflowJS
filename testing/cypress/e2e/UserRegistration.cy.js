describe("Test add questions", () => {
    beforeEach(() => {
        // Seed the database before each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    afterEach(() => {
        // Clear the database after each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
    })

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

    it("1 | SignUp user, logout, login again and add Question", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()


        logoutUser()

        cy.contains("Ask a Question").click();
        cy.get("#formUsernameInput").type("abc")
        cy.get("#formPasswordInput").type("12345678");
        cy.get("#login_btn").click()

        cy.contains("Ask a Question").click();

        cy.get("#formTitleInput").type("Test Question B");
        cy.get("#formTextInput").type("Test Question B Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("abc asked")

        logoutUser()

    });

    it("2 | SignUp Username already exists", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        logoutUser()

        cy.contains("Ask a Question").click();
        cy.contains("SignUp").click();
        cy.get("#formUsernameInput").type("abc");
        cy.get("#formPasswordInput").type("12345678");
        cy.get("#formNameInput").type("abc123");
        cy.get("#formEmailInput").type("abc@gmail.com");
        cy.get("#formPhoneInput").type("0012234434132")
        cy.get("#formSummaryInput").type("Hi I am abc...")
        cy.contains("SignUp").click();

        cy.contains("User Name already exists")

    })

    it("3 | SignUp Email already exists", () => {
        cy.visit("http://localhost:3000");
        createDummyUser()

        logoutUser()

        cy.contains("Ask a Question").click();
        cy.contains("SignUp").click();
        cy.get("#formUsernameInput").type("abc2");
        cy.get("#formPasswordInput").type("12345678");
        cy.get("#formNameInput").type("abc123");
        cy.get("#formEmailInput").type("abc123@gmail.com");
        cy.get("#formPhoneInput").type("0012234434132")
        cy.get("#formSummaryInput").type("Hi I am abc...")
        cy.contains("SignUp").click();

        cy.contains("Email already exists")

    })

    it("4 | Login Invalid Credentials", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Ask a Question").click();
        cy.get("#formUsernameInput").type("abc")
        cy.get("#formPasswordInput").type("12345678");
        cy.get("#login_btn").click()

        cy.contains("User not found")

    })

})