export default function tryCatch(fn, ...args) {
  try {
    return fn(...args);
  } catch (err) {
    return err;
  }
}
