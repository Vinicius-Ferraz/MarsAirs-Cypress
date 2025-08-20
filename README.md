# MarsAir Automated Testing Project

## 📋 Overview
This project contains **end-to-end automated tests** built with [Cypress](https://www.cypress.io/) and JavaScript.  
It is designed to test a sample application for booking seats on a flight to Mars (**MarsAir**).  
The application and tests are for **evaluation purposes only** and are not intended for production use.

---

## 🛠 Tech Stack & Dependencies
- **Node.js** – Required to run the project.
- **Cypress** – Main automation framework for E2E testing.
- **Faker.js** – For generating random test data.

---

## 📂 Project Structure
```
cypress/
  e2e/
    WEB/         # UI tests
  fixtures/      # Static test data
  support/       # Custom commands and test hooks
    commands.js
```

---

## 📦 Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project folder:
   ```bash
   cd marsair
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Running Tests
### Open Cypress Test Runner (interactive mode)
```bash
npx cypress open
```

### Run in Headless Mode (terminal)
```bash
npx cypress run
```

## 🔄 CI/CD (Bitbucket Pipelines Example)
This project can be easily integrated with **Bitbucket Pipelines**:

```yaml
image: cypress/base:20.10.0

pipelines:
  default:
    - step:
        name: Run Cypress Tests
        caches:
          - node
        script:
          - npm install
          - npx cypress run
```

---

## 🔍 Test Scenarios
- Validating that home page elements are rendered
- Applying valid and invalid promotional codes
- Validating date selection rules

---

## ⚠ Disclaimer
This project is **for learning and evaluation purposes only**.  
It does not represent a real booking system for Mars flights.
