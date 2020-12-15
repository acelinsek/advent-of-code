function parseInput(input) {
  array = input.split('\r\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  // --------------------- Part 1 ---------------------
  //   let numbers = data.match(/(-*\d+)/g);
  //   console.log(numbers.reduce((acc, n) => acc + +n, 0));

  // --------------------- Part 2 ---------------------
  let json = JSON.parse(data);

  console.log(searchRecursively(json));
});

function searchRecursively(el) {
  if (typeof el === 'string') {
    return 0;
  }

  if (typeof el === 'number') {
    return el;
  }

  if (!Array.isArray(el)) {
    if (Object.values(el).some(v => v === 'red')) {
      return 0;
    }

    let sum = 0;

    for (let i = 0; i < Object.keys(el).length; i++) {
      let key = Object.keys(el)[i];
      sum += searchRecursively(el[key]);
    }

    return sum;
  }

  let sum = 0;

  for (let i = 0; i < el.length; i++) {
    sum += searchRecursively(el[i]);
  }

  return sum;
}
