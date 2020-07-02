function log(req, res, next) {
  console.log("logging middleware .... ");
  next();
}
module.exports = log;
