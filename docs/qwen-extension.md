# Qwen Extension

Memory context optimizer for Qwen Code.

## Installation

### Using Installer

```bash
node bin/install.js --only qwen
```

### Manual Install

```bash
# Copy skill to Qwen skills directory
cp -r skills/memory-context-optimizer ~/.qwen/skills/

# Copy manifest
cp qwen-extension.json ~/.qwen/
```

## Extension Manifest

```json
{
  "name": "memory-context-optimizer",
  "version": "0.1.0",
  "description": "Universal memory and context optimizer for Qwen-compatible coding agents.",
  "entry": "skills/memory-context-optimizer/SKILL.md",
  "defaultMemoryPath": ".memory-context",
  "autoRecallThreshold": 0.6,
  "node": ">=20",
  "branch": "master"
}
```

## How It Works

1. Qwen Code reads `qwen-extension.json`
2. Loads skill from configured entry path
3. Uses defaultMemoryPath for project memory
4. Triggers recall at autoRecallThreshold (60%)

## Memory Path

Default: `.memory-context/`
Compatible: `.qwen/memory/`

## Files

- `qwen-extension.json` - Extension manifest
- `skills/memory-context-optimizer/` - Main skill
- `skills/memory-recall/` - Recall skill
- `skills/memory-compress/` - Compression skill
- `skills/memory-rank/` - Ranking skill
- `skills/memory-audit/` - Audit skill
- `skills/memory-init/` - Init skill

## Commands

```bash
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js audit
node bin/memory-context.js init
```

## Validation

```bash
node src/tools/validate-repository.js
```
