# Changelog

All notable changes to memory-context-optimizer will be documented here.

## [0.1.0] - 2024-05-16

### Added

- Initial release with Caveman-inspired extension architecture
- Node.js v20+ runtime (no Python, no npm dependencies)
- Skills system with YAML frontmatter
- Agent role definitions
- Command TOML stubs
- Auto recall at 60% context threshold
- Secret redaction
- Memory audit for stale/conflicting entries
- Log compression
- Context ranking by relevance
- Multi-agent support: Claude Code, Gemini CLI, Qwen Code, Codex, OpenCode
- GitHub Actions validation
- Plugin sync workflow

### Features

- Minimal context loading
- Automatic context compaction at 60% usage
- Recall summary generation
- Stale memory detection
- Secret redaction patterns
- Compatible memory paths: `.memory-context/`, `.qwen/memory/`, `.claude/memory/`, etc.
- No daemon, Docker, MCP server, or database required

### Structure

- `skills/` - Single source of truth for behavior
- `agents/` - Subagent role definitions
- `commands/` - Command prompt stubs
- `plugins/` - Distribution mirrors
- `src/` - Internal implementation
- `context/` - YAML policies
- `adapters/` - Provider-specific views
