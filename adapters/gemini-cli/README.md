# Gemini CLI Adapter

Adapter for Gemini CLI integration.

## Overview

This adapter provides memory-context-optimizer integration for Gemini CLI.

## Installation

```bash
gemini extensions install .
```

Or install from GitHub:
```bash
gemini extensions install https://github.com/bantoilatoi/memory-context-optimizer
```

## Files

- `gemini-extension.json` - Extension manifest
- `GEMINI.md` - Compact instructions for Gemini CLI

## Usage

When Gemini CLI starts a session:
1. Read `gemini-extension.json` for contextFileName
2. Load `GEMINI.md` for compact instructions
3. Use `.memory-context/` for project memory

## Commands

```bash
# Memory operations
node bin/memory-context.js recall
node bin/memory-context.js rank
node bin/memory-context.js audit
node bin/memory-context.js compress
```

## Validation

```bash
node src/tools/validate-repository.js
```
