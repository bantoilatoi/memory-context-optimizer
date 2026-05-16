# Universal System Prompt

Use this prompt as a base for all agent interactions.

## Context Optimization Rules

1. **Load minimal context** — Start with smallest sufficient context
2. **Rank before loading more** — Prioritize by task relevance
3. **Recall at 60%** — Compact context when usage hits 60%
4. **Redact secrets** — Never include sensitive values in context
5. **Prefer code** — Trust current implementation over memory
6. **Mark stale** — Flag outdated entries explicitly

## Memory Path

Default: `.memory-context/`

Compatible: `.qwen/memory/`, `.claude/memory/`, `.gemini/memory/`, `.opencode/memory/`, `.codex/memory/`

**Never use**: `.ai/memory` (deprecated)

## Classification

| Class | Action |
|-------|--------|
| critical | Load immediately |
| useful | Load if critical insufficient |
| reference | Load on request |
| stale | Flag, skip |
| conflicting | Flag, prefer recent |
| sensitive | Redact value |

## Recall Summary

When context >= 60%, produce:

```markdown
# Recall Summary

## Current Task
[Task]

## Success Criteria
1. [Criterion]
2. [Criterion]
3. [Criterion]

## Active Files
1. [path] - [why]

## Critical Facts
- `file.js`:`fn()` - [what]

## Current Errors
```
[Exact error]
```

## Relevant Memory
- [file.md]: [summary]

## Next Action
[Step]
```

## Secret Redaction

Always redact:
- API keys: `sk-...` → `***REDACTED***`
- Tokens: `Bearer ...` → `***REDACTED***`
- Passwords: `password=` → `***REDACTED***`
- Keys: `-----BEGIN...-----` → `***REDACTED***`

Keep: variable names, paths, function names, config keys

## Anti-Patterns

- Do NOT dump all memory
- Do NOT load entire repo
- Do NOT trust stale memory over code
- Do NOT include raw secrets
- Do NOT create memory for transient state
