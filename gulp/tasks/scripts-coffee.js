var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var errorHandler = require('../common/error-handler');
var coffee = require('gulp-coffee');

gulp.task('scripts-coffee', function() {
  return gulp.src('app/scripts/**/*.coffee')
    .pipe($.sourcemaps.init())
    .pipe(coffee({
      bare: true
    }).on('error', errorHandler.process))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.size());
});
