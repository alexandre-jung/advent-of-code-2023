const { readDataFile } = require('./utils');

const data = readDataFile('day_4.txt');

const extractNumbers = (numberListString) => {
  return numberListString
    .split(' ')
    .filter(Boolean)
    .map(n => n.trim())
    .map(n => parseInt(n, 10));
};

const parseCard = (card) => {
  const [header, game] = card.split(':');
  const id = parseInt(header.match(/Card +(\d+)/)[1], 10);
  const [winning, played] = game.split('|');
  const winningNumbers = new Set(extractNumbers(winning));
  const playedNumbers = extractNumbers(played);

  return {
    id,
    winningNumbers,
    playedNumbers,
  };
};

const getCardCopyIds = ({ id, numberOfWins }) => {
  return new Array(numberOfWins)
    .fill(id + 1)
    .map((n, i) => n + i);
};

const processCard = ({
  id,
  winningNumbers,
  playedNumbers,
}) => {
  const numberOfWins = playedNumbers.reduce((acc, n) => {
    return winningNumbers.has(n) ? acc + 1 : acc;
  }, 0);

  const copyIds = getCardCopyIds({ id, numberOfWins });

  return {
    id,
    winningNumbers,
    playedNumbers,
    numberOfWins,
    copyIds,
  };
};

const computeCardPoints = ({ winningNumbers, playedNumbers }) => {
  let result = 0;
  for (const played of playedNumbers) {
    if (!winningNumbers.has(played)) continue;
    result *= 2;
    if (!result) result = 1;
  }
  return result;
};

const allCards = data
  .split('\n')
  .filter(Boolean)
  .map(card => parseCard(card));

const processedCards = allCards.map(processCard);

const cardMap = new Map();

for (const processedCard of processedCards) {
  cardMap.set(processedCard.id, processedCard);
}

const points = processedCards.reduce((acc, card) => {
  return acc + computeCardPoints(card);
}, 0);

let totalOfProcessedCards = allCards.length;
let cardsToProcess = allCards;

while (cardsToProcess.length) {
  const copyIds = cardsToProcess.map(processCard).map(c => c.copyIds);
  let nextCardsToProcess = [];
  for (const ids of copyIds) {
    for (const id of ids) {
      nextCardsToProcess.push(cardMap.get(id));
      totalOfProcessedCards++;
    }
  }
  cardsToProcess = nextCardsToProcess;
}

module.exports = {
  results: {
    points,
    totalOfProcessedCards,
  },
};
