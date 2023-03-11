import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export default {
  createToken: (user, expiresIn) => {
    dotenv.config();
    return jwt.sign({ user }, process.env.TOKEN_SECRET || 'secret', {
      expiresIn,
    });
  },

  isAuthenticated: (req, res, next) => {
    let token = '';
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            status: 401,
            message: 'Unauthorizedy',
          });
        }
        req.user = decoded.user;
        next();
      });
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'Unauthorizedx',
      });
    }
  },
};
