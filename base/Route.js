import { Router } from 'express';

class Route {
  constructor() {
    this.router = Router();
    this.prefix = '';
  }

  get(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.get(this.prefix + path, controller[action].bind(controller));
  }

  post(path, controller, action, middlewares = []) {
    console.log(' path: ', path);
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    let dd = this.router.post(
      this.prefix + path,
      controller[action].bind(controller)
    );
    console.log(dd);
  }

  put(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.put(this.prefix + path, controller[action].bind(controller));
  }

  patch(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.patch(path, controller[action].bind(controller));
  }

  delete(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.delete(this.prefix + path, controller[action].bind(controller));
  }

  use(path, router) {
    this.router.use(this.prefix + path, router);
  }

  withPrefix(prefix) {
    this.prefix = prefix;
  }
}

export default Route;
