import MExpress from '../base/MExpress.js';
import v1Routes from './routes/api/v1/index.js';

const mexpress = new MExpress();

mexpress.useRoute('/api/v1/', v1Routes);

export default mexpress.app;