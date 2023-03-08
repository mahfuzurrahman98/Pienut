// import dotenv from 'dotenv';

// dotenv.config();
// const appDebug = process.env.APP_DEBUG || false;

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      success: false,
      status: 500,
      // message: appDebug ? err.message : 'Internal Server Error',
    });
  }
};

export default errorHandler;
