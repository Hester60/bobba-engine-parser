/**
 * Height of a tile
 * Character range:
 * - 0-9
 * - "a"-"v" (10-31)
 */
export type TileHeight =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v';

/**
 * Content of a tilemap
 * - "x": empty space
 */
export type TileCode = TileHeight | 'x';

/**
 * Final tilemap
 */
export type TileMap = TileCode[][];

/**
 * Result of ensuring borders around a TileMap.
 *
 * - `tilemap`: The modified tilemap, potentially padded with empty tiles ('x') along
 *   the top row and left column to guarantee a border.
 * - `offsetX`: Number of columns added to the left of the original tilemap.
 * - `offsetY`: Number of rows added to the top of the original tilemap.
 */
export type TileMapBordersResult = {
  tilemap: TileMap;
  offsetX: number;
  offsetY: number;
};
