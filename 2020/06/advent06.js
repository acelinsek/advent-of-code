function parseInput(input) {
    array = input.split('\n\n');

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const groups = parseInput(data);

    const sum = groups.reduce((acc, group) => {
        let people = group.split("\n");

        // -------------------- Part 1 --------------------
        // let uniqueAnswers = new Set();

        // people.forEach(answers => {
        //     uniqueAnswers = new Set([...answers.split(""), ...uniqueAnswers]);
        // });

        // -------------------- Part 2 --------------------
        let commonAnswers = people[0].split('');

        for (let i = 1; i < people.length; i++) {
            commonAnswers = commonAnswers.filter(answer => people[i].split('').includes(answer));
        }

        return acc + commonAnswers.length;
    }, 0);

    console.log(sum);
});