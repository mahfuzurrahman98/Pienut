import Controller from '../../base/Controller.js';
import Validator from '../../base/Validator.js';
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
    const rules = {
      email: {
        // required: [true, 'Email is mandatory'],
        required: true,
        email: [true, 'Email format is invalid'],
        unique: [['users', 'email'], 'Email is already taken'],
      },
      // password: {
      //   required: [true, 'Password is mandatory'],
      //   minLength: [6, 'Password must be at least 6 characters'],
      //   maxLength: [20, 'Password must be at most 20 characters'],
      // },

      test: {
        required: true,
        between: [3, 6],
        in: ['a', 'b', 'c'],
        regex: [/^[a-z]+$/, 'Only alphabets are allowed'],
      },
    };
    const validator = new Validator(rules);

    const errors = await validator.run(req.body);
    this.sendApiResponse(res, 400, errors);
    return;
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
