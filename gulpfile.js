'use strict'

<<<<<<< HEAD
=======
const eslint     = require('gulp-eslint')
>>>>>>> development
const rename     = require('gulp-rename')
const sass       = require('gulp-sass')
const gulp       = require('gulp')

<<<<<<< HEAD
// sass to css magic
gulp.task('sass', () => {
    return gulp.src('srv/sass/style.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('srv/css'))
=======
// TASKS ================================
gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// sass to css magic
gulp.task('sass', () => {
    return gulp.src('srv/sass/style.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('srv/css'))
>>>>>>> development
})

// default
gulp.task('default', [
<<<<<<< HEAD
=======
    'lint',
>>>>>>> development
    'sass'
])
