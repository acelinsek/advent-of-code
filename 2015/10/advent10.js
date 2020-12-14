let input = "I AM NOT SUPPOSED TO SHOW YOU THE ORIGINAL INPUT";

for (let i = 0; i < 50; i++) {
    const s = input.match(/([0-9])\1*/g) || [];
    input = s.reduce((acc, item) => `${acc}${item.length}${item[0]}`, '');
}

console.log(input.length);