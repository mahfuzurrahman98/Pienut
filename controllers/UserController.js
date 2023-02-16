import User from '../models/User.js';

export default class UserController {

  async getAll() {
    const users = await User.find();
    return users;
  }
}