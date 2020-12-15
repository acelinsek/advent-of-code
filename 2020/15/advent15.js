console.time('someFunction');
let input = ["I AM NOT SUPPOSED TO SHOW YOU THE ORIGINAL INPUT"];

// ----------------------- Part 2 -----------------------
let last = input.pop();

let spokenMap = new Map();
input.forEach((x, index) => {
  spokenMap.set(x, index);
});

for (let i = input.length; i < 30000000 - 1; i++) {
  if (spokenMap.has(last)) {
    const diff = i - spokenMap.get(last);
    spokenMap.set(last, i);
    last = diff;
  } else {
    spokenMap.set(last, i);
    last = 0;
  }
}

console.log(last);
console.timeEnd('someFunction');

// ----------------------- Part 1 -----------------------
// let spokenArray = input.reverse();

// for (let i = spokenArray.length; i < 2020; i++) {
//   const last = spokenArray[0];

//   const prev = spokenArray.findIndex((x, index) => index > 0 && x === last);

//   if (prev < 0) {
//     spokenArray.unshift(0);
//   } else {
//     spokenArray.unshift(prev);
//   }
// }
// console.log(spokenArray[0]);