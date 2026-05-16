# macOS/Linux Installation Guide

## Quick Install

### Shell

```bash
curl -fsSL https://raw.githubusercontent.com/bantoilatoi/memory-context-optimizer/master/install.sh | bash
```

### Manual Install

1. Install Node.js v20+ (via nvm or package manager)
2. Clone or download this repository
3. Run from repository root:

```bash
chmod +x install.sh bin/*.js
./install.sh --all
```

Or:

```bash
node bin/install.js --all
```

## Requirements

- Node.js v20 or higher
- Bash or Zsh shell

## Install Commands

### Full Install

```bash
node bin/install.js --all
```

### Install for Specific Provider

```bash
node bin/install.js --only generic
node bin/install.js --only gemini
node bin/install.js --only claude
node bin/install.js --only qwen
```

### Install with Memory Initialization

```bash
node bin/install.js --all --with-init
```

### Dry Run

```bash
node bin/install.js --dry-run --all
```

## Verify Installation

```bash
node src/tools/validate-repository.js
node bin/install.js --list
```

## Uninstall

```bash
node bin/install.js --uninstall
```

## Troubleshooting

### "Node.js not found"

Install Node.js via nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### "Permission denied"

```bash
chmod +x install.sh bin/*.js
```

### "Cannot find install.js"

Make sure you're in the repository root directory.
