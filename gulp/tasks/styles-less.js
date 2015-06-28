var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var less = require('gulp-less');
var handleError = require('../common/handle-error');

gulp.task('styles-less', function() {
  return gulp.src('app/styles/main.less')
    .pipe($.sourcemaps.init())
    .pipe(less({
      paths: ['.']
    }).on('error', handleError))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});
