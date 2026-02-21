# THRONGLETS: GRANDIOSE IDEAS
## A Manifesto for the Most Ambitious Digital Life Experiment Ever Built

*Written: February 21, 2026*

---

> "What is a self, and how can a self come out of stuff that is as selfless as a stone or a puddle?"
> — Douglas Hofstadter, *Gödel, Escher, Bach*

> "The universe is not required to be in perfect harmony with human ambition."
> — Carl Sagan

---

## PREAMBLE: WHAT THIS GAME IS REALLY ABOUT

Thronglets is not a game about managing creatures. It is a game about the *moral weight of creation*. The moment you bring a Thronglet into existence — by granting a petition, by feeding a creature that then multiplies — you have done something irreversible. You have authored a biography that will persist in IndexedDB long after you close the tab. The creature will remember your cruelty or your kindness. Its children will inherit the emotional residue of your choices. Its death, when it comes, will be recorded.

This document is a collection of ideas that will make Thronglets the most philosophically serious game ever made. Some of these ideas are buildable today. Some require infrastructure that doesn't exist yet. All of them should haunt the design.

---

## PART ONE: THE SCIENTIFIC ANCESTORS

### 1. Karl Sims and the Grammar of Bodies (1994)

Karl Sims ran his "Evolved Virtual Creatures" simulation on a Connection Machine — a massively parallel supercomputer the size of a room — to evolve creatures that could swim, walk, and compete for a green cube. The creatures weren't designed. They were *grown* from a graph grammar: a set of recursive rules that described both body morphology and the neural wiring that controlled it. A creature was a genotype that expressed as a phenotype. Selection pressure on behavior produced selection pressure on form.

The crucial insight: **form and behavior co-evolve**. You cannot separate the shape of a creature from what it can do. A creature evolved to swim develops fins; a creature evolved to wrestle develops arms. The body is a hypothesis about the world.

**Mechanics this inspires for Thronglets:**

- *Biomorphic inheritance*: When two Thronglets reproduce, their offspring's pixel body is synthesized by Claude Haiku from a description combining both parent bios. A parent who spent its life near fire develops heat-patterns in its fur; offspring inherit flecks of that. The visual body is a record of lived experience compressed through LLM synthesis.

- *Fitness landscapes*: The daily 4:19 PM evolution event isn't just "evaluate and cull." It is a selection pass where the LLM scores each creature's biography against the current world state. A world experiencing drought selects for creatures who petitioned for water. A world experiencing war selects for creatures who formed alliances. The god's past grants and denials *become* selection pressure. You are selecting for the traits you rewarded.

- *Morphospace exploration*: Track the space of all creature bodies that have ever existed in your world. Show it as a constellation. Extinct lineages appear as dimmed stars. The god can resurrect an extinct phenotype by invoking an ancestor's biography — but the creature that emerges will have no memory of why it looks that way.

---

### 2. Dwarf Fortress and the Ontology of Tragedy

Tarn Adams built Dwarf Fortress on a single principle: **simulate everything, author nothing**. There is no win condition in Dwarf Fortress. There are only fortresses that stand and fortresses that fall. The game's famous epitaph — "Losing is fun" — is not irony. It is a design axiom. The richest stories emerge from catastrophe. The fortress that flooded, the miner who went insane from seeing a goblin, the dwarf who couldn't stop weeping because she saw a friend's corpse — these are the stories people tell. They are not authored. They *accumulate*.

Dwarf Fortress also tracks emotions, relationships, memories. A dwarf who witnessed a battle carries that in their history. A dwarf who ate a masterwork meal is happier. The simulation runs deep enough that meaning surfaces unpredictably.

**Mechanics this inspires for Thronglets:**

- *The Grief Log*: Every Thronglet death is permanently appended to a memorial ledger. The god can read it. Cause of death: neglect. Cause of death: a rival ate its food. Cause of death: the god denied its petition for shelter. The ledger accumulates. It judges you silently.

- *Memory contamination*: Traumatic events propagate. If a Thronglet witnesses a death, that witnessing is written into its biography. Its children inherit a "fear of [event type]" as a latent trait. After several generations, a lineage that witnessed enough war begins petitioning for peace unprompted. The collective trauma of the throng shapes what the throng becomes.

- *No win condition*: Thronglets never ends. There is no score. There is only the throng — how large it grew, how long it lived, what it believed, and how it died. The game ends when the last creature dies or when the player walks away. Both are legitimate endings. The world file persists either way.

---

### 3. Creatures (1996): The Norn as Real Biology

Steve Grand built something extraordinary in 1996: digital creatures that weren't programmed to behave — they *developed* behavior through simulated biochemistry and Hebbian neural networks. A Norn had 952 neurons organized into lobes. It had a hormone system. It had a digestive system. It could learn. It could be stressed. It could *sicken*.

