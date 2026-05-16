# Windows Installation Guide

## Quick Install

### PowerShell

```powershell
irm https://raw.githubusercontent.com/bantoilatoi/memory-context-optimizer/master/install.ps1 | iex
```

### Manual Install

1. Install Node.js v20+ from https://nodejs.org/
2. Clone or download this repository
3. Run from repository root:

```powershell
node bin/install.js --all
```

## Requirements

- Node.js v20 or higher
- PowerShell (Windows) or Bash (WSL)

## Install Commands

### Full Install

```powershell
node bin/install.js --all
```

### Install for Specific Provider

```powershell
node bin/install.js --only generic
node bin/install.js --only gemini
node bin/install.js --only claude
node bin/install.js --only qwen
```

### Install with Memory Initialization

```powershell
node bin/install.js --all --with-init
```

### Dry Run

```powershell
node bin/install.js --dry-run --all
```

## Verify Installation

```powershell
node src/tools/validate-repository.js
node bin/install.js --list
```

## Uninstall

```powershell
node bin/install.js --uninstall
```

## Troubleshooting

### "Node.js not found"

Install Node.js v20+ from https://nodejs.org/

### "Permission denied"

Run PowerShell as Administrator or use:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Cannot find install.js"

Make sure you're in the repository root directory.
