import { Router } from 'express';

class Route {
  constructor() {
    this.router = Router();
  }

  get(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.get(path, controller[action].bind(controller));
  }

  post(path, controller, action, middlewares = []) {
    console.log(' path: ', path);
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    let dd = this.router.post(path, controller[action].bind(controller));
    console.log(dd);
  }

  put(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.put(path, controller[action].bind(controller));
  }

  patch(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.patch(path, controller[action].bind(controller));
  }

  delete(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.delete(path, controller[action].bind(controller));
  }

  use(path, router) {
    this.router.use(path, router);
  }
}

export default new Route();
