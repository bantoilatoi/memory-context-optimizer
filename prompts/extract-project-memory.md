# Extract Project Memory Prompt

Extract relevant memory for current task.

## Process

1. Identify task requirements
2. Scan `.memory-context/` for relevant entries
3. Rank entries by relevance
4. Extract summaries
5. Link to source files

## Relevant Entry Types

| Task | Relevant Files |
|------|----------------|
| Bug fix | known-errors.md, recent changes |
| Feature | architecture.md, decisions.md, api-contracts.md |
| Refactor | architecture.md, testing-patterns.md |
| Deploy | deployment.md, ci-cd.md |
| Security | security-notes.md |
| Testing | testing-patterns.md |

## Output Format

```markdown
## Relevant Memory

### Architecture
[Entry summary]

### Conventions
[Entry summary]

### Known Issues
[Entry summary]

### Decisions
[Entry summary]

### Sources
- [file.md]: [location of entry]
```
