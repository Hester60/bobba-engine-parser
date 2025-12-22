[![bobba-engine-logo.png](https://i.postimg.cc/9Q65vMJC/bobba-engine-logo.png)](https://postimg.cc/0z0BS9TB)

# @bobba-engine/parser

[![CI](https://github.com/Hester60/bobba-engine-parser/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Hester60/bobba-engine-parser/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40bobba-engine%2Fparser)](https://www.npmjs.com/package/@bobba-engine/parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for parsing 2D isometric tilemaps, inspired by Habbo Hotel rooms.

## Installation

```bash
npm install @bobba-engine/parser
```

## Quick Start

```typescript
import { getTileMapMeta, TileMap } from '@bobba-engine/parser';

const tilemap: TileMap = [
  ['x', 'x', 'x', '0', '0'],
  ['x', 'x', '0', '0', '0'],
  ['x', '0', '0', '1', '0'],
];

// Get complete metadata for the entire tilemap
const result = getTileMapMeta(tilemap);

// Access metadata for any tile
console.log(result.tilesMeta[2][3]);
// {
//   x: 3, y: 2, height: 1,
//   rowEdge: false, colEdge: false, innerEdge: false,
//   isEmpty: false, ...
// }
```

## Tilemap Format

Tilemaps are represented as 2D arrays where each cell contains a tile code:

- **`'0'` - `'9'`**: Tile heights from 0 to 9
- **`'a'` - `'v'`**: Tile heights from 10 to 31 (extended range)
- **`'x'`**: Empty space (no tile)

### Example Tilemap

```typescript
const room: TileMap = [
  ['x', 'x', 'x', 'x'],
  ['x', '0', '0', '0'],
  ['x', '0', '1', '0'],
  ['x', '0', '0', '0'],
];
```

This represents a small room with mostly flat tiles (`'0'`) and one elevated tile (`'1'`) in the center.

## API

#### `getTileMapMeta(tilemap)`

The main function that computes complete metadata for an entire tilemap.

```typescript
type TileMapMeta = {
  tilemap: TileMap; // Tilemap with ensured borders
  offsetX: number; // Columns added to the left
  offsetY: number; // Rows added to the top
  tilesMeta: FullTileMeta[][]; // Metadata for each tile
};

type FullTileMeta = {
  x: number; // Column index
  y: number; // Row index
  initialCode: string; // Original tile code ('0', '9', 'a', 'x', etc.)
  height?: number; // Numeric height (0-31) or undefined for empty tiles
  resolvedCode: number | 'x'; // Resolved numeric value or 'x'
  rowEdge: boolean; // True if tile has an empty space to its left
  colEdge: boolean; // True if tile has an empty space above
  innerEdge: boolean; // True if tile forms an inner corner
  isEmpty: boolean; // True if the tile is empty ('x')
  neighbors: {
    // Always defined
    top: { height: number };
    bottom: { height: number };
    left: { height: number };
    right: { height: number };
  };
};
```

### Utility Functions

Lower-level helpers for advanced use cases:

- `getTileMeta(tilemap, x, y)` - Metadata for a single tile
- `ensureTileMapBorders(tilemap)` - Add borders if needed
- `resolveTileCode(tileCode)` - Convert code to numeric value
- `resolveTileCodeAt(tilemap, x, y, offset?)` - Resolve tile code at position with optional neighbor offset
- `isNonEmptyTile(tile)` - Check if tile is not empty
- `getTileNeighbors(tilemap, x, y)` - Get normalized height information for four direct neighbors
- `resolveTileHeight(tile)` - Resolve numeric height of a tile

## Development

```bash
npm install        # Install dependencies
npm run build      # Build the project
npm test           # Run tests
npm run lint       # Lint code
```

## License

MIT © CARBUCCIA Thomas

## Contributing

Contributions welcome! Please:

- Fork and create a feature branch from develop
- Make your changes (hooks auto-lint on commit)
- Ensure tests pass: npm test
- Open a PR to develop

Inspired by [Shroom](https://github.com/jankuss/shroom) and Habbo Hotel.
