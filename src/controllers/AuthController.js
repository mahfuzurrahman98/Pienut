import dotenv from 'dotenv';
import { Auth, Controller, Password, Validator } from '../../base/index.js';
import User from '../models/User.js';

dotenv.config();

class AuthController extends Controller {
  constructor() {
    super();
    this.errors = {};
    this.Model = User;
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
      return this.sendApiResponse(res, 400, validator.errors());
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
      return this.sendApiResponse(res, 201, 'created successfully', user);
    } catch (err) {
      return this.sendApiResponse(res, 500, err);
    }
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
      return this.sendApiResponse(res, 400, validator.errors());
    }

    // fire the query
    let user = await User.findOne({ email: data.email });

    console.log('logging in user: ', user);

    if (!user) {
      return this.sendApiResponse(res, 400, 'Invalid credentials');
    }

    if (!(await Password.match(data.password, user.password))) {
      return this.sendApiResponse(res, 400, 'Invalid credentials');
    }

    const userInfo = {
      _id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    console.log('userInfo: ', userInfo);

    const _accessToken = await Auth.createAccessToken(userInfo, '15m');

    const cookieOptions = {
      httpOnly: true,
      path: '/api/v1/auth/refresh-token',
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    };
    const _refreshToken = await Auth.createRefreshToken(
      res,
      userInfo,
      cookieOptions
    );

    return this.sendApiResponse(res, 200, 'logged in successfully', {
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    });
  }

  async getRefreshToken(req, res) {
    const cookieToken = req.cookies.refreshtoken;
    console.log('cookies:', req.cookies);

    // No token,
    if (!cookieToken) {
      // return this.sendApiResponse(res, 401, 'No token provided');
      return this.sendApiResponse(res, 200, 'No token provided', {
        accessToken: '',
      });
    }

    // We have a token, let's verify it!
    const payload = Auth.verifyToken(
      cookieToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!payload) {
      return this.sendApiResponse(res, 401, 'Expired token');
    }

    // token is valid, check if user exist
    console.log('payload:', payload);
    const user = await User.findById(payload.user._id);
    if (!user) {
      return this.sendApiResponse(res, 401, 'User not found');
    }

    // user exist, check if refreshtoken exist on user
    if (!(await Auth.tokenExists(user, cookieToken))) {
      return this.sendApiResponse(res, 401, 'Refresh token does not exist');
    }

    // token exist, create new Refresh- and accesstoken
    const accessToken = await Auth.createAccessToken(user, '15m');

    const cookieOptions = {
      httpOnly: true,
      path: '/api/v1/auth/refresh-token',
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    };
    const refreshToken = await Auth.createRefreshToken(
      res,
      user,
      cookieOptions
    );

    return this.sendApiResponse(res, 200, 'Refreshed token', {
      accessToken,
      refreshToken,
    });
  }

  async logout(req, res) {
    res.clearCookie('refreshtoken', { path: '/api/v1/auth/refresh-token' });
    return this.sendApiResponse(res, 200, 'logged out successfully');
  }

  async profile(req, res) {
    return this.sendApiResponse(res, 200, 'profile', { user: req.user });
  }
}

export default new AuthController();
