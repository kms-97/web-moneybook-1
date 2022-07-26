function generalErrorHandler(err, req, res, next) {
  res
    .status(err.statusCode)
    .json({ errorCode: 'E0001', type: err.name, message: err.message });
}

module.exports = {
  generalErrorHandler,
};
