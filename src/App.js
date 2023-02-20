import MXpress from '../base/MXpress.js';
import v1Routes from './routes/api/v1/index.js';

const mxpress = new MXpress();

mxpress.useRoute('/api/v1/', v1Routes);

export default mxpress.app;
