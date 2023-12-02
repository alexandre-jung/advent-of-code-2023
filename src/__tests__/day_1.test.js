const { decode, results } = require('../day_1');

describe('day 1', () => {
  describe('decode', () => {
    test('15', () => {
      expect(decode('foo1bar235test')).toBe('15');
    });

    test('12', () => {
      expect(decode('foo1bar2')).toBe('12');
    });

    test('11', () => {
      expect(decode('foo1')).toBe('11');
    });

    test('empty', () => {
      expect(decode('foo')).toBe('');
    });

    test('3fiveone', () => {
      expect(decode('3fiveone')).toBe('31');
    });

    test('qhstsbxsspsrfourmtvtnfhxlj699one', () => {
      expect(decode('qhstsbxsspsrfourmtvtnfhxlj699one')).toBe('41');
    });

    test('9ninemdkkqjzjfour9mzspzjgmlhfq', () => {
      expect(decode('9ninemdkkqjzjfour9mzspzjgmlhfq')).toBe('99');
    });

    test('dbvjtf294threefournine', () => {
      expect(decode('dbvjtf294threefournine')).toBe('29');
    });

    test('eightnineseventwo1seven', () => {
      expect(decode('eightnineseventwo1seven')).toBe('87');
    });
  });

  describe('results', () => {
    it('should find 54094', () => {
      expect(results.sumOfCalibrationValues).toBe(54094);
    });
  });
});
