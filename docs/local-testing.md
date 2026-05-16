# Local Testing

Test memory-context-optimizer locally before publishing.

## Test Commands

### List Providers

```bash
node bin/install.js --list
```

### Dry Run

```bash
node bin/install.js --dry-run --all
```

### Test Install (Validation Only)

```bash
node bin/install.js --test-install --only generic
node bin/install.js --test-install --only gemini
node bin/install.js --test-install --only qwen
node bin/install.js --test-install --only claude
```

### Real Local Install

```bash
# Test generic install
node bin/install.js --only generic --with-init

# Test Gemini extension
gemini extensions install .
```

## Validation

### Run All Validations

```bash
node src/tools/validate-repository.js
node src/tools/validate-repository.js --strict
```

### Syntax Check

```bash
node --check bin/*.js
node --check src/**/*.js
```

### Test Suite

```bash
node --test tests/*.test.js
```

## Test Memory Operations

### Initialize Memory

```bash
node bin/memory-context.js init
```

### Test Recall

```bash
node bin/memory-context.js recall
```

### Test Ranking

```bash
node bin/memory-context.js rank
```

### Test Audit

```bash
node bin/memory-context.js audit
```

### Test Status

```bash
node bin/memory-context.js status
```

## GitHub Actions Test

The CI workflow runs:

```yaml
- name: Validate
  run: node src/tools/validate-repository.js --strict

- name: Syntax Check
  run: node --check bin/*.js src/**/*.js

- name: Tests
  run: node --test tests/*.test.js

- name: Install Test
  run: |
    node bin/install.js --test-install --only generic
    node bin/install.js --test-install --only gemini
    node bin/install.js --test-install --only qwen
    node bin/install.js --test-install --only claude
```

## Expected Results

- All syntax checks pass
- All tests pass
- Validation reports no errors
- Install tests report success
