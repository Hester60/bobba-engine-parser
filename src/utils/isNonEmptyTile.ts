/**
 * Determines whether a given tile represents a “non-empty” tile.
 *
 * A non-empty tile is any tile that is not an empty space.
 * In the tilemap, the 'x' character represents empty spaces.
 * Any numeric or other non-'x' tile is considered non-empty.
 *
 * @param tile - The tile to check. Can be a number (tile height) or a string ('x' for empty).
 * @returns `true` if the tile is not an empty space, `false` otherwise.
 *
 * Example usage:
 * ```
 * isNonEmptyTile(0); // true
 * isNonEmptyTile(5); // true
 * isNonEmptyTile('x'); // false
 * ```
 */
export const isNonEmptyTile = (tile: number | string): boolean => 'x' !== tile;
