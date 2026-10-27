import { Builder } from '../builder.js';

// A Hogwarts-inspired castle: a cliff-top island in a lake, a long great hall,
// a courtyard block, a cluster of tall spired towers, a zig-zag stone stairway
// down to a boathouse with a dock, and spruce trees on the slopes.
//
// Local coordinates: x = east, z = south, y = 0 is the lake's water surface.
// The origin is placed one block below the player's feet, so the player ends
// up standing at the lake's edge facing the island to the north.

const B = {
  wall: 'stone_bricks',
  trim: 'polished_andesite',
  roof: 'deepslate_tiles',
  window: 'glass_pane',
  terrain: 'stone',
  grass: 'grass_block',
  sand: 'sand',
  path: 'stone_bricks',
  wood: 'dark_oak_planks',
  dock: 'spruce_planks',
  log: 'spruce_log',
  leaves: 'spruce_leaves',
  spire: 'iron_bars',
  water: 'water',
};

const LAKE = 64;      // lake half-width
const FLOOR = -6;     // lake bed
const SKY = 80;       // clear everything up to here
const PLATEAU = 14;   // height of the castle plateau
const F = PLATEAU + 1; // first floor of the castle

export function buildCastle(origin) {
  const b = new Builder(origin);
  b.raw('say §6Building the castle... stand by!');

  // 1. Clear the area and make the lake.
  b.phase('clear area');
  b.fill(-LAKE, 1, -LAKE, LAKE, SKY, LAKE, 'air');
  b.phase('lake');
  b.fill(-LAKE, FLOOR, -LAKE, LAKE, FLOOR, LAKE, B.sand);
  b.fill(-LAKE, FLOOR + 1, -LAKE, LAKE, 0, LAKE, B.water);

  // 2. Island terrain from a height map, one fill per run of equal columns.
  b.phase('island');
  const heights = terrain(b);

  // 3. Castle buildings.
  b.phase('castle');
  greatHall(b);
  courtyard(b);
  terrace(b);

  b.phase('towers');
  for (const t of TOWERS) tower(b, t);

  // 4. Stairway down to the boathouse.
  b.phase('stairway');
  const pathCells = stairway(b, heights);

  b.phase('boathouse');
  boathouse(b);

  b.phase('trees');
  trees(b, heights, pathCells);

  b.phase('finish');
  b.raw(`tp @s ${abs(origin, 58, 30, 78)} facing ${abs(origin, 0, 22, -24)}`);
  b.raw('say §aThe castle is finished. Welcome!');
  return b;
}

// ---------------------------------------------------------------- terrain

function hash(x, z) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smoothNoise(x, z, cell = 7) {
  const gx = Math.floor(x / cell), gz = Math.floor(z / cell);
  const fx = x / cell - gx, fz = z / cell - gz;
  const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
  const a = hash(gx, gz), c = hash(gx + 1, gz), d = hash(gx, gz + 1), e = hash(gx + 1, gz + 1);
  return a + (c - a) * sx + (d - a) * sz + (a - c - d + e) * sx * sz;
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));

function bump(x, z, cx, cz, rx, rz, height, steep, wobble = 0) {
  const n = (smoothNoise(x, z) - 0.5) * wobble;
  const d = Math.hypot((x - cx) / rx, (z - cz) / rz) + n;
  return height * clamp01((1 - d) * steep);
}

export function terrainHeight(x, z) {
  const plateau = Math.min(PLATEAU, bump(x, z, 0, -22, 50, 27, PLATEAU, 5, 0.25));
  const slope = bump(x, z, 12, 10, 24, 24, 9, 1.4, 0.3);
  const tip = bump(x, z, 16, 38, 15, 13, 3, 3, 0.3);
  const west = bump(x, z, -34, 4, 15, 13, 4, 2.2, 0.4);
  const h = Math.max(plateau, slope, tip, west);
  if (h <= 0.4) return 0; // water
  const rough = h < PLATEAU ? (smoothNoise(x + 99, z - 99, 4) - 0.5) * 2 : 0;
  return Math.max(1, Math.min(PLATEAU, Math.round(h + rough)));
}

function terrain(b) {
  const H = new Map();
  const key = (x, z) => `${x},${z}`;
  for (let z = -LAKE; z <= LAKE; z++) for (let x = -LAKE; x <= LAKE; x++) H.set(key(x, z), terrainHeight(x, z));
  const h = (x, z) => H.get(key(x, z)) ?? 0;

  const topBlock = (x, z) => {
    const y = h(x, z);
    if (y <= 2) return B.sand;
    const drop = Math.max(y - h(x + 1, z), y - h(x - 1, z), y - h(x, z + 1), y - h(x, z - 1));
    return drop >= 3 ? B.terrain : B.grass; // bare rock on cliff edges
  };

  for (let z = -LAKE; z <= LAKE; z++) {
    let x = -LAKE;
    while (x <= LAKE) {
      const y = h(x, z);
      if (y === 0) { x++; continue; }
      const top = topBlock(x, z);
      let end = x;
      while (end + 1 <= LAKE && h(end + 1, z) === y && topBlock(end + 1, z) === top) end++;
      b.fill(x, FLOOR + 1, z, end, y - 1, z, B.terrain);
      b.fill(x, y, z, end, y, z, top);
      x = end + 1;
    }
  }
  return h;
}

