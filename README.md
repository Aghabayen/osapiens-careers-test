# Playwright Test – Osapiens Careers Page

## Overview

This project contains an automated end-to-end test written using **Playwright** and  **TypeScript** .

The test validates the careers page at:
[https://careers.osapiens.com/](https://careers.osapiens.com/)

The test performs the following actions:

* Opens the Osapiens careers page
* Accepts the cookie banner if it appears
* Counts the number of open job positions
* Prints the number of open jobs in the terminal
* Fails the test if none of the job titles contain the word **"Quality"**

---

# Prerequisites

Before running the test, make sure the following tools are installed:

* **Node.js** (version 18 or higher recommended)
* **npm** (comes with Node.js)

You also need Playwright browsers installed.

---

# How to Run the Test

1. Install project dependencies:

```
npm install
```

2. Install Playwright browsers:

```
npx playwright install
```

3. Run the test:

```
npx playwright test
```

When the test runs it will:

* Open the Osapiens careers page
* Count the number of available job listings
* Print the number of jobs in the terminal
* Fail if none of the job titles contain the word **"Quality"**

Example console output:

```
Number of open jobs: 32
```

---

# Test Design

The test follows the **Page Object Model (POM)** design pattern to keep the code clean, reusable, and maintainable.

## Project Structure

```
tests/
 └─ careers.spec.ts

support/
 └─ POM/
     ├─ components/
     │   └─ Header.ts
     └─ pages/
         └─ CareersPage.ts
```

### Components

**Header.ts**

Handles reusable UI elements located in the page header.
Currently responsible for handling the  **cookie consent dialog** .

Responsibilities:

* Detect cookie banner
* Accept cookies if the dialog appears

---

### Pages

**CareersPage.ts**

Represents the Osapiens careers page and encapsulates all page interactions.

Responsibilities:

* Navigating to the careers page
* Locating job listings
* Counting job positions
* Retrieving job titles
* Checking job titles for specific keywords

---

### Test

**careers.spec.ts**

Implements the main test scenario:

1. Navigate to the careers page
2. Accept cookies if necessary
3. Count the number of open job positions
4. Print the job count to the terminal
5. Fail the test if no job title contains the word **"Quality"**

---

# Possible Improvements

The current implementation focuses on the assignment requirements, but the following improvements could be implemented in a larger test suite:

* Use more specific selectors if the website structure changes
* Add pagination handling if job listings span multiple pages
* Extract additional job information (location, department, job type) in the components folder.
* Create additional reusable components (footer, filters, modals)
* Test is already running on Chrome; enabling Firefox or WebKit in playwright.config.ts is simple if needed.
* Integrate the test into a CI/CD pipeline (e.g., GitHub Actions)
