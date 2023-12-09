const { readDataFile } = require('./utils');
const math = require('./utils/math');

const data = readDataFile('day_8.txt');

const NODE_REGEXP = /(?<id>\w+) = \((?<left>\w+), (?<right>\w+)\)/;

const [instructions, ...treeData] = data.split('\n').filter(Boolean);

const nodes = treeData.map(d => {
  const match = d.match(NODE_REGEXP);

  if (!match) throw new Error('Invalid data');

  const {
    groups: {
      id,
      left,
      right,
    },
  } = match;

  return {
    id,
    left,
    right,
  };
});

const map = new Map(nodes.map((node) => [node.id, node]));

let instructionIndex = 0;
let currentId = 'AAA';
let steps = 0;

while (currentId !== 'ZZZ') {
  const currentNode = map.get(currentId);
  const instruction = instructions[instructionIndex];

  currentId = instruction === 'L' ? currentNode.left : currentNode.right;
  steps ++;

  instructionIndex ++;
  if (instructionIndex === instructions.length) instructionIndex = 0;
}

const result1 = steps;

// Part 2

const isStartingNodeId = (id) => id.endsWith('A');
const isEndingNodeId = (id) => id.endsWith('Z');

let startingIds = nodes.map(({ id }) => id).filter(isStartingNodeId);
instructionIndex = 0;
steps = 0;

const pathLengths = [];

for (const startingId of startingIds) {
  instructionIndex = 0;
  steps = 0;
  let currentId = startingId;
  while (!isEndingNodeId(currentId)) {
    const currentNode = map.get(currentId);
    const instruction = instructions[instructionIndex];

    currentId = instruction === 'L' ? currentNode.left : currentNode.right;
    steps ++;

    instructionIndex ++;
    if (instructionIndex === instructions.length) instructionIndex = 0;
  }
  pathLengths.push(steps);
}

const result2 = math.lcm(...pathLengths);

module.exports = {
  results: {
    result1,
    result2,
  },
};
