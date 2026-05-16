# Troubleshooting

Common issues and solutions.

## Installation Issues

### "Node.js version too old"

**Problem:** Node.js version < 20

**Solution:**
```bash
# Check version
node --version

# Install Node.js 20+
# macOS/Linux
nvm install 20
nvm use 20

# Windows: Download from https://nodejs.org/
```

### "Gemini CLI not found"

**Problem:** Gemini CLI not installed

**Solution:**
- Install Gemini CLI, or
- Use `--test-install` mode which validates manifests without real install

### "Permission denied"

**Problem:** Insufficient permissions

**Solution:**
```bash
# Unix/macOS
chmod +x install.sh bin/*.js

# Windows (PowerShell as Admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Cannot find install.js"

**Problem:** Not in repository root

**Solution:**
```bash
# Verify you're in the right directory
pwd
ls bin/install.js
```

## Memory Issues

### ".memory-context/ not found"

**Problem:** Memory directory not initialized

**Solution:**
```bash
node bin/install.js --with-init
# or
node bin/memory-context.js init
```

### "Memory not loading"

**Problem:** Wrong memory path

**Solution:**
- Use `.memory-context/` (default)
- Check compatible paths: `.qwen/memory/`, `.claude/memory/`, etc.
- **Never use**: `.ai/memory`

### "Stale entries detected"

**Problem:** Memory contains outdated information

**Solution:**
```bash
node bin/memory-context.js audit
```

Review flagged entries and update or remove them.

## Context Issues

### "Context too large"

**Problem:** Loading too much context

**Solution:**
1. Trigger recall: `node bin/memory-context.js recall`
2. Use ranking: `node bin/memory-context.js rank`
3. Load only critical tier

### "Secrets not redacted"

**Problem:** Sensitive values in context

**Solution:**
- Ensure no secrets in memory files
- Use pattern redactors for code:
  - API keys: `sk-...`
  - Tokens: `Bearer ...`
  - Passwords: `password=`

## Validation Issues

### "Validation failed"

**Problem:** Repository structure issues

**Solution:**
```bash
node src/tools/validate-repository.js
node src/tools/validate-repository.js --strict
```

### ".ai/memory detected"

**Problem:** Forbidden memory path used

**Solution:**
- Remove all `.ai/memory` references
- Use `.memory-context/` instead

### "Python in JavaScript files"

**Problem:** Python commands in JS files

**Solution:**
- Remove Python references from JS files
- Use Node.js for all scripts

## Still Stuck?

1. Run validation: `node src/tools/validate-repository.js --strict`
2. Check GitHub issues
3. Create new issue with validation output
