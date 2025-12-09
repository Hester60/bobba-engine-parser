import { TileCode } from '../types/TileMap';

/**
 * Converts a TileCode into a numeric height for isometric tiles.
 *
 * Tile codes represent either tile heights or empty spaces:
 * - '0' – '9' → numeric heights 0–9
 * - 'a' - 'v' → numeric heights 10–31
 * - 'x' → empty space, returned as-is
 *
 * @param tileCode - The code of the tile to convert.
 * @returns The numeric height of the tile, or 'x' if the tile is an empty space.
 *
 * @example
 * resolveTileCode('0'); // 0
 * resolveTileCode('9'); // 9
 * resolveTileCode('a'); // 10
 * resolveTileCode('x'); // 'x'
 */
export function resolveTileCode(tileCode: TileCode): number | 'x' {
  if ('x' === tileCode || null === tileCode) return 'x';

  const tileToNumber = Number(tileCode);
  if (!isNaN(tileToNumber)) return tileToNumber;

  return tileCode.charCodeAt(0) - 96 + 9;
}
