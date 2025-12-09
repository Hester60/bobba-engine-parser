import { TileCode, TileMap, TileMapBordersResult } from '../types/TileMap';

/**
 * Ensures that a TileMap has a border of empty tiles ('x') along the top row
 * and the leftmost column. If the border is missing, it adds the necessary
 * rows/columns and returns the resulting tilemap along with the offsets applied.
 *
 * @param tilemap - The original 2D tilemap array
 * @returns An object containing:
 *   - `tilemap`: The possibly padded tilemap with a guaranteed border
 *   - `offsetX`: Number of columns added to the left
 *   - `offsetY`: Number of rows added to the top
 *
 * @throws If the tilemap has no rows.
 */
export function ensureTileMapBorders(tilemap: TileMap): TileMapBordersResult {
  const firstRow = tilemap[0];

  if (!firstRow) throw new Error('Tilemap must have at least one row');

  let offsetY = 0;
  let offsetX = 0;

  if (firstRow.some((type: TileCode) => 'x' !== type)) {
    tilemap = [firstRow.map(() => 'x' as const), ...tilemap];
    offsetY += 1;
  }

  const nonPrefixedRows = tilemap.filter((row) => 'x' !== row[0]);

  if (nonPrefixedRows.length > 1) {
    tilemap = tilemap.map((row): TileCode[] => ['x', ...row]);
    offsetX += 1;
  }

  return {
    tilemap,
    offsetX,
    offsetY,
  };
}
