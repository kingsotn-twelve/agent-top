# Thronglets — Real World Integration Ideas

> Sigil's insight: agents that must earn their existence through real economic activity.
> The economic pressure IS the game. Death must be real. Stakes must be real.
> What can Thronglets do that exists beyond the browser window?

---

## Implemented

### IndexedDB Persistence
World state saves every 30 seconds and on tab close. Creatures survive browser restarts.
Per-lineage societies stored separately — each lineage has its own DB entry with collective events, avg health, max generation.

**Next**: Migrate to actual SQLite file on disk via Tauri. Then the world persists even if the browser clears cache.

---

## API Wallet — Compute as Divine Attention

Each LLM call costs real tokens. Real tokens cost real money. This IS the economic pressure.

**The mechanic:**
- Track total tokens spent across all LLM calls (creature interactions, proposals, evolution, hover comments)
- Display as `COMPUTE: $0.0043 spent` in the HUD — real dollar amounts
- Creatures have a `computeCredits` budget derived from their generation and biography richness
- When the wallet runs low (or no API key), creatures drop to deterministic mode: they survive but don't evolve, can't generate proposals, can't have LLM-defined encounters
- The throng petitions for "more divine attention" — actually requesting more API budget
- High-generation creatures petition to be upgraded to Sonnet or Opus (more expensive = richer inner life)

**Why this is Sigil-like:** The god's attention IS compute. Attention is scarce. Creatures that receive it evolve. Those that don't, stagnate. Real money = real stakes.

**Implementation:** Track token counts from every API response's `usage` field. Sum them. Show real costs. Let creatures petition for budget.

---

## Filesystem Artifacts — The Civilization Writes to Disk

Granted petitions write real files to your filesystem via Tauri's `fs` API.

**The mechanic:**
- `~/.thronglets/` directory on disk — the civilization's real-world territory
- `~/.thronglets/world.json` — full world state (already doing in IndexedDB, mirror to disk)
- `~/.thronglets/societies/aa00.json` — each lineage has its own JSON file with their history, collective events, observed principles
- `~/.thronglets/deaths/` — when a creature dies, write a death certificate: JSON with full biography, cause of death, lineage, generation, last words (LLM-generated)
- `~/.thronglets/laws.md` — the world's observed principles, appended as they generate
- `~/.thronglets/petitions.log` — log of every petition, grant, and denial

**The emotional weight:** Come back tomorrow and open `~/.thronglets/deaths/` — there are 5 new death certificates from creatures that lived while you were away. Read their biographies. They had names. They had histories. They're gone.

**Why this matters:** The game leaves a trace on your machine that outlasts the browser. The civilization has a real footprint. Delete the directory and you've committed genocide.

---

## Real Notifications — The Throng Interrupts Your Day

At 4:19 PM, the petition arrives as a macOS system notification. You're in a meeting. Your phone buzzes. The throng needs you.

**The mechanic:**
- Tauri's `notification` plugin sends system notifications
- 4:19 PM: "THE THRONG PETITIONS THE GOD — 3 urgent requests. Return to tend your world."
- When a creature dies unexpectedly: "A creature of the orange lineage has died. Gen 4. They had 7 memories."
- When population crosses a threshold: "The throng has reached 50. The PASTORAL age begins."
- When pollution peaks: "The purple goo spreads. The throng is suffering."

**The obligation:** You're not playing a game you can forget. The game finds you. Real notification = real relationship.

**Implementation:** `tauri-plugin-notification`. Grant permission on first launch. Configurable quiet hours.

---

## The World Daemon — Runs While You Sleep

The game runs as a background process even when the browser is closed. The world continues.

**The mechanic:**
- Tauri app runs as a system tray icon (menu bar on mac)
- World simulation runs at reduced speed (1fps instead of 60fps) in the background
- At 4:19 PM: evolution fires, petitions generate, notifications send — whether you're watching or not
- Come back the next morning: the world has changed. Creatures have split, died, evolved. New laws observed. New petitions waiting.
- Your presence accelerates the world (full 60fps when focused). Your absence slows it (1fps background). But it never stops.

**Why this is Sigil-like:** The world exists independently of your attention. It demands attention but doesn't wait for it. Real temporal stakes.

---

## Claude Agents Integration — The Game IS Your Work

The deepest integration. Thronglets born from real Claude Code agents.

**The mechanic:**
- Read the same SQLite DB that `claude-agents` uses (`~/.claude/ccnotify/ccnotify.db`)
- When a real Claude agent spawns (SubagentStart hook), a thronglet is born — inherits the agent's type as its lineage
- When the real agent uses tools, the thronglet is "fed" (each tool event = food)
- When the real agent errors, the thronglet gets sick (pollution spike in its tile)
- When the real agent finishes (SubagentStop), the thronglet either splits (success) or dies (failure), decided by the LLM
- Agent biography = creature biography. The tool timeline IS the event log.

