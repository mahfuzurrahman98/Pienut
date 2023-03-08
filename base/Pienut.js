import express from 'express';

class Pienut {
  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());

    // Initialize empty arrays to store middleware and routes
    this.middlewareStack = [];
    this.routeStack = [];
  }

  useRoute(path, router) {
    this.routeStack.push({ path, router });
  }

  useMiddleware(middleware) {
    this.middlewareStack.push(middleware);
  }

  start() {
    // Register all middleware
    this.middlewareStack.forEach((middleware) => {
      this.app.use(middleware);
    });

    // Register all routes
    this.routeStack.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    // Handle 404 route
    this.app.all('*', (req, res) => {
      res.status(404).json({
        success: false,
        status: 404,
        message: `Route [${req.path}] not found`,
      });
    });

    // Handle internal errors
    this.app.use((err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }
      if (err) {
        console.log('stack:', err.stack);
        const appDebug =
          process.env.APP_DEBUG.toLowerCase() == 'true' ? true : false;

        res.status(err.status || 500).json({
          success: false,
          status: err.status || 500,
          message: appDebug ? err : 'Internal server error',
        });
      } else {
        next();
      }
    });

    // Start listening on the port
    const PORT = process.env.PORT || 9859;
    this.app.listen(PORT, () => {
      console.log(`Pienut dev server is running on ${PORT}`);
    });
  }
}

export default Pienut;
