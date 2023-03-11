export default {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({
      success: false,
      status: 401,
      message: 'You are not authenticated',
    });
  },
};
