'use strict'

module.exports.createError = function(message, code) {
    const err = new Error(message)

    err.code = code
    return err
}