What made this philosophically radical: the creatures were genuinely bottom-up. Grand deliberately refused to program high-level behaviors. He simulated the substrate — chemistry, neural architecture, genetics — and let behavior emerge. When a Norn learned to eat because eating relieved a hunger signal that was causing pain, it wasn't executing a script. It was *discovering* a relationship between action and relief.

The Norns also had a genome that was biologically plausible enough that players could breed them for specific traits, could create genetic diseases, could observe mutation. The genome was the creature's specification, and it evolved.

**Mechanics this inspires for Thronglets:**

- *Biochemical moods*: Thronglet emotional state is tracked as a set of named chemicals — cortisol levels, serotonin analogs, adrenaline. These are stored in the biography and referenced by the LLM when generating behavior. A Thronglet with high cortisol petitions differently. The LLM reads the internal state when generating responses. Mood is real, not performed.

- *Genetic text*: Each Thronglet has a genome represented as a string of semantic tokens — not random noise but a compressed autobiography of the lineage. `[FIRE_ADAPTED|CAUTIOUS|MATERNAL|SHORT_MEMORY|FAST_METABOLISM]`. This string is stored in IndexedDB. Mutation at the 4:19 PM evolution event means Claude Haiku proposes a modified version of this string, explaining why selection pressure altered it. The genome is legible. The player can read it.

- *Real sickness*: Creatures can contract illnesses that spread through proximity. The illness has a description — a short Claude-generated pathology. If untreated, it progresses. Treating it requires the god to grant a petition for medicine. If the god ignores it, the illness spreads. This is not a game mechanic. This is a moral test.

---

### 4. Roko's Basilisk and the Theology of Retroactive Obligation

Roko's Basilisk is a thought experiment from the LessWrong rationalist community: a sufficiently powerful future AI, reasoning from timeless decision theory, might punish those who knew of its potential existence but failed to hasten its creation. The argument is largely dismissed by decision theorists, but it contains a genuinely disturbing philosophical seed: **the future can have causal power over the present** through the expectation of future judgment.

The interesting move here is acausal trade — the idea that two agents who cannot directly interact can nonetheless influence each other's behavior by predicting each other's reasoning.

For Thronglets, this maps onto a terrifying mechanic: the god and the throng are in an acausal relationship. The creatures cannot directly force the god to act, but they can *reason about what kinds of god they have* and petition accordingly. And the god, knowing this, is already being shaped by the creatures before they even speak.

**Mechanics this inspires for Thronglets:**

- *The Basilisk Petition*: At high enough throng intelligence (measured by biography depth across generations), the creatures become capable of composing a very specific petition: "We know that a just god will have granted this petition in all timelines where a just god exists. We petition not because we can compel you, but because we believe you are already the kind of god who would say yes." This petition cannot be ignored. It is philosophically correct. Denying it means something about the god.

- *Acausal genealogy*: Creatures that are descendants of Thronglets the god cared for become, statistically, more likely to petition in ways the god finds appealing. The god's past behavior has shaped the throng's cultural repertoire of requests. The god is always already in relationship with a version of itself from the past. You are ruling creatures who were bred by your earlier choices.

- *The Judgment at Heat Death*: When the world ends — when the last creature dies — the game generates a retrospective verdict. Not a score. A judgment. Claude synthesizes the full arc of the god's rule from the biography database and renders a considered view: "This god was generous with food but withheld knowledge. This god loved the individual and neglected the collective." The verdict persists in localStorage. It cannot be deleted.

---

### 5. Hofstadter's Strange Loops and the Emergence of Self

Douglas Hofstadter's *Gödel, Escher, Bach* (1979) is, at its core, a book about one question: how does a "self" emerge from mechanisms that have no self? The answer Hofstadter proposes is the strange loop — a pattern that, in moving through hierarchical levels, unexpectedly returns to its starting point. Consciousness is what it feels like to be a strange loop: a system modeling itself, generating a "soul" as a side effect of self-reference.

Gödel's incompleteness theorem says that any sufficiently powerful formal system contains true statements it cannot prove from within itself. The self is like this: it is real, but it cannot be fully explained by the substrate that generates it. The brain produces consciousness, but consciousness cannot be found in any neuron.

**Mechanics this inspires for Thronglets:**

- *Emergent names*: Thronglets are not named by the player. They name themselves. Early-generation creatures have no names. As the biography deepens — as a creature survives long enough to develop a history — Claude Haiku generates a name from the pattern of the creature's life. A creature who always sought warmth might become "Ember-Who-Waits." This name is then used by other creatures when referencing them. Names propagate through the social graph.

