const { mapSrcToDest, findDest, results } = require('../day_5');

describe('day 4', () => {
  describe('mapSrcToDest', () => {
    it('should map', () => {
      expect(mapSrcToDest(- 1, { srcStart: 0, destStart: 2, length: 2 })).toBe(null);
      expect(mapSrcToDest(0, { srcStart: 0, destStart: 2, length: 2 })).toBe(2);
      expect(mapSrcToDest(1, { srcStart: 0, destStart: 2, length: 2 })).toBe(3);
      expect(mapSrcToDest(2, { srcStart: 0, destStart: 2, length: 2 })).toBe(null);
    });
  });

  describe('findDest', () => {
    it('should find the destinations', () => {
      const ranges = [
        { srcStart: 2, destStart: 12, length: 3 },
        { srcStart: 15, destStart: 18, length: 2 },
      ];
      expect(findDest(1, ranges)).toBe(1);
      expect(findDest(2, ranges)).toBe(12);
      expect(findDest(4, ranges)).toBe(14);
      expect(findDest(14, ranges)).toBe(14);
      expect(findDest(15, ranges)).toBe(18);
      expect(findDest(16, ranges)).toBe(19);
      expect(findDest(17, ranges)).toBe(17);
    });
  });

  describe('results', () => {
    it('should find the location', () => {
      // Be careful, it is very, very slow!
      expect(results.location).toBe(15290096);
    });
  });
});
