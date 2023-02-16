import User from '../models/User.js';

class UserController {
  async getAll(req, res) {
    let users = await User.find();
    res.send(users);
  }
}

export default new UserController();