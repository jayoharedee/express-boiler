'use strict'

const livereload = require('gulp-livereload')
const nodemon    = require('gulp-nodemon')
const eslint     = require('gulp-eslint')
const rename     = require('gulp-rename')
const sass       = require('gulp-sass')
const gulp       = require('gulp')

// TASKS ================================
gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

//sass to css magic
gulp.task('sass', () => {
    return gulp.src('srv/sass/style.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('srv/css'))
})

//livereload
gulp.task('livereload', ['lint'], () => {
    livereload.listen()
})

// these watchers will not be needed when using pm2's watching feature
// create new git branch for master repo and continue on in dev with this one
//watchers
gulp.task('watch', () => {
    gulp.watch(['usr/views/**', 'srv/**']).on('change', livereload.changed)
    gulp.watch('srv/sass/**', ['sass'])
})

// default
gulp.task('default', [
    'watch',
    'lint',
    'sass'
    'livereload'
])
