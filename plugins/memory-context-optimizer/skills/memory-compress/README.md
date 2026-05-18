# Memory Compress Skill

Compress verbose logs while preserving exact errors and identifiers.

## What to Preserve

- Error messages (exact text)
- File paths
- Line numbers
- Function/class names
- Config structure
- API endpoints

## What to Compress

- Duplicate stack traces
- Repeated patterns (show first + count)
- Verbose timestamps
- Excess whitespace
- Redundant headers

## Examples

### Stack Traces
Keep 3-5 frames, summarize rest:
```
Error at Bar.baz (src/utils.js:42)
[5 more frames]
```

### Repeated Lines
```
Line 1
[repeated 10x]
```

### Diff Output
```
src/file.js: +5, -2 lines
```

## Usage

```bash
memory-compress
```
