const fs = require('fs');
const path = require('path');

const currentDir = path.resolve(__dirname);

const readDataFile = (filename) => {
  const dataPath = `${currentDir}/../data/${filename}`;
  return fs.readFileSync(dataPath).toString();
};

module.exports = {
  readDataFile,
};
