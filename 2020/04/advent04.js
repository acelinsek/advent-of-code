function parseInput(input) {
  array = input.split('\n\n');

  return array;
}

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const passports = parseInput(data);

  let valid = passports.reduce((acc, passport) => {
    const fields = passport.split(/[ \n]+/);

    let fieldsHashMap = fields.reduce((map, field) => {
      let f = field.split(':');
      map[f[0]] = f[1];
      return map;
    }, {});

    if (fields.length < 7) {
      return acc;
    }

    if (fields.length === 8 && validateFields(fieldsHashMap)) {
      return acc + 1;
    }

    if (fields.length === 7) {
      if (fieldsHashMap['cid']) {
        return acc;
      }

      if (validateFields(fieldsHashMap)) {
        return acc + 1;
      }

      return acc;
    }

    return acc;
  }, 0);

  console.log(valid);
});

function validateFields(fields) {
  const byr = +fields['byr'];
  if (byr < 1920 || 2002 < byr) {
    return false;
  }

  const iyr = +fields['iyr'];
  if (iyr < 2010 || 2020 < iyr) {
    return false;
  }

  const eyr = +fields['eyr'];
  if (eyr < 2020 || 2030 < eyr) {
    return false;
  }

  const hgt = fields['hgt'];
  const unit = hgt.slice(-2);
  const numericHgt = +hgt.replace(/\D/g, '');

  if (unit === 'cm') {
    if (numericHgt < 150 || 193 < numericHgt) {
      return false;
    }
  } else if (unit === 'in') {
    if (numericHgt < 59 || 76 < numericHgt) {
      return false;
    }
  } else {
    return false;
  }

  const hcl = fields['hcl'];
  if (!hcl.match(/^#[0-9a-f]{6}/i)) {
    return false;
  }

  const ecl = fields['ecl'];
  switch (ecl) {
    case 'amb':
      break;
    case 'blu':
      break;
    case 'brn':
      break;
    case 'gry':
      break;
    case 'grn':
      break;
    case 'hzl':
      break;
    case 'oth':
      break;
    default:
      return false;
  }

  const pid = fields['pid'];
  if (!pid.match(/^[0-9]{9}$/)) {
    return false;
  }

  return true;
}
