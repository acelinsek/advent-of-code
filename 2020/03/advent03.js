function parseInput(input) {
  array = input.split('\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const array = parseInput(data);

  const movement = [
    { rowJump: 1, colJump: 1 },
    { rowJump: 1, colJump: 3 },
    { rowJump: 1, colJump: 5 },
    { rowJump: 1, colJump: 7 },
    { rowJump: 2, colJump: 1 }
  ];

  let results = [];

  movement.forEach(move => {
    let column = 0;
    let rowJump = move.rowJump;
    let colJump = move.colJump;

    let trees = 0;

    for (let i = rowJump; i < array.length; i += rowJump) {
      const row = array[i];
      column = (colJump * (i / rowJump)) % row.length;

      if (row[column] === '#') {
        trees++;
      }
    }

    results.push(trees);
    console.log(trees);
  });
  console.log(results);

  let result = results.reduce((acc, res) => acc * res);

  console.log(result);
});
