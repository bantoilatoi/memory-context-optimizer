---
name: memory-rank
description: >
  Rank files, memory entries, and context by task relevance.
  Prioritize critical, prune low-value.
trigger:
  - rank
  - prioritize
  - relevance
  - context priority
---

# Memory Rank Skill

Rank context items by relevance to current task.

## Ranking Categories

### Tier 1: Critical (Load First)

- Current file being edited
- Directly imported files
- Test file for current file
- Config file explicitly mentioned
- Error messages for current task
- Package.json / requirements.txt

### Tier 2: Useful (Load If Needed)

- Files in same directory
- Related test files
- Documentation for current feature
- Type definitions
- Constants/utilities used by current file

### Tier 3: Reference (Load On Request)

- Documentation files
- Architecture docs
- README files
- Example files

### Tier 4: Archive (Skip Unless Flagged)

- Unrelated source files
- Old test files
- Backup files
- Generated files

## Ranking Factors

### Relevance Score Calculation

```
relevance = (
  direct_importance * 0.4 +
  task_mention * 0.3 +
  recency * 0.2 +
  dependency * 0.1
)
```

Where:
- `direct_importance`: 1 if current file, 0.5 if same module, 0.1 if unrelated
- `task_mention`: How many times mentioned in task description
- `recency`: Modified in last 7 days = 1, 30 days = 0.5, older = 0.1
- `dependency`: Import chain distance from current file

### Keyword Matching

Match task keywords against:
- File names
- Directory structure
- Code comments
- Function names
- Class names

### Prioritization Rules

1. **Active errors** — Prioritize files with failing tests
2. **Recent changes** — Recent commits modify important files
3. **Explicit mentions** — Task description mentions file by name
4. **Import distance** — Closer imports rank higher
5. **Test coverage** — Files with tests rank higher for bug fixes

## Ranking Output

```markdown
## Context Ranking

### Tier 1: Critical
1. `src/services/auth.js` - current file, contains `validateToken`
2. `tests/auth.test.js` - test file for auth.js
3. `config/auth.yaml` - auth configuration

### Tier 2: Useful
4. `src/middleware/jwt.js` - imports auth.js
5. `src/models/user.js` - user model used by auth
6. `docs/auth.md` - auth documentation

### Tier 3: Reference
7. `README.md` - project overview
8. `src/utils/crypto.js` - utility used indirectly

### Tier 4: Archive
- `src/old/auth-v1.js` - deprecated, not imported
- `tests/old/` - old test files
```

## Ranking Process

1. **Parse task** — Extract key terms and goals
2. **Scan files** — Match against file names and structure
3. **Check imports** — Build import graph
4. **Check git** — Get recent changes
5. **Check tests** — Find related tests
6. **Calculate scores** — Apply ranking formula
7. **Order results** — Present in tier format

## Load Limits

| Context Level | Max Items |
|--------------|-----------|
| Critical | Unlimited |
| Useful | 20 files |
| Reference | 10 files |
| Archive | 0 (skip) |

## Anti-Patterns

- Do NOT rank all files equally
- Do NOT load entire repo for small tasks
- Do NOT ignore import relationships
- Do NOT skip failing test files
- Do NOT load archive tier unless flagged
