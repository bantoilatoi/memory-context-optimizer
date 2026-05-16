# OpenCode Adapter

Adapter for OpenCode integration.

## Overview

This adapter provides memory-context-optimizer integration for OpenCode.

## Installation

```bash
node bin/install.js --only opencode
```

Or manually:
```bash
# Copy to project root
cp AGENTS.md GEMINI.md <project>/
```

## Files

- `AGENTS.md` - Generic agent instructions
- `GEMINI.md` - Compact instructions

## Usage

OpenCode will:
1. Load `AGENTS.md` for context optimization rules
2. Use `.memory-context/` for project memory
3. Respect auto-recall at 60%

## Memory Path

Default: `.memory-context/`
Compatible: `.opencode/memory/`