// ---------------------------------------------------------------- castle

function windowsAlongX(b, x1, x2, z, y1, y2, every = 4) {
  for (let x = x1; x <= x2; x += every) b.fill(x, y1, z, x, y2, z, B.window);
}

function windowsAlongZ(b, z1, z2, x, y1, y2, every = 4) {
  for (let z = z1; z <= z2; z += every) b.fill(x, y1, z, x, y2, z, B.window);
}

/** Gable roof running along X over the box [x1..x2] x [z1..z2], starting at height y. */
function roofAlongX(b, x1, x2, z1, z2, y) {
  for (let i = 0; z1 - 1 + i <= z2 + 1 - i; i++) b.fill(x1 - 1, y + i, z1 - 1 + i, x2 + 1, y + i, z2 + 1 - i, B.roof);
}

function roofAlongZ(b, x1, x2, z1, z2, y) {
  for (let i = 0; x1 - 1 + i <= x2 + 1 - i; i++) b.fill(x1 - 1 + i, y + i, z1 - 1, x2 + 1 - i, y + i, z2 + 1, B.roof);
}

function foundation(b, x1, z1, x2, z2) {
  b.fill(x1, 4, z1, x2, PLATEAU, z2, B.wall); // anchors buildings that overhang the cliff
}

function greatHall(b) {
  const [x1, x2, z1, z2, top] = [-36, -6, -38, -24, F + 14];
  foundation(b, x1, z1, x2, z2);
  b.fill(x1, F, z1, x2, top, z2, B.wall, 'hollow');
  b.fill(x1 + 1, F, z1 + 1, x2 - 1, F, z2 - 1, B.trim); // floor
  windowsAlongX(b, x1 + 3, x2 - 3, z2, F + 3, F + 10);
  windowsAlongX(b, x1 + 3, x2 - 3, z1, F + 3, F + 10);
  // Buttresses on the south face.
  for (let x = x1 + 1; x <= x2 - 1; x += 4) b.fill(x, F, z2 + 1, x, F + 9, z2 + 1, B.trim);
  roofAlongX(b, x1, x2, z1, z2, top + 1);
}

function courtyard(b) {
  const top = F + 11;
  const wings = [
    [2, 38, -42, -36], // north
    [2, 38, -18, -12], // south
    [2, 8, -42, -12],  // west
    [32, 38, -42, -12], // east
  ];
  foundation(b, 2, -42, 38, -12);
  for (const [x1, x2, z1, z2] of wings) b.fill(x1, F, z1, x2, top, z2, B.wall, 'hollow');
  // Open the courtyard floor and pave it.
  b.fill(9, F, -35, 31, top, -19, 'air');
  b.fill(9, PLATEAU, -35, 31, PLATEAU, -19, B.trim);
  // Outer windows.
  windowsAlongX(b, 4, 36, -12, F + 3, F + 8);
  windowsAlongX(b, 4, 36, -42, F + 3, F + 8);
  windowsAlongZ(b, -40, -14, 38, F + 3, F + 8);
  // Archway through the south wing.
  b.fill(18, F, -18, 22, F + 5, -12, 'air');
  // Roofs.
  roofAlongX(b, 2, 38, -42, -36, top + 1);
  roofAlongX(b, 2, 38, -18, -12, top + 1);
  roofAlongZ(b, 2, 8, -35, -19, top + 1);
  roofAlongZ(b, 32, 38, -35, -19, top + 1);
}

function terrace(b) {
  // Battlemented wall along the front of the plateau.
  b.fill(-30, 6, -8, 30, F + 1, -8, B.wall);
  for (let x = -30; x <= 30; x += 2) b.set(x, F + 2, -8, B.wall);
  // Gate opening to the stairway.
  b.fill(10, F, -8, 12, F + 2, -8, 'air');
}

// x, z, radius, wall top, roof height
const TOWERS = [
  { x: -2, z: -30, r: 5, top: F + 32, roof: 20 }, // great tower
  { x: -36, z: -38, r: 3, top: F + 22, roof: 13 },
  { x: -36, z: -24, r: 3, top: F + 20, roof: 12 },
  { x: -20, z: -42, r: 2, top: F + 26, roof: 12 },
  { x: -14, z: -20, r: 3, top: F + 18, roof: 11 },
  { x: 2, z: -42, r: 3, top: F + 20, roof: 12 },
  { x: 38, z: -42, r: 3, top: F + 24, roof: 14 },
  { x: 38, z: -12, r: 3, top: F + 18, roof: 12 },
  { x: 2, z: -12, r: 3, top: F + 16, roof: 11 },
  { x: 20, z: -42, r: 2, top: F + 30, roof: 14 },
  { x: 38, z: -27, r: 3, top: F + 28, roof: 16 },
  { x: 20, z: -27, r: 4, top: F + 26, roof: 16 }, // courtyard clock tower
  { x: 28, z: -4, r: 2, top: F + 12, roof: 9 },  // lookout over the stairway
];

