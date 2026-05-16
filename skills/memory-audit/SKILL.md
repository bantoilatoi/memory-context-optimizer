---
name: memory-audit
description: >
  Audit memory files for stale, conflicting, or outdated entries.
  Flag problems, suggest cleanup, maintain memory health.
trigger:
  - audit
  - stale
  - memory health
  - check memory
---

# Memory Audit Skill

Detect stale, conflicting, or outdated memory entries.

## Audit Categories

### Stale Entries

Mark as stale when:
- References deleted files
- Mentions non-existent functions
- Contains outdated versions
- Contradicted by current code
- Older than 90 days without review

Flag format:
```markdown
<!-- STALE: references deleted file src/old.js, remove or update -->
```

### Conflicting Entries

Mark as conflicting when:
- Multiple entries describe same thing differently
- New code contradicts memory
- Recent decision overrides old decision
- Team member feedback contradicts entry

Flag format:
```markdown
<!-- CONFLICTING: contradicts decision in decisions.md:2024-03-15 -->
```

### Sensitive Entries

Flag for review if contains:
- Real API keys or tokens
- Actual passwords or secrets
- PII or user data
- Internal system details

### Orphan Entries

Entries with no references:
- No files import/use this pattern
- No documentation mentions this
- No recent commits touch related code

## Audit Checklist

### File Structure
- [ ] All expected files exist
- [ ] No duplicate entries
- [ ] Proper frontmatter format
- [ ] Consistent heading structure

### Content Quality
- [ ] Entries have timestamps
- [ ] Entries cite sources/evidence
- [ ] Entries have clear scope
- [ ] No contradictory information

### Freshness
- [ ] Entries reviewed within 90 days
- [ ] Old entries flagged or updated
- [ ] Recent decisions documented

### Completeness
- [ ] Architecture documented
- [ ] Key decisions captured with rationale
- [ ] Known issues listed
- [ ] Conventions documented

## Audit Output Format

```markdown
# Memory Audit Report

## Summary
- Total entries: N
- Stale: N (flagged)
- Conflicting: N (flagged)
- Missing: N
- Healthy: N

## Stale Entries
| Entry | Reason | Recommendation |
|-------|--------|----------------|
| architecture.md | references deleted auth service | Update or remove |
| decisions.md | v1.0 decision outdated | Add v2.0 override |

## Conflicting Entries
| Entry | Conflict | Resolution |
|-------|----------|------------|
| known-errors.md | says bug fixed, code still shows bug | Verify fix or reopen |

## Missing Entries
- No entry for new microservice X
- No entry for recent refactoring decision

## Recommendations
1. Update architecture.md to remove auth service reference
2. Verify bug fix in known-errors.md
3. Add entry for microservice X architecture
```

## Cleanup Actions

### Remove
- Entries referencing deleted code
- Duplicate information
- Temporary debugging notes
- Outdated version references

### Update
- Entries with new evidence
- Architecture changes
- New conventions
- Bug fix confirmations

### Consolidate
- Multiple entries on same topic
- Overlapping coverage
- Related but scattered information

### Preserve
- Decision rationale
- Architecture decisions
- Non-obvious patterns
- Domain knowledge

## Anti-Patterns

- Do NOT delete entries without flagging
- Do NOT ignore conflicting information
- Do NOT trust memory over code
- Do NOT keep entries without evidence
- Do NOT skip stale detection
