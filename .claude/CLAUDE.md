# claude-agents repo instructions

## Design Mission

The dashboard is a living thing. Not a monitoring tool — a presence.

**Aesthetic DNA**: Severance (Lumon MDR's cold void, data floating in darkness), Black Mirror: Bandersnatch (ZX Spectrum palette, hard-cut transitions, character-by-character text), Black Mirror: Plaything (care-taking creates obligation, visible neglect, the Tamagotchi effect), Sigil/Conway (real stakes, agents that live and die, genuine fragility).

**Core rules**:
- Real vitality, not fake animation — every visual effect driven by real telemetry
- Constraint creates trust — fewer capabilities, more confidence in each one
- Simple verbs, deep weight — the simpler the interaction, the more emotional bandwidth
- Alive through subtlety — breathing borders, heartbeat cursor, one-frame flickers. Subliminal.
- Care-taking as the core verb — you tend to agents, not monitor them
- Hard cuts, not smooth transitions — state changes snap instantly

See `docs/plans/2026-02-20-alive-console-design.md` for the full design document.

## Changelog style
Modeled after [cursor.com/changelog](https://cursor.com/changelog).

- **Date + version header**: `## v0.2.0 — Feb 25, 2026`
- **Named feature sections**: `### Feature Name` (not `### Added`)
- **User-benefit tone**: describe what the user *gets*, not what changed internally
- **Short but complete**: 1–3 sentences per feature, code snippet if it helps
- **No bullet soup**: prose paragraphs, not a list of diff lines
- File: `CHANGELOG.md` in repo root, newest version at the top

## Release process
1. Bump `VERSION` in `claude-agents` (e.g. `0.2.0`)
2. Update `CHANGELOG.md` with new entry (Cursor-style)
3. Replace the hero image in `README.md` (line 5, the `<img>` tag) with the latest screenshot
4. Commit: `git commit -m "feat: vX.Y.Z — <headline>"`
5. Tag + push: `git tag vX.Y.Z && git push && git push origin vX.Y.Z`
6. Create GitHub release: `gh release create vX.Y.Z --title "vX.Y.Z — <headline>" --notes "..." --attach screenshot.png`

**README image**: Always swap the hero `<img>` on README line 5 with the latest release screenshot. Ask the user to provide the new GitHub-hosted image URL (upload via the GitHub Release or issue, then copy the URL).

## Versioning
- `PATCH` (0.1.x) — bug fixes only
- `MINOR` (0.x.0) — new features, backward compatible
- `MAJOR` (x.0.0) — breaking changes
