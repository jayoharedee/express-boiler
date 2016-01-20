'use strict'

const chalk = require('chalk')
const util  = require('util')

// basic logging for various states
function utils() {
    const success = (message) => console.log(chalk.green(message))
    const error   = (message) => console.log(chalk.red(message))
    const warn    = (message) => console.log(chalk.yellow(message))

    return Object.freeze({
        success,
        error,
        warn
    })
}

module.exports = utils()
