function parseInput(input) {
	array = input.split("\n");

	return array;
}

const fs = require("fs");

// ----------------------- Part 2 -----------------------
fs.readFile("./input.txt", "utf8", (err, data) => {
	let rows = parseInput(data);

	let mask = "";
	let newValues = new Map();

	rows.map(row => {
		const [op, value] = row.split(" = ");

		if (op === "mask") {
			mask = value;
		} else {
			const index = BigInt(+op.match(/\d+/g))
				.toString(2)
				.padStart(36, 0);

			const indexMask = index
				.split("")
				.map((char, index) => {
					return mask[index] === "X" ? "X" : mask[index] === "1" ? "1" : char;
				})
				.join("");

			let memoryValues = [];
			generateMemoryValues(indexMask, memoryValues);

			memoryValues.forEach(memoryValue => {
				const mem = BigInt(parseInt(memoryValue, 2));
				newValues.set(mem, BigInt(+value));
			});
		}
	});

	console.log(
		[...newValues.values()].reduce(
			(acc, value) => (value ? acc + value : acc),
			BigInt(0)
		)
	);
});

function generateMemoryValues(indexMask, memoryValues) {
	let xIndex = indexMask.split("").findIndex(i => i === "X");

	if (xIndex < 0) {
		memoryValues.push(indexMask);
		return;
	}

	let indexMask0 = setCharAt(indexMask, xIndex, "0");
	let indexMask1 = setCharAt(indexMask, xIndex, "1");

	generateMemoryValues(indexMask0, memoryValues);
	generateMemoryValues(indexMask1, memoryValues);

	return;
}

function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}

// ----------------------- Part 1 -----------------------
// fs.readFile("./input.txt", "utf8", (err, data) => {
// 	let rows = parseInput(data);

// 	let mask = "";
// 	let maskOr = 0;
// 	let maskAnd = 0;
// 	let newValues = [];

// 	rows.map(row => {
// 		const [op, value] = row.split(" = ");

// 		if (op === "mask") {
// 			mask = value;
// 			maskOr = BigInt(parseInt(mask.replace(/X/g, 0), 2));
// 			maskAnd = BigInt(parseInt(mask.replace(/X/g, 1), 2));
// 		} else {
// 			const index = +op.match(/\d+/g);
// 			let newValue = (BigInt(+value) & maskAnd) | maskOr;
// 			newValues[index] = newValue;
// 		}
// 	});

// 	console.log(
// 		newValues.reduce((acc, value) => (value ? acc + value : acc), BigInt(0))
// 	);
// });
