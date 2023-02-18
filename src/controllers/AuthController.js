import Controller from '../../base/Controller.js';
import User from '../models/User.js';
import UserController from './UserController.js';

class AuthController extends Controller {
  constructor() {
    super();
    this.Model = User;
  }

  async login(req, res) {
  }

  async register(req, res) {
    UserController.store(req, res);
  }

  async logout(req, res) {
  }

  async profile(req, res) {
  }
}

export default new AuthController();