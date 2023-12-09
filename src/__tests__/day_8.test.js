const { results } = require('../day_8');

describe('day 8', () => {
  describe('results', () => {
    it('should find the result for part 1', () => {
      expect(results.result1).toBe(19783);
    });

    it('should find the result for part 2', () => {
      expect(results.result2).toBe(9177460370549);
    });
  });
});
