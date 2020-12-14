function parseInput(input) {
  array = input.split('');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const arrows = parseInput(data);

  let position1 = [0, 0];
  let position2 = [0, 0];
  let houses = new Map();
  houses.set('0,0', 2);

  for (let i = 0; i < arrows.length; i++) {
    let newPosition = [0, 0];
    if (i % 2) {
      arrowSwitch(arrows[i], position2);
      newPosition = position2.toString();
    } else {
      arrowSwitch(arrows[i], position1);
      newPosition = position1.toString();
    }
    if (houses.get(newPosition)) {
      houses.set(newPosition, houses.get(newPosition) + 1);
    } else {
      houses.set(newPosition, 1);
    }
  }
  console.log(houses.size);
});

function arrowSwitch(arrow, position) {
  switch (arrow) {
    case '^':
      position[0]--;
      break;
    case '>':
      position[1]++;
      break;
    case 'v':
      position[0]++;
      break;
    case '<':
      position[1]--;
      break;
  }
}
