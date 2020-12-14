function parseInput(input) {
    array = input.split('\n');

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const list = parseInput(data);

    const memorySize = list.reduce((acc, row) => acc + row.length, 0)

    const stringSize = list.map(row => {
        return eval(row);
    }).reduce((acc, row) => acc + row.length, 0);

    const encodedSize = list.map(row => {
        return JSON.stringify(row);
    }).reduce((acc, row) => acc + row.length, 0);

    console.log(memorySize, stringSize, memorySize - stringSize);
    console.log(encodedSize, memorySize, encodedSize - memorySize);

});