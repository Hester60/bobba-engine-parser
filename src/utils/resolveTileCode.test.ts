import { TileCode } from '../types/TileMap';
import { resolveTileCode } from './resolveTileCode';

describe('resolveTileCode', () => {
  it('should return "x" for empty  tiles', () => {
    expect(resolveTileCode('x')).toBe('x');
  });

  it('should convert numeric tile codes', () => {
    expect(resolveTileCode('1')).toBe(1);
    expect(resolveTileCode('0')).toBe(0);
  });

  it('should convert letter tile codes', () => {
    expect(resolveTileCode('a')).toBe(10);
    expect(resolveTileCode('v')).toBe(31);
  });

  it('should handle null', () => {
    expect(resolveTileCode(null as unknown as TileCode)).toBe('x'); // it should never happen
  });
});
