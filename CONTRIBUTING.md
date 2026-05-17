# Contributing to Memory Context Optimizer

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies: `node --version` (v20+ required)
4. Run validation: `node src/tools/validate-repository.js`

## Source of Truth

| Directory | Purpose |
|-----------|---------|
| `skills/` | Behavior definitions |
| `agents/` | Subagent roles |
| `commands/` | Command stubs |
| `context/` | YAML policies |

## Making Changes

1. Edit source files (skills, agents, commands, context)
2. Run validation: `node src/tools/validate-repository.js`
3. Sync to plugin mirror: `node src/tools/sync-plugin.js`
4. Run tests: `node --test tests/*.test.js`
5. Commit with clear message

## Adding a Skill

1. Create `skills/<skill-name>/SKILL.md` with frontmatter
2. Create `skills/<skill-name>/README.md`
3. Create `commands/<skill-name>.toml`
4. Validate and sync

## Adding an Agent

1. Create `agents/<agent-name>.md`
2. Include: role, responsibilities, output format
3. Add to adapters if needed

## Validation Checklist

- [ ] All JS files pass syntax check
- [ ] All TOML files parse correctly
- [ ] All YAML files parse correctly
- [ ] No `deprecated memory path` references
- [ ] No Python runtime references
- [ ] Node engine >= 20 specified
- [ ] Plugin mirror synced
- [ ] Tests pass

## Commit Message Format

```
<type>(<scope>): <description>

Types: feat, fix, refactor, docs, test, chore
```

Example:
```
feat(skills): add memory-audit skill
docs(readme): update install instructions
test(validation): add deprecated memory path detection test
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure validation passes
4. Request review from maintainers
