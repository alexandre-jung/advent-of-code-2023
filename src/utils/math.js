/**
 * Finds the greatest common divisor of two or more numbers.
 *
 * @return {number}
 *
 * {@link https://stackoverflow.com/a/68371339 How to calculate GCD on StackOverflow}
 */
const gcd = function (x, y, ...z) {
  if (!y && z.length > 0) return gcd(x, ...z);
  if (!y) return x;
  return gcd(y, x % y, ...z);
};

/**
 * Finds the least common multiple of two or more numbers.
 *
 * @return {number}
 *
 * {@link https://stackoverflow.com/a/68371339 How to calculate LCM on StackOverflow}
 */
const lcm = function (x, y, ...z) {
  if (z.length === 0) return x * y / gcd(x, y);
  return lcm(x * y / gcd(x, y), ...z);
};

module.exports = {
  gcd,
  lcm,
};
