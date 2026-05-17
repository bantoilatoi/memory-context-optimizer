# Gemini Instructions

Memory Context Optimizer: load minimal useful context, rank relevance, compress noise, redact secrets.

Default memory dir: `.memory-context/`.

Use:

```bash
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js compress
node bin/memory-context.js audit
```

Rules:

- Recall only task-relevant memory.
- Verify stale memory against current files.
- Redact secrets before storing context.
- Prefer current code over remembered summaries.
