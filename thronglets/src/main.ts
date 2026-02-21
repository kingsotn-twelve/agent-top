/**
 * Thronglets — retro pixel-art god-game inspired by Black Mirror: Plaything
 *
 * Isometric world with yellow fuzzy creatures that need feeding, cleaning,
 * and playing with. They multiply when happy. They die when neglected.
 * The population grows exponentially. You can't keep up. That's the point.
 */

// ── TYPES ──────────────────────────────────────────────────

interface Creature {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hunger: number;
  clean: number;
  happiness: number;
  age: number;
  alive: boolean;
  diedAt: number;
  splitTimer: number;
  state: 'idle' | 'walking' | 'eating' | 'bathing' | 'playing' | 'dying';
  stateTimer: number;
  animFrame: number;
  size: number;
  bobPhase: number;
  // LLM outcome fields
  id?: string;
  eventLog?: string[];
  visualEffect?: string;
  visualEffectTimer?: number;
  // food-seeking
  targetFood?: FoodItem | null;
}

interface FoodItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vz: number;   // vertical velocity (world-space Z / height)
  z: number;    // current height above ground
  eaten: boolean;
  spawnedAt: number;
}

interface Tree {
  x: number;
  y: number;
  type: 'apple';
  health: number;
  regrowTimer: number;
}

type ToolType = 'feed' | 'clean' | 'play' | 'chop';

interface GameState {
  creatures: Creature[];
  trees: Tree[];
  food: FoodItem[];
  resources: { wood: number; gems: number };
  tool: ToolType;
  tick: number;
  camera: { x: number; y: number };
  mouseWorld: { x: number; y: number };
  mouseScreen: { x: number; y: number };
  lastEvent: string;
  lastEventTimer: number;
}

// ── CONSTANTS ──────────────────────────────────────────────

const TILE_W = 48;
const TILE_H = 24;
const WORLD_W = 16;
const WORLD_H = 16;

const COLORS = {
  grass: ['#2d5a27', '#3a7d32', '#4a9a3c', '#3a7d32'] as const,
  dirt: '#8b6914',
  treeTrunk: '#5c3a1e',
  treeLeaf: '#2d8a2e',
  creature: '#ffd700',
  creatureHappy: '#ffe44d',
  creatureSad: '#cc9900',
  creatureDead: '#666666',
  food: '#ff4444',
  pollution: '#8833aa',
} as const;

// ── GAME STATE ─────────────────────────────────────────────

const state: GameState = {
  creatures: [],
  trees: [],
  food: [],
  resources: { wood: 0, gems: 0 },
  tool: 'feed',
  tick: 0,
  camera: { x: 0, y: 0 },
  mouseWorld: { x: 0, y: 0 },
  mouseScreen: { x: 0, y: 0 },
  lastEvent: '',
  lastEventTimer: 0,
};

// ── FACTORIES ──────────────────────────────────────────────

function createCreature(wx: number, wy: number): Creature {
  return {
    x: wx, y: wy, vx: 0, vy: 0,
    hunger: 100, clean: 100, happiness: 100,
    age: 0, alive: true, diedAt: 0, splitTimer: 0,
    state: 'idle', stateTimer: 0, animFrame: 0,
    size: 1, bobPhase: Math.random() * Math.PI * 2,
    id: Math.random().toString(36).slice(2, 9),
    eventLog: [],
    visualEffect: 'normal',
    visualEffectTimer: 0,
    targetFood: null,
  };
}

function createTree(wx: number, wy: number): Tree {
  return { x: wx, y: wy, type: 'apple', health: 3, regrowTimer: 0 };
}

function createFood(wx: number, wy: number): FoodItem {
  return {
    x: wx,
    y: wy,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    vz: 2 + Math.random() * 1.5,  // initial upward velocity (dropped from hand)
    z: 1.5,                         // start slightly above ground
    eaten: false,
    spawnedAt: state.tick,
  };
}

