const { readDataFile } = require('./utils');

const data = readDataFile('day_6.txt');

const parseDataToRace = (data) => {
  const [times, distances] = data
    .split('\n')
    .filter(Boolean)
    .map(d => d.split(':')[1])
    .map(d => d.replaceAll(' ', ''));

  return {
    race: 0,
    time: times,
    distance: distances,
  };
};


const computeRacePossibilities = ({ time, distance }) => {
  const computeDistanceFromHoldingTime = (holdingTime) => {
    const speed = holdingTime;
    const movingTime = time - holdingTime;
    return movingTime * speed;
  };

  let possibilities = 0;
  for (let holdingTime = 0; holdingTime <= time; holdingTime++) {
    if (computeDistanceFromHoldingTime(holdingTime) > distance) {
      possibilities++;
    }
  }
  return possibilities;
};

const race = parseDataToRace(data);
const possibilities = computeRacePossibilities(race);

module.exports = {
  results: {
    possibilities,
  },
};
