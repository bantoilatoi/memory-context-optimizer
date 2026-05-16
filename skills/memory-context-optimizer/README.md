# Memory Context Optimizer Skill

Universal context optimization for AI coding agents.

## Overview

This skill optimizes how AI agents use context by:
- Loading minimal sufficient context first
- Ranking files and memory by task relevance
- Compacting context automatically at 60% usage
- Detecting and flagging stale/conflicting memory
- Redacting secrets before context inclusion

## Quick Start

1. Use `.memory-context/` for project memory (compatible with `.qwen/memory/`, `.claude/memory/`, etc.)
2. Classify context items immediately on load
3. Rank before loading more context
4. Trigger recall when usage >= 60%
5. Always redact secrets

## Memory Structure

```
.memory-context/
  architecture.md      # Project architecture decisions
  coding-conventions.md # Style, patterns, naming
  current-work.md       # Active tasks and blockers
  known-errors.md       # Known bugs and workarounds
  testing-patterns.md   # Test conventions
  deployment.md         # Deploy process and config
  decisions.md          # Decision log with rationale
  observability.md      # Logging, metrics, alerts
  api-contracts.md      # API schemas and contracts
  data-models.md        # Database schemas, models
  ci-cd.md             # CI/CD pipeline details
  security-notes.md     # Security considerations
  stale-candidates.md  # Entries flagged for review
  recall-index.md      # Recent recall summaries
```

## Auto Recall

When context hits 60% usage:
1. Stop broad loading
2. Build compact recall summary
3. Preserve critical identifiers
4. Discard duplicates
5. Mark stale entries
6. Continue from summary

## Secret Redaction

Patterns redacted:
- API keys: `sk-...`, `api_key=`
- Tokens: `Bearer ...`, `token=`
- Passwords: `password=`, `pwd:`
- Keys: `-----BEGIN...-----END`
- Secrets: `secret=`, `SECRET=`

Values replaced with `***REDACTED***`, names kept.

## Validation

```bash
node src/tools/validate-repository.js
```

## Files

- `SKILL.md` — Main skill definition
- `README.md` — This file
