'use strict'

const livereload = require('gulp-livereload')
const nodemon    = require('gulp-nodemon')
const eslint     = require('gulp-eslint')
const gulp       = require('gulp')


// TASKS ================================
gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})


// nodemon ./bin/www
gulp.task('start', ['lint'], () => {
    nodemon({
        script: 'bin/www',
        ext: 'js ejs',
        env: {'NODE_ENV': 'development'}
    })
})


// livereload
gulp.task('livereload', ['lint', 'start'], () => {
    livereload.listen()
    gulp.watch(['usr/views/*.ejs']).on('change', livereload.changed)
})

gulp.task('default', ['lint', 'start', 'livereload'])
