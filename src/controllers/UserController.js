import Controller from '../../base/Controller.js';
import User from '../models/User.js';

class UserController extends Controller {
  constructor() {
    super();
    this.Model = User;
  }

  async index(req, res) {
    const users = await this.Model.find();
    this.sendApiResponse(res, 200, 'user fetched ', users);
  }
}

export default new UserController();
