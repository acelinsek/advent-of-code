function parseInput(input) {
    array = input.split('\n');

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const list = parseInput(data);

    const people = getPeople(list);
    const happinessMap = getHappiness(list);

    const permutations = permute([...people]);


    console.log();
});

function getPeople(list) {
    const peopleArray = list.map(line => line.split(' ')[0]);
    const peopleSet = new Set(peopleArray);
    return [...peopleSet];
}

function getHappiness(list) {
    let happinessMap = new Map();
    list.forEach(line => {
        const l = line.split(' ');
        happinessMap.set(`${l[0]}${l[l.length-1].slice(0, -1)}`, l[2] === 'gain' ? +l[3] : - +l[3]);
    })
    return happinessMap;
}

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1,
        k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}