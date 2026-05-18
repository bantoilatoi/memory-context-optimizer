---
name: memory-init
description: >
  Initialize .memory-context/ directory with template files.
  Sets up architecture, conventions, decisions, and other memory files.
trigger:
  - init memory
  - create memory
  - setup memory
  - memory init
---

# Memory Init Skill

Initialize `.memory-context/` directory with standard template files.

## Template Files

### architecture.md
Project architecture overview:
- System components
- Data flow
- External dependencies
- Key design patterns

### coding-conventions.md
Style and patterns:
- Naming conventions
- Code organization
- Import order
- Testing patterns
- Documentation requirements

### current-work.md
Active development:
- Current tasks
- Blockers
- Recent decisions
- Next steps

### known-errors.md
Known issues:
- Unfixed bugs
- Workarounds
- Common pitfalls
- Error patterns

### testing-patterns.md
Test conventions:
- Test structure
- Mock strategies
- Fixtures
- Coverage requirements

### deployment.md
Deploy process:
- Environments
- Config management
- Rollback procedures
- Health checks

### decisions.md
Decision log:
- Date, decision, rationale
- Alternatives considered
- Consequences

### observability.md
Monitoring:
- Logging strategy
- Metrics
- Alerts
- Dashboards

### api-contracts.md
API schemas:
- Endpoints
- Request/response formats
- Authentication
- Rate limits

### data-models.md
Data structures:
- Database schemas
- Models
- Relationships
- Migrations

### ci-cd.md
CI/CD pipeline:
- Build process
- Test stages
- Deploy stages
- Environments

### security-notes.md
Security considerations:
- Auth mechanisms
- Secrets management
- Vulnerability notes
- Compliance

### stale-candidates.md
Entries for review:
- Possibly outdated
- Needs verification
- May be deprecated

### recall-index.md
Recall summaries:
- Recent recall summaries
- Context snapshots
- Task context

## Initialization Process

1. Create `.memory-context/` directory
2. Check for existing files (preserve if found)
3. Create missing template files
4. Add placeholder content with guidance
5. Link to repository conventions

## Template Content

Each template file includes:
- Section headers
- Guidance comments
- Example entries
- Empty slots for new content

## Anti-Patterns

- Do NOT overwrite existing memory files
- Do NOT create entries without guidance
- Do NOT copy template verbatim as real memory
- Do NOT initialize in wrong directory
