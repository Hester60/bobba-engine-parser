import { TileNeighbors } from '../types/Tile';
import { getTileNeighbors } from './getTileNeighbors';
import { TileMap } from '../types/TileMap';

describe('getTileNeighbors', () => {
  const tilemap: TileMap = [
    ['x', 'x', 'x', 'x'],
    ['x', '1', '1', '1'],
    ['x', '1', '1', '1'],
    ['x', '1', '1', '1'],
  ];

  it('should return top 0, left 0, right 1, bottom 1', () => {
    const expected: TileNeighbors = {
      top: {
        height: 0,
      },
      bottom: {
        height: 1,
      },
      left: {
        height: 0,
      },
      right: {
        height: 1,
      },
    };

    expect(getTileNeighbors(tilemap, 1, 1)).toEqual(expected);
  });

  it('should return top 0, left 0, right 0, bottom 0', () => {
    const expected: TileNeighbors = {
      top: {
        height: 0,
      },
      bottom: {
        height: 0,
      },
      left: {
        height: 0,
      },
      right: {
        height: 0,
      },
    };

    expect(getTileNeighbors(tilemap, 0, 0)).toEqual(expected);
  });

  it('should return top 1, left 1, bottom 0, right 0', () => {
    const expected: TileNeighbors = {
      top: {
        height: 1,
      },
      bottom: {
        height: 0,
      },
      left: {
        height: 1,
      },
      right: {
        height: 0,
      },
    };

    expect(getTileNeighbors(tilemap, 3, 3)).toEqual(expected);
  });
});
