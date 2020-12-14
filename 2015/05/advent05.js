function parseInput(input) {
  array = input.split('\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const strings = parseInput(data);

  const nice = strings.reduce((acc, s) => {
    // ---------------------- Part 1 ----------------------
    // const forbidden = s.match(/ab|cd|pq|xy/);
    // const vowels = s.match(/(.*[aeiou]){3}/);
    // const duplicated = s.match(/(.)\1/);

    // if (!forbidden && vowels && duplicated) {
    //   return acc + 1;
    // }

    // ---------------------- Part 2 ----------------------
    const repeat = s.match(/(..).*\1/);
    const spaced = s.match(/(.).\1/);

    if (repeat && spaced) {
      return acc + 1;
    }

    return acc;
  }, 0);

  console.log(nice);
});
