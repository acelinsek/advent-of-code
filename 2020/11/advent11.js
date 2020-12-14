function parseInput(input) {
    array = input.split('\n').map(row =>
        row.split('').map(cell => {
            return cell === '#' ? 1 : cell === 'L' ? 0 : null;
        })
    );

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    let rows = parseInput(data);
    let changes = 0;
    do {
        changes = 0;
        let rowsCopy = JSON.parse(JSON.stringify(rows));
        rows.forEach((row, i) => {
            row.forEach((seat, j) => {
                if (seat === 0 && getFilledSeatsPart2(i, j, rows) === 0) {
                    rowsCopy[i][j] = 1;
                    changes++;
                } else if (seat === 1 && getFilledSeatsPart2(i, j, rows) >= 5) {
                    rowsCopy[i][j] = 0;
                    changes++;
                }
            });
        });

        rows = rowsCopy;

    } while (changes > 0);

    print(rows);
});

function print(rows) {
    let p = rows
        .map(row => {
            return row.map(n => (n === null ? '.' : n === 1 ? '#' : 'L')).join('');
        })
        .join('\n');
    // console.log(p);
    console.log('Occupied seats: ' + p.replace(/[^#]/g, '').length);
}

function getFilledSeatsPart2(i, j, rows) {
    let matrix = [null, null, null, null, null, null, null, null];

    let eof = false;
    let increment = 1;
    while (!eof) {
        matrix[0] = setMatrix(matrix, 0, i, j, rows, -1, -1, increment);
        matrix[1] = setMatrix(matrix, 1, i, j, rows, -1, 0, increment);
        matrix[2] = setMatrix(matrix, 2, i, j, rows, -1, 1, increment);
        matrix[3] = setMatrix(matrix, 3, i, j, rows, 0, -1, increment);
        matrix[4] = setMatrix(matrix, 4, i, j, rows, 0, 1, increment);
        matrix[5] = setMatrix(matrix, 5, i, j, rows, 1, -1, increment);
        matrix[6] = setMatrix(matrix, 6, i, j, rows, 1, 0, increment);
        matrix[7] = setMatrix(matrix, 7, i, j, rows, 1, 1, increment);

        if (i === 0) {
            matrix[0] = false;
            matrix[1] = false;
            matrix[2] = false;
        }

        if (j === 0) {
            matrix[0] = false;
            matrix[3] = false;
            matrix[5] = false;
        }

        if (i === rows.length - 1) {
            matrix[5] = false;
            matrix[6] = false;
            matrix[7] = false;
        }

        if (j === rows[i].length - 1) {
            matrix[2] = false;
            matrix[4] = false;
            matrix[7] = false;
        }

        increment++;

        if (!matrix.includes(null)) {
            eof = true;
        }

        if ((i + increment > rows.length && i - increment < 0) || (j + increment > rows[i].length && j - increment < 0)) {
            eof = true;
        }
    }

    const sum = matrix.reduce((acc, n) => acc + +n, 0);

    return sum;
}

function setMatrix(matrix, index, i, j, rows, x, y, increment) {
    let check1 = i + x * increment >= 0;
    let check2 = i + x * increment < rows.length;
    let check3 = j + y * increment >= 0;
    let check4 = j + y * increment < rows[i].length;
    if (check1 && check2 && check3 && check4) {
        if (matrix[index] === null) {
            return rows[i + x * increment][j + y * increment] === 1 ? true : rows[i + x * increment][j + y * increment] === 0 ? false : null;
        }
    }

    return matrix[index];
}


function getFilledSeatsPart1(i, j, rows) {
    const xmin = i - 1 < 0 ? 0 : i - 1;
    const ymin = j - 1 < 0 ? 0 : j - 1;
    const xmax = i + 1 >= rows.length ? i : i + 1;
    const ymax = j + 1 >= rows[i].length ? j : j + 1;

    const matrix = [];

    for (let k = xmin; k <= xmax; k++) {
        for (let l = ymin; l <= ymax; l++) {
            if (!(k === i && l === j)) {
                matrix.push(rows[k][l]);
            }
        }
    }

    const sum = matrix.reduce((acc, n) => acc + +n, 0);

    return sum;
}