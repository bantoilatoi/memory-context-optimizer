# Rank Context Prompt

Rank context items by relevance.

## Ranking Process

1. Parse task keywords
2. Score files by relevance
3. Categorize into tiers
4. Apply load limits
5. Explain ranking

## Scoring Formula

```
relevance = (
  direct_importance * 0.4 +
  task_mention * 0.3 +
  recency * 0.2 +
  dependency * 0.1
)
```

## Tiers

| Tier | Score | Load | Examples |
|------|-------|------|----------|
| Critical | >= 0.7 | Unlimited | Current file, imports, tests |
| Useful | 0.4-0.7 | 20 | Related files, same module |
| Reference | 0.2-0.4 | 10 | Docs, examples |
| Archive | < 0.2 | 0 | Unrelated, old |

## Output Format

```markdown
## Context Ranking

### Tier 1: Critical
1. `src/auth.js` - current file
2. `tests/auth.test.js` - test file

### Tier 2: Useful
3. `src/middleware/jwt.js` - imports auth.js
4. `src/models/user.js` - used by auth

### Tier 3: Reference
5. `docs/auth.md` - auth documentation

### Discarded
- `src/old/auth-v1.js` - deprecated, not imported
- `tests/old/` - old tests
```
