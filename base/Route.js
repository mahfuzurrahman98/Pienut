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
}

export default new Route();
