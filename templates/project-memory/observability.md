# Observability

Logging, metrics, and monitoring.

<!-- Document observability below -->

## Logging

### Log Levels
- ERROR: Application errors
- WARN: Warnings
- INFO: Important events
- DEBUG: Debug info

### Log Format

```json
{
  "timestamp": "ISO8601",
  "level": "INFO",
  "message": "description",
  "context": {}
}
```

### Log Locations
- Development: [location]
- Production: [location]

## Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| [name] | [description] | [value] |

## Dashboards

- [Dashboard name]: [URL/location]

## Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| [name] | [condition] | [action] |

## Tracing

<!-- Document distributed tracing if applicable -->
