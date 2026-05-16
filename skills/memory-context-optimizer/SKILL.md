---
name: memory-context-optimizer
description: >
  Optimize project memory and active context for AI coding agents. Load minimal context,
  rank relevance, compact at 60%, detect stale memory, and redact secrets.
trigger:
  - memory context
  - context optimization
  - recall
  - context bloat
  - memory audit
  - stale memory
  - context compact
---

# Memory Context Optimizer

Optimize context usage by loading minimal sufficient context, ranking by relevance, and compacting at 60%.

## Core Rules

### Memory Path
- **Default**: `.memory-context/`
- **Compatible**: `.qwen/memory/`, `.claude/memory/`, `.gemini/memory/`, `.opencode/memory/`, `.codex/memory/`
- **Never use**: `.ai/memory` (deprecated)

### Context Classification

Classify each context item immediately:

| Class | Action |
|-------|--------|
| `critical` | Load immediately, essential for task |
| `useful` | Load if critical is insufficient |
| `reference` | Load only when directly called |
| `archive` | Skip now, may load later if flagged |
| `discard` | Skip entirely |
| `sensitive` | Redact value, keep key |
| `stale` | Flag, do not trust |
| `conflicting` | Flag, prefer most recent |

### Ranking Priority

When context exceeds threshold:

1. **Task-critical files** — Current file, imports, direct dependencies
2. **Active tests** — Failing tests first, then related tests
3. **Recent changes** — Last 10 commits of relevant files
4. **Memory entries** — Entries tagged for current task only
5. **Documentation** — Only if directly referenced in code

### Auto Recall Protocol

When active context >= 60%:

```
1. STOP broad loading immediately
2. BUILD recall summary
3. Preserve: task, criteria, file paths, function names, errors
4. Discard: duplicates, verbose logs, low-relevance entries
5. Mark stale/conflicting entries
6. CONTINUE from recall summary
```

### Recall Summary Format

```markdown
# Recall Summary

## Current Task
[Task description]

## Success Criteria
[What success looks like]

## Active Files
- [File paths, ranked by relevance]

## Critical Facts
- [Exact facts needed]

## Current Errors / Failing Tests
```
[Exact error messages]
```

## Relevant Memory
- [Memory entry summaries]

## Decisions Made
- [Key decisions with rationale]

## Stale or Conflicting Context
- [Flagged entries]

## Discarded Context Categories
- [Categories skipped]

## Next Action
[Immediate next step]
```

## Secret Redaction

Always redact before context inclusion:

| Type | Pattern | Redact |
|------|---------|--------|
| API keys | `sk-...`, `api_key`, `API_KEY` | Full value |
| Tokens | `Bearer ...`, `token=` | Full value |
| Passwords | `password=`, `pwd:` | Full value |
| Private keys | `-----BEGIN`, `-----END` | Full value |
| Secrets | `secret`, `SECRET` | Full value |

**Keep**: variable names, file paths, function names, config keys, error structure

## Log Compression

When including logs in context:

1. Remove duplicate stack traces
2. Collapse repeated patterns: `[repeated 5x]`
3. Keep: first occurrence + count
4. Preserve: exact error lines, line numbers, exception types
5. Remove: timestamps unless order-critical

## Stale Memory Detection

Mark entries as stale when:

- Contradicted by current code
- References deleted files
- Contains outdated versions
- Mentions non-existent commands
- Has conflicting info from another entry

Flag format: `<!-- STALE: reason -->`

## Memory Update Rules

Only propose memory updates for:

- Durable facts (architecture, conventions)
- Non-obvious decisions with rationale
- Bug patterns with fix rationale
- Project-specific terminology
- Critical domain knowledge

**Never** update memory for:

- Transient task state
- Temporary workarounds
- One-off debugging notes
- File contents (can read directly)

## Anti-Patterns

- Do NOT dump all memory to user
- Do NOT load entire repo context
- Do NOT include verbose stack traces verbatim
- Do NOT trust stale memory over code
- Do NOT redact variable names
- Do NOT create memory entries for transient state

## Commands

```bash
memory-init    # Initialize .memory-context/ files
memory-recall  # Compact context at 60%
memory-rank    # Rank by relevance
memory-compress # Compress logs
memory-audit   # Check for stale/conflicts
memory-status  # Show health summary
```
