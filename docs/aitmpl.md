# AI Template (aitmpl)

Using memory-context-optimizer with AI Template format.

## Overview

AI Template (aitmpl) is a format for defining AI agent components. This adapter provides memory-context-optimizer in aitmpl format.

## Structure

```
adapters/aitmpl/
├── README.md
├── components/
│   ├── agents/
│   │   └── development-tools/
│   │       ├── memory-curator.md
│   │       ├── context-ranker.md
│   │       └── context-recaller.md
│   ├── commands/
│   │   ├── analysis/
│   │   │   ├── memory-recall.md
│   │   │   ├── memory-rank.md
│   │   │   ├── memory-compress.md
│   │   │   └── memory-audit.md
│   │   └── project-management/
│   │       └── memory-init.md
│   └── skills/
│       └── development/
│           └── memory-context-optimizer/
│               ├── SKILL.md
│               └── references/
│                   ├── context-policy.md
│                   ├── recall-policy.md
│                   └── safety-policy.md
└── mcps/
    └── memory-context-optimizer-static-spec.json
```

## Installation

Copy the `components/` directory to your AI Template configuration.

## Components

### Agents

Predefined agent roles:
- memory-curator
- context-ranker
- context-recaller

### Commands

Predefined commands:
- memory-recall
- memory-rank
- memory-compress
- memory-audit
- memory-init

### Skills

Main skill with policy references.

## MCP Integration

The `mcps/` directory contains static MCP specifications.

## Usage

Reference components in your AI Template configuration:

```yaml
agents:
  - memory-curator

commands:
  - memory-recall
  - memory-rank
```

## Validation

```bash
node src/tools/validate-repository.js
```
