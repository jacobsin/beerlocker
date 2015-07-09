var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var less = require('gulp-less');
var errorHandler = require('../common/error-handler');

gulp.task('styles-less', function() {
  return gulp.src('app/styles/main.less')
    .pipe($.sourcemaps.init())
    .pipe(less({ paths: ['.'] }).on('error', errorHandler.handle))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});
