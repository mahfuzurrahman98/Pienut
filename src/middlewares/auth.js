const auth = {
  notZero: (req, res, next) => {
    if (req.body.flag == 0) {
      return res.json({ status: false, message: 'flag is zero' });
    }
    next();
  },

  isEven: (req, res, next) => {
    if (req.body.flag % 2 == 1) {
      return res.json({ status: false, message: 'flag is not even' });
    }
    next();
  },
};

export default auth;
