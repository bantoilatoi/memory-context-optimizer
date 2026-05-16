# Codex CLI Adapter

Adapter for Codex CLI integration.

## Overview

This adapter provides memory-context-optimizer integration for Codex CLI.

## Installation

```bash
node bin/install.js --only codex
```

Or manually:
```bash
# Copy Codex-specific files
cp -r .codex <project>/

# Copy root files
cp AGENTS.md GEMINI.md <project>/
```

## Files

- `.codex/AGENTS.md` - Codex-specific agent instructions
- `AGENTS.md` - Generic agent instructions
- `GEMINI.md` - Compact instructions

## Usage

Codex CLI will:
1. Load `.codex/AGENTS.md` for Codex-specific rules
2. Fall back to `AGENTS.md` for base rules
3. Use `.codex/memory/` or `.memory-context/` for project memory

## Memory Path

Default: `.codex/memory/`
Fallback: `.memory-context/`
