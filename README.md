# Memory Context Optimizer

Universal memory and context optimizer for AI coding agents. Load minimal context, rank relevance, compact at 60%, detect stale memory, and redact secrets.

## What It Does

Optimizes active context usage by:
- **Minimal loading**: Load only what's essential for the current task
- **Smart ranking**: Prioritize files, memory, and context by relevance
- **Auto recall**: Compact context automatically when usage hits 60%
- **Compression**: Reduce verbose logs while preserving exact errors/identifiers
- **Redaction**: Keep secrets safe, never dump sensitive data
- **Audit**: Detect stale, conflicting, or outdated memory entries

## Before / After

**Without MCO** (context bloat):
```
Context: 85,000 tokens
- Full repo dump
- All memory entries
- Stack traces repeated 3x
- Redundant system prompts
```

**With MCO** (optimized):
```
Context: 28,000 tokens
- Current task + criteria
- Ranked file list (top 20)
- Recall summary (compact)
- Active errors only
- Critical facts only
```

## Quick Install

```bash
# Unix/macOS
curl -fsSL https://raw.githubusercontent.com/bantoilatoi/memory-context-optimizer/master/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/bantoilatoi/memory-context-optimizer/master/install.ps1 | iex
```

Or directly with Node.js:
```bash
node bin/install.js --all
```

## Runtime

**Node.js v20+ required.** No pip, no npm dependencies, no Docker, no daemon.

## Daily Use

When working in a project with MCO installed:

```
Analyze my codebase for memory optimization opportunities. Focus on 
stale entries and context bloat patterns.
```

Or manually trigger:
```bash
node bin/memory-context.js recall    # Compact at 60%
node bin/memory-context.js rank     # Rank by relevance
node bin/memory-context.js audit    # Check for stale/conflicts
node bin/memory-context.js compress # Compress logs
```

## Memory Path

Default: `.memory-context/`

Compatible paths:
- `.qwen/memory/`
- `.claude/memory/`
- `.gemini/memory/`
- `.opencode/memory/`
- `.codex/memory/`

> **Note**: `deprecated memory path` is deprecated and not used.

## Auto Recall at 60%

When active context reaches 60% usage:
1. Stop broad loading
2. Build compact recall summary
3. Preserve current task + criteria
4. Keep exact identifiers (file paths, function names, errors)
5. Compress volatile logs
6. Mark stale/conflicting entries
7. Continue from summary

## Supported Agents

| Agent | Support Level |
|-------|---------------|
| Claude Code | Full (.claude-plugin) |
| Gemini CLI | Full (gemini-extension.json) |
| Qwen Code | Full (qwen-extension.json) |
| Codex CLI | Full (AGENTS.md) |
| OpenCode | Full (AGENTS.md) |
| Cursor | Partial (rule files) |
| Windsurf | Partial (rule files) |
| Cline | Partial (rule files) |
| Copilot | Partial (rule files) |

## Validate Installation

```bash
node src/tools/validate-repository.js
node bin/install.js --list
node bin/install.js --dry-run --all
```

## Extension Install Tests

```bash
node bin/install.js --test-install --only generic
node bin/install.js --test-install --only gemini
node bin/install.js --test-install --only qwen
node bin/install.js --test-install --only claude
```

Real Gemini CLI install:
```bash
gemini extensions install .
gemini extensions list
```

## Safety & Privacy

- No telemetry
- No external services (except optional Gemini CLI extension)
- Secrets redacted before context inclusion
- No background processes or daemons

## Project Structure

```
memory-context-optimizer/
  skills/          # Single source of truth for behavior
  agents/          # Subagent role definitions
  commands/        # Command prompt stubs
  plugins/         # Distribution mirrors
  src/             # Internal implementation
  context/         # YAML policies
  prompts/         # Reusable prompt templates
  adapters/        # Provider-specific views
```

See [INSTALL.md](INSTALL.md) for detailed installation per agent.

See [CLAUDE.md](CLAUDE.md) for maintainer documentation.
