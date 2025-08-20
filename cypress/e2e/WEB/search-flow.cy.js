const datesOptions = [
    { value: '0', text: 'July' },
    { value: '1', text: 'December' },
    { value: '2', text: 'July (next year)' },
    { value: '3', text: 'December (next year)' },
    { value: '4', text: 'July (two years from now)' },
    { value: '5', text: 'December (two years from now)' }
]

const validDateCombinations = [
    { departing: 'July', returning: 'July (next year)' },
    { departing: 'July', returning: 'December (next year)' },
    { departing: 'July', returning: 'July (two years from now)' },
    { departing: 'July', returning: 'December (two years from now)' },
    { departing: 'December', returning: 'July (next year)' },
    { departing: 'December', returning: 'December (next year)' },
    { departing: 'December', returning: 'July (two years from now)' },
    { departing: 'December', returning: 'December (two years from now)' },
    { departing: 'July (next year)', returning: 'July (two years from now)' },
    { departing: 'July (next year)', returning: 'December (two years from now)' },
    { departing: 'December (next year)', returning: 'July (two years from now)' },
    { departing: 'December (next year)', returning: 'December (two years from now)' }
]
const invalidDateCombinations = [
    { departing: 'July', returning: 'July' },
    { departing: 'July', returning: 'December' },
    { departing: 'December', returning: 'December' },
    { departing: 'December', returning: 'July (next year)' },
    { departing: 'July (next year)', returning: 'July (next year)' },
    { departing: 'July (next year)', returning: 'December (next year)' },
    { departing: 'December (next year)', returning: 'December (next year)' },
    { departing: 'December (next year)', returning: 'July (two years from now)' },
    { departing: 'July (two years from now)', returning: 'July (two years from now)' },
    { departing: 'July (two years from now)', returning: 'December (two years from now)' },
    { departing: 'December (two years from now)', returning: 'December (two years from now)' }
]
describe('Search flow', () => {
    beforeEach(() => {
        cy.visit('https://marsair.recruiting.thoughtworks.net/ViniciusEstevesCelestino')
    })

    validDateCombinations.forEach((combination) => {
        it(`Should validate dates with 1+ year difference - ${combination.departing} to ${combination.returning}`, () => {
            cy.get('#content select#departing').select(combination.departing, { force: true })
            cy.get('#content select#returning').select(combination.returning, { force: true })
            cy.get('#content input[type="submit"]').click()

            cy.get('#wrapper #content h2').should('have.text', 'Search Results')
                .and('be.visible')
            cy.get('#wrapper #content p').should('not.equal', 'Unfortunately, this schedule is not possible. Please try again.')
        })
    })
    invalidDateCombinations.forEach((combination) => {
        it(`Should shows a schedule error message when selecting invalid dates with less than 1 year difference - ${combination.departing} to ${combination.returning}`, () => {
            cy.get('#content select#departing').select(combination.departing, { force: true })
            cy.get('#content select#returning').select(combination.returning, { force: true })
            cy.get('#content input[type="submit"]').click()

            cy.get('#wrapper #content h2').should('have.text', 'Search Results')
            cy.get('#wrapper #content p').first()
                .should('have.text', 'Unfortunately, this schedule is not possible. Please try again.')
                .and('be.visible')
        })
    })

    it('Should display a message when no seats are available', () => {
        cy.get('#content select#departing').select('July')
        cy.get('#content select#returning').select('July (next year)')
        cy.get('#content input[type="submit"]').click()

        cy.get('#wrapper #content h2').should('have.text', 'Search Results')
        cy.get('#wrapper #content p').first()
            .should('have.text', 'Sorry, there are no more seats available.')
            .and('be.visible')
    })

    it('Should display a success message when seats are available', () => {
        cy.get('#content select#departing').select('July')
        cy.get('#content select#returning').select('December (two years from now)')
        cy.get('#content input[type="submit"]').click()

        cy.get('#wrapper #content p')
            .then(($p) => {
                cy.wrap($p.eq(0)).should('contain.text', 'Seats available!')
                cy.wrap($p.eq(1)).should('contain.text', 'Call now on 0800 MARSAIR to book!')
            })
    })
})
