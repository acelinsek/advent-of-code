function parseInput(input) {
    array = input.split('\n');

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const list = parseInput(data);

    const routes = new Map();
    const destinations = new Set();

    list.forEach((route) => {
        const [from, , to, , dist] = route.split(' ');

        destinations.add(from);
        destinations.add(to);

        routes.set(from + to, +dist);
        routes.set(to + from, +dist);
    }, {})

    const permutations = permute([...destinations]);

    let dists = permutations.map(perm => {
        let acc = 0;

        for (let i = 0; i < perm.length - 1; i++) {
            acc += routes.get(perm[i] + perm[i + 1]);
        }

        return acc;
    })

    console.log("Min: " + Math.min(...dists));
    console.log("Max: " + Math.max(...dists));


});

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