var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'), // image optimizer 
    livereload = require('gulp-livereload'), // use with livereload chrome extension
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    svg2png = require('gulp-svg2png'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

//Sass
gulp.task('sass', function () {
    return sass('main.scss', {style: "compressed", sourcemap: true })
    .pipe(autoprefixer({
        browsers: ['last 2 version', "> 1%", 'ie 8', 'ie 9'],
        cascade: false
    }))
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''))
    .on('error', function (err) { console.log(err.message); })
    .pipe(notify("sass"));
});

//Watch
gulp.task('watch', function() {
    gulp.watch(['main.scss'], ['sass'])
    livereload.listen()
    gulp.watch(['/']).on('change', livereload.changed)
});

// Default task
gulp.task('default', ['sass','watch']);
