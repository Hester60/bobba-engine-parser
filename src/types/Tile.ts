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

/**
 * Complete metadata for a single tile in a tilemap, including position and code information.
 *
 * - `x`: The x-coordinate (column) of the tile in the tilemap.
 * - `y`: The y-coordinate (row) of the tile in the tilemap.
 * - `initialCode`: The string value of tile before resolution.
 * - `height`: Optional numeric height of the tile (undefined for empty tiles).
 * - `rowEdge`: True if the tile has a left edge against an empty space.
 * - `colEdge`: True if the tile has a top edge against an empty space.
 * - `innerEdge`: True if the tile forms an inner corner with neighboring tiles.
 * - `isEmpty`: True if the tile is an empty space ('x').
 * - `resolvedCode`: The numeric value or 'x' after resolution (0-31 or 'x').
 */
export type FullTileMeta = {
  x: number;
  y: number;
  initialCode: string;
  height?: number;
  rowEdge: boolean;
  colEdge: boolean;
  innerEdge: boolean;
  isEmpty: boolean;
  resolvedCode: number | 'x';
};