function tower(b, { x, z, r, top, roof }) {
  b.cylinder(x, z, r, 4, PLATEAU, B.wall);
  b.cylinder(x, z, r, F, top, B.wall, { hollow: true });
  b.cylinder(x, z, r - 1, top, top, B.trim); // top floor
  for (let y = F + 4; y < top - 2; y += 7) {
    b.fill(x - r, y, z, x - r, y + 2, z, B.window);
    b.fill(x + r, y, z, x + r, y + 2, z, B.window);
    b.fill(x, y, z - r, x, y + 2, z - r, B.window);
    b.fill(x, y, z + r, x, y + 2, z + r, B.window);
  }
  b.cone(x, z, r + 1, top + 1, roof, B.roof);
  b.fill(x, top + 1 + roof, z, x, top + 2 + roof, z, B.spire);
}

// ---------------------------------------------------------------- stairway

const STAIR_POINTS = [[11, -6], [26, 2], [6, 10], [26, 18], [8, 26], [16, 36]];

function stairway(b, h) {
  const cells = [];
  for (let i = 0; i < STAIR_POINTS.length - 1; i++) {
    const [ax, az] = STAIR_POINTS[i], [bx, bz] = STAIR_POINTS[i + 1];
    const steps = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
    for (let s = i === 0 ? 0 : 1; s <= steps; s++) {
      cells.push([Math.round(ax + ((bx - ax) * s) / steps), Math.round(az + ((bz - az) * s) / steps)]);
    }
  }
  // Walkway height descends at most one block per step and never climbs.
  let y = PLATEAU;
  const path = cells.map(([x, z]) => {
    y = Math.min(y, Math.max(y - 1, h(x, z)));
    return [x, y, z];
  });
  // Pass 1: solid stone body with supports down to the ground (a viaduct where it floats).
  for (const [x, y, z] of path) b.fill(x - 2, Math.max(1, h(x, z)), z - 2, x + 2, y + 1, z + 2, B.path);
  // Pass 2: carve the 3-wide walkway, leaving a one-block parapet on each side.
  for (const [x, y, z] of path) b.fill(x - 1, y + 1, z - 1, x + 1, y + 3, z + 1, 'air');
  return path;
}

// ---------------------------------------------------------------- boathouse

function boathouse(b) {
  const [x1, x2, z1, z2] = [10, 22, 38, 46];
  b.fill(x1, FLOOR + 1, z1, x2, 2, z2, B.terrain);
  b.fill(x1, 3, z1, x2, 9, z2, B.wood, 'hollow');
  b.fill(15, 3, z2, 17, 6, z2, 'air'); // doors to the dock
  b.fill(15, 3, z1, 17, 6, z1, 'air'); // doors to the stairway
  windowsAlongZ(b, z1 + 2, z2 - 2, x1, 5, 7, 3);
  windowsAlongZ(b, z1 + 2, z2 - 2, x2, 5, 7, 3);
  roofAlongZ(b, x1, x2, z1, z2, 10);
  b.fill(16, 17, z1 - 1, 16, 19, z1 - 1, B.spire);
  // Dock out into the lake.
  b.fill(14, 1, z2 + 1, 18, 1, z2 + 10, B.dock);
  for (const z of [z2 + 4, z2 + 8]) for (const x of [14, 18]) b.fill(x, FLOOR + 1, z, x, 0, z, B.log);
}

// ---------------------------------------------------------------- trees

function trees(b, h, path) {
  const nearPath = (x, z) => path.some(([px, , pz]) => Math.abs(px - x) <= 4 && Math.abs(pz - z) <= 4);
  const inCastle = (x, z) => x >= -40 && x <= 42 && z >= -46 && z <= -6;
  const nearBoathouse = (x, z) => x >= 6 && x <= 26 && z >= 34;
  let planted = 0;
  for (let i = 0; i < 400 && planted < 45; i++) {
    const x = Math.round((hash(i, 7) - 0.5) * 110);
    const z = Math.round((hash(i, 13) - 0.5) * 110);
    const y = h(x, z);
    if (y < 3 || y >= PLATEAU || inCastle(x, z) || nearPath(x, z) || nearBoathouse(x, z)) continue;
    const tall = 6 + Math.floor(hash(i, 21) * 4);
    b.fill(x, y + 1, z, x, y + tall, z, B.log);
    const layers = [2, 2, 1, 2, 1, 1, 0];
    for (let j = 0; j < layers.length; j++) {
      const ly = y + tall - layers.length + 3 + j;
      const r = layers[j];
      b.fill(x - r, ly, z - r, x + r, ly, z + r, B.leaves, 'keep');
    }
    planted++;
  }
}

function abs(o, x, y, z) {
  return `${o.x + x} ${o.y + y} ${o.z + z}`;
}
