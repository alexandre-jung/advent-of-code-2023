const { lcm } = require('../math');

describe('math utils', () => {
  describe('lcm', () => {
    it('should find the least common multiple of 2 numbers', () => {
      expect(lcm(2, 3)).toEqual(6);
    });

    it('should find the least common multiple of 3 numbers', () => {
      expect(lcm(2, 3, 4)).toEqual(12);
    });
  });

  describe('gcd', () => {
    it('should find the greatest common divisor of 2 numbers', () => {
      expect(lcm(2, 3)).toEqual(6);
    });

    it('should find the greatest common divisor of 3 numbers', () => {
      expect(lcm(2, 3, 4)).toEqual(12);
    });
  });
});
