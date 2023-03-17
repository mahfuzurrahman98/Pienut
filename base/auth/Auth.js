import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import RefreshToken from './RefreshToken.js';

dotenv.config();

class Auth {
  static async createAccessToken(user, expiresIn) {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || 'pasecret', {
      expiresIn,
    });
  }

  static async createRefreshToken(res, user, cookieOptions) {
    // init cookieOptions if not set
    if ('httpOnly' in cookieOptions === false) {
      cookieOptions.httpOnly = true;
    }
    if ('path' in cookieOptions === false) {
      cookieOptions.path = '/';
    }
    if ('maxAge' in cookieOptions === false) {
      cookieOptions.maxAge = 1 * 24 * 60 * 60 * 1000; // 1 day
    }

    const expiresIn = cookieOptions.maxAge;
    const token = jwt.sign(
      { user },
      process.env.REFRESH_TOKEN_SECRET || 'prsecret',
      { expiresIn }
    );

    const refreshToken = await RefreshToken.findOne({ userId: user._id });
    if (refreshToken) {
      refreshToken.tokens.push({ token });
      await refreshToken.save();
    } else {
      await RefreshToken.create({
        userId: user._id,
        tokens: [{ token }],
      });
    }

    res.cookie('refreshtoken', token, cookieOptions);

    return token;
  }

  static verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }

  static async tokenExists(userId, token) {
    const refreshToken = await RefreshToken.findOne({
      userId,
      tokens: { $elemMatch: { token } },
    });
    return refreshToken ? true : false;
  }

  static isAuthenticated(req, res, next) {
    let token = req.headers.authorization || req.headers.Authorization;

    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'Unauthorizedx',
      });
    }

    console.log('token:' + token);
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || 'pasecret'
      );
      req.user = decoded.user;
      console.log('decoded: ' + decoded.user);
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: err.message,
      });
    }
  }
}

export default Auth;
