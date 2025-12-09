import { isNonEmptyTile } from './isNonEmptyTile';

describe('isNonEmptyTile', () => {
  it('should return true for non-empty tiles', () => {
    expect(isNonEmptyTile(0)).toBe(true);
    expect(isNonEmptyTile(20)).toBe(true);
  });

  it('should return false for empty tiles', () => {
    expect(isNonEmptyTile('x')).toBe(false);
  });
});
