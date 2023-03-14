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
      this.sendApiResponse(res, 400, 'Invalid credentials');
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

    const _accessToken = await Auth.createAccessToken(userInfo, '3m');
    const _refreshToken = await Auth.createRefreshToken(userInfo, '1h', res);
    // console.log('cookies: ', res.cookies);
    this.sendApiResponse(res, 200, 'logged in successfully', {
      _accessToken,
      _refreshToken,
    });
  }

  async register(req, res) {
    let user = new this.Model(req.body);

    // validate first
    const rules = {
      name: {
        string: [true, 'Name must be a string'],
        required: [true, 'Name is required'],
      },
      username: {
        string: [true, 'Name must be a string'],
        required: [true, 'Userame is required'],
        unique: [['users', 'username'], 'Username is already taken'],
      },
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

  async getRefreshToken(req, res) {
    const cookieToken = req.cookies.refreshtoken;

    // No token,
    if (!cookieToken) {
      this.sendApiResponse(res, 401, 'No token provided');
    }

    // We have a token, let's verify it!
    const payload = await Auth.verifyRefreshToken(cookieToken);
    if (!payload) {
      this.sendApiResponse(res, 401, 'Expired token');
    }

    // token is valid, check if user exist
    const user = await User.findById(payload.id);
    if (!user) {
      this.sendApiResponse(res, 401, 'User not found');
    }

    // user exist, check if refreshtoken exist on user
    if (!(await Auth.tokenExists(user, cookieToken))) {
      this.sendApiResponse(res, 401, 'Refresh token does not exist');
    }

    // token exist, create new Refresh- and accesstoken
    const accessToken = await Auth.createAccessToken(user, '3m');
    const refreshToken = await Auth.createRefreshToken(user, '1h', res);

    console.log('res: ', res);
    this.sendApiResponse(res, 200, 'Refreshed token', {
      accessToken,
      refreshToken,
    });
  }

  async logout(req, res) {
    const cookieToken = req.cookies;
    console.log('cookieToken:', cookieToken);
    // res.clearCookie('refreshtoken', { path: '/refresh_token' });

    // console.log(req.user);
    this.sendApiResponse(res, 200, 'logged out successfully', {
      cookieToken,
    });
  }

  async profile(req, res) {
    this.sendApiResponse(res, 200, 'profile', { user: req.user });
  }
}

export default new AuthController();
