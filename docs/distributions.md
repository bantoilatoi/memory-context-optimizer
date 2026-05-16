# Distributions

Available distribution formats for memory-context-optimizer.

## Repository (Source)

- URL: https://github.com/bantoilatoi/memory-context-optimizer
- Branch: master
- Contains: All source files

## GitHub Releases

- Stable releases with tagged versions
- Archive format: ZIP
- Install from release or clone

## Plugin Distribution

Location: `plugins/memory-context-optimizer/`

Contains:
- `plugin.json` - Plugin manifest
- `skills/` - Skill definitions
- `agents/` - Agent definitions
- `commands/` - Command stubs

## Extension Formats

### Gemini Extension

- File: `gemini-extension.json`
- Install: `gemini extensions install .`

### Qwen Extension

- File: `qwen-extension.json`
- Skill: `skills/memory-context-optimizer/`

### Claude Plugin

- File: `.claude-plugin/plugin.json`

## Adapter Distributions

Located in `adapters/`:

- `gemini-cli/` - Gemini CLI adapter
- `qwen-code/` - Qwen Code adapter
- `claude-code/` - Claude Code adapter
- `codex-cli/` - Codex CLI adapter
- `opencode/` - OpenCode adapter
- `generic/` - Generic agent adapter
- `aitmpl/` - AI Template format

## Installation Options

| Method | Command |
|--------|---------|
| Git clone | `git clone https://github.com/bantoilatoi/memory-context-optimizer.git` |
| GitHub release | Download ZIP from releases |
| npm package | Not available (standalone) |
| Extension install | `gemini extensions install .` |
