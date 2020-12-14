const md5 = require('./JavaScript-MD5-2.18.0/js/md5');

const key = 'ckczppom';

let stop = false;
let number = 0;

while (true) {
  let hash = md5(key + number);

  if (hash.slice(0, 6) == '000000') {
    console.log(number);
    break;
  }

  number++;
}
