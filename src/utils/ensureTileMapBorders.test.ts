import { ensureTileMapBorders } from './ensureTileMapBorders';
import { TileMap, TileMapBordersResult } from '../types/TileMap';

describe('ensureTileMapBorders', () => {
  it('should add borders to the top of the map', () => {
    const tilemap: TileMap = [
      ['x', '0', 'x'],
      ['x', '0', '0'],
      ['x', '0', '0'],
    ];

    const expectedResult: TileMapBordersResult = {
      tilemap: [
        ['x', 'x', 'x'],
        ['x', '0', 'x'],
        ['x', '0', '0'],
        ['x', '0', '0'],
      ],
      offsetX: 0,
      offsetY: 1,
    };

    expect(ensureTileMapBorders(tilemap)).toStrictEqual(expectedResult);
  });

  it('should add borders to the left of the map', () => {
    const tilemap: TileMap = [
      ['x', 'x', 'x'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];

    const expectedResult: TileMapBordersResult = {
      tilemap: [
        ['x', 'x', 'x', 'x'],
        ['x', '0', '0', '0'],
        ['x', '0', '0', '0'],
      ],
      offsetX: 1,
      offsetY: 0,
    };

    expect(ensureTileMapBorders(tilemap)).toStrictEqual(expectedResult);
  });

  it('should not add borders to the left of the map', () => {
    const tilemap: TileMap = [
      ['x', 'x', 'x'],
      ['0', '0', '0'],
      ['x', '0', '0'],
    ];

    const expectedResult: TileMapBordersResult = {
      tilemap: [
        ['x', 'x', 'x'],
        ['0', '0', '0'],
        ['x', '0', '0'],
      ],
      offsetX: 0,
      offsetY: 0,
    };

    expect(ensureTileMapBorders(tilemap)).toStrictEqual(expectedResult);
  });
});
