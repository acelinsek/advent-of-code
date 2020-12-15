function parseInput(input) {
  array = input.split('\r\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input_test.txt', 'utf8', (err, data) => {
  let numbers = parseInput(data)
    .map(x => +x)
    .sort((a, b) => a - b);

  // add 0 as starting point
  numbers.unshift(0);

  // --------------------- Part 1 ---------------------
  //   let joltDifferences = [0, 0, 0];
  //
  //   for (let i = 1; i < numbers.length; i++) {
  //     joltDifferences[numbers[i] - numbers[i - 1] - 1]++;
  //   }
  //
  //   // add adapter's fixed 3
  //   joltDifferences[2]++;
  //
  //   console.log(joltDifferences[0] * joltDifferences[2]);

  // --------------------- Part 2 ---------------------
  // initialize with 1 for the first and 0 for the rest
  let ways = numbers.map((x, i) => (i == 0 ? 1 : 0));

  for (let i = 0; i < ways.length; i++) {
    for (let j = i - 3; j < i; j++) {
      // add ways using previous 3 numbers
      if (numbers[i] <= numbers[j] + 3) {
        ways[i] += ways[j];
      }
    }
  }

  console.log(ways[ways.length - 1]);
});
