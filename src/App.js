import Middleware from '../base/Middleware.js';
import MXpress from '../base/MXpress.js';
import registerMiddlewares from './middlewares/register.js';
import v1Routes from './routes/api/v1/index.js';

registerMiddlewares();
const mxpress = new MXpress();

console.log('all mids: ', Middleware.obj);

mxpress.useRoute('/api/v1/', v1Routes);

export default mxpress.app;
