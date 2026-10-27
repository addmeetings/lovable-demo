// Tiny command-generation toolkit for structures. Everything is emitted as
// absolute-coordinate /fill and /setblock commands so the build does not
// depend on where the player is standing while it runs.

export const MAX_FILL_VOLUME = 32_768; // Bedrock / Education hard limit per /fill

export class Builder {
  constructor(origin = { x: 0, y: 0, z: 0 }) {
    this.origin = origin;
    this.phases = [];
    this.phase('setup');
  }

  phase(name) {
    this.current = { name, commands: [] };
    this.phases.push(this.current);
    return this;
  }

  raw(command) {
    this.current.commands.push(command);
    return this;
  }

  /** Fill a box given in local coordinates; splits boxes larger than the /fill limit. */
  fill(x1, y1, z1, x2, y2, z2, block, mode = '') {
    const box = normalize(x1, y1, z1, x2, y2, z2);
    if ((mode === 'hollow' || mode === 'outline') && volume(box) > MAX_FILL_VOLUME) {
      throw new Error(`A ${mode} fill cannot be split; box volume ${volume(box)} exceeds ${MAX_FILL_VOLUME}`);
    }
    for (const b of splitBox(box)) {
      const a = this.#abs(b.x1, b.y1, b.z1);
      const c = this.#abs(b.x2, b.y2, b.z2);
      this.raw(`fill ${a} ${c} ${block}${mode ? ' ' + mode : ''}`.trimEnd());
    }
    return this;
  }

  set(x, y, z, block) {
    return this.raw(`setblock ${this.#abs(x, y, z)} ${block}`);
  }

  /** Solid (or hollow) vertical cylinder, emitted as one fill per row. */
  cylinder(cx, cz, r, y1, y2, block, { hollow = false } = {}) {
    for (const [z, xa, xb] of discRows(r)) {
      if (!hollow) {
        this.fill(cx + xa, y1, cz + z, cx + xb, y2, cz + z, block);
        continue;
      }
      // Outer ring cells only: a cell is on the ring if it is outside radius r-1.
      for (let x = xa; x <= xb; x++) {
        if (x * x + z * z > (r - 1) * (r - 1) || Math.abs(x) === r || Math.abs(z) === r) {
          this.fill(cx + x, y1, cz + z, cx + x, y2, cz + z, block);
        }
      }
    }
    return this;
  }

  /** Cone roof: radius shrinks linearly from r to 0 over `height` layers. */
  cone(cx, cz, r, y, height, block) {
    for (let i = 0; i < height; i++) {
      const ri = Math.round(r * (1 - i / height));
      if (ri <= 0) {
        this.set(cx, y + i, cz, block);
        continue;
      }
      for (const [z, xa, xb] of discRows(ri)) this.fill(cx + xa, y + i, cz + z, cx + xb, y + i, cz + z, block);
    }
    return this;
  }

  /** Total number of commands across all phases. */
  get size() {
    return this.phases.reduce((n, p) => n + p.commands.length, 0);
  }

  #abs(x, y, z) {
    return `${this.origin.x + x} ${this.origin.y + y} ${this.origin.z + z}`;
  }
}

/** Rows of a filled disc: [dz, xStart, xEnd]. */
export function discRows(r) {
  const rows = [];
  for (let z = -r; z <= r; z++) {
    const half = Math.floor(Math.sqrt(r * r + r - z * z)); // +r gives rounder small circles
    rows.push([z, -half, half]);
  }
  return rows;
}

function normalize(x1, y1, z1, x2, y2, z2) {
  return {
    x1: Math.min(x1, x2), x2: Math.max(x1, x2),
    y1: Math.min(y1, y2), y2: Math.max(y1, y2),
    z1: Math.min(z1, z2), z2: Math.max(z1, z2),
  };
}

export function volume(b) {
  return (b.x2 - b.x1 + 1) * (b.y2 - b.y1 + 1) * (b.z2 - b.z1 + 1);
}

/** Recursively halve the longest axis until each box fits in one /fill. */
export function splitBox(b) {
  if (volume(b) <= MAX_FILL_VOLUME) return [b];
  const dx = b.x2 - b.x1, dy = b.y2 - b.y1, dz = b.z2 - b.z1;
  const axis = dx >= dy && dx >= dz ? 'x' : dz >= dy ? 'z' : 'y';
  const lo = b[axis + '1'], hi = b[axis + '2'];
  const mid = Math.floor((lo + hi) / 2);
  return [
    ...splitBox({ ...b, [axis + '2']: mid }),
    ...splitBox({ ...b, [axis + '1']: mid + 1 }),
  ];
}
