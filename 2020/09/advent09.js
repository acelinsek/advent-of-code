function parseInput(input) {
    array = input.split("\n").map(x => +x);

    return array;
}

const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    const numbers = parseInput(data);
    let part1result = 0;

    for (let i = 25; i < numbers.length; i++) {
        const currentN = numbers[i];
        const previous25 = array.slice(i - 25, i);

        const legal = previous25.some(n => {
            return currentN - n !== n && previous25.includes(currentN - n);
        });

        if (!legal) {
            part1result = currentN;
            console.log(currentN);
            break;
        }
    }

    console.log(part2(part1result, numbers));


});

function part2(part1result, numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const array = numbers.slice(i, j + 1);

            const sum = array.reduce((acc, n) => {
                return acc + n;
            });

            if (sum > part1result) {
                break;
            }

            if (sum === part1result) {
                const min = Math.min(...array);
                const max = Math.max(...array);
                return min + max;
            }
        }
    }
}