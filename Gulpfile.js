var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
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


//Webserver (tested 16/6/15 OSX)
gulp.task('connect', function() {
    connect.server({
        livereload: true,
        port: 8888
    });
});

//Sass
// this task runs compression of all files, even unchanged ones (edit required)
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
gulp.task('default', ['connect', 'sass','watch']);
