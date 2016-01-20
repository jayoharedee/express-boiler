'use strict'

const express          = require('express')
const app              = express()

const expressValidator = require('express-validator')
const bodyParser       = require('body-parser')
const help             = require('./lib/helpers')
const util             = require('./lib/helpers/utils.js')

// MIDDLEWARE ===========================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(expressValidator())


// configs 
require('./lib/config')(app);


//routes
// app.get('/', (req, res) => {
//     res.json({
//         status: 'success',
//         data: null,
//         message: 'Welcome to the site'
//     })
// })
app.get('/', (req, res, next) => {
    return res.render('index', {title: 'Express Boiler'})
})

require('./lib/routes')(app)


// 404's
app.use((req, res, next) => next(
    help.createError('Nothing to be found here.', 404)
))


app.use((err, req, res, next) => {
    res.status(err.code || 500)
        .json({
            status: 'error',
            data: null,
            message: err.message
        })
})

module.exports = app
