# Testing Patterns

Test conventions and strategies.

<!-- Document testing approach below -->

## Test Framework

- Framework: [Jest/Vitest/Pytest/etc]
- Version: [version]

## Test Structure

```javascript
describe('module', () => {
  it('should do thing', () => {
    // Arrange
    const input = value;

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(expected);
  });
});
```

## Mock Strategies

<!-- Document how to mock external dependencies -->

## Fixtures

- Location: [path]
- Format: [JSON/YAML/etc]

## Coverage Requirements

- Minimum: [percentage]%
- Critical paths: [list]

## Test Commands

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific file
npm test -- path/to/test.js
```
