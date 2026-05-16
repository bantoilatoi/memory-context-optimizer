# Review Stale Memory Prompt

Use for reviewing and cleaning stale memory.

## Process

1. Scan all memory files
2. Check for stale markers
3. Verify against current code
4. Identify conflicts
5. Recommend actions

## Stale Review Format

```markdown
## Stale Memory Review

### Summary
- Total entries: N
- Stale: N (flagged)
- Conflicting: N (flagged)
- Healthy: N

### Stale Entries
| Entry | Reason | Action |
|-------|--------|--------|
| architecture.md | references deleted auth service | Update |
| decisions.md | outdated version decision | Add note |

### Conflicting Entries
| Entry | Conflict | Resolution |
|-------|----------|------------|
| known-errors.md | says fixed, code shows bug | Verify |

### Recommendations
1. Update architecture.md to remove auth service
2. Add note about version decision change
3. Verify bug fix claim
```
