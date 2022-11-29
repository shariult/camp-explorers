function errorHandler(err, req, res, next) {
  return res.status(err.status || 500).render("error", { err: err });
}
module.exports = errorHandler;
