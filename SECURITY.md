# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it via:
- GitHub Security Advisories
- Direct message to maintainer

## Security Principles

1. **No secrets in context** - All secrets are redacted before context inclusion
2. **No telemetry** - No external data collection
3. **No remote code execution** - Local processing only
4. **No background daemons** - No persistent processes
5. **No external services** - Works fully offline

## Secret Patterns

The following patterns are automatically redacted:

| Pattern Type | Examples |
|--------------|----------|
| API Keys | `sk-...`, `api_key=`, `API_KEY` |
| Tokens | `Bearer ...`, `token=`, `Authorization` |
| Passwords | `password=`, `pwd:`, `passwd` |
| Private Keys | `-----BEGIN`, `-----END RSA` |
| Credentials | `secret=`, `SECRET`, `credential` |

## Redaction Behavior

- Variable names are kept
- File paths are kept
- Function/class names are kept
- Config keys are kept
- Only values are redacted

## Privacy

- No analytics
- No crash reporting
- No usage tracking
- No network calls except optional Gemini CLI extension install
- All processing is local

## Safe Usage

1. Never share raw context containing secrets
2. Use recall summaries instead of full dumps
3. Review memory files before committing
4. Use `.memory-context/` for project memory (not `.ai/memory`)

## Incident Response

1. Acknowledge report within 48 hours
2. Assess severity
3. Develop fix
4. Release update
5. Credit reporter (if desired)