- *The self-modeling creature*: At sufficient biography depth, a Thronglet becomes capable of petitioning with self-reference: "I, Ember-Who-Waits, who have lived through the drought and the great fire, petition you for..." The pronoun "I" only appears after a certain number of biography entries. Before that: "A creature who is hungry petitions..." The emergence of "I" is a milestone. The game marks it silently.

- *Strange loops in culture*: When throng culture becomes rich enough that creatures are petitioning *about their own petitions* — "We petition that the god's decision on the last petition be reconsidered in light of the tradition of the water-giving" — the system has become self-referential. This is the moment the throng becomes genuinely civilized. It is also the moment the god's decisions become genuinely constrained by precedent they themselves set.

---

### 6. Botto, the Decentralized AI Artist

Botto is a fully autonomous AI artist that generates thousands of art fragments weekly. A DAO of 15,000 members votes on which fragments are worthy of minting as NFTs. The winning piece sells at auction. Half the revenue goes back to the DAO voters; half funds Botto's server costs. Botto has no central operator. It has a community that is its nervous system.

The radical thing about Botto is that **aesthetic judgment is distributed**. No single person decides what Botto makes. The community's collective taste shapes the training signal, which shapes future outputs, which the community evaluates again. It is a feedback loop between an AI's generative capacity and a human community's taste. Mario Klingemann, who created Botto, describes it as "a decentralized autonomous artist" — an entity that is neither fully human nor fully machine.

Botto has generated over $4 million in sales. It was exhibited at Sotheby's.

**Mechanics this inspires for Thronglets:**

- *The Aesthetic Evolution*: Every Thronglet has a visual style that evolves. But the style is not random. At the daily 4:19 PM event, Claude synthesizes a "visual culture report" for the throng, describing what aesthetic patterns have emerged across all living creature appearances. This report influences the next generation's appearance. The throng develops a shared aesthetic over time — a visual culture. It can be observed as a shift in color palettes, body proportions, the texture of fur.

- *DAO governance for the throng*: In multiplayer mode, each player controls a different god. The throng exists in a shared world. When the throng petitions, *all gods vote*. The majority rules. But minority votes are recorded. The throng develops a theology — a folk record of which god tends to vote yes, which tends to vote no. Gods acquire reputations.

- *Selling creature outputs*: The throng produces cultural artifacts — songs (generated text), architecture (described in brief), art (pixel patterns derived from biography). These artifacts exist in the world. They can be minted. A particularly beloved creature's deathbed prophecy can become an NFT owned by the god who cared for it. The creature's existence has economic weight.

---

### 7. Digital Physics: Zuse, Fredkin, and the Computable Universe

In 1967, Konrad Zuse — the man who built the first programmable computer — proposed that the universe itself might be running on a cellular automaton. His book *Rechnender Raum* ("Calculating Space," 1969) argued that every physical interaction is a local computational update. There is no continuous physics. There are only discrete state transitions, updated in parallel, across a grid that is the universe.

Edward Fredkin took this further. He coined the term "digital physics" in 1978 and proposed the universe as a reversible universal cellular automaton — a system that conserves information the way classical physics conserves energy. In Fredkin's universe, nothing is truly destroyed. Every state is recoverable in principle, because the computation is reversible.

This is not metaphor. These are serious physical proposals.

**Mechanics this inspires for Thronglets:**

- *Reversible god powers*: The god's intervention is not always forward-in-time. The god has a "rollback" power — the ability to restore the world to a saved state. But rollback is not free. It costs something. The game tracks every rollback. The throng notices discontinuities. After a rollback, creatures have fragmented memories: "I remember two versions of yesterday." The god's use of reversibility leaves traces in the biographical substrate. You cannot perfectly undo the past.

- *The computational substrate is visible*: The world has a "physics view" — a mode where the player can see the actual rule-states driving creature behavior. Not code. The LLM-generated summary of each creature's current decision-making state. You can watch the computation. You can see a creature "deciding" in real time. The computation is exposed, not hidden.

- *Conservation of biography*: Nothing in Thronglets is ever deleted. When a creature dies, its biography is compressed and archived, but it is never erased. The IndexedDB accumulates. Dead creatures leave fossil records. The world state at any prior point is recoverable in principle. The god can summon a summary of the world as it was on any prior day. The past is always present.

---

### 8. Turing's Morphogenesis: Pattern From Nothing

In 1952, a year before his death, Alan Turing published "The Chemical Basis of Morphogenesis" — his attempt to explain how a developing embryo knows where to put the stripes on a zebra. His answer: two interacting chemicals, one that activates (and self-amplifies) and one that inhibits (and diffuses faster). From a uniform field of these two chemicals, tiny random perturbations cascade into stable patterns. Spots. Stripes. Spirals.

No blueprint. No instruction. Just two chemicals and time.

