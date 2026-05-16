# Summarize Context Prompt

Use for creating concise context summaries.

## When to Summarize

- Before recall trigger
- When context exceeds tier limits
- When preparing for recall
- When context bloat detected

## Summary Format

```markdown
## Context Summary

### Task
[Current task in one sentence]

### Files (N total)
| File | Relevance | Lines |
|------|-----------|-------|
| src/a.js | Critical | 150 |
| src/b.js | Useful | 80 |

### Key Facts
1. [Fact 1]
2. [Fact 2]
3. [Fact 3]

### Errors
- [Error 1]: [file:line]
- [Error 2]: [file:line]

### Memory Links
- architecture.md: [summary]
- decisions.md: [summary]
```

## Compression Rules

- Remove duplicate information
- Keep exact identifiers only
- Use one-line summaries for memory
- Limit to top 10 files
