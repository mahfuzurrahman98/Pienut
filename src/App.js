import ExpressApp from '../base/ExpressApp.js';
import v1Routes from './routes/api/v1/index.js';

const expressApp = new ExpressApp();

expressApp.useRoute('/api/v1/', v1Routes);

export default expressApp.app;