// ── ISO PROJECTION ─────────────────────────────────────────

function worldToScreen(wx: number, wy: number): { x: number; y: number } {
  return {
    x: (wx - wy) * (TILE_W / 2) + state.camera.x,
    y: (wx + wy) * (TILE_H / 2) + state.camera.y,
  };
}

function screenToWorld(sx: number, sy: number): { x: number; y: number } {
  const cx = sx - state.camera.x;
  const cy = sy - state.camera.y;
  return {
    x: (cx / (TILE_W / 2) + cy / (TILE_H / 2)) / 2,
    y: (cy / (TILE_H / 2) - cx / (TILE_W / 2)) / 2,
  };
}

function screenToWorldTile(sx: number, sy: number): { x: number; y: number } {
  const w = screenToWorld(sx, sy);
  return { x: Math.floor(w.x), y: Math.floor(w.y) };
}

// ── DRAWING ────────────────────────────────────────────────

function drawPixelRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
}

function drawIsoDiamond(ctx: CanvasRenderingContext2D, sx: number, sy: number, color: string): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(sx, sy - TILE_H / 2);
  ctx.lineTo(sx + TILE_W / 2, sy);
  ctx.lineTo(sx, sy + TILE_H / 2);
  ctx.lineTo(sx - TILE_W / 2, sy);
  ctx.closePath();
  ctx.fill();
}

