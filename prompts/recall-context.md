# Recall Context Prompt

Triggered when context usage >= 60%.

## Protocol

1. **STOP** — Halt all broad context loading
2. **BUILD** — Create compact recall summary
3. **PRESERVE** — Keep critical identifiers
4. **DISCARD** — Remove duplicates and low-value
5. **CONTINUE** — Resume from summary

## Summary Template

```markdown
# Recall Summary

## Current Task
[One sentence]

## Success Criteria
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

## Active Files (Top 10)
1. `path/to/file.js` - [why relevant]
2. ...

## Critical Facts
- `src/auth.js`: `validateToken()` checks expiry
- `config/api.yaml`: baseURL = staging
- `User` model: has email, role, lastLogin

## Current Errors
```
TypeError at PaymentService.process (src/services/payment.js:42)
```

## Relevant Memory
- `architecture.md`: Event-driven microservices
- `decisions.md`: Chose PostgreSQL for ACID

## Stale/Conflicting
- `known-errors.md`: Mentions Node 16 bug → now Node 20

## Discarded
- Verbose logs (compressed to first + count)
- Duplicate entries
- Low-relevance files

## Next Action
[Immediate next step]
```

## Preservation Rules

### Keep
- Exact file paths
- Exact function/class names
- Exact error messages
- Exact line numbers
- Recent decisions with rationale
- Stale/conflicting flags

### Discard
- Duplicate information
- Full stack traces (first 5 frames)
- Verbose logs (first + count)
- Unrelated files
