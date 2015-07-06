var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(browserSync.stream({match:'**/*.js'}))
    .pipe($.size());
});
