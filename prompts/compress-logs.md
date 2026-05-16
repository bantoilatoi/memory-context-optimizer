# Compress Logs Prompt

Use for compressing verbose log output.

## Compression Rules

### Stack Traces

Keep first 5 frames:
```
Error: Cannot read property 'foo' of undefined
  at Bar.baz (src/utils.js:42)
  at Bar.qux (src/utils.js:101)
  at Qux.handle (src/handlers.js:55)
[3 more frames]
```

### Repeated Lines

```
Line 1
[Line 2-5 repeated 4x]
```

### Test Output

Before:
```
PASS tests/auth.test.js (5.234 s)
PASS tests/user.test.js (3.123 s)
```

After:
```
PASS: auth (5.2s), user (3.1s)
```

## What to Preserve

- Exact error messages
- File paths
- Line numbers
- Function names
- Exception types

## What to Compress

- Duplicate frames
- Repeated patterns
- Verbose timestamps
- Excess whitespace
