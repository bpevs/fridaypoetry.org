const logger = require("../logger")
const util = require("util")


/**
 * Log Hook
 * Logs service method before, after and error
 */
module.exports = function() {
  return context => {
    const isDetailed = typeof context.toJSON === "function" && logger.level === "debug"


    logger.debug(`${context.type} app.service('${context.path}').${context.method}()`)

    if (isDetailed) logger.debug("Hook Context", util.inspect(context, { colors: false }))

    if (context.error && !context.result) logger.error(context.error.stack)
  }
}
