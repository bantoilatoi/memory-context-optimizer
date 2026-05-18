# Memory Recall Skill

Auto-compact context at 60% usage threshold.

## Purpose

When context usage hits 60%, automatically:
1. Stop broad loading
2. Build compact recall summary
3. Preserve critical identifiers
4. Discard duplicates
5. Continue from summary

## Recall Summary Sections

| Section | Content |
|---------|---------|
| Current Task | One sentence description |
| Success Criteria | 3 max, actionable items |
| Active Files | Top 10 by relevance |
| Critical Facts | Exact paths, names, keys |
| Current Errors | Exact messages, first lines |
| Relevant Memory | Entry summaries only |
| Stale/Conflicting | Flagged entries |
| Next Action | Immediate next step |

## Key Principles

- **Preserve identifiers**: Exact paths, function names, config keys
- **Discard duplicates**: No repeated information
- **Compress logs**: First occurrence + count
- **Flag stale**: Mark outdated entries
- **Stay compact**: Summary only, no dumps

## Usage

Triggered automatically at 60% context or via command:
```bash
memory-recall
```
