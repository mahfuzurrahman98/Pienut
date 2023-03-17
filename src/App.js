import Pienut from '../base/index.js';
import v1Routes from './routes/api/v1/index.js';
import welcomeRoute from './routes/welcomeRoute.js';

const pienut = new Pienut();

pienut.useCors({
  origin: 'http://127.0.0.1:8080',
  credentials: true, // include HTTP-only cookie in response headers
});
pienut.useRoute('/welcome', welcomeRoute);
pienut.useRoute('/api/v1/', v1Routes);

export default pienut;
