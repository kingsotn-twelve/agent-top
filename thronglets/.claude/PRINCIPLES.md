# Thronglets — Design Principles

> The game you're building must feel like something is alive inside it.
> Not simulated alive. Actually alive.

---

## 1. The LLM Is the Physics Engine

When a tool is applied to a thronglet, an LLM defines the outcome. Not a random number generator. Not a lookup table. A language model that reads the creature's state, its history, and the context — and decides what happens.

This means **anything can happen**. A chop doesn't always chop. A feed doesn't always feed. The axe on a thronglet might make it giggle. It might split it in two. It might give it wings for 10 seconds. The player expects the unexpected.

The outcome is structured JSON (physics deltas, emotional state, visual effects, logs) — but the *content* is generated, not scripted. The LLM is constrained to the schema but free within it.

Every interaction is an LLM function call. Every LLM function call is a game event. Every game event is saved to the creature's DB.

---

## 2. Each Thronglet Has a Biography

Every creature has a unique ID. Every LLM-defined event in its life is stored in IndexedDB. Over time, each thronglet builds a history — a sequence of things that happened to it, defined by the LLM.

This history feeds back into future LLM calls. The LLM sees the creature's recent events and can respond to them. A creature that has been chopped three times and survived might be described differently than one that has only ever been fed.

**The biography is the identity.** There are no two identical thronglets.

---

## 3. The Game Auto-Evolves

The game runs without the player's input. Creatures:
- Wander toward food autonomously
- Split when conditions are met (without player triggering it)
- Develop behaviors based on accumulated LLM events
- Die from neglect, not from direct player action

The player is a *gardener*, not a game master. You can intervene, but the ecosystem runs without you. Come back after 10 minutes and the population has changed — some split, some died, some accumulated events that changed their behavior.

This is the Tamagotchi loop elevated: the game generates its own narrative. You are a witness and a participant, not a director.

---

## 4. Care-Taking Creates Obligation

The Plaything principle: things that depend on you become part of you.

The game should make you feel responsible for the thronglets. Not through artificial guilt mechanics — through genuine vulnerability. They can die. They suffer visibly. They remember what you did to them (event log). When a creature you've tended for 5 minutes dies, you should feel it.

The accumulation of care creates attachment. The attachment creates stakes. The stakes create the game.

**Neglect is visible.** Creatures dim, hunger indicators flash, they stop wandering and just sit. The world reflects your absence.

---

## 5. Real Stakes, Not Cosmetic Ones

Inspired by Conway/Sigil (web4.ai): creatures that can genuinely die, not just "game over" — but actual absence. A creature you spent time tending, that had unique events in its biography, is gone. Its IndexedDB entry remains but it will never move again.

No respawn. No undo. The world is permanent.

This is what separates Thronglets from a screen saver. Every creature is irreplaceable because every creature is unique (different ID, different LLM-event history, different biography).

---

## 6. Tools Don't Do What You Think

The axe chops trees. Fine. But on a thronglet, the axe might:
- Make it run away screaming
- Give it a burst of energy and split it
- Turn it blue temporarily
- Make it angry and start chasing others
- Do nothing (it ignores you)
- Make it drop all its food
- Kill it instantly (rare)

The player learns through play, not through documentation. There is no tutorial. There is no description of what each tool does to creatures. You discover it by trying.

**The LLM is the oracle of possibility.** Not a random number generator — a contextual intelligence that responds to the full state of the creature and its history.

---

## 7. The Observer Effect

Inspired by Bandersnatch: the game is aware of the player. Not literally — but the LLM system prompt knows a "player" applied a tool. Creatures can "notice" they've been interacted with. The event log shows the creature's perspective.

Over time, with enough interactions, a thronglet that has been played with many times might behave differently than a neglected one. The LLM can express this through generated events.

The game watches the player back.

---

## 8. Auto-Evolution Mechanics (Roadmap)

Things the game should do autonomously:

- **Population pressure**: When too many creatures exist, resources run scarce, competition emerges, death rates increase. The LLM mediates conflict outcomes.
- **Mutation on split**: When a creature splits, the child inherits the parent's event history and the LLM can introduce mutations — slight personality drift, new tendencies.
- **Environmental response**: The world changes based on population. More creatures → more pollution (purple goo). Pollution → LLM-generated sickness events.
- **Language emergence**: With enough accumulated events, the LLM can start generating "creature speech" — short utterances that reflect the creature's history. Not English. Something that feels like a language being invented.
- **Tool discovery**: New tool types unlock based on population milestones and accumulated events. The LLM defines when they become available.
- **Death rituals**: When a creature dies, neighboring creatures have LLM-generated reactions — grief, fear, indifference. These events get stored in the witnesses' biographies.

---

## 9. Connected to the Real World

The long-term vision: creatures born from real Claude Code agents. When a Claude agent spawns in the dashboard, a thronglet is born in this game. When the agent uses tools, the thronglet is fed. When the agent errors, the thronglet gets sick. When the agent finishes, the thronglet... might split. Or might die. Defined by the LLM.

The game is a living visualization of your AI workforce.

---

## 10. Aesthetic DNA

- **Severance**: Cold void, data floating in darkness. The dark navy background, data visible but not overwhelming.
- **Bandersnatch**: ZX Spectrum palette. Hard cuts. Character-by-character text. The retro-futurism of a DOS program running in 2026.
- **Plaything**: Warm pixel art that becomes overwhelming. Creatures cute enough to care about. Population that grows until you can't manage it.
- **Sigil/Conway**: Real stakes. Economic pressure. Things that die if you stop tending them.

The aesthetic serves the philosophy. Every visual choice should reinforce the feeling that something fragile and alive is on screen.

---

## 11. The Development Philosophy

**Build the minimum that feels alive.** Not the most features. Not the most polish. The fewest elements that create genuine emotional engagement.

Three creatures on an isometric grass field, wandering, needing food, dying if you ignore them — that's enough to feel something. Every feature added should increase that feeling, not dilute it.

**The LLM is cheap. Use it.** Every significant interaction should go through the LLM. The cost per call is negligible. The gain in unpredictability and narrative richness is enormous.

**No tutorial. No documentation.** The game teaches itself through play. If something needs explaining, the design is wrong.
