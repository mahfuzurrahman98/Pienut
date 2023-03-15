import cookieParser from 'cookie-parser';
import { Router } from 'express';

class Route {
  constructor() {
    this.router = Router();
    this.router.use(cookieParser());
  }

  handler(fn) {
    function middleware(req, res, next) {
      Promise.resolve(fn(req, res, next)).catch(next);
    }
    return middleware;
  }

  get(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    this.router.get(
      path,
      ...middlewares,
      this.handler(controller[action].bind(controller))
    );
  }

  post(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    this.router.post(
      path,
      ...middlewares,
      this.handler(controller[action].bind(controller))
    );
  }

  put(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    this.router.put(
      path,
      ...middlewares,
      this.handler(controller[action].bind(controller))
    );
  }

  patch(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    this.router.patch(
      path,
      ...middlewares,
      this.handler(controller[action].bind(controller))
    );
  }

  delete(path, controller, action, middlewares = []) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    this.router.delete(
      path,
      ...middlewares,
      this.handler(controller[action].bind(controller))
    );
  }

  use(path, router) {
    this.router.use(path, router);
  }
}

export default new Route();
