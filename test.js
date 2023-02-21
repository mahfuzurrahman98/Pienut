// const rules = {
//   email: {
//     required: [true, 'Email is mandatory.'],
//     isEmail: [true, 'Email format is invalid.'],
//     isUnique: [['users', 'email'], 'Email is already taken.'],
//   },
//   password: {},
// };

// for (let key in rules) {
//   let value = rules[key];
//   // if value is empty object print "no rules" else print the value
//   // console.log(value === {} ? 'no rules' : value);
//   console.log( ? 'no rules' : value);
// }

// const errors = {
//   email: 'Email is mandatory.',
//   password: 'Password is mandatory.',
//   default: 'Something went wrong.',
// };
// let key = 'email';
// console.log(errors[key]);

// let x = true;

// if (Array.isArray(x)) {
// } else {
//   // make it an array wth tow elements
//   x = [x, 'Something went wrong.'];
// }

// console.log(x[0]);

// let params = [[0, 100], 'This field must be in between the range'];
// // params = [0, 100];
// console.log(params.length);

// function validateParams(params) {
//   if (
//     Array.isArray(params) &&
//     params.length === 2 &&
//     typeof params[0] === 'number' &&
//     typeof params[1] === 'number'
//   ) {
//     return [params, ''];
//   } else if (
//     Array.isArray(params) &&
//     params.length === 2 &&
//     Array.isArray(params[0]) &&
//     typeof params[1] === 'string' &&
//     params[0].length === 2 &&
//     typeof params[0][0] === 'number' &&
//     typeof params[0][1] === 'number'
//   ) {
//     return params;
//   } else {
//     return 'error';
//   }
// }

// function isNumericOrSingleChar(value) {
//   return (
//     Number.isInteger(value) ||
//     (typeof value === 'number' && !isNaN(value)) ||
//     (typeof value === 'string' && value.length === 1)
//   );
// }

// console.log(isNumericOrSingleChar(1.35));

// console.log(isNaN('135'));

// import validator from 'validator';

// let x = validator.isDate('2019-01-01 12:45:00');

// x = validator.isDate('2019-01-01 12:45:00', { format: 'YYYY-MM-DD HH:mm:ss' });
// console.log(x);

function print(x) {
  console.log(x);
}

let regex = /^[a-z]+$/;

print(regex);
