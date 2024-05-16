import Header from "../../src/components/header";

it('Search component mounting and entering text', () => {
    const obj = {
        setQuesitonPage: (arg1,arg2) => {
            console.log(arg1)
            console.log(arg2)
        }
    }
    cy.spy(obj, 'setQuesitonPage')

    cy.mount(<Header search={""} setQuesitonPage={obj.setQuesitonPage}/>)


    cy.get("#searchBar").type("abc{enter}").then(
        () => {
            expect(obj.setQuesitonPage).to.be.calledWith("abc","Search Results");
        }
    )
})