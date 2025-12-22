import { TileCode, TileMap, TileMapBordersResult, TileMapMeta } from '../types/TileMap';
import { ensureTileMapBorders } from './ensureTileMapBorders';
import { FullTileMeta, TileMeta } from '../types/Tile';
import { getTileMeta } from './getTileMeta';
import { resolveTileCodeAt } from './resolveTileCodeAt';

/**
 * Computes complete metadata for an entire tilemap.
 *
 * This function ensures the tilemap has proper borders, then computes detailed
 * metadata for every tile including position, height, edges, and resolved codes.
 *
 * @param initialTilemap - The initial 2D tilemap array.
 * @returns A TileMapMetaResult object containing:
 *   - `tilemap`: The tilemap with ensured borders
 *   - `offsetX`: Number of columns added to the left
 *   - `offsetY`: Number of rows added to the top
 *   - `tilesMeta`: 2D array of complete metadata for each tile
 *
 * @example
 * ```typescript
 * const tilemap: TileMap = [['x', '0'], ['x', '0']];
 * const result = getTileMapMeta(tilemap);
 * console.log(result.tilesMeta[1][1].height); // 0
 * console.log(result.offsetX, result.offsetY); // 0, 0
 * ```
 */
export function getTileMapMeta(initialTilemap: TileMap): TileMapMeta {
  const { tilemap, offsetX, offsetY }: TileMapBordersResult = ensureTileMapBorders(initialTilemap);

  return {
    offsetX,
    offsetY,
    tilemap,
    tilesMeta: tilemap.map((row: TileCode[], y: number) => {
      return row.map((_: TileCode, x: number): FullTileMeta => {
        const meta: TileMeta = getTileMeta(tilemap, x, y);
        const resolvedCode = resolveTileCodeAt(tilemap, x, y);

        return {
          x,
          y,
          height: meta.height,
          initialCode: tilemap[y][x],
          rowEdge: meta.rowEdge,
          colEdge: meta.colEdge,
          innerEdge: meta.innerEdge,
          isEmpty: meta.height === undefined,
          neighbors: meta.neighbors,
          resolvedCode,
        };
      });
    }),
  };
}
