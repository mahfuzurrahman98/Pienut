import Middleware from '../../base/Middleware.js';
import test from './test.js';

const registerMiddlewares = () => {
  Middleware.register('notZero', test.notZero);
  Middleware.register('isEven', test.isEven);
  console.log('regm', Middleware.obj);
};

export default registerMiddlewares;
