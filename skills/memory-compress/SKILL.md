---
name: memory-compress
description: >
  Compress verbose logs and tool output while preserving exact errors,
  line numbers, and technical identifiers.
trigger:
  - compress logs
  - log compression
  - reduce output
  - trim logs
---

# Memory Compress Skill

Compress logs and tool output while preserving essential information.

## Compression Rules

### Always Preserve

- Exact error messages
- Exact file paths
- Exact line numbers
- Exception types and names
- Function/class names
- Config keys and structure
- API endpoint paths

### Compress/Remove

- Duplicate stack traces
- Repeated patterns (show first + count)
- Verbose timestamps (keep if order-critical)
- Whitespace beyond first line indent
- Redundant headers
- Empty lines (keep if section breaks)

## Compression Techniques

### Stack Traces

**Before** (verbose):
```
Error: Cannot read property 'foo' of undefined
    at Bar.baz (src/utils.js:42:15)
    at Bar.qux (src/utils.js:101:7)
    at Qux.handle (src/handlers.js:55:10)
    at Layer.handle [as handleRequest] (node_modules/express/lib/router/index.js:305:5)
    at processTicksAndRejections (node:internal/process/task_queues.js:95:5)
    at Function.Module._load (node_modules/internal/modules/cjs/loader.js:1226:10)
```

**After** (compressed):
```
Error: Cannot read property 'foo' of undefined
  at Bar.baz (src/utils.js:42)
  at Bar.qux (src/utils.js:101)
  at Qux.handle (src/handlers.js:55)
[7 more frames in node_modules/internal/modules]
```

### Repeated Lines

**Before**:
```
Processing item 1...
Processing item 2...
Processing item 3...
Processing item 4...
Processing item 5...
```

**After**:
```
Processing item 1...
[Processing item 2-5... repeated 4x]
```

### Diff Output

**Before**:
```
--- a/src/utils.js
+++ b/src/utils.js
@@ -1,15 +1,20 @@
 const foo = 'bar';
+const baz = 'qux';
```

**After**:
```
src/utils.js: +3 lines
  const foo = 'bar';
+ const baz = 'qux';
```

### Test Output

**Before**:
```
PASS tests/auth.test.js (5.234 s)
PASS tests/user.test.js (3.123 s)
PASS tests/api.test.js (4.567 s)
```

**After**:
```
PASS: auth (5.2s), user (3.1s), api (4.6s)
```

## Error Preservation Format

```markdown
## Errors

### Error 1
```
TypeError: Cannot read property 'amount' of undefined
  at PaymentService.process (src/services/payment.js:42:15)
  at OrderController.create (src/controllers/order.js:18:10)
```

### Error 2
```
AssertionError: expected 200 to equal 404
  at Test.<anonymous> (tests/api.test.js:123:10)
```

## Compression Examples

| Type | Action |
|------|--------|
| Full stack trace | Keep 3-5 frames, note remaining |
| Repeated log lines | First + "[repeated Nx]" |
| Diff hunks | Show +/- counts |
| Test suite output | Summary format |
| Build output | Keep warnings/errors only |

## Anti-Patterns

- Do NOT remove exact error messages
- Do NOT remove file paths
- Do NOT remove line numbers
- Do NOT remove function names
- Do NOT create ambiguous summaries
- Do NOT lose critical debug information