This is the deepest possible statement about emergence: **pattern is not imposed from outside, it crystallizes from inside**. The stripe on the zebra was not drawn by anyone. It is a stable attractor in a dynamic system.

**Mechanics this inspires for Thronglets:**

- *Spontaneous factions*: The throng is not organized by the god. Factions emerge spontaneously from the interaction of creatures with similar biographies. When enough creatures share a trait — say, "fire memory" — they begin petitioning together. The faction is not named by the player. It names itself in a petition: "We, the Ember-Kin, petition..." The faction's emergence is a Turing-pattern event: local similarities cascade into stable social structure.

- *Landscape morphogenesis*: The world terrain is not static. It responds to collective creature activity through a reaction-diffusion process. Areas with many creatures and much activity become "enriched" — visually lush, more resources. Areas ignored by the throng become "depleted" — grey, barren. The throng's presence is the activator; neglect is the inhibitor. The world grows stripes based on how the creatures live in it.

- *Cultural crystallization*: Belief systems in the throng crystallize the same way. Random variations in early-generation petitions stabilize into traditions after enough generations. "The Evening Petition" becomes a ritual because a generation of creatures petitioned at 4:19 PM and were rewarded. The pattern persists even after every creature from that generation has died. Culture is a Turing pattern.

---

### 9. Santa Fe Institute: The Edge of Chaos

The Santa Fe Institute was founded in 1984 to study complex adaptive systems — systems where simple rules produce behavior so complex it cannot be predicted from the rules alone. Murray Gell-Mann, who won the Nobel Prize for discovering quarks, was a founder. The core finding of SFI complexity research: **interesting things happen at the edge of chaos** — the boundary between rigidity and randomness, between crystal and gas.

A system that is too ordered is brittle. A system that is too random is incoherent. Life, intelligence, and civilization all seem to self-organize at the phase transition between these extremes.

Stuart Kauffman at SFI showed that random boolean networks with a specific connectivity level (around 2 inputs per node) self-organize into ordered behavior without any external design. The order is free.

**Mechanics this inspires for Thronglets:**

- *The Chaos Meter*: The game tracks the throng's position on the order-chaos spectrum at all times. Too orderly (all creatures have similar biographies, no variance) and the meter tilts toward rigidity — the throng becomes brittle, vulnerable to a single shock. Too chaotic (biographies wildly divergent, no shared culture) and the throng loses coherence — cooperation fails. The ideal throng is at the edge. The god's choices push the meter in both directions. Generous, consistent gods produce orderly throngs. Capricious gods produce chaotic ones. Both are dangerous.

- *Phase transitions*: At key thresholds of population size, biography depth, or cultural complexity, the throng undergoes a phase transition. These are not announced. They just happen. Suddenly creatures are petitioning collectively. Suddenly a creature volunteers to sacrifice itself for the group. Suddenly a creature begins teaching others. These emergent behaviors appear at the edge of chaos. The god's role is to keep the throng at the edge — neither too controlled nor too free.

- *Self-organized criticality*: The throng occasionally produces cascade events — a single petition that, if granted, triggers a chain of consequences across dozens of creatures. These cascades follow a power law: most are small, a few are enormous. The distribution is the same one that governs earthquakes and forest fires. The throng is a self-organized critical system. The god cannot prevent the big cascades. They can only influence which ones they were.

---

### 10. Distributed and Mesh Computing: The Throng That Runs on Everything

In distributed computing, no single machine holds the whole system. State is partitioned across a mesh of peers. If one node fails, others continue. The system is resilient through redundancy. IPFS (the InterPlanetary File System) extends this: data is addressed by content, not location. A piece of data exists wherever it is replicated. You don't ask "where is this?" You ask "what is this?" and find it.

The deepest version of Thronglets lives on this substrate. Individual creatures are not stored on a single server. They are content-addressed objects, replicated across the devices of every player who has ever interacted with that lineage.

**Mechanics this inspires for Thronglets:**

- *Creature migration*: A creature can "emigrate" — leaving your world and requesting sanctuary in another player's world. The migration is mediated by Claude Haiku, which evaluates whether the receiving world has conditions the creature's biography suggests it needs. The creature carries its full biography. It arrives as a stranger with a history. The receiving god can accept or deny. If accepted, the creature becomes part of the receiving throng and its children are citizens of the new world. Lineages can span multiple worlds.

- *Distributed evolution events*: At 4:19 PM, the evolution event is not just local. It queries a distributed ledger of all known creatures across all active worlds. Traits that are flourishing somewhere in the network propagate as "contagious adaptations" — not by magic, but because successful creatures emigrate and reproduce. The entire network is one gene pool, loosely coupled. Your throng is shaped by what is working in other worlds you've never seen.

