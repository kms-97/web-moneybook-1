const CustomError = require('../error/CustomError');
const { ERROR_INFO } = require('../util/constant');

function sqlErrorHandler(err, req, res, next) {
  if (err.hasOwnProperty('sqlState')) {
    const errno = err.errno;
    if (errno === 1452)
      res.status(403).json(new CustomError(ERROR_INFO.BAD_REQUEST).toObject());
    else
      res.status(403).json({
        ...new CustomError(ERROR_INFO.BAD_REQUEST).toObject(),
        message: err.message,
      });
  } else {
    next(err);
  }
}

module.exports = {
  sqlErrorHandler,
};
