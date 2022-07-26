const CustomError = require('../error/CustomError');

function customErrorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.toObject());
  } else {
    next(err);
  }
}

module.exports = {
  customErrorHandler,
};
