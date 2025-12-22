[![bobba-engine-logo.png](https://i.postimg.cc/9Q65vMJC/bobba-engine-logo.png)](https://postimg.cc/0z0BS9TB)

# @bobba-engine/parser

[![CI](https://github.com/Hester60/bobba-engine-parser/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Hester60/bobba-engine-parser/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40bobba-engine%2Fparser)](https://www.npmjs.com/package/@bobba-engine/parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for parsing and manipulating 2D isometric tilemaps, inspired by Habbo Hotel rooms and the [Shroom](https://github.com/jankuss/shroom) package.

## Features

- 🗺️ **Complete Tilemap Analysis**: Get full metadata for all tiles in one function call
- 🔍 **Rich Tile Information**: Heights, edges, corners, positions, and codes for each tile
- 🎯 **Simple API**: One main function (`getTileMapMeta`) does all the work
- 🛠️ **Utility Functions**: Low-level helpers available for advanced use cases
- 📦 **TypeScript First**: Fully typed API with comprehensive type definitions

## Installation

```bash
npm install @bobba-engine/parser
```

```bash
yarn add @bobba-engine/parser
```

```bash
pnpm add @bobba-engine/parser
```

## Quick Start

```typescript
import { getTileMapMeta, TileMap } from '@bobba-engine/parser';

// Define your tilemap
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
//   x: 3,
//   y: 2,
//   initialCode: '1',
//   height: 1,
//   resolvedCode: 1,
//   rowEdge: false,
//   colEdge: false,
//   innerEdge: false,
//   isEmpty: false
// }

// Check if borders were added
console.log(`Offsets: X=${result.offsetX}, Y=${result.offsetY}`);
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

## API Reference

### Main Function

#### `getTileMapMeta(tilemap)`

**🎯 The primary function** - Computes complete metadata for an entire tilemap in one call. This is what you'll use most of the time.

In addition to per-tile height and edge information, this function also
computes normalized height data for the four direct neighbors of each tile
(top, bottom, left, right).

Neighbor heights are always numeric and default to `0` for:

- empty tiles (`'x'`)
- out-of-bounds positions

This makes the output safe to consume for wall detection, room parsing,
and rendering logic without additional null checks.

**Parameters:**

- `tilemap: TileMap` - The 2D tilemap array

**Returns:** `TileMapMeta`

```typescript
type TileMapMeta = {
  tilemap: TileMap; // The tilemap with ensured borders
  offsetX: number; // Columns added to the left (for repositioning)
  offsetY: number; // Rows added to the top (for repositioning)
  tilesMeta: FullTileMeta[][]; // Complete metadata for each tile
};
```

**Example:**

```typescript
const result = getTileMapMeta(tilemap);

// Access any tile's metadata
const tile = result.tilesMeta[y][x];

// Render based on metadata
if (!tile.isEmpty) {
  renderTile(tile.x, tile.y, tile.height);
  if (tile.rowEdge) renderLeftEdge(tile.x, tile.y);
  if (tile.colEdge) renderTopEdge(tile.x, tile.y);
  if (tile.innerEdge) renderInnerCorner(tile.x, tile.y);
}
```

### Types

#### `FullTileMeta`

Complete metadata for a single tile:

```typescript
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

#### `TileCode`

```typescript
type TileCode = '0' | '1' | '2' | ... | '9' | 'a' | 'b' | ... | 'v' | 'x';
```

Represents a single tile in the tilemap.

#### `TileMap`

```typescript
type TileMap = TileCode[][];
```

A 2D array representing the complete tilemap.

### Utility Functions

These functions are exported for advanced use cases, but **most users should use `getTileMapMeta()` instead**.

#### `getTileMeta(tilemap, x, y)`

Computes metadata for a single tile at a specific position.

**Parameters:** `tilemap: TileMap`, `x: number`, `y: number`  
**Returns:** `TileMeta` (without position and code information)

#### `ensureTileMapBorders(tilemap)`

Ensures the tilemap has borders of empty tiles. Used internally by `getTileMapMeta()`.

#### `resolveTileCode(tileCode)`

Converts a tile code string to its numeric value: `'0'` → `0`, `'a'` → `10`, `'x'` → `'x'`

#### `resolveTileCodeAt(tilemap, x, y, offset?)`

Gets the resolved value of a tile at position `(x, y)` with optional neighbor offset (`'top'`, `'left'`, etc.)

#### `isNonEmptyTile(tile)`

Checks if a tile is not empty: `isNonEmptyTile('x')` → `false`, `isNonEmptyTile(0)` → `true`

#### `getTileNeighbors(tilemap, x, y)`

Returns normalized height information for the four direct neighbors of a tile.

**Parameters:**

- `tilemap: TileMap`
- `x: number`
- `y: number`

**Returns:** `TileNeighbors`

Neighbor heights are always numeric and default to `0` for empty or out-of-bounds tiles.

This function is used internally by `getTileMeta`, but is also exported
for advanced use cases.

#### `resolveTileHeight(tile)`

Resolves the numeric height of a tile.

**Parameters:**

- `tile?: number | string | null` – The tile value. Can be:
  - a number representing the tile height
  - a string `'x'` representing an empty tile
  - null or undefined for out-of-bounds/missing tiles

**Returns:** `number` – The numeric height of the tile.  
Empty tiles (`'x'`) or null/undefined tiles return `0`.

## Use Cases

### Rendering Isometric Rooms

Use the complete tilemap metadata to render tiles with proper edges and corners:

```typescript
import { getTileMapMeta } from '@bobba-engine/parser';

const { tilesMeta } = getTileMapMeta(tilemap);

// Render all tiles with their metadata
tilesMeta.forEach((row) => {
  row.forEach((tile) => {
    if (!tile.isEmpty) {
      renderTile(tile.x, tile.y, tile.height);

      if (tile.rowEdge) renderLeftEdge(tile.x, tile.y);
      if (tile.colEdge) renderTopEdge(tile.x, tile.y);
      if (tile.innerEdge) renderInnerCorner(tile.x, tile.y);
    }
  });
});
```

### Collision Detection

Check if a position is walkable:

```typescript
const { tilesMeta } = getTileMapMeta(tilemap);

function isWalkable(x: number, y: number): boolean {
  return !tilesMeta[y]?.[x]?.isEmpty;
}
```

### Pathfinding Integration

Convert tilemap metadata for use with pathfinding algorithms:

```typescript
const { tilesMeta } = getTileMapMeta(tilemap);

const pathfindingGrid = tilesMeta.map(
  (row) => row.map((tile) => (tile.isEmpty ? 1 : 0)), // 0 = walkable, 1 = blocked
);
```

### Analyzing Tile Heights

Find all tiles at a specific height:

```typescript
const { tilesMeta } = getTileMapMeta(tilemap);

const tilesAtHeight2 = tilesMeta.flat().filter((tile) => tile.height === 2);

console.log(`Found ${tilesAtHeight2.length} tiles at height 2`);
```

## Development

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd bobba-engine-parser

# Install dependencies
npm install
```

### Scripts

```bash
# Build the project
npm run build

# Run tests
npm test

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format
npm run format:fix
```

### Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality:

- **pre-commit**: Runs `lint-staged` to automatically lint and format staged files
- **pre-push**: Runs all tests to ensure no broken code is pushed

These hooks run automatically. To bypass them (not recommended):

```bash
git commit --no-verify
git push --no-verify
```

### Project Structure

```
@bobba-engine/parser/
├── src/
│   ├── types/               # TypeScript type definitions
│   │   ├── Tile.ts          # TileMeta, FullTileMeta, TileNeighbors
│   │   └── TileMap.ts       # TileMap, TileMapMeta, TileCode
│   ├── utils/               # Utility functions
│   │   ├── getTileMapMeta.ts        # 🎯 Main function
│   │   ├── getTileMeta.ts
│   │   ├── getTileNeighbors.ts
│   │   ├── ensureTileMapBorders.ts
│   │   ├── resolveTileCodeAt.ts
│   │   ├── resolveTileCode.ts
│   │   ├── resolveTileHeight.ts
│   │   ├── isNonEmptyTile.ts
│   │   └── offsets.ts
│   └── index.ts             # Main entry point (exports)
├── dist/                    # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Inspiration

This project is inspired by the [Shroom](https://github.com/jankuss/shroom) library and the Habbo Hotel room system. It aims to provide lightweight, reusable utilities for working with isometric tilemap data.

## AI Assistance

To improve development efficiency and code quality, certain parts of this project were generated with AI assistance (Claude Sonnet 4.5). This includes:

- 🧪 **Unit Tests**: Comprehensive test suites for complex functions
- 📚 **Documentation**: Parts of JSDoc comments and README sections
- 🔍 **Code Review**: Optimization suggestions and best practices

Files that contain AI-generated content are clearly marked with a note in their header comments. For example:

```typescript
/**
 * @note These tests were generated with AI assistance (Claude Sonnet 4.5)
 */
```

All AI-generated code has been:

- ✅ Reviewed and validated by human developers
- ✅ Tested to ensure correctness and reliability
- ✅ Adapted to fit the project's architecture and standards

We believe in transparency about the tools used in development while maintaining high standards for code quality.

## License

MIT © CARBUCCIA Thomas

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Branch Strategy

This project uses a protected branch workflow:

- **`main`** - Production branch (protected, requires PR + CI ✅)
- **`develop`** - Development branch (protected, requires PR + CI ✅)
- **`feature/*`** - Feature branches (create from `develop`)

### Contribution Workflow

1. Fork the repository
2. Create your feature branch from `develop`:
   ```bash
   git checkout develop
   git checkout -b feature/amazing-feature
   ```
3. Make your changes (hooks will auto-lint and format on commit)
4. Ensure tests pass locally: `npm test`
5. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request to `develop`
   - ✅ All tests must pass (CI will run automatically)
   - ✅ Code will be reviewed before merge

### Branch Protection

Both `main` and `develop` are protected:

- ❌ Direct pushes are blocked
- ✅ Pull Requests required
- ✅ CI must pass before merging
- ✅ Pre-commit hooks enforce code quality
