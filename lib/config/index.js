'use strict'

const express  = require('express')
const confus   = require('confus')
const lodash   = require('lodash')
const helmet   = require('helmet')

const config = confus({
    profiles: {
        production: [
            'etc/general',
            'etc/production'
        ],
        development: [
            'etc/general',
            'etc/development'
        ]
    },
    root: __dirname + '/../../'
})

module.exports = function(app) {
    // VIEWS =============================
    const views = config.engine.views

    app.use('/assets', express.static(config.static.path))
    app.set('views', views.path)
    app.set('view engine', views.engine)

    // ENV ===============================
    confus.at('development', () => {})

    confus.at('production', () => {
        app.use(helmet())
    })

    lodash.merge(app.settings, config)
}
