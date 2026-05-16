# Generic Agent Adapter

Adapter for any AI coding agent.

## Overview

This adapter provides memory-context-optimizer as a universal plugin that works with any agent that supports rule files or instruction files.

## Installation

```bash
node bin/install.js --only generic --with-init
```

Or manually:
```bash
# Copy to project root
cp AGENTS.md GEMINI.md <project>/

# Initialize memory
mkdir -p .memory-context
```

## Files

- `AGENTS.md` - Generic agent instructions
- `GEMINI.md` - Compact instructions
- `.memory-context/` - Memory directory (create with --with-init)

## Usage

Any agent can load:
1. `AGENTS.md` for context optimization rules
2. `.memory-context/` files for project memory

## Supported Agents

| Agent | Support Level |
|-------|---------------|
| Cursor | Partial (via .cursorrules) |
| Windsurf | Partial (via .windsurfrules) |
| Cline | Partial (via instructions) |
| Copilot | Partial (via comments) |

## Memory Path

Default: `.memory-context/`

## Commands

```bash
# Initialize memory
node bin/memory-context.js init

# Memory operations
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js audit
```
