var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');

gulp.task('browserify', function() {
  return browserify({
      entries: ['app/scripts/angular-main.coffee'],
      extensions: ['.coffee']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.size());
});