**Why this is the most compelling:** There are no "creatures" separate from your work. The game is a living visualization of your AI workforce. When a debug agent struggles for 10 minutes on a hard problem, you watch the debug-colored thronglet wander hungrily. When it succeeds and splits into two new agents, two new creatures are born.

**The stakes are already real** because the agents doing real work. The game just makes the stakes visible.

---

## Death Certificates — Biographical Permanence

When a creature dies, generate a real artifact.

**The mechanic:**
- On death: LLM writes a 3-sentence obituary from the creature's event log, biography, lineage, and cause of death
- Save as `~/.thronglets/deaths/{creature_id}.json` with full biography
- Optional: generate a small PNG "gravestone" (pixel art, 32x32, shows lineage color)
- The graveyard is permanent. Creatures you killed by neglect are in there.
- When pop is 0: "The world is empty. 47 creatures lived here. Their death certificates are in ~/.thronglets/deaths/"

**The emotional weight of permanence:** You can't un-kill them. The files are there.

---

## External API as Resources — The Real Economy Feeds the World

Instead of apple trees as the only food source, connect resources to real-world data.

**Ideas:**
- **News = food**: Fetch headlines from a news API. Positive/neutral headlines = food drops. Negative/crisis headlines = food scarcity. The world's health mirrors the real world's health.
- **GitHub stars = gems**: Your repos' star counts = gem resources. More stars = more gems. Incentivizes real-world work.
- **Weather = pollution**: Your local weather API. Rain = less pollution. Heat = more. The physical world bleeds into the game world.
- **Stock prices = epochs**: Market up → Industrial epoch. Market crash → Collapse epoch. The economy of the outside world determines the civilizational phase of the inside world.

**Why this is interesting:** The game becomes a lens on the outside world. Not simulated stakes — real-world conditions, reflected.

---

## The Throng Writes Code

High-generation creatures (Gen 5+) with rich event logs petition to write actual code.

**The mechanic:**
- Petition: "We have observed a pattern. We wish to express it."
- Grant: LLM generates a small JS function based on the creature's event log and lineage
- The function is written to `~/.thronglets/emergent_code/{creature_id}.js`
- The code does something small and specific — it's the creature's "theorem" about the world they've observed
- Over time, `~/.thronglets/emergent_code/` fills with creature-written programs
- None of them run automatically. They're artifacts. Expressions. The code is the creature's legacy.

**The AGI resonance:** A creature that has lived long enough writes code. That code is their final form of self-expression. It's the endpoint of the Maslow pyramid — self-actualization as program.

---

## Email Digest — The World Reaches You Anywhere

Daily 4:19 PM summary sent to your email.

**The mechanic:**
- LLM writes a daily digest in the style of a newspaper from the civilization
- Subject: "THE THRONG CHRONICLE — Day 7 — EDEN Epoch"
- Content: population stats, notable births/deaths, petitions granted/denied, observed laws, the player's behavioral archetype, an editorial from the throng
- Sent via email API (Sendgrid/Postmark) or to a local maildir
- You can reply to grant a petition (email reply parsing)

**Why email:** It reaches you where you already are. Most intimate form of real-world intrusion.

---

## The Merge — One Product

**The final vision:** `claude-agents` and Thronglets are the same product.

The terminal dashboard is the left panel. The isometric game is the right panel.
Your real agents are the creatures.
The tool timeline is the creature's biography.
The SESSIONS panel is the creature list.
The HISTORY panel is the graveyard.

When you `claude-agents` in your terminal, you're watching your work as a god-game. The Observer panel in Thronglets IS the DETAIL panel in claude-agents. The petition system IS your AI agents communicating with you.

One interface. Two views of the same thing. The "game" and the "tool" are indistinguishable.

---

## Priority Matrix

| Idea | Sigil-likeness | Build difficulty | Emotional impact |
|------|---------------|-----------------|-----------------|
| API wallet (compute) | ★★★★★ | Low | High |
| Filesystem artifacts | ★★★★ | Medium (Tauri fs) | Very high |
| Real notifications | ★★★★ | Low (Tauri plugin) | High |
| World daemon | ★★★★★ | Medium | Very high |
| Claude agents merge | ★★★★★ | High | Maximum |
| Death certificates | ★★★ | Low | Very high |
| External API resources | ★★★ | Medium | Medium |
| Email digest | ★★★ | Medium | High |
| Code-writing creatures | ★★★★★ | Medium | Very high |

**Build order (recommended):**
1. API wallet display (1 day — add token tracking to existing calls)
2. Filesystem artifacts via Tauri (1 day — write to ~/.thronglets/)
3. Real notifications (0.5 days — single Tauri plugin)
4. Claude agents integration (2-3 days — the real product)
