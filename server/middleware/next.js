const { handle, isService } = require("../nextApp")


module.exports = (req, res, next) => {
  return isService(req.originalUrl) ? next() : handle(req, res)
}
