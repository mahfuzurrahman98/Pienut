import { Controller, Password, Validator } from '../../base/index.js';
import User from '../models/User.js';

class AuthController extends Controller {
  constructor() {
    super();
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
        min_len: [6, 'Password must be at least 6 characters'],
        max_len: [20, 'Password must be at most 20 characters'],
      },
    };
    const validator = new Validator(rules);
    await validator.run(req.body);
    console.log('validator.errors', validator.errors);
    // if error object is not empty
    if (!validator.isEmpty()) {
      this.sendApiResponse(res, 400, validator.errors);
      return;
    }
    console.log('firing query');
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
