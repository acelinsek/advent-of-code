function parseInput(input) {
  array = input.split('\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const array = parseInput(data);

  let result = array.reduce((acc, dimString) => {
    // ------------------- Part 1 -------------------
    // const dimensions = dimString.split('x');

    // const area1 = dimensions[0] * dimensions[1];
    // const area2 = dimensions[0] * dimensions[2];
    // const area3 = dimensions[1] * dimensions[2];

    // const area = 2 * (area1 + area2 + area3) + Math.min(area1, area2, area3);

    // return acc + area;

    // ------------------- Part 2 -------------------
    const dimensions = dimString
      .split('x')
      .map(x => +x)
      .sort((a, b) => a - b);

    const circ = 2 * (dimensions[0] + dimensions[1]);
    const bow = dimensions.reduce((acc2, dim) => acc2 * dim);

    return acc + circ + bow;
  }, 0);

  console.log(result);
});
