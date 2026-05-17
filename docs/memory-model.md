# Memory Model

Structure and organization of project memory.

## Memory Directory

```
.memory-context/
├── architecture.md
├── coding-conventions.md
├── current-work.md
├── known-errors.md
├── testing-patterns.md
├── deployment.md
├── decisions.md
├── observability.md
├── api-contracts.md
├── data-models.md
├── ci-cd.md
├── security-notes.md
├── stale-candidates.md
└── recall-index.md
```

## File Purposes

| File | Purpose |
|------|---------|
| architecture.md | System design and components |
| coding-conventions.md | Style guide and patterns |
| current-work.md | Active tasks and blockers |
| known-errors.md | Bug workarounds |
| testing-patterns.md | Test conventions |
| deployment.md | Deploy process and config |
| decisions.md | Decision log with rationale |
| observability.md | Logging and monitoring |
| api-contracts.md | API schemas |
| data-models.md | Database schemas |
| ci-cd.md | Pipeline details |
| security-notes.md | Security considerations |
| stale-candidates.md | Review queue |
| recall-index.md | Recall summaries |

## Entry Format

```markdown
## Entry Title

Description.

**Why:** Reason for this entry.
**When:** Date added.
**Source:** Where this came from.
```

## Flag Format

Stale: `<!-- STALE: reason -->`
Conflicting: `<!-- CONFLICTING: contradicts X -->`

## Frontmatter

```yaml
---
name: file-name
type: architecture|conventions|work|errors|testing|deployment|decisions|observability|api|data|ci-cd|security|stale|recall
updated: YYYY-MM-DD
---
```

## Compatibility

Provider-specific paths:
- `.qwen/memory/` → map to `.memory-context/`
- `.claude/memory/` → map to `.memory-context/`
- `.gemini/memory/` → map to `.memory-context/`

**Never use**: `deprecated memory path` (deprecated)
