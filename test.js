function ff(errMessage) {
  const index = errMessage.indexOf(':');
  if (index !== -1) {
    errMessage = errMessage.substring(index + 2);
  }

  const arr = errMessage.split(',');

  console.log(arr);

  const obj = arr
    .map((item) => item.split(':').map((val) => val.trim()))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return obj;
}

const errMessage =
  'u_users validation failed: name: Name is required, username: Username is already taken';

console.log(ff(errMessage));
