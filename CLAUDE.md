# Memory Context Optimizer

Claude Code maintainer guide for the Memory Context Optimizer extension.

## Purpose

Use minimal, relevant project memory instead of loading whole history into every prompt.

## Memory path

Default project memory directory: `.memory-context/`.

Compatible agent memory directories may be mapped into `.memory-context/` by installers or adapters.

## Core workflow

1. Recall only context relevant to the current task.
2. Rank memory by task relevance and freshness.
3. Compress long logs and stale context before adding them to prompts.
4. Redact secrets before storing or sharing memory.
5. Audit memory regularly for stale or unsafe entries.

## Commands

```bash
node bin/memory-context.js init
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js compress
node bin/memory-context.js audit
```

## Safety

Do not store secrets, credentials, tokens, private keys, or raw production data in memory files.
