var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleError = require('../common/handle-error');
var coffee = require('gulp-coffee');

gulp.task('scripts-coffee', function() {
  return gulp.src('app/scripts/**/*.coffee')
    .pipe($.sourcemaps.init())
    .pipe(coffee({
      bare: true
    }).on('error', handleError))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.size());
});
