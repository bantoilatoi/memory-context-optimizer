# Refactor with Memory Prompt

Use memory for safe refactoring context.

## Process

1. Check `architecture.md` for system design
2. Check `decisions.md` for rationale
3. Map dependencies
4. Identify breaking changes
5. Plan incremental steps

## Refactor Context Format

```markdown
## Refactor Context

### Scope
- Files to change: N
- Direct dependents: N
- Tests affected: N

### Breaking Changes
- [Function] signature change
- [Config] format change

### Dependencies
- `src/a.js` → uses `src/b.js:fn()`
- `src/c.js` → imports `src/b.js`

### Incremental Plan
1. Update `src/b.js` with new function
2. Update `src/a.js` caller
3. Update `src/c.js` caller
4. Run tests

### Memory Links
- `decisions.md`: "Chose this structure for X reason"
- `architecture.md`: "Module relationship diagram"
```
