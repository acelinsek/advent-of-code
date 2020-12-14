function parseInput(input) {
  array = input.split('\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const instructions = parseInput(data);

  const zeros = [...Array(1000)].map(e => Array(1000).fill(0));

  instructions.forEach(instruction => {
    const [ins, coor1, coor2] = instruction.replace(/ through /, " ").replace(/turn /, '').split(' ');
    const [x1, y1] = coor1.split(',').map(x => +x);
    const [x2, y2] = coor2.split(',').map(x => +x);

    for (let i = x1; i < x2 + 1; i++) {
      for (let j = y1; j < y2 + 1; j++) {
        // -------------------- Part 1 --------------------
        // switch (ins) {
        //   case "on":
        //     zeros[i][j] = 1;
        //     break;
        //   case "off":
        //     zeros[i][j] = 0;
        //     break;
        //   case "toggle":
        //     zeros[i][j] = 1 - zeros[i][j];
        //     break;
        // }

        // -------------------- Part 2 --------------------
        switch (ins) {
          case "on":
            zeros[i][j] = zeros[i][j] + 1;
            break;
          case "off":
            if (zeros[i][j] > 0) {
              zeros[i][j] = zeros[i][j] - 1;
            }
            break;
          case "toggle":
            zeros[i][j] = zeros[i][j] + 2;
            break;
        }
      }
    }
  });

  const oneDim = [].concat(...zeros);

  // -------------------- Part 1 --------------------
  // const on = oneDim.reduce((acc, e) => {
  //   return e === 1 ? acc + 1 : acc
  // }, 0)

  // -------------------- Part 2 --------------------
  const on = oneDim.reduce((acc, e) => acc + e, 0)

  console.log(on);
});