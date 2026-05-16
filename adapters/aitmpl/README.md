# AI Template Adapter

Adapter for AI Template format.

## Overview

This adapter provides memory-context-optimizer components in AI Template format for use with compatible AI coding agents.

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

## Usage

Copy components to your AI Template configuration directory.

## Components

### Commands

Memory commands as AI Template command definitions.

### Agents

Subagent definitions in AI Template format.

### Skills

Main skill with references to policies.

## Static MCP Spec

JSON schema for static MCP integration.
