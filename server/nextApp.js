const next = require("next")


const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dir: "./client", dev })
const handle = nextApp.getRequestHandler();


const services = [ "/users" ]
const isService = path => services.some(service => path.indexOf(service) > -1)


module.exports = { nextApp, handle, isService }
