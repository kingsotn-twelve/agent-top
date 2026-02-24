# Parallel Agent Tree Grouping

**Date:** 2026-02-23
**Status:** Approved

## Problem

When Claude spawns parallel agents via the Task tool, their tool calls appear as a flat, interleaved timeline. There's no visual distinction between sequential tool calls and parallel agent work. Users can't tell which tools belong to which agent.

## Design

### Data Model Changes

**ccnotify.py — tool_event table:**
- Add `cwd TEXT` column (nullable)
- Migration: `ALTER TABLE tool_event ADD COLUMN cwd TEXT`
- In `handle_pre_tool_use()`: store `data.get("cwd", "")` into the new column

No other schema changes. The `agent` table already has `cwd`, `started_at`, `stopped_at`.

### Tool → Agent Matching (render time)

New function `_match_tools_to_agents()` in `agent_top/__init__.py`:

```
Input:  agents = [{agent_id, session_id, cwd, started_at, stopped_at, agent_type}]
        tools  = [{session_id, cwd, created_at, ...}]

For each tool in session:
  1. Find agents with same session_id
  2. Filter to agents whose time window contains tool.created_at
     (started_at <= created_at <= stopped_at, or stopped_at IS NULL for running)
  3. If exactly one match → assign tool to that agent
  4. If multiple matches → prefer cwd match, then most recently started
  5. If no match → tool stays unparented (shown under prompt as today)

Output: dict[agent_id] → [tool_events]
```

### Task → Agent Pairing

Link Task tool_events to their spawned agents by timestamp proximity:
- Same session_id
- Task tool_event.created_at within 5 seconds before agent.started_at
- This gives agent groups their human-readable label (the Task's description field)

### Tree Rendering

Current: `prompt → [tools, agents]` flat interleaved by timestamp.

New: `prompt → [unmatched_tools, agent_groups]` where agent_groups are collapsible.

```
▼ /execute-plan ensure ur using agents...
  │ Create task: spawn.py configure_git_auth    ← unmatched tool
  │ Create task: adapter.py                      ← unmatched tool
  ▼ H1: Fix token in git config  48s            ← agent group (collapsible)
    │ Read spawn.py
    │ Check imports
    │ Apply changes
  ▼ H3: Prompt injection  1m20s                 ← agent group
    │ Read adapter test
    │ Read adapter.py
  ▼ M3+M6+L2: Validation fixes  1m05s           ← agent group
    │ Read webhook.py
    │ Read grafana_client.py
  │ TaskOutput                                   ← unmatched tool
```

### Agent Group Display

- Icon: `◆` (magenta)
- Label: Task tool's description (e.g. "H1: Fix token in git config")
- Duration shown after label
- Collapsed: `▶ H1: Fix token in git config  48s (5)` — child count
- Expanded: `▼ H1: Fix token in git config  48s` — children below

### Indentation

- Prompt: indent 0
- Agent group / unmatched tool: indent 2
- Tools under agent group: indent 4

### Collapse State

- `state["_collapsed_agents"]` — `set()` of agent_id strings
- Default: expanded
- Space/enter toggles collapse
- Same mechanic as prompt collapse

## Constraints

- Claude Code hooks don't include `agent_id` on PreToolUse events (all subagents share parent session_id)
- CWD + timestamp matching is a heuristic — may misattribute if 2+ non-worktree agents overlap in time
- Upgrade path: if Claude Code adds `agent_id` to hook payloads, switch to direct matching
