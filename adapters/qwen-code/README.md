# Qwen Code Adapter

Adapter for Qwen Code integration.

## Overview

This adapter provides memory-context-optimizer integration for Qwen Code.

## Installation

```bash
node bin/install.js --only qwen
```

Or manually:
```bash
# Copy skill to Qwen skills directory
cp -r skills/memory-context-optimizer ~/.qwen/skills/

# Copy manifest
cp qwen-extension.json ~/.qwen/
```

## Files

- `qwen-extension.json` - Qwen extension manifest
- `skills/memory-context-optimizer/` - Main skill

## Usage

Qwen Code will automatically:
1. Read `qwen-extension.json` for configuration
2. Load skill from `.qwen/skills/memory-context-optimizer/`
3. Use `.memory-context/` as default memory path

## Configuration

```json
{
  "name": "memory-context-optimizer",
  "version": "0.1.0",
  "defaultMemoryPath": ".memory-context",
  "autoRecallThreshold": 0.6
}
```

## Memory Path

Default: `.memory-context/`
Compatible: `.qwen/memory/`, `.claude/memory/`, etc.
