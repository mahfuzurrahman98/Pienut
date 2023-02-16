import userRoutes from './userRoutes.js';

export default function (router) {
  userRoutes(router), router.use('/users', userRoutes);
}