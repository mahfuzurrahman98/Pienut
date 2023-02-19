const errorMessageFormatter = (errMessage) => {
  const index = errMessage.indexOf(':');
  if (index !== -1) {
    errMessage = errMessage.substring(index + 2);
  }

  const arr = errMessage.split(',');

  const obj = arr
    .map((item) => item.split(':').map((val) => val.trim()))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return obj;
};

export default errorMessageFormatter;
