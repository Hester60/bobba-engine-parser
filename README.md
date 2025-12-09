<div align="center">
  <img src="https://i.ibb.co/ym6QMmfw/bobba-engine-logo.png" alt="Bobba Engine Logo"/>
  
  # @bobba-engine/parser
  
  [![CI](https://github.com/Hester60/bobba-engine-parser/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Hester60/bobba-engine-parser/actions/workflows/ci.yml)
  [![npm version](https://img.shields.io/npm/v/%40bobba-engine%2Fparser)](https://www.npmjs.com/package/@bobba-engine/parser)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

A TypeScript library for parsing and manipulating 2D isometric tilemaps, inspired by Habbo Hotel rooms and the [Shroom](https://github.com/jankuss/shroom) package.

## Features

- 🗺️ **Parse 2D Tilemaps**: Convert encoded tilemap strings into structured data
- 🔍 **Tile Metadata**: Compute edges, corners, and height information for rendering
- 🛠️ **Utility Functions**: Helper functions for tilemap manipulation and analysis
- 📦 **TypeScript First**: Fully typed API with comprehensive type definitions
- ✅ **Well Tested**: Extensive test coverage for reliability

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
import { getTileMeta, ensureTileMapBorders, TileMap } from '@bobba-engine/parser';

// Define your tilemap
const tilemap: TileMap = [
  ['x', 'x', 'x', '0', '0'],
  ['x', 'x', '0', '0', '0'],
  ['x', '0', '0', '1', '0'],
];

// Ensure borders around the tilemap
const { tilemap: borderedMap, offsetX, offsetY } = ensureTileMapBorders(tilemap);

// Get metadata for a specific tile
const meta = getTileMeta(borderedMap, 2, 2);
console.log(meta);
// {
//   height: 0,
//   rowEdge: true,
//   colEdge: false,
//   innerEdge: false
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

## API Reference

### Types

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

#### `TileMeta`

```typescript
type TileMeta = {
  height?: number; // Numeric height (0-31) or undefined for empty tiles
  rowEdge: boolean; // True if tile has an empty space to its left
  colEdge: boolean; // True if tile has an empty space above
  innerEdge: boolean; // True if tile forms an inner corner
};
```

Metadata describing a tile's position and relationship to neighboring tiles.

### Functions

#### `getTileMeta(tilemap, x, y)`

Computes metadata for a specific tile in the tilemap.

**Parameters:**

- `tilemap: TileMap` - The 2D tilemap array
- `x: number` - Column index
- `y: number` - Row index

**Returns:** `TileMeta`

**Example:**

```typescript
const meta = getTileMeta(tilemap, 3, 2);
// Analyzes the tile at position (3, 2) and its neighbors
```

#### `ensureTileMapBorders(tilemap)`

Ensures the tilemap has a border of empty tiles (`'x'`) along the top row and leftmost column. Adds padding if necessary.

**Parameters:**

- `tilemap: TileMap` - The original tilemap

**Returns:** `TileMapBordersResult`

```typescript
type TileMapBordersResult = {
  tilemap: TileMap; // The padded tilemap
  offsetX: number; // Columns added to the left
  offsetY: number; // Rows added to the top
};
```

**Example:**

```typescript
const result = ensureTileMapBorders(tilemap);
console.log(`Added ${result.offsetX} columns and ${result.offsetY} rows`);
```

#### `resolveTileCode(tileCode)`

Converts a tile code into its numeric height value.

**Parameters:**

- `tileCode: TileCode` - The tile code to resolve

**Returns:** `number | 'x'`

**Example:**

```typescript
resolveTileCode('0'); // 0
resolveTileCode('9'); // 9
resolveTileCode('a'); // 10
resolveTileCode('v'); // 31
resolveTileCode('x'); // 'x'
```

#### `resolveTileCodeAt(tilemap, x, y, offset?)`

Gets the resolved height value of a tile at a specific position, with optional neighbor offset.

**Parameters:**

- `tilemap: TileMap` - The tilemap
- `x: number` - Column index
- `y: number` - Row index
- `offset?: keyof typeof offsets` - Optional direction offset (default: `'none'`)

**Available offsets:** `'none'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'topLeft'`, `'topRight'`, `'bottomLeft'`, `'bottomRight'`

**Returns:** `number | 'x'`

**Example:**

```typescript
const height = resolveTileCodeAt(tilemap, 2, 2);
const topNeighbor = resolveTileCodeAt(tilemap, 2, 2, 'top');
```

#### `isNonEmptyTile(tile)`

Checks if a tile is non-empty (not `'x'`).

**Parameters:**

- `tile: number | string` - The tile to check

**Returns:** `boolean`

**Example:**

```typescript
isNonEmptyTile(0); // true
isNonEmptyTile('x'); // false
```

### Constants

#### `offsets`

Predefined direction offsets for neighbor tile calculations.

```typescript
const offsets = {
  none: { x: 0, y: 0 },
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  topLeft: { x: -1, y: -1 },
  topRight: { x: 1, y: -1 },
  bottomLeft: { x: -1, y: 1 },
  bottomRight: { x: 1, y: 1 },
} as const;
```

## Use Cases

### Rendering Isometric Rooms

Use tile metadata to determine which edges and corners to render:

```typescript
for (let y = 0; y < tilemap.length; y++) {
  for (let x = 0; x < tilemap[y].length; x++) {
    const meta = getTileMeta(tilemap, x, y);

    if (meta.height !== undefined) {
      renderTile(x, y, meta.height);

      if (meta.rowEdge) renderLeftEdge(x, y);
      if (meta.colEdge) renderTopEdge(x, y);
      if (meta.innerEdge) renderInnerCorner(x, y);
    }
  }
}
```

### Collision Detection

Check if a position is walkable:

```typescript
function isWalkable(tilemap: TileMap, x: number, y: number): boolean {
  const tileCode = resolveTileCodeAt(tilemap, x, y);
  return tileCode !== 'x'; // Not empty
}
```

### Pathfinding Integration

Convert tilemap data for use with pathfinding algorithms:

```typescript
function createPathfindingGrid(tilemap: TileMap) {
  return tilemap.map((row) => row.map((tile) => (isNonEmptyTile(tile) ? 0 : 1)));
}
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
│   ├── types/           # TypeScript type definitions
│   │   ├── Tile.ts
│   │   └── TileMap.ts
│   ├── utils/           # Utility functions
│   │   ├── ensureTileMapBorders.ts
│   │   ├── getTileMeta.ts
│   │   ├── isNonEmptyTile.ts
│   │   ├── offsets.ts
│   │   ├── resolveTileCode.ts
│   │   └── resolveTileCodeAt.ts
│   └── index.ts         # Main entry point
├── dist/                # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Inspiration

This project is inspired by the [Shroom](https://github.com/jankuss/shroom) library and the Habbo Hotel room system. It aims to provide lightweight, reusable utilities for working with isometric tilemap data.

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
