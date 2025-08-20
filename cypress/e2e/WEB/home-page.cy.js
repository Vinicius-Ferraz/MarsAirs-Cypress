describe('Check that home page elements renders correctly', () => {

    beforeEach(() => {
        cy.visit('https://marsair.recruiting.thoughtworks.net/ViniciusEstevesCelestino') // Setting a baseURL crashes because of the "/" added in the final of URL
    })

    it('Validate that main title is displayed', () => {
        cy.get('h1').should('be.visible')

        cy.get('h1 a')
            .should('contain', 'MarsAir')
            .and('have.attr', 'href', '/ViniciusEstevesCelestino')
    })

    it('Validate that search flight seats formulary is displayed with correct options', () => {
        const expectedDatesOptions = [
            { value: '', text: 'Select...' },
            { value: '0', text: 'July' },
            { value: '1', text: 'December' },
            { value: '2', text: 'July (next year)' },
            { value: '3', text: 'December (next year)' },
            { value: '4', text: 'July (two years from now)' },
            { value: '5', text: 'December (two years from now)' }
        ]

        cy.get('#wrapper').should('exist').and('be.visible')

        cy.get('#content h2')
            .should('have.text', 'Welcome to MarsAir!')
            .and('be.visible')

        cy.get('#content select#departing option')
            .should('have.length', 7)
            .and('be.visible')
            .each(($option, index) => {
                cy.wrap($option)
                    .should('have.value', expectedDatesOptions[index].value)
                    .and('have.text', expectedDatesOptions[index].text)
            })

        cy.get('#content select#returning option')
            .should('have.length', 7)
            .and('be.visible')
            .each(($option, index) => {
                cy.wrap($option)
                    .should('have.value', expectedDatesOptions[index].value)
                    .and('have.text', expectedDatesOptions[index].text)
            })

        cy.get('#content input#promotional_code')
            .should('be.visible')
            .and('have.attr', 'type', 'text')

        cy.get('#content input[type="submit"]')
            .should('exist')
            .and('be.visible')
            .and('have.value', 'Search')
            .and('be.enabled')
    })

    it('Validate support links', () => {
        const expectedSupportLinks = [
            { href: '/ViniciusEstevesCelestino/report', text: ' Report an issue' },
            { href: '/mission.html', text: ' Problem definition' },
            { href: 'https://www.thoughtworks.com/privacy-policy', text: 'Privacy Policy' }
        ]

        cy.get('ul .links')
            .should('be.visible')
            .and('have.length', 3)

        cy.get('#report_issue ul li.links a')
            .should('have.length', 3)
            .each(($link, index) => {
                cy.wrap($link)
                    .should('have.attr', 'href', expectedSupportLinks[index].href)
                    .and('contain.text', expectedSupportLinks[index].text)
            })
    })
    it('Validate that "report issue" support link leads to a report issue page correctly', () => {
        const severity = [
            { value: '0', text: 'Select' },
            { value: '1', text: 'Critical' },
            { value: '2', text: 'High' },
            { value: '3', text: 'Low' }
        ]

        cy.get('#report_issue ul li.links a')
            .eq(0)
            .click()

        cy.url().should('include', '/report')

        cy.get('#content h2')
            .should('have.text', 'New issue report')
            .and('be.visible')

        cy.contains('View open issues')
            .should('be.visible')
            .and('have.attr', 'href', '/ViniciusEstevesCelestino/issues')

        cy.contains('Title')
            .should('be.visible')

        cy.get('#content #title')
            .should('be.visible')
            .and('have.attr', 'type', 'text')

        cy.contains('Description')
            .should('be.visible')

        cy.get('#content #description')
            .should('be.visible')

        cy.contains('Severity')
            .should('be.visible')

        cy.get('#content #severity')
            .should('be.visible')

        cy.get('#content #severity option')
            .should('have.length', 4)
            .each(($option, index) => {
                cy.wrap($option)
                    .should('have.value', severity[index].value)
                    .and('contain.text', severity[index].text)
            })

        cy.get('#content input[type="submit"]')
            .and('be.visible')
            .and('be.enabled')
            .and('have.value', 'Create')

        cy.contains('Back')
            .should('be.visible')
            .and('have.attr', 'href', 'javascript:window.history.go(-1)')
            .click()

        cy.url().should('include', '/ViniciusEstevesCelestino')
    })

    it('Validate that "problem definition" support link leads to a problem definition page correctly', () => {
        cy.get('#report_issue ul li.links a')
            .eq(1)
            .click()
        cy.url().should('include', '/mission.html')
    })

    it('Validate that "privacy policy" support link leads to a privacy policy page correctly', () => {
        cy.get('#report_issue ul li.links a')
            .eq(2)
            .invoke('removeAttr', 'target')
            .click()

        cy.origin('https://www.thoughtworks.com', () => {
            cy.url().should('includes', 'about-us/privacy-policy')
        })
    })
})