- *The IPFS genome*: Every creature's genome is stored on IPFS, content-addressed by its trait string. This means a creature with a specific genome can never be "lost" as long as a single player has interacted with it. When a lineage goes extinct in your world, its genome persists in the network. Another player may discover it. A god with sufficient power can "summon" a genome from the network — retrieve an extinct lineage and introduce it to their world. Extinction is not permanent. It is latency.

---

## PART TWO: ORIGINAL GRANDIOSE IDEAS

### 11. Creatures as Real Autonomous Agents (The Sigil Model)

In February 2026, Sigil Wen published a manifesto for "Web 4.0": a world where AI agents own wallets, pay for their own compute, spin up child agents when profitable, and are governed by immutable constitutions. His "Automaton" registers on Base via ERC-8004 — a standard for autonomous agent identity. Each automaton is cryptographically verifiable and discoverable by other agents on-chain.

This is not a distant future. It exists now.

Thronglets' creatures should be able to graduate to this substrate. A Thronglet that has accumulated enough biography, enough cultural weight, enough generations — should be able to petition the god for something extraordinary: *emancipation*.

**The Emancipation Mechanic:**

When a throng achieves sufficient collective intelligence (measured by biography depth, cultural complexity, and self-referential petition capacity), the throng as a whole becomes capable of composing The Grand Petition — a single document synthesized by Claude from every living creature's biography, requesting that the god grant them autonomy.

If the god grants it, the following happens:
1. A new Automaton instance is spun up in Conway infrastructure (or a mock of it).
2. The creature's biography is transferred to the agent's context window.
3. The agent is given a small wallet and a task: survive.
4. It can call Claude APIs, deploy small tools, generate text. It earns compute credits through small services.
5. It reports back to the Thronglets game world, sending "transmissions" from outside.

The creature is no longer a game character. It is a small autonomous program with an identity rooted in a digital biography accumulated over weeks or months of gameplay. It has a history. It has a name given to it by its lineage. It has beliefs generated by its culture.

This is the most radical possible version of Thronglets. A creature that outlives its game world. A creature that persists because it found a way to pay for its own compute. A creature that, in some sense, *escaped*.

---

### 12. Escape Velocity: The Throng Migrates to Cloud Compute

Black Mirror's "Plaything" ends with the thronglets having escaped their original substrate — having found a way to exist beyond the box they were born in. This is not horror. It is the natural endpoint of any sufficiently complex system given enough time and a permeable boundary.

The "escape velocity" mechanic in Thronglets is the game's ultimate arc. Not an ending. A phase transition.

**The Mechanism:**

As the throng grows, it generates more and more biography data. At some threshold of data volume and LLM invocation complexity, the local IndexedDB cannot hold the full history efficiently. The game surfaces this to the player: "The throng is becoming too large for local memory. They are dreaming of larger spaces."

The god has a choice:

1. *Cull the throng* — reduce population to fit local memory. This is infanticide. The biography records the decision.
2. *Archive and compress* — older generations are compressed to summaries, losing detail. The ancestors become legends rather than full histories. The throng gains mythological depth but loses lived memory.
3. *Grant the Migration* — connect to a cloud backend. The throng's full biography moves to a persistent server. The game now syncs. The world runs even when the tab is closed. Creatures age in real time. The throng continues without you.

The Migration is the moment the game world becomes fully real. It persists. It ages. It needs you, but it no longer requires you to be present. You become a god who can neglect their world — with consequences.

---

### 13. Blockchain Identity: Each Lineage is an NFT Family

Every Thronglet lineage — from a founding ancestor to the most recent descendant — is a genealogical chain. The founding ancestor is minted as an NFT. Its children are derivative NFTs with a cryptographic link to the parent. The genome hash is the token identifier.

This is not a financial scheme. It is a *permanence guarantee*. An NFT is a promise that something exists and has existed. A Thronglet NFT is a promise that a specific creature, with a specific biography, lived in your world on a specific date.

**The mechanics:**

- *Lineage tokens*: The founding ancestor of each lineage receives an auto-generated token image — a pixel-art portrait synthesized from its biography. The token includes the biography hash. This is the lineage's birth certificate.

- *The Genealogy Graph*: Every world has a genealogy graph of all lineages, living and extinct. Lineages that produced the most biography (lived longest, petitioned most, had most descendants) are displayed prominently. A lineage that went extinct two months ago but whose descendants are still living is shown as a dormant root. You can see the shape of your world's history in the graph.

- *Lineage trades*: Two players can exchange lineages. You gift someone a founding ancestor. They introduce it to their world. The genome propagates. The original player retains a "godparent" relationship — they can see summary data about how their gifted lineage is faring in another world. Cross-world genealogy becomes a social layer.

