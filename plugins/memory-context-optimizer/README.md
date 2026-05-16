# Memory Context Optimizer Plugin

Claude Code plugin distribution for memory-context-optimizer.

## Contents

- `skills/` - Agent skills
- `agents/` - Subagent definitions
- `commands/` - Command stubs
- `plugin.json` - Plugin manifest

## Installation

Copy this directory to your project's `.claude/plugins/` directory:

```bash
cp -r plugins/memory-context-optimizer ~/.claude/plugins/
```

Or use the installer:

```bash
node bin/install.js --only claude
```

## Features

- Minimal context loading
- Auto recall at 60% context usage
- Context ranking by relevance
- Secret redaction
- Stale memory detection
- Log compression

## Memory Path

Default: `.memory-context/`

## Usage

Memory context optimizer runs automatically. Commands:

```bash
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js audit
```

## Documentation

See main repository for full documentation:
https://github.com/bantoilatoi/memory-context-optimizer
