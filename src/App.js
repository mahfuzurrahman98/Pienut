import MXpress from '../base/MXpress.js';
import v1Routes from './routes/api/v1/index.js';

const mexpress = new MXpress();

mexpress.useRoute('/api/v1/', v1Routes);

export default mexpress.app;
