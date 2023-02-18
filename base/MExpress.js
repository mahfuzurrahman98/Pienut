import express from "express";

class MExpress {
  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  useRoute(path, router) {
    this.app.use(path, router);
  }

  useMiddleware(middleware) {
    this.app.use(middleware);
  }

}

export default MExpress;
