# Debug with Memory Prompt

Use memory to focus debugging context.

## Process

1. Load error context (file, line, message)
2. Check `known-errors.md` for known issues
3. Load minimal code for error location
4. Rank test files for related tests
5. Compress stack trace

## Debug Context Format

```markdown
## Debug Context

### Error
```
TypeError: Cannot read property 'foo' of undefined
  at Bar.baz (src/utils.js:42:15)
```

### File
`src/utils.js:42`

### Related Tests
- `tests/utils.test.js` - tests Bar.baz
- `tests/auth.test.js` - uses Bar.baz

### Known Issues
- `known-errors.md`: "Bar.baz returns undefined if input is null"

### Next Steps
1. Check input validation in Bar.baz
2. Add null check test
3. Verify fix doesn't break callers
```
