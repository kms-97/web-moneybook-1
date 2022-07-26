function asyncErrorCatcher(asyncMiddleware) {
  return function (req, res, next) {
    asyncMiddleware(req, res, next).catch(next);
  };
}

module.exports = {
  asyncErrorCatcher,
};
