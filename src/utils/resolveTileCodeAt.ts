import { TileMap } from '../types/TileMap';
import { offsets } from './offsets';
import { resolveTileCode } from './resolveTileCode';

/**
 * Returns the resolved numeric value of a tile at a specific position in the tilemap,
 * optionally using an offset to refer to a neighboring tile.
 *
 * This function safely handles out-of-bounds accesses and empty tiles ('x').
 *
 * @param tilemap - The 2D tilemap array
 * @param x - The X coordinate of the tile
 * @param y - The Y coordinate of the tile
 * @param offset - Optional offset to fetch a neighboring tile (default: 'none').
 *                 Can be one of: 'none', 'top', 'bottom', 'left', 'right',
 *                 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
 * @returns The numeric height of the tile, or 'x' if the tile is an empty tile or out of bounds
 *
 * @example
 * resolveTileCodeAt(tilemap, 1, 1); // e.g., 0
 * resolveTileCodeAt(tilemap, 1, 1, 'top'); // tile above (or 'x' if out of bounds)
 * resolveTileCodeAt(tilemap, 0, 0, 'topLeft');// 'x' (out of bounds)
 */
export function resolveTileCodeAt(
  tilemap: TileMap,
  x: number,
  y: number,
  offset: keyof typeof offsets = 'none',
): number | 'x' {
  const ox = offsets[offset].x;
  const oy = offsets[offset].y;

  const targetX = x + ox;
  const targetY = y + oy;

  if (!tilemap[targetY] || tilemap[targetY][targetX] == null) return 'x'; // nothing at this position

  return resolveTileCode(tilemap[targetY][targetX]);
}
