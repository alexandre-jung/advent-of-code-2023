const {
  COMBINATIONS,
  compareHands,
  compareHandsByFirstHighestCard,
  getCombinationStrength,
  sortHands,
  results,
} = require('../day_7');

describe.skip('day 7 - part 1', () => {
  describe('getCombinationStrength', () => {
    it('should compute combination strengths', () => {
      expect(getCombinationStrength('AAAAA')).toBe(COMBINATIONS.FIVE_OF_A_KIND);
      expect(getCombinationStrength('77777')).toBe(COMBINATIONS.FIVE_OF_A_KIND);

      expect(getCombinationStrength('AAAA8')).toBe(COMBINATIONS.FOUR_OF_A_KIND);
      expect(getCombinationStrength('AA8AA')).toBe(COMBINATIONS.FOUR_OF_A_KIND);

      expect(getCombinationStrength('23332')).toBe(COMBINATIONS.FULL_HOUSE);
      expect(getCombinationStrength('33322')).toBe(COMBINATIONS.FULL_HOUSE);

      expect(getCombinationStrength('TTT98')).toBe(COMBINATIONS.THREE_OF_A_KIND);
      expect(getCombinationStrength('9T8TT')).toBe(COMBINATIONS.THREE_OF_A_KIND);

      expect(getCombinationStrength('22334')).toBe(COMBINATIONS.TWO_PAIR);
      expect(getCombinationStrength('23432')).toBe(COMBINATIONS.TWO_PAIR);

      expect(getCombinationStrength('AA234')).toBe(COMBINATIONS.ONE_PAIR);
      expect(getCombinationStrength('A23A4')).toBe(COMBINATIONS.ONE_PAIR);

      expect(getCombinationStrength('23456')).toBe(COMBINATIONS.HIGH_CARD);
      expect(getCombinationStrength('56234')).toBe(COMBINATIONS.HIGH_CARD);
    });
  });

  describe('compareHandsByFirstHighestCard', () => {
    it('should find the strongest hand', () => {
      expect(compareHandsByFirstHighestCard('AAAAA', 'AAAAA')).toBe(0);
      expect(compareHandsByFirstHighestCard('33332', '2AAAA')).toBe(1);
      expect(compareHandsByFirstHighestCard('77788', '77888')).toBe(-1);
      expect(compareHandsByFirstHighestCard('77888', '77788')).toBe(1);
      expect(compareHandsByFirstHighestCard('A23A4', '23332')).toBe(1);
    });
  });

  describe('compareHands', () => {
    it('should find the strongest hand', () => {
      expect(compareHands('AAAAA', 'AAAAA')).toBe(0);
      expect(compareHands('77888', 'AAAAA')).toBe(-1);
      expect(compareHands('AAAAA', 'AA8AA')).toBe(1);
      expect(compareHands('77788', '77888')).toBe(-1);
      expect(compareHands('22223', '3333Q')).toBe(-1);
      expect(compareHands('A23A4', '23332')).toBe(-1);
      expect(compareHands('TTTTJ', '22223')).toBe(1);
      expect(compareHands('22223', 'TTTTJ')).toBe(-1);
    });

    it('should sort hands properly', () => {
      const hands = [
        ['2634T', 68],
        ['JJJJJ', 348], // strongest
        ['26A7K', 738],
        ['AAAA9', 864],
        ['259K3', 882], // weakest
        ['AAAQA', 978],
      ];
      expect(sortHands(hands)).toEqual([
        ['259K3', 882], // weakest
        ['2634T', 68],
        ['26A7K', 738],
        ['AAAQA', 978],
        ['AAAA9', 864],
        ['JJJJJ', 348], // strongest
      ]);
    });

    it('should sort hands properly', () => {
      const hands = [
        ['KTJJT', 2],
        ['T55J5', 4],
        ['32T3K', 1],
        ['QQQJA', 5],
        ['KK677', 3],
      ];
      expect(sortHands(hands)).toEqual([
        ['32T3K', 1],
        ['KTJJT', 2],
        ['KK677', 3],
        ['T55J5', 4],
        ['QQQJA', 5],
      ]);
    });

    it('should compute properly', () => {
      expect(results.totalWinnings).toBe(255048101);
    });
  });
});

describe('day 7 - part 2', () => {
  it('should compute properly', () => {
    expect(results.totalWinnings).toBe(253718286);
  });
});
