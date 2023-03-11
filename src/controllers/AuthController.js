import { Auth, Controller, Password, Validator } from '../../base/index.js';
import User from '../models/User.js';

class AuthController extends Controller {
  constructor() {
    super();
    this.errors = {};
    this.Model = User;
  }

  async login(req, res, next) {
    let data = req.body;

    const rules = {
      email: {
        required: true,
        email: [true, 'Email format is invalid'],
      },
      password: {
        required: [true, 'Password is mandatory'],
        min_len: [6, 'Password must be at least 6 characters'],
      },
    };

    const validator = new Validator(rules);
    await validator.run(data);

    if (validator.fails()) {
      this.sendApiResponse(res, 400, validator.errors());
      return;
    }

    // fire the query
    let user = await User.findOne({ email: data.email });

    if (!user) {
      this.sendApiResponse(res, 404, 'User not found');
      return;
    }

    if (!(await Password.match(data.password, user.password))) {
      this.sendApiResponse(res, 400, 'Invalid credentials');
      return;
    }

    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
    };
    const accessToken = Auth.createToken(userInfo, '3m');

    this.sendApiResponse(res, 200, 'logged in successfully', { accessToken });
  }

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

  async profile(req, res) {
    this.sendApiResponse(res, 200, 'profile', { user: req.user });
  }
}

export default new AuthController();
