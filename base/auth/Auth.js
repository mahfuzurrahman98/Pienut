import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import RefreshToken from './RefreshToken.js';

dotenv.config();

export default {
  createAccessToken: async (user, expiresIn) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || 'pasecret', {
      expiresIn,
    });
  },

  createRefreshToken: async (res, user, cookieOptions) => {
    // init cookieOptions if not set
    cookieOptions.httpOnly = cookieOptions.httpOnly || true;
    cookieOptions.path = cookieOptions.path || '/';
    cookieOptions.maxAge = cookieOptions.maxAge || 1 * 24 * 60 * 60 * 1000; // 1 day

    const expiresIn = cookieOptions.maxAge;
    const token = jwt.sign(
      { user },
      process.env.REFRESH_TOKEN_SECRET || 'prsecret',
      { expiresIn }
    );

    const refreshToken = await RefreshToken.findOne({ userId: user.id });
    if (refreshToken) {
      refreshToken.tokens.push({ token });
      await refreshToken.save();
    } else {
      await RefreshToken.create({
        userId: user.id,
        tokens: [{ token }],
      });
    }

    res.cookie('refreshtoken', token, cookieOptions);

    return token;
  },

  verifyToken(token, secret) {
    return jwt.verify(token, secret);
  },

  tokenExists: async (userId, token) => {
    const refreshToken = await RefreshToken.findOne({
      userId,
      tokens: { $elemMatch: { token } },
    });
    return refreshToken ? true : false;
  },

  isAuthenticated: (req, res, next) => {
    let token = '';
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];

      try {
        const decoded = this.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: 'Unauthorizedz',
        });
      }

      if (!token) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: 'Unauthorizedx',
        });
      }
    }
  },
};
