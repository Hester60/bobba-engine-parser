/**
 * Metadata describing a tile in the tilemap.
 *
 * - `height`: Optional numeric height of the tile (if it's not empty).
 * - `rowEdge`: True if the tile has a left edge against an empty space.
 * - `colEdge`: True if the tile has a top edge against an empty space.
 * - `innerEdge`: True if the tile forms an inner corner with neighboring tiles.
 */
export type TileMeta = {
  height?: number;
  rowEdge: boolean;
  colEdge: boolean;
  innerEdge: boolean;
};