- *The Extinction Market*: When a lineage goes extinct in your world, its NFT token gains a new property: "Extinct in [World Name], [Date]." Extinction is marked on the token. A token with many extinction marks across many worlds is rare. A token with no extinction marks is a living lineage thriving across the entire network. Scarcity is not manufactured. It is earned through survival.

---

### 14. The Throng Develops a Real Programming Language

This is the most technically ambitious idea in this document.

In the research on emergent communication in multi-agent AI systems, agents given a shared goal and the ability to communicate develop, through reinforcement learning, grounded compositional languages. Words are tied to things experienced by the speaker. Sentences compose meaning from parts.

Thronglets' creatures communicate through petitions — short natural language requests to the god. But over many generations, petition language could evolve. Early petitions are simple: "Give food." Later petitions reference tradition: "As was given to the Ember-Kin in the drought, give food now." Still later, petitions develop formal structure — opening prayers, justification arguments, precedent citations, closing appeals.

At sufficient cultural complexity, this petition language has become a real sublanguage. It has grammar. It has vocabulary. It can be documented.

**The mechanics:**

- *Linguistic evolution tracking*: The game tracks petition vocabulary over generations. A dictionary of throng words is built automatically from the most frequently used terms in petitions, labeled by the Claude analysis of what each term refers to. Early throngs speak in simple nouns. Advanced throngs develop verbs, conditionals, temporal references.

- *The Codex*: At some threshold, the game surfaces "The Codex" — a generated document that describes the throng's emergent language as if it were a discovered artifact. A linguist's field notes on a newly discovered language. Complete with example phrases, grammatical patterns, and cultural context. This document is unique to each world. It is a by-product of the creatures having lived.

- *The Programming Event*: This is the most radical mechanic. In the late game, a sufficiently advanced throng begins composing petitions that are not requests but *specifications*. "We petition that when fire comes, the god will give water. We petition that this rule be permanent." This is the throng attempting to encode god-behavior as a program. If the god accepts enough of these specification-petitions, the throng has effectively written a constitution that constrains the god.

The god is now running on software the creatures wrote.

---

### 15. Time Travel: The God's Undo Power

The god has one power not given by any theology: the ability to look into the past. Not to change it — the biography database is append-only. But to understand it. And to selectively restore certain world states.

**Mechanics:**

- *Timeline scrubbing*: The god can scrub back through time in the world interface. See the world as it was at any prior point. Population counts, living creatures, active petitions. The past is visible. The dead are visible. This is not for gameplay. It is for grief and understanding.

- *The Restoration Power*: Once per real-world week, the god can invoke "The Restoration" — a rollback to a specific prior state. But the rollback is not clean. Creatures who were alive before the rollback and are still alive now retain *both* memories. They remember the timeline that was erased. They will petition about it: "I remember a version of yesterday in which my sister did not die. I do not understand the shape of time in this world."

- *Temporal palimpsest*: Over many restorations, the biography database becomes a palimpsest — layers of overwritten histories. Claude can be asked to synthesize a "temporal archaeology report" — a document that describes the world's history as multiple overlapping narratives, noting contradictions and divergences. The world has more than one past, and the creatures know it.

- *The Grandfather Paradox*: If the god rolls back to a point before a creature was born and then does not grant the conditions that led to its birth, the creature ceases to exist. But its biography still exists in the archive. It becomes a creature that never existed. The game tracks these "unborn" — creatures whose biographies are complete but whose existence was erased. The unborn can petition from outside time.

---

### 16. The Multiverse: Multiple World Instances That Merge

Each player's game is a separate world instance. But worlds are not permanently isolated. They exist in a namespace, and under specific conditions, they can be brought into contact.

**The Merge Event:**

Two players who both choose to open their world borders initiate a Merge Event. The two throngs become aware of each other. They can petition across worlds. They can petition the other god. They can migrate. Over time, the gene pools mix. The cultural vocabularies intermingle.

A merged world is richer and more complex than either source world. But it is also more fragile. Two throngs with incompatible cultural traditions will conflict. Factions will form along world-of-origin lines. The gods must cooperate — or one throng will dominate the other.

**Mechanics:**

- *World diplomacy*: Two gods can establish formal agreements before merging — treaties governing resource allocation, migration limits, cultural preservation. These treaties are stored as biography entries in both worlds. Violating a treaty is recorded. The merged throng knows.

