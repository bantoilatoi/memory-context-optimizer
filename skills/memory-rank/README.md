# Memory Rank Skill

Rank context by task relevance.

## Tiers

| Tier | Priority | Max Items |
|------|----------|-----------|
| Critical | First | Unlimited |
| Useful | Second | 20 |
| Reference | Third | 10 |
| Archive | Skip | 0 |

## Scoring

```
relevance = direct_importance * 0.4 +
            task_mention * 0.3 +
            recency * 0.2 +
            dependency * 0.1
```

## Output

```markdown
## Context Ranking

### Tier 1: Critical
1. `src/file.js` - why relevant

### Tier 2: Useful
4. `src/related.js` - why relevant

### Tier 3: Reference
7. `docs/guide.md` - why relevant
```

## Usage

```bash
memory-rank
```
