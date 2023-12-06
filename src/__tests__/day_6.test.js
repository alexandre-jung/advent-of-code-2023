const { results } = require('../day_6');

describe('day 6', () => {
  describe('results', () => {
    it('should get possibilities', () => {
      expect(results.possibilities).toEqual(36992486);
    });
  });
});
