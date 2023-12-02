const { readDataFile } = require('./utils');

const data = readDataFile('day_2.txt');

// Part 1

const parseHeader = (header) => {
  const gameIdMatch = header.match(/Game (\d+)/);
  if (!gameIdMatch) return;
  const id = parseInt(gameIdMatch[1], 10);
  if (isNaN(id)) return;
  return { id };
};

const parseGameSet = (set) => {
  const result = {
    red: 0,
    green: 0,
    blue: 0,
  };

  set.split(',').map(e => e.trim()).forEach(e => {
    const match = e.match(/(\d+) (red|green|blue)/);
    const quantity = parseInt(match[1], 10);
    const color = match[2];
    result[color] = quantity;
  });

  return result;
};

const parseBody = (sets) => {
  return sets.split(';').map(parseGameSet);
};

const parseGameEntry = (entry) => {
  const [header, body] = entry.split(':');
  const { id } = parseHeader(header);
  const sets = parseBody(body);

  return {
    id,
    sets,
  };
};

const MAX_SET_QUANTITIES = {
  red: 12,
  green: 13,
  blue: 14,
};

const isSetPossible = ({ red, green, blue }) => {
  return (
    red <= MAX_SET_QUANTITIES.red &&
    green <= MAX_SET_QUANTITIES.green &&
    blue <= MAX_SET_QUANTITIES.blue
  );
};

const isGamePossible = (({ sets }) => {
  return sets.every(isSetPossible);
});

const gamesEntries = data
  .split('\n')
  .filter(Boolean)
  .map(entry => parseGameEntry(entry));

const sumOfValidGameIds = gamesEntries
  .filter(game => isGamePossible(game))
  .reduce((acc, possibleGame) => acc + possibleGame.id, 0);

// Part 2

const findMinimalSetForGame = ({ sets }) => {
  const minimalSet = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const set of sets) {
    if (set.red > minimalSet.red) minimalSet.red = set.red;
    if (set.green > minimalSet.green) minimalSet.green = set.green;
    if (set.blue > minimalSet.blue) minimalSet.blue = set.blue;
  }

  return minimalSet;
};

const computeSetPower = ({ red, green, blue }) => {
  return red * green * blue;
};

const totalPower = gamesEntries.reduce((acc, game) => {
  const minimalSet = findMinimalSetForGame(game);
  return acc + computeSetPower(minimalSet);
}, 0);

module.exports = {
  parseHeader,
  parseGameSet,
  parseBody,
  parseGameEntry,
  isSetPossible,
  findMinimalSetForGame,
  computeSetPower,
  results: {
    sumOfValidGameIds,
    totalPower,
  },
};
