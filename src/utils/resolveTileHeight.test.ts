import { resolveTileHeight } from './resolveTileHeight';

describe('resolveTileHeight', () => {
  it('should return a number', () => {
    expect(resolveTileHeight(2)).toBe(2);
    expect(resolveTileHeight(1)).toBe(1);
  });

  it('should return 0 for empty tiles', () => {
    expect(resolveTileHeight('x')).toBe(0);
  });

  it('should return 0 for undefined tile', () => {
    expect(resolveTileHeight(undefined)).toBe(0);
  });

  it('should return 0 for null tile', () => {
    expect(resolveTileHeight(null)).toBe(0);
  });
});
