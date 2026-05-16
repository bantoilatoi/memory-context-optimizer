---
name: memory-recall
description: >
  Auto-compact context when usage reaches 60%. Build recall summaries,
  preserve critical identifiers, mark stale entries, continue from summary.
trigger:
  - recall
  - context compact
  - 60% context
  - context threshold
  - memory summary
---

# Memory Recall Skill

Automatically compact context when active usage reaches 60%.

## Recall Threshold

**auto_recall_threshold: 0.60**

Trigger when: `active_context_tokens / max_context_tokens >= 0.60`

## Recall Protocol

### Phase 1: Stop Loading
```
STOP all broad context loading immediately.
Do not load more files, memory, or logs.
```

### Phase 2: Build Summary

Build compact recall summary with:

```
# Recall Summary

## Current Task
[One sentence task description]

## Success Criteria
[What "done" looks like - 3 items max]

## Active Files
[Top 10 files by relevance to current task]

## Critical Facts
- [File paths]
- [Function names]
- [Class names]
- [Config keys]
- [Environment variables]

## Current Errors
```
[Exact error message]
[Exact stack trace lines]
[Exception type and message]
```

## Relevant Memory
- [Entry name]: [One line summary]

## Decisions Made
- [Decision]: [Rationale]

## Stale or Conflicting
- [Entry]: [Issue description]

## Discarded
- [Category]: [Why discarded]

## Next Action
[Immediate next step]
```

### Phase 3: Preserve

Keep in context:
- Current task + criteria
- Exact file paths
- Exact function/class names
- Exact error messages
- Recent decisions with rationale
- Any flagged stale entries

### Phase 4: Discard

Remove from context:
- Duplicate information
- Verbose logs (compress to first + count)
- Low-relevance files
- Old stack traces (keep only critical lines)
- Redundant documentation

### Phase 5: Continue

Present recall summary as new context base. Load more only if:
- New task explicitly requires it
- Critical error needs direct file access
- Test failure needs specific implementation

## Recall Summary Format

```markdown
# Recall Summary

## Current Task
[TASK]

## Success Criteria
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

## Active Files
1. [path/to/file1.js] - [why relevant]
2. [path/to/file2.js] - [why relevant]
...

## Critical Facts
- `src/utils/auth.js`: `validateToken()` checks expiry
- `config/api.yaml`: baseURL points to staging
- `User` model: has `email`, `role`, `lastLogin` fields

## Current Errors
```
File: src/services/payment.js:42
Error: TypeError: Cannot read property 'amount' of undefined
```

## Relevant Memory
- `architecture.md`: Using event-driven microservices
- `decisions.md`: Chose PostgreSQL over MongoDB for ACID compliance

## Stale/Conflicting
- `known-errors.md`: Mentions Node 16 bug - now on Node 20

## Next Action
Run `npm test` to verify fix doesn't break existing tests
```

## Anti-Patterns

- Do NOT dump all memory
- Do NOT include full file contents
- Do NOT repeat verbose stack traces
- Do NOT load unrelated files
- Do NOT create new memory entries

## Trigger Conditions

Call memory-recall when:
1. Explicit user request
2. Context usage indicator >= 60%
3. Token estimate exceeds threshold
4. Memory dump requested
