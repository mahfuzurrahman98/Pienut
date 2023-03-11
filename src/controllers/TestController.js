import { Controller } from '../../base/index.js';

class TestController extends Controller {
  constructor() {
    super();
  }

  async index(req, res) {
    res.sendFile('./src/welcome.html', { root: '.' });
  }
}

export default new TestController();
