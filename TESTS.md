# Automated Test Coverage

The project includes automated tests for the audit recommendation engine using Vitest.

These tests validate deterministic financial recommendation logic and savings calculations across multiple audit scenarios.

---

# Test Framework

* Vitest
* TypeScript

---

# Test File

```txt id="x5t9nb"
src/lib/__tests__/audit-engine.test.ts
```

---

# Test Coverage

## 1. ChatGPT Team Overspend Detection

Validates that small teams using ChatGPT Team plans receive downgrade recommendations to ChatGPT Plus when collaboration features are unnecessary.

---

## 2. Already Optimized Plans

Ensures the audit engine does not manufacture fake savings opportunities when the user's current configuration is already cost efficient.

---

## 3. Claude Team Savings Calculations

Validates estimated savings calculations for oversized Claude Team usage scenarios.

---

## 4. Multi-Tool Recommendation Generation

Ensures the engine correctly returns recommendations for multiple tools within a single audit submission.

---

## 5. Honest Low-Spend Scenarios

Validates that low-spend or already-optimized users receive honest feedback instead of inflated optimization claims.

---

# How To Run Tests

Run all tests:

```bash id="n7q3wv"
npm run test -- --run
```

Run tests in watch mode during development:

```bash id="m4x8jp"
npm test
```

---

# CI Integration

Tests automatically run through GitHub Actions on every push to the `main` branch alongside ESLint validation.

Workflow file:

```txt id="w2p9kr"
.github/workflows/ci.yml
```
