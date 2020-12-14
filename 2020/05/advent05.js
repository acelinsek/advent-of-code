const fs = require('fs');

function parseInput(input) {
    array = input.split('\n');
    return array;
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const boardingPasses = parseInput(data);

    let seatIDs = boardingPasses.map(pass => {
        let row = pass.substring(0, 7);
        let column = pass.substring(7, 10);
        row = row.replace(/F/g, 0).replace(/B/g, 1);
        column = column.replace(/L/g, 0).replace(/R/g, 1);
        row = parseInt(row, 2);
        column = parseInt(column, 2);
        return row * 8 + column;
    })

    console.log(Math.max(...seatIDs));

    seatIDs.sort((a, b) => a - b);

    console.log(...seatIDs);

    for (let i = 1; i < seatIDs.length - 1; i++) {
        let a = seatIDs[i + 1] - seatIDs[i];

        if (a !== 1) {
            console.log((seatIDs[i] + seatIDs[i + 1]) / 2);
            return;
        }
    }
});