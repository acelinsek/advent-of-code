let input = '"I AM NOT SUPPOSED TO SHOW YOU THE ORIGINAL INPUT"';

const base26 = convertToBase26(input);

if (base26.match(/8|b|e/g)) {
    // skip this number
}

function convertToBase26(input) {
    const array = input.split('').map(char => {
        const charCode = +char.charCodeAt(0)
        return charCode < 107 ? String.fromCharCode(charCode - 49) : String.fromCharCode(charCode - 10);
    });
    return array.join('');
}