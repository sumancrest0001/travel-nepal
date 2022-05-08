const AppError = require('../utilities/appError');

const handleCastErrorDb = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, '400');
};

const duplicateErrorDb = (error) => {
  const value = error.errmsg.match(/(["'])(\\?.])*?\1/)[0];
  const message = `Duplicate field ${value}. Please use another one!`;
  return new AppError(message, '400');
};

const validationErrorDb = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, '400');
};

const handleJWTError = (error) => new AppError('Invalid token. Please login again', '401');

const handleJWTExpiredError = (error) => new AppError('Your token is expired. Please login again', '401');

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error.....', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    developmentError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDb(error);
    if (error.code === 11000) error = duplicateErrorDb(error);
    if (error.name === 'ValidationError') error = validationErrorDb(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);
    productionError(error, res);
  }
};
