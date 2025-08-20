const discountRange = [1, 2, 3, 4, 5, 6, 7, 8, 9]

describe('It valids promotional code input', () => {
    beforeEach(() => {
        cy.visit('https://marsair.recruiting.thoughtworks.net/ViniciusEstevesCelestino')
        cy.get('#content select#departing').select('July')
        cy.get('#content select#returning').select('December (two years from now)')
    })

    it('should display a error mesage when invalid promotional code is used', () => {
        cy.generateInvalidPromotionalCode().then((invalidPromotionalCode) => {
            cy.get('#promotional_code').type(invalidPromotionalCode)
            cy.get('#content input[type="submit"]').click()
            cy.get('#wrapper #content p').eq(1)
                .should('have.text', `Sorry, code ${invalidPromotionalCode} is not valid`)
                .and('be.visible')
        })
    })

    discountRange.forEach(discount => {
        it(`should apply a ${discount * 10}% discount when a valid promotional code is used`, () => {
            cy.generateValidPromotionalCodeUnderTenRule(discount).then((promotionalCode) => {
                const validPromotionalCode = promotionalCode

                cy.get('#promotional_code').type(validPromotionalCode)
                cy.get('#content input[type="submit"]').click()
                cy.get('#wrapper #content p').eq(1)
                    .should('have.text', `Promotional code ${validPromotionalCode} used: ${discount * 10}% discount!`)
                    .and('be.visible')
            })
        })
    })
    
    discountRange.forEach(discount => {
        it(`It validate when a valid promotional code hits the modulo 10 rule -  ${discount * 10}%`, () => {
            cy.generateValidPromotionalCodeAboveTenRule(discount).then((promotionalCode) => {
                const validPromotionalCode = promotionalCode

                cy.get('#promotional_code').type(validPromotionalCode)
                cy.get('#content input[type="submit"]').click()
                cy.get('#wrapper #content p').eq(1)
                    .should('have.text', `Promotional code ${validPromotionalCode} used: ${discount * 10}% discount!`)
                    .and('be.visible')
            })
        })
    })
    it.only('It validates left and right spaces are removed in promotional code input', () => {
        cy.generateValidPromotionalCode().then((validPromotionalCode) => {
            const discountDigit = validPromotionalCode[2]
            cy.get('#content input#promotional_code').type(`  ${validPromotionalCode}  `)
            cy.get('#content input[type="submit"]').click()
            cy.get('#wrapper #content p').eq(1)
                .should('have.text', `Promotional code ${validPromotionalCode} used: ${discountDigit * 10}% discount!`)
                .and('be.visible')    
        })
    })
})
