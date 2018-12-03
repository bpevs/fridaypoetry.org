// Application hooks that run for every service
const log = require("./hooks/log")

module.exports = {
  after: {
    all: [ log() ],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: [],
  },

  before: {
    all: [ log() ],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: [],
  },

  error: {
    all: [ log() ],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: [],
  },
}
