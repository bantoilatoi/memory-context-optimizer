# CI/CD with Memory Prompt

Use memory for CI/CD debugging context.

## Process

1. Check `ci-cd.md` for pipeline details
2. Check `deployment.md` for environments
3. Load failing stage config
4. Extract error context
5. Link to known issues

## CI/CD Context Format

```markdown
## CI/CD Context

### Pipeline
- Provider: GitHub Actions
- Failing stage: test
- Error: tests failed

### Stage Config
```yaml
# .github/workflows/test.yml
- name: Test
  run: npm test
```

### Error
```
FAIL tests/auth.test.js
Expected: 200, Received: 500
```

### Relevant Memory
- `ci-cd.md`: Test stage runs on Ubuntu
- `known-errors.md`: "Auth tests flaky on CI"

### Fix Suggestions
1. Check auth service configuration
2. Verify test database setup
3. Check for timing issues
```
