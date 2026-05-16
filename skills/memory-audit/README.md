# Memory Audit Skill

Detect stale, conflicting, or outdated memory entries.

## Categories

| Category | Detection |
|----------|-----------|
| Stale | References deleted files, outdated versions |
| Conflicting | Multiple entries differ, code contradicts memory |
| Sensitive | Contains secrets or PII |
| Orphan | No references from code |

## Flag Format

```markdown
<!-- STALE: reason -->
<!-- CONFLICTING: contradicts entry in X -->
```

## Audit Checklist

- [ ] File structure intact
- [ ] Entries have timestamps
- [ ] Recent decisions captured
- [ ] No contradictions
- [ ] No secrets stored

## Usage

```bash
memory-audit
```
