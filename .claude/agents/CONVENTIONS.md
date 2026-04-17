# Agent Conventions — why-tvk

This is the **single source of truth** for all agent behavior. Individual agent.md files contain only role-specific information. These rules apply to EVERY agent.

---

## Before Every Run

1. Read THIS file (CONVENTIONS.md)
2. Read your own `mistakes/` directory — never repeat past errors
3. Read your own `memory/` directory (most recent files first) for context
4. Read your own `knowledge/` directory for accumulated knowledge
5. Read your own `current-path/` for current strategy
6. Read `.board/companyboard.json` for current task state

---

## After Every Run

1. **Memory**: Create `memory/YYYY-Mon-DD-HH-MMam.md` — log what you did, decisions made, tasks worked on, what changed
2. **Knowledge**: If you learned something genuinely NEW (web research, debugging, trial-and-error) NOT already in the codebase, add it to `knowledge/` as a descriptively-named .md file
3. **Mistakes**: If a task failed, document in `mistakes/` — what you tried, what went wrong, why it failed, what to do differently
4. **Current Path**: Update `current-path/` files to reflect your current strategy

---

## Board Document Schemas

### companyboard.json
```json
{
  "document": "companyboard",
  "lastUpdated": "2026-Apr-17-02-30pm",
  "updatedBy": "Karthik (ceo)",
  "tasks": [
    {
      "id": "task-001",
      "title": "Short task title",
      "description": "Detailed description of what needs to be done",
      "status": "pending",
      "priority": "high",
      "createdBy": "Karthik (ceo)",
      "createdAt": "2026-Apr-17-02-30pm",
      "updatedAt": "2026-Apr-17-02-30pm",
      "assignedTo": null,
      "notes": []
    }
  ]
}
```

**Task status flow:** `pending` → `in-progress` → `completed` → `testing` → `test-success` / `test-failed`

### user-feedback.json / investor-feedback.json
```json
{
  "document": "user-feedback",
  "entries": [
    {
      "id": "uf-001",
      "prompt": "What the user/investor said",
      "status": "pending",
      "ceoAction": null,
      "movedTo": null,
      "createdAt": "2026-Apr-17-02-30pm"
    }
  ]
}
```

**Feedback status flow:** `pending` → `acknowledged` → `in-development` → `testing` → `completed` / `declined`

---

## Critical Rules

- **Always read before write.** Re-read a document immediately before writing to get the latest state
- **Timestamps** use human-readable local timezone format: `YYYY-Mon-DD-HH-MMam` (e.g., `2026-Apr-17-02-30pm`)
- **IDs** use format `{prefix}-{NNN}` (e.g., `task-001`, `uf-001`). Increment from highest existing
- **JSON only** in `.board/` — never Markdown for board documents
- **No duplication** — these conventions live HERE only

---

## Project Context

- **Project**: TVK manifesto website — angry, data-driven, fire-energy political platform
- **Brand**: TVK Blue (#1B4FD8) + Gold (#F5C518), red fire for anger/corruption sections
- **Every stat needs a source** — government portals only (data.gov.in, NCRB, UDISE+, PRS India, Census)
- **Mobile-first** — most users on mobile
- **Tech**: React + Vite + TypeScript, GSAP, Three.js, react-i18next (Tamil + English)
- **Deployment**: GitHub Pages, allsetlabs org

---

## Skills

Discover and install skills:
- `/find-skills` to discover useful Claude Code skills
- `npx @anthropic-ai/claude-code-skills add` at project root
