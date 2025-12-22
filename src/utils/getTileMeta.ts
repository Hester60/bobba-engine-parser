import { TileMap } from '../types/TileMap';
import { TileMeta, TileNeighbors } from '../types/Tile';
import { resolveTileCodeAt } from './resolveTileCodeAt';
import { isNonEmptyTile } from './isNonEmptyTile';
import { getTileNeighbors } from './getTileNeighbors';

/**
 * Computes metadata for a specific tile in a 2D tilemap.
 *
 * This function inspects the tile at position (x, y) as well as
 * its neighbors to determine edges and height information.
 *
 * @param tilemap - The 2D array representing the tilemap, where each element is a TileCode ('0'-'v' for heights or 'x' for empty).
 * @param x - The x-coordinate (column index) of the tile.
 * @param y - The y-coordinate (row index) of the tile.
 * @returns A TileMeta object containing:
 *   - `height`: the numeric height of the tile if it's a “non-empty” tile, otherwise undefined.
 *   - `rowEdge`: true if the tile has an empty tile to its left and itself is non-empty; indicates the start of a horizontal edge.
 *   - `colEdge`: true if the tile has a empty tile above and itself is non-empty; indicates the start of a vertical edge.
 *   - `innerEdge`: true if the tile is part of an inner corner (top-left diagonal is an empty tile, and top & left tiles are non-empty).
 *   - `neighbors`:
 *       Normalized height information for the four direct neighbors
 *       (`top`, `bottom`, `left`, `right`).
 *
 * Notes:
 * - A "non-empty" tile is any tile that is not an empty marker ('x').
 * - Neighbor heights are always numeric and default to `0`
 * - Edges are calculated relative to the surrounding empty tiles:
 *   - `rowEdge` → marks the left side of a tile row next to an empty tile.
 *   - `colEdge` → marks the top side of a tile column next to an empty tile.
 *   - `innerEdge` → marks a tile forming a top-left inner corner.
 *
 * Example usage:
 * ```
 * const meta = getTileMeta(tilemap, 2, 3);
 * console.log(meta.height, meta.rowEdge, meta.colEdge, meta.innerEdge, meta.neighbors.top.height);
 * ```
 */
export function getTileMeta(tilemap: TileMap, x: number, y: number): TileMeta {
  const type = resolveTileCodeAt(tilemap, x, y);

  const leftType = resolveTileCodeAt(tilemap, x, y, 'left');
  const topType = resolveTileCodeAt(tilemap, x, y, 'top');
  const topLeftDiagonalType = resolveTileCodeAt(tilemap, x, y, 'topLeft');

  const leftIsEmpty = leftType === 'x';
  const topIsEmpty = topType === 'x';
  const topLeftIsEmpty = topLeftDiagonalType === 'x';

  const isTile = isNonEmptyTile(type);
  const height = isTile ? Number(type) : undefined;

  const neighbors: TileNeighbors = getTileNeighbors(tilemap, x, y);

  return {
    height,
    rowEdge: leftIsEmpty && isTile,
    colEdge: topIsEmpty && isTile,
    innerEdge: topLeftIsEmpty && isTile && isNonEmptyTile(topType) && isNonEmptyTile(leftType),
    neighbors,
  };
}
