import Pienut from '../base/index.js';
import v1Routes from './routes/api/v1/index.js';
const pienut = new Pienut();

pienut.useRoute('/api/v1/', v1Routes);

export default pienut.app;
