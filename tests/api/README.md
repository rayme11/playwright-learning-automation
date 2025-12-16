# API Testing Examples

This directory contains examples of API testing using Playwright's built-in `request` fixture.

## Test Files

### jsonplaceholder.spec.ts
Comprehensive examples of REST API testing including:
- **GET** requests (single item, list, with query parameters)
- **POST** requests (creating resources)
- **PUT** requests (full updates)
- **PATCH** requests (partial updates)
- **DELETE** requests
- Error handling (404 responses)
- Response validation
- Performance testing

### users-api.spec.ts
Examples of testing complex nested data structures:
- Fetching users with nested address data
- Testing related resources (todos, albums)
- Data validation across collections
- Email format validation

### api-with-auth.spec.ts
Advanced API testing patterns:
- Custom headers (Authorization, etc.)
- Query parameters
- Chaining multiple API calls
- Retry logic for failed requests
- JSON schema validation

## Running the Tests

Run all API tests:
```bash
npx playwright test tests/api
```

Run a specific test file:
```bash
npx playwright test tests/api/jsonplaceholder.spec.ts
```

Run tests in headed mode:
```bash
npx playwright test tests/api --headed
```

Run with UI mode for debugging:
```bash
npx playwright test tests/api --ui
```

## Key Concepts

### Using the `request` Fixture
Playwright provides a `request` fixture that can make API calls independently of browser context:

```typescript
test('example', async ({ request }) => {
  const response = await request.get('https://api.example.com/data');
  expect(response.status()).toBe(200);
  const data = await response.json();
});
```

### Common Assertions
- `response.status()` - HTTP status code
- `response.ok()` - true if status is 200-299
- `response.json()` - parse response body as JSON
- `response.text()` - get response body as text
- `response.headers()` - get response headers

### Benefits of API Testing
1. **Faster** - No browser overhead
2. **More reliable** - No UI flakiness
3. **Better coverage** - Test edge cases easily
4. **Early detection** - Catch backend issues before UI testing

## Public API Used
These tests use [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing and prototyping.
