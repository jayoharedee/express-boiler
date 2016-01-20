'use strict'

module.exports = function(app) {
    // other libraries needed can be added to array
    [ './config', './routes'].forEach((lib) => require(lib)(app))
}
