var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe($.size());
});
