import { Controller } from '../../base/index.js';
import Test from '../models/Test.js';

class TestController extends Controller {
  constructor() {
    super();
    this.Model = Test;
  }

  async create(req, res) {
    let test = new this.Model(req.body);
    try {
      await test.save();
      this.sendApiResponse(res, 201, 'created successfully', test);
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }
}

export default new TestController();
