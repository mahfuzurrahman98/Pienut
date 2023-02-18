import Controller from '../base/Controller.js';
import User from '../models/User.js';

class UserController extends Controller {
  constructor() {
    super();
    this.Model = User;
  }

}

export default new UserController();