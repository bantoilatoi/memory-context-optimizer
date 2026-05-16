# Test with Memory Prompt

Use memory to optimize test context.

## Process

1. Check `testing-patterns.md` for conventions
2. Load test files for current code
3. Load implementation alongside tests
4. Prioritize failing tests
5. Extract test structure

## Test Context Format

```markdown
## Test Context

### Testing Patterns
- Framework: jest
- Mock strategy: jest.mock()
- Fixtures: tests/fixtures/

### Failing Tests
- `tests/auth.test.js:42` - "should validate token"

### Related Implementation
- `src/auth.js` - auth module

### Test Structure
```javascript
describe('auth', () => {
  describe('validateToken', () => {
    it('should validate token', () => { ... });
  });
});
```

### Suggestions
1. Fix validateToken to handle expired tokens
2. Add test for expired token case
```
