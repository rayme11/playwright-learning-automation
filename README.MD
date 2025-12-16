

---

# 📘 Playwright Learning Automation

This repository serves as a **starter template** for learning and practicing **UI test automation using Playwright**.
It is designed to help you quickly set up a working automation framework, understand the basics of Playwright Test, and begin writing scalable UI tests using modern tooling.

The goal of this project is to provide a clean, minimal foundation that you can easily expand with:

* Page Object Models
* Fixtures
* GitHub Actions CI
* Real-world web testing examples
* Advanced Playwright features like tracing, screenshots, retries, and parallelization

---

## 🚀 Getting Started

### **1. Install dependencies**

Make sure you have **Node.js (LTS)** installed.

Then run:

```bash
npm install
```

### **2. Install Playwright browsers**

Playwright requires browser binaries for Chromium, Firefox, and WebKit:

```bash
npx playwright install
```

---

## ▶️ Running Tests

### **Run all tests**

```bash
npm test
```

### **Run tests in headed mode (browser visible)**

```bash
npm run test:headed
```

### **Open the Playwright Test UI**

```bash
npm run test:ui
```

---

## 📂 Project Structure

```
playwright-learning-automation/
  ├── tests/
  │     ├── example.spec.ts           # Sample starter test
  │     ├── kw-search.spec.ts         # Real-world web UI test (KW.com)
  │     └── api/                      # API testing examples
  │           ├── jsonplaceholder.spec.ts    # REST API tests (GET, POST, PUT, PATCH, DELETE)
  │           ├── users-api.spec.ts          # Complex nested data & related resources
  │           ├── api-with-auth.spec.ts      # Advanced patterns (headers, chaining, retry)
  │           └── README.md                  # API testing documentation
  ├── pages/                          # Page Object Models
  │     └── example-page.ts
  ├── playwright.config.ts            # Global Playwright config (with retry logic)
  ├── package.json
  └── README.md
```

---

## 🧪 Example Test

This simple test verifies that a page loads and displays the expected content:

```ts
import { test, expect } from '@playwright/test';

test('homepage has title and heading', async ({ page }) => {
  await page.goto('https://example.com/');
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});
```

---

## 🎯 Project Purpose & Learning Goals

This repo will help you:

* Understand how Playwright Test works from the ground up
* Learn how to structure UI automation using best practices
* Write your own tests using selectors, assertions, locators, and waits
* **Master API testing** with REST endpoints (GET, POST, PUT, PATCH, DELETE)
* Work with **real-world applications** (KW.com Flutter web app example)
* Configure **retry logic** for different environments (local vs CI)
* Organize tests with **describe blocks** and **beforeEach hooks**
* Expand into more advanced patterns as your skills grow
* Prepare for real-world automation tasks in professional environments

---

## 🌐 API Testing

This project includes comprehensive API testing examples using [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API.

### Run API tests only:
```bash
npx playwright test tests/api
```

### Features covered:
* **HTTP Methods**: GET, POST, PUT, PATCH, DELETE
* **Response validation**: Status codes, headers, JSON structure
* **Query parameters** and custom headers
* **Chaining API calls** for complex scenarios
* **Error handling** and retry logic
* **Performance testing** (response time validation)

See `tests/api/README.md` for detailed documentation.

---

## ⚙️ Configuration Highlights

### Retry Logic
The project is configured to automatically retry failed tests:
- **1 retry** when running locally
- **2 retries** in CI environments (when `CI` env variable is set)

See `playwright.config.ts` for configuration details.
