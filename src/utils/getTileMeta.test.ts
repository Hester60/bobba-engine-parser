import { TileMap } from '../types/TileMap';
import { TileMeta } from '../types/Tile';
import { getTileMeta } from './getTileMeta';

describe('getTileMeta', () => {
  const tilemap: TileMap = [
    ['x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', '0', '0'],
    ['x', 'x', 'x', '0', '0'],
    ['x', 'x', 'x', '0', '0'],
    ['x', '0', '0', '0', '0'],
    ['x', '0', '0', '0', '0'],
  ];

  it('should return inner edge meta data', () => {
    const expectedResult: TileMeta = {
      height: 0,
      rowEdge: false,
      colEdge: false,
      innerEdge: true,
      neighbors: {
        top: { height: 0 },
        bottom: { height: 0 },
        left: { height: 0 },
        right: { height: 0 },
      },
    };

    expect(getTileMeta(tilemap, 3, 4)).toEqual(expectedResult);
  });

  it('should return row edge meta data', () => {
    const expectedResult: TileMeta = {
      height: 0,
      rowEdge: true,
      colEdge: false,
      innerEdge: false,
      neighbors: {
        top: { height: 0 },
        bottom: { height: 0 },
        left: { height: 0 },
        right: { height: 0 },
      },
    };

    expect(getTileMeta(tilemap, 1, 5)).toEqual(expectedResult);
  });

  it('should return col edge meta data', () => {
    const expectedResult: TileMeta = {
      height: 0,
      rowEdge: true,
      colEdge: true,
      innerEdge: false,
      neighbors: {
        top: { height: 0 },
        bottom: { height: 0 },
        left: { height: 0 },
        right: { height: 0 },
      },
    };

    expect(getTileMeta(tilemap, 1, 4)).toEqual(expectedResult);
  });

  it('should handle empty tile', () => {
    const expectedResult: TileMeta = {
      height: undefined,
      rowEdge: false,
      colEdge: false,
      innerEdge: false,
      neighbors: {
        top: { height: 0 },
        bottom: { height: 0 },
        left: { height: 0 },
        right: { height: 0 },
      },
    };

    expect(getTileMeta(tilemap, 1, 1)).toEqual(expectedResult);
  });

  it('should handle out-of-map positions', () => {
    const expectedResult: TileMeta = {
      height: undefined,
      rowEdge: false,
      colEdge: false,
      innerEdge: false,
      neighbors: {
        top: { height: 0 },
        bottom: { height: 0 },
        left: { height: 0 },
        right: { height: 0 },
      },
    };

    expect(getTileMeta(tilemap, -1, -1)).toEqual(expectedResult);
  });
});
