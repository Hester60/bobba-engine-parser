import { TileNeighbors } from '../types/Tile';
import { TileMap } from '../types/TileMap';
import { resolveTileCodeAt } from './resolveTileCodeAt';
import { resolveTileHeight } from './resolveTileHeight';

/**
 * Retrieves normalized information about the four direct neighbors
 * (top, bottom, left, right) of a tile in a 2D tilemap.
 *
 * This helper resolves the raw tile codes of neighboring positions
 * and converts them into usable numeric heights.
 *
 * Missing neighbors (out-of-bounds) or empty tiles ('x')
 * are treated as height 0.
 *
 * This function is commonly used by higher-level parsers (e.g. room or wall parsers)
 * to compute wall heights, edges, and transitions between tiles.
 *
 * @param tilemap - The 2D tilemap array to read from.
 * @param x - The x-coordinate (column index) of the tile.
 * @param y - The y-coordinate (row index) of the tile.
 *
 * @returns An object describing the four neighboring tiles:
 *   - `top.height` → height of the tile above
 *   - `bottom.height` → height of the tile below
 *   - `left.height` → height of the tile to the left
 *   - `right.height` → height of the tile to the right
 *
 * All heights are guaranteed to be numbers (≥ 0).
 *
 * Example usage:
 * ```ts
 * const neighbors = getTileNeighbors(tilemap, 2, 3);
 *
 * neighbors.top.height; // e.g. 1
 * neighbors.bottom.height; // e.g. 0 (empty or out-of-bounds)
 * neighbors.left.height; // e.g. 2
 * neighbors.right.height; // e.g. 2
 * ```
 */
export function getTileNeighbors(tilemap: TileMap, x: number, y: number): TileNeighbors {
  const top = resolveTileCodeAt(tilemap, x, y, 'top');
  const bottom = resolveTileCodeAt(tilemap, x, y, 'bottom');
  const left = resolveTileCodeAt(tilemap, x, y, 'left');
  const right = resolveTileCodeAt(tilemap, x, y, 'right');

  return {
    top: { height: resolveTileHeight(top) },
    bottom: { height: resolveTileHeight(bottom) },
    left: { height: resolveTileHeight(left) },
    right: { height: resolveTileHeight(right) },
  };
}
