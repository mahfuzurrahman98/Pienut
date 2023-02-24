class Middleware {
  constructor() {
    this.obj = {};
  }

  register(name, fn) {
    this.obj[name] = fn;
  }
}

export default new Middleware();
