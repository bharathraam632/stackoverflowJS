describe("Test Search Functionality", () => {
    beforeEach(() => {
        // Seed the database before each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    afterEach(() => {
        // Clear the database after each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    it("1 | Search for a question using text content that does not exist", () => {
        const searchText = "Web3";

        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type(`${searchText}{enter}`);
        cy.get(".postTitle").should("have.length", 0);
    });

    it("2 | Search string in question text", () => {
        const qTitles = ["Object storage for a web application"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("40 million{enter}");
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });


    it("3 | Search string in question text", () => {
        const qTitles = ["Quick question about storage on android"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("data remains{enter}");
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });

    it("4 | Search a question by tag (t1)", () => {
        const qTitles = ["Programmatically navigate using React router"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[react]{enter}");
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });

    it("5 | Search a question by tag (t2)", () => {
        const qTitles = [
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[javascript]{enter}");
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });

    it("6 | Search a question by tag (t3)", () => {
        const qTitles = [
            "Quick question about storage on android",
            "android studio save string shared preference, start activity and load the saved string",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[android-studio]{enter}");
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });

    it("7 | Search a question by tag (t4)", () => {
        const qTitles = [
            "Quick question about storage on android",
            "android studio save string shared preference, start activity and load the saved string",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[shared-preferences]{enter}");
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });

    it("8 | Search for a question using a tag that does not exist", () => {
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[nonExistentTag]{enter}");
        cy.get(".postTitle").should("have.length", 0);
    });

})

