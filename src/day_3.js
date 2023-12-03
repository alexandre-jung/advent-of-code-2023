const { isDigit, readDataFile } = require('./utils');

const data = readDataFile('day_3.txt');

// Part 1

const parseData = (data) => {
  let line = 0;
  let col = 0;
  const tokens = [];

  for (let i = 0; i < data.length; i ++) {
    const c = data[i];

    if (c === '.') {
      col ++;
    } else if (isDigit(c)) {
      let length = 0;

      do length ++;
      while (data[i + length] && isDigit(data[i + length]));

      let start = i;
      let end = i + length;

      const token = data.slice(start, end);
      i += length - 1;

      tokens.push({
        token,
        value: parseInt(token, 10),
        type: 'number',
        line,
        col,
      });

      col += length;

    } else if (c === '\n') {
      line ++;
      col = 0;
    } else {
      tokens.push({
        token: c,
        type: 'symbol',
        line,
        col,
      });

      col ++;
    }
  }

  return tokens;
};

const tokens = parseData(data);

const numberTokens = tokens.filter(token => token.type === 'number');
const symbolTokens = tokens.filter(token => token.type === 'symbol');

const findTokenAdjacentArea = (token) => {
  return {
    x: token.col - 1,
    y: token.line - 1,
    w: token.token.length + 2,
    h: 3,
  };
};

const isPointInArea = (point, area) => {
  return !(
    point.x < area.x || point.x > area.x + area.w - 1 ||
    point.y < area.y || point.y > area.y + area.h - 1
  );
};

const getTokenPosition = ({ line, col }) => {
  return {
    x: col,
    y: line,
  };
};

const partTokens = numberTokens.filter(token => {
  const area = findTokenAdjacentArea(token);

  return symbolTokens.some(token => {
    return isPointInArea({
      x: token.col,
      y: token.line,
    }, area);
  });
});

const sumOfPartNumbers = partTokens.reduce((acc, token) => acc + token.value, 0);

// Part 2

const possibleGearTokens = symbolTokens.filter(symbol => symbol.token === '*');
const partAreaPairs = partTokens.map(token => {
  return [
    token,
    findTokenAdjacentArea(token),
  ];
});

let sumOfGearRatios = 0;
for (const possibleGearToken of possibleGearTokens) {
  const gearPoint = getTokenPosition(possibleGearToken);
  const adjacentAreaPairs = partAreaPairs.filter(([, area]) => {
    return isPointInArea(gearPoint, area);
  });
  if (adjacentAreaPairs.length === 2) {
    const gearRation = adjacentAreaPairs[0][0].value * adjacentAreaPairs[1][0].value;
    sumOfGearRatios += gearRation;
  }
}

module.exports = {
  findTokenAdjacentArea,
  isPointInArea,
  parseData,
  results: {
    sumOfGearRatios,
    sumOfPartNumbers,
  },
};
