# Data Models

Database schemas and data structures.

<!-- Document models below -->

## Database

- Type: [PostgreSQL/MySQL/MongoDB/etc]
- Connection: [connection string/host]

## Tables/Collections

### users

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| name | VARCHAR(100) | |
| created_at | TIMESTAMP | DEFAULT NOW() |

### posts

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| user_id | UUID | FOREIGN KEY |
| title | VARCHAR(255) | NOT NULL |
| content | TEXT | |
| created_at | TIMESTAMP | DEFAULT NOW() |

## Relationships

- users 1:N posts (one user has many posts)

## Migrations

- Location: [path]
- Tool: [tool name]
