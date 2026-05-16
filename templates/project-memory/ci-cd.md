# CI/CD

Continuous integration and deployment pipeline.

<!-- Document CI/CD below -->

## Pipeline

### Stages

1. **Build**
   - Compile/transpile code
   - Install dependencies

2. **Test**
   - Unit tests
   - Integration tests
   - Coverage check

3. **Deploy**
   - Staging deploy
   - Production deploy (manual approval)

## CI Provider

- Provider: [GitHub Actions/GitLab CI/Jenkins/etc]
- Config: [.github/workflows/ci.yml]

## Secrets

- Stored in: [Vault/SSM/GitHub Secrets/etc]
- Rotation: [frequency]

## Environments

| Environment | Branch | Auto-deploy |
|-------------|--------|-------------|
| Development | develop | Yes |
| Staging | staging | Yes |
| Production | main | Manual |

## Quality Gates

- Coverage: [N]%
- Linting: Must pass
- Tests: All must pass
