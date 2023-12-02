const {
  parseHeader,
  parseGameSet,
  parseBody,
  parseGameEntry,
  isSetPossible,
  findMinimalSetForGame,
  computeSetPower,
  results,
} = require('../day_2');

describe('day 2', () => {
  describe('parseHeader', () => {
    it('should find the game id', () => {
      const { id } = parseHeader('Game 42');
      expect(id).toBe(42);
    });
  });

  describe('parseGameSet', () => {
    it('should find quantities and colors', () => {
      const set = parseGameSet('1 blue, 2 green, 7 red');
      expect(set).toEqual({
        red: 7,
        green: 2,
        blue: 1,
      });
    });
  });

  describe('parseBody', () => {
    it('should find all sets', () => {
      const sets = parseBody('1 green, 2 blue; 13 red, 2 blue, 3 green; 4 green, 14 red');
      expect(sets).toEqual([
        {
          red: 0,
          green: 1,
          blue: 2,
        },
        {
          red: 13,
          green: 3,
          blue: 2,
        },
        {
          red: 14,
          green: 4,
          blue: 0,
        },
      ]);
    });
  });

  describe('parseGameEntry', () => {
    it('should parse a game entry', () => {
      const game = parseGameEntry('Game 1: 1 green, 2 blue; 13 red, 2 blue, 3 green; 4 green, 14 red');
      expect(game).toEqual({
        id: 1,
        sets: [
          {
            red: 0,
            green: 1,
            blue: 2,
          },
          {
            red: 13,
            green: 3,
            blue: 2,
          },
          {
            red: 14,
            green: 4,
            blue: 0,
          },
        ],
      });
    });
  });

  describe('isSetPossible', () => {
    it('should be true', () => {
      const result = isSetPossible({
        red: 12,
        green: 13,
        blue: 14,
      });
      expect(result).toBe(true);
    });

    it('should be false', () => {
      const result = isSetPossible({
        red: 12,
        green: 13,
        blue: 15,
      });
      expect(result).toBe(false);
    });
  });

  describe('findMinimalSetForGame', () => {
    it('should find the minimal set', () => {
      const result = findMinimalSetForGame({
        id: 1,
        sets: [
          {
            red: 0,
            green: 1,
            blue: 2,
          },
          {
            red: 13,
            green: 3,
            blue: 2,
          },
          {
            red: 14,
            green: 4,
            blue: 0,
          },
        ],
      });
      expect(result).toEqual({
        red: 14,
        green: 4,
        blue: 2,
      });
    });
  });

  describe('computeSetPower', () => {
    it('should be false', () => {
      const result = computeSetPower({
        red: 4,
        green: 2,
        blue: 6,
      });
      expect(result).toBe(48);
    });
  });

  describe('results', () => {
    it('should get the correct sum of valid game ids', () => {
      expect(results.sumOfValidGameIds).toBe(2541);
    });

    it('should get the total power', () => {
      expect(results.totalPower).toBe(66016);
    });
  });
});
