const { readDataFile } = require('./utils');

const data = readDataFile('day_7.txt')
  .split('\n')
  .filter(Boolean)
  .map(d => d.split(' '))
  .map(([hand, bid]) => [hand, parseInt(bid, 10)]);

const COMBINATIONS = {
  FIVE_OF_A_KIND: 6,
  FOUR_OF_A_KIND: 5,
  FULL_HOUSE: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
  HIGH_CARD: 0,
};

const getCombinationStrength = (hand) => {
  const map = new Map();

  for (const card of hand) {
    if (!map.has(card)) map.set(card, 0);
    map.set(card, map.get(card) + 1);
  }

  const a = Array.from(map).map(([, n]) => n);

  switch (a.length) {
    case 1:
      return COMBINATIONS.FIVE_OF_A_KIND;

    case 2: {
      if (a.includes(4)) {
        if (map.get('J') === 4) return COMBINATIONS.FIVE_OF_A_KIND;
        if (map.get('J') === 1) return COMBINATIONS.FIVE_OF_A_KIND;
        return COMBINATIONS.FOUR_OF_A_KIND;  // 4 - 1
      }
      if (map.get('J') === 3) return COMBINATIONS.FIVE_OF_A_KIND;
      if (map.get('J') === 2) return COMBINATIONS.FIVE_OF_A_KIND;
      return COMBINATIONS.FULL_HOUSE;  // 3 - 2
    }

    case 3: {
      if (a.includes(3)) {
        if (map.get('J') === 3) return COMBINATIONS.FOUR_OF_A_KIND;
        if (map.get('J') === 1) return COMBINATIONS.FOUR_OF_A_KIND;
        return COMBINATIONS.THREE_OF_A_KIND;  // 3 - 1 - 1
      }
      if (map.get('J') === 2) return COMBINATIONS.FOUR_OF_A_KIND;
      if (map.get('J') === 1) return COMBINATIONS.FULL_HOUSE;
      return COMBINATIONS.TWO_PAIR;  // 2 - 2 - 1
    }

    case 4: {
      if (map.get('J') === 2) return COMBINATIONS.THREE_OF_A_KIND;
      if (map.get('J') === 1) return COMBINATIONS.THREE_OF_A_KIND;
      return COMBINATIONS.ONE_PAIR; // 2 - 1 - 1 - 1
    }

    case 5: {
      if (map.get('J') === 1) return COMBINATIONS.ONE_PAIR;
      return COMBINATIONS.HIGH_CARD;
    }
  }
};

const STRONGEST = 1;
const WEAKEST = -1;

const FACE_CARD_VALUES = ['A', 'K', 'Q', 'J', 'T'];

const compareHandsByFirstHighestCard = (hA, hB) => {
  for (let i = 0; i < 5; i++) {
    const cA = hA[i];
    const cB = hB[i];

    if (cA === cB) continue;

    if (cA === 'J') return WEAKEST;
    if (cB === 'J') return STRONGEST;

    for (const value of FACE_CARD_VALUES) {
      if (cA === value) return STRONGEST;
      if (cB === value) return WEAKEST;
    }

    return cA.localeCompare(cB);
  }
  return 0;
};

const compareHands = (hA, hB) => {
  const sA = getCombinationStrength(hA);
  const sB = getCombinationStrength(hB);

  if (sA !== sB) return sA < sB ? -1 : 1;

  return compareHandsByFirstHighestCard(hA, hB);
};

const sortHands = hands => hands.toSorted(([hA], [hB]) => {
  return compareHands(hA, hB);
});

const sortedHandBidPairs = sortHands(data);

const totalWinnings = sortedHandBidPairs
  .reduce((result, [, bid], index) => {
    const rank = index + 1;
    return result + bid * rank;
  }, 0);

module.exports = {
  COMBINATIONS,
  compareHands,
  compareHandsByFirstHighestCard,
  getCombinationStrength,
  sortHands,
  results: {
    totalWinnings,
  },
};
