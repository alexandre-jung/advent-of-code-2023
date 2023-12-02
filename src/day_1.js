const { readDataFile } = require('./utils');

const ZERO_CHAR_CODE = '0'.charCodeAt(0);
const NINE_CHAR_CODE = '9'.charCodeAt(0);

const ALPHA_TO_NUMBERS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const ALPHA_NUMBERS_REGEX = /^(one|two|three|four|five|six|seven|eight|nine)/;

const sumOfCalibrationValues = readDataFile('day_1.txt')
  .split('\n')
  .map(decode)
  .map(e => parseInt(e, 10))
  .filter(value => !isNaN(value))
  .reduce((acc, v) => acc + v, 0);

function decode(entry) {
  let first = null;
  let last = null;

  for (let i = 0; i < entry.length; i++) {
    const charCode = entry.charCodeAt(i);
    let number = null;

    if (charCode >= ZERO_CHAR_CODE && charCode <= NINE_CHAR_CODE) {
      number = entry[i];
    } else {
      const substr = entry.substring(i);
      const search = substr.match(ALPHA_NUMBERS_REGEX);

      if (!search) continue;
      number = ALPHA_TO_NUMBERS[search[0]];
      i += search[0].length - 2;
    }

    if (first === null) first = number;
    if (number) last = number;
  }

  return [first, last].join('');
}

console.log(sumOfCalibrationValues);  // 54094

module.exports = {
  decode,
  results: {
    sumOfCalibrationValues,
  },
};
