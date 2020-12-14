function parseInput(input) {
	array = input.split("\n");

	return array;
}

const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
	let instructions = parseInput(data);

	const SEARCH_FOR = "shiny gold";

	// ------------------ Part 1 ------------------
	// let i = 0;
	// let allBags = [SEARCH_FOR];

	// while (allBags[i]) {
	//     let relevant = instructions.filter(ins => ins.includes(allBags[i]));
	//     instructions = instructions.filter(ins => !ins.includes(allBags[i]));

	//     let bags = relevant.filter(bag => {
	//         const name = bag.split(" bags")[0];
	//         if (name !== allBags[i]) {
	//             return name;
	//         }
	//     }).map(bag => bag.split(" bags")[0]);

	//     allBags = allBags.concat(bags);
	//     i++;
	// }
	// let set = new Set(allBags);
	// set.delete(SEARCH_FOR);

	// console.log(set.size);

	// ------------------ Part 2 ------------------
	console.log(getSum({
		number: 1,
		color: SEARCH_FOR
	}, instructions) - 1);
});

function getSum(childBag, instructions) {
	const findInstruction = instructions
		.find(ins => ins.split(" contain ")[0].includes(childBag.color))
		.split(" contain ");

	if (findInstruction[1].includes("no other bags")) {
		return childBag.number;
	}

	const newChildBags = findInstruction[1].split(", ").map(x => {
		let s = x.split(" ");
		return {
			number: +s[0],
			color: `${s[1]} ${s[2]}`
		};
	});

	let sum = 0;

	for (let i = 0; i < newChildBags.length; i++) {
		const multiple = getSum(newChildBags[i], instructions);
		sum += multiple;
	}

	// console.log(`${childBag.number} ${childBag.color} ${sum}`);

	return childBag.number + sum * childBag.number;
}