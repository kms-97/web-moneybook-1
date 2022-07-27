const CustomError = require('../error/CustomError');
const { ERROR_INFO } = require('../util/constant');

function generalErrorHandler(err, req, res, next) {
  res
    .status(500)
    .json(new CustomError(ERROR_INFO.APPLICATION_ERROR).toObject());
}

module.exports = {
  generalErrorHandler,
};
