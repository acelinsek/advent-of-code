function parseInput(input) {
  array = input.split('\r\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const array = parseInput(data);

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      for (let k = j + 1; k < array.length; k++) {
        if (
          parseInt(array[i]) + parseInt(array[j]) + parseInt(array[k]) ===
          2020
        ) {
          console.log(array[i] * array[j] * array[k]);
        }
      }
    }
  }
});
