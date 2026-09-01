/**
 * Deterministic categorical color per product, validated against CVD/normal-vision
 * adjacency with `dataviz` skill's validate_palette.js (order: green, blue, amber,
 * purple, red — passes both light and dark). The real product catalog is large and
 * open-ended (dozens of LiveRamp product names across clients), so colors are picked
 * by a stable hash of the product name/id rather than a fixed lookup table.
 */
const PALETTE = [
  'var(--brand-green)',
  'var(--brand-blue)',
  'var(--brand-amber)',
  'var(--brand-purple)',
  'var(--brand-red)',
];

function stringHash(id: string): number {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

export function productColor(productId: string): string {
  return PALETTE[stringHash(productId) % PALETTE.length];
}
