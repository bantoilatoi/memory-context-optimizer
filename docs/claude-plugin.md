# Claude Plugin

Memory context optimizer for Claude Code.

## Installation

### Using Installer

```bash
node bin/install.js --only claude
```

### Manual Install

```bash
# Copy plugin to project
cp -r .claude-plugin <project>/

# Copy instruction files
cp CLAUDE.md AGENTS.md <project>/
```

## Plugin Manifest

```json
{
  "name": "memory-context-optimizer",
  "description": "Optimize memory, context loading, recall, compression, ranking, and redaction for Claude Code.",
  "author": {
    "name": "bantoilatoi",
    "url": "https://github.com/bantoilatoi"
  }
}
```

## How It Works

1. Claude Code loads `.claude-plugin/plugin.json`
2. Reads `CLAUDE.md` for maintainer guide
3. Reads `AGENTS.md` for context optimization rules
4. Project uses `.memory-context/` for memory

## Files

- `.claude-plugin/plugin.json` - Plugin manifest
- `CLAUDE.md` - Maintainer guide
- `AGENTS.md` - Agent instructions
- `skills/` - Skill definitions
- `agents/` - Agent definitions

## Memory Path

Default: `.memory-context/`
Compatible: `.claude/memory/`

## Commands

```bash
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js audit
node bin/memory-context.js status
```

## Validation

```bash
node src/tools/validate-repository.js
```
