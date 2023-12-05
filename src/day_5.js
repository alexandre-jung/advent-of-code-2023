const { readDataFile } = require('./utils');

const data = readDataFile('day_5.txt');

const [header, ...body] = data.split(/\n{2}/);

const parseBody = raw => {
  const [header, ...body] = raw.split('\n').filter(Boolean);

  const match = /(?<src>\w+)-to-(?<dest>\w+)/g.exec(header);

  const { src, dest } = match.groups;

  if (!match) throw new Error('no match');

  // Warning: a line is in the form `<dest> <src> <range_length>`
  const ranges = body.map(b => b.split(' ')).map(([destStart, srcStart, length]) => {
    return {
      srcStart: parseInt(srcStart, 10),
      destStart: parseInt(destStart, 10),
      length: parseInt(length, 10),
    };
  });

  ranges.sort((a, b) => a.srcStart - b.srcStart);

  return {
    src,
    dest,
    ranges,
  };
};

const mapSrcToDest = (value, { srcStart, destStart, length }) => {
  const srcLast = srcStart + length - 1;
  const offset = destStart - srcStart;
  return value >= srcStart && value <= srcLast ? value + offset : null;
};

const findDest = (src, ranges) => {
  for (const range of ranges) {
    const result = mapSrcToDest(src, range);
    if (result) return result;
  }
  return src;
};

const mapMap = new Map();
const result = body.map(parseBody);

for (const r of result) {
  mapMap.set(r.src, r);
}

// A list of seeds
let seeds = header
  .replace('seeds:', '')
  .split(' ')
  .filter(Boolean)
  .map(n => parseInt(n, 10));

// Transform the list of seeds into pairs describing ranges
seeds = seeds.reduce((result, value, index, array) => {
  if (index % 2 === 0) {
    result.push(array.slice(index, index + 2));
  }
  return result;
}, []);

let minResult = null;

for (const [start, length] of seeds) {
  for (let i = 0; i < length; i ++) {
    let id = i + start;
    let src = 'seed';

    while (src) {
      const map = mapMap.get(src);
      if (!map) break;
      id = findDest(id, map.ranges);
      src = map ? map.dest : null;
    }

    if (minResult === null) {
      minResult = id;
    } else {
      minResult = Math.min(minResult, id);
    }
  }
}

const location = minResult;

module.exports = {
  mapSrcToDest,
  findDest,
  results: {
    location,
  },
};
