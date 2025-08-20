import { faker } from '@faker-js/faker'

Cypress.Commands.add('generateInvalidPromotionalCode', () => {
    const letter1 = faker.string.alpha(1)
    const letter2 = faker.string.alpha(1)
    const letter3 = faker.string.alpha(1)
    const letter4 = faker.string.alpha(1)
    const letter5 = faker.string.alpha(1)

    const digit1 = faker.number.int({ min: 0, max: 9 })
    const digit2 = faker.number.int({ min: 0, max: 9 })
    const digit3 = faker.number.int({ min: 0, max: 9 })

    const sumForLastDigit = digit1 + digit2 + digit3

    let lastDigit
    do {
        lastDigit = faker.number.int({ min: 0, max: 9 })

        if (sumForLastDigit === lastDigit) continue

        if (sumForLastDigit > 10 && lastDigit === (sumForLastDigit % 10)) continue

        break
    } while (true)

    const invalidCode = `${letter1}${letter2}${digit1}-${letter3}${letter4}${letter5}-${digit2}${digit3}${lastDigit}`

    return invalidCode
})

Cypress.Commands.add('generateValidPromotionalCode', () => {

    const letter1 = faker.string.alpha(1).toUpperCase()
    const letter2 = faker.string.alpha(1).toUpperCase()
    const letter3 = faker.string.alpha(1).toUpperCase()
    const letter4 = faker.string.alpha(1).toUpperCase()
    const letter5 = faker.string.alpha(1).toUpperCase()
    
    const digit1 = faker.number.int({ min: 0, max: 9 })
    const digit2 = faker.number.int({ min: 0, max: 9 })
    const digit3 = faker.number.int({ min: 0, max: 9 })
    
    const sum = digit1 + digit2 + digit3

    const lastDigit = sum > 10 ? sum % 10 : sum
    
    const validCode = `${letter1}${letter2}${digit1}-${letter3}${letter4}${letter5}-${digit2}${digit3}${lastDigit}`
    
    return validCode
})

Cypress.Commands.add('generateValidPromotionalCodeUnderTenRule', (discount) => {
    const letter1 = faker.string.alpha(1)
    const letter2 = faker.string.alpha(1)
    const letter3 = faker.string.alpha(1)
    const letter4 = faker.string.alpha(1)
    const letter5 = faker.string.alpha(1)

    const discountDigit = discount

    const maxSum = 9 - discountDigit 
    const digit2 = faker.number.int({ min: 0, max: Math.min(maxSum, 9) })
    const digit3 = faker.number.int({ min: 0, max: Math.min(maxSum - digit2, 9) })

    const sumForLastDigit = discountDigit + digit2 + digit3

    const lastDigit = sumForLastDigit

    const validPromotionalCodeUnderTenRule = `${letter1}${letter2}${discountDigit}-${letter3}${letter4}${letter5}-${digit2}${digit3}${lastDigit}`

    return validPromotionalCodeUnderTenRule
})

Cypress.Commands.add('generateValidPromotionalCodeAboveTenRule', (discount) => {
    const letter1 = faker.string.alpha(1)
    const letter2 = faker.string.alpha(1)
    const letter3 = faker.string.alpha(1)
    const letter4 = faker.string.alpha(1)
    const letter5 = faker.string.alpha(1)

    const discountDigit = discount

    const minSumNeeded = 10 - discountDigit 
    const digit2 = faker.number.int({ min: Math.max(minSumNeeded - 9, 0), max: 9 })
    const digit3 = faker.number.int({ min: Math.max(minSumNeeded - digit2, 0), max: 9 })

    const sumForLastDigit = discountDigit + digit2 + digit3

    const lastDigit = sumForLastDigit % 10

    const validPromotionalCodeEqualorAboveTenRule = `${letter1}${letter2}${discountDigit}-${letter3}${letter4}${letter5}-${digit2}${digit3}${lastDigit}`

    return validPromotionalCodeEqualorAboveTenRule
})