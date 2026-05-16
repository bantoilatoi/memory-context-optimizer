# Agent Matrix

Support levels for different AI coding agents.

## Support Matrix

| Agent | Full | Partial | Basic |
|-------|------|---------|-------|
| Claude Code | ✓ | | |
| Gemini CLI | ✓ | | |
| Qwen Code | ✓ | | |
| Codex CLI | ✓ | | |
| OpenCode | ✓ | | |
| Cursor | | ✓ | |
| Windsurf | | ✓ | |
| Cline | | ✓ | |
| Copilot | | ✓ | |

## Full Support

Agents with full support have:
- Native extension/plugin manifests
- Dedicated adapter in `adapters/`
- Optimized instructions for the agent

### Claude Code

- Plugin: `.claude-plugin/plugin.json`
- Files: `CLAUDE.md`, `AGENTS.md`
- Install: `node bin/install.js --only claude`

### Gemini CLI

- Extension: `gemini-extension.json`
- Install: `gemini extensions install .`

### Qwen Code

- Extension: `qwen-extension.json`
- Skill: `skills/memory-context-optimizer/`
- Install: `node bin/install.js --only qwen`

### Codex CLI

- Agent: `.codex/AGENTS.md`
- Install: `node bin/install.js --only codex`

### OpenCode

- Agent: `AGENTS.md`, `GEMINI.md`
- Install: `node bin/install.js --only opencode`

## Partial Support

Agents with partial support have:
- Generic instruction files
- Rule file compatibility
- Memory path support

### Cursor

- Rule file: `.cursorrules`
- Memory: `.memory-context/`
- Install: `node bin/install.js --only cursor --with-init`

### Windsurf

- Rule file: `.windsurfrules`
- Memory: `.memory-context/`
- Install: `node bin/install.js --only windsurf --with-init`

### Cline

- Instructions: `AGENTS.md`
- Memory: `.memory-context/`
- Install: `node bin/install.js --only cline`

### Copilot

- Instructions: `AGENTS.md`
- Memory: `.memory-context/`
- Install: `node bin/install.js --only copilot`

## Generic Support

All other agents can use:
- `AGENTS.md` for generic instructions
- `GEMINI.md` for compact rules
- `.memory-context/` for project memory

Install: `node bin/install.js --only generic --with-init`
