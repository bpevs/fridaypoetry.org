const { createLogger, format, transports } = require("winston")

const logger = createLogger({

  format: format.combine(
    format.splat(),
    format.simple(),
  ),

  level: "info", // 'debug' for more details

  transports: [
    new transports.Console(),
  ],

})

module.exports = logger
