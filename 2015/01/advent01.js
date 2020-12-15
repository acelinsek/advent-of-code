const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  // ----------------------- Part 2 -----------------------
  let i = 0;
  let floor = 0;

  while (floor >= 0) {
    data[i] === '(' ? floor++ : floor--;
    i++;
  }

  console.log(i);

  // ----------------------- Part 1 -----------------------
  const open = data.match(/\(/g);
  const closed = data.match(/\)/g);

  console.log(open.length - closed.length);
});
