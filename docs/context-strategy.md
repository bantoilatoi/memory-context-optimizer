# Context Strategy

How memory-context-optimizer manages context usage.

## Context Lifecycle

1. **Session Start**
   - Load minimal context
   - Check project memory
   - Identify task

2. **During Session**
   - Classify each context item
   - Rank before loading more
   - Monitor usage

3. **At Threshold (60%)**
   - Trigger recall
   - Build summary
   - Compact context

4. **Session End**
   - Update memory
   - Document decisions
   - Flag stale entries

## Memory Path

Default: `.memory-context/`

Compatible:
- `.qwen/memory/`
- `.claude/memory/`
- `.gemini/memory/`
- `.opencode/memory/`
- `.codex/memory/`

## Context Classification

| Class | Action |
|-------|--------|
| critical | Load immediately |
| useful | Load if critical insufficient |
| reference | Load on request |
| archive | Skip |

## Threshold

Trigger: 60% context usage

Formula: `active_tokens / max_tokens >= 0.60`

## Recall Summary

When threshold hit:

```markdown
# Recall Summary

## Current Task
[One sentence]

## Success Criteria
1. [Criterion]

## Active Files
1. [path]

## Critical Facts
- [fact]

## Current Errors
```
[error]
```

## Next Action
[step]
```

## Optimization Rules

1. Load minimal sufficient context
2. Rank by relevance before loading more
3. Redact secrets before inclusion
4. Prefer code over memory
5. Mark stale entries
