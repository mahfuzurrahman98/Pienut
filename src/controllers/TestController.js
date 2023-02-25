import { Controller } from '../../base/index.js';

class TestController extends Controller {
  constructor() {
    super();
  }

  async index(req, res) {
    // send the welcome.html file
    res.sendFile('welcome.html', { root: 'src/' });
  }

  async test(req, res) {
    this.sendApiResponse(res, 200, 'test');
  }
}

export default new TestController();
