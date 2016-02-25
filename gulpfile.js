'use strict'

const livereload = require('gulp-livereload')
const nodemon    = require('gulp-nodemon')
const rename     = require('gulp-rename')
const eslint     = require('gulp-eslint')
const gulp       = require('gulp')
const sass       = require('gulp-sass')

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
        ext: 'js',
        env: {'NODE_ENV': 'development'}
    })
})

// sass to css magic
gulp.task('sass', () => {
    return gulp.src('srv/sass/style.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('srv/css'))
})

// livereload
gulp.task('livereload', ['lint', 'start'], () => {
    livereload.listen()
})

// watchers
gulp.task('watch', () => {
    gulp.watch(['usr/views/**', 'srv/**']).on('change', livereload.changed)
    gulp.watch('srv/sass/**', ['sass'])
})

// default task
gulp.task('default', [
    'start',
    'lint',
    'watch',
    'sass',
    'livereload'
])
