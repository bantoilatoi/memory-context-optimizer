# Claude Code Adapter

Adapter for Claude Code integration.

## Overview

This adapter provides memory-context-optimizer integration for Claude Code.

## Installation

```bash
node bin/install.js --only claude
```

Or manually:
```bash
# Copy plugin
cp -r .claude-plugin <project>/

# Copy root files
cp CLAUDE.md AGENTS.md <project>/
```

## Files

- `.claude-plugin/plugin.json` - Plugin manifest
- `CLAUDE.md` - Maintainer guide
- `AGENTS.md` - Agent instructions

## Usage

Claude Code will:
1. Read `.claude-plugin/plugin.json` for plugin info
2. Load `AGENTS.md` for context optimization rules
3. Use `.memory-context/` for project memory

## Plugin Structure

```
.claude-plugin/
└── plugin.json
```

## Commands

Claude Code commands:
```bash
# Memory operations
node bin/memory-context.js recall
node bin/memory-context.js audit
```
