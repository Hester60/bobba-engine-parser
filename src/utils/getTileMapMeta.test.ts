/**
 * @file getTileMapMeta.test.ts
 * @description Unit tests for the getTileMapMeta function
 * @note These tests were generated with AI assistance (Claude Sonnet 4.5)
 */

import { TileMap } from '../types/TileMap';
import { getTileMapMeta } from './getTileMapMeta';

describe('getTileMapMeta', () => {
  describe('Basic tilemap', () => {
    it('should return complete metadata for a simple 2x2 tilemap', () => {
      const tilemap: TileMap = [
        ['x', 'x'],
        ['x', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetX).toBe(0);
      expect(result.offsetY).toBe(0);
      expect(result.tilemap).toEqual(tilemap);
      expect(result.tilesMeta).toHaveLength(2);
      expect(result.tilesMeta[0]).toHaveLength(2);
    });

    it('should correctly identify empty tiles', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['x', '0', '0'],
        ['x', '0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[0][0].isEmpty).toBe(true);
      expect(result.tilesMeta[0][0].height).toBeUndefined();
      expect(result.tilesMeta[0][0].resolvedCode).toBe('x');
      expect(result.tilesMeta[0][0].initialCode).toBe('x');

      expect(result.tilesMeta[1][0].isEmpty).toBe(true);
      expect(result.tilesMeta[1][0].initialCode).toBe('x');

      expect(result.tilesMeta[1][1].isEmpty).toBe(false);
      expect(result.tilesMeta[1][1].height).toBe(0);
      expect(result.tilesMeta[1][1].resolvedCode).toBe(0);
      expect(result.tilesMeta[1][1].initialCode).toBe('0');

      expect(result.tilesMeta[2][2].isEmpty).toBe(false);
      expect(result.tilesMeta[2][2].height).toBe(0);
      expect(result.tilesMeta[2][2].resolvedCode).toBe(0);
      expect(result.tilesMeta[2][2].initialCode).toBe('0');
    });

    it('should correctly identify coordinates', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['x', '0', '1'],
        ['x', '0', '1'],
      ];

      const result = getTileMapMeta(tilemap);

      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          expect(result.tilesMeta[y][x].x).toBe(x);
          expect(result.tilesMeta[y][x].y).toBe(y);
        }
      }
    });
  });

  describe('Edge detection', () => {
    it('should detect rowEdge (left edge against empty space)', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['x', '0', '0'],
        ['x', '0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[1][1].rowEdge).toBe(true);
      expect(result.tilesMeta[2][1].rowEdge).toBe(true);

      expect(result.tilesMeta[1][2].rowEdge).toBe(false);
      expect(result.tilesMeta[2][2].rowEdge).toBe(false);
    });

    it('should detect colEdge (top edge against empty space)', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['x', '0', '0'],
        ['x', '0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[1][1].colEdge).toBe(true);
      expect(result.tilesMeta[1][2].colEdge).toBe(true);

      expect(result.tilesMeta[2][1].colEdge).toBe(false);
      expect(result.tilesMeta[2][2].colEdge).toBe(false);
    });

    it('should detect innerEdge (inner corner)', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x', 'x'],
        ['x', 'x', '0', '0'],
        ['x', '0', '0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[2][2].innerEdge).toBe(true);
    });
  });

  describe('Different tile heights', () => {
    it('should resolve numeric tile codes (0-9)', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x', 'x'],
        ['x', '0', '5', '9'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[1][1].height).toBe(0);
      expect(result.tilesMeta[1][1].resolvedCode).toBe(0);
      expect(result.tilesMeta[1][1].initialCode).toBe('0');

      expect(result.tilesMeta[1][2].height).toBe(5);
      expect(result.tilesMeta[1][2].resolvedCode).toBe(5);
      expect(result.tilesMeta[1][2].initialCode).toBe('5');

      expect(result.tilesMeta[1][3].height).toBe(9);
      expect(result.tilesMeta[1][3].resolvedCode).toBe(9);
      expect(result.tilesMeta[1][3].initialCode).toBe('9');
    });

    it('should resolve alphabetic tile codes (a-v for 10-31)', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x', 'x'],
        ['x', 'a', 'b', 'v'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[1][1].height).toBe(10);
      expect(result.tilesMeta[1][1].resolvedCode).toBe(10);
      expect(result.tilesMeta[1][1].initialCode).toBe('a');

      expect(result.tilesMeta[1][2].height).toBe(11);
      expect(result.tilesMeta[1][2].resolvedCode).toBe(11);
      expect(result.tilesMeta[1][2].initialCode).toBe('b');

      expect(result.tilesMeta[1][3].height).toBe(31);
      expect(result.tilesMeta[1][3].resolvedCode).toBe(31);
      expect(result.tilesMeta[1][3].initialCode).toBe('v');
    });
  });

  describe('Border handling', () => {
    it('should add top border when missing', () => {
      const tilemap: TileMap = [
        ['0', '0'],
        ['0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetY).toBe(1);
      expect(result.offsetX).toBe(1);
      expect(result.tilemap.length).toBe(3);
      expect(result.tilesMeta.length).toBe(3);
    });

    it('should add left border when missing', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['0', '0', '0'],
        ['0', '0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetX).toBe(1);
      expect(result.offsetY).toBe(0);
      expect(result.tilemap[0].length).toBe(4);
      expect(result.tilesMeta[0].length).toBe(4);
    });

    it('should add both borders when needed', () => {
      const tilemap: TileMap = [
        ['0', '0'],
        ['0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetY).toBe(1);
      expect(result.offsetX).toBe(1);
      expect(result.tilemap.length).toBe(3);
      expect(result.tilemap[0].length).toBe(3);
      expect(result.tilesMeta.length).toBe(3);
      expect(result.tilesMeta[0].length).toBe(3);
    });

    it('should not add borders when already present', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['x', '0', '0'],
        ['x', '0', '0'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetX).toBe(0);
      expect(result.offsetY).toBe(0);
      expect(result.tilemap).toEqual(tilemap);
    });
  });

  describe('Complex scenarios', () => {
    it('should handle irregular shaped tilemaps', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x', 'x'],
        ['x', '0', '0', 'x'],
        ['x', '0', 'x', '2'],
        ['x', 'x', '1', '2'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetX).toBe(0);
      expect(result.offsetY).toBe(0);
      expect(result.tilesMeta).toHaveLength(4);
      expect(result.tilesMeta[0]).toHaveLength(4);

      expect(result.tilesMeta[1][1].height).toBe(0);
      expect(result.tilesMeta[1][1].isEmpty).toBe(false);
      expect(result.tilesMeta[1][1].rowEdge).toBe(true);
      expect(result.tilesMeta[1][1].initialCode).toBe('0');

      expect(result.tilesMeta[2][3].height).toBe(2);
      expect(result.tilesMeta[2][3].isEmpty).toBe(false);
      expect(result.tilesMeta[2][3].initialCode).toBe('2');

      expect(result.tilesMeta[1][3].isEmpty).toBe(true);
      expect(result.tilesMeta[1][3].height).toBeUndefined();
      expect(result.tilesMeta[1][3].initialCode).toBe('x');
    });

    it('should handle tilemap with mixed heights', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x', 'x'],
        ['x', '0', '1', '2'],
        ['x', '3', 'a', 'b'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[1][1].height).toBe(0);
      expect(result.tilesMeta[1][1].initialCode).toBe('0');
      expect(result.tilesMeta[1][2].height).toBe(1);
      expect(result.tilesMeta[1][2].initialCode).toBe('1');
      expect(result.tilesMeta[1][3].height).toBe(2);
      expect(result.tilesMeta[1][3].initialCode).toBe('2');
      expect(result.tilesMeta[2][1].height).toBe(3);
      expect(result.tilesMeta[2][1].initialCode).toBe('3');

      expect(result.tilesMeta[2][2].height).toBe(10);
      expect(result.tilesMeta[2][2].initialCode).toBe('a');
      expect(result.tilesMeta[2][3].height).toBe(11);
      expect(result.tilesMeta[2][3].initialCode).toBe('b');
    });

    it('should handle single row tilemap with borders', () => {
      const tilemap: TileMap = [['x', '0', '1', '2']];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetY).toBe(1);
      expect(result.tilesMeta).toHaveLength(2);
      expect(result.tilesMeta[1]).toHaveLength(4);
      expect(result.tilesMeta[1][1].height).toBe(0);
      expect(result.tilesMeta[1][1].initialCode).toBe('0');
      expect(result.tilesMeta[1][2].height).toBe(1);
      expect(result.tilesMeta[1][2].initialCode).toBe('1');
      expect(result.tilesMeta[1][3].height).toBe(2);
      expect(result.tilesMeta[1][3].initialCode).toBe('2');
    });

    it('should handle single column tilemap', () => {
      const tilemap: TileMap = [['x'], ['x'], ['0']];

      const result = getTileMapMeta(tilemap);

      expect(result.offsetY).toBe(0);
      expect(result.offsetX).toBe(0);
      expect(result.tilesMeta).toHaveLength(3);
      expect(result.tilesMeta[0]).toHaveLength(1);
      expect(result.tilesMeta[2][0].height).toBe(0);
      expect(result.tilesMeta[2][0].initialCode).toBe('0');
    });
  });

  describe('InitialCode vs ResolvedCode', () => {
    it('should preserve initialCode as string and resolve to number', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x', 'x'],
        ['x', '0', '9', 'a'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result.tilesMeta[1][1].initialCode).toBe('0');
      expect(typeof result.tilesMeta[1][1].initialCode).toBe('string');
      expect(result.tilesMeta[1][1].resolvedCode).toBe(0);
      expect(typeof result.tilesMeta[1][1].resolvedCode).toBe('number');

      expect(result.tilesMeta[1][2].initialCode).toBe('9');
      expect(typeof result.tilesMeta[1][2].initialCode).toBe('string');
      expect(result.tilesMeta[1][2].resolvedCode).toBe(9);
      expect(typeof result.tilesMeta[1][2].resolvedCode).toBe('number');

      expect(result.tilesMeta[1][3].initialCode).toBe('a');
      expect(typeof result.tilesMeta[1][3].initialCode).toBe('string');
      expect(result.tilesMeta[1][3].resolvedCode).toBe(10);
      expect(typeof result.tilesMeta[1][3].resolvedCode).toBe('number');

      expect(result.tilesMeta[0][0].initialCode).toBe('x');
      expect(result.tilesMeta[0][0].resolvedCode).toBe('x');
    });
  });

  describe('Complete metadata structure', () => {
    it('should return all required fields for each tile', () => {
      const tilemap: TileMap = [
        ['x', 'x'],
        ['x', '0'],
      ];

      const result = getTileMapMeta(tilemap);
      const tile = result.tilesMeta[1][1];

      expect(tile).toHaveProperty('x');
      expect(tile).toHaveProperty('y');
      expect(tile).toHaveProperty('initialCode');
      expect(tile).toHaveProperty('height');
      expect(tile).toHaveProperty('rowEdge');
      expect(tile).toHaveProperty('colEdge');
      expect(tile).toHaveProperty('innerEdge');
      expect(tile).toHaveProperty('isEmpty');
      expect(tile).toHaveProperty('resolvedCode');

      expect(typeof tile.x).toBe('number');
      expect(typeof tile.y).toBe('number');
      expect(typeof tile.initialCode).toBe('string');
      expect(typeof tile.rowEdge).toBe('boolean');
      expect(typeof tile.colEdge).toBe('boolean');
      expect(typeof tile.innerEdge).toBe('boolean');
      expect(typeof tile.isEmpty).toBe('boolean');
    });

    it('should produce correct complete example', () => {
      const tilemap: TileMap = [
        ['x', 'x', 'x'],
        ['x', '0', '1'],
        ['x', '2', 'a'],
      ];

      const result = getTileMapMeta(tilemap);

      expect(result).toMatchObject({
        offsetX: 0,
        offsetY: 0,
        tilemap: [
          ['x', 'x', 'x'],
          ['x', '0', '1'],
          ['x', '2', 'a'],
        ],
      });

      expect(result.tilesMeta[0][0]).toMatchObject({
        x: 0,
        y: 0,
        initialCode: 'x',
        height: undefined,
        isEmpty: true,
        resolvedCode: 'x',
      });

      expect(result.tilesMeta[1][1]).toMatchObject({
        x: 1,
        y: 1,
        initialCode: '0',
        height: 0,
        isEmpty: false,
        resolvedCode: 0,
        rowEdge: true,
        colEdge: true,
      });

      expect(result.tilesMeta[2][2]).toMatchObject({
        x: 2,
        y: 2,
        initialCode: 'a',
        height: 10,
        isEmpty: false,
        resolvedCode: 10,
      });
    });
  });
});
