import { Router } from 'express';

class Route {
  constructor() {
    this.router = Router();
  }

  get(path, controller, action) {
    this.router.get(path, controller[action].bind(controller));
  }

  post(path, middlewares = null, controller, action) {
    // let mids = [];
    // middlewares.forEach((middleware) => {
    //   let mid = Middleware.obj[middleware];
    //   mids.push(mid);
    // });

    console.log('mss: ', middlewares);
    this.router.post(path, controller[action].bind(controller));
  }

  put(path, controller, action) {
    this.router.put(path, controller[action].bind(controller));
  }

  patch(path, controller, action) {
    this.router.patch(path, controller[action].bind(controller));
  }

  delete(path, controller, action) {
    this.router.delete(path, controller[action].bind(controller));
  }

  middle(action) {
    action();
    return this;
  }
}

export default new Route();
