const fs = require('fs');

function parseInput(input) {
    array = input.split('\n');
    return array;
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const array = parseInput(data);

    const correctPasswords = array.reduce((acc, element) => {
        const data = element.split(' ');

        // ---------------------- part 1 ----------------------
        // const [min, max] = data[0].split('-').map(x => +x);
        // const letter = data[1][0];
        // const password = data[2];

        // const occurences = password.split('').reduce((acc2, character) => {
        //     return character === letter ? acc2 + 1 : acc2;
        // }, 0)

        // return occurences >= min && occurences <= max ? acc + 1 : acc;

        // ---------------------- part 2 ----------------------
        const [first, second] = data[0].split('-').map(x => +x);
        const letter = data[1][0];
        const password = data[2];

        const one = password[first - 1] === letter;
        const two = password[second - 1] === letter;


        return +one + +two === 1 ? acc + 1 : acc;

    }, 0);

    console.log(correctPasswords);
});