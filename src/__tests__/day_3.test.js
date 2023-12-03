const {
  findTokenAdjacentArea,
  isPointInArea,
  parseData,
  results,
} = require('../day_3');

describe('day 3', () => {
  describe('parseData', () => {
    it('should find the tokens', () => {
      const data = `.888.42.......\n*........979`;
      const result = parseData(data);
      expect(result).toEqual(
        [
          {
            token: '888',
            value: 888,
            type: 'number',
            line: 0,
            col: 1,
          },
          {
            token: '42',
            value: 42,
            type: 'number',
            line: 0,
            col: 5,
          },
          {
            token: '*',
            type: 'symbol',
            line: 1,
            col: 0,
          },
          {
            token: '979',
            value: 979,
            type: 'number',
            line: 1,
            col: 9,
          },
        ],
      );
    });
  });

  describe('findTokenAdjacentArea', () => {
    it('should find the area', () => {
      const result = findTokenAdjacentArea({
        token: '42',
        value: 42,
        type: 'number',
        line: 1,
        col: 1,
      });
      expect(result).toEqual({
        x: 0,
        y: 0,
        w: 4,
        h: 3,
      });
    });
  });

  describe('isPointInArea', () => {
    it('should return true', () => {
      const result = isPointInArea(
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 0,
          w: 4,
          h: 3,
        },
      );
      expect(result).toBe(true);
    });

    it('should return true', () => {
      const result = isPointInArea(
        {
          x: 3,
          y: 2,
        },
        {
          x: 0,
          y: 0,
          w: 4,
          h: 3,
        },
      );
      expect(result).toBe(true);
    });

    it('should return false', () => {
      const result = isPointInArea(
        {
          x: 4,
          y: 2,
        },
        {
          x: 0,
          y: 0,
          w: 4,
          h: 3,
        },
      );
      expect(result).toBe(false);
    });

    it('should return false', () => {
      const result = isPointInArea(
        {
          x: 3,
          y: 3,
        },
        {
          x: 0,
          y: 0,
          w: 4,
          h: 3,
        },
      );
      expect(result).toBe(false);
    });
  });

  describe('results', () => {
    it('should find the correct sum of part numbers', () => {
      expect(results.sumOfPartNumbers).toBe(520135);
    });
  });

  describe('results', () => {
    it('should find the correct sum of gear ratios', () => {
      expect(results.sumOfGearRatios).toBe(72514855);
    });
  });
});
