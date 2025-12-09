import { TileMap } from '../types/TileMap';
import { resolveTileCodeAt } from './resolveTileCodeAt';

const basicMap: TileMap = [
  ['x', 'x', 'x'],
  ['x', '0', '0'],
  ['x', '0', '0'],
];

const trickyMap: TileMap = [
  ['x', '0', 'x'],
  ['x', 'x', '0', 'x'],
  ['x', '0', '0'],
];

const offsets = [
  'none',
  'top',
  'bottom',
  'left',
  'right',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;

describe('resolveTileCodeAt - basic map', () => {
  it('should return correct tile number', () => {
    expect(resolveTileCodeAt(basicMap, 1, 1)).toBe(0);
    expect(resolveTileCodeAt(basicMap, 2, 1)).toBe(0);
  });

  it('should return "x" for empty tile', () => {
    expect(resolveTileCodeAt(basicMap, 0, 0)).toBe('x');
    expect(resolveTileCodeAt(basicMap, 0, 2)).toBe('x');
  });

  it('should return "x" for out-of-bounds', () => {
    expect(resolveTileCodeAt(basicMap, 3, 3)).toBe('x');
    expect(resolveTileCodeAt(basicMap, -1, 0)).toBe('x');
  });
});

describe('resolveTileCodeAt - tricky map', () => {
  it('should return correct tile number', () => {
    expect(resolveTileCodeAt(trickyMap, 1, 0)).toBe(0);
    expect(resolveTileCodeAt(trickyMap, 2, 1)).toBe(0);
    expect(resolveTileCodeAt(trickyMap, 2, 2)).toBe(0);
  });

  it('should return "x" for empty space and irregular positions', () => {
    expect(resolveTileCodeAt(trickyMap, 0, 0)).toBe('x');
    expect(resolveTileCodeAt(trickyMap, 3, 1)).toBe('x');
    expect(resolveTileCodeAt(trickyMap, 3, 0)).toBe('x'); // out-of-bounds
  });
});

describe('resolveTileCodeAt with offsets', () => {
  it('should correctly apply offsets', () => {
    const x = 1;
    const y = 1;

    const expectedResults: Record<(typeof offsets)[number], number | 'x'> = {
      none: 0,
      top: 'x',
      bottom: 0,
      left: 'x',
      right: 0,
      topLeft: 'x',
      topRight: 'x',
      bottomLeft: 'x',
      bottomRight: 0,
    };

    offsets.forEach((offset) => {
      expect(resolveTileCodeAt(basicMap, x, y, offset)).toBe(expectedResults[offset]);
    });
  });
});
