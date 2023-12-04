const { results } = require('../day_4');

describe('day 4', () => {
  describe('results', () => {
    it('should count the points', () => {
      expect(results.points).toEqual(27059);
    });

    it('should count all the processed cards', () => {
      expect(results.totalOfProcessedCards).toBe(5744979);
    });
  });
});
