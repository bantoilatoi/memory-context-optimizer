# API Contracts

API schemas and specifications.

<!-- Document APIs below -->

## Authentication

- Method: [Bearer/JWT/etc]
- Header: `Authorization: Bearer <token>`

## Endpoints

### GET /api/resource

**Description:** Get resource

**Request:**
```json
{
  "id": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string"
}
```

**Errors:**
- 400: Invalid request
- 404: Not found
- 500: Server error

---

### POST /api/resource

**Description:** Create resource

**Request:**
```json
{
  "name": "string"
}
```

**Response:** 201 Created

## Rate Limits

- Limit: [N requests per time]
- Headers: [X-RateLimit-*]