function drawTree(ctx: CanvasRenderingContext2D, sx: number, sy: number, tree: Tree): void {
  // Trunk
  drawPixelRect(ctx, sx - 3, sy - 28, 6, 20, COLORS.treeTrunk);
  // Canopy
  const leafColor = tree.health > 0 ? COLORS.treeLeaf : '#555';
  ctx.fillStyle = leafColor;
  ctx.beginPath();
  ctx.arc(sx, sy - 34, 14, 0, Math.PI * 2);
  ctx.fill();
  // Darker leaf layer for depth
  ctx.fillStyle = '#1a6e1f';
  ctx.beginPath();
  ctx.arc(sx + 3, sy - 30, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = leafColor;
  ctx.beginPath();
  ctx.arc(sx - 2, sy - 36, 11, 0, Math.PI * 2);
  ctx.fill();
  // Apples
  if (tree.type === 'apple' && tree.health > 0) {
    drawPixelRect(ctx, sx - 6, sy - 38, 4, 4, COLORS.food);
    drawPixelRect(ctx, sx + 4, sy - 32, 4, 4, COLORS.food);
    drawPixelRect(ctx, sx - 1, sy - 28, 4, 4, COLORS.food);
  }
}

function drawFood(ctx: CanvasRenderingContext2D, item: FoodItem): void {
  if (item.eaten) return;

  const { x: sx, y: sy } = worldToScreen(item.x, item.y);

  // Height offset — food appears to float above ground
  // In isometric view, height (z) translates to negative screen y
  const screenYOffset = item.z * TILE_H;

  const scale = 1 + item.z * 0.1;
  const radius = 5 * scale;

  // Shadow on ground (drawn first, beneath everything)
  const shadowAlpha = Math.max(0.1, 0.5 - item.z * 0.08);
  ctx.globalAlpha = shadowAlpha;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.ellipse(sx, sy, radius * 0.9, radius * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Apple body
  ctx.fillStyle = COLORS.food;
  ctx.beginPath();
  ctx.arc(sx, sy - screenYOffset, radius, 0, Math.PI * 2);
  ctx.fill();

  // Highlight
  ctx.fillStyle = 'rgba(255,200,200,0.6)';
  ctx.beginPath();
  ctx.arc(sx - radius * 0.3, sy - screenYOffset - radius * 0.2, radius * 0.35, 0, Math.PI * 2);
  ctx.fill();

  // Stem
  ctx.strokeStyle = '#5c3a1e';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sx, sy - screenYOffset - radius);
  ctx.lineTo(sx + 2, sy - screenYOffset - radius - 4);
  ctx.stroke();
}

function drawCreature(ctx: CanvasRenderingContext2D, sx: number, sy: number, creature: Creature, tick: number): void {
  if (!creature.alive) return;

  const bob = Math.sin(creature.bobPhase + tick * 0.08) * 2;
  let cy = sy + bob;

  let bodyColor: string;
  if (creature.hunger < 20 || creature.clean < 20 || creature.happiness < 20) {
    bodyColor = COLORS.creatureSad;
  } else {
    bodyColor = creature.happiness > 70 ? COLORS.creatureHappy : COLORS.creature;
  }

  let s = 12 + Math.min(creature.age / 200, 4);
  const vEffect = creature.visualEffect || 'normal';
  const vTimer = creature.visualEffectTimer || 0;

  // Visual effects: grow / shrink scale
  if (vEffect === 'grow') s *= 1.5;
  if (vEffect === 'shrink') s *= 0.5;

  ctx.save();

  // Visual effect: spin — rotate around creature center
  if (vEffect === 'spin') {
    const angle = (30 - vTimer) * 0.3;
    ctx.translate(sx, cy - s);
    ctx.rotate(angle);
    ctx.translate(-sx, -(cy - s));
  }

  // Visual effect: flash_yellow halo
  if (vEffect === 'flash_yellow') {
    ctx.fillStyle = 'rgba(255, 255, 0, 0.35)';
    ctx.beginPath();
    ctx.arc(sx, cy - s, s * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Visual effect: flash_red overlay (drawn after body)
  // Body
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(sx, cy - s, s, s * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();

  if (vEffect === 'flash_red') {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(sx, cy - s, s, s * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Eyes
  const eyeY = cy - s * 0.4;
  drawPixelRect(ctx, sx - s * 0.35, eyeY, 3, 3, '#000');
  drawPixelRect(ctx, sx + s * 0.15, eyeY, 3, 3, '#000');

  // Mouth
  if (creature.happiness > 50) {
    drawPixelRect(ctx, sx - s * 0.2, eyeY + s * 0.4, Math.max(3, s * 0.3), 2, '#000');
  } else {
    drawPixelRect(ctx, sx - s * 0.2, eyeY + s * 0.5, Math.max(3, s * 0.3), 2, '#000');
  }

  // Need indicators
  if (creature.hunger < 30) {
    ctx.fillStyle = COLORS.food;
    ctx.font = '10px monospace';
    ctx.fillText('!', sx - 2, cy - s * 2 - 6);
  }
  if (creature.clean < 30) {
    ctx.fillStyle = '#88aaff';
    ctx.font = '10px monospace';
    ctx.fillText('~', sx + 4, cy - s * 2 - 6);
  }

  ctx.restore();
}

// ── INDEXEDDB PERSISTENCE ──────────────────────────────────

function saveCreatureEvent(creature: Creature, tool: string, outcome: Record<string, unknown>): void {
  const req = indexedDB.open('thronglets', 1);
  req.onupgradeneeded = () => {
    req.result.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
  };
  req.onsuccess = () => {
    const db = req.result;
    const tx = db.transaction('events', 'readwrite');
    tx.objectStore('events').add({
      throng_id: creature.id,
      tool,
      event: outcome.event,
      log: outcome.log,
      hunger_after: creature.hunger,
      happiness_after: creature.happiness,
      timestamp: Date.now(),
    });
  };
}

// ── LLM TOOL OUTCOMES ──────────────────────────────────────

async function applyToolToCreature(tool: ToolType, creature: Creature): Promise<void> {
  const apiKey = (window as unknown as Record<string, string>)['__ANTHROPIC_KEY__'] || '';
  if (!apiKey) {
    // Fallback deterministic behavior
    if (tool === 'feed') feedCreature(creature);
    else if (tool === 'clean') cleanCreature(creature);
    else if (tool === 'play') playWithCreature(creature);
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        system: `You are the physics engine for a creature in a retro god-game.
A player applied a tool to a creature. Define what happens — be creative and unexpected.
The player expects the unexpected. Tools don't always do what they say.
Return ONLY valid JSON, no other text.`,
        messages: [{
          role: 'user',
          content: `Tool: ${tool}
Creature state: hunger=${Math.round(creature.hunger)}, clean=${Math.round(creature.clean)}, happiness=${Math.round(creature.happiness)}, age=${Math.round(creature.age)}
Recent events: ${creature.eventLog?.slice(-3).join(', ') || 'none'}

Define the outcome. Return JSON:
{
  "event": "short event name",
  "log": "one sentence describing what happened in 2nd person",
  "hunger_delta": number (-50 to +60),
  "clean_delta": number (-30 to +50),
  "happiness_delta": number (-40 to +60),
  "vx": number (-3 to 3),
  "vy": number (-3 to 3),
  "visual": "normal" | "flash_yellow" | "flash_red" | "spin" | "grow" | "shrink",
  "split": boolean
}`,
        }],
      }),
    });

    const data = await response.json() as { content?: Array<{ text: string }> };
    const text = data.content?.[0]?.text || '{}';

    try {
      const outcome = JSON.parse(text) as {
        event?: string;
        log?: string;
        hunger_delta?: number;
        clean_delta?: number;
        happiness_delta?: number;
        vx?: number;
        vy?: number;
        visual?: string;
        split?: boolean;
      };

      // Apply outcome
      creature.hunger = Math.max(0, Math.min(100, creature.hunger + (outcome.hunger_delta || 0)));
      creature.clean = Math.max(0, Math.min(100, creature.clean + (outcome.clean_delta || 0)));
      creature.happiness = Math.max(0, Math.min(100, creature.happiness + (outcome.happiness_delta || 0)));
      creature.vx = outcome.vx || 0;
      creature.vy = outcome.vy || 0;
      creature.visualEffect = outcome.visual || 'normal';
      creature.visualEffectTimer = 30;

      if (outcome.split && state.creatures.length < 20) {
        const child = createCreature(creature.x + 1, creature.y + 1);
        state.creatures.push(child);
      }

      // Log to creature history
      if (!creature.eventLog) creature.eventLog = [];
      creature.eventLog.push(outcome.log || outcome.event || '');
      if (creature.eventLog.length > 10) creature.eventLog.shift();

      // Save to IndexedDB
      saveCreatureEvent(creature, tool, outcome as Record<string, unknown>);

      // Show log message on screen
      state.lastEvent = outcome.log || outcome.event || '';
      state.lastEventTimer = 180;

    } catch (_parseErr) {
      // Fallback on JSON parse failure
      feedCreature(creature);
    }
  } catch (_fetchErr) {
    // Network/API error fallback
    feedCreature(creature);
  }
}

// ── GAME LOGIC ─────────────────────────────────────────────

function updateFood(dt: number): void {
  for (const item of state.food) {
    if (item.eaten) continue;

    // Expire after 600 ticks
    if (state.tick - item.spawnedAt > 600) {
      item.eaten = true;
      continue;
    }

    // Physics: gravity on z
    item.vz -= dt * 0.4;
    item.z = Math.max(0, item.z + item.vz * dt);

    if (item.z <= 0 && item.vz < 0) {
      item.vz = Math.abs(item.vz) * 0.4;  // bounce with damping
      if (item.vz < 0.5) item.vz = 0;      // settle
    }

    // Slight roll on ground
    if (item.z === 0) {
      item.x += item.vx * dt * 0.3;
      item.y += item.vy * dt * 0.3;
      // Clamp to world bounds
      item.x = Math.max(0, Math.min(WORLD_W - 1, item.x));
      item.y = Math.max(0, Math.min(WORLD_H - 1, item.y));
    }
  }

  // Remove eaten items
  state.food = state.food.filter(f => !f.eaten);
}

function updateCreature(c: Creature, dt: number): void {
  if (!c.alive) return;

  c.age += dt;
  c.hunger = Math.max(0, c.hunger - dt * 0.03);
  c.clean = Math.max(0, c.clean - dt * 0.02);
  c.happiness = Math.max(0, c.happiness - dt * 0.015);
  c.bobPhase += dt * 0.1;
  c.stateTimer -= dt;

  // Decrement visual effect timer
  if (c.visualEffectTimer && c.visualEffectTimer > 0) {
    c.visualEffectTimer -= dt;
    if (c.visualEffectTimer <= 0) {
      c.visualEffectTimer = 0;
      c.visualEffect = 'normal';
    }
  }

  if (c.hunger <= 0) {
    c.alive = false;
    c.diedAt = state.tick;
    c.state = 'dying';
    return;
  }

  if (c.hunger > 60 && c.clean > 60) {
    c.happiness = Math.min(100, c.happiness + dt * 0.3);
  }

  // Split when happy enough for long enough
  if (c.happiness > 70 && c.hunger > 50 && c.clean > 50) {
    c.splitTimer += dt;
    if (c.splitTimer > 500) {
      c.splitTimer = 0;
      const newC = createCreature(
        c.x + (Math.random() - 0.5) * 3,
        c.y + (Math.random() - 0.5) * 3
      );
      newC.hunger = 60;
      newC.clean = 80;
      newC.happiness = 80;
      state.creatures.push(newC);
    }
  }

  // Food-seeking behavior: wander toward nearest food within 3 world units
  let nearestFood: FoodItem | null = null;
  let nearestFoodDist = Infinity;
  for (const f of state.food) {
    if (f.eaten || f.z > 0.5) continue; // only ground food
    const dist = Math.sqrt((c.x - f.x) ** 2 + (c.y - f.y) ** 2);
    if (dist < 3 && dist < nearestFoodDist) {
      nearestFood = f;
      nearestFoodDist = dist;
    }
  }

  if (nearestFood) {
    // Walk toward food
    const dx = nearestFood.x - c.x;
    const dy = nearestFood.y - c.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag > 0.15) {
      c.state = 'walking';
      c.vx = (dx / mag) * 0.25;
      c.vy = (dy / mag) * 0.25;
      c.stateTimer = 10;
    } else {
      // Close enough — eat it
      nearestFood.eaten = true;
      c.hunger = Math.min(100, c.hunger + 40);
      c.happiness = Math.min(100, c.happiness + 5);
      c.state = 'eating';
      c.stateTimer = 30;
      c.vx = 0;
      c.vy = 0;
    }
  } else {
    // Random wandering (only if not in food-seek mode)
    if (c.state === 'idle' && c.stateTimer <= 0) {
      c.state = 'walking';
      c.vx = (Math.random() - 0.5) * 0.3;
      c.vy = (Math.random() - 0.5) * 0.3;
      c.stateTimer = 50 + Math.random() * 100;
    } else if (c.state === 'walking' && c.stateTimer <= 0) {
      c.state = 'idle';
      c.vx = 0;
      c.vy = 0;
      c.stateTimer = 30 + Math.random() * 80;
    }
  }

  c.x = Math.max(0, Math.min(WORLD_W - 1, c.x + c.vx * dt));
  c.y = Math.max(0, Math.min(WORLD_H - 1, c.y + c.vy * dt));
}

function feedCreature(c: Creature): void {
  if (!c.alive) return;
  c.hunger = Math.min(100, c.hunger + 40);
  c.happiness = Math.min(100, c.happiness + 10);
  c.state = 'eating';
  c.stateTimer = 30;
}

function cleanCreature(c: Creature): void {
  if (!c.alive) return;
  c.clean = Math.min(100, c.clean + 50);
  c.happiness = Math.min(100, c.happiness + 10);
  c.state = 'bathing';
  c.stateTimer = 30;
}

function playWithCreature(c: Creature): void {
  if (!c.alive) return;
  c.happiness = Math.min(100, c.happiness + 30);
  c.state = 'playing';
  c.stateTimer = 40;
}

// ── WORLD GENERATION ───────────────────────────────────────

function initWorld(): void {
  for (let i = 0; i < 8; i++) {
    state.trees.push(createTree(
      3 + Math.floor(Math.random() * (WORLD_W - 6)),
      3 + Math.floor(Math.random() * (WORLD_H - 6))
    ));
  }
  for (let i = 0; i < 3; i++) {
    state.creatures.push(createCreature(
      WORLD_W / 2 + (Math.random() - 0.5) * 4,
      WORLD_H / 2 + (Math.random() - 0.5) * 4
    ));
  }
  console.log(`World init: ${state.creatures.length} creatures, ${state.trees.length} trees`);
}

// ── RENDER ─────────────────────────────────────────────────

function render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, tick: number): void {
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, w, h);

  // Center camera so world middle is at screen center
  const midWx = WORLD_W / 2;
  const midWy = WORLD_H / 2;
  state.camera.x = w / 2 - (midWx - midWy) * (TILE_W / 2);
  state.camera.y = h / 2 - (midWx + midWy) * (TILE_H / 2);

  // Ground tiles
  for (let wy = 0; wy < WORLD_H; wy++) {
    for (let wx = 0; wx < WORLD_W; wx++) {
      const { x: sx, y: sy } = worldToScreen(wx, wy);
      if (sx < -TILE_W * 2 || sx > w + TILE_W * 2 || sy < -TILE_H * 2 || sy > h + TILE_H * 2) continue;
      drawIsoDiamond(ctx, sx, sy, COLORS.grass[(wx * 7 + wy * 13) % 4]);
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy - TILE_H / 2);
      ctx.lineTo(sx + TILE_W / 2, sy);
      ctx.lineTo(sx, sy + TILE_H / 2);
      ctx.lineTo(sx - TILE_W / 2, sy);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Trees (depth sorted)
  [...state.trees].sort((a, b) => (a.x + a.y) - (b.x + b.y)).forEach(tree => {
    const { x: sx, y: sy } = worldToScreen(tree.x, tree.y);
    drawTree(ctx, sx, sy, tree);
  });

  // Food items (draw shadows first, then apples)
  for (const item of state.food) {
    if (!item.eaten) drawFood(ctx, item);
  }

  // Alive creatures (depth sorted)
  state.creatures.filter(c => c.alive)
    .sort((a, b) => (a.x + a.y) - (b.x + b.y))
    .forEach(c => {
      const { x: sx, y: sy } = worldToScreen(c.x, c.y);
      drawCreature(ctx, sx, sy, c, tick);
    });

  // Dead creatures fade out
  state.creatures.filter(c => !c.alive).forEach(c => {
    const { x: sx, y: sy } = worldToScreen(c.x, c.y);
    ctx.fillStyle = COLORS.creatureDead;
    ctx.globalAlpha = Math.max(0, 1 - (tick - c.diedAt) / 300);
    ctx.beginPath();
    ctx.arc(sx, sy - 4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Hover indicator
  const hw = state.mouseWorld;
  if (hw.x >= 0 && hw.x < WORLD_W && hw.y >= 0 && hw.y < WORLD_H) {
    const { x: sx, y: sy } = worldToScreen(hw.x, hw.y);
    ctx.strokeStyle = state.tool === 'feed' ? 'rgba(255, 100, 100, 0.5)' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy - TILE_H / 2);
    ctx.lineTo(sx + TILE_W / 2, sy);
    ctx.lineTo(sx, sy + TILE_H / 2);
    ctx.lineTo(sx - TILE_W / 2, sy);
    ctx.closePath();
    ctx.stroke();
  }

  // Event log — scrolling dim green text at bottom-left (Plaything vibes)
  if (state.lastEvent && state.lastEventTimer > 0) {
    ctx.globalAlpha = Math.min(1, state.lastEventTimer / 30);
    ctx.fillStyle = '#00ff88';
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillText(`> ${state.lastEvent.slice(0, 50)}`, 12, h - 8);
    ctx.globalAlpha = 1;
  }
}

// ── HUD ────────────────────────────────────────────────────

function updateHUD(): void {
  const alive = state.creatures.filter(c => c.alive).length;
  document.getElementById('population')!.textContent = `Pop: ${alive}`;
  document.getElementById('wood')!.textContent = `Wood: ${state.resources.wood}`;
  document.getElementById('gems')!.textContent = `Gems: ${state.resources.gems}`;
}

// ── INPUT ──────────────────────────────────────────────────

function setupInput(canvas: HTMLCanvasElement): void {
  document.querySelectorAll<HTMLButtonElement>('.tool').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tool').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.tool = btn.dataset.tool as ToolType;
    });
  });

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    state.mouseScreen = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    state.mouseWorld = screenToWorldTile(state.mouseScreen.x, state.mouseScreen.y);
  });

  canvas.addEventListener('click', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const sx = (e.clientX - rect.left) * scaleX;
    const sy = (e.clientY - rect.top) * scaleY;
    // Use fractional world coords for accurate creature click detection
    const { x: wx, y: wy } = screenToWorld(sx, sy);

    // Feed tool: drop food at click position (not direct-feed)
    if (state.tool === 'feed') {
      const food = createFood(wx, wy);
      state.food.push(food);
      return;
    }

    // Find nearest alive creature within 2.5 world units
    let nearest: Creature | null = null;
    let nearestDist = Infinity;
    for (const c of state.creatures) {
      if (!c.alive) continue;
      const dist = (c.x - wx) ** 2 + (c.y - wy) ** 2;
      if (dist < nearestDist && dist < 6.25) {
        nearest = c;
        nearestDist = dist;
      }
    }

    if (nearest) {
      // Call LLM to define outcome for any non-feed tool
      void applyToolToCreature(state.tool, nearest);
    }

    if (state.tool === 'chop') {
      let nearestTree: Tree | null = null;
      let nearestTreeDist = Infinity;
      for (const t of state.trees) {
        if (t.health <= 0) continue;
        const dist = (t.x - wx) ** 2 + (t.y - wy) ** 2;
        if (dist < nearestTreeDist && dist < 6.25) {
          nearestTree = t;
          nearestTreeDist = dist;
        }
      }
      if (nearestTree) {
        nearestTree.health--;
        state.resources.wood += 2;
        if (nearestTree.health <= 0) state.resources.wood += 3;
      }
    }
  });
}

// ── MAIN ───────────────────────────────────────────────────

function main(): void {
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  // Read API key from localStorage or URL param
  const key = localStorage.getItem('anthropic_key') || new URLSearchParams(window.location.search).get('key') || '';
  (window as unknown as Record<string, string>)['__ANTHROPIC_KEY__'] = key;
  if (!key) {
    console.warn('No ANTHROPIC_API_KEY — using deterministic fallback. Set via ?key=sk-... or localStorage.anthropic_key');
  }

  function resize(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 48;
  }
  resize();
  window.addEventListener('resize', resize);

  initWorld();
  setupInput(canvas);

  {
    let lastTime = performance.now();

    function loop(now: number): void {
      const dt = Math.min((now - lastTime) / 16.67, 3);
      lastTime = now;
      state.tick++;

      // Update food physics
      updateFood(dt);

      for (const c of state.creatures) {
        updateCreature(c, dt);
      }

      state.creatures = state.creatures.filter(c =>
        c.alive || (state.tick - c.diedAt) < 300
      );

      // Tick down event log timer
      if (state.lastEventTimer > 0) {
        state.lastEventTimer -= dt;
      }

      render(ctx, canvas, state.tick);
      updateHUD();
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }
}

main();
