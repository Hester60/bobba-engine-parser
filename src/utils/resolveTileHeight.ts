import { isNonEmptyTile } from './isNonEmptyTile';

/**
 * Resolves the numeric height of a tile.
 *
 * This helper converts a tile value into a usable height number.
 * Empty tiles ('x'), missing tiles (null), or invalid tiles are
 * treated as height 0.
 *
 * This function is commonly used when computing wall heights
 * based on neighboring tiles.
 *
 * @param tile - The tile value to resolve. Can be:
 *   - a number representing the tile height
 *   - the character 'x' for an empty tile
 *   - null for out-of-bounds or missing tiles
 *
 * @returns The numeric height of the tile.
 *   - Returns the tile number if it represents a non-empty tile
 *   - Returns 0 for empty ('x') or null tiles
 *
 * Example usage:
 * ```
 * resolveTileHeight(3); // 3
 * resolveTileHeight(0); // 0
 * resolveTileHeight('x'); // 0
 * resolveTileHeight(null); // 0
 * resolveTileHeight(undefined); // 0
 * ```
 */
export function resolveTileHeight(tile?: number | string | null): number {
  if (null === tile || undefined === tile) {
    return 0;
  }

  return isNonEmptyTile(tile) ? Number(tile) : 0;
}
