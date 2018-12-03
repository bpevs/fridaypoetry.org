const feathers = require("@feathersjs/feathers")
const configuration = require("@feathersjs/configuration")
const express = require("@feathersjs/express")
const socketio = require("@feathersjs/socketio")
const { join } = require("path")

const compression = require("compression")
const cors = require("cors")
const helmet = require("helmet")
const favicon = require("serve-favicon")

const channels = require("./channels")
const middleware = require("./middleware")
const services = require("./services")

const app = express(feathers())

// Load app configuration
app.configure(configuration())

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(join(app.get("public"), "favicon.ico")))
app.use("/public", express.static(app.get("public")))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

app.configure(middleware)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger: require("./logger") }))

app.hooks(require("./app.hooks"))

module.exports = app
