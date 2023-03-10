import passport from 'passport';
import { Controller, Password, Validator } from '../../base/index.js';
import User from '../models/User.js';

class AuthController extends Controller {
  constructor() {
    super();
    this.errors = {};
    this.Model = User;
  }

  authenticateUser = (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', { session: true }, (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          let error = new Error();
          error.status = 401;
          error.message = 'Invalid credentials';
          return reject(error);
        }
        console.log('>> ', user.authToken);
        resolve(user);
      })(req, res, next);
    });
  };

  async login(req, res, next) {
    // try {
    //   const user = await this.authenticateUser(req, res);
    //   // req.session.authToken = req.user.authToken;
    //   this.sendApiResponse(res, 200, 'logged in successfully', { user });
    // } catch (err) {
    //   next(err);
    // }

    // res.json({ message: 'Logged in successfully!' });
    this.sendApiResponse(res, 200, 'logged in successfully', {
      user: req.user,
    });
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
  async profile(req, res) {}
}

export default new AuthController();
