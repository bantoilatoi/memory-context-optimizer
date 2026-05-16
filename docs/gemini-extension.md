# Gemini Extension

Memory context optimizer for Gemini CLI.

## Installation

### Local Install

```bash
cd /path/to/project
gemini extensions install .
```

### GitHub Install

```bash
gemini extensions install https://github.com/bantoilatoi/memory-context-optimizer
```

### Using Installer

```bash
node bin/install.js --only gemini
```

## Extension Manifest

```json
{
  "name": "memory-context-optimizer",
  "description": "Universal memory and context optimizer for AI coding agents.",
  "version": "0.1.0",
  "contextFileName": "GEMINI.md"
}
```

## How It Works

1. Gemini CLI loads `gemini-extension.json`
2. Reads `contextFileName` (GEMINI.md)
3. GEMINI.md provides compact context optimization rules
4. Project uses `.memory-context/` for memory

## Files

- `gemini-extension.json` - Extension manifest
- `GEMINI.md` - Compact instructions
- `skills/` - Skill definitions
- `agents/` - Agent definitions
- `commands/` - Command stubs

## Commands

```bash
# Memory operations
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js audit
node bin/memory-context.js compress
```

## Gemini CLI Extension Commands

```bash
# List extensions
gemini extensions list

# Update extension
gemini extensions update memory-context-optimizer

# Uninstall
gemini extensions uninstall memory-context-optimizer
```

## Validation

```bash
node src/tools/validate-repository.js
```
