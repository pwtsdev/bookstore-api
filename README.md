# 📚 BookstoreAPI

This project contains over 150 REST API tests for the BookstoreAPI project, proudly presented by the <pwts.dev> team. It is designed to help you ensure the core functionalities of the BookstoreAPI are working as expected.

This project is highly practical and focuses on best practices in writing clean, efficient, and scalable API tests. With this setup, you'll have a solid foundation to create fast, reliable, and maintainable automated tests, empowering you to deliver high-quality software efficiently.

It includes all necessary configurations and dependencies to get started with automated testing using Playwright and TypeScript, ensuring a seamless setup process and enabling you to focus on writing efficient and robust test cases right from the start.

---

## 🚀 Features

- ✅ Fully configured Playwright + TypeScript environment
- 📁 Clean folder structure separating API logic, requests, models, and test data
- 🔄 Reusable request steps and factories for efficient test creation
- 🧪 Organized test suites by domain (books, authors, orders, etc.)
- 🧰 Built-in helpers and constants for cleaner and DRY code
- 🔍 Readable, maintainable tests with clear separation of concerns
- 📊 Test reports with `playwright-report`
- 🔐 `.env` support for managing sensitive configuration

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org) (v20 or later)
- [npm](https://www.npmjs.com/)

## Setup

Clone the repository:

```bash
git clone https://github.com/pwtsdev/bookstore-api.git

cd bookstore-api
```

Install dependencies:

```bash
# Install dependenciesInstall dependencies
npm install

# Run all tests
npx playwright test

# View HTML report
npx playwright show-report
```

---

## 📂 Folder Structure

```
.
├── src/
│   └── api/
│       ├── const/          # Constants and shared values
│       ├── datafactory/    # Dynamic test data generators
│       ├── fixtures/       # Override Playwright fixtures
│       ├── helpers/        # Utility functions
│       ├── models/         # Request/response data models
│       ├── requests/       # Encapsulated API calls
│       └── steps/          # Reusable step definitions for tests
│
├── tests/
│   ├── authors/            # Author-related test cases
│   ├── book-cover/         # Cover upload tests
│   ├── books/              # Book-related test cases
│   ├── orders/             # Order-related test cases
│   ├── token/              # Authentication tests
│   ├── fixtures/           # Additional test-specific fixtures
│   └── test-data/          # Static test data
│
├── playwright-report/      # Test reports
├── test-results/           # Raw test output
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
├── eslint.config.mjs       # Linting rules
└── ...
```

## Dependencies

The project includes the following dependencies:

- `@eslint/js`
- `@faker-js/faker`
- `@playwright/test`
- `@types/node`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-playwright`
- `prettier`
- `typescript`
- `typescript-eslint`
- `dotenv`
- `tslog`

## Configuration

The project is configured to use Prettier and ESLint for code formatting and linting. The configuration files are located in the `.vscode` directory and the root of the project:

- `settings.json`: Contains VS Code settings for auto-saving, formatting, and linting.
- `extensions.json`: Recommends extensions for VS Code.
- `tsconfig.json`: TypeScript configuration file.
- `.prettierignore`: Files and directories to ignore for Prettier.
- `.gitignore`: Files and directories to ignore for Git.

---

## Fun Facts

Did you know? APIs are like waiters in a restaurant – you place an order (send a request), and they bring you food (response). But sometimes, they get confused and bring you the wrong dish (unexpected data), forget your order (timeout), or just ghost you completely (server down). 🍽️🤖😂

Happy hacking!

---

## 👥 Credits

Created and maintained by the **<pwts.dev>** team — empowering testers to automate with confidence.

[<pwts.dev>](https://pwts.dev/) team [@bkita](https://github.com/bkita) and [@mkusz](https://github.com/mkusz).

---

## 📬 Questions?

Reach out to us at [hello@pwts.dev](mailto:hello@pwts.dev) or visit our site [https://pwts.dev](https://pwts.dev)

---

## License

This project is licensed under the ISC License.
