# Agent Instructions

Use this project as a universal memory and context optimizer for AI coding agents.

## Memory rules

- Store project memory in `.memory-context/`.
- Keep memory concise, factual, and task-relevant.
- Prefer current repository state over stale memory.
- Verify file paths, symbols, and commands before recommending them.
- Redact secrets before saving memory.

## Context workflow

1. Identify the task.
2. Recall only relevant memory.
3. Rank by relevance, recency, and confidence.
4. Compress noisy context before use.
5. Update or remove stale memory after verification.

## Safety

Never persist credentials, API keys, tokens, private keys, or personal data unless explicitly required and safely redacted.
