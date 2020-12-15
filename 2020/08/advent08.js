function parseInput(input) {
  array = input.split('\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  let instructions = parseInput(data);

  for (let j = 0; j < instructions.length; j++) {
    if (instructions[j].includes('nop') || instructions[j].includes('jmp')) {
      let changedInstructions = [...instructions];
      const [o, v] = changedInstructions[j].split(' ');
      changedInstructions[j] = o === 'jmp' ? 'nop ' + v : 'jmp ' + v;

      const acc = checkForInfiniteLoop(changedInstructions);
      if (acc) {
        console.log(acc);
        break;
      }
    }
  }
});

function checkForInfiniteLoop(instructions) {
  let indexSet = new Set();
  let acc = 0;
  let i = 0;

  while (instructions[i]) {
    if (indexSet.has(i)) {
      return null;
    }

    indexSet.add(i);
    let [op, val] = instructions[i].split(' ');
    val = +val;

    switch (op) {
      case 'nop':
        i++;
        break;
      case 'acc':
        acc += val;
        i++;
        break;
      case 'jmp':
        i += val;
        break;
    }
  }

  return acc;
}
