describe("Test View Questions", () => {
    beforeEach(() => {
        // Seed the database before each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    afterEach(() => {
        // Clear the database after each test
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
    })


    it("1 | Check if questions are displayed in descending order of dates.", () => {
        const qTitles = [
            "Quick question about storage on android",
            "Object storage for a web application",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];

        cy.visit("http://localhost:3000");

        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });

    it("2 | successfully shows all questions in model in active order", () => {
        const qTitles = [
            "Programmatically navigate using React router",
            "android studio save string shared preference, start activity and load the saved string",
            "Quick question about storage on android",
            "Object storage for a web application",
        ];
        cy.visit("http://localhost:3000");
        cy.contains("Active").click();
        cy.get(".postTitle")
            .should("have.length", qTitles.length)
            .each(($el, index) => {
                expect($el).to.contain(qTitles[index]);
            });
    });
})