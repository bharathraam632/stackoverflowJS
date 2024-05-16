import Tag from '../../src/components/main/tagPage/tag/index.js';
// Tag Component
it('Rendering Tag Component', () => {
    const tag = {tid : 1, name : 'Sample Tag ',qcnt:1}
    const clickTag = (name) => console.log('Clicked on clickTag '+name)
    
    cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLogSpy');
    });  
    
    cy.mount(<Tag 
        t={tag}
        clickTag={clickTag}
        />)
    cy.get('.tagNode > .tagName').contains(tag.name)
    cy.get('div.tagNode').invoke('text').then((text) => {
        expect(text).to.equal(tag.name + tag.qcnt + ' questions');
      })
})