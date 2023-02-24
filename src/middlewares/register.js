import test from './test.js';

Middleware.register('notZero', test.notZero);
Middleware.register('isEven', test.isEven);
