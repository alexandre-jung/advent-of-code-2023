const fs = require('fs');
const path = require('path');

const ZERO_CHAR_CODE = '0'.charCodeAt(0);
const NINE_CHAR_CODE = '9'.charCodeAt(0);

const isDigit = (c) => {
  const charCode = c.charCodeAt(0);
  return charCode >= ZERO_CHAR_CODE && charCode <= NINE_CHAR_CODE;
};

const currentDir = path.resolve(__dirname);

const readDataFile = (filename) => {
  const dataPath = `${currentDir}/../data/${filename}`;
  return fs.readFileSync(dataPath).toString();
};

module.exports = {
  isDigit,
  readDataFile,
};
