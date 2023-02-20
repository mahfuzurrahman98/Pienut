import Controller from '../../base/Controller.js';
import User from '../models/User.js';

class AuthController extends Controller {
  constructor() {
    super();
    this.Model = User;
  }

  async login(req, res) {}

  async register(req, res) {
    let data = new this.Model(req.body);

    // validate first
    const validator = new Validator({
      email: {
        presence: [true, 'Email is mandatory.'],
        isEmail: [true, 'Email format is invalid.'],
        isUnique: [['users', 'email'], 'Email is already taken.'],
      },
      password: {
        presence: [true, 'Password is mandatory.'],
        min: [6, 'Password must be at least 6 characters.'],
        max: [20, 'Password must be at most 20 characters.'],
      },
    });
    const errors = await validator.run(req.body);

    // fire the query
    try {
      if (data.password) {
        // only for user creation
        data.password = await Password.hash(data.password);
      }
      await data.save();
      if (data.password) {
        // only for user creation
        data.password = undefined;
      }
      this.sendApiResponse(res, 201, 'created successfully', data);
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }

  async logout(req, res) {}

  async profile(req, res) {}
}

export default new AuthController();
