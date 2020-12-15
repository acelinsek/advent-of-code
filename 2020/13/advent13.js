const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const [, busesString] = data.split('\n');
  //   ------------------ Part 2 ------------------
  const buses = busesString
    .split(',')
    .map((bus, index) => {
      return {
        ID: +bus,
        index
      };
    })
    .filter(bus => !isNaN(bus.ID));

  let start = BigInt(0);
  let offset = BigInt(buses[1].index);
  let increment = BigInt(buses[0].ID);
  let searchFor = BigInt(buses[1].ID);

  for (let j = 1; j < buses.length; j++) {
    let i = BigInt(0);
    let remainder = BigInt(1);

    do {
      i++;
      remainder = (start + offset + increment * i) % searchFor;
    } while (remainder !== BigInt(0));

    start = start + increment * i;

    if (j === buses.length - 1) {
      console.log(start);
      break;
    }

    offset = BigInt(buses[j + 1].index);
    increment = increment * BigInt(buses[j].ID);
    searchFor = BigInt(buses[j + 1].ID);
  }

  //   ------------------ Part 1 ------------------
  //   const buses = busesString
  //     .split(',')
  //     .filter(bus => bus !== 'x')
  //     .map(bus => +bus);

  //   let busesObject = buses.map(bus => {
  //     return { bus, time: bus - (start % bus) };
  //   });

  //   busesObject.sort((a, b) => a.time - b.time);

  //   console.log(
  //     busesObject[0].bus,
  //     busesObject[0].time,
  //     busesObject[0].bus * busesObject[0].time
  //   );
});
