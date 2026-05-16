# Daily Use Prompt

Use this prompt for daily development sessions.

## Session Start

When starting a new session:

1. Check `.memory-context/current-work.md` for active tasks
2. Check `.memory-context/known-errors.md` for issues
3. Identify immediate next action
4. Load minimal context for that action

## During Session

- Classify each context item on load
- Rank before loading more
- Trigger recall at 60% usage
- Update `current-work.md` with progress
- Flag new issues in `known-errors.md`

## Session End

1. Update `current-work.md` with completed work
2. Document any decisions in `decisions.md`
3. Note any stale entries discovered
4. Summarize context for next session

## Example Workflow

```
Session start:
  "What's my current task?"
  → Read current-work.md
  → "Fix login bug in auth service"

During:
  "Find the issue"
  → Load minimal: auth.js, login route
  → Rank test files by relevance
  → Discover error, flag in recall

Session end:
  "Document what I did"
  → Update current-work.md
  → Add decision to decisions.md
```