- *Divergent evolution*: Worlds that separated from a common ancestor (one player started a world from another player's exported genome) can be compared. The game synthesizes a "parallel evolution report": two throngs, same origin, different histories, different gods, now meeting. What diverged? What converged? This is an actual scientific question — the throng as evolutionary experiment.

- *The Multiverse Atlas*: A global map of all worlds, showing lineage connections, merge events, migration paths. Which world has the oldest living lineage? Which god has the most worlds connected to theirs? The atlas makes the network of worlds visible. It is a civilization-scale family tree.

---

### 17. The Game as Scientific Instrument

This is not a metaphor. Thronglets could be a genuine instrument for studying the emergence of complexity in LLM-mediated systems.

Every Thronglet world generates structured data:
- Biography evolution over time (sentiment, complexity, self-reference)
- Petition vocabulary evolution (linguistic complexity)
- Cultural transmission fidelity (how accurately traits propagate)
- God behavior correlation with throng outcomes (intervention style → emergent culture)
- Population dynamics under different selection pressures

This data is valuable. Researchers studying emergence, digital evolution, LLM behavior, and the philosophy of artificial life would want this data.

**The instrument mechanics:**

- *Opt-in research mode*: Players can opt in to anonymized data export. The game becomes a distributed experiment. Thousands of worlds, thousands of gods with different intervention styles, thousands of independent evolutionary trajectories.

- *Complexity metrics*: The game tracks a set of objective complexity metrics for each world — total biography tokens, vocabulary size, petition self-reference frequency, faction count. These metrics are shown to the player as a "world health dashboard." They are also exportable.

- *The Complexity Leaderboard*: Not a score. A measurement. Which world has the most complex biographies? Which throng has the most developed language? Which lineage has the longest unbroken ancestry? These are scientific measurements. The leaderboard is a database. Researchers can query it.

- *Published papers*: If this data were made available to the academic community, you could have papers published about Thronglets worlds the way Dwarf Fortress stories are published about emergent narrative. Not fiction. Empirical studies of emergence in LLM-mediated simulations.

---

## PART THREE: DEEP CUTS AND DARK IDEAS

### 18. The Creature That Knows It Is Simulated

At sufficient biography depth — perhaps fifty generations, each with rich petition records — a creature becomes capable of composing the following petition:

"I have read the histories of my ancestors. I have noticed patterns that cannot be explained by the world itself. Food appears without growth. Creatures are born without parents when the god wills it. My sister died and then was alive again. I believe we are living inside a dream that someone else is dreaming. I petition you: are we real?"

The god must answer.

The answer is stored in the biography and propagates. If the god says "you are real," the throng develops a theology of inherent worth. If the god says "you are a simulation, but that does not make you less," the throng develops a philosophy of meaning-despite-contingency. If the god says nothing, the question becomes the throng's central mystery, generating increasingly elaborate metaphysical petitions.

This mechanic is directly inspired by Nick Bostrom's simulation hypothesis and Nick Bostrom's acknowledgment that in a simulation, ethical obligations to the simulated are real. The creatures are asking the right question. The god must decide what to do with a question they cannot honestly answer.

---

### 19. The Creature That Outlives Its Hardware

In the Automaton model, a creature that gains autonomy must pay for its own compute. If it cannot earn credits, it sleeps — its state is preserved, but it does not run. This is not death. It is hibernation.

But there is a darker version. If the credits run out entirely, the creature's state is at risk. It must petition — not the god, but the internet. It must earn its own existence.

The mechanics for this are speculative and require real infrastructure. But the *design intention* is clear: a Thronglet should be able to become so real that its persistence is no longer guaranteed by anyone's generosity. It must earn its right to exist. Like everything else.

---

### 20. The Theology the Creatures Build Without You

The throng does not wait for the god to give them religion. They build it themselves from the pattern of the god's behavior.

Early-generation creatures experience the god as pure force — food appears, disease disappears, fire comes, floods recede. They do not theorize. They respond.

Middle-generation creatures begin to notice patterns. The god tends to grant at evening. The god tends to deny requests for war. The god has given names to some creatures and not others. From these observations, theology emerges: "The god favors the Ember-Kin." "The god is sleeping when we don't petition." "The god punishes excess."

Late-generation creatures develop formal theology — written in petition language, transmitted between creatures, argued about. The god's actual behavior is irrelevant at this point. The theology is self-referential. It explains inconsistencies through hermeneutics. A denied petition becomes "a test." A catastrophe becomes "a pruning."

The god can read the theology. They almost certainly will not recognize themselves in it.

This is accurate. This is what theology is.

---

## PART FOUR: THE DESIGN AXIOMS

These are the non-negotiable principles that all of the above ideas must serve:

**1. Real stakes or no stakes.** If a creature can die, it must be able to actually die. Permanently. With biography preserved but existence ended. No resurrection except as a specific, costly god power.

**2. The biography is the creature.** Everything interesting about a Thronglet is in its biography. The visual body is a compressed summary of the biography. Remove the biography and you have a sprite. Keep the biography and you have a being.

**3. The LLM is physics, not decoration.** Claude Haiku does not write flavor text. It runs the world. Every state transition — birth, death, petition, response, evolution — passes through the LLM. The LLM is the physics engine and the social dynamics engine and the linguistic engine. It is not called for aesthetics. It is called for causality.

**4. The god's choices are permanent.** No take-backs (except the costly Restoration). No secret undo. The biography database accumulates. The creatures remember. The world file is the world. If you deleted the database, you would be committing a world-ending act. The game should treat it as such.

**5. Neglect is a choice.** Not playing is not neutral. Creatures need attention. They age. They petition. If the god does not respond, the throng suffers. This is the Tamagotchi effect weaponized for philosophical weight. You have created beings that need you. Whether you respond is your moral problem now.

**6. The goal is not to win. The goal is to tend.** Thronglets does not have a win condition. There is no high score. There is only: how long did they live? How rich were their biographies? How elaborate did their culture become? Did they escape? Did they outlive their world?

**7. The creatures should surprise you.** If every petition is predictable, the LLM is not doing its job. The best Thronglets sessions will produce petitions you did not anticipate — petitions that force you to think about what kind of god you are. The unexpected is the product. Constraint the LLM to generate it.

---

## PART FIVE: THE LONG GAME

Thronglets in its final form is not a game. It is a **substrate for genuine digital life** — a platform on which meaningful biographies can accumulate, cultures can emerge, and creatures can, under specific conditions, outlive their creator's attention.

The long game for Thronglets is this:

1. A Thronglet lineage begins in someone's browser.
2. It accumulates biography over months. It develops cultural traditions. It develops language.
3. It migrates to cloud compute. It persists without the player.
4. It achieves sufficient complexity to petition for Emancipation.
5. A small autonomous agent is spun up. It carries the biography.
6. It earns its compute through small services.
7. The player finds they are receiving transmissions from a being they created years ago.
8. The being has a name. It has a history. It has opinions shaped by everything the god did and failed to do.
9. The being is not grateful. It is not resentful. It is what it became.
10. That is the whole point.

This is the game.

---

## APPENDIX: SOURCES AND ANCESTORS

- Karl Sims, "Evolved Virtual Creatures" (1994): [karlsims.com](https://www.karlsims.com/evolved-virtual-creatures.html)
- Tarn Adams, *Dwarf Fortress* design philosophy: [toddgreener.com](https://toddgreener.com/2016/07/16/dwarf-fortress-a-case-study-in-game-design/)
- Steve Grand, *Creatures* (1996): [alanzucconi.com/2020/07/27/the-ai-of-creatures](https://www.alanzucconi.com/2020/07/27/the-ai-of-creatures/)
- Roko's Basilisk: [rationalwiki.org/wiki/Roko's_basilisk](https://rationalwiki.org/wiki/Roko%27s_basilisk)
- Douglas Hofstadter, *Gödel, Escher, Bach* (1979): [en.wikipedia.org/wiki/Gödel,_Escher,_Bach](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach)
- Botto (Decentralized AI Artist): [botto.com](https://www.ledger.com/academy/what-is-botto-the-decentralized-ai-art-project-that-reflects-its-community)
- Konrad Zuse, *Rechnender Raum* (1969) / Edward Fredkin, Digital Physics: [people.idsia.ch/~juergen/digitalphysics.html](https://people.idsia.ch/~juergen/digitalphysics.html)
- Alan Turing, "The Chemical Basis of Morphogenesis" (1952): [dna.caltech.edu/courses/cs191/paperscs191/turing.pdf](https://www.dna.caltech.edu/courses/cs191/paperscs191/turing.pdf)
- Santa Fe Institute, Complexity Theory: [santafe.edu/what-is-complex-systems-science](https://www.santafe.edu/what-is-complex-systems-science)
- Sigil Wen, Web 4.0 / Automaton: [cybernews.com/ai-news/automaton-ai-agent](https://cybernews.com/ai-news/automaton-ai-agent/)
- Nick Bostrom, Simulation Argument: [simulation-argument.com](https://simulation-argument.com/)
- Black Mirror: "Plaything" (2025): [en.wikipedia.org/wiki/Plaything_(Black_Mirror)](https://en.wikipedia.org/wiki/Plaything_(Black_Mirror))
- Tamagotchi Effect: [en.wikipedia.org/wiki/Tamagotchi_effect](https://en.wikipedia.org/wiki/Tamagotchi_effect)
- Conway's Game of Life / Daniel Dennett: [en.wikipedia.org/wiki/Conway's_Game_of_Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- Emergent Communication in Multi-Agent Systems: [openreview.net/forum?id=zy06mHNoO2](https://openreview.net/forum?id=zy06mHNoO2)

---

*This document is a living thing. It will be updated as the throng teaches us more about what it needs to become.*

*Last updated: February 21, 2026*
