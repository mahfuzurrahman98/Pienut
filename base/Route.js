import { Router } from 'express';

class Route {
  constructor() {
    this.router = Router();
  }

  handler(fn) {
    console.log('fn: ', fn);
    function middleware(req, res, next) {
      Promise.resolve(fn(req, res, next)).catch(next);
    }
    return middleware;
  }

  get(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.get(path, this.handler(controller[action].bind(controller)));
  }

  post(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    middlewares.forEach((middleware) => this.router.use(middleware));
    this.router.post(path, controller[action].bind(controller));
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
