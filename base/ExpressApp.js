import bodyParser from "body-parser";
import express from "express";

class ExpressApp {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  useRoute(path, router) {
    this.app.use(path, router);
  }

  useMiddleware(middleware) {
    this.app.use(middleware);
  }

}

export default ExpressApp;
