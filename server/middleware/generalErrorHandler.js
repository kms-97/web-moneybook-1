function generalErrorHandler(err, req, res, next) {
  res.status(err.statusCode).json({ type: err.name, message: err.message });
}

module.exports = {
  generalErrorHandler,
};
