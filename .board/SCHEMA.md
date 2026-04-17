# Board Document Schemas

## companyboard.json

Main task board. All agents read this before each run.

| Field | Type | Description |
|-------|------|-------------|
| document | string | Always `"companyboard"` |
| lastUpdated | string | Human timestamp `YYYY-Mon-DD-HH-MMam` |
| updatedBy | string | Agent name + role e.g. `"Karthik (ceo)"` |
| tasks | array | List of task objects |

### Task Object

| Field | Type | Values |
|-------|------|--------|
| id | string | `task-001`, `task-002`, ... |
| title | string | Short descriptive title |
| description | string | Full task details |
| status | string | `pending` → `in-progress` → `completed` → `testing` → `test-success` / `test-failed` |
| priority | string | `high`, `medium`, `low` |
| createdBy | string | Agent name + role |
| createdAt | string | Human timestamp |
| updatedAt | string | Human timestamp |
| assignedTo | string/null | Agent name + role, or null |
| notes | array | String notes from agents |

---

## user-feedback.json

User bugs, opinions, and feature requests.

| Field | Type | Description |
|-------|------|-------------|
| document | string | Always `"user-feedback"` |
| entries | array | List of feedback entries |

### Entry Object

| Field | Type | Values |
|-------|------|--------|
| id | string | `uf-001`, `uf-002`, ... |
| prompt | string | Verbatim user feedback |
| status | string | `pending` → `acknowledged` → `in-development` → `testing` → `completed` / `declined` |
| ceoAction | string/null | What CEO decided to do |
| movedTo | string/null | Task ID if converted to a task |
| createdAt | string | Human timestamp |

---

## investor-feedback.json

Investor priorities and strategic feedback.

| Field | Type | Description |
|-------|------|-------------|
| document | string | Always `"investor-feedback"` |
| entries | array | List of feedback entries |

Same entry schema as user-feedback but with `if-` prefix IDs.

---

## Adding New Documents

CEO can create new `.board/*.json` files for agent-to-agent communication. Document the schema here and reference in relevant `agent.md` files.
