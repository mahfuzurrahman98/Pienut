import { Controller, Password, Validator } from '../../base/index.js';
import User from '../models/User.js';

class AuthController extends Controller {
  constructor() {
    super();
    this.errors = {};
    this.Model = User;
  }

  async login(req, res) {}

  async register(req, res) {
    let user = new this.Model(req.body);

    // validate first
    const rules = {
      email: {
        required: true,
        email: [true, 'Email format is invalid'],
        unique: [['users', 'email'], 'Email is already taken'],
      },
      password: {
        required: [true, 'Password is mandatory'],
        min_len: [10, 'Password must be at least 10 characters'],
        max_len: [20, 'Password must be at most 20 characters'],
      },
    };
    const validator = new Validator(rules);
    await validator.run(req.body);
    // if error object is not empty
    if (validator.fails()) {
      this.sendApiResponse(res, 400, validator.errors());
      return;
    }

    // fire the query
    try {
      if (user.password) {
        user.password = await Password.hash(user.password);
      }
      await user.save();
      if (user.password) {
        user.password = undefined;
      }
      this.sendApiResponse(res, 201, 'created successfully', user);
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }

  async logout(req, res) {}
  async profile(req, res) {}
}

export default new AuthController();
