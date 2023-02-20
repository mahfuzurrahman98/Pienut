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

const errors = {
  email: 'Email is mandatory.',
  password: 'Password is mandatory.',
  default: 'Something went wrong.',
};
let key = 'email';
console.log(errors[key]);
