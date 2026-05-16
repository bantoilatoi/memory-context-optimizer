# Installation Guide

## One-Line Install

### Unix/macOS
```bash
curl -fsSL https://raw.githubusercontent.com/bantoilatoi/memory-context-optimizer/master/install.sh | bash
```

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/bantoilatoi/memory-context-optimizer/master/install.ps1 | iex
```

## Direct Node.js Install

Requires Node.js v20+.

```bash
# Full install for all detected providers
node bin/install.js --all

# Dry run to see what would be installed
node bin/install.js --dry-run --all

# Install with memory initialization
node bin/install.js --all --with-init

# List available providers
node bin/install.js --list
```

## Install Test Commands

```bash
# Test generic adapter install
node bin/install.js --test-install --only generic

# Test Gemini extension
node bin/install.js --test-install --only gemini

# Test Qwen Code
node bin/install.js --test-install --only qwen

# Test Claude Code
node bin/install.js --test-install --only claude
```

## Real Gemini CLI Extension Install

If Gemini CLI is installed:

```bash
# Local install from repo
gemini extensions install .

# GitHub install
gemini extensions install https://github.com/bantoilatoi/memory-context-optimizer

# List installed extensions
gemini extensions list

# Update extension
gemini extensions update memory-context-optimizer

# Uninstall
gemini extensions uninstall memory-context-optimizer
```

## Per-Agent Install Matrix

| Agent | Method | Command |
|-------|--------|---------|
| Gemini CLI | Extension install | `gemini extensions install .` |
| Claude Code | Plugin copy | `node bin/install.js --only claude` |
| Qwen Code | Skill copy | `node bin/install.js --only qwen` |
| Codex CLI | AGENTS.md copy | `node bin/install.js --only codex` |
| OpenCode | AGENTS.md copy | `node bin/install.js --only opencode` |
| Cursor | Rule files | `node bin/install.js --only cursor --with-init` |
| Windsurf | Rule files | `node bin/install.js --only windsurf --with-init` |
| Cline | Rule files | `node bin/install.js --only cline --with-init` |
| Copilot | Rule files | `node bin/install.js --only copilot --with-init` |
| Generic | Rule files | `node bin/install.js --only generic --with-init` |

## Manual Install

### Gemini CLI
1. Clone or copy this repo
2. Run `gemini extensions install <path-to-repo>`
3. Or copy `gemini-extension.json` to your project root

### Claude Code
1. Copy `.claude-plugin/plugin.json` to your project root
2. Copy `CLAUDE.md` to your project root (or merge content)
3. Copy `AGENTS.md` to your project root

### Qwen Code
1. Copy `qwen-extension.json` to your project root
2. Copy `skills/memory-context-optimizer/` to `.qwen/skills/`

### Generic Agent
1. Copy `AGENTS.md` to your project root
2. Copy `GEMINI.md` to your project root
3. Create `.memory-context/` directory with memory files

## Memory Initialization

Initialize default memory structure:

```bash
node bin/install.js --with-init
```

This creates:
```
.memory-context/
  architecture.md
  coding-conventions.md
  current-work.md
  known-errors.md
  testing-patterns.md
  deployment.md
  decisions.md
  observability.md
  api-contracts.md
  data-models.md
  ci-cd.md
  security-notes.md
  stale-candidates.md
  recall-index.md
```

## Always-On Mode

Install as persistent rule files that load on every session:

```bash
node bin/install.js --all --with-init
```

## Verify Installation

```bash
# Run repository validation
node src/tools/validate-repository.js

# Check install list
node bin/install.js --list

# Dry run
node bin/install.js --dry-run --all
```

## Uninstall

```bash
# Remove installed files (interactive)
node bin/install.js --uninstall

# Or manually remove:
# - .memory-context/ (if created)
# - AGENTS.md, GEMINI.md, CLAUDE.md (if installed)
# - .qwen/skills/memory-context-optimizer/ (if installed)
# - .claude-plugin/ (if installed)
```

## Troubleshooting

### "Gemini CLI not found"
Gemini CLI is not installed. Install from https://github.com/google/gemini-cli or use `--test-install` mode which validates manifests without real install.

### "Node.js version error"
MCO requires Node.js v20+. Check version:
```bash
node --version
```

Update Node.js: https://nodejs.org/

### "Permission denied"
Run with appropriate permissions:
```bash
# Unix/macOS
chmod +x install.sh
chmod +x bin/*.js
```

### "Nothing to install"
Provider detection failed. Use explicit provider:
```bash
node bin/install.js --only generic
```

## Privacy

- No telemetry
- No external data collection
- No background processes
- All processing is local
- Works offline

## Runtime Requirements

- Node.js v20+
- No pip, Python, Docker
- No npm install required
- No database or vector store
- No MCP server required
