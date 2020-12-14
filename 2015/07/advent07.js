function parseInput(input) {
    array = input.split('\n');

    return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    const instructions = parseInput(data);

    let map = new Map();

    // iterate over all and only do the ones that assign values first
    let listOfInstructions = instructions.filter(row => {
        const [ins, dest] = row.split(/ -> /);

        if (+ins >= 0) {
            map.set(dest, +ins);
            return false
        }

        return true;
    });

    while (listOfInstructions.length > 0) {
        console.log(listOfInstructions.length);
        listOfInstructions = listOfInstructions.filter(row => {
            // console.log(row);
            const [ins, dest] = row.split(/ -> /);

            if (ins.includes('AND') || ins.includes('OR')) {
                const [src1, op, src2] = ins.split(/ /);

                if (+src1 && map.has(src2)) {
                    op === 'AND' ? map.set(dest, +src1 & map.get(src2)) : map.set(dest, +src1 | map.get(src2));
                    return false;
                }

                if (map.has(src1) && map.has(src2)) {
                    op === 'AND' ? map.set(dest, map.get(src1) & map.get(src2)) : map.set(dest, map.get(src1) | map.get(src2));
                    return false;
                }

                return true;
            }

            if (ins.includes('SHIFT')) {
                const [src, op, by] = ins.split(/ /);

                if (map.has(src)) {
                    op === 'RSHIFT' ? map.set(dest, map.get(src) >> +by) : map.set(dest, map.get(src) << +by);
                    return false;
                }

                return true;
            }

            if (ins.includes('NOT')) {
                const [op, src] = ins.split(/ /);

                if (map.has(src)) {
                    map.set(dest, ~map.get(src));
                    return false;
                }

                return true;
            }

            // simple assigning
            if (map.has(ins)) {
                map.set(dest, map.get(ins));
                return false;
            }

            return true;
        })
    }

    console.log(map.get('a'));
